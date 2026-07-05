// EMAIL FUNCTIONS ADDON — StockAI-Pro
// This file adds the quote and booking email functions

function sendQuoteEmailToCustomer(data) {
    console.log('📧 sendQuoteEmailToCustomer called');
    if (!data || !data.customer || !data.customer.email) {
        console.error('No customer email');
        return Promise.resolve({ ok: false });
    }
    var featureRows = '';
    (data.features || []).forEach(function(f, i) {
        var price = (window.FEATURE_PRICES && window.FEATURE_PRICES[f]) || 0;
        var name  = (window.FEATURE_MAP && window.FEATURE_MAP[f]) || (data.featureLabels && data.featureLabels[i]) || f;
        featureRows += '<tr><td style="padding:10px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">' + (f === 'web_boh' ? '🔒 ' : '✅ ') + name + '</td><td style="padding:10px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">R' + price.toLocaleString() + '.00/mo</td></tr>';
    });

    var adminEmail = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.admin) || 'cidraism@gmail.com';
    var apiKey = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.apiKey) || 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
    var fromEmail = 'StockAI-Pro <onboarding@resend.dev>';

    var html = '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<div style="font-size:.75rem;color:#5EEAD4;margin-top:4px">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0;font-size:1.1rem">Your Custom Quotation</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#0d4a5c">Hi <strong>' + data.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;line-height:1.7">Thank you for using our quote builder. Here is your custom quotation:</p>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Quote Ref</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.quoteRef || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Date</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.quoteDate || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Email</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.email + '</td></tr>' +
        '</table>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<tr><td colspan="2" style="background:#0d4a5c;color:#fff;padding:10px 14px;font-weight:700;font-size:.78rem;border-radius:8px 8px 0 0">MONTHLY SUBSCRIPTION (incl. VAT)</td></tr>' +
        featureRows +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">📦 Entities (' + (data.entities || 1) + ' x R599/mo)</td><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">R' + (data.entityTotal || 0).toLocaleString() + '.00/mo</td></tr>' +
        '<tr style="background:#e4f1f5"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Monthly Total</td><td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">R' + (data.monthlyTotal || 0).toLocaleString() + '.00/mo</td></tr>' +
        '</table>' +
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ 30-Day Money-Back Guarantee</div>' +
        '</div>' +
        '<div style="text-align:center;margin:20px 0">' +
        '<a href="https://www.stockai-pro.co.za/signup.html" style="display:inline-block;padding:14px 32px;background:#f59e0b;color:#fff;text-decoration:none;border-radius:8px;font-weight:700">🚀 Get Started Now</a>' +
        '</div>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center">This quotation is valid for 30 days from the date of issue.</p>' +
        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4f1f5;text-align:center">' +
        '<p style="font-size:.75rem;color:#8aabb5">© 2025 StockAI-Pro • 079 044 0508 • support@stockai-pro.co.za</p>' +
        '</div></div></div>';

    return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [data.customer.email], subject: 'Your StockAI-Pro Quotation — ' + (data.quoteRef || ''), html: html })
    }).then(function(res) {
        console.log('📧 Customer email response:', res.status, res.ok ? '✅ OK' : '❌ FAILED');
        return res;
    }).catch(function(err) {
        console.error('📧 Customer email error:', err);
        return { ok: false };
    });
}

