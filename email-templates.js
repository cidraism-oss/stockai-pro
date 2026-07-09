// ============================================================
// StockAI-Pro — Email Templates v3.0
// Complete email system for all apps and events
// Routes through Cloudflare Worker proxy — NO direct API calls
// ============================================================

var EMAIL_CONFIG = {
    proxyUrl:  'https://bold-dust-c51b.cidraism.workers.dev/',
    fromEmail: 'noreply@stockai-pro.co.za',
    fromName:  'StockAI-Pro',
    support:   'support@stockai-pro.co.za',
    admin:     'cidraism@gmail.com',
    phone:     '079 044 0508',
    whatsapp:  'https://wa.me/27790440508',
    website:   'https://www.stockai-pro.co.za',
    appUrl:    'https://www.stockai-pro.co.za/hub.html',
    portalUrl: 'https://www.stockai-pro.co.za/portal.html'
};

// Legacy variable aliases — keeps older code working
var SUPPORT_EMAIL = EMAIL_CONFIG.support;
var COMPANY_NAME  = EMAIL_CONFIG.fromName;
var COMPANY_URL   = EMAIL_CONFIG.website;
var COMPANY_PHONE = EMAIL_CONFIG.phone;
var COMPANY_WA    = EMAIL_CONFIG.whatsapp;

var VAT_RATE = 0.15;

var PRICING = {
    baseFee:   799,
    entityFee: 599,
    vatRate:   0.15
};

var COMPANY_DETAILS = {
    name:    'HollowAqua Pty Ltd',
    trading: 'StockAI-Pro',
    phone:   '+27 79 044 0508',
    email:   'billing@stockai-pro.co.za',
    address: '16 Loddon Road, Mulbarton, 2059, Johannesburg South, Gauteng, South Africa',
    website: 'www.stockai-pro.co.za'
};

// ============================================================
// MASTER SEND FUNCTION — Routes through Cloudflare Worker
// This is the ONLY function that makes fetch calls
// Both sendEmail and sendEmailViaTemplate point here
// ============================================================
function sendEmail(to, subject, html) {
    if (!to || !subject || !html) {
        console.warn('sendEmail: missing required fields');
        return Promise.resolve();
    }

    var recipients = Array.isArray(to) ? to : [to];
    recipients = recipients.filter(function(email) {
        return email && typeof email === 'string' && email.indexOf('@') !== -1;
    });

    if (recipients.length === 0) {
        console.warn('sendEmail: no valid recipients');
        return Promise.resolve();
    }

    return fetch(EMAIL_CONFIG.proxyUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to:      recipients,
            subject: subject,
            html:    html
        })
    })
    .then(function(res) {
        if (res.ok) {
            console.log('✅ Email sent to:', recipients.join(', '));
        } else {
            console.warn('⚠️ Email failed:', res.status);
        }
        return res;
    })
    .catch(function(err) {
        console.warn('❌ Email error:', err.message || err);
    });
}

// Alias — keeps legacy calls working
var sendEmailViaTemplate = sendEmail;

// ============================================================
// REUSABLE COMPONENTS — Used by emails 1-10 and 16
// ============================================================
function emailHeader(title, subtitle) {
    return '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);' +
        'padding:32px;text-align:center;border-radius:12px 12px 0 0">' +
        '<h1 style="color:#fff;font-size:1.4rem;margin:0;font-weight:800">' + title + '</h1>' +
        (subtitle ?
            '<p style="color:rgba(255,255,255,.85);margin:6px 0 0;font-size:.88rem">' +
            subtitle + '</p>'
        : '') +
        '</div>' +
        '<div style="background:#fff;padding:32px;border:1px solid #e4f1f5;' +
        'border-top:none;border-radius:0 0 12px 12px">';
}

function emailFooter() {
    return '<div style="margin-top:32px;padding-top:24px;' +
        'border-top:1px solid #e4f1f5;text-align:center">' +
        '<div style="margin-bottom:16px">' +
        '<a href="' + EMAIL_CONFIG.website + '" ' +
        'style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">' +
        'Website</a>' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" ' +
        'style="color:#25D366;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">' +
        'WhatsApp</a>' +
        '<a href="mailto:' + EMAIL_CONFIG.support + '" ' +
        'style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">' +
        'Support</a>' +
        '<a href="tel:' + EMAIL_CONFIG.phone.replace(/\s/g,'') + '" ' +
        'style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">' +
        EMAIL_CONFIG.phone + '</a>' +
        '</div>' +
        '<p style="color:#8aabb5;font-size:.75rem;margin:0">' +
        '&copy; ' + new Date().getFullYear() + ' StockAI-Pro. Built with love in South Africa.</p>' +
        '</div></div></div>';
}

function emailInfoBox(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return '';
    return '<table style="width:100%;border-collapse:collapse;border-radius:8px;' +
        'overflow:hidden;margin:16px 0">' +
        rows.map(function(row) {
            return '<tr>' +
                '<td style="padding:8px 12px;color:#5a8a96;font-size:.82rem;font-weight:600;' +
                'background:#f0f7f9;white-space:nowrap">' + row.label + '</td>' +
                '<td style="padding:8px 12px;color:#0d4a5c;font-size:.88rem;font-weight:600">' +
                row.value + '</td>' +
                '</tr>';
        }).join('') +
        '</table>';
}

function emailButton(text, url, color) {
    color = color || '#1a8ba8';
    return '<div style="text-align:center;margin:20px 0">' +
        '<a href="' + url + '" style="display:inline-block;padding:14px 32px;' +
        'background:' + color + ';color:#fff;text-decoration:none;border-radius:8px;' +
        'font-weight:700;font-size:.95rem">' + text + '</a></div>';
}

// ============================================================
// FULL HTML BASE TEMPLATE — Used by new templates (1-13)
// ============================================================
function emailBase(content, accentColor) {
    accentColor = accentColor || '#1a8ba8';
    return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>' + COMPANY_NAME + '</title>' +
        '<style>' +
        'body{margin:0;padding:0;background:#f0f7f9;font-family:\'Segoe UI\',Arial,sans-serif;color:#0d4a5c}' +
        '.wrap{max-width:620px;margin:0 auto;padding:24px 16px}' +
        '.card{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(13,74,92,.08)}' +
        '.header{background:linear-gradient(135deg,' + accentColor + ',#0d4a5c);padding:32px 28px;text-align:center}' +
        '.header h1{margin:0;font-size:1.4rem;color:#fff;font-weight:800}' +
        '.header p{margin:6px 0 0;color:rgba(255,255,255,.8);font-size:.85rem}' +
        '.body{padding:28px}' +
        '.footer{padding:20px 28px;border-top:1px solid #e0eff3;text-align:center;' +
        'font-size:.75rem;color:#5a8a96}' +
        '.btn{display:inline-block;padding:14px 32px;border-radius:8px;font-size:.95rem;' +
        'font-weight:700;text-decoration:none;margin:8px 4px}' +
        '.btn-primary{background:linear-gradient(135deg,' + accentColor + ',#0d4a5c);color:#fff}' +
        '.btn-whatsapp{background:#25D366;color:#fff}' +
        '.btn-outline{background:transparent;border:2px solid ' + accentColor + ';color:' + accentColor + '}' +
        '.stat{display:inline-block;background:#f0f7f9;border-radius:10px;padding:14px 20px;' +
        'margin:6px;text-align:center;min-width:100px}' +
        '.stat-value{font-size:1.4rem;font-weight:800;color:' + accentColor + '}' +
        '.stat-label{font-size:.72rem;color:#5a8a96;font-weight:600}' +
        '.divider{border:none;border-top:1px solid #e0eff3;margin:20px 0}' +
        '.alert{padding:12px 16px;border-radius:8px;margin:14px 0;font-size:.85rem}' +
        '.alert-success{background:rgba(46,168,113,.1);border-left:3px solid #2ea871;color:#1a6040}' +
        '.alert-warning{background:rgba(212,160,23,.1);border-left:3px solid #d4a017;color:#7a5800}' +
        '.alert-danger{background:rgba(201,69,69,.1);border-left:3px solid #c94545;color:#7a1a1a}' +
        '.alert-info{background:rgba(26,139,168,.1);border-left:3px solid #1a8ba8;color:#0d4a5c}' +
        'table{width:100%;border-collapse:collapse}' +
        'th{background:#f0f7f9;padding:10px 12px;text-align:left;font-size:.75rem;font-weight:700;' +
        'color:#5a8a96;text-transform:uppercase;border-bottom:2px solid #e0eff3}' +
        'td{padding:10px 12px;font-size:.85rem;border-bottom:1px solid #f0f7f9}' +
        'tr:nth-child(even) td{background:#fafeff}' +
        '</style></head><body>' +
        '<div class="wrap"><div class="card">' +
        '<div class="header">' +
        '<h1>' + COMPANY_NAME + '</h1>' +
        '<p>Intelligence a click away</p>' +
        '</div>' +
        '<div class="body">' + content + '</div>' +
        '<div class="footer">' +
        '<p>&copy; ' + new Date().getFullYear() + ' ' + COMPANY_NAME + ' &bull; South Africa</p>' +
        '<p>' +
        '<a href="' + COMPANY_URL + '" style="color:#1a8ba8;text-decoration:none">Website</a>' +
        ' &nbsp;|&nbsp; ' +
        '<a href="mailto:' + SUPPORT_EMAIL + '" style="color:#1a8ba8;text-decoration:none">Support</a>' +
        ' &nbsp;|&nbsp; ' +
        '<a href="' + COMPANY_WA + '" style="color:#1a8ba8;text-decoration:none">WhatsApp</a>' +
        '</p>' +
        '<p style="margin-top:10px;font-size:.7rem;color:#8aabb5">' +
        'This email was sent by ' + COMPANY_NAME + '. Do not reply directly to this email.</p>' +
        '</div>' +
        '</div></div></body></html>';
}

