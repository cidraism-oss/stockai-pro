// ============================================================
// email-addon.js — StockAI-Pro
// Sends emails via Cloudflare Worker proxy
// ============================================================

var PROXY_URL = 'https://bold-dust-c51b.cidraism.workers.dev/';

// ============================================================
// FEATURE MAPS — All 8 features
// ============================================================
var ADDON_FEATURE_MAP = {
    web_boh:         'Web App B.O.H',
    mobile_app:      'Mobile App',
    procure_ai:      'ProcureAI App',
    pos_system:      'P.O.S System',
    menu_master:     'Menu Master',
    functions_ai:    'FunctionsAI',
    retail_pos:      'Retail POS',
    invoice_scanner: 'Invoice Scanner App'
};

var ADDON_FEATURE_PRICES = {
    web_boh:         799,
    mobile_app:      349,
    procure_ai:      399,
    pos_system:      799,
    menu_master:     349,
    functions_ai:    449,
    retail_pos:      999,
    invoice_scanner: 499
};

var ADDON_SETUP_HOURS = {
    web_boh:         12,
    mobile_app:      1,
    procure_ai:      1,
    pos_system:      8,
    menu_master:     1,
    functions_ai:    1,
    retail_pos:      12,
    invoice_scanner: 1
};

var ENTITY_RATE  = 599;
var ADMIN_EMAIL  = 'cidraism@gmail.com';