function sendQuoteNotificationToAdmin(data) {
    console.log('📧 sendQuoteNotificationToAdmin called');
    var adminEmail = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.admin) || 'cidraism@gmail.com';
    var apiKey = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.apiKey) || 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
    var fromEmail = 'StockAI-Pro <onboarding@resend.dev>';

    var featureList = (data.features || []).map(function(f) {
        var price = (window.FEATURE_PRICES && window.FEATURE_PRICES[f]) || 0;
        var name = (window.FEATURE_MAP && window.FEATURE_MAP[f]) || f;
        return name + ' — R' + price.toLocaleString() + '/mo';
    }).join('<br>');

    var html = '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<h2 style="color:#fff;margin:14px 0 0;font-size:1.1rem">📋 New Quote Request</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#5a8a96">A new quote was requested on the website:</p>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Quote Ref</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.quoteRef || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.name : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.business : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.phone : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Email</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.email : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Features</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + featureList + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Entities</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.entities || 1) + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Technician</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.techIncluded ? 'Yes — ' + (data.techHours || 0) + ' hrs = R' + (data.techTotal || 0).toLocaleString() : 'No') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Training</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.trainingIncluded ? 'Yes — R' + (data.trainingTotal || 0).toLocaleString() : 'No') + '</td></tr>' +
        '<tr style="background:#e4f1f5"><td style="padding:12px;font-weight:900;color:#0d4a5c">Monthly Total</td><td style="padding:12px;font-weight:900;color:#1a8ba8">R' + (data.monthlyTotal || 0).toLocaleString() + '.00/mo</td></tr>' +
        '<tr style="background:#fef3c7"><td style="padding:12px;font-weight:900;color:#0d4a5c">Once-off Total</td><td style="padding:12px;font-weight:900;color:#d97706">R' + (data.onceOffTotal || 0).toLocaleString() + '.00</td></tr>' +
        '</table>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center">© 2025 StockAI-Pro</p>' +
        '</div></div>';

    return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [adminEmail], subject: '📋 New Quote: ' + (data.customer ? data.customer.business : 'Unknown') + ' — R' + (data.monthlyTotal || 0).toLocaleString() + '/mo', html: html })
    }).then(function(res) {
        console.log('📧 Admin quote email response:', res.status, res.ok ? '✅ OK' : '❌ FAILED');
        return res;
    }).catch(function(err) {
        console.error('📧 Admin quote email error:', err);
        return { ok: false };
    });
}

function sendBookingConfirmationToCustomer(booking) {
    console.log('📧 sendBookingConfirmationToCustomer called');
    var apiKey = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.apiKey) || 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
    var fromEmail = 'StockAI-Pro <onboarding@resend.dev>';
    var dateFormatted = booking.date;
    try { dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-ZA', { weekday:'long', year:'numeric', month:'long', day:'numeric' }); } catch(e) {}

    var html = '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<h2 style="color:#fff;margin:14px 0 0">✅ Presentation Confirmed!</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#0d4a5c">Hi <strong>' + booking.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;line-height:1.7">Your StockAI-Pro presentation has been confirmed!</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:24px;color:#fff;margin:20px 0;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Booking ID</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.id + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.phone + '</td></tr>' +
        '</table>' +
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ Booking Confirmed</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">Need to reschedule? Contact us at least 24 hours in advance.</div>' +
        '</div>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center">© 2025 StockAI-Pro • 079 044 0508</p>' +
        '</div></div>';

    return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [booking.customer.email], subject: '✅ Presentation Confirmed — ' + dateFormatted + ' — StockAI-Pro', html: html })
    }).then(function(res) {
        console.log('📧 Booking confirm response:', res.status, res.ok ? '✅ OK' : '❌ FAILED');
        return res;
    }).catch(function(err) {
        console.error('📧 Booking confirm error:', err);
        return { ok: false };
    });
}

function sendBookingEmailToAdmin(booking) {
    console.log('📧 sendBookingEmailToAdmin called');
    var adminEmail = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.admin) || 'cidraism@gmail.com';
    var apiKey = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.apiKey) || 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
    var fromEmail = 'StockAI-Pro <onboarding@resend.dev>';
    var dateFormatted = booking.date;
    try { dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-ZA', { weekday:'long', year:'numeric', month:'long', day:'numeric' }); } catch(e) {}

    var html = '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<h2 style="color:#fff;margin:14px 0 0">📅 New Presentation Booking!</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#5a8a96">A new presentation has been booked. Add this to your calendar!</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:20px;color:#fff;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:1.3rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1.1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Booking ID</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.id + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Date</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + dateFormatted + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Time Slot</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.slotLabel + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Email</td><td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.email + '</td></tr>' +
        '</table>' +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px;border-radius:8px;margin-top:16px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">📌 <strong>Add to calendar:</strong> ' + dateFormatted + ' — ' + booking.slotLabel + '</p></div>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin-top:20px">© 2025 StockAI-Pro</p>' +
        '</div></div>';

    return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [adminEmail], subject: '📅 New Booking: ' + booking.customer.business + ' — ' + dateFormatted, html: html })
    }).then(function(res) {
        console.log('📧 Booking admin email response:', res.status, res.ok ? '✅ OK' : '❌ FAILED');
        return res;
    }).catch(function(err) {
        console.error('📧 Booking admin email error:', err);
        return { ok: false };
    });
}