// ============================================================
// EMAIL 1 — WELCOME EMAIL
// ============================================================
function emailWelcome(data) {
    var content =
        '<h2 style="font-size:1.3rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
        'Welcome to StockAI-Pro!</h2>' +
        '<p style="font-size:.92rem;color:#2a5f70;margin-bottom:20px">Hi <strong>' +
        (data.name || 'there') + '</strong>,<br>' +
        'Your account has been created successfully. Here\'s what\'s ready for you:</p>' +

        '<div style="text-align:center;margin-bottom:20px">' +
        '<div class="stat"><div class="stat-value">' + (data.entities || 1) +
        '</div><div class="stat-label">Entities</div></div>' +
        '<div class="stat"><div class="stat-value">R' +
        (data.monthlyTotal || 799).toLocaleString('en-ZA') +
        '</div><div class="stat-label">Monthly</div></div>' +
        '<div class="stat"><div class="stat-value">' +
        (data.features ? data.features.length : 1) +
        '</div><div class="stat-label">Apps</div></div>' +
        '</div>' +

        '<div class="alert alert-info"><strong>Your Login Details:</strong><br>' +
        'Email: ' + (data.email || '') + '<br>' +
        'Password: The one you set during signup<br>' +
        'Portal: <a href="' + COMPANY_URL + '/hub.html" style="color:#1a8ba8">' +
        COMPANY_URL + '/hub.html</a></div>' +

        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:20px">' +
        'Your features are now active and ready to use. ' +
        'Log in to start managing your business smarter.</p>' +

        '<div style="text-align:center;margin-bottom:20px">' +
        '<a href="' + COMPANY_URL + '/hub.html" class="btn btn-primary">Open StockAI-Pro</a>' +
        '</div>' +

        '<hr class="divider">' +
        '<p style="font-size:.82rem;color:#5a8a96">Need help getting started? Our team is here for you:</p>' +
        '<div style="text-align:center">' +
        '<a href="mailto:' + SUPPORT_EMAIL + '" class="btn btn-outline" style="font-size:.82rem">' +
        'Email Support</a>' +
        '<a href="' + COMPANY_WA + '" class="btn btn-whatsapp" style="font-size:.82rem">' +
        'WhatsApp Us</a>' +
        '</div>';

    return sendEmail(
        data.email,
        'Welcome to StockAI-Pro — Your Account is Ready!',
        emailBase(content, '#1a8ba8')
    );
}

// ============================================================
// EMAIL 2 — NEW USER INVITE
// ============================================================
function emailNewUserInvite(data) {
    var html = emailHeader('You\'ve Been Invited to StockAI-Pro!',
        'Your account has been created by ' + data.invitedBy) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
        '<strong>' + data.invitedBy + '</strong> has added you to StockAI-Pro for ' +
        '<strong>' + data.entityName + '</strong>.</p>' +
        emailInfoBox([
            { label: 'Your Name',   value: data.name },
            { label: 'Your Role',   value: data.role },
            { label: 'Entity',      value: data.entityName },
            { label: 'Login Email', value: data.email }
        ]) +
        '<div style="background:rgba(26,139,168,.08);border-left:3px solid #1a8ba8;' +
        'padding:16px;border-radius:8px;margin:20px 0">' +
        '<h4 style="color:#0d4a5c;font-size:.92rem;margin-bottom:8px">Set Up Your Password</h4>' +
        '<p style="color:#5a8a96;font-size:.85rem;margin:0">' +
        'Click the button below to create your password and access your account.</p>' +
        '</div>' +
        emailButton('Set Up My Account', data.inviteLink || EMAIL_CONFIG.appUrl, '#2ea871') +
        emailFooter();
    return sendEmail(
        data.email,
        'You\'ve been invited to StockAI-Pro — ' + data.entityName,
        html
    );
}

