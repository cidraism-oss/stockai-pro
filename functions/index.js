const functions = require('firebase-functions');
const fetch = require('node-fetch');

const RESEND_API_KEY = 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
const FROM_EMAIL = 'StockAI-Pro <onboarding@resend.dev>';

exports.sendEmail = functions.https.onRequest(function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    var to = req.body.to;
    var subject = req.body.subject;
    var html = req.body.html;

    if (!to || !subject || !html) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }

    var recipients = Array.isArray(to) ? to : [to];

    fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + RESEND_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: recipients,
            subject: subject,
            html: html
        })
    })
    .then(function(response) {
        return response.json().then(function(data) {
            if (response.ok) {
                console.log('✅ Email sent:', data.id);
                res.status(200).json({ success: true, id: data.id });
            } else {
                console.error('❌ Resend error:', data);
                res.status(response.status).json({ success: false, error: data });
            }
        });
    })
    .catch(function(err) {
        console.error('❌ Error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    });
});