function sendDailyQuoteAnalysis() {
    var quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    var today = new Date().toISOString().split('T')[0];
    var todayQuotes = quotes.filter(function(q) { return q.timestamp && q.timestamp.startsWith(today); });
    if (todayQuotes.length === 0) { console.log('📊 No quotes today'); return Promise.resolve({ ok: true }); }
    var adminEmail = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.admin) || 'cidraism@gmail.com';
    var apiKey = (window.EMAIL_CONFIG && window.EMAIL_CONFIG.apiKey) || 're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT';
    var fromEmail = 'StockAI-Pro <onboarding@resend.dev>';
    var totalMonthly = 0;
    todayQuotes.forEach(function(q) { totalMonthly += (q.monthlyTotal || 0); });
    var rows = todayQuotes.map(function(q) {
        return '<tr><td style="padding:8px;border-bottom:1px solid #e4f1f5;font-size:.78rem">' + (q.quoteRef || '—') + '</td>' +
            '<td style="padding:8px;border-bottom:1px solid #e4f1f5;font-size:.78rem">' + (q.customer ? q.customer.name : '—') + '</td>' +
            '<td style="padding:8px;border-bottom:1px solid #e4f1f5;font-size:.78rem">' + (q.customer ? q.customer.business : '—') + '</td>' +
            '<td style="padding:8px;border-bottom:1px solid #e4f1f5;font-size:.78rem">' + (q.customer ? q.customer.phone : '—') + '</td>' +
            '<td style="padding:8px;border-bottom:1px solid #e4f1f5;font-size:.78rem;color:#1a8ba8;font-weight:700">R' + (q.monthlyTotal || 0).toLocaleString() + '/mo</td></tr>';
    }).join('');
    var html = '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<h2 style="color:#fff;margin:14px 0 0">📊 Daily Quote Analysis</h2>' +
        '<p style="color:rgba(255,255,255,.8);margin:6px 0 0">' + todayQuotes.length + ' quote' + (todayQuotes.length > 1 ? 's' : '') + ' today — R' + totalMonthly.toLocaleString() + '/mo potential</p>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Ref</th>' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Name</th>' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Business</th>' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Phone</th>' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Monthly</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin-top:20px">© 2025 StockAI-Pro</p>' +
        '</div></div>';
    return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [adminEmail], subject: '📊 Daily Quotes: ' + todayQuotes.length + ' — R' + totalMonthly.toLocaleString() + '/mo', html: html })
    }).then(function(res) {
        console.log('📊 Daily analysis response:', res.status);
        return res;
    });
}

function checkAndSendDailyAnalysis() {
    var lastSent = localStorage.getItem('stockai_daily_analysis_sent');
    var today = new Date().toISOString().split('T')[0];
    if (lastSent === today) return;
    var quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    var todayQuotes = quotes.filter(function(q) { return q.timestamp && q.timestamp.startsWith(today); });
    if (todayQuotes.length > 0) {
        sendDailyQuoteAnalysis().then(function() {
            localStorage.setItem('stockai_daily_analysis_sent', today);
        });
    }
}

setTimeout(function() { if (new Date().getHours() >= 17) { checkAndSendDailyAnalysis(); } }, 5000);

// Register on window
window.sendQuoteEmailToCustomer          = sendQuoteEmailToCustomer;
window.sendQuoteNotificationToAdmin      = sendQuoteNotificationToAdmin;
window.sendBookingConfirmationToCustomer = sendBookingConfirmationToCustomer;
window.sendBookingEmailToAdmin           = sendBookingEmailToAdmin;
window.sendDailyQuoteAnalysis            = sendDailyQuoteAnalysis;
window.checkAndSendDailyAnalysis         = checkAndSendDailyAnalysis;

console.log('✅ Email addon functions loaded');
console.log('📧 sendQuoteEmailToCustomer:', typeof window.sendQuoteEmailToCustomer);
console.log('📧 sendQuoteNotificationToAdmin:', typeof window.sendQuoteNotificationToAdmin);
