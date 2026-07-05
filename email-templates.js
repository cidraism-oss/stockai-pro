// ============================================================
// StockAI-Pro 2.0 — Email Templates
// All automated emails sent across all apps
// Uses Resend API
// ============================================================

var EMAIL_CONFIG = {
    apiKey:    're_45Zaif4k_9pYPpesV24GDyYEAfy9Nm1hT',
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

// ============================================================
// NOTE: fromEmail is set to onboarding@resend.dev for testing
// Once your domain stockai-pro.co.za is verified in Resend,
// change fromEmail back to: noreply@stockai-pro.co.za
// ============================================================

var VAT_RATE = 0.15;

// ============================================================
// FEATURE MAP
// ============================================================
var FEATURE_MAP = {
    web_boh:      'Web App B.O.H',
    mobile_app:   'Mobile App',
    procure_ai:   'ProcureAI App',
    pos_system:   'P.O.S System',
    menu_master:  'Menu Master',
    functions_ai: 'FunctionsAI'
};

var FEATURE_PRICES = {
    web_boh:      799,
    mobile_app:   349,
    procure_ai:   399,
    pos_system:   799,
    menu_master:  349,
    functions_ai: 449
};

var SETUP_HOURS = {
    web_boh:      12,
    mobile_app:   1,
    procure_ai:   1,
    pos_system:   8,
    menu_master:  0,
    functions_ai: 1
};

// ============================================================
// MASTER SEND FUNCTION
// ============================================================
function sendEmail(to, subject, html) {
    if (!to || !subject || !html) {
        console.warn('📧 sendEmail: missing required fields');
        return Promise.resolve({ ok: false, reason: 'missing fields' });
    }

    var recipients = Array.isArray(to) ? to : [to];
    recipients = recipients.filter(function(e) {
        return e && typeof e === 'string' && e.indexOf('@') !== -1;
    });

    if (recipients.length === 0) {
        console.warn('📧 sendEmail: no valid recipients');
        return Promise.resolve({ ok: false, reason: 'no valid recipients' });
    }

    console.log('📧 Sending email to:', recipients.join(', '));
    console.log('📧 Subject:', subject);

    return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + EMAIL_CONFIG.apiKey,
            'Content-Type':  'application/json'
        },
        body: JSON.stringify({
            from:    EMAIL_CONFIG.fromName + ' <' + EMAIL_CONFIG.fromEmail + '>',
            to:      recipients,
            subject: subject,
            html:    html
        })
    })
    .then(function(res) {
        if (res.ok) {
            console.log('✅ Email sent successfully to:', recipients.join(', '));
        } else {
            res.json().then(function(body) {
                console.error('❌ Email failed. Status:', res.status, 'Body:', JSON.stringify(body));
            }).catch(function() {
                console.error('❌ Email failed. Status:', res.status);
            });
        }
        return res;
    })
    .catch(function(err) {
        console.error('❌ Email fetch error:', err.message || err);
        return { ok: false, reason: err.message };
    });
}

// ============================================================
// REUSABLE EMAIL COMPONENTS
// ============================================================
function emailHeader(title, subtitle) {
    return '<div style="font-family:Poppins,Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;text-align:center;border-radius:12px 12px 0 0">' +
        '<h1 style="color:#fff;font-size:1.4rem;margin:0;font-weight:800">' + title + '</h1>' +
        (subtitle ? '<p style="color:rgba(255,255,255,.85);margin:6px 0 0;font-size:.88rem">' + subtitle + '</p>' : '') +
        '</div>' +
        '<div style="background:#fff;padding:32px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">';
}

function emailFooter() {
    return '<div style="margin-top:32px;padding-top:24px;border-top:1px solid #e4f1f5;text-align:center">' +
        '<div style="margin-bottom:16px">' +
        '<a href="' + EMAIL_CONFIG.website + '" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">🌐 Website</a>' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="color:#25D366;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">💬 WhatsApp</a>' +
        '<a href="mailto:' + EMAIL_CONFIG.support + '" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">📧 Support</a>' +
        '<a href="tel:' + EMAIL_CONFIG.phone + '" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;margin:0 8px">📞 ' + EMAIL_CONFIG.phone + '</a>' +
        '</div>' +
        '<p style="color:#8aabb5;font-size:.75rem;margin:0">© 2025 StockAI-Pro. Built with ❤️ in South Africa.</p>' +
        '</div></div></div>';
}

function emailInfoBox(rows) {
    return '<table style="width:100%;border-collapse:collapse;margin:16px 0">' +
        rows.map(function(row) {
            return '<tr>' +
                '<td style="padding:8px 12px;color:#5a8a96;font-size:.82rem;font-weight:600;background:#f0f7f9;white-space:nowrap;width:35%">' + row.label + '</td>' +
                '<td style="padding:8px 12px;color:#0d4a5c;font-size:.88rem;font-weight:600">' + row.value + '</td>' +
                '</tr>';
        }).join('') +
        '</table>';
}

function emailButton(text, url, color) {
    color = color || '#1a8ba8';
    return '<div style="text-align:center;margin:20px 0">' +
        '<a href="' + url + '" style="display:inline-block;padding:14px 32px;background:' + color + ';color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:.95rem">' +
        text + '</a></div>';
}