// ============================================================
// EMAIL 3 — PURCHASE ORDER TO SUPPLIER
// ============================================================
function emailPurchaseOrder(data) {
    var itemRows = (data.items || []).map(function(item) {
        return '<tr><td>' + item.name + '</td>' +
            '<td style="text-align:center">' + item.qty + ' ' + item.unit + '</td>' +
            '<td style="text-align:right">R' + (item.cost || 0).toFixed(2) + '</td>' +
            '<td style="text-align:right;font-weight:700">R' +
            (item.total || 0).toFixed(2) + '</td></tr>';
    }).join('');

    var poDate = '';
    try {
        poDate = new Date(data.createdAt).toLocaleDateString('en-ZA');
    } catch(e) {
        poDate = data.createdAt || '';
    }

    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
        'New Purchase Order</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.supplierName || 'Supplier') + '</strong>,<br>' +
        'Please find your purchase order below from <strong>' +
        (data.entityName || '') + '</strong>.</p>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.78rem;color:#5a8a96;width:40%">PO Number:</td>' +
        '<td style="font-weight:700">' + (data.poId || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.78rem;color:#5a8a96">From:</td>' +
        '<td style="font-weight:700">' + (data.entityName || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.78rem;color:#5a8a96">Date:</td>' +
        '<td style="font-weight:700">' + poDate + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.78rem;color:#5a8a96">Created by:</td>' +
        '<td style="font-weight:700">' + (data.createdBy || '') + '</td></tr>' +
        '</table></div>' +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;color:#fff;font-size:.75rem">Item</th>' +
        '<th style="padding:10px;text-align:center;color:#fff;font-size:.75rem">Quantity</th>' +
        '<th style="padding:10px;text-align:right;color:#fff;font-size:.75rem">Unit Cost</th>' +
        '<th style="padding:10px;text-align:right;color:#fff;font-size:.75rem">Total</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody>' +
        '<tfoot><tr style="background:#e4f1f5">' +
        '<td colspan="3" style="padding:12px;font-weight:700;text-align:right">' +
        'ORDER TOTAL:</td>' +
        '<td style="padding:12px;font-weight:800;color:#1a8ba8;text-align:right;font-size:1rem">' +
        'R' + (data.total || 0).toFixed(2) + '</td>' +
        '</tr></tfoot></table>' +

        '<div class="alert alert-info">' +
        '<strong>Please confirm this order.</strong><br>' +
        'Contact us to accept, add notes, or advise on out of stock items.<br>' +
        EMAIL_CONFIG.phone + ' &bull; ' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="color:#1a8ba8">WhatsApp</a></div>' +

        '<div style="text-align:center;margin-top:16px">' +
        '<a href="' + EMAIL_CONFIG.appUrl + '" class="btn btn-primary">View Order</a></div>';

    return sendEmail(
        data.supplierEmail,
        'Purchase Order ' + data.poId + ' from ' + data.entityName,
        emailBase(content, '#1a8ba8')
    );
}

// ============================================================
// EMAIL 4 — DAY END REPORT
// ============================================================
function emailDayEndReport(data) {
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28)
        ? '#c94545' : '#2ea871';

    var html = emailHeader('Day End Report — ' + data.entityName,
        data.date + ' &bull; Submitted by ' + data.submittedBy) +

        '<h3 style="color:#0d4a5c;font-size:.95rem;margin:0 0 12px">' +
        'Sales Summary (Excl. VAT)</h3>' +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px"><tr>' +
        '<td style="width:50%;padding-right:6px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;' +
        'border-left:3px solid #1a8ba8">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:4px">Total Sales (Excl. VAT)</div>' +
        '<div style="font-size:1.4rem;font-weight:900;color:#0d4a5c">' +
        'R' + (data.totalSales || 0).toLocaleString('en-ZA') + '</div></div></td>' +
        '<td style="width:50%;padding-left:6px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;' +
        'border-left:3px solid ' + fcColor + '">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:4px">Food Cost %</div>' +
        '<div style="font-size:1.4rem;font-weight:900;color:' + fcColor + '">' +
        (data.foodCostPercent || 0).toFixed(1) + '%</div></div></td>' +
        '</tr><tr>' +
        '<td style="width:50%;padding-right:6px;padding-top:10px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;' +
        'border-left:3px solid #2ea871">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:4px">Cash Sales</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">' +
        'R' + (data.cashSales || 0).toLocaleString('en-ZA') + '</div></div></td>' +
        '<td style="width:50%;padding-left:6px;padding-top:10px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;' +
        'border-left:3px solid #2b8eb3">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:4px">Card Sales</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">' +
        'R' + (data.cardSales || 0).toLocaleString('en-ZA') + '</div></div></td>' +
        '</tr></table>' +

        emailInfoBox([
            { label: 'Pax Served',       value: data.pax || '0' },
            { label: 'Avg Spend/Person', value: 'R' + (data.avgSpend || 0).toFixed(2) },
            { label: 'Promotions',       value: 'R' + (data.promotions || 0).toFixed(2) },
            { label: 'Discounts',        value: 'R' + (data.discounts || 0).toFixed(2) },
            { label: 'Purchases',        value: 'R' + (data.purchases || 0).toFixed(2) },
            { label: 'Food Cost Target', value: (data.foodCostTarget || 28) + '%' },
            { label: 'Actual Food Cost',
              value: '<span style="color:' + fcColor + ';font-weight:700">' +
                     (data.foodCostPercent || 0).toFixed(1) + '%</span>' }
        ]) +

        (data.topSellers && data.topSellers.length > 0 ?
            '<h3 style="color:#0d4a5c;font-size:.95rem;margin:20px 0 12px">Top Sellers</h3>' +
            data.topSellers.map(function(s, i) {
                return '<div style="display:flex;justify-content:space-between;' +
                    'padding:8px 0;border-bottom:1px solid #e4f1f5;font-size:.85rem">' +
                    '<span>' + (i + 1) + '. ' + s.name + '</span>' +
                    '<strong>' + s.qty + ' sold</strong></div>';
            }).join('')
        : '') +

        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();

    return sendEmail(
        data.recipients || [],
        'Day End Report — ' + data.entityName + ' — ' + data.date,
        html
    );
}

// ============================================================
// EMAIL 5 — STOCK COUNT SUBMITTED
// ============================================================
function emailStockCountSubmitted(data) {
    var html = emailHeader('Stock Count Submitted',
        data.entityName + ' &mdash; ' + data.date) +
        '<p style="color:#5a8a96;line-height:1.7">A stock count has been submitted for ' +
        '<strong>' + data.entityName + '</strong>.</p>' +
        emailInfoBox([
            { label: 'Submitted By',        value: data.submittedBy },
            { label: 'Date',                value: data.date },
            { label: 'Total Items',         value: data.totalItems + ' items counted' },
            { label: 'Items with Variance', value: data.varianceItems + ' items' },
            { label: 'Closing Stock Value', value: 'R' + (data.closingValue || 0).toFixed(2) }
        ]) +
        emailButton('View Full Count', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(
        data.recipients || [],
        'Stock Count — ' + data.entityName + ' — ' + data.date,
        html
    );
}

// ============================================================
// EMAIL 6 — WASTAGE REPORT
// ============================================================
function emailWastageReport(data) {
    var html = emailHeader('Wastage Report',
        data.entityName + ' &mdash; ' + data.date) +
        emailInfoBox([
            { label: 'Date',         value: data.date },
            { label: 'Submitted By', value: data.submittedBy },
            { label: 'Total Wastage',
              value: '<span style="color:#c94545;font-weight:700">R' +
                     (data.totalValue || 0).toFixed(2) + '</span>' },
            { label: 'Items Wasted', value: (data.items || []).length + ' items' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(
        data.recipients || [],
        'Wastage Report — ' + data.entityName + ' — ' + data.date,
        html
    );
}

// ============================================================
// EMAIL 7 — PAYMENT REMINDER
// ============================================================
function emailPaymentDue(data) {
    var html = emailHeader('Payment Due Today',
        'Your StockAI-Pro subscription payment is due') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' +
        data.ownerName + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
        'Your StockAI-Pro subscription payment is due today.</p>' +
        '<div style="background:rgba(201,69,69,.06);border:1px solid rgba(201,69,69,.2);' +
        'border-radius:12px;padding:24px;text-align:center;margin:20px 0">' +
        '<div style="font-size:.78rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:8px">Amount Due Today</div>' +
        '<div style="font-size:2.5rem;font-weight:900;color:#c94545">' +
        'R' + parseInt(data.amount, 10).toLocaleString('en-ZA') + '</div>' +
        '<div style="font-size:.82rem;color:#5a8a96;margin-top:4px">' +
        data.plan + ' &bull; Due: ' + data.dueDate + '</div></div>' +
        emailButton('Pay Now via Portal', EMAIL_CONFIG.portalUrl, '#c94545') +
        emailFooter();
    return sendEmail(
        data.ownerEmail,
        'Payment Due Today — StockAI-Pro Subscription',
        html
    );
}

// ============================================================
// EMAIL 8 — MONTH END REPORT
// ============================================================
function emailMonthEndReport(data) {
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28)
        ? '#c94545' : '#2ea871';
    var html = emailHeader('Month End Report — ' + data.entityName,
        data.month + ' ' + data.year) +
        emailInfoBox([
            { label: 'Month',            value: data.month + ' ' + data.year },
            { label: 'Opening Stock',    value: 'R' + (data.openingStock || 0).toFixed(2) },
            { label: 'Total Purchases',  value: 'R' + (data.totalPurchases || 0).toFixed(2) },
            { label: 'Closing Stock',    value: 'R' + (data.closingStock || 0).toFixed(2) },
            { label: 'Total Sales',      value: 'R' + (data.totalSales || 0).toFixed(2) },
            { label: 'Total Wastage',    value: 'R' + (data.totalWastage || 0).toFixed(2) },
            { label: 'Food Cost %',
              value: '<span style="color:' + fcColor + ';font-weight:700">' +
                     (data.foodCostPercent || 0).toFixed(1) + '%</span>' },
            { label: 'Food Cost Target', value: (data.foodCostTarget || 28) + '%' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(
        data.recipients || [],
        'Month End Report — ' + data.entityName + ' — ' + data.month + ' ' + data.year,
        html
    );
}

// ============================================================
// EMAIL 9 — LATE DELIVERY NOTIFICATION
// ============================================================
function emailLateDelivery(data) {
    var html = emailHeader('Late Delivery Alert',
        data.supplierName + ' &mdash; ' + data.entityName) +
        '<p style="color:#0d4a5c;font-size:1rem">A delivery from <strong>' +
        data.supplierName + '</strong> is overdue.</p>' +
        emailInfoBox([
            { label: 'Supplier',     value: data.supplierName },
            { label: 'PO Number',    value: data.poId },
            { label: 'Order Date',   value: data.orderDate },
            { label: 'Expected',     value: data.expectedDate },
            { label: 'Days Overdue', value: data.daysOverdue + ' day(s)' }
        ]) +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px 16px;' +
        'border-radius:8px;margin-top:16px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">Please contact ' +
        data.supplierName + ' immediately to follow up on this delivery.</p></div>' +
        emailFooter();
    return sendEmail(
        data.recipients || [],
        'Late Delivery — ' + data.supplierName + ' — ' + data.poId,
        html
    );
}

// ============================================================
// EMAIL 10 — NEW SIGNUP NOTIFICATION (To Admin)
// ============================================================
function emailNewSignupNotification(data) {
    var html = emailHeader('New Customer Signed Up!',
        'A new customer has joined StockAI-Pro') +
        '<div style="background:rgba(245,158,11,.08);border-radius:10px;padding:20px;' +
        'margin-bottom:20px;border:1px solid rgba(245,158,11,.2)">' +
        '<div style="text-align:center;font-size:1.3rem;font-weight:900;color:#0d4a5c">' +
        'R' + parseInt(data.price, 10).toLocaleString('en-ZA') + '/month</div>' +
        '<div style="text-align:center;font-size:.82rem;color:#5a8a96;margin-top:4px">' +
        'New recurring revenue</div></div>' +
        emailInfoBox([
            { label: 'Name',     value: data.name },
            { label: 'Email',    value: data.email },
            { label: 'Phone',    value: data.phone },
            { label: 'Business', value: data.business },
            { label: 'Type',     value: data.type },
            { label: 'Plan',     value: data.plan },
            { label: 'Value',
              value: 'R' + parseInt(data.price, 10).toLocaleString('en-ZA') + '/mo' }
        ]) +
        emailFooter();
    return sendEmail(
        EMAIL_CONFIG.admin,
        'New Signup: ' + data.name + ' — ' + data.plan +
        ' (R' + parseInt(data.price, 10).toLocaleString('en-ZA') + '/mo)',
        html
    );
}

// ============================================================
// EMAIL 11 — EVENT FEEDBACK REQUEST
// ============================================================
function emailEventFeedbackRequest(data) {
    var html = emailHeader('How did we do?',
        'We would love your feedback on ' + data.eventName) +
        '<p style="color:#0d4a5c">Hi ' + data.clientName + ',</p>' +
        '<p style="color:#5a8a96;line-height:1.7">' +
        'Thank you for hosting your event with us. We hope everything was perfect!</p>' +
        '<p style="color:#5a8a96;line-height:1.7">' +
        'Could you please take 30 seconds to rate your experience?</p>' +
        emailButton(
            'Rate My Event',
            'https://www.stockai-pro.co.za/feedback?id=' + (data.id || ''),
            '#ec4899'
        ) +
        emailFooter();
    return sendEmail(
        data.clientEmail,
        'Feedback Request: ' + data.eventName,
        html
    );
}

// ============================================================
// EMAIL 12 — UPGRADE CONFIRMATION TO CUSTOMER + ADMIN
// Triggered after successful upgrade payment via Paystack
// ============================================================
function emailUpgradeConfirmation(data) {
    var featurePriceMap = {
        web_boh:      799,
        mobile_app:   349,
        procure_ai:   399,
        pos_system:   799,
        menu_master:  349,
        functions_ai: 449
    };
    var featureNameMap = {
        web_boh:      'Web App B.O.H',
        mobile_app:   'Mobile App',
        procure_ai:   'ProcureAI App',
        pos_system:   'P.O.S System',
        menu_master:  'Menu Master',
        functions_ai: 'FunctionsAI'
    };

    var featureRows = (data.features || []).map(function(f) {
        var price = featurePriceMap[f] || 0;
        var name  = featureNameMap[f]  || f;
        return '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#2a5f70">Active: ' + name + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' +
            'R' + price.toLocaleString('en-ZA') + '.00/mo</td>' +
            '</tr>';
    }).join('');

    var html = emailHeader(
        'Upgrade Confirmed!',
        'Your new features are now active on ' + (data.entityName || 'your entity')
    ) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' +
        (data.name || 'there') + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
        'Your upgrade was successful! Your new features are live and ready to use immediately.' +
        '</p>' +

        '<div style="background:rgba(46,168,113,.08);border:1px solid rgba(46,168,113,.2);' +
        'border-radius:12px;padding:20px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.72rem;text-transform:uppercase;letter-spacing:2px;' +
        'color:#5a8a96;font-weight:700;margin-bottom:8px">Entity Upgraded</div>' +
        '<div style="font-size:1.2rem;font-weight:900;color:#0d4a5c">' +
        (data.entityName || '&mdash;') + '</div>' +
        '</div>' +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<tr><td colspan="2" style="background:#0d4a5c;color:#fff;padding:10px 14px;' +
        'font-weight:700;font-size:.78rem;letter-spacing:.5px">' +
        'NEW FEATURES ACTIVATED</td></tr>' +
        featureRows +
        '<tr style="background:#e4f1f5">' +
        '<td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">' +
        'Added Monthly Cost</td>' +
        '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">' +
        '+R' + (data.amount || 0).toLocaleString('en-ZA') + '.00/mo</td>' +
        '</tr></table>' +

        emailInfoBox([
            { label: 'Payment Reference', value: data.ref  || '&mdash;' },
            { label: 'Date',              value: data.date || '&mdash;' },
            { label: 'Amount Charged',
              value: 'R' + (data.amount || 0).toLocaleString('en-ZA') +
                     '.00 (first month pro-rata)' }
        ]) +

        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;' +
        'padding:14px 18px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">' +
        'Features are live immediately</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">' +
        'Refresh your app to see your new features.</div>' +
        '</div>' +

        emailButton('Open My App', EMAIL_CONFIG.appUrl, '#2ea871') +
        emailFooter();

    var adminHtml = emailHeader(
        'Customer Upgraded!',
        'A customer has purchased additional features'
    ) +
        emailInfoBox([
            { label: 'Customer',    value: data.name         || '&mdash;' },
            { label: 'Email',       value: data.email        || '&mdash;' },
            { label: 'Entity',      value: data.entityName   || '&mdash;' },
            { label: 'Features',    value: data.featureNames || '&mdash;' },
            { label: 'Amount',
              value: 'R' + (data.amount || 0).toLocaleString('en-ZA') + '.00/mo' },
            { label: 'Payment Ref', value: data.ref          || '&mdash;' },
            { label: 'Date',        value: data.date         || '&mdash;' }
        ]) +
        emailFooter();

    return Promise.all([
        sendEmail(
            data.email,
            'Upgrade Confirmed — ' + (data.entityName || 'Your Entity') + ' — StockAI-Pro',
            html
        ),
        sendEmail(
            EMAIL_CONFIG.admin,
            'Upgrade: ' + (data.name || data.email) +
            ' — +R' + (data.amount || 0).toLocaleString('en-ZA') + '/mo',
            adminHtml
        )
    ]);
}
// ============================================================
// NEW TEMPLATE A — FUNCTION / EVENT CONFIRMATION TO CLIENT
// ============================================================
function emailFunctionConfirmation(data) {
    var menuRows = (data.menuItems || []).map(function(m) {
        return '<tr><td>' + m.name + '</td>' +
            '<td style="text-align:center">' + m.qty + '</td>' +
            '<td style="text-align:right">R' + (m.price || 0).toFixed(2) + '</td>' +
            '<td style="text-align:right;font-weight:700">R' +
            (m.total || 0).toFixed(2) + '</td></tr>';
    }).join('');

    var bevRows = (data.beverages || []).map(function(b) {
        return '<tr><td>' + b.name + '</td>' +
            '<td style="text-align:center">' + b.qty + '</td>' +
            '<td style="text-align:right">R' + (b.price || 0).toFixed(2) + '</td>' +
            '<td style="text-align:right;font-weight:700">R' +
            (b.total || 0).toFixed(2) + '</td></tr>';
    }).join('');

    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#be185d;margin-bottom:6px">' +
        'Function Confirmed!</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Dear <strong>' +
        (data.contactPerson || data.clientName) + '</strong>,<br>' +
        'Thank you for choosing us! Your function details are confirmed below.</p>' +

        '<div style="background:#fff5f9;border-radius:10px;padding:14px;' +
        'margin-bottom:16px;border:1px solid #f0d0e0">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px;font-size:.72rem;color:#be185d;font-weight:700;width:40%">' +
        'FUNCTION NAME</td>' +
        '<td style="font-weight:700">' + (data.functionName || '') + '</td></tr>' +
        '<tr><td style="padding:4px;font-size:.72rem;color:#be185d;font-weight:700">' +
        'INVOICE NUMBER</td>' +
        '<td style="font-weight:700">' + (data.invoiceNumber || '') + '</td></tr>' +
        '<tr><td style="padding:4px;font-size:.72rem;color:#be185d;font-weight:700">' +
        'DATE</td>' +
        '<td style="font-weight:700">' + (data.functionDate || '') + '</td></tr>' +
        '<tr><td style="padding:4px;font-size:.72rem;color:#be185d;font-weight:700">' +
        'GUESTS</td>' +
        '<td style="font-weight:700">' + (data.pax || 0) + ' guests</td></tr>' +
        (data.theme ?
            '<tr><td style="padding:4px;font-size:.72rem;color:#be185d;font-weight:700">' +
            'THEME</td><td style="font-weight:700">' + data.theme + '</td></tr>' : '') +
        (data.purpose ?
            '<tr><td style="padding:4px;font-size:.72rem;color:#be185d;font-weight:700">' +
            'PURPOSE</td><td style="font-weight:700">' + data.purpose + '</td></tr>' : '') +
        '</table></div>' +

        (menuRows ?
            '<h4 style="font-size:.9rem;font-weight:700;color:#0d4a5c;margin:14px 0 8px">' +
            'Menu Items</h4>' +
            '<table style="width:100%;border-collapse:collapse"><thead>' +
            '<tr style="background:#0d4a5c">' +
            '<th style="padding:8px;color:#fff;text-align:left;font-size:.75rem">Item</th>' +
            '<th style="padding:8px;color:#fff;text-align:center;font-size:.75rem">Qty</th>' +
            '<th style="padding:8px;color:#fff;text-align:right;font-size:.75rem">Price</th>' +
            '<th style="padding:8px;color:#fff;text-align:right;font-size:.75rem">Total</th>' +
            '</tr></thead><tbody>' + menuRows + '</tbody></table>'
        : '') +

        (bevRows ?
            '<h4 style="font-size:.9rem;font-weight:700;color:#0d4a5c;margin:14px 0 8px">' +
            'Beverages</h4>' +
            '<table style="width:100%;border-collapse:collapse"><thead>' +
            '<tr style="background:#0d4a5c">' +
            '<th style="padding:8px;color:#fff;text-align:left;font-size:.75rem">Item</th>' +
            '<th style="padding:8px;color:#fff;text-align:center;font-size:.75rem">Qty</th>' +
            '<th style="padding:8px;color:#fff;text-align:right;font-size:.75rem">Price</th>' +
            '<th style="padding:8px;color:#fff;text-align:right;font-size:.75rem">Total</th>' +
            '</tr></thead><tbody>' + bevRows + '</tbody></table>'
        : '') +

        '<div style="background:#fff5f9;border-radius:10px;padding:14px;' +
        'margin-top:16px;border:1px solid #f0d0e0">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Menu Total:</td>' +
        '<td style="text-align:right">R' + (data.menuTotal || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Beverage Total:</td>' +
        '<td style="text-align:right">R' + (data.bevTotal || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">' +
        'Subtotal (excl. VAT):</td>' +
        '<td style="text-align:right">R' + (data.totalExVat || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">VAT (15%):</td>' +
        '<td style="text-align:right">R' + (data.vat || 0).toFixed(2) + '</td></tr>' +
        '<tr style="border-top:2px solid #ec4899">' +
        '<td style="padding:8px 0;font-size:1.1rem;font-weight:800;color:#be185d">' +
        'TOTAL:</td>' +
        '<td style="text-align:right;font-size:1.1rem;font-weight:800;color:#be185d">' +
        'R' + (data.totalIncl || 0).toFixed(2) + '</td></tr>' +
        '</table></div>' +

        (data.notes ?
            '<div style="background:rgba(26,139,168,.1);border-left:3px solid #1a8ba8;' +
            'padding:12px 16px;border-radius:8px;margin:14px 0;font-size:.85rem">' +
            '<strong>Notes:</strong><br>' + data.notes + '</div>'
        : '') +

        '<p style="font-size:.82rem;color:#5a8a96;margin-top:16px">' +
        'Please contact us if you have any questions or changes.</p>' +
        '<div style="text-align:center;margin-top:14px">' +
        '<a href="' + COMPANY_WA + '" class="btn btn-whatsapp">WhatsApp Us</a></div>';

    return sendEmail(
        data.clientEmail || data.email,
        'Function Confirmed — ' + data.functionName + ' | ' + data.invoiceNumber,
        emailBase(content, '#ec4899')
    );
}

// ============================================================
// NEW TEMPLATE B — GRV PROCESSED (Invoice Scanner)
// ============================================================
function emailGRVProcessed(data) {
    var itemRows = (data.lineItems || []).map(function(li) {
        return '<tr><td>' + li.description + '</td>' +
            '<td style="text-align:center">' + li.quantity + ' ' + (li.unit || '') + '</td>' +
            '<td style="text-align:right">R' + (li.unitPrice || 0).toFixed(2) + '</td>' +
            '<td style="text-align:right;font-weight:700">R' +
            (li.lineTotal || 0).toFixed(2) + '</td>' +
            '<td style="text-align:center">' +
            (li.priceVariance ? 'ALERT' : 'OK') + '</td></tr>';
    }).join('');

    var alertsHtml = '';
    if (data.priceAlerts && data.priceAlerts.length > 0) {
        alertsHtml =
            '<div style="background:rgba(212,160,23,.1);border-left:3px solid #d4a017;' +
            'padding:12px 16px;border-radius:8px;margin:14px 0;font-size:.85rem;color:#7a5800">' +
            '<strong>Price Alerts (' + data.priceAlerts.length + '):</strong><br>' +
            data.priceAlerts.map(function(a) {
                return a.item + ': R' + a.oldCost.toFixed(2) + ' to R' +
                    a.newCost.toFixed(2) + ' (+' + a.variance + '%)';
            }).join('<br>') + '</div>';
    }

    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
        'Invoice Processed</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">' +
        'Your invoice has been automatically processed and GRV\'d by StockAI-Pro.</p>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.72rem;color:#5a8a96;font-weight:700;width:40%">' +
        'GRV NUMBER</td><td style="font-weight:700">' + (data.grvId || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.72rem;color:#5a8a96;font-weight:700">' +
        'INVOICE #</td><td style="font-weight:700">' + (data.invoiceNumber || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.72rem;color:#5a8a96;font-weight:700">' +
        'SUPPLIER</td><td style="font-weight:700">' + (data.supplier || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.72rem;color:#5a8a96;font-weight:700">' +
        'ITEMS UPDATED</td><td style="font-weight:700">' +
        (data.itemsUpdated || 0) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.72rem;color:#5a8a96;font-weight:700">' +
        'MATCHED PO</td><td style="font-weight:700">' +
        (data.matchedPOId || 'None') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.72rem;color:#5a8a96;font-weight:700">' +
        'TOTAL</td><td style="font-weight:700;color:#1a8ba8">' +
        'R' + (data.totalValue || 0).toFixed(2) + '</td></tr>' +
        '</table></div>' +

        alertsHtml +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:8px;color:#fff;text-align:left;font-size:.72rem">Item</th>' +
        '<th style="padding:8px;color:#fff;text-align:center;font-size:.72rem">Qty</th>' +
        '<th style="padding:8px;color:#fff;text-align:right;font-size:.72rem">Unit Price</th>' +
        '<th style="padding:8px;color:#fff;text-align:right;font-size:.72rem">Total</th>' +
        '<th style="padding:8px;color:#fff;text-align:center;font-size:.72rem">Status</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody></table>' +

        '<div style="background:rgba(46,168,113,.1);border-left:3px solid #2ea871;' +
        'padding:12px 16px;border-radius:8px;font-size:.85rem;color:#1a6040">' +
        'Inventory quantities and costs have been updated automatically.</div>';

    return sendEmail(
        data.toEmail,
        'GRV Processed — ' + data.invoiceNumber + ' from ' + data.supplier,
        emailBase(content, '#1a8ba8')
    );
}

// ============================================================
// NEW TEMPLATE C — LOW STOCK ALERT
// ============================================================
function emailLowStockAlert(data) {
    var itemRows = (data.items || []).map(function(item) {
        var statusColor = item.status === 'out-of-stock' ? '#c94545' : '#d4a017';
        var statusText  = item.status === 'out-of-stock' ? 'OUT OF STOCK' : 'LOW STOCK';
        return '<tr><td><strong>' + item.name + '</strong></td>' +
            '<td style="text-align:center">' + item.quantity + ' ' + item.unit + '</td>' +
            '<td style="text-align:center">' + (item.parLevel || 0) + ' ' + item.unit + '</td>' +
            '<td style="text-align:center;color:' + statusColor + ';font-weight:700">' +
            statusText + '</td></tr>';
    }).join('');

    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#d4a017;margin-bottom:6px">' +
        'Low Stock Alert</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.managerName || 'Manager') + '</strong>,<br>' +
        '<strong>' + (data.entityName || '') + '</strong> has <strong>' +
        (data.items || []).length + ' items</strong> below par level.</p>' +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:8px;color:#fff;text-align:left;font-size:.72rem">Item</th>' +
        '<th style="padding:8px;color:#fff;text-align:center;font-size:.72rem">Current Stock</th>' +
        '<th style="padding:8px;color:#fff;text-align:center;font-size:.72rem">Par Level</th>' +
        '<th style="padding:8px;color:#fff;text-align:center;font-size:.72rem">Status</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody></table>' +

        '<div style="background:rgba(212,160,23,.1);border-left:3px solid #d4a017;' +
        'padding:12px 16px;border-radius:8px;font-size:.85rem;color:#7a5800;margin-top:16px">' +
        'Please create purchase orders to replenish stock.</div>' +
        '<div style="text-align:center;margin-top:14px">' +
        '<a href="' + COMPANY_URL + '/hub.html" class="btn btn-primary">Open ProcureAI</a></div>';

    return sendEmail(
        data.toEmail,
        'Low Stock Alert — ' + (data.items || []).length +
        ' items need attention at ' + data.entityName,
        emailBase(content, '#d4a017')
    );
}

// ============================================================
// NEW TEMPLATE D — CASH UP REPORT
// ============================================================
function emailCashUpReport(data) {
    var dropsHtml = '';
    if (data.drops && data.drops.length > 0) {
        dropsHtml =
            '<h4 style="font-size:.88rem;font-weight:700;color:#0d4a5c;margin:14px 0 8px">' +
            'Cash Drops</h4>' +
            '<table style="width:100%;border-collapse:collapse"><thead>' +
            '<tr style="background:#0d4a5c">' +
            '<th style="padding:8px;color:#fff;text-align:left;font-size:.72rem">Time</th>' +
            '<th style="padding:8px;color:#fff;text-align:left;font-size:.72rem">Amount</th>' +
            '<th style="padding:8px;color:#fff;text-align:left;font-size:.72rem">' +
            'Authorised By</th>' +
            '</tr></thead><tbody>' +
            data.drops.map(function(d) {
                var dropTime = '';
                try {
                    dropTime = new Date(d.date).toLocaleTimeString('en-ZA', {
                        hour: '2-digit', minute: '2-digit'
                    });
                } catch(e) { dropTime = d.date || ''; }
                return '<tr><td>' + dropTime + '</td>' +
                    '<td>R' + d.amount.toFixed(2) + '</td>' +
                    '<td>' + d.authorisedBy + '</td></tr>';
            }).join('') +
            '</tbody></table>';
    }

    var varianceColor = Math.abs(data.totalVariance || 0) < 1
        ? '#2ea871' : (data.totalVariance > 0 ? '#2b8eb3' : '#c94545');
    var varianceLabel = Math.abs(data.totalVariance || 0) < 1
        ? 'BALANCED' : (data.totalVariance > 0 ? 'OVER' : 'SHORT');

    var cashupDate = '';
    try {
        cashupDate = new Date(data.date || Date.now()).toLocaleDateString('en-ZA');
    } catch(e) { cashupDate = ''; }

    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
        'Cash Up Report</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">' +
        'Cashier: <strong>' + (data.cashier || '') + '</strong><br>' +
        'Date: <strong>' + cashupDate + '</strong><br>' +
        'Entity: <strong>' + (data.entityName || '') + '</strong></p>' +

        '<div style="text-align:center;margin-bottom:16px">' +
        '<div class="stat"><div class="stat-value">R' +
        (data.totalSales || 0).toFixed(2) +
        '</div><div class="stat-label">Total Sales</div></div>' +
        '<div class="stat"><div class="stat-value">R' +
        (data.cashSales || 0).toFixed(2) +
        '</div><div class="stat-label">Cash</div></div>' +
        '<div class="stat"><div class="stat-value">R' +
        (data.cardSales || 0).toFixed(2) +
        '</div><div class="stat-label">Card</div></div>' +
        '<div class="stat"><div class="stat-value">' +
        (data.salesCount || 0) +
        '</div><div class="stat-label">Transactions</div></div>' +
        '</div>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Float:</td>' +
        '<td style="text-align:right">R' + (data.float || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">+ Cash Sales:</td>' +
        '<td style="text-align:right">R' + (data.cashSales || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">- Cash Drops:</td>' +
        '<td style="text-align:right">R' + (data.cashDrops || 0).toFixed(2) + '</td></tr>' +
        '<tr style="border-top:2px solid #1a8ba8">' +
        '<td style="padding:6px 0;font-size:.92rem;font-weight:700">Expected Cash:</td>' +
        '<td style="text-align:right;font-weight:700">R' +
        (data.expectedCash || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Cash Counted:</td>' +
        '<td style="text-align:right">R' + (data.cashCounted || 0).toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Card Machine:</td>' +
        '<td style="text-align:right">R' + (data.cardCounted || 0).toFixed(2) + '</td></tr>' +
        '</table></div>' +

        dropsHtml +

        '<div style="text-align:center;padding:16px;background:#f0f7f9;' +
        'border-radius:10px;margin-top:14px">' +
        '<div style="font-size:.78rem;font-weight:700;color:#5a8a96;margin-bottom:6px">' +
        'VARIANCE</div>' +
        '<div style="font-size:2rem;font-weight:900;color:' + varianceColor + '">' +
        ((data.totalVariance || 0) >= 0 ? '+' : '') +
        'R' + (data.totalVariance || 0).toFixed(2) + '</div>' +
        '<div style="font-size:.82rem;font-weight:700;color:' + varianceColor + '">' +
        varianceLabel + '</div></div>';

    return sendEmail(
        data.toEmail,
        'Cash Up Report — ' + data.cashier + ' | ' + cashupDate,
        emailBase(content, '#1a8ba8')
    );
}

// ============================================================
// NEW TEMPLATE E — NEW CUSTOMER SIGNUP (Admin notification)
// ============================================================
function emailNewCustomerSignup(data) {
    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
        'New Customer Signed Up!</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">' +
        'A new customer has signed up and completed payment.</p>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96;width:40%">Name:</td>' +
        '<td style="font-weight:700">' + (data.name || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Email:</td>' +
        '<td style="font-weight:700">' + (data.email || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Phone:</td>' +
        '<td style="font-weight:700">' + (data.phone || '&mdash;') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Entities:</td>' +
        '<td style="font-weight:700">' + (data.entities || 1) + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Monthly:</td>' +
        '<td style="font-weight:700;color:#2ea871">R' +
        (data.monthlyTotal || 0).toLocaleString('en-ZA') + '/mo</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Payment Ref:</td>' +
        '<td style="font-weight:700">' + (data.paymentRef || '&mdash;') + '</td></tr>' +
        '</table></div>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<div style="font-size:.78rem;font-weight:700;color:#5a8a96;margin-bottom:8px">' +
        'PURCHASED FEATURES:</div>' +
        '<div>' + (data.features || []).map(function(f) {
            return '<span style="display:inline-block;padding:3px 10px;' +
                'background:#e0f4f8;border-radius:12px;font-size:.75rem;' +
                'font-weight:600;color:#1a8ba8;margin:2px">' + f + '</span>';
        }).join('') + '</div></div>' +

        '<div style="background:rgba(46,168,113,.1);border-left:3px solid #2ea871;' +
        'padding:12px 16px;border-radius:8px;font-size:.85rem;color:#1a6040">' +
        'Account has been automatically created and activated. ' +
        'Customer has received their welcome email.</div>' +
        '<div style="text-align:center;margin-top:14px">' +
        '<a href="' + COMPANY_URL + '/hub.html" class="btn btn-primary">' +
        'View in Admin Portal</a></div>';

    return sendEmail(
        EMAIL_CONFIG.admin,
        'New Customer: ' + data.name +
        ' — R' + (data.monthlyTotal || 0).toLocaleString('en-ZA') + '/mo',
        emailBase(content, '#2ea871')
    );
}

// ============================================================
// NEW TEMPLATE F — PAYMENT RECEIVED
// ============================================================
function emailPaymentReceived(data) {
    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#2ea871;margin-bottom:6px">' +
        'Payment Received</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.name || 'there') + '</strong>,<br>' +
        'Thank you! Your payment has been received and your subscription is active.</p>' +

        '<div style="background:#f0fff8;border-radius:10px;padding:14px;' +
        'margin-bottom:16px;border:1px solid #c8f0da">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96;width:40%">Reference:</td>' +
        '<td style="font-weight:700">' + (data.paymentRef || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Date:</td>' +
        '<td style="font-weight:700">' + new Date().toLocaleDateString('en-ZA') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Amount:</td>' +
        '<td style="font-weight:700;color:#2ea871;font-size:1rem">R' +
        (data.amount || 0).toLocaleString('en-ZA') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Period:</td>' +
        '<td style="font-weight:700">' + (data.period || 'Monthly') + '</td></tr>' +
        '</table></div>' +

        '<p style="font-size:.85rem;color:#5a8a96;margin-bottom:14px">' +
        'Your next payment will be due in 30 days. ' +
        'You will receive a reminder before the due date.</p>' +
        '<div style="text-align:center">' +
        '<a href="' + COMPANY_URL + '/hub.html" class="btn btn-primary">Open StockAI-Pro</a></div>';

    return sendEmail(
        data.email,
        'Payment Received — R' + (data.amount || 0).toLocaleString('en-ZA') +
        ' | StockAI-Pro',
        emailBase(content, '#2ea871')
    );
}

// ============================================================
// NEW TEMPLATE G — PAYMENT FAILED / REMINDER
// ============================================================
function emailPaymentFailed(data) {
    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#c94545;margin-bottom:6px">' +
        'Payment Failed</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.name || 'there') + '</strong>,<br>' +
        'We were unable to process your subscription payment. ' +
        'Please update your payment details to keep your account active.</p>' +

        '<div style="background:rgba(201,69,69,.1);border-left:3px solid #c94545;' +
        'padding:12px 16px;border-radius:8px;margin:14px 0;font-size:.85rem;color:#7a1a1a">' +
        'Your subscription will be suspended in <strong>' +
        (data.daysRemaining || 7) + ' days</strong> if payment is not received.</div>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96;width:40%">' +
        'Amount Due:</td>' +
        '<td style="font-weight:700;color:#c94545">R' +
        (data.amount || 0).toLocaleString('en-ZA') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Due Date:</td>' +
        '<td style="font-weight:700">' + (data.dueDate || '') + '</td></tr>' +
        '</table></div>' +

        '<div style="text-align:center;margin-bottom:14px">' +
        '<a href="' + COMPANY_URL + '/signup.html" class="btn btn-primary" ' +
        'style="background:#c94545">Update Payment</a></div>' +
        '<p style="font-size:.82rem;color:#5a8a96;text-align:center">' +
        'Need help? Contact us immediately:</p>' +
        '<div style="text-align:center">' +
        '<a href="' + COMPANY_WA + '" class="btn btn-whatsapp">WhatsApp Support</a></div>';

    return sendEmail(
        data.email,
        'Payment Failed — Action Required | StockAI-Pro',
        emailBase(content, '#c94545')
    );
}

// ============================================================
// NEW TEMPLATE H — PASSWORD RESET
// ============================================================
function emailPasswordReset(data) {
    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
        'Password Reset Request</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.name || 'there') + '</strong>,<br>' +
        'We received a request to reset your password. ' +
        'Click the button below to set a new password.</p>' +

        '<div style="text-align:center;margin-bottom:20px">' +
        '<a href="' + (data.resetLink || '#') + '" class="btn btn-primary">' +
        'Reset My Password</a></div>' +

        '<div style="background:rgba(212,160,23,.1);border-left:3px solid #d4a017;' +
        'padding:12px 16px;border-radius:8px;margin:14px 0;font-size:.85rem;color:#7a5800">' +
        'This link expires in <strong>1 hour</strong>. ' +
        'If you did not request a reset, please ignore this email.</div>' +

        '<p style="font-size:.82rem;color:#5a8a96;margin-top:14px">' +
        'For security, never share your password with anyone, ' +
        'including StockAI-Pro support.</p>';

    return sendEmail(
        data.email,
        'Reset Your StockAI-Pro Password',
        emailBase(content, '#1a8ba8')
    );
}

// ============================================================
// NEW TEMPLATE I — SUPPLIER ORDER ACCEPTED
// ============================================================
function emailSupplierAccepted(data) {
    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#2ea871;margin-bottom:6px">' +
        'Order Accepted by Supplier</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">' +
        'Your purchase order has been accepted by <strong>' +
        (data.supplierName || '') + '</strong>.</p>' +

        '<div style="background:#f0fff8;border-radius:10px;padding:14px;' +
        'margin-bottom:16px;border:1px solid #c8f0da">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96;width:40%">' +
        'PO Number:</td>' +
        '<td style="font-weight:700">' + (data.poId || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Supplier:</td>' +
        '<td style="font-weight:700">' + (data.supplierName || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Total:</td>' +
        '<td style="font-weight:700;color:#2ea871">R' +
        (data.total || 0).toFixed(2) + '</td></tr>' +
        (data.supplierNote ?
            '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Note:</td>' +
            '<td><em>' + data.supplierNote + '</em></td></tr>' : '') +
        '</table></div>' +

        '<div style="background:rgba(46,168,113,.1);border-left:3px solid #2ea871;' +
        'padding:12px 16px;border-radius:8px;font-size:.85rem;color:#1a6040">' +
        'The order is now marked as In Transit in ProcureAI. ' +
        'Mark as received when the delivery arrives.</div>' +
        '<div style="text-align:center;margin-top:14px">' +
        '<a href="' + COMPANY_URL + '/hub.html" class="btn btn-primary">Open ProcureAI</a></div>';

    return sendEmail(
        data.toEmail,
        'Order Accepted — ' + data.poId + ' from ' + data.supplierName,
        emailBase(content, '#2ea871')
    );
}

// ============================================================
// NEW TEMPLATE J — HR LEAVE DECISION
// ============================================================
function emailLeaveDecision(data) {
    var approved     = data.status === 'approved';
    var color        = approved ? '#2ea871' : '#c94545';
    var title        = approved ? 'Leave Approved' : 'Leave Request Declined';

    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:' + color + ';margin-bottom:6px">' +
        title + '</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.employeeName || '') + '</strong>,<br>' +
        'Your leave request has been <strong>' + data.status + '</strong>.</p>' +

        '<div style="background:#f0f7f9;border-radius:10px;padding:14px;margin-bottom:16px">' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96;width:40%">' +
        'Leave Type:</td>' +
        '<td style="font-weight:700">' + (data.leaveType || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">From:</td>' +
        '<td style="font-weight:700">' + (data.startDate || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">To:</td>' +
        '<td style="font-weight:700">' + (data.endDate || '') + '</td></tr>' +
        '<tr><td style="padding:4px 0;font-size:.85rem;color:#5a8a96">Decision by:</td>' +
        '<td style="font-weight:700">' + (data.decidedBy || '') + '</td></tr>' +
        '</table></div>' +

        (data.reason ?
            '<div style="background:rgba(26,139,168,.1);border-left:3px solid #1a8ba8;' +
            'padding:12px 16px;border-radius:8px;font-size:.85rem;color:#0d4a5c;margin:14px 0">' +
            '<strong>Reason:</strong> ' + data.reason + '</div>'
        : '') +

        '<p style="font-size:.82rem;color:#5a8a96;margin-top:14px">' +
        'Contact your manager if you have any questions.</p>';

    return sendEmail(
        data.employeeEmail,
        'Leave ' + data.status.charAt(0).toUpperCase() + data.status.slice(1) +
        ' — ' + data.leaveType,
        emailBase(content, color)
    );
}

// ============================================================
// NEW TEMPLATE K — AI BRAIN ACTIVATED
// ============================================================
function emailAIBrainActivated(data) {
    var content =
        '<h2 style="font-size:1.2rem;font-weight:800;color:#0d9488;margin-bottom:6px">' +
        'Nikki AI is Now Active!</h2>' +
        '<p style="font-size:.88rem;color:#2a5f70;margin-bottom:16px">Hi <strong>' +
        (data.name || 'there') + '</strong>,<br>' +
        'Your AI Brain and Nikki Voice Bot feature is now active on your StockAI-Pro account!</p>' +

        '<div style="background:#f0fffe;border-radius:10px;padding:14px;' +
        'margin-bottom:16px;border:1px solid #c0eee8">' +
        '<h4 style="font-size:.9rem;font-weight:700;color:#0d4a5c;margin-bottom:10px">' +
        'What Nikki can do for you:</h4>' +
        '<p style="font-size:.85rem;color:#2a5f70;line-height:1.8;margin:0">' +
        'Just say "Hey Nikki" to activate<br>' +
        '"Show me today\'s low stock"<br>' +
        '"Create a PO for FreshFarm"<br>' +
        '"What are today\'s total sales?"<br>' +
        '"Open the cashup report"<br>' +
        'Responds in your chosen language' +
        '</p></div>' +

        '<div style="background:rgba(26,139,168,.1);border-left:3px solid #1a8ba8;' +
        'padding:12px 16px;border-radius:8px;font-size:.85rem;color:#0d4a5c;margin-bottom:14px">' +
        '<strong>Setup required:</strong> Configure your OpenAI API key in the ' +
        'Invoice Scanner settings to enable Nikki\'s AI responses.</div>' +

        '<div style="text-align:center;margin-top:14px">' +
        '<a href="' + COMPANY_URL + '/hub.html" class="btn btn-primary">' +
        'Launch StockAI-Pro</a></div>';

    return sendEmail(
        data.email,
        'Nikki AI Brain is Now Active — StockAI-Pro',
        emailBase(content, '#0d9488')
    );
}

// ============================================================
// INVOICE GENERATION
// ============================================================
function generateInvoiceHTML(data) {
    var entities   = data.entities || [];
    var baseExcl   = parseFloat((PRICING.baseFee   / (1 + PRICING.vatRate)).toFixed(2));
    var entityExcl = parseFloat((PRICING.entityFee / (1 + PRICING.vatRate)).toFixed(2));
    var lineItems  = '';
    var subtotal   = 0;

    lineItems +=
        '<tr>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c">' +
        'StockAI-Pro Platform Fee &mdash; Monthly Access</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;' +
        'color:#0d4a5c;text-align:center">1</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;' +
        'color:#0d4a5c;text-align:right">R' + baseExcl.toFixed(2) + '</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;' +
        'color:#0d4a5c;text-align:right;font-weight:600">R' + baseExcl.toFixed(2) + '</td>' +
        '</tr>';
    subtotal += baseExcl;

    entities.forEach(function(ent) {
        lineItems +=
            '<tr>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c">Entity Fee &mdash; ' + ent.name + '</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:center">1</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:right">R' +
            entityExcl.toFixed(2) + '</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:600">R' +
            entityExcl.toFixed(2) + '</td>' +
            '</tr>';
        subtotal += entityExcl;
    });

    var vatAmount = parseFloat((subtotal * PRICING.vatRate).toFixed(2));
    var total     = parseFloat((subtotal + vatAmount).toFixed(2));

    return '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;' +
        'border-radius:12px 12px 0 0">' +
        '<table style="width:100%"><tr>' +
        '<td><h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0;letter-spacing:1px">' +
        'STOCKAI-PRO</h1>' +
        '<p style="color:rgba(255,255,255,.7);font-size:.78rem;margin:4px 0 0">' +
        'Intelligence a click away</p></td>' +
        '<td style="text-align:right">' +
        '<div style="background:rgba(255,255,255,.15);padding:12px 20px;border-radius:8px">' +
        '<div style="color:#fff;font-size:1.4rem;font-weight:900;letter-spacing:2px">' +
        'TAX INVOICE</div>' +
        '<div style="color:rgba(255,255,255,.8);font-size:.78rem;margin-top:4px">' +
        '#' + data.invoiceNumber + '</div>' +
        '</div></td></tr></table></div>' +

        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none">' +
        '<table style="width:100%;margin-bottom:30px"><tr>' +
        '<td style="width:50%;padding-right:15px;vertical-align:top">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:700;letter-spacing:1px;margin-bottom:8px">From</div>' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c">' +
        COMPANY_DETAILS.name + '</div>' +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:2px">' +
        'T/A ' + COMPANY_DETAILS.trading + '</div>' +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:6px;line-height:1.8">' +
        COMPANY_DETAILS.address + '<br>' +
        COMPANY_DETAILS.phone + '<br>' +
        COMPANY_DETAILS.email + '<br>' +
        COMPANY_DETAILS.website + '</div></td>' +
        '<td style="width:50%;padding-left:15px;vertical-align:top">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:700;letter-spacing:1px;margin-bottom:8px">Bill To</div>' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c">' +
        (data.companyName || data.ownerName) + '</div>' +
        (data.companyAddress ?
            '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px;line-height:1.6">' +
            data.companyAddress + '</div>' : '') +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' +
        (data.ownerEmail || '') + '</div>' +
        (data.ownerPhone ?
            '<div style="font-size:.78rem;color:#5a8a96">' + data.ownerPhone + '</div>' : '') +
        (data.companyVat ?
            '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' +
            'VAT: ' + data.companyVat + '</div>' : '') +
        '</td></tr></table>' +

        '<table style="width:100%;margin-bottom:24px;background:#f0f7f9;border-radius:8px"><tr>' +
        '<td style="padding:14px;width:33%">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">' +
        'Invoice Date</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:#0d4a5c">' +
        data.invoiceDate + '</div></td>' +
        '<td style="padding:14px;width:33%">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">' +
        'Due Date</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:' +
        (data.isPaid ? '#2ea871' : '#c94545') + '">' + data.dueDate + '</div></td>' +
        '<td style="padding:14px;width:33%">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">' +
        'Status</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:' +
        (data.isPaid ? '#2ea871' : '#c94545') + '">' +
        (data.isPaid ? 'PAID' : 'DUE') + '</div></td>' +
        '</tr></table>' +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:12px 16px;text-align:left;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase">Description</th>' +
        '<th style="padding:12px 16px;text-align:center;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase">Qty</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase">Unit Price</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase">Amount</th>' +
        '</tr></thead><tbody>' + lineItems + '</tbody></table>' +

        '<table style="width:100%"><tr><td style="width:60%"></td>' +
        '<td style="width:40%">' +
        '<table style="width:100%">' +
        '<tr><td style="padding:8px 0;font-size:.88rem;color:#5a8a96">Subtotal (excl. VAT)</td>' +
        '<td style="padding:8px 0;text-align:right;font-weight:700;color:#0d4a5c">' +
        'R' + subtotal.toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:8px 0;font-size:.88rem;color:#5a8a96;' +
        'border-bottom:1px solid #e4f1f5">VAT (15%)</td>' +
        '<td style="padding:8px 0;text-align:right;font-weight:700;color:#0d4a5c;' +
        'border-bottom:1px solid #e4f1f5">R' + vatAmount.toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:14px 0;font-size:1.1rem;font-weight:900;color:#1a8ba8">' +
        'TOTAL (incl. VAT)</td>' +
        '<td style="padding:14px 0;font-size:1.1rem;font-weight:900;color:#1a8ba8;' +
        'text-align:right">R' + total.toFixed(2) + '</td></tr>' +
        '</table></td></tr></table>' +

        '<div style="margin-top:24px;padding:16px;background:#fff8e1;' +
        'border-left:3px solid #f59e0b;border-radius:8px;font-size:.82rem;color:#5a4a17">' +
        '<strong>Payment Methods:</strong><br>' +
        'EFT / Bank Transfer<br>' +
        'Card Payment via Customer Portal<br>' +
        'WhatsApp: ' + COMPANY_DETAILS.phone + '<br><br>' +
        '<strong>Payment Reference:</strong> ' + data.invoiceNumber + '</div>' +

        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4f1f5;' +
        'text-align:center">' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.name + ' T/A ' + COMPANY_DETAILS.trading + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.address + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.phone + ' &bull; ' +
        COMPANY_DETAILS.email + ' &bull; ' +
        COMPANY_DETAILS.website + '</p>' +
        '</div></div></div>';
}

function emailMonthlyInvoice(data) {
    return sendEmail(
        data.ownerEmail,
        'StockAI-Pro Tax Invoice #' + data.invoiceNumber + ' — Due ' + data.dueDate,
        generateInvoiceHTML(data)
    );
}

// ============================================================
// CONSOLIDATED STATEMENT
// ============================================================
function generateStatementHTML(data) {
    var invoiceRows = (data.invoices || []).map(function(inv) {
        return '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.82rem;color:#0d4a5c">' + inv.invoiceNumber + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.82rem;color:#0d4a5c">' + inv.date + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.82rem;color:#0d4a5c">' + inv.dueDate + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.82rem;color:#0d4a5c;text-align:right;font-weight:600">' +
            'R' + inv.total.toFixed(2) + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:center">' +
            '<span style="padding:3px 10px;border-radius:12px;font-size:.68rem;font-weight:600;' +
            'background:' + (inv.isPaid ? 'rgba(46,168,113,.12)' : 'rgba(201,69,69,.12)') + ';' +
            'color:' + (inv.isPaid ? '#2ea871' : '#c94545') + '">' +
            (inv.isPaid ? 'Paid' : 'Outstanding') + '</span></td></tr>';
    }).join('');

    var totalOutstanding = (data.invoices || [])
        .filter(function(i) { return !i.isPaid; })
        .reduce(function(s, i) { return s + i.total; }, 0);
    var totalPaid = (data.invoices || [])
        .filter(function(i) { return i.isPaid; })
        .reduce(function(s, i) { return s + i.total; }, 0);

    return '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;' +
        'border-radius:12px 12px 0 0">' +
        '<table style="width:100%"><tr>' +
        '<td><h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0">' +
        'STOCKAI-PRO</h1>' +
        '<p style="color:rgba(255,255,255,.7);font-size:.78rem;margin:4px 0 0">' +
        'Intelligence a click away</p></td>' +
        '<td style="text-align:right">' +
        '<div style="background:rgba(255,255,255,.15);padding:12px 20px;border-radius:8px">' +
        '<div style="color:#fff;font-size:1.2rem;font-weight:900;letter-spacing:2px">' +
        'STATEMENT</div>' +
        '<div style="color:rgba(255,255,255,.8);font-size:.75rem;margin-top:4px">' +
        data.dateFrom + ' &mdash; ' + data.dateTo + '</div>' +
        '</div></td></tr></table></div>' +

        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none;' +
        'border-radius:0 0 12px 12px">' +

        '<div style="margin-bottom:24px">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:700;letter-spacing:1px;margin-bottom:6px">Statement For</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#0d4a5c">' +
        (data.companyName || data.ownerName) + '</div></div>' +

        '<table style="width:100%;margin-bottom:24px"><tr>' +
        '<td style="width:33%;padding-right:8px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;' +
        'border-left:3px solid #1a8ba8">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">' +
        'Total Invoiced</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">' +
        'R' + (totalPaid + totalOutstanding).toFixed(2) + '</div></div></td>' +
        '<td style="width:33%;padding:0 4px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;' +
        'border-left:3px solid #2ea871">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">' +
        'Total Paid</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#2ea871">' +
        'R' + totalPaid.toFixed(2) + '</div></div></td>' +
        '<td style="width:33%;padding-left:8px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;' +
        'border-left:3px solid #c94545">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">' +
        'Outstanding</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#c94545">' +
        'R' + totalOutstanding.toFixed(2) + '</div></div></td>' +
        '</tr></table>' +

        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff">Invoice #</th>' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff">Date</th>' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff">Due Date</th>' +
        '<th style="padding:10px 14px;text-align:right;font-size:.7rem;color:#fff">Amount</th>' +
        '<th style="padding:10px 14px;text-align:center;font-size:.7rem;color:#fff">Status</th>' +
        '</tr></thead><tbody>' + invoiceRows + '</tbody></table>' +

        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4f1f5;' +
        'text-align:center">' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.name + ' T/A ' + COMPANY_DETAILS.trading + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.address + '</p>' +
        '</div></div></div>';
}

function emailStatement(data) {
    return sendEmail(
        data.ownerEmail,
        'StockAI-Pro Account Statement — ' + data.dateFrom + ' to ' + data.dateTo,
        generateStatementHTML(data)
    );
}

// ============================================================
// AUTO INVOICE — Runs on the 26th
// ============================================================
function checkAutoInvoice(accountData) {
    if (!accountData || !accountData.owner) return;

    var now   = new Date();
    var day   = now.getDate();
    var month = now.getMonth();
    var year  = now.getFullYear();

    if (day !== 26) return;

    var invoiceKey = 'invoice_' + year + '_' + month;
    var billing    = accountData.billing || {};
    if (billing.lastInvoiceSent === invoiceKey) return;

    var entities = accountData.entities || [];
    var activeEntities = entities.filter(function(e) {
        return e.status !== 'inactive';
    });
    if (activeEntities.length === 0) return;

    var lastDay = new Date(year, month + 1, 0).getDate();

    var invoiceNumber = 'INV-' +
        year +
        (month + 1 < 10 ? '0' : '') + (month + 1) +
        '-' +
        (accountData.owner.email || '')
            .replace(/[^a-zA-Z0-9]/g, '')
            .substring(0, 6)
            .toUpperCase();

    var invoiceDate = now.toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    var dueDate = new Date(year, month, lastDay).toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    emailMonthlyInvoice({
        invoiceNumber:  invoiceNumber,
        invoiceDate:    invoiceDate,
        dueDate:        dueDate,
        ownerName:      accountData.owner.name  || 'Customer',
        ownerEmail:     accountData.owner.email,
        ownerPhone:     accountData.owner.phone || '',
        companyName:    accountData.owner.groupName    || accountData.owner.name || '',
        companyAddress: accountData.owner.groupAddress || '',
        companyVat:     accountData.owner.groupVat     || '',
        entities:       activeEntities,
        isPaid:         false
    });

    billing.lastInvoiceSent = invoiceKey;
    return billing;
}

// ============================================================
// CONVENIENCE FUNCTIONS
// ============================================================
function sendDayEndEmails(entityData, accountData, dayEndData) {
    var recipients = [];
    if (accountData.owner && accountData.owner.email) {
        recipients.push(accountData.owner.email);
    }
    var users = (accountData.users || {})[entityData.id] || [];
    users.forEach(function(u) {
        if (u.email && (u.role === 'General Manager' || u.role === 'Area Manager')) {
            if (recipients.indexOf(u.email) === -1) recipients.push(u.email);
        }
    });
    if (recipients.length === 0) return Promise.resolve();
    return emailDayEndReport(Object.assign({}, dayEndData, {
        entityName: entityData.name,
        recipients: recipients
    }));
}

function sendStockCountEmails(entityData, accountData, countData) {
    var recipients = [];
    if (accountData.owner && accountData.owner.email) {
        recipients.push(accountData.owner.email);
    }
    var users = (accountData.users || {})[entityData.id] || [];
    users.forEach(function(u) {
        if (u.email && (
            u.role === 'General Manager' ||
            u.role === 'Area Manager' ||
            u.role === 'Operations Manager'
        )) {
            if (recipients.indexOf(u.email) === -1) recipients.push(u.email);
        }
    });
    if (recipients.length === 0) return Promise.resolve();
    return emailStockCountSubmitted(Object.assign({}, countData, {
        entityName: entityData.name,
        recipients: recipients
    }));
}

// ============================================================
// BULK EMAIL HELPER
// ============================================================
function emailBulkSend(recipients, subject, htmlBody) {
    var promises = (recipients || []).map(function(email) {
        return sendEmail(email, subject, htmlBody);
    });
    return Promise.all(promises);
}

// ============================================================
// TRIGGER SYSTEM — Call from any app
// ============================================================
window.emailTriggers = {

    // New customer signed up
    onNewCustomer: function(data) {
        emailWelcome(data);
        emailNewCustomerSignup(data);
    },

    // Payment succeeded
    onPaymentSuccess: function(data) {
        emailPaymentReceived(data);
    },

    // Payment failed
    onPaymentFailed: function(data) {
        emailPaymentFailed(data);
    },

    // PO sent to supplier
    onPurchaseOrderSent: function(data) {
        if (data.supplierEmail) emailPurchaseOrder(data);
    },

    // Supplier accepted order
    onSupplierAccepted: function(data) {
        if (data.toEmail) emailSupplierAccepted(data);
    },

    // Invoice GRV'd
    onGRVProcessed: function(data) {
        if (data.toEmail) emailGRVProcessed(data);
    },

    // Function / event created
    onFunctionCreated: function(data) {
        if (data.clientEmail || data.email) emailFunctionConfirmation(data);
    },

    // Stock went low
    onLowStock: function(data) {
        if (data.toEmail) emailLowStockAlert(data);
    },

    // Cashup posted
    onCashUpPosted: function(data) {
        if (data.toEmail) emailCashUpReport(data);
    },

    // Leave decision made
    onLeaveDecision: function(data) {
        if (data.employeeEmail) emailLeaveDecision(data);
    },

    // AI Brain feature activated
    onAIBrainActivated: function(data) {
        if (data.email) emailAIBrainActivated(data);
    },

    // Customer upgraded plan
    onUpgrade: function(data) {
        if (data.email) emailUpgradeConfirmation(data);
    },

    // Day end report
    onDayEnd: function(entityData, accountData, dayEndData) {
        sendDayEndEmails(entityData, accountData, dayEndData);
    },

    // Stock count submitted
    onStockCount: function(entityData, accountData, countData) {
        sendStockCountEmails(entityData, accountData, countData);
    }
};

// ============================================================
// CONFIRM LOADED
// ============================================================
console.log('✅ StockAI-Pro Email Templates v3.0 loaded');
console.log('📧 Proxy URL:', EMAIL_CONFIG.proxyUrl);
console.log('📧 emailUpgradeConfirmation:', typeof emailUpgradeConfirmation);
console.log('📧 Trigger system: window.emailTriggers.onEventName(data)');
console.log('📧 Templates ready: Welcome, PO, Day End, Stock Count, Wastage,');
console.log('   Payment Due, Month End, Late Delivery, Signup, Feedback,');
console.log('   Upgrade, Function, GRV, Low Stock, Cash Up, New Customer,');
console.log('   Payment Received, Payment Failed, Password Reset,');
console.log('   Supplier Accepted, HR Leave, AI Brain, Invoice, Statement');
