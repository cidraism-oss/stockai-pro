// ============================================================
// StockAI-Pro — email-templates.js v4.0
// UNIFIED email system — replaces email-templates.js
// and email-addon.js
// Routes through Cloudflare Worker proxy
// ============================================================

var EMAIL_CONFIG = {
    proxyUrl:  'https://bold-dust-c51b.cidraism.workers.dev/',
    admin:     'cidraism@gmail.com',
    support:   'support@stockai-pro.co.za',
    phone:     '079 044 0508',
    whatsapp:  'https://wa.me/27790440508',
    website:   'https://www.stockai-pro.co.za',
    appUrl:    'https://www.stockai-pro.co.za/hub.html',
    portalUrl: 'https://www.stockai-pro.co.za/portal.html'
};

var COMPANY = {
    name:    'HollowAqua Pty Ltd',
    trading: 'StockAI-Pro',
    phone:   '+27 79 044 0508',
    email:   'billing@stockai-pro.co.za',
    address: '16 Loddon Road, Mulbarton, 2059, Johannesburg South, Gauteng',
    website: 'www.stockai-pro.co.za'
};

// ── Single source of truth for all feature data ──
var FEATURE_CATALOGUE = {
    web_boh:         { name:'Web App B.O.H',            price:799,  setupHrs:12, alwaysOn:true,  icon:'fa-laptop-code',     color:'#2ea871' },
    mobile_app:      { name:'Mobile App',               price:349,  setupHrs:1,  alwaysOn:false, icon:'fa-mobile-alt',      color:'#1a8ba8' },
    procure_ai:      { name:'ProcureAI App',            price:399,  setupHrs:1,  alwaysOn:false, icon:'fa-shopping-basket', color:'#1a8ba8' },
    pos_system:      { name:'P.O.S System',             price:799,  setupHrs:8,  alwaysOn:false, icon:'fa-cash-register',   color:'#1a8ba8' },
    menu_master:     { name:'Menu Master',              price:349,  setupHrs:1,  alwaysOn:false, icon:'fa-utensils',        color:'#1a8ba8' },
    functions_ai:    { name:'FunctionsAI',              price:449,  setupHrs:1,  alwaysOn:false, icon:'fa-glass-cheers',    color:'#f59e0b' },
    retail_pos:      { name:'Retail POS',               price:999,  setupHrs:12, alwaysOn:false, icon:'fa-store',           color:'#6366f1' },
    production:      { name:'Production Manager',       price:449,  setupHrs:2,  alwaysOn:false, icon:'fa-industry',        color:'#1a8ba8' },
    hr_module:       { name:'HR Module',                price:349,  setupHrs:2,  alwaysOn:false, icon:'fa-users-cog',       color:'#8b5cf6' },
    invoice_scanner: { name:'Invoice Scanner App',      price:499,  setupHrs:2,  alwaysOn:false, icon:'fa-file-invoice',    color:'#10b981' },
    ai_brain:        { name:'AI Brain + Nikki',         price:499,  setupHrs:1,  alwaysOn:false, icon:'fa-robot',           color:'#0d9488' },
    pos_builder:     { name:'POS Builder',              price:0,    setupHrs:2,  alwaysOn:false, icon:'fa-tools',           color:'#6366f1', freeWith:['pos_system','retail_pos'] },
    cashup_pro:      { name:'CashUp-Pro',               price:0,    setupHrs:1,  alwaysOn:false, icon:'fa-calculator',      color:'#10b981', freeWith:['pos_system','retail_pos'] }
};

var ENTITY_RATE    = 599;
var TECH_RATE      = 450;
var TRAINING_BASE  = 1500;
var TRAINING_EXTRA = 750;

// ============================================================
// CORE SEND — only function that calls the proxy
// ============================================================
function sendEmail(to, subject, html) {
    if (!to || !subject || !html) {
        console.warn('sendEmail: missing fields');
        return Promise.resolve();
    }
    var recipients = (Array.isArray(to) ? to : [to])
        .filter(function(e) { return e && e.indexOf('@') !== -1; });
    if (!recipients.length) {
        console.warn('sendEmail: no valid recipients');
        return Promise.resolve();
    }
    console.log('📧 Sending to:', recipients.join(', '));
    return fetch(EMAIL_CONFIG.proxyUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ to: recipients, subject: subject, html: html })
    })
    .then(function(r) {
        if (r.ok) console.log('✅ Email sent');
        else      console.warn('⚠️ Email issue:', r.status);
        return r;
    })
    .catch(function(err) {
        console.warn('❌ Email error:', err.message || err);
    });
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function emailLogo() {
    return '<div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:2px">' +
        '<span style="color:#5EEAD4">Stock</span>' +
        '<span style="color:#2DD4BF">AI</span>' +
        '<span style="color:rgba(255,255,255,.75)">-Pro</span></div>' +
        '<div style="font-size:10px;color:#5EEAD4;letter-spacing:4px;margin-top:5px;opacity:.85">' +
        'INTELLIGENCE A CLICK AWAY</div>';
}

function emailHeader(title, subtitle, accentColor) {
    accentColor = accentColor || '#1a8ba8';
    return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
        '<body style="margin:0;padding:0;background:#f0f7f9;font-family:Arial,sans-serif">' +
        '<div style="max-width:620px;margin:0 auto;padding:20px 10px">' +
        '<div style="background:#fff;border-radius:14px;overflow:hidden;' +
        'box-shadow:0 4px 20px rgba(13,74,92,.1)">' +
        '<div style="background:linear-gradient(135deg,' + accentColor + ',#0d4a5c);' +
        'padding:28px;text-align:center">' +
        emailLogo() +
        (title ? '<h2 style="color:#fff;margin:14px 0 0;font-size:1.2rem">' + title + '</h2>' : '') +
        (subtitle ? '<p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:.85rem">' + subtitle + '</p>' : '') +
        '</div>' +
        '<div style="padding:28px">';
}