function formatR(amount) {
    return 'R' + Number(amount || 0).toLocaleString('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatDate(dateStr) {
    if (!dateStr) {
        return new Date().toLocaleDateString('en-ZA', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
    return new Date(dateStr).toLocaleDateString('en-ZA', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// ============================================================
// EMAIL 1 — WELCOME EMAIL
// ============================================================
function emailWelcome(data) {
    var html = emailHeader('🎉 Welcome to StockAI-Pro!', 'Your AI-powered stock management system is ready') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Your StockAI-Pro account has been created and is ready to use!</p>' +
        emailInfoBox([
            { label: 'Login Email',  value: data.email },
            { label: 'Plan',         value: data.plan },
            { label: 'Monthly Rate', value: 'R' + data.price + '/month' },
            { label: 'First Entity', value: data.entityName },
            { label: 'Next Payment', value: data.nextDue }
        ]) +
        emailButton('🚀 Open StockAI-Pro', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        '<div style="background:#f0f7f9;border-radius:10px;padding:18px;margin:20px 0">' +
        '<h4 style="color:#0d4a5c;font-size:.88rem;margin-bottom:10px">✅ Getting Started:</h4>' +
        '<ol style="color:#5a8a96;font-size:.85rem;line-height:1.8;padding-left:18px;margin:0">' +
        '<li>Log in with your email address</li>' +
        '<li>Add your suppliers first</li>' +
        '<li>Create your stock items and link suppliers</li>' +
        '<li>Set up your menu items</li>' +
        '<li>Run your first stock count using voice!</li>' +
        '</ol></div>' +
        emailFooter();
    return sendEmail(data.email, '🎉 Welcome to StockAI-Pro — Your Account is Ready!', html);
}

// ============================================================
// EMAIL 2 — NEW USER INVITE
// ============================================================
function emailNewUserInvite(data) {
    var html = emailHeader('🎉 You\'ve Been Invited to StockAI-Pro!', 'Your account has been created by ' + data.invitedBy) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7"><strong>' + data.invitedBy + '</strong> has added you to StockAI-Pro for <strong>' + data.entityName + '</strong>.</p>' +
        emailInfoBox([
            { label: 'Your Name',   value: data.name },
            { label: 'Your Role',   value: data.role },
            { label: 'Entity',      value: data.entityName },
            { label: 'Login Email', value: data.email }
        ]) +
        '<div style="background:rgba(26,139,168,.08);border-left:3px solid #1a8ba8;padding:16px;border-radius:8px;margin:20px 0">' +
        '<h4 style="color:#0d4a5c;font-size:.92rem;margin-bottom:8px">🔐 Set Up Your Password</h4>' +
        '<p style="color:#5a8a96;font-size:.85rem;margin:0">Click the button below to create your password and access your account.</p>' +
        '</div>' +
        emailButton('🚀 Set Up My Account', data.inviteLink || EMAIL_CONFIG.appUrl, '#2ea871') +
        emailFooter();
    return sendEmail(data.email, '🎉 You\'ve been invited to StockAI-Pro — ' + data.entityName, html);
}

// ============================================================
// EMAIL 3 — PURCHASE ORDER TO SUPPLIER
// ============================================================
function emailPurchaseOrder(data) {
    var itemRows = (data.items || []).map(function(item) {
        return '<tr style="border-bottom:1px solid #e4f1f5">' +
            '<td style="padding:10px;color:#0d4a5c;font-size:.85rem">' + item.name + '</td>' +
            '<td style="padding:10px;text-align:center;color:#0d4a5c;font-size:.85rem">' + item.qty + ' ' + item.unit + '</td>' +
            '<td style="padding:10px;text-align:right;color:#0d4a5c;font-size:.85rem">R' + (item.cost || 0).toFixed(2) + '</td>' +
            '<td style="padding:10px;text-align:right;font-weight:700;color:#0d4a5c;font-size:.85rem">R' + (item.total || 0).toFixed(2) + '</td>' +
            '</tr>';
    }).join('');

    var html = emailHeader('Purchase Order — ' + data.poId, 'From StockAI-Pro on behalf of ' + data.entityName) +
        emailInfoBox([
            { label: 'Supplier',    value: data.supplierName },
            { label: 'Deliver To',  value: data.entityName },
            { label: 'Order Date',  value: new Date(data.createdAt).toLocaleDateString('en-ZA') },
            { label: 'Ordered By',  value: data.createdBy || 'Procurement' }
        ]) +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Item</th>' +
        '<th style="padding:10px;text-align:center;font-size:.75rem;color:#fff">Qty</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff">Unit Price</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff">Total</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody>' +
        '<tfoot>' +
        '<tr style="background:#f0f7f9"><td colspan="3" style="padding:10px;text-align:right;font-weight:700;color:#0d4a5c">Excl. VAT:</td><td style="padding:10px;text-align:right;font-weight:700;color:#0d4a5c">R' + (data.total || 0).toFixed(2) + '</td></tr>' +
        '<tr style="background:#f0f7f9"><td colspan="3" style="padding:4px 10px;text-align:right;color:#5a8a96">VAT (15%):</td><td style="padding:4px 10px;text-align:right;color:#5a8a96">R' + ((data.total || 0) * VAT_RATE).toFixed(2) + '</td></tr>' +
        '<tr style="background:#e4f1f5"><td colspan="3" style="padding:12px 10px;text-align:right;font-weight:900;color:#1a8ba8;font-size:1rem">Total incl. VAT:</td><td style="padding:12px 10px;text-align:right;font-weight:900;color:#1a8ba8;font-size:1.1rem">R' + ((data.total || 0) * 1.15).toFixed(2) + '</td></tr>' +
        '</tfoot></table>' +
        emailFooter();

    return sendEmail(data.supplierEmail, 'Purchase Order ' + data.poId + ' — ' + data.entityName, html);
}

// ============================================================
// EMAIL 4 — DAY END REPORT
// ============================================================
function emailDayEndReport(data) {
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';

    var html = emailHeader('📊 Day End Report — ' + data.entityName, data.date + ' • Submitted by ' + data.submittedBy) +
        emailInfoBox([
            { label: 'Total Sales (Excl. VAT)', value: 'R' + (data.totalSales || 0).toLocaleString() },
            { label: 'Cash Sales',              value: 'R' + (data.cashSales || 0).toLocaleString() },
            { label: 'Card Sales',              value: 'R' + (data.cardSales || 0).toLocaleString() },
            { label: 'Pax Served',              value: data.pax || '0' },
            { label: 'Avg Spend / Person',      value: 'R' + (data.avgSpend || 0).toFixed(2) },
            { label: 'Purchases',               value: 'R' + (data.purchases || 0).toFixed(2) },
            { label: 'Food Cost Target',        value: (data.foodCostTarget || 28) + '%' },
            { label: 'Actual Food Cost',        value: '<span style="color:' + fcColor + ';font-weight:700">' + (data.foodCostPercent || 0).toFixed(1) + '%</span>' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();

    return sendEmail(data.recipients || [], '📊 Day End Report — ' + data.entityName + ' — ' + data.date, html);
}

// ============================================================
// EMAIL 5 — STOCK COUNT SUBMITTED
// ============================================================
function emailStockCountSubmitted(data) {
    var html = emailHeader('📋 Stock Count Submitted', data.entityName + ' — ' + data.date) +
        '<p style="color:#5a8a96;line-height:1.7">A stock count has been submitted for <strong>' + data.entityName + '</strong>.</p>' +
        emailInfoBox([
            { label: 'Submitted By',        value: data.submittedBy },
            { label: 'Date',                value: data.date },
            { label: 'Total Items',         value: data.totalItems + ' items counted' },
            { label: 'Items with Variance', value: data.varianceItems + ' items' },
            { label: 'Closing Stock Value', value: 'R' + (data.closingValue || 0).toFixed(2) }
        ]) +
        emailButton('View Full Count', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(data.recipients || [], '📋 Stock Count — ' + data.entityName + ' — ' + data.date, html);
}

// ============================================================
// EMAIL 6 — WASTAGE REPORT
// ============================================================
function emailWastageReport(data) {
    var html = emailHeader('🗑️ Wastage Report', data.entityName + ' — ' + data.date) +
        emailInfoBox([
            { label: 'Date',          value: data.date },
            { label: 'Submitted By',  value: data.submittedBy },
            { label: 'Total Wastage', value: '<span style="color:#c94545;font-weight:700">R' + (data.totalValue || 0).toFixed(2) + '</span>' },
            { label: 'Items Wasted',  value: (data.items || []).length + ' items' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(data.recipients || [], '🗑️ Wastage Report — ' + data.entityName + ' — ' + data.date, html);
}

// ============================================================
// EMAIL 7 — PAYMENT REMINDER
// ============================================================
function emailPaymentDue(data) {
    var html = emailHeader('💳 Payment Due Today', 'Your StockAI-Pro subscription payment is due') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.ownerName + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Your StockAI-Pro subscription payment is due today.</p>' +
        '<div style="background:rgba(201,69,69,.06);border:1px solid rgba(201,69,69,.2);border-radius:12px;padding:24px;text-align:center;margin:20px 0">' +
        '<div style="font-size:.78rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:8px">Amount Due Today</div>' +
        '<div style="font-size:2.5rem;font-weight:900;color:#c94545">R' + parseInt(data.amount).toLocaleString() + '</div>' +
        '<div style="font-size:.82rem;color:#5a8a96;margin-top:4px">' + data.plan + ' • Due: ' + data.dueDate + '</div></div>' +
        emailButton('Pay Now via Portal', EMAIL_CONFIG.portalUrl, '#c94545') +
        emailFooter();
    return sendEmail(data.ownerEmail, '💳 Payment Due Today — StockAI-Pro Subscription', html);
}

// ============================================================
// EMAIL 8 — MONTH END REPORT
// ============================================================
function emailMonthEndReport(data) {
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';
    var html = emailHeader('📅 Month End Report — ' + data.entityName, data.month + ' ' + data.year) +
        emailInfoBox([
            { label: 'Month',            value: data.month + ' ' + data.year },
            { label: 'Opening Stock',    value: 'R' + (data.openingStock || 0).toFixed(2) },
            { label: 'Total Purchases',  value: 'R' + (data.totalPurchases || 0).toFixed(2) },
            { label: 'Closing Stock',    value: 'R' + (data.closingStock || 0).toFixed(2) },
            { label: 'Total Sales',      value: 'R' + (data.totalSales || 0).toFixed(2) },
            { label: 'Total Wastage',    value: 'R' + (data.totalWastage || 0).toFixed(2) },
            { label: 'Food Cost %',      value: '<span style="color:' + fcColor + ';font-weight:700">' + (data.foodCostPercent || 0).toFixed(1) + '%</span>' },
            { label: 'Food Cost Target', value: (data.foodCostTarget || 28) + '%' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(data.recipients || [], '📅 Month End Report — ' + data.entityName + ' — ' + data.month + ' ' + data.year, html);
}

// ============================================================
// EMAIL 9 — LATE DELIVERY NOTIFICATION
// ============================================================
function emailLateDelivery(data) {
    var html = emailHeader('⚠️ Late Delivery Alert', data.supplierName + ' — ' + data.entityName) +
        '<p style="color:#0d4a5c;font-size:1rem">A delivery from <strong>' + data.supplierName + '</strong> is overdue.</p>' +
        emailInfoBox([
            { label: 'Supplier',     value: data.supplierName },
            { label: 'PO Number',    value: data.poId },
            { label: 'Order Date',   value: data.orderDate },
            { label: 'Expected',     value: data.expectedDate },
            { label: 'Days Overdue', value: data.daysOverdue + ' day(s)' }
        ]) +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px 16px;border-radius:8px;margin-top:16px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">Please contact ' + data.supplierName + ' immediately to follow up on this delivery.</p></div>' +
        emailFooter();
    return sendEmail(data.recipients || [], '⚠️ Late Delivery — ' + data.supplierName + ' — ' + data.poId, html);
}

// ============================================================
// EMAIL 10 — NEW SIGNUP NOTIFICATION TO ADMIN
// ============================================================
function emailNewSignupNotification(data) {
    var featureList = (data.features || []).map(function(f) {
        return '✅ ' + (FEATURE_MAP[f] || f) + ' — ' + formatR(FEATURE_PRICES[f] || 0) + '/mo';
    }).join('<br>');

    var html = emailHeader('🚀 New Customer Signed Up!', 'A new customer has joined StockAI-Pro') +
        '<div style="background:rgba(245,158,11,.08);border-radius:10px;padding:20px;margin-bottom:20px;border:1px solid rgba(245,158,11,.2);text-align:center">' +
        '<div style="font-size:2rem;margin-bottom:8px">💰</div>' +
        '<div style="font-size:1.3rem;font-weight:900;color:#0d4a5c">' + formatR(data.monthlyTotal || data.price || 0) + '<span style="font-size:1rem;opacity:.7">/month</span></div>' +
        '<div style="font-size:.82rem;color:#5a8a96;margin-top:4px">New recurring revenue</div></div>' +
        emailInfoBox([
            { label: 'Name',           value: data.name || '—' },
            { label: 'Email',          value: data.email || '—' },
            { label: 'Business',       value: data.business || '—' },
            { label: 'Features',       value: featureList || '—' },
            { label: 'Entities',       value: (data.entities || 1) + ' entity/entities' },
            { label: 'Monthly Total',  value: formatR(data.monthlyTotal || data.price || 0) + '/mo' },
            { label: 'Once-off Total', value: formatR(data.onceOffTotal || 0) },
            { label: 'Payment Ref',    value: data.ref || '—' }
        ]) +
        emailFooter();

    return sendEmail(
        EMAIL_CONFIG.admin,
        '🚀 New Signup: ' + (data.name || data.email || 'Unknown') + ' — ' + formatR(data.monthlyTotal || data.price || 0) + '/mo',
        html
    );
}

// ============================================================
// EMAIL 11 — QUOTE TO CUSTOMER
// Called from index.html when customer clicks Email My Quote
// ============================================================
window.sendQuoteEmailToCustomer = function(data) {
    console.log('📧 sendQuoteEmailToCustomer called with:', data);

    if (!data || !data.customer || !data.customer.email) {
        console.error('❌ sendQuoteEmailToCustomer: no customer email provided');
        return Promise.resolve({ ok: false });
    }

    var featureRows = '';
    (data.features || []).forEach(function(f, i) {
        var price = FEATURE_PRICES[f] || 0;
        var name  = FEATURE_MAP[f] || (data.featureLabels && data.featureLabels[i]) || f;
        featureRows +=
            '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">' +
            (f === 'web_boh' ? '🔒 ' : '✅ ') + name +
            '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' +
            formatR(price) + '/mo' +
            '</td>' +
            '</tr>';
    });

    var entityRow =
        '<tr>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">📦 Entities (' + (data.entities || 1) + ' × R599/mo)</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' + formatR(data.entityTotal || 0) + '/mo</td>' +
        '</tr>';

    var techRow = '';
    if (data.techIncluded && data.techHours > 0) {
        techRow =
            '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">🔧 Technician Setup (' + data.techHours + ' hrs × R450)</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' + formatR(data.techTotal || 0) + '</td>' +
            '</tr>';
    }

    var trainingRow = '';
    if (data.trainingIncluded) {
        var trainLabel = '📚 Staff Training (5 staff';
        if (data.extraStaff > 0) trainLabel += ' + ' + data.extraStaff + ' additional';
        trainLabel += ')';
        trainingRow =
            '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">' + trainLabel + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' + formatR(data.trainingTotal || 0) + '</td>' +
            '</tr>';
    }

    var html = emailHeader('📋 Your Custom Quotation', 'Thank you for your interest in StockAI-Pro') +

        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Thank you for using our quote builder! Please find your custom quotation below.</p>' +

        '<div style="background:#f0f7f9;padding:14px 18px;border-radius:10px;margin-bottom:20px">' +
        '<table style="width:100%"><tr>' +
        '<td><span style="font-size:.72rem;color:#5a8a96;display:block">Quote Reference</span><strong style="font-size:.95rem;color:#0d4a5c">' + (data.quoteRef || '—') + '</strong></td>' +
        '<td style="text-align:right"><span style="font-size:.72rem;color:#5a8a96;display:block">Date</span><strong style="font-size:.95rem;color:#0d4a5c">' + (data.quoteDate || '—') + '</strong></td>' +
        '</tr></table></div>' +

        emailInfoBox([
            { label: 'Name',     value: data.customer.name },
            { label: 'Business', value: data.customer.business },
            { label: 'Phone',    value: data.customer.phone },
            { label: 'Email',    value: data.customer.email }
        ]) +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<tr><td colspan="2" style="background:#0d4a5c;color:#fff;padding:10px 14px;font-weight:700;font-size:.78rem;border-radius:8px 8px 0 0">MONTHLY SUBSCRIPTION (incl. VAT)</td></tr>' +
        featureRows +
        entityRow +
        '<tr style="background:#e4f1f5"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Monthly Total</td>' +
        '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">' + formatR(data.monthlyTotal || 0) + '/mo</td></tr>' +
        '</table>' +

        (data.onceOffTotal > 0 ?
            '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
            '<tr><td colspan="2" style="background:#d97706;color:#fff;padding:10px 14px;font-weight:700;font-size:.78rem;border-radius:8px 8px 0 0">ONCE-OFF CHARGES (incl. VAT)</td></tr>' +
            techRow + trainingRow +
            '<tr style="background:#fef3c7"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Once-off Total</td>' +
            '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#d97706;text-align:right">' + formatR(data.onceOffTotal) + '</td></tr>' +
            '</table>'
        : '') +

        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px 18px;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ 30-Day Money-Back Guarantee</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">Not satisfied within 30 days? Full refund — no questions asked.</div>' +
        '</div>' +

        emailButton('🚀 Get Started Now', EMAIL_CONFIG.website + '/signup.html?features=' + (data.features || []).join(',') + '&entities=' + (data.entities || 1), '#f59e0b') +

        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin:0">This quotation is valid for 30 days from the date of issue.</p>' +

        emailFooter();

    return sendEmail(
        data.customer.email,
        'Your StockAI-Pro Quotation — ' + (data.quoteRef || ''),
        html
    );
};

// ============================================================
// EMAIL 12 — QUOTE NOTIFICATION TO ADMIN
// Called from index.html every time a quote is requested
// Sent to: cidraism@gmail.com
// ============================================================
window.sendQuoteNotificationToAdmin = function(data) {
    console.log('📧 sendQuoteNotificationToAdmin called');

    var featureList = (data.features || []).map(function(f) {
        return '✅ ' + (FEATURE_MAP[f] || f) + ' — ' + formatR(FEATURE_PRICES[f] || 0) + '/mo';
    }).join('<br>');

    var html = emailHeader('📋 New Quote Request', 'A customer has requested a quote on the website') +

        '<p style="color:#5a8a96;line-height:1.7;margin-bottom:20px">A new quotation has been requested on the StockAI-Pro website:</p>' +

        emailInfoBox([
            { label: 'Quote Ref',  value: data.quoteRef || '—' },
            { label: 'Date',       value: data.quoteDate || new Date().toLocaleDateString('en-ZA') },
            { label: 'Name',       value: data.customer ? data.customer.name : '—' },
            { label: 'Business',   value: data.customer ? data.customer.business : '—' },
            { label: 'Phone',      value: data.customer ? data.customer.phone : '—' },
            { label: 'Email',      value: data.customer ? data.customer.email : '—' },
            { label: 'Features',   value: featureList || '—' },
            { label: 'Entities',   value: (data.entities || 1) + ' entities' },
            { label: 'Technician', value: data.techIncluded ? '✅ ' + (data.techHours || 0) + ' hrs = ' + formatR(data.techTotal || 0) : '❌ Not requested' },
            { label: 'Training',   value: data.trainingIncluded ? '✅ ' + formatR(data.trainingTotal || 0) : '❌ Not requested' },
            { label: 'Monthly',    value: formatR(data.monthlyTotal || 0) + '/mo' },
            { label: 'Once-off',   value: formatR(data.onceOffTotal || 0) }
        ]) +

        emailFooter();

    return sendEmail(
        EMAIL_CONFIG.admin,
        '📋 New Quote: ' + (data.customer ? data.customer.business : 'Unknown') + ' — ' + formatR(data.monthlyTotal || 0) + '/mo',
        html
    );
};

// ============================================================
// EMAIL 13 — BOOKING CONFIRMATION TO CUSTOMER
// Called from index.html when a presentation is booked
// ============================================================
window.sendBookingConfirmationToCustomer = function(booking) {
    console.log('📧 sendBookingConfirmationToCustomer called');

    var dateFormatted = formatDate(booking.date);

    var html = emailHeader('✅ Presentation Booking Confirmed!', 'We look forward to meeting you') +

        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + booking.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Your StockAI-Pro presentation has been confirmed!</p>' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:24px;color:#fff;margin:20px 0;text-align:center">' +
        '<div style="font-size:.72rem;text-transform:uppercase;letter-spacing:2px;opacity:.7;margin-bottom:12px;font-weight:700">📅 Your Booking</div>' +
        '<div style="font-size:1.2rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +

        emailInfoBox([
            { label: 'Booking ID', value: booking.id },
            { label: 'Name',       value: booking.customer.name },
            { label: 'Business',   value: booking.customer.business },
            { label: 'Phone',      value: booking.customer.phone },
            { label: 'Email',      value: booking.customer.email }
        ]) +

        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px 18px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ Booking Confirmed</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">Need to reschedule? Contact us at least 24 hours in advance.</div>' +
        '</div>' +

        emailFooter();

    return sendEmail(
        booking.customer.email,
        '✅ Presentation Confirmed — ' + dateFormatted + ' — StockAI-Pro',
        html
    );
};

// ============================================================
// EMAIL 14 — BOOKING NOTIFICATION TO ADMIN
// Called from index.html when a presentation is booked
// Sent to: cidraism@gmail.com
// ============================================================
window.sendBookingEmailToAdmin = function(booking) {
    console.log('📧 sendBookingEmailToAdmin called');

    var dateFormatted = formatDate(booking.date);

    var html = emailHeader('📅 New Presentation Booking!', 'A customer has booked a presentation slot') +

        '<p style="color:#5a8a96;line-height:1.7;margin-bottom:20px">A new presentation has been booked. Add this to your calendar!</p>' +

        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:20px;color:#fff;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:1.3rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1.1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +

        emailInfoBox([
            { label: 'Booking ID', value: booking.id },
            { label: 'Date',       value: dateFormatted },
            { label: 'Time Slot',  value: booking.slotLabel },
            { label: 'Name',       value: booking.customer.name },
            { label: 'Business',   value: booking.customer.business },
            { label: 'Phone',      value: booking.customer.phone },
            { label: 'Email',      value: booking.customer.email },
            { label: 'Booked At',  value: new Date(booking.timestamp).toLocaleString('en-ZA') }
        ]) +

        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px 16px;border-radius:8px;margin-top:16px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">📌 <strong>Add to your calendar:</strong> ' + dateFormatted + ' • ' + booking.slotLabel + '</p></div>' +

        emailFooter();

    return sendEmail(
        EMAIL_CONFIG.admin,
        '📅 New Booking: ' + booking.customer.business + ' — ' + dateFormatted,
        html
    );
};

// ============================================================
// EMAIL 15 — DAILY QUOTE ANALYSIS TO ADMIN
// Auto-triggered at 5pm if there were quotes that day
// No quotes = no email sent
// Sent to: cidraism@gmail.com
// ============================================================
window.sendDailyQuoteAnalysis = function() {
    console.log('📊 sendDailyQuoteAnalysis called');

    var quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    var today  = new Date().toISOString().split('T')[0];

    var todayQuotes = quotes.filter(function(q) {
        return q.timestamp && q.timestamp.startsWith(today);
    });

    if (todayQuotes.length === 0) {
        console.log('📊 No quotes today — daily analysis email NOT sent');
        return Promise.resolve({ ok: true, reason: 'no quotes today' });
    }

    var totalMonthly = 0;
    var totalOnceOff = 0;
    todayQuotes.forEach(function(q) {
        totalMonthly += (q.monthlyTotal || 0);
        totalOnceOff += (q.onceOffTotal || 0);
    });

    var tableRows = todayQuotes.map(function(q, i) {
        var bg = i % 2 === 0 ? '#f8fcfd' : '#fff';
        return '<tr style="background:' + bg + '">' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#2a5f70">' + (q.quoteRef || '—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#2a5f70">' + (q.customer ? q.customer.name : '—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#2a5f70">' + (q.customer ? q.customer.business : '—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#2a5f70">' + (q.customer ? q.customer.phone : '—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#2a5f70">' + (q.customer ? q.customer.email : '—') + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;text-align:center;color:#2a5f70">' + (q.entities || 1) + '</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#1a8ba8;font-weight:700">' + formatR(q.monthlyTotal || 0) + '/mo</td>' +
            '<td style="padding:8px 10px;border-bottom:1px solid #e4f1f5;font-size:.75rem;color:#d97706;font-weight:700">' + formatR(q.onceOffTotal || 0) + '</td>' +
            '</tr>';
    }).join('');

    var html = emailHeader(
        '📊 Daily Quote Analysis',
        todayQuotes.length + ' quote' + (todayQuotes.length > 1 ? 's' : '') + ' received today'
    ) +

        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:24px">' +
        '<div style="background:#e4f1f5;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:2rem;font-weight:900;color:#1a8ba8">' + todayQuotes.length + '</div>' +
        '<div style="font-size:.72rem;color:#5a8a96;font-weight:600;margin-top:4px">Quotes Today</div></div>' +
        '<div style="background:#d1fae5;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:900;color:#065f46">' + formatR(totalMonthly) + '</div>' +
        '<div style="font-size:.72rem;color:#047857;font-weight:600;margin-top:4px">Monthly Value</div></div>' +
        '<div style="background:#fef3c7;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:900;color:#92400e">' + formatR(totalOnceOff) + '</div>' +
        '<div style="font-size:.72rem;color:#a16207;font-weight:600;margin-top:4px">Once-off Value</div></div>' +
        '</div>' +

        '<div style="overflow-x:auto">' +
        '<table style="width:100%;border-collapse:collapse;min-width:580px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Ref</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Name</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Business</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Phone</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Email</th>' +
        '<th style="padding:10px;text-align:center;font-size:.7rem;color:#fff">Ent.</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Monthly</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Once-off</th>' +
        '</tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
        '</table></div>' +

        emailFooter();

    return sendEmail(
        EMAIL_CONFIG.admin,
        '📊 Daily Quotes: ' + todayQuotes.length + ' quote' + (todayQuotes.length > 1 ? 's' : '') + ' — ' + formatR(totalMonthly) + '/mo potential',
        html
    );
};

// ============================================================
// AUTO DAILY ANALYSIS TRIGGER
// Checks once per day — only sends if quotes exist
// ============================================================
window.checkAndSendDailyAnalysis = function() {
    var lastSent = localStorage.getItem('stockai_daily_analysis_sent');
    var today    = new Date().toISOString().split('T')[0];

    if (lastSent === today) {
        console.log('📊 Daily analysis already sent today — skipping');
        return;
    }

    var quotes = JSON.parse(localStorage.getItem('stockai_quotes') || '[]');
    var todayQuotes = quotes.filter(function(q) {
        return q.timestamp && q.timestamp.startsWith(today);
    });

    if (todayQuotes.length > 0) {
        window.sendDailyQuoteAnalysis().then(function() {
            localStorage.setItem('stockai_daily_analysis_sent', today);
            console.log('📊 Daily analysis sent and marked for today');
        });
    } else {
        console.log('📊 No quotes today — daily analysis not sent');
    }
};

// Auto check after 5pm
setTimeout(function() {
    var now = new Date();
    if (now.getHours() >= 17) {
        window.checkAndSendDailyAnalysis();
    }
}, 5000);

// ============================================================
// COMPANY DETAILS — For invoices
// ============================================================
var COMPANY_DETAILS = {
    name:    'HollowAqua Pty Ltd',
    trading: 'StockAI-Pro',
    phone:   '+2779-044-0508',
    email:   'Billing@stockai-pro.co.za',
    address: '16 Loddon Road, Mulbarton, 2059, Johannesburg South, Gauteng, South Africa',
    website: 'www.stockai-pro.co.za'
};

var PRICING = {
    baseFee:   799,
    entityFee: 599,
    vatRate:   0.15
};

// ============================================================
// GENERATE INVOICE HTML
// ============================================================
function generateInvoiceHTML(data) {
    var entities   = data.entities || [];
    var baseExcl   = parseFloat((PRICING.baseFee / (1 + PRICING.vatRate)).toFixed(2));
    var entityExcl = parseFloat((PRICING.entityFee / (1 + PRICING.vatRate)).toFixed(2));
    var lineItems  = '';
    var subtotal   = 0;

    lineItems += '<tr>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c">StockAI-Pro Platform Fee — Monthly Access</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:center">1</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right">R' + baseExcl.toFixed(2) + '</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:600">R' + baseExcl.toFixed(2) + '</td>' +
        '</tr>';
    subtotal += baseExcl;

    entities.forEach(function(ent) {
        lineItems += '<tr>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c">Entity Fee — ' + ent.name + '</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:center">1</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right">R' + entityExcl.toFixed(2) + '</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:600">R' + entityExcl.toFixed(2) + '</td>' +
            '</tr>';
        subtotal += entityExcl;
    });

    var vatAmount = parseFloat((subtotal * PRICING.vatRate).toFixed(2));
    var total     = parseFloat((subtotal + vatAmount).toFixed(2));

    return '<div style="font-family:Poppins,Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;border-radius:12px 12px 0 0">' +
        '<h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0">STOCKAI-PRO</h1>' +
        '<p style="color:rgba(255,255,255,.7);font-size:.78rem;margin:4px 0 0">Intelligence a click away</p>' +
        '<div style="background:rgba(255,255,255,.15);padding:8px 16px;border-radius:8px;margin-top:12px;display:inline-block">' +
        '<div style="color:#fff;font-size:1.2rem;font-weight:900;letter-spacing:2px">TAX INVOICE #' + data.invoiceNumber + '</div>' +
        '</div></div>' +
        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none">' +
        emailInfoBox([
            { label: 'Invoice Date', value: data.invoiceDate },
            { label: 'Due Date',     value: data.dueDate },
            { label: 'Status',       value: data.isPaid ? '✅ PAID' : '⏳ DUE' },
            { label: 'Bill To',      value: data.companyName || data.ownerName },
            { label: 'Email',        value: data.ownerEmail || '—' }
        ]) +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:12px 16px;text-align:left;font-size:.72rem;color:#fff">Description</th>' +
        '<th style="padding:12px 16px;text-align:center;font-size:.72rem;color:#fff">Qty</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff">Unit Price</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff">Amount</th>' +
        '</tr></thead><tbody>' + lineItems + '</tbody></table>' +
        '<div style="display:flex;justify-content:flex-end">' +
        '<div style="width:260px">' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:.88rem;color:#5a8a96"><span>Subtotal (excl. VAT)</span><strong style="color:#0d4a5c">R' + subtotal.toFixed(2) + '</strong></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:.88rem;color:#5a8a96;border-bottom:1px solid #e4f1f5"><span>VAT (15%)</span><strong style="color:#0d4a5c">R' + vatAmount.toFixed(2) + '</strong></div>' +
        '<div style="display:flex;justify-content:space-between;padding:14px 0;font-size:1.1rem;font-weight:900;color:#1a8ba8"><span>TOTAL (incl. VAT)</span><strong>R' + total.toFixed(2) + '</strong></div>' +
        '</div></div>' +
        '<div style="margin-top:20px;padding:16px;background:#fff8e1;border-left:3px solid #f59e0b;border-radius:8px;font-size:.82rem;color:#5a4a17">' +
        '<strong>Payment Ref:</strong> ' + data.invoiceNumber + '</div>' +
        '</div></div>';
}

// ============================================================
// EMAIL MONTHLY INVOICE
// ============================================================
function emailMonthlyInvoice(data) {
    var html = generateInvoiceHTML(data);
    return sendEmail(
        data.ownerEmail,
        '📄 StockAI-Pro Tax Invoice #' + data.invoiceNumber + ' — Due ' + data.dueDate,
        html
    );
}

// ============================================================
// CONVENIENCE FUNCTIONS
// ============================================================
function sendDayEndEmails(entityData, accountData, dayEndData) {
    var recipients = [];
    if (accountData.owner && accountData.owner.email) recipients.push(accountData.owner.email);
    var users = (accountData.users || {})[entityData.id] || [];
    users.forEach(function(u) {
        if (u.email && (u.role === 'General Manager' || u.role === 'Area Manager')) {
            if (recipients.indexOf(u.email) === -1) recipients.push(u.email);
        }
    });
    if (recipients.length === 0) return Promise.resolve();
    return emailDayEndReport(Object.assign({}, dayEndData, { entityName: entityData.name, recipients: recipients }));
}

function sendStockCountEmails(entityData, accountData, countData) {
    var recipients = [];
    if (accountData.owner && accountData.owner.email) recipients.push(accountData.owner.email);
    var users = (accountData.users || {})[entityData.id] || [];
    users.forEach(function(u) {
        if (u.email && (u.role === 'General Manager' || u.role === 'Area Manager' || u.role === 'Operations Manager')) {
            if (recipients.indexOf(u.email) === -1) recipients.push(u.email);
        }
    });
    if (recipients.length === 0) return Promise.resolve();
    return emailStockCountSubmitted(Object.assign({}, countData, { entityName: entityData.name, recipients: recipients }));
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
    var entities       = accountData.entities || [];
    var activeEntities = entities.filter(function(e) { return e.status !== 'inactive'; });
    if (activeEntities.length === 0) return;
    var lastDay       = new Date(year, month + 1, 0).getDate();
    var invoiceNumber = 'INV-' + year + (month + 1 < 10 ? '0' : '') + (month + 1) + '-' +
        (accountData.owner.email || '').replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase();
    var invoiceDate = now.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
    var dueDate     = new Date(year, month, lastDay).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
    emailMonthlyInvoice({
        invoiceNumber: invoiceNumber, invoiceDate: invoiceDate, dueDate: dueDate,
        ownerName: accountData.owner.name || 'Customer', ownerEmail: accountData.owner.email,
        companyName: accountData.owner.groupName || accountData.owner.name || '',
        companyAddress: accountData.owner.groupAddress || '',
        entities: activeEntities, isPaid: false
    });
    billing.lastInvoiceSent = invoiceKey;
    return billing;
}

// ============================================================
// EVENT FEEDBACK REQUEST
// ============================================================
function emailEventFeedbackRequest(data) {
    var html = emailHeader('How did we do?', 'We would love your feedback on ' + data.eventName) +
        '<p>Hi ' + data.clientName + ',</p>' +
        '<p>Thank you for hosting your event with us! We hope everything was perfect.</p>' +
        emailButton('Rate My Event', 'https://www.stockai-pro.co.za/feedback?id=' + data.id, '#ec4899') +
        emailFooter();
    return sendEmail(data.clientEmail, 'Feedback Request: ' + data.eventName, html);
}

// ============================================================
// LOG — Confirms file loaded correctly
// ============================================================
console.log('✅ email-templates.js loaded successfully');
console.log('📧 Quote email function ready:', typeof window.sendQuoteEmailToCustomer);
console.log('📧 Admin notify function ready:', typeof window.sendQuoteNotificationToAdmin);
console.log('📧 Booking confirm function ready:', typeof window.sendBookingConfirmationToCustomer);
console.log('📧 Booking admin function ready:', typeof window.sendBookingEmailToAdmin);
console.log('📧 Daily analysis function ready:', typeof window.sendDailyQuoteAnalysis);
