// ============================================================
// send-email.js
// Firebase Cloud Function — Email Proxy for StockAI-Pro
// Receives email requests from the website and
// forwards them to Resend API (bypasses CORS)
// ============================================================

const functions = require('firebase-functions');
const fetch     = require('node-fetch');

const RESEND_API_KEY = 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
const FROM_EMAIL     = 'StockAI-Pro <onboarding@resend.dev>';

exports.sendEmail = functions.https.onRequest(function(req, res) {

    // Allow CORS from your website
    res.set('Access-Control-Allow-Origin', 'https://www.stockai-pro.co.za');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    var to      = req.body.to;
    var subject = req.body.subject;
    var html    = req.body.html;

    if (!to || !subject || !html) {
        res.status(400).json({ error: 'Missing required fields: to, subject, html' });
        return;
    }

    var recipients = Array.isArray(to) ? to : [to];

    console.log('📧 Sending email to:', recipients.join(', '));

    fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + RESEND_API_KEY,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify({
            from:    FROM_EMAIL,
            to:      recipients,
            subject: subject,
            html:    html
        })
    })
    .then(function(response) {
        return response.json().then(function(data) {
            if (response.ok) {
                console.log('✅ Email sent successfully:', data.id);
                res.status(200).json({ success: true, id: data.id });
            } else {
                console.error('❌ Resend error:', data);
                res.status(response.status).json({ success: false, error: data });
            }
        });
    })
    .catch(function(err) {
        console.error('❌ Fetch error:', err);
        res.status(500).json({ success: false, error: err.message });
    });
});
