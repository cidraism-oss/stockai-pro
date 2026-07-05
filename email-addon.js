// ============================================================
// email-addon.js — StockAI-Pro
// Sends emails via Cloudflare Worker proxy
// ============================================================

var PROXY_URL = 'https://bold-dust-c51b.cidraism.workers.dev/';

var ADDON_FEATURE_MAP = {
    web_boh:      'Web App B.O.H',
    mobile_app:   'Mobile App',
    procure_ai:   'ProcureAI App',
    pos_system:   'P.O.S System',
    menu_master:  'Menu Master',
    functions_ai: 'FunctionsAI'
};

var ADDON_FEATURE_PRICES = {
    web_boh:      799,
    mobile_app:   349,
    procure_ai:   399,
    pos_system:   799,
    menu_master:  349,
    functions_ai: 449
};

var ADMIN_EMAIL = 'cidraism@gmail.com';

// ============================================================
// CORE SEND FUNCTION — through Cloudflare Worker
// ============================================================
function sendViaProxy(to, subject, html) {
    var recipients = Array.isArray(to) ? to : [to];
    recipients = recipients.filter(function(e) {
        return e && typeof e === 'string' && e.indexOf('@') !== -1;
    });
    if (recipients.length === 0) {
        console.warn('No valid recipients');
        return Promise.resolve({ ok: false });
    }
    console.log('📧 Sending email to:', recipients.join(', '));
    return fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipients, subject: subject, html: html })
    })
    .then(function(res) {
        if (res.ok) {
            console.log('✅ Email sent successfully to:', recipients.join(', '));
        } else {
            console.error('❌ Email failed. Status:', res.status);
        }
        return res;
    })
    .catch(function(err) {
        console.error('❌ Email error:', err.message || err);
        return { ok: false };
    });
}

// ============================================================
// EMAIL 11 — QUOTE TO CUSTOMER
// ============================================================
function sendQuoteEmailToCustomer(data) {
    console.log('📧 sendQuoteEmailToCustomer called');
    if (!data || !data.customer || !data.customer.email) {
        console.error('No customer email');
        return Promise.resolve({ ok: false });
    }

    var featureRows = '';
    (data.features || []).forEach(function(f, i) {
        var price = ADDON_FEATURE_PRICES[f] || 0;
        var name  = ADDON_FEATURE_MAP[f] || (data.featureLabels && data.featureLabels[i]) || f;
        featureRows +=
            '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">' +
            (f === 'web_boh' ? '🔒 ' : '✅ ') + name + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' +
            'R' + price.toLocaleString() + '.00/mo</td>' +
            '</tr>';
    });

    var getStartedUrl = 'https://www.stockai-pro.co.za/signup.html?features=' +
        (data.features || []).join(',') +
        '&entities=' + (data.entities || 1);

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<div style="font-size:.72rem;color:#5EEAD4;letter-spacing:2px;margin-top:4px">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0;font-size:1.1rem">Your Custom Quotation</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;line-height:1.7">Thank you for using our quote builder. Here is your custom quotation:</p>' +
        '<div style="background:#f0f7f9;padding:14px 18px;border-radius:10px;margin:16px 0">' +
        '<table style="width:100%"><tr>' +
        '<td><span style="font-size:.72rem;color:#5a8a96;display:block">Quote Reference</span>' +
        '<strong style="color:#0d4a5c">' + (data.quoteRef || '—') + '</strong></td>' +
        '<td style="text-align:right"><span style="font-size:.72rem;color:#5a8a96;display:block">Date</span>' +
        '<strong style="color:#0d4a5c">' + (data.quoteDate || '—') + '</strong></td>' +
        '</tr></table></div>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Name</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Email</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + data.customer.email + '</td></tr>' +
        '</table>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<tr><td colspan="2" style="background:#0d4a5c;color:#fff;padding:10px 14px;font-weight:700;font-size:.78rem;border-radius:8px 8px 0 0">MONTHLY SUBSCRIPTION (incl. VAT)</td></tr>' +
        featureRows +
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">Entities (' + (data.entities || 1) + ' x R599/mo)</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">R' + (data.entityTotal || 0).toLocaleString() + '.00/mo</td></tr>' +
        '<tr style="background:#e4f1f5"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Monthly Total</td>' +
        '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">R' + (data.monthlyTotal || 0).toLocaleString() + '.00/mo</td></tr>' +
        '</table>' +
        (data.onceOffTotal > 0 ?
            '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
            '<tr><td colspan="2" style="background:#d97706;color:#fff;padding:10px 14px;font-weight:700;font-size:.78rem;border-radius:8px 8px 0 0">ONCE-OFF CHARGES (incl. VAT)</td></tr>' +
            (data.techIncluded && data.techHours > 0 ?
                '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">Technician Setup (' + data.techHours + ' hrs x R450)</td>' +
                '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">R' + (data.techTotal || 0).toLocaleString() + '.00</td></tr>' : '') +
            (data.trainingIncluded ?
                '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">Staff Training</td>' +
                '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">R' + (data.trainingTotal || 0).toLocaleString() + '.00</td></tr>' : '') +
            '<tr style="background:#fef3c7"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Once-off Total</td>' +
            '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#d97706;text-align:right">R' + (data.onceOffTotal || 0).toLocaleString() + '.00</td></tr>' +
            '</table>' : '') +
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ 30-Day Money-Back Guarantee</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">Not satisfied within 30 days? Full refund — no questions asked.</div>' +
        '</div>' +
        '<div style="text-align:center;margin:24px 0">' +
        '<a href="' + getStartedUrl + '" style="display:inline-block;padding:16px 36px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:1rem">🚀 Get Started Now</a>' +
        '</div>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center">This quotation is valid for 30 days from the date of issue.</p>' +
        '<div style="margin-top:20px;padding-top:16px;border-top:1px solid #e4f1f5;text-align:center">' +
        '<a href="https://www.stockai-pro.co.za" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;margin:0 8px">🌐 Website</a>' +
        '<a href="https://wa.me/27790440508" style="color:#25D366;text-decoration:none;font-size:.82rem;margin:0 8px">💬 WhatsApp</a>' +
        '<a href="tel:0790440508" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;margin:0 8px">📞 079 044 0508</a>' +
        '</div>' +
        '<p style="color:#8aabb5;font-size:.75rem;text-align:center;margin-top:12px">© 2025 StockAI-Pro. Built with ❤️ in South Africa.</p>' +
        '</div></div>';

    return sendViaProxy(
        data.customer.email,
        'Your StockAI-Pro Quotation — ' + (data.quoteRef || ''),
        html
    );
}