function emailFooter() {
    return '</div>' +
        '<div style="padding:16px 28px;border-top:1px solid #e4f1f5;text-align:center;' +
        'font-size:.72rem;color:#8aabb5">' +
        '<p style="margin:0">&copy; ' + new Date().getFullYear() + ' StockAI-Pro &bull; ' +
        EMAIL_CONFIG.phone + ' &bull; ' +
        '<a href="mailto:' + EMAIL_CONFIG.support + '" style="color:#1a8ba8">' + EMAIL_CONFIG.support + '</a></p>' +
        '<p style="margin:6px 0 0">' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="color:#25D366">WhatsApp</a> &nbsp;|&nbsp; ' +
        '<a href="' + EMAIL_CONFIG.website + '" style="color:#1a8ba8">Website</a>' +
        '</p></div></div></div></body></html>';
}

function emailInfoRow(label, value) {
    return '<tr><td style="padding:8px 12px;background:#f0f7f9;font-size:12px;' +
        'color:#5a8a96;font-weight:600;width:38%">' + label + '</td>' +
        '<td style="padding:8px 12px;font-size:13px;color:#0d4a5c;font-weight:600">' +
        value + '</td></tr>';
}

function emailTable(rows) {
    return '<table style="width:100%;border-collapse:collapse;margin:14px 0">' +
        rows.map(function(r) { return emailInfoRow(r[0], r[1]); }).join('') +
        '</table>';
}

function emailButton(label, url, color) {
    return '<div style="text-align:center;margin:20px 0">' +
        '<a href="' + url + '" style="display:inline-block;padding:14px 32px;' +
        'background:' + (color || '#1a8ba8') + ';color:#fff;text-decoration:none;' +
        'border-radius:10px;font-weight:700;font-size:.95rem">' + label + '</a></div>';
}

function fmtR(n) {
    return 'R' + Number(n || 0).toLocaleString('en-ZA',
        { minimumFractionDigits:2, maximumFractionDigits:2 });
}

