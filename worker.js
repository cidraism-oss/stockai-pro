export default {
    async fetch(request, env) {

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin':  '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                }
            });
        }

        // Only allow POST
        if (request.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 });
        }

        try {
            var body = await request.json();
            var to      = body.to;
            var subject = body.subject;
            var html    = body.html;

            if (!to || !subject || !html) {
                return new Response(
                    JSON.stringify({ error: 'Missing fields: to, subject, html' }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }

            var recipients = Array.isArray(to) ? to : [to];
            recipients = recipients.filter(function(e) {
                return e && e.indexOf('@') !== -1;
            });

            if (!recipients.length) {
                return new Response(
                    JSON.stringify({ error: 'No valid recipients' }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }

            var response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + env.RESEND_API_KEY,
                    'Content-Type':  'application/json'
                },
                body: JSON.stringify({
                    from:    env.FROM_EMAIL,
                    to:      recipients,
                    subject: subject,
                    html:    html
                })
            });

            var data = await response.json();

            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: {
                    'Content-Type':                'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });

        } catch (err) {
            return new Response(
                JSON.stringify({ error: err.message }),
                {
                    status: 500,
                    headers: {
                        'Content-Type':                'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
        }
    }
};