// ============================================================
// EMAIL 12 — QUOTE NOTIFICATION TO ADMIN
// ============================================================
function sendQuoteNotificationToAdmin(data) {
    console.log('📧 sendQuoteNotificationToAdmin called');

    var featureList = (data.features || []).map(function(f) {
        return (ADDON_FEATURE_MAP[f] || f) + ' — R' + (ADDON_FEATURE_PRICES[f] || 0).toLocaleString() + '/mo';
    }).join('<br>');

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<h2 style="color:#fff;margin:14px 0 0;font-size:1.1rem">📋 New Quote Request</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#5a8a96">A new quote was requested on the website:</p>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Quote Ref</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.quoteRef || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Date</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.quoteDate || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.name : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.business : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.phone : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Email</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.customer ? data.customer.email : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Features</td>' +
        '<td style="padding:8px 12px;font-size:.85rem;color:#0d4a5c;font-weight:600;line-height:1.8">' + featureList + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Entities</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.entities || 1) + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Technician</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.techIncluded ? 'Yes — ' + (data.techHours || 0) + ' hrs = R' + (data.techTotal || 0).toLocaleString() : 'No') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Training</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (data.trainingIncluded ? 'Yes — R' + (data.trainingTotal || 0).toLocaleString() : 'No') + '</td></tr>' +
        '<tr style="background:#e4f1f5"><td style="padding:12px;font-weight:900;color:#0d4a5c">Monthly Total</td>' +
        '<td style="padding:12px;font-weight:900;color:#1a8ba8">R' + (data.monthlyTotal || 0).toLocaleString() + '.00/mo</td></tr>' +
        '<tr style="background:#fef3c7"><td style="padding:12px;font-weight:900;color:#0d4a5c">Once-off Total</td>' +
        '<td style="padding:12px;font-weight:900;color:#d97706">R' + (data.onceOffTotal || 0).toLocaleString() + '.00</td></tr>' +
        '</table>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center">StockAI-Pro — www.stockai-pro.co.za</p>' +
        '</div></div>';

    return sendViaProxy(
        ADMIN_EMAIL,
        '📋 New Quote: ' + (data.customer ? data.customer.business : 'Unknown') + ' — R' + (data.monthlyTotal || 0).toLocaleString() + '/mo',
        html
    );
}