// ============================================================
// EMAIL 1 — ENQUIRY RECEIVED (Admin notification)
// Called from: index.html Get Started form
// ============================================================
function emailEnquiryToAdmin(data) {
    var specialBadge = data.specialActive
        ? '<div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);' +
          'border-radius:10px;padding:12px;margin-bottom:16px;text-align:center;color:#fff">' +
          '<div style="font-weight:700;font-size:13px">🎉 LAUNCH SPECIAL CUSTOMER</div>' +
          '<div style="font-size:12px;opacity:.85">Qualifies for 30% off</div>' +
          '</div>'
        : '';

    var body = specialBadge +
        '<p style="color:#2a5f70;font-size:13px;margin-bottom:16px">' +
        'A new customer has submitted their details on the website:</p>' +
        emailTable([
            ['Name',        data.name],
            ['Business',    data.business],
            ['Phone',       '<a href="tel:' + data.phone + '" style="color:#1a8ba8">' + data.phone + '</a>'],
            ['Email',       '<a href="mailto:' + data.email + '" style="color:#1a8ba8">' + data.email + '</a>'],
            ['Type',        data.type],
            ['Locations',   data.entities],
            ['Message',     data.message || '—']
        ]) +
        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:8px">NEXT STEPS</div>' +
        '<div style="font-size:12px;color:#2a5f70;line-height:1.9">' +
        '1. Review their requirements above<br>' +
        '2. Go to your Hub dashboard to find this enquiry<br>' +
        '3. Click "Send Quote Link" to send them a pre-filled quote builder link<br>' +
        '4. Follow up via WhatsApp or phone' +
        '</div></div>' +
        '<div style="text-align:center">' +
        '<a href="' + EMAIL_CONFIG.appUrl + '" style="display:inline-block;' +
        'padding:12px 24px;background:#f59e0b;color:#fff;border-radius:8px;' +
        'text-decoration:none;font-weight:700;font-size:13px;margin:4px">' +
        'Open Hub Dashboard</a>' +
        '<a href="https://wa.me/' + data.phone.replace(/[^0-9]/g,'') + '" ' +
        'style="display:inline-block;padding:12px 24px;background:#25D366;color:#fff;' +
        'border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;margin:4px">' +
        'WhatsApp ' + data.name.split(' ')[0] + '</a>' +
        '</div>';

    return sendEmail(
        EMAIL_CONFIG.admin,
        '🚀 New Enquiry: ' + data.business + ' (' + data.type + ')',
        emailHeader('New Customer Enquiry', 'Action Required', '#0d4a5c') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 2 — ENQUIRY CONFIRMATION (Customer)
// Called from: index.html Get Started form
// ============================================================
function emailEnquiryToCustomer(data) {
    var specialBlock = data.specialActive
        ? '<div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);' +
          'border-radius:10px;padding:16px;margin:16px 0;text-align:center;color:#fff">' +
          '<div style="font-size:15px;font-weight:900;margin-bottom:4px">🎉 You qualify for the Launch Special!</div>' +
          '<div style="font-size:12px;opacity:.9">30% OFF your monthly subscription</div>' +
          '</div>'
        : '';

    var body =
        '<p style="color:#0d4a5c;font-size:15px;margin-bottom:8px">Hi <strong>' +
        data.name.split(' ')[0] + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin-bottom:16px">' +
        'Thank you for your interest in StockAI-Pro! We have received your details and ' +
        'will send you a personalised quote link within <strong style="color:#0d4a5c">24 hours</strong>.</p>' +
        specialBlock +
        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin:16px 0">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:10px">' +
        'WHAT HAPPENS NEXT</div>' +
        '<div style="font-size:13px;color:#2a5f70;line-height:1.9">' +
        '1. Our team reviews your requirements<br>' +
        '2. We send you a personalised quote link<br>' +
        '3. You select your features and pay securely<br>' +
        '4. Your account is live within minutes' +
        '</div></div>' +
        '<div style="background:#d1fae5;border-radius:10px;padding:12px;text-align:center;margin:16px 0">' +
        '<div style="color:#065f46;font-weight:700;font-size:13px">✅ 30-Day Money-Back Guarantee</div>' +
        '</div>' +
        '<div style="text-align:center">' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="display:inline-block;padding:12px 20px;' +
        'background:#25D366;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;font-size:13px;margin:4px">💬 WhatsApp Us</a>' +
        '<a href="tel:0790440508" style="display:inline-block;padding:12px 20px;' +
        'background:#1a8ba8;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;font-size:13px;margin:4px">📞 Call Us</a>' +
        '</div>';

    return sendEmail(
        data.email,
        'We\'ve Received Your Details — StockAI-Pro',
        emailHeader('Details Received!', 'We\'ll be in touch within 24 hours') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 3 — BOOKING CONFIRMATION (Customer)
// Called from: index.html booking modal
// ============================================================
function emailBookingToCustomer(booking) {
    var dateFormatted = booking.date;
    try {
        dateFormatted = new Date(booking.date + 'T00:00:00')
            .toLocaleDateString('en-ZA', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    } catch(e) {}

    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + booking.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin-bottom:20px">' +
        'Your StockAI-Pro presentation has been confirmed!</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;' +
        'padding:20px;color:#fff;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:11px;opacity:.7;letter-spacing:2px;margin-bottom:8px">YOUR BOOKING</div>' +
        '<div style="font-size:17px;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:14px;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        emailTable([
            ['Booking ID', booking.id],
            ['Name',       booking.customer.name],
            ['Business',   booking.customer.business],
            ['Phone',      booking.customer.phone],
            ['Address',    booking.customer.address || '—']
        ]) +
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;' +
        'padding:12px;text-align:center;margin-top:16px">' +
        '<div style="color:#065f46;font-size:13px;font-weight:700">Booking Confirmed ✅</div>' +
        '<div style="color:#047857;font-size:12px;margin-top:4px">Need to reschedule? Contact us 24hrs in advance.</div>' +
        '</div>' +
        '<div style="text-align:center;margin-top:16px">' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="display:inline-block;padding:12px 20px;' +
        'background:#25D366;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;font-size:13px;margin:4px">WhatsApp Us</a>' +
        '</div>';

    return sendEmail(
        booking.customer.email,
        'Presentation Confirmed — ' + dateFormatted + ' — StockAI-Pro',
        emailHeader('Presentation Confirmed! 🎉', '') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 4 — BOOKING NOTIFICATION (Admin)
// Called from: index.html booking modal
// ============================================================
function emailBookingToAdmin(booking) {
    var dateFormatted = booking.date;
    try {
        dateFormatted = new Date(booking.date + 'T00:00:00')
            .toLocaleDateString('en-ZA', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    } catch(e) {}

    var body =
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">' +
        'A new presentation has been booked. Add to your calendar!</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;' +
        'padding:16px;color:#fff;margin-bottom:16px;text-align:center">' +
        '<div style="font-size:17px;font-weight:800;margin-bottom:4px">' + dateFormatted + '</div>' +
        '<div style="font-size:14px;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        emailTable([
            ['Booking ID', booking.id],
            ['Name',       booking.customer.name],
            ['Business',   booking.customer.business],
            ['Phone',      booking.customer.phone],
            ['Email',      booking.customer.email],
            ['Address',    booking.customer.address || '—']
        ]) +
        '<div style="background:#fff8e1;border-left:4px solid #f59e0b;padding:12px;border-radius:8px;margin-top:16px">' +
        '<strong>Calendar entry:</strong> ' + dateFormatted + ' — ' + booking.slotLabel + '<br>' +
        '<strong>Address:</strong> ' + (booking.customer.address || 'Not provided') +
        '</div>';

    return sendEmail(
        EMAIL_CONFIG.admin,
        'New Booking: ' + booking.customer.business + ' — ' + dateFormatted,
        emailHeader('New Presentation Booking!', '') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 5 — QUOTE EMAIL (Customer receives quote builder link)
// Called from: hub.html when admin sends quote to customer
// ============================================================
function emailQuoteToCustomer(data) {
    // data: { customer:{name,email,phone,business}, features:[], entities:1,
    //         techIncluded, techHours, techTotal, trainingIncluded,
    //         trainingTotal, extraStaff, monthlyTotal, onceOffTotal,
    //         quoteRef, quoteDate, quoteLink }

    var featureRows = (data.features || []).map(function(key) {
        var f     = FEATURE_CATALOGUE[key];
        var price = f ? f.price : 0;
        var name  = f ? f.name  : key;
        var isBase = (key === 'web_boh');
        return '<tr>' +
            '<td style="padding:9px 12px;border-bottom:1px solid #e4f1f5;font-size:13px;color:#2a5f70">' +
            '<span style="background:' + (isBase ? '#e4f1f5' : '#f0f7f9') + ';' +
            'color:#1a8ba8;font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;margin-right:6px">' +
            (isBase ? 'BASE' : 'ADD-ON') + '</span>' + name + '</td>' +
            '<td style="padding:9px 12px;border-bottom:1px solid #e4f1f5;font-size:13px;' +
            'color:#0d4a5c;text-align:right;font-weight:700">' +
            (price === 0 ? '<span style="color:#2ea871">Free ✓</span>' : fmtR(price) + '/mo') +
            '</td></tr>';
    }).join('');

    featureRows += '<tr>' +
        '<td style="padding:9px 12px;border-bottom:1px solid #e4f1f5;font-size:13px;color:#2a5f70">' +
        '<span style="background:#fef3c7;color:#d97706;font-size:10px;font-weight:700;' +
        'padding:2px 8px;border-radius:6px;margin-right:6px">ENTITIES</span>' +
        (data.entities || 1) + ' Location' + ((data.entities || 1) > 1 ? 's' : '') +
        ' × ' + fmtR(ENTITY_RATE) + '/mo</td>' +
        '<td style="padding:9px 12px;border-bottom:1px solid #e4f1f5;font-size:13px;' +
        'color:#0d4a5c;text-align:right;font-weight:700">' +
        fmtR((data.entities || 1) * ENTITY_RATE) + '/mo</td></tr>';

    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' +
        (data.customer.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin-bottom:20px">' +
        'Your custom StockAI-Pro quote is ready! Review your package below and ' +
        'click the button to go straight to checkout with everything pre-filled.</p>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:8px">YOUR DETAILS</div>' +
        emailTable([
            ['Name',     data.customer.name],
            ['Business', data.customer.business],
            ['Phone',    data.customer.phone],
            ['Email',    data.customer.email]
        ]) +
        '</div>' +

        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:8px">' +
        'YOUR QUOTE — Ref: ' + (data.quoteRef || '—') + '</div>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px 12px;text-align:left;font-size:11px;color:#fff">DESCRIPTION</th>' +
        '<th style="padding:10px 12px;text-align:right;font-size:11px;color:#fff">MONTHLY</th>' +
        '</tr></thead><tbody>' + featureRows + '</tbody></table>' +

        '<div style="background:#e4f1f5;border-radius:10px;padding:14px;text-align:right;margin-bottom:16px">' +
        '<div style="font-size:12px;color:#5a8a96;margin-bottom:4px">TOTAL MONTHLY (incl. VAT)</div>' +
        '<div style="font-size:20px;font-weight:900;color:#0d4a5c">' + fmtR(data.monthlyTotal) + '/mo</div>' +
        '</div>' +

        (data.onceOffTotal > 0
            ? '<div style="background:#fef3c7;border-radius:10px;padding:14px;text-align:right;margin-bottom:16px">' +
              '<div style="font-size:12px;color:#a16207;margin-bottom:4px">ONCE-OFF CHARGES</div>' +
              '<div style="font-size:18px;font-weight:900;color:#d97706">' + fmtR(data.onceOffTotal) + '</div>' +
              '</div>'
            : '') +

        '<div style="background:#d1fae5;border-radius:10px;padding:12px;text-align:center;margin-bottom:20px">' +
        '<div style="color:#065f46;font-weight:700;font-size:13px">30-Day Money-Back Guarantee</div>' +
        '</div>' +

        '<div style="text-align:center">' +
        '<a href="' + data.quoteLink + '" style="display:inline-block;padding:16px 36px;' +
        'background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;text-decoration:none;' +
        'border-radius:10px;font-size:15px;font-weight:700">' +
        '🚀 Build My Package & Pay Now</a>' +
        '<div style="font-size:11px;color:#8aabb5;margin-top:8px">Your selections will be pre-filled</div>' +
        '</div>';

    return sendEmail(
        data.customer.email,
        'Your StockAI-Pro Quote — ' + (data.quoteRef || ''),
        emailHeader('Your Custom Quote is Ready!', data.quoteDate || '') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 6 — PAYMENT SUCCESS + SETUP LINK (Customer)
// Called from: quote-builder.html after Paystack success
// ============================================================
function emailPaymentAndSetup(data) {
    // data: { name, email, features:[], entities, monthlyTotal,
    //         onceOffTotal, paymentRef, setupLink }

    var featureList = (data.features || []).map(function(key) {
        var f = FEATURE_CATALOGUE[key];
        return f ? (f.price === 0 ? '🎁 ' + f.name + ' (Free)' : '✅ ' + f.name) : key;
    }).join('<br>');

    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' +
        (data.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin-bottom:20px">' +
        'Your payment was successful! Your StockAI-Pro account is ready to be set up.</p>' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:10px;' +
        'padding:18px;text-align:center;margin-bottom:20px">' +
        '<div style="color:rgba(255,255,255,.75);font-size:12px;margin-bottom:4px">Payment Confirmed</div>' +
        '<div style="color:#f59e0b;font-size:22px;font-weight:900">' + fmtR(data.monthlyTotal) + '/mo</div>' +
        '<div style="color:rgba(255,255,255,.6);font-size:11px;margin-top:4px">' +
        'Reference: ' + (data.paymentRef || '—') + '</div>' +
        '</div>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:20px">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:10px">YOUR PACKAGE INCLUDES</div>' +
        '<div style="font-size:13px;color:#0d4a5c;line-height:2">' + featureList + '</div>' +
        '<div style="font-size:12px;color:#2a5f70;margin-top:8px">' +
        '<strong>Locations:</strong> ' + (data.entities || 1) + '</div>' +
        '</div>' +

        '<div style="background:rgba(46,168,113,.1);border:1px solid rgba(46,168,113,.3);' +
        'border-radius:10px;padding:14px;margin-bottom:20px;text-align:center">' +
        '<div style="color:#065f46;font-weight:700;font-size:13px;margin-bottom:6px">⬇️ Next Step: Set Up Your Account</div>' +
        '<div style="color:#047857;font-size:12px">Click below to create your username and password. ' +
        'This link is for you only.</div>' +
        '</div>' +

        '<div style="text-align:center;margin-bottom:20px">' +
        '<a href="' + data.setupLink + '" style="display:inline-block;padding:16px 36px;' +
        'background:linear-gradient(135deg,#2ea871,#1a7a4a);color:#fff;text-decoration:none;' +
        'border-radius:10px;font-size:15px;font-weight:700">' +
        'Set Up My Account Now →</a>' +
        '</div>' +

        '<div style="background:#d1fae5;border-radius:10px;padding:12px;text-align:center;margin-bottom:16px">' +
        '<div style="color:#065f46;font-size:13px;font-weight:700">30-Day Money-Back Guarantee</div>' +
        '</div>' +

        '<div style="text-align:center">' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="display:inline-block;padding:10px 20px;' +
        'background:#25D366;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;font-size:13px;margin:4px">💬 WhatsApp Support</a>' +
        '</div>';

    return sendEmail(
        data.email,
        'Payment Confirmed — Set Up Your StockAI-Pro Account',
        emailHeader('Payment Successful! 🎉', 'Your account is ready to be set up', '#2ea871') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 7 — NEW CUSTOMER NOTIFICATION (Admin)
// Called from: quote-builder.html after Paystack success
// ============================================================
function emailNewCustomerToAdmin(data) {
    var featureNames = (data.features || []).map(function(key) {
        var f = FEATURE_CATALOGUE[key];
        return f ? f.name : key;
    }).join(', ');

    var body =
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">' +
        'A new customer has completed payment and is setting up their account.</p>' +
        '<div style="background:rgba(46,168,113,.08);border:1px solid rgba(46,168,113,.2);' +
        'border-radius:10px;padding:16px;margin-bottom:16px;text-align:center">' +
        '<div style="font-size:22px;font-weight:900;color:#0d4a5c">' + fmtR(data.monthlyTotal) + '/mo</div>' +
        '<div style="font-size:12px;color:#5a8a96;margin-top:4px">New recurring revenue</div>' +
        '</div>' +
        emailTable([
            ['Name',       data.name   || '—'],
            ['Email',      data.email  || '—'],
            ['Phone',      data.phone  || '—'],
            ['Features',   featureNames],
            ['Entities',   String(data.entities || 1)],
            ['Monthly',    fmtR(data.monthlyTotal) + '/mo'],
            ['Once-off',   fmtR(data.onceOffTotal || 0)],
            ['Payment Ref', data.paymentRef || '—']
        ]);

    return sendEmail(
        EMAIL_CONFIG.admin,
        '💰 New Customer: ' + (data.name || 'Unknown') + ' — ' + fmtR(data.monthlyTotal) + '/mo',
        emailHeader('New Customer Signed Up!', '') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 8 — WELCOME EMAIL (after account setup)
// Called from: setup.html after Firebase account created
// ============================================================
function emailWelcome(data) {
    var body =
        '<p style="color:#0d4a5c;font-size:15px">Welcome to StockAI-Pro, <strong>' +
        (data.name || 'there') + '</strong>!</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin-bottom:20px">' +
        'Your account has been created successfully. You are ready to start ' +
        'managing your business smarter.</p>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:8px">YOUR LOGIN DETAILS</div>' +
        '<div style="font-size:13px;color:#0d4a5c;line-height:2">' +
        '<strong>Email:</strong> ' + (data.email || '') + '<br>' +
        '<strong>Password:</strong> The one you just created<br>' +
        '<strong>Portal:</strong> <a href="' + EMAIL_CONFIG.portalUrl + '" style="color:#1a8ba8">' +
        'stockai-pro.co.za/portal.html</a>' +
        '</div></div>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:20px">' +
        '<div style="font-size:11px;font-weight:700;color:#1a8ba8;margin-bottom:8px">GETTING STARTED</div>' +
        '<div style="font-size:13px;color:#2a5f70;line-height:1.9">' +
        '1. Log in to your Owner Portal to manage your account<br>' +
        '2. Create your entity in the portal<br>' +
        '3. Log in to the app to start adding stock<br>' +
        '4. Say "Hey Nikki" to activate your AI assistant' +
        '</div></div>' +

        emailButton('Open Owner Portal', EMAIL_CONFIG.portalUrl, '#1a8ba8') +

        '<div style="text-align:center">' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="display:inline-block;padding:10px 20px;' +
        'background:#25D366;color:#fff;border-radius:8px;text-decoration:none;' +
        'font-weight:700;font-size:13px;margin:4px">💬 WhatsApp Support</a>' +
        '</div>';

    return sendEmail(
        data.email,
        'Welcome to StockAI-Pro — Your Account is Ready!',
        emailHeader('Your Account is Live! 🎉', '', '#2ea871') + body + emailFooter()
    );
}

// ============================================================
// EMAIL 9 — UPGRADE CONFIRMATION (Customer + Admin)
// Called from: upgrade.html after Paystack success
// ============================================================
function emailUpgradeConfirmation(data) {
    var featureRows = (data.features || []).map(function(key) {
        var f = FEATURE_CATALOGUE[key];
        return '<tr>' +
            '<td style="padding:9px 12px;border-bottom:1px solid #e4f1f5;font-size:13px;color:#2a5f70">' +
            (f ? f.name : key) + '</td>' +
            '<td style="padding:9px 12px;border-bottom:1px solid #e4f1f5;font-size:13px;' +
            'color:#0d4a5c;text-align:right;font-weight:700">' +
            fmtR(f ? f.price : 0) + '/mo</td></tr>';
    }).join('');

    var customerBody =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + (data.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;line-height:1.7;margin-bottom:20px">' +
        'Your upgrade was successful! Your new features are live immediately.</p>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;color:#fff;font-size:11px">NEW FEATURE</th>' +
        '<th style="padding:10px;text-align:right;color:#fff;font-size:11px">MONTHLY</th>' +
        '</tr></thead><tbody>' + featureRows + '</tbody></table>' +
        emailTable([
            ['Entity',     data.entityName || '—'],
            ['Total Added', '+' + fmtR(data.amount) + '/mo'],
            ['Payment Ref', data.ref  || '—'],
            ['Date',        data.date || '—']
        ]) +
        '<div style="background:#d1fae5;border-radius:10px;padding:12px;text-align:center;margin:16px 0">' +
        '<div style="color:#065f46;font-weight:700">Features are live — refresh your app</div>' +
        '</div>' +
        emailButton('Open My App', EMAIL_CONFIG.appUrl, '#2ea871');

    var adminBody =
        '<p style="color:#5a8a96;font-size:13px">A customer has purchased additional features.</p>' +
        emailTable([
            ['Customer',    data.name        || '—'],
            ['Email',       data.email       || '—'],
            ['Entity',      data.entityName  || '—'],
            ['Features',    data.featureNames || '—'],
            ['Amount',      '+' + fmtR(data.amount) + '/mo'],
            ['Payment Ref', data.ref         || '—']
        ]);

    return Promise.all([
        sendEmail(
            data.email,
            'Upgrade Confirmed — ' + (data.entityName || 'Your Entity'),
            emailHeader('Upgrade Confirmed! ✅', '', '#2ea871') + customerBody + emailFooter()
        ),
        sendEmail(
            EMAIL_CONFIG.admin,
            'Customer Upgraded: ' + (data.name || '—') + ' — +' + fmtR(data.amount) + '/mo',
            emailHeader('Customer Upgraded!', '') + adminBody + emailFooter()
        )
    ]);
}

// ============================================================
// EMAIL 10 — OPERATIONAL EMAILS (from within the app)
// These are called by the hub/app — kept here for reference
// ============================================================

function emailPurchaseOrder(data) {
    var itemRows = (data.items || []).map(function(item) {
        return '<tr><td style="padding:8px 10px;border-bottom:1px solid #f0f7f9">' + item.name +
            '</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f7f9">' +
            item.qty + ' ' + item.unit +
            '</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f7f9">' +
            fmtR(item.cost) +
            '</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f7f9;font-weight:700">' +
            fmtR(item.total) + '</td></tr>';
    }).join('');
    var body =
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">Hi <strong>' +
        (data.supplierName || 'Supplier') + '</strong>,<br>' +
        'Please find your purchase order below from <strong>' + (data.entityName || '') + '</strong>.</p>' +
        emailTable([
            ['PO Number',   data.poId      || '—'],
            ['From',        data.entityName || '—'],
            ['Date',        data.createdAt  || '—'],
            ['Created By',  data.createdBy  || '—']
        ]) +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:8px 10px;color:#fff;text-align:left;font-size:11px">Item</th>' +
        '<th style="padding:8px 10px;color:#fff;text-align:center;font-size:11px">Qty</th>' +
        '<th style="padding:8px 10px;color:#fff;text-align:right;font-size:11px">Unit Cost</th>' +
        '<th style="padding:8px 10px;color:#fff;text-align:right;font-size:11px">Total</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody>' +
        '<tfoot><tr style="background:#e4f1f5">' +
        '<td colspan="3" style="padding:10px;font-weight:700;text-align:right">ORDER TOTAL:</td>' +
        '<td style="padding:10px;font-weight:800;color:#1a8ba8;text-align:right">' + fmtR(data.total) + '</td>' +
        '</tr></tfoot></table>';
    return sendEmail(data.supplierEmail,
        'Purchase Order ' + data.poId + ' from ' + data.entityName,
        emailHeader('New Purchase Order', data.entityName) + body + emailFooter());
}

function emailPaymentDue(data) {
    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + data.ownerName + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">Your StockAI-Pro subscription payment is due today.</p>' +
        '<div style="background:rgba(201,69,69,.06);border:1px solid rgba(201,69,69,.2);' +
        'border-radius:12px;padding:20px;text-align:center;margin:16px 0">' +
        '<div style="font-size:12px;color:#5a8a96;margin-bottom:6px">AMOUNT DUE</div>' +
        '<div style="font-size:2.2rem;font-weight:900;color:#c94545">' + fmtR(data.amount) + '</div>' +
        '<div style="font-size:12px;color:#5a8a96;margin-top:4px">' + data.plan + ' • Due: ' + data.dueDate + '</div>' +
        '</div>' +
        emailButton('Pay Now via Portal', EMAIL_CONFIG.portalUrl, '#c94545');
    return sendEmail(data.ownerEmail, 'Payment Due Today — StockAI-Pro',
        emailHeader('Payment Due Today', '', '#c94545') + body + emailFooter());
}

function emailPaymentReceived(data) {
    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + (data.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">Thank you! Your payment has been received.</p>' +
        emailTable([
            ['Reference', data.paymentRef || '—'],
            ['Date',      new Date().toLocaleDateString('en-ZA')],
            ['Amount',    fmtR(data.amount)],
            ['Period',    data.period || 'Monthly']
        ]) +
        emailButton('Open StockAI-Pro', EMAIL_CONFIG.appUrl, '#2ea871');
    return sendEmail(data.email, 'Payment Received — StockAI-Pro',
        emailHeader('Payment Received ✅', '', '#2ea871') + body + emailFooter());
}

function emailPasswordReset(data) {
    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + (data.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">We received a request to reset your password.</p>' +
        emailButton('Reset My Password', data.resetLink || '#', '#1a8ba8') +
        '<div style="background:rgba(212,160,23,.1);border-left:3px solid #d4a017;' +
        'padding:12px;border-radius:8px;font-size:13px;color:#7a5800;margin-top:14px">' +
        'This link expires in <strong>1 hour</strong>. If you did not request this, ignore this email.' +
        '</div>';
    return sendEmail(data.email, 'Reset Your StockAI-Pro Password',
        emailHeader('Password Reset Request', '') + body + emailFooter());
}

function emailNewUserInvite(data) {
    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">' +
        '<strong>' + data.invitedBy + '</strong> has added you to StockAI-Pro for ' +
        '<strong>' + data.entityName + '</strong>.</p>' +
        emailTable([
            ['Your Name',   data.name],
            ['Your Role',   data.role],
            ['Entity',      data.entityName],
            ['Login Email', data.email]
        ]) +
        emailButton('Set Up My Account', data.inviteLink || EMAIL_CONFIG.appUrl, '#2ea871');
    return sendEmail(data.email,
        'You\'ve Been Invited to StockAI-Pro — ' + data.entityName,
        emailHeader('You\'ve Been Invited!', 'Invited by ' + data.invitedBy) + body + emailFooter());
}

function emailAIBrainActivated(data) {
    var body =
        '<p style="color:#0d4a5c;font-size:15px">Hi <strong>' + (data.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;font-size:13px;margin-bottom:16px">Your AI Brain + Nikki Voice Bot is now active!</p>' +
        '<div style="background:#f0fffe;border-radius:10px;padding:14px;margin-bottom:16px;border:1px solid #c0eee8">' +
        '<div style="font-size:13px;color:#2a5f70;line-height:1.9">' +
        'Just say <strong>"Hey Nikki"</strong> to activate<br>' +
        '"Show me today\'s low stock"<br>"What were yesterday\'s sales?"<br>' +
        '"Create a PO for FreshFarm"<br>Responds in 6 languages' +
        '</div></div>' +
        '<div style="background:rgba(26,139,168,.1);border-left:3px solid #1a8ba8;' +
        'padding:12px;border-radius:8px;font-size:13px;color:#0d4a5c;margin-bottom:14px">' +
        '<strong>Setup:</strong> Add your OpenAI API key in Settings to enable AI responses.' +
        '</div>' +
        emailButton('Launch StockAI-Pro', EMAIL_CONFIG.appUrl, '#0d9488');
    return sendEmail(data.email, 'Nikki AI Brain is Now Active — StockAI-Pro',
        emailHeader('Nikki is Ready! 🤖', '', '#0d9488') + body + emailFooter());
}

// ============================================================
// INVOICE & STATEMENT GENERATORS
// (Used by portal.html viewPortalInvoice / viewPortalStatement)
// ============================================================
var PRICING = { baseFee:799, entityFee:599, vatRate:0.15 };

function generateInvoiceHTML(data) {
    var entities   = data.entities || [];
    var baseExcl   = parseFloat((PRICING.baseFee   / 1.15).toFixed(2));
    var entityExcl = parseFloat((PRICING.entityFee / 1.15).toFixed(2));
    var subtotal   = 0;
    var lineItems  = '';

    lineItems += '<tr>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:13px">StockAI-Pro Platform Fee</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:center">1</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:right">' + fmtR(baseExcl) + '</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:right;font-weight:600">' + fmtR(baseExcl) + '</td></tr>';
    subtotal += baseExcl;

    entities.forEach(function(ent) {
        lineItems += '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:13px">Entity — ' + ent.name + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:center">1</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:right">' + fmtR(entityExcl) + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:right;font-weight:600">' + fmtR(entityExcl) + '</td></tr>';
        subtotal += entityExcl;
    });

    var vatAmount = parseFloat((subtotal * 0.15).toFixed(2));
    var total     = parseFloat((subtotal + vatAmount).toFixed(2));

    return '<div style="font-family:Arial,sans-serif;max-width:700px;background:#fff">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;border-radius:12px 12px 0 0">' +
        '<table style="width:100%"><tr>' +
        '<td><div style="font-size:20px;font-weight:900;color:#fff">STOCKAI-PRO</div>' +
        '<div style="color:rgba(255,255,255,.7);font-size:12px">Intelligence a click away</div></td>' +
        '<td style="text-align:right"><div style="background:rgba(255,255,255,.15);padding:10px 18px;border-radius:8px">' +
        '<div style="color:#fff;font-size:1.2rem;font-weight:900">TAX INVOICE</div>' +
        '<div style="color:rgba(255,255,255,.8);font-size:12px">#' + data.invoiceNumber + '</div>' +
        '</div></td></tr></table></div>' +
        '<div style="padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<table style="width:100%;margin-bottom:24px"><tr>' +
        '<td style="width:50%;vertical-align:top">' +
        '<div style="font-size:10px;color:#8aabb5;text-transform:uppercase;font-weight:700;margin-bottom:6px">From</div>' +
        '<div style="font-weight:700;color:#0d4a5c">' + COMPANY.name + '</div>' +
        '<div style="color:#5a8a96;font-size:12px;line-height:1.8;margin-top:4px">' +
        'T/A ' + COMPANY.trading + '<br>' + COMPANY.address + '<br>' +
        COMPANY.phone + '<br>' + COMPANY.email + '</div></td>' +
        '<td style="width:50%;vertical-align:top">' +
        '<div style="font-size:10px;color:#8aabb5;text-transform:uppercase;font-weight:700;margin-bottom:6px">Bill To</div>' +
        '<div style="font-weight:700;color:#0d4a5c">' + (data.companyName || data.ownerName) + '</div>' +
        '<div style="color:#5a8a96;font-size:12px;line-height:1.8;margin-top:4px">' +
        (data.companyAddress || '') + '<br>' + (data.ownerEmail || '') +
        (data.companyVat ? '<br>VAT: ' + data.companyVat : '') + '</div></td>' +
        '</tr></table>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px 14px;color:#fff;text-align:left;font-size:11px">Description</th>' +
        '<th style="padding:10px 14px;color:#fff;text-align:center;font-size:11px">Qty</th>' +
        '<th style="padding:10px 14px;color:#fff;text-align:right;font-size:11px">Unit Price</th>' +
        '<th style="padding:10px 14px;color:#fff;text-align:right;font-size:11px">Amount</th>' +
        '</tr></thead><tbody>' + lineItems + '</tbody></table>' +
        '<div style="text-align:right;margin-bottom:20px">' +
        '<table style="margin-left:auto"><tr>' +
        '<td style="padding:6px 12px;color:#5a8a96;font-size:13px">Subtotal (excl. VAT)</td>' +
        '<td style="padding:6px 12px;font-weight:700">' + fmtR(subtotal) + '</td></tr><tr>' +
        '<td style="padding:6px 12px;color:#5a8a96;font-size:13px;border-bottom:1px solid #e4f1f5">VAT (15%)</td>' +
        '<td style="padding:6px 12px;font-weight:700;border-bottom:1px solid #e4f1f5">' + fmtR(vatAmount) + '</td></tr><tr>' +
        '<td style="padding:10px 12px;font-size:1rem;font-weight:900;color:#1a8ba8">TOTAL (incl. VAT)</td>' +
        '<td style="padding:10px 12px;font-size:1rem;font-weight:900;color:#1a8ba8">' + fmtR(total) + '</td>' +
        '</tr></table></div>' +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;border-radius:8px;padding:14px;font-size:12px;color:#5a4a17">' +
        '<strong>Payment:</strong> EFT, Card via Portal, or WhatsApp ' + COMPANY.phone + '<br>' +
        '<strong>Reference:</strong> ' + data.invoiceNumber + '</div>' +
        '</div></div>';
}

function generateStatementHTML(data) {
    var invoices = data.invoices || [];
    var totalOut = invoices.filter(function(i) { return !i.isPaid; }).reduce(function(s,i) { return s+i.total; }, 0);
    var totalPaid = invoices.filter(function(i) { return i.isPaid; }).reduce(function(s,i) { return s+i.total; }, 0);
    var rows = invoices.map(function(inv, i) {
        return '<tr style="background:' + (i%2===0?'#f8fcfd':'#fff') + '">' +
            '<td style="padding:8px 12px;font-size:12px">' + (inv.invoiceNumber||'—') + '</td>' +
            '<td style="padding:8px 12px;font-size:12px">' + (inv.date||'—') + '</td>' +
            '<td style="padding:8px 12px;font-size:12px">' + (inv.dueDate||'—') + '</td>' +
            '<td style="padding:8px 12px;font-size:12px;text-align:right;font-weight:600">' + fmtR(inv.total||0) + '</td>' +
            '<td style="padding:8px 12px;text-align:center"><span style="padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;background:' +
            (inv.isPaid?'rgba(46,168,113,.12)':'rgba(201,69,69,.12)') + ';color:' +
            (inv.isPaid?'#2ea871':'#c94545') + '">' + (inv.isPaid?'Paid':'Outstanding') + '</span></td></tr>';
    }).join('');
    return '<div style="font-family:Arial,sans-serif;max-width:700px;background:#fff">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px;border-radius:12px 12px 0 0">' +
        '<div style="font-size:20px;font-weight:900;color:#fff">STOCKAI-PRO — STATEMENT</div>' +
        '<div style="color:rgba(255,255,255,.7);font-size:12px;margin-top:4px">' +
        (data.dateFrom||'') + ' to ' + (data.dateTo||'') + '</div></div>' +
        '<div style="padding:28px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +
        '<table style="width:100%;margin-bottom:20px"><tr>' +
        '<td style="padding:12px;background:#f0f7f9;border-radius:8px;text-align:center">' +
        '<div style="font-size:10px;color:#8aabb5;text-transform:uppercase">Total Invoiced</div>' +
        '<div style="font-size:1.1rem;font-weight:800">' + fmtR(totalPaid+totalOut) + '</div></td>' +
        '<td style="width:10px"></td>' +
        '<td style="padding:12px;background:#f0f7f9;border-radius:8px;text-align:center">' +
        '<div style="font-size:10px;color:#8aabb5;text-transform:uppercase">Total Paid</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#2ea871">' + fmtR(totalPaid) + '</div></td>' +
        '<td style="width:10px"></td>' +
        '<td style="padding:12px;background:#f0f7f9;border-radius:8px;text-align:center">' +
        '<div style="font-size:10px;color:#8aabb5;text-transform:uppercase">Outstanding</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#c94545">' + fmtR(totalOut) + '</div></td>' +
        '</tr></table>' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:8px 12px;color:#fff;text-align:left;font-size:11px">Invoice #</th>' +
        '<th style="padding:8px 12px;color:#fff;text-align:left;font-size:11px">Date</th>' +
        '<th style="padding:8px 12px;color:#fff;text-align:left;font-size:11px">Due</th>' +
        '<th style="padding:8px 12px;color:#fff;text-align:right;font-size:11px">Amount</th>' +
        '<th style="padding:8px 12px;color:#fff;text-align:center;font-size:11px">Status</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>' +
        '</div></div>';
}

function emailMonthlyInvoice(data) {
    return sendEmail(data.ownerEmail,
        'StockAI-Pro Tax Invoice #' + data.invoiceNumber,
        generateInvoiceHTML(data));
}

function emailStatement(data) {
    return sendEmail(data.ownerEmail,
        'StockAI-Pro Account Statement',
        generateStatementHTML(data));
}

// ============================================================
// AUTO INVOICE — runs on 26th of each month
// ============================================================
function checkAutoInvoice(accountData) {
    if (!accountData || !accountData.owner) return;
    var now = new Date();
    if (now.getDate() !== 26) return;
    var key = 'invoice_' + now.getFullYear() + '_' + now.getMonth();
    var billing = accountData.billing || {};
    if (billing.lastInvoiceSent === key) return;
    var activeEntities = (accountData.entities || []).filter(function(e) { return e.status !== 'inactive'; });
    if (!activeEntities.length) return;
    var invNum = 'INV-' + now.getFullYear() +
        String(now.getMonth()+1).padStart(2,'0') + '-' +
        (accountData.owner.email||'').replace(/[^a-zA-Z0-9]/g,'').substring(0,6).toUpperCase();
    emailMonthlyInvoice({
        invoiceNumber:  invNum,
        invoiceDate:    now.toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'}),
        dueDate:        new Date(now.getFullYear(),now.getMonth()+1,0).toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'}),
        ownerName:      accountData.owner.name  || 'Customer',
        ownerEmail:     accountData.owner.email,
        ownerPhone:     accountData.owner.phone || '',
        companyName:    accountData.owner.groupName    || accountData.owner.name || '',
        companyAddress: accountData.owner.groupAddress || '',
        companyVat:     accountData.owner.groupVat     || '',
        entities:       activeEntities,
        isPaid:         false
    });
    billing.lastInvoiceSent = key;
    return billing;
}

// ============================================================
// TRIGGER SYSTEM — call from any app page
// ============================================================
window.emailTriggers = {
    onEnquiry:           function(d)       { emailEnquiryToAdmin(d); emailEnquiryToCustomer(d); },
    onBooking:           function(d)       { emailBookingToCustomer(d); emailBookingToAdmin(d); },
    onQuoteSent:         function(d)       { emailQuoteToCustomer(d); },
    onPaymentSuccess:    function(d)       { emailPaymentAndSetup(d); emailNewCustomerToAdmin(d); },
    onAccountSetup:      function(d)       { emailWelcome(d); },
    onUpgrade:           function(d)       { emailUpgradeConfirmation(d); },
    onPurchaseOrder:     function(d)       { emailPurchaseOrder(d); },
    onPaymentDue:        function(d)       { emailPaymentDue(d); },
    onPaymentReceived:   function(d)       { emailPaymentReceived(d); },
    onPasswordReset:     function(d)       { emailPasswordReset(d); },
    onUserInvite:        function(d)       { emailNewUserInvite(d); },
    onAIBrainActivated:  function(d)       { emailAIBrainActivated(d); }
};

// Legacy aliases so older code still works
var sendEmail_            = sendEmail;
var emailNewSignupNotification = emailNewCustomerToAdmin;
var sendBookingConfirmationToCustomer = emailBookingToCustomer;
var sendBookingEmailToAdmin           = emailBookingToAdmin;
var sendQuoteEmailToCustomer          = emailQuoteToCustomer;
var sendQuoteNotificationToAdmin      = function(d) { return Promise.resolve(); };

console.log('✅ StockAI-Pro email-templates.js v4.0 loaded');
console.log('📧 Unified email system — ' + Object.keys(FEATURE_CATALOGUE).length + ' features catalogued');
console.log('📧 Proxy:', EMAIL_CONFIG.proxyUrl);