// ============================================================
// CORE SEND FUNCTION
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
            console.log('✅ Email sent to:', recipients.join(', '));
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
// HELPER — Format Rand amount
// ============================================================
function fmtR(amount) {
    return 'R' + Number(amount || 0).toLocaleString('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
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

    var features   = data.features || [];
    var entities   = data.entities || 1;
    var entityTotal = entities * ENTITY_RATE;

    // ── Build feature rows ──
    // Web App BOH is always a FLAT fee — not per entity
    // All other features are also flat monthly fees
    var featureRows = '';

    features.forEach(function(f, i) {
        var price = ADDON_FEATURE_PRICES[f];
        // Make sure we get the price — fallback to 0 only if truly unknown
        if (price === undefined || price === null) {
            price = 0;
            console.warn('⚠️ Unknown feature price for:', f);
        }
        var name = ADDON_FEATURE_MAP[f] || (data.featureLabels && data.featureLabels[i]) || f;
        var isBase = (f === 'web_boh');

        featureRows +=
            '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:13px;color:#2a5f70;">' +
            (isBase
                ? '<span style="background:#e4f1f5;color:#1a8ba8;font-size:10px;font-weight:700;' +
                  'padding:2px 8px;border-radius:6px;margin-right:6px;">BASE</span>'
                : '<span style="background:#f0f7f9;color:#5a8a96;font-size:10px;font-weight:700;' +
                  'padding:2px 8px;border-radius:6px;margin-right:6px;">ADD-ON</span>') +
            name +
            '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:13px;' +
            'color:#0d4a5c;text-align:right;font-weight:700;">' +
            fmtR(price) + '/mo' +
            '</td>' +
            '</tr>';
    });

    // Entity row — clearly shown as per-location fee
    featureRows +=
        '<tr>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:13px;color:#2a5f70;">' +
        '<span style="background:#fef3c7;color:#d97706;font-size:10px;font-weight:700;' +
        'padding:2px 8px;border-radius:6px;margin-right:6px;">ENTITIES</span>' +
        entities + ' Location' + (entities > 1 ? 's' : '') + ' x R' + ENTITY_RATE.toLocaleString('en-ZA') + '/mo' +
        '</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:13px;' +
        'color:#0d4a5c;text-align:right;font-weight:700;">' +
        fmtR(entityTotal) + '/mo' +
        '</td>' +
        '</tr>';

    // ── Pre-selection URL ──
    var getStartedUrl = 'https://www.stockai-pro.co.za/signup.html' +
        '?features=' + features.join(',') +
        '&entities=' + entities +
        (data.techIncluded     ? '&tech=yes'                       : '') +
        (data.trainingIncluded ? '&training=yes'                   : '') +
        (data.extraStaff > 0  ? '&extrastaff=' + data.extraStaff  : '');

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;' +
        'border:1px solid #e4f1f5;border-radius:14px;overflow:hidden;">' +

        // ── Header ──
        '<div style="background:linear-gradient(135deg,#0d4a5c 0%,#1a8ba8 100%);padding:32px;text-align:center;">' +
        '<div style="font-size:26px;font-weight:900;color:#fff;letter-spacing:2px;">' +
        '<span style="color:#5EEAD4;">Stock</span><span style="color:#2DD4BF;">AI</span>' +
        '<span style="color:rgba(255,255,255,.75);">-Pro</span></div>' +
        '<div style="font-size:10px;color:#5EEAD4;letter-spacing:4px;margin-top:5px;opacity:.85;">' +
        'INTELLIGENCE A CLICK AWAY</div>' +
        '<div style="margin-top:18px;background:rgba(255,255,255,.1);border-radius:10px;padding:14px;">' +
        '<div style="color:rgba(255,255,255,.75);font-size:12px;margin-bottom:4px;">YOUR CUSTOM QUOTATION</div>' +
        '<div style="color:#f59e0b;font-size:11px;font-weight:600;">' +
        'Ref: ' + (data.quoteRef || '—') + ' &nbsp;|&nbsp; ' + (data.quoteDate || '—') +
        '</div></div>' +
        '</div>' +

        // ── Body ──
        '<div style="padding:28px;background:#ffffff;">' +

        // Greeting
        '<p style="color:#0d4a5c;font-size:15px;margin:0 0 8px;">Hi <strong>' +
        (data.customer.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin:0 0 24px;">' +
        'Thank you for using our quote builder! Here is your custom quotation. ' +
        'Click the button at the bottom to start your setup with these selections pre-filled.</p>' +

        // Customer details box
        '<div style="background:#f0f7f9;border-radius:10px;padding:16px;margin:0 0 24px;">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;text-transform:uppercase;' +
        'letter-spacing:1px;margin-bottom:10px;">Your Details</div>' +
        '<table style="width:100%;border-collapse:collapse;">' +
        '<tr><td style="padding:5px 0;font-size:12px;color:#5a8a96;width:35%;">Name</td>' +
        '<td style="padding:5px 0;font-size:13px;color:#0d4a5c;font-weight:600;">' + data.customer.name + '</td></tr>' +
        '<tr><td style="padding:5px 0;font-size:12px;color:#5a8a96;">Business</td>' +
        '<td style="padding:5px 0;font-size:13px;color:#0d4a5c;font-weight:600;">' + data.customer.business + '</td></tr>' +
        '<tr><td style="padding:5px 0;font-size:12px;color:#5a8a96;">Phone</td>' +
        '<td style="padding:5px 0;font-size:13px;color:#0d4a5c;font-weight:600;">' + data.customer.phone + '</td></tr>' +
        '<tr><td style="padding:5px 0;font-size:12px;color:#5a8a96;">Email</td>' +
        '<td style="padding:5px 0;font-size:13px;color:#0d4a5c;font-weight:600;">' + data.customer.email + '</td></tr>' +
        '</table></div>' +

        // Feature table
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;text-transform:uppercase;' +
        'letter-spacing:1px;margin:0 0 10px;">Monthly Subscription (incl. VAT)</div>' +
        '<table style="width:100%;border-collapse:collapse;margin:0 0 16px;">' +
        '<thead><tr style="background:#0d4a5c;">' +
        '<th style="padding:10px 14px;text-align:left;font-size:11px;color:#fff;font-weight:700;">DESCRIPTION</th>' +
        '<th style="padding:10px 14px;text-align:right;font-size:11px;color:#fff;font-weight:700;">MONTHLY</th>' +
        '</tr></thead>' +
        '<tbody>' + featureRows + '</tbody>' +
        '</table>' +

        // Monthly total box
        '<div style="background:#e4f1f5;padding:16px;text-align:right;border-radius:10px;margin:0 0 16px;">' +
        '<div style="font-size:12px;color:#5a8a96;margin-bottom:4px;">TOTAL MONTHLY SUBSCRIPTION (incl. VAT)</div>' +
        '<div style="font-size:20px;font-weight:900;color:#0d4a5c;">' + fmtR(data.monthlyTotal || 0) + '/mo</div>' +
        '</div>' +

        // Once-off charges
        (data.onceOffTotal > 0 ?
            '<div style="font-size:11px;font-weight:700;color:#d97706;text-transform:uppercase;' +
            'letter-spacing:1px;margin:0 0 10px;">Once-off Charges (incl. VAT)</div>' +
            '<table style="width:100%;border-collapse:collapse;margin:0 0 16px;">' +
            '<thead><tr style="background:#d97706;">' +
            '<th style="padding:10px 14px;text-align:left;font-size:11px;color:#fff;font-weight:700;">DESCRIPTION</th>' +
            '<th style="padding:10px 14px;text-align:right;font-size:11px;color:#fff;font-weight:700;">ONCE-OFF</th>' +
            '</tr></thead><tbody>' +
            (data.techIncluded && data.techHours > 0 ?
                '<tr><td style="padding:10px 14px;border-bottom:1px solid #fef3c7;font-size:13px;color:#2a5f70;">' +
                'Technician Setup (' + data.techHours + ' hrs x R450/hr)</td>' +
                '<td style="padding:10px 14px;border-bottom:1px solid #fef3c7;font-size:13px;' +
                'color:#0d4a5c;text-align:right;font-weight:700;">' + fmtR(data.techTotal || 0) + '</td></tr>'
            : '') +
            (data.trainingIncluded ?
                '<tr><td style="padding:10px 14px;border-bottom:1px solid #fef3c7;font-size:13px;color:#2a5f70;">' +
                'Staff Training (5 staff' + (data.extraStaff > 0 ? ' + ' + data.extraStaff + ' additional' : '') + ')</td>' +
                '<td style="padding:10px 14px;border-bottom:1px solid #fef3c7;font-size:13px;' +
                'color:#0d4a5c;text-align:right;font-weight:700;">' + fmtR(data.trainingTotal || 0) + '</td></tr>'
            : '') +
            '</tbody></table>' +
            '<div style="background:#fef3c7;padding:14px;text-align:right;border-radius:10px;margin:0 0 16px;">' +
            '<div style="font-size:12px;color:#a16207;margin-bottom:4px;">ONCE-OFF TOTAL (incl. VAT)</div>' +
            '<div style="font-size:18px;font-weight:900;color:#d97706;">' + fmtR(data.onceOffTotal || 0) + '</div>' +
            '</div>'
        : '') +

        // Guarantee
        '<div style="background:#d1fae5;border-radius:10px;padding:14px;text-align:center;margin:0 0 24px;">' +
        '<div style="font-size:13px;font-weight:700;color:#065f46;">30-Day Money-Back Guarantee</div>' +
        '<div style="font-size:11px;color:#047857;margin-top:4px;">' +
        'Not satisfied within 30 days? Full refund — no questions asked.</div>' +
        '</div>' +

        // CTA
        '<div style="text-align:center;margin:0 0 24px;">' +
        '<a href="' + getStartedUrl + '" style="display:inline-block;padding:16px 36px;' +
        'background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;text-decoration:none;' +
        'border-radius:10px;font-size:15px;font-weight:700;">Start Your Setup Now</a>' +
        '<div style="font-size:11px;color:#8aabb5;margin-top:8px;">' +
        'Your selections will be pre-filled on the next page.</div>' +
        '</div>' +

        // Footer
        '<hr style="border:0;border-top:1px solid #e4f1f5;margin:0 0 16px;">' +
        '<p style="text-align:center;color:#8aabb5;font-size:11px;margin:0;">' +
        'StockAI-Pro &bull; 079 044 0508 &bull; support@stockai-pro.co.za &bull; ' +
        '<a href="https://www.stockai-pro.co.za" style="color:#1a8ba8;text-decoration:none;">' +
        'www.stockai-pro.co.za</a></p>' +
        '<p style="text-align:center;color:#8aabb5;font-size:10px;margin:8px 0 0;">' +
        'This quotation is valid for 30 days from the date of issue.</p>' +
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

    var features    = data.features || [];
    var entities    = data.entities || 1;
    var entityTotal = entities * ENTITY_RATE;

    var featureList = features.map(function(f) {
        var price = ADDON_FEATURE_PRICES[f];
        if (price === undefined || price === null) price = 0;
        return (ADDON_FEATURE_MAP[f] || f) + ' — ' + fmtR(price) + '/mo';
    }).join('<br>');

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;' +
        'text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:22px;font-weight:900;color:#fff;">' +
        '<span style="color:#5EEAD4;">Stock</span><span style="color:#2DD4BF;">AI</span>' +
        '<span style="color:rgba(255,255,255,.75);">-Pro</span></div>' +
        '<div style="font-size:10px;color:#5EEAD4;letter-spacing:3px;margin-top:4px;">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0;font-size:16px;">New Quote Request</h2>' +
        '</div>' +

        '<div style="background:#fff;padding:28px;border:1px solid #e4f1f5;' +
        'border-top:none;border-radius:0 0 12px 12px;">' +
        '<p style="color:#5a8a96;margin:0 0 16px;font-size:13px;">A new quote was requested on the website:</p>' +

        '<table style="width:100%;border-collapse:collapse;margin:0 0 16px;">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;width:35%">Quote Ref</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (data.quoteRef || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Date</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (data.quoteDate || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Name</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (data.customer ? data.customer.name : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Business</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (data.customer ? data.customer.business : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Phone</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (data.customer ? data.customer.phone : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Email</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (data.customer ? data.customer.email : '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;vertical-align:top;">Features</td>' +
        '<td style="padding:8px 12px;font-size:12px;color:#0d4a5c;font-weight:600;line-height:1.8;">' + featureList + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Entities</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' +
        entities + ' location' + (entities > 1 ? 's' : '') + ' x ' + fmtR(ENTITY_RATE) + ' = ' + fmtR(entityTotal) + '/mo' +
        '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Technician</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' +
        (data.techIncluded
            ? 'Yes — ' + (data.techHours || 0) + ' hrs = ' + fmtR(data.techTotal || 0)
            : 'Not requested') +
        '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Training</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' +
        (data.trainingIncluded
            ? 'Yes — ' + fmtR(data.trainingTotal || 0) +
              (data.extraStaff > 0 ? ' (' + data.extraStaff + ' extra staff)' : ' (5 staff)')
            : 'Not requested') +
        '</td></tr>' +
        '<tr style="background:#e4f1f5;">' +
        '<td style="padding:12px;font-weight:900;color:#0d4a5c;font-size:14px;">Monthly Total</td>' +
        '<td style="padding:12px;font-weight:900;color:#1a8ba8;font-size:16px;">' + fmtR(data.monthlyTotal || 0) + '/mo</td></tr>' +
        '<tr style="background:#fef3c7;">' +
        '<td style="padding:12px;font-weight:900;color:#0d4a5c;font-size:14px;">Once-off Total</td>' +
        '<td style="padding:12px;font-weight:900;color:#d97706;font-size:16px;">' + fmtR(data.onceOffTotal || 0) + '</td></tr>' +
        '</table>' +

        '<p style="font-size:11px;color:#8aabb5;text-align:center;margin:0;">' +
        'StockAI-Pro — www.stockai-pro.co.za</p>' +
        '</div></div>';

    return sendViaProxy(
        ADMIN_EMAIL,
        'New Quote: ' + (data.customer ? data.customer.business : 'Unknown') +
        ' — ' + fmtR(data.monthlyTotal || 0) + '/mo',
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
    } catch(e) { console.warn('Date format error:', e); }

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;' +
        'border:1px solid #e4f1f5;border-radius:14px;overflow:hidden;">' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;text-align:center;">' +
        '<div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:2px;">' +
        '<span style="color:#5EEAD4;">Stock</span><span style="color:#2DD4BF;">AI</span>' +
        '<span style="color:rgba(255,255,255,.75);">-Pro</span></div>' +
        '<div style="font-size:10px;color:#5EEAD4;letter-spacing:4px;margin-top:5px;">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:16px 0 0;font-size:20px;">Presentation Confirmed!</h2>' +
        '</div>' +

        '<div style="padding:28px;background:#ffffff;">' +
        '<p style="color:#0d4a5c;font-size:15px;margin:0 0 8px;">Hi <strong>' +
        (booking.customer.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin:0 0 24px;">' +
        'Your StockAI-Pro presentation has been confirmed! We look forward to showing you what we can do for your business.</p>' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;' +
        'padding:24px;color:#fff;margin:0 0 24px;text-align:center;">' +
        '<div style="font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:.7;margin-bottom:10px;">Your Booking</div>' +
        '<div style="font-size:18px;font-weight:800;margin-bottom:6px;">' + dateFormatted + '</div>' +
        '<div style="font-size:15px;font-weight:700;color:#5EEAD4;">' + booking.slotLabel + '</div>' +
        '</div>' +

        '<table style="width:100%;border-collapse:collapse;margin:0 0 20px;">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;width:35%;">Booking ID</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.id + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Name</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Business</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Phone</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Address</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (booking.customer.address || '—') + '</td></tr>' +
        '</table>' +

        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;' +
        'padding:14px;margin:0 0 24px;text-align:center;">' +
        '<div style="font-size:13px;font-weight:700;color:#065f46;">Booking Confirmed</div>' +
        '<div style="font-size:12px;color:#047857;margin-top:4px;">' +
        'Need to reschedule? Contact us at least 24 hours in advance.</div>' +
        '</div>' +

        '<div style="text-align:center;margin:0 0 24px;">' +
        '<a href="https://wa.me/27790440508" style="display:inline-block;padding:12px 22px;' +
        'background:#25D366;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;margin:4px;font-size:13px;">WhatsApp Us</a>' +
        '<a href="tel:0790440508" style="display:inline-block;padding:12px 22px;' +
        'background:#1a8ba8;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;margin:4px;font-size:13px;">Call Us</a>' +
        '</div>' +

        '<hr style="border:0;border-top:1px solid #e4f1f5;margin:0 0 16px;">' +
        '<p style="text-align:center;color:#8aabb5;font-size:11px;margin:0;">' +
        '&copy; 2025 StockAI-Pro &bull; 079 044 0508 &bull; support@stockai-pro.co.za</p>' +
        '</div></div>';

    return sendViaProxy(
        booking.customer.email,
        'Presentation Confirmed — ' + dateFormatted + ' — StockAI-Pro',
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
    } catch(e) { console.warn('Date format error:', e); }

    var bookedAt = '—';
    try { bookedAt = new Date(booking.timestamp).toLocaleString('en-ZA'); }
    catch(e) { console.warn('Timestamp error:', e); }

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;' +
        'border:1px solid #e4f1f5;border-radius:14px;overflow:hidden;">' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;text-align:center;">' +
        '<div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:2px;">' +
        '<span style="color:#5EEAD4;">Stock</span><span style="color:#2DD4BF;">AI</span>' +
        '<span style="color:rgba(255,255,255,.75);">-Pro</span></div>' +
        '<div style="font-size:10px;color:#5EEAD4;letter-spacing:4px;margin-top:5px;">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:16px 0 0;font-size:18px;">New Presentation Booking!</h2>' +
        '</div>' +

        '<div style="padding:28px;background:#ffffff;">' +
        '<p style="color:#5a8a96;margin:0 0 20px;font-size:13px;">A new presentation has been booked. Please add this to your calendar!</p>' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;' +
        'padding:20px;color:#fff;margin:0 0 20px;text-align:center;">' +
        '<div style="font-size:18px;font-weight:800;margin-bottom:6px;">' + dateFormatted + '</div>' +
        '<div style="font-size:15px;font-weight:700;color:#5EEAD4;">' + booking.slotLabel + '</div>' +
        '</div>' +

        '<table style="width:100%;border-collapse:collapse;margin:0 0 16px;">' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;width:35%;">Booking ID</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.id + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Date</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + dateFormatted + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Time Slot</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.slotLabel + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Name</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.name + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Business</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.business + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Phone</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.phone + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Email</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + booking.customer.email + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Address</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + (booking.customer.address || '—') + '</td></tr>' +
        '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;color:#5a8a96;">Booked At</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600;">' + bookedAt + '</td></tr>' +
        '</table>' +

        '<div style="background:#fff8e1;border-left:4px solid #f59e0b;padding:14px;border-radius:8px;margin:0 0 20px;">' +
        '<p style="color:#5a4a17;font-size:13px;margin:0 0 6px;">' +
        '<strong>Add to your calendar:</strong> ' + dateFormatted + ' — ' + booking.slotLabel + '</p>' +
        '<p style="color:#5a4a17;font-size:13px;margin:0;">' +
        '<strong>Address:</strong> ' + (booking.customer.address || 'Not provided') + '</p>' +
        '</div>' +

        '<hr style="border:0;border-top:1px solid #e4f1f5;margin:0 0 16px;">' +
        '<p style="font-size:11px;color:#8aabb5;text-align:center;margin:0;">' +
        '&copy; 2025 StockAI-Pro</p>' +
        '</div></div>';

    return sendViaProxy(
        ADMIN_EMAIL,
        'New Booking: ' + booking.customer.business + ' — ' + dateFormatted,
        html
    );
}

// ============================================================
// EMAIL 15 — DAILY QUOTE ANALYSIS TO ADMIN
// ============================================================
function sendDailyQuoteAnalysis() {
    console.log('📊 sendDailyQuoteAnalysis called');

    var quotes = [];
    try {
        quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    } catch(e) {
        console.warn('localStorage read error:', e);
        return Promise.resolve({ ok: false });
    }

    var today = new Date().toISOString().split('T')[0];
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
        return '<tr style="background:' + bg + ';">' +
            '<td style="padding:8px 10px;font-size:12px;color:#2a5f70;border-bottom:1px solid #e4f1f5;">' + (q.quoteRef || '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:12px;color:#2a5f70;border-bottom:1px solid #e4f1f5;">' + (q.customer ? q.customer.name : '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:12px;color:#2a5f70;border-bottom:1px solid #e4f1f5;">' + (q.customer ? q.customer.business : '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:12px;color:#2a5f70;border-bottom:1px solid #e4f1f5;">' + (q.customer ? q.customer.phone : '—') + '</td>' +
            '<td style="padding:8px 10px;font-size:12px;color:#1a8ba8;font-weight:700;border-bottom:1px solid #e4f1f5;">' + fmtR(q.monthlyTotal || 0) + '/mo</td>' +
            '</tr>';
    }).join('');

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;' +
        'border:1px solid #e4f1f5;border-radius:14px;overflow:hidden;">' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;text-align:center;">' +
        '<div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:2px;">' +
        '<span style="color:#5EEAD4;">Stock</span><span style="color:#2DD4BF;">AI</span>' +
        '<span style="color:rgba(255,255,255,.75);">-Pro</span></div>' +
        '<div style="font-size:10px;color:#5EEAD4;letter-spacing:4px;margin-top:5px;">INTELLIGENCE A CLICK AWAY</div>' +
        '<h2 style="color:#fff;margin:14px 0 0;font-size:18px;">Daily Quote Analysis</h2>' +
        '<p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px;">' +
        todayQuotes.length + ' quote' + (todayQuotes.length > 1 ? 's' : '') +
        ' today — ' + fmtR(totalMonthly) + '/mo potential</p>' +
        '</div>' +

        '<div style="padding:28px;background:#ffffff;">' +

        // Stats
        '<table style="width:100%;border-collapse:collapse;margin:0 0 24px;">' +
        '<tr>' +
        '<td style="padding:16px;background:#e4f1f5;border-radius:8px;text-align:center;width:32%;">' +
        '<div style="font-size:30px;font-weight:900;color:#1a8ba8;">' + todayQuotes.length + '</div>' +
        '<div style="font-size:11px;color:#5a8a96;font-weight:600;margin-top:4px;">Quotes Today</div>' +
        '</td>' +
        '<td style="width:2%;"></td>' +
        '<td style="padding:16px;background:#d1fae5;border-radius:8px;text-align:center;width:32%;">' +
        '<div style="font-size:16px;font-weight:900;color:#065f46;">' + fmtR(totalMonthly) + '</div>' +
        '<div style="font-size:11px;color:#047857;font-weight:600;margin-top:4px;">Monthly Value</div>' +
        '</td>' +
        '<td style="width:2%;"></td>' +
        '<td style="padding:16px;background:#fef3c7;border-radius:8px;text-align:center;width:32%;">' +
        '<div style="font-size:16px;font-weight:900;color:#92400e;">' + fmtR(totalOnceOff) + '</div>' +
        '<div style="font-size:11px;color:#a16207;font-weight:600;margin-top:4px;">Once-off Value</div>' +
        '</td>' +
        '</tr>' +
        '</table>' +

        // Table
        '<table style="width:100%;border-collapse:collapse;">' +
        '<thead><tr style="background:#0d4a5c;">' +
        '<th style="padding:10px;text-align:left;font-size:11px;color:#fff;">Ref</th>' +
        '<th style="padding:10px;text-align:left;font-size:11px;color:#fff;">Name</th>' +
        '<th style="padding:10px;text-align:left;font-size:11px;color:#fff;">Business</th>' +
        '<th style="padding:10px;text-align:left;font-size:11px;color:#fff;">Phone</th>' +
        '<th style="padding:10px;text-align:left;font-size:11px;color:#fff;">Monthly</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>' +

        '<p style="font-size:11px;color:#8aabb5;text-align:center;margin:20px 0 0;">' +
        '&copy; 2025 StockAI-Pro — www.stockai-pro.co.za</p>' +
        '</div></div>';

    return sendViaProxy(
        ADMIN_EMAIL,
        'Daily Quotes: ' + todayQuotes.length + ' — ' + fmtR(totalMonthly) + '/mo potential',
        html
    );
}

// ============================================================
// AUTO DAILY TRIGGER
// ============================================================
function checkAndSendDailyAnalysis() {
    var lastSent = '';
    try { lastSent = localStorage.getItem('stockai_daily_analysis_sent') || ''; }
    catch(e) { console.warn('localStorage read error:', e); return; }

    var today = new Date().toISOString().split('T')[0];
    if (lastSent === today) return;

    var quotes = [];
    try { quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]'); }
    catch(e) { console.warn('localStorage parse error:', e); return; }

    var todayQuotes = quotes.filter(function(q) {
        return q.timestamp && q.timestamp.startsWith(today);
    });

    if (todayQuotes.length > 0) {
        sendDailyQuoteAnalysis().then(function() {
            try { localStorage.setItem('stockai_daily_analysis_sent', today); }
            catch(e) { console.warn('localStorage write error:', e); }
            console.log('📊 Daily analysis sent');
        });
    }
}

setTimeout(function() {
    if (new Date().getHours() >= 17) { checkAndSendDailyAnalysis(); }
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