// ============================================================
// EMAIL 13 — BOOKING CONFIRMATION TO CUSTOMER
// ============================================================
function sendBookingConfirmationToCustomer(booking) {
    console.log('📧 sendBookingConfirmationToCustomer called');

    var dateFormatted = booking.date;
    try {
        dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-ZA', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch(e) {}

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<div style="font-size:.72rem;color:#5EEAD4;letter-spacing:2px;margin-top:4px">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0">✅ Presentation Confirmed!</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + booking.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;line-height:1.7">Your StockAI-Pro presentation has been confirmed! We look forward to showing you what we can do for your business.</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:24px;color:#fff;margin:20px 0;text-align:center">' +
        '<div style="font-size:.72rem;text-transform:uppercase;letter-spacing:2px;opacity:.7;margin-bottom:10px">📅 Your Booking</div>' +
        '<div style="font-size:1.2rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Booking ID</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.id + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Address</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (booking.customer.address || '—') + '</td></tr>' +
        '</table>' +
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ Booking Confirmed</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">Need to reschedule? Please contact us at least 24 hours in advance.</div>' +
        '</div>' +
        '<div style="text-align:center;margin-top:20px">' +
        '<a href="https://wa.me/27790440508" style="display:inline-block;padding:10px 20px;background:#25D366;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;margin:4px">💬 WhatsApp Us</a>' +
        '<a href="tel:0790440508" style="display:inline-block;padding:10px 20px;background:#1a8ba8;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;margin:4px">📞 Call Us</a>' +
        '</div>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin-top:20px">© 2025 StockAI-Pro • 079 044 0508 • support@stockai-pro.co.za</p>' +
        '</div></div>';

    return sendViaProxy(
        booking.customer.email,
        '✅ Presentation Confirmed — ' + dateFormatted + ' — StockAI-Pro',
        html
    );
}

// ============================================================
// EMAIL 14 — BOOKING NOTIFICATION TO ADMIN
// ============================================================
function sendBookingEmailToAdmin(booking) {
    console.log('📧 sendBookingEmailToAdmin called');

    var dateFormatted = booking.date;
    try {
        dateFormatted = new Date(booking.date + 'T00:00:00').toLocaleDateString('en-ZA', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch(e) {}

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<div style="font-size:.72rem;color:#5EEAD4;letter-spacing:2px;margin-top:4px">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0">📅 New Presentation Booking!</h2>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<p style="color:#5a8a96">A new presentation has been booked. Please add this to your calendar!</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:20px;color:#fff;margin:16px 0;text-align:center">' +
        '<div style="font-size:1.3rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1.1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96;width:35%">Booking ID</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.id + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Date</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + dateFormatted + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Time Slot</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.slotLabel + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Name</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Business</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Phone</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Email</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + booking.customer.email + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Address</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + (booking.customer.address || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:.82rem;color:#5a8a96">Booked At</td>' +
        '<td style="padding:8px 12px;font-size:.88rem;color:#0d4a5c;font-weight:600">' + new Date(booking.timestamp).toLocaleString('en-ZA') + '</td></tr>' +
        '</table>' +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px;border-radius:8px;margin-top:16px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">📌 <strong>Add to your calendar:</strong> ' + dateFormatted + ' — ' + booking.slotLabel + '</p>' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:6px 0 0">📍 <strong>Address:</strong> ' + (booking.customer.address || 'Not provided') + '</p>' +
        '</div>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin-top:20px">© 2025 StockAI-Pro</p>' +
        '</div></div>';

    return sendViaProxy(
        ADMIN_EMAIL,
        '📅 New Booking: ' + booking.customer.business + ' — ' + dateFormatted,
        html
    );
}

// ============================================================
// EMAIL 15 — DAILY QUOTE ANALYSIS TO ADMIN
// Only sends if quotes exist today
// ============================================================
function sendDailyQuoteAnalysis() {
    console.log('📊 sendDailyQuoteAnalysis called');

    var quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    var today  = new Date().toISOString().split('T')[0];

    var todayQuotes = quotes.filter(function(q) {
        return q.timestamp && q.timestamp.startsWith(today);
    });

    if (todayQuotes.length === 0) {
        console.log('📊 No quotes today — not sending');
        return Promise.resolve({ ok: true });
    }

    var totalMonthly = 0;
    var totalOnceOff = 0;
    todayQuotes.forEach(function(q) {
        totalMonthly += (q.monthlyTotal || 0);
        totalOnceOff += (q.onceOffTotal || 0);
    });

    var rows = todayQuotes.map(function(q, i) {
        var bg = i % 2 === 0 ? '#f8fcfd' : '#fff';
        return '<tr style="background:' + bg + '">' +
            '<td style="padding:8px 10px;font-size:.75rem;color:#2a5f70;border-bottom:1px solid #e4f1f5">' + (q.quoteRef || '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:.75rem;color:#2a5f70;border-bottom:1px solid #e4f1f5">' + (q.customer ? q.customer.name : '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:.75rem;color:#2a5f70;border-bottom:1px solid #e4f1f5">' + (q.customer ? q.customer.business : '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:.75rem;color:#2a5f70;border-bottom:1px solid #e4f1f5">' + (q.customer ? q.customer.phone : '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:.75rem;color:#1a8ba8;font-weight:700;border-bottom:1px solid #e4f1f5">R' + (q.monthlyTotal || 0).toLocaleString() + '/mo</td>' +
            '</tr>';
    }).join('');

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#fff">StockAI-Pro</div>' +
        '<div style="font-size:.72rem;color:#5EEAD4;letter-spacing:2px;margin-top:4px">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0">📊 Daily Quote Analysis</h2>' +
        '<p style="color:rgba(255,255,255,.8);margin:6px 0 0">' + todayQuotes.length + ' quote' + (todayQuotes.length > 1 ? 's' : '') + ' today — R' + totalMonthly.toLocaleString() + '/mo potential</p>' +
        '</div>' +
        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">' +
        '<div style="flex:1;min-width:130px;background:#e4f1f5;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:2rem;font-weight:900;color:#1a8ba8">' + todayQuotes.length + '</div>' +
        '<div style="font-size:.72rem;color:#5a8a96;font-weight:600;margin-top:4px">Quotes Today</div></div>' +
        '<div style="flex:1;min-width:130px;background:#d1fae5;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:900;color:#065f46">R' + totalMonthly.toLocaleString() + '</div>' +
        '<div style="font-size:.72rem;color:#047857;font-weight:600;margin-top:4px">Monthly Value</div></div>' +
        '<div style="flex:1;min-width:130px;background:#fef3c7;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:900;color:#92400e">R' + totalOnceOff.toLocaleString() + '</div>' +
        '<div style="font-size:.72rem;color:#a16207;font-weight:600;margin-top:4px">Once-off Value</div></div>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Ref</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Name</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Business</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Phone</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Monthly</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>' +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin-top:20px">© 2025 StockAI-Pro — www.stockai-pro.co.za</p>' +
        '</div></div>';

    return sendViaProxy(
        ADMIN_EMAIL,
        '📊 Daily Quotes: ' + todayQuotes.length + ' — R' + totalMonthly.toLocaleString() + '/mo potential',
        html
    );
}

// ============================================================
// AUTO DAILY TRIGGER — runs at 5pm if quotes exist
// ============================================================
function checkAndSendDailyAnalysis() {
    var lastSent = localStorage.getItem('stockai_daily_analysis_sent');
    var today    = new Date().toISOString().split('T')[0];
    if (lastSent === today) return;
    var quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    var todayQuotes = quotes.filter(function(q) {
        return q.timestamp && q.timestamp.startsWith(today);
    });
    if (todayQuotes.length > 0) {
        sendDailyQuoteAnalysis().then(function() {
            localStorage.setItem('stockai_daily_analysis_sent', today);
            console.log('📊 Daily analysis sent');
        });
    }
}

setTimeout(function() {
    if (new Date().getHours() >= 17) {
        checkAndSendDailyAnalysis();
    }
}, 5000);

// ============================================================
// REGISTER ALL FUNCTIONS ON WINDOW
// ============================================================
window.sendQuoteEmailToCustomer          = sendQuoteEmailToCustomer;
window.sendQuoteNotificationToAdmin      = sendQuoteNotificationToAdmin;
window.sendBookingConfirmationToCustomer = sendBookingConfirmationToCustomer;
window.sendBookingEmailToAdmin           = sendBookingEmailToAdmin;
window.sendDailyQuoteAnalysis            = sendDailyQuoteAnalysis;
window.checkAndSendDailyAnalysis         = checkAndSendDailyAnalysis;

// ============================================================
// CONFIRM LOADED
// ============================================================
console.log('✅ email-addon.js loaded successfully');
console.log('📧 Proxy URL:', PROXY_URL);
console.log('📧 sendQuoteEmailToCustomer:', typeof window.sendQuoteEmailToCustomer);
console.log('📧 sendQuoteNotificationToAdmin:', typeof window.sendQuoteNotificationToAdmin);
console.log('📧 sendBookingConfirmationToCustomer:', typeof window.sendBookingConfirmationToCustomer);
console.log('📧 sendBookingEmailToAdmin:', typeof window.sendBookingEmailToAdmin);
console.log('📧 sendDailyQuoteAnalysis:', typeof window.sendDailyQuoteAnalysis);
