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
// Once stockai-pro.co.za is verified in Resend dashboard,
// change fromEmail to: noreply@stockai-pro.co.za
// ============================================================

var VAT_RATE = 0.15;

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
        console.warn('sendEmail: missing required fields');
        return Promise.resolve({ ok: false });
    }
    var recipients = Array.isArray(to) ? to : [to];
    recipients = recipients.filter(function(e) {
        return e && typeof e === 'string' && e.indexOf('@') !== -1;
    });
    if (recipients.length === 0) {
        console.warn('sendEmail: no valid recipients');
        return Promise.resolve({ ok: false });
    }
    return fetch('https://bold-dust-c51b.cidraism.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to: recipients,
            subject: subject,
            html: html
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
        return { ok: false };
    });
}
// ============================================================
// REUSABLE COMPONENTS
// ============================================================
function emailHeader(title, subtitle) {
    return '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;text-align:center;border-radius:12px 12px 0 0">' +
        '<div style="font-size:1.6rem;font-weight:900;color:#fff;letter-spacing:2px"><span style="color:#5EEAD4">Stock</span><span style="color:#2DD4BF">AI</span><span style="color:rgba(255,255,255,.7)">-Pro</span></div>' +
        '<div style="font-size:.7rem;color:#5EEAD4;letter-spacing:3px;margin-top:4px;opacity:.8">INTELLIGENCE A CLICK AWAY</div>' +
        '<h1 style="color:#fff;font-size:1.2rem;margin:16px 0 0;font-weight:700">' + title + '</h1>' +
        (subtitle ? '<p style="color:rgba(255,255,255,.85);margin:6px 0 0;font-size:.88rem">' + subtitle + '</p>' : '') +
        '</div>' +
        '<div style="background:#fff;padding:32px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">';
}

function emailFooter() {
    return '<div style="margin-top:32px;padding-top:24px;border-top:1px solid #e4f1f5;text-align:center">' +
        '<div style="margin-bottom:12px">' +
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
                '<td style="padding:8px 12px;color:#5a8a96;font-size:.82rem;font-weight:600;background:#f0f7f9;width:35%">' + row.label + '</td>' +
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
    var html = emailHeader('🎉 Welcome to StockAI-Pro!', 'Your account is ready') +
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
        emailFooter();
    return sendEmail(data.email, '🎉 Welcome to StockAI-Pro!', html);
}

// ============================================================
// EMAIL 2 — NEW USER INVITE
// ============================================================
function emailNewUserInvite(data) {
    var html = emailHeader('🎉 You\'ve Been Invited!', 'Created by ' + data.invitedBy) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7"><strong>' + data.invitedBy + '</strong> has added you to StockAI-Pro for <strong>' + data.entityName + '</strong>.</p>' +
        emailInfoBox([
            { label: 'Your Name',   value: data.name },
            { label: 'Your Role',   value: data.role },
            { label: 'Entity',      value: data.entityName },
            { label: 'Login Email', value: data.email }
        ]) +
        emailButton('🚀 Set Up My Account', data.inviteLink || EMAIL_CONFIG.appUrl, '#2ea871') +
        emailFooter();
    return sendEmail(data.email, '🎉 You\'ve been invited to StockAI-Pro — ' + data.entityName, html);
}

// ============================================================
// EMAIL 3 — PURCHASE ORDER
// ============================================================
function emailPurchaseOrder(data) {
    var itemRows = (data.items || []).map(function(item) {
        return '<tr><td style="padding:10px;color:#0d4a5c;font-size:.85rem">' + item.name + '</td>' +
            '<td style="padding:10px;text-align:center;color:#0d4a5c;font-size:.85rem">' + item.qty + ' ' + item.unit + '</td>' +
            '<td style="padding:10px;text-align:right;color:#0d4a5c;font-size:.85rem">R' + (item.cost || 0).toFixed(2) + '</td>' +
            '<td style="padding:10px;text-align:right;font-weight:700;color:#0d4a5c;font-size:.85rem">R' + (item.total || 0).toFixed(2) + '</td></tr>';
    }).join('');
    var html = emailHeader('Purchase Order — ' + data.poId, 'From ' + data.entityName) +
        emailInfoBox([
            { label: 'Supplier',   value: data.supplierName },
            { label: 'Deliver To', value: data.entityName },
            { label: 'Order Date', value: new Date(data.createdAt).toLocaleDateString('en-ZA') }
        ]) +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff">Item</th>' +
        '<th style="padding:10px;text-align:center;font-size:.75rem;color:#fff">Qty</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff">Unit Price</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff">Total</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody></table>' +
        emailFooter();
    return sendEmail(data.supplierEmail, 'Purchase Order ' + data.poId + ' — ' + data.entityName, html);
}

// ============================================================
// EMAIL 4 — DAY END REPORT
// ============================================================
function emailDayEndReport(data) {
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';
    var html = emailHeader('📊 Day End Report — ' + data.entityName, data.date + ' • ' + data.submittedBy) +
        emailInfoBox([
            { label: 'Total Sales',      value: 'R' + (data.totalSales || 0).toLocaleString() },
            { label: 'Cash Sales',       value: 'R' + (data.cashSales || 0).toLocaleString() },
            { label: 'Card Sales',       value: 'R' + (data.cardSales || 0).toLocaleString() },
            { label: 'Food Cost Target', value: (data.foodCostTarget || 28) + '%' },
            { label: 'Actual Food Cost', value: '<span style="color:' + fcColor + ';font-weight:700">' + (data.foodCostPercent || 0).toFixed(1) + '%</span>' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(data.recipients || [], '📊 Day End Report — ' + data.entityName + ' — ' + data.date, html);
}

// ============================================================
// EMAIL 5 — STOCK COUNT
// ============================================================
function emailStockCountSubmitted(data) {
    var html = emailHeader('📋 Stock Count Submitted', data.entityName + ' — ' + data.date) +
        emailInfoBox([
            { label: 'Submitted By',        value: data.submittedBy },
            { label: 'Date',                value: data.date },
            { label: 'Total Items',         value: data.totalItems + ' items' },
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
    var html = emailHeader('💳 Payment Due Today', 'Your subscription payment is due') +
        '<p style="color:#0d4a5c">Hi <strong>' + data.ownerName + '</strong>,</p>' +
        '<div style="background:rgba(201,69,69,.06);border:1px solid rgba(201,69,69,.2);border-radius:12px;padding:24px;text-align:center;margin:20px 0">' +
        '<div style="font-size:2.5rem;font-weight:900;color:#c94545">R' + parseInt(data.amount).toLocaleString() + '</div>' +
        '<div style="font-size:.82rem;color:#5a8a96;margin-top:4px">' + data.plan + ' • Due: ' + data.dueDate + '</div></div>' +
        emailButton('Pay Now', EMAIL_CONFIG.portalUrl, '#c94545') +
        emailFooter();
    return sendEmail(data.ownerEmail, '💳 Payment Due Today — StockAI-Pro', html);
}

// ============================================================
// EMAIL 8 — MONTH END REPORT
// ============================================================
function emailMonthEndReport(data) {
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';
    var html = emailHeader('📅 Month End Report — ' + data.entityName, data.month + ' ' + data.year) +
        emailInfoBox([
            { label: 'Opening Stock',   value: 'R' + (data.openingStock || 0).toFixed(2) },
            { label: 'Total Purchases', value: 'R' + (data.totalPurchases || 0).toFixed(2) },
            { label: 'Closing Stock',   value: 'R' + (data.closingStock || 0).toFixed(2) },
            { label: 'Total Sales',     value: 'R' + (data.totalSales || 0).toFixed(2) },
            { label: 'Food Cost %',     value: '<span style="color:' + fcColor + ';font-weight:700">' + (data.foodCostPercent || 0).toFixed(1) + '%</span>' }
        ]) +
        emailButton('View Full Report', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        emailFooter();
    return sendEmail(data.recipients || [], '📅 Month End — ' + data.entityName + ' — ' + data.month + ' ' + data.year, html);
}

// ============================================================
// EMAIL 9 — LATE DELIVERY
// ============================================================
function emailLateDelivery(data) {
    var html = emailHeader('⚠️ Late Delivery Alert', data.supplierName + ' — ' + data.entityName) +
        emailInfoBox([
            { label: 'Supplier',     value: data.supplierName },
            { label: 'PO Number',    value: data.poId },
            { label: 'Order Date',   value: data.orderDate },
            { label: 'Expected',     value: data.expectedDate },
            { label: 'Days Overdue', value: data.daysOverdue + ' day(s)' }
        ]) +
        emailFooter();
    return sendEmail(data.recipients || [], '⚠️ Late Delivery — ' + data.supplierName, html);
}

// ============================================================
// EMAIL 10 — NEW SIGNUP TO ADMIN
// ============================================================
function emailNewSignupNotification(data) {
    var featureList = (data.features || []).map(function(f) {
        return '✅ ' + (FEATURE_MAP[f] || f) + ' — ' + formatR(FEATURE_PRICES[f] || 0) + '/mo';
    }).join('<br>');
    var html = emailHeader('🚀 New Customer Signed Up!', 'New recurring revenue') +
        '<div style="background:rgba(245,158,11,.08);border-radius:10px;padding:20px;margin-bottom:20px;text-align:center;border:1px solid rgba(245,158,11,.2)">' +
        '<div style="font-size:1.5rem;font-weight:900;color:#0d4a5c">' + formatR(data.monthlyTotal || data.price || 0) + '/month</div>' +
        '<div style="font-size:.82rem;color:#5a8a96;margin-top:4px">New recurring revenue</div></div>' +
        emailInfoBox([
            { label: 'Name',          value: data.name || '—' },
            { label: 'Email',         value: data.email || '—' },
            { label: 'Business',      value: data.business || '—' },
            { label: 'Features',      value: featureList || '—' },
            { label: 'Monthly Total', value: formatR(data.monthlyTotal || data.price || 0) + '/mo' },
            { label: 'Payment Ref',   value: data.ref || '—' }
        ]) +
        emailFooter();
    return sendEmail(EMAIL_CONFIG.admin, '🚀 New Signup: ' + (data.name || data.email || 'Unknown'), html);
}

// ============================================================
// EMAIL 11 — QUOTE TO CUSTOMER
// ============================================================
function sendQuoteEmailToCustomer(data) {
    console.log('📧 sendQuoteEmailToCustomer called');

    if (!data || !data.customer || !data.customer.email) {
        console.error('❌ No customer email');
        return Promise.resolve({ ok: false });
    }

    var featureRows = '';
    (data.features || []).forEach(function(f, i) {
        var price = FEATURE_PRICES[f] || 0;
        var name  = FEATURE_MAP[f] || (data.featureLabels && data.featureLabels[i]) || f;
        featureRows +=
            '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">' +
            (f === 'web_boh' ? '🔒 ' : '✅ ') + name + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' +
            formatR(price) + '/mo</td>' +
            '</tr>';
    });

    var html = emailHeader('📋 Your Custom Quotation', 'Thank you for your interest in StockAI-Pro') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Thank you for using our quote builder! Here is your custom quotation.</p>' +
        '<div style="background:#f0f7f9;padding:14px 18px;border-radius:10px;margin-bottom:20px">' +
        '<table style="width:100%"><tr>' +
        '<td><span style="font-size:.72rem;color:#5a8a96;display:block">Quote Ref</span><strong style="color:#0d4a5c">' + (data.quoteRef || '—') + '</strong></td>' +
        '<td style="text-align:right"><span style="font-size:.72rem;color:#5a8a96;display:block">Date</span><strong style="color:#0d4a5c">' + (data.quoteDate || '—') + '</strong></td>' +
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
        '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">📦 Entities (' + (data.entities || 1) + ' × R599/mo)</td>' +
        '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' + formatR(data.entityTotal || 0) + '/mo</td></tr>' +
        '<tr style="background:#e4f1f5"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Monthly Total</td>' +
        '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">' + formatR(data.monthlyTotal || 0) + '/mo</td></tr>' +
        '</table>' +
        (data.onceOffTotal > 0 ?
            '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
            '<tr><td colspan="2" style="background:#d97706;color:#fff;padding:10px 14px;font-weight:700;font-size:.78rem;border-radius:8px 8px 0 0">ONCE-OFF CHARGES (incl. VAT)</td></tr>' +
            (data.techIncluded && data.techHours > 0 ? '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">🔧 Technician Setup (' + data.techHours + ' hrs × R450)</td><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' + formatR(data.techTotal || 0) + '</td></tr>' : '') +
            (data.trainingIncluded ? '<tr><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">📚 Staff Training</td><td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' + formatR(data.trainingTotal || 0) + '</td></tr>' : '') +
            '<tr style="background:#fef3c7"><td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Once-off Total</td>' +
            '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#d97706;text-align:right">' + formatR(data.onceOffTotal) + '</td></tr>' +
            '</table>' : '') +
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;padding:14px 18px;margin-bottom:20px;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">✅ 30-Day Money-Back Guarantee</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">Not satisfied within 30 days? Full refund — no questions asked.</div>' +
        '</div>' +
        emailButton('🚀 Get Started Now', EMAIL_CONFIG.website + '/signup.html', '#f59e0b') +
        '<p style="font-size:.75rem;color:#8aabb5;text-align:center;margin:0">This quotation is valid for 30 days.</p>' +
        emailFooter();

    return sendEmail(data.customer.email, 'Your StockAI-Pro Quotation — ' + (data.quoteRef || ''), html);
}

// ============================================================
// EMAIL 12 — QUOTE NOTIFICATION TO ADMIN
// ============================================================
function sendQuoteNotificationToAdmin(data) {
    console.log('📧 sendQuoteNotificationToAdmin called');

    var featureList = (data.features || []).map(function(f) {
        return '✅ ' + (FEATURE_MAP[f] || f) + ' — ' + formatR(FEATURE_PRICES[f] || 0) + '/mo';
    }).join('<br>');

    var html = emailHeader('📋 New Quote Request', 'A customer requested a quote on the website') +
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

    return sendEmail(EMAIL_CONFIG.admin, '📋 New Quote: ' + (data.customer ? data.customer.business : 'Unknown') + ' — ' + formatR(data.monthlyTotal || 0) + '/mo', html);
}

// ============================================================
// EMAIL 13 — BOOKING CONFIRMATION TO CUSTOMER
// ============================================================
function sendBookingConfirmationToCustomer(booking) {
    console.log('📧 sendBookingConfirmationToCustomer called');
    var dateFormatted = formatDate(booking.date);
    var html = emailHeader('✅ Presentation Confirmed!', 'We look forward to meeting you') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + booking.customer.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Your presentation has been confirmed!</p>' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);border-radius:12px;padding:24px;color:#fff;margin:20px 0;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:800;margin-bottom:6px">' + dateFormatted + '</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#5EEAD4">' + booking.slotLabel + '</div>' +
        '</div>' +
        emailInfoBox([
            { label: 'Booking ID', value: booking.id },
            { label: 'Name',       value: booking.customer.name },
            { label: 'Business',   value: booking.customer.business },
            { label: 'Phone',      value: booking.customer.phone }
        ]) +
        emailFooter();
    return sendEmail(booking.customer.email, '✅ Presentation Confirmed — ' + dateFormatted, html);
}

// ============================================================
// EMAIL 14 — BOOKING NOTIFICATION TO ADMIN
// ============================================================
function sendBookingEmailToAdmin(booking) {
    console.log('📧 sendBookingEmailToAdmin called');
    var dateFormatted = formatDate(booking.date);
    var html = emailHeader('📅 New Presentation Booking!', 'Add this to your calendar') +
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
            { label: 'Email',      value: booking.customer.email }
        ]) +
        emailFooter();
    return sendEmail(EMAIL_CONFIG.admin, '📅 New Booking: ' + booking.customer.business + ' — ' + dateFormatted, html);
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
            '<td style="padding:8px 10px;font-size:.75rem;color:#1a8ba8;font-weight:700;border-bottom:1px solid #e4f1f5">' + formatR(q.monthlyTotal || 0) + '/mo</td>' +
            '</tr>';
    }).join('');
    var html = emailHeader('📊 Daily Quote Analysis', todayQuotes.length + ' quote' + (todayQuotes.length > 1 ? 's' : '') + ' today') +
        '<div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">' +
        '<div style="flex:1;min-width:140px;background:#e4f1f5;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:2rem;font-weight:900;color:#1a8ba8">' + todayQuotes.length + '</div>' +
        '<div style="font-size:.72rem;color:#5a8a96;font-weight:600">Quotes Today</div></div>' +
        '<div style="flex:1;min-width:140px;background:#d1fae5;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:900;color:#065f46">' + formatR(totalMonthly) + '</div>' +
        '<div style="font-size:.72rem;color:#047857;font-weight:600">Monthly Value</div></div>' +
        '<div style="flex:1;min-width:140px;background:#fef3c7;border-radius:10px;padding:16px;text-align:center">' +
        '<div style="font-size:1.2rem;font-weight:900;color:#92400e">' + formatR(totalOnceOff) + '</div>' +
        '<div style="font-size:.72rem;color:#a16207;font-weight:600">Once-off Value</div></div>' +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Ref</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Name</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Business</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Phone</th>' +
        '<th style="padding:10px;text-align:left;font-size:.7rem;color:#fff">Monthly</th>' +
        '</tr></thead><tbody>' + rows + '</tbody></table>' +
        emailFooter();
    return sendEmail(EMAIL_CONFIG.admin, '📊 Daily Quotes: ' + todayQuotes.length + ' — ' + formatR(totalMonthly) + '/mo potential', html);
}

// ============================================================
// AUTO DAILY TRIGGER
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
        });
    }
}

setTimeout(function() {
    if (new Date().getHours() >= 17) {
        checkAndSendDailyAnalysis();
    }
}, 5000);

// ============================================================
// COMPANY DETAILS
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

function generateInvoiceHTML(data) {
    var entities   = data.entities || [];
    var baseExcl   = parseFloat((PRICING.baseFee / (1 + PRICING.vatRate)).toFixed(2));
    var entityExcl = parseFloat((PRICING.entityFee / (1 + PRICING.vatRate)).toFixed(2));
    var lineItems  = '';
    var subtotal   = 0;
    lineItems += '<tr><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c">Platform Fee</td><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;text-align:center">1</td><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;text-align:right">R' + baseExcl.toFixed(2) + '</td><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;text-align:right;font-weight:600">R' + baseExcl.toFixed(2) + '</td></tr>';
    subtotal += baseExcl;
    entities.forEach(function(ent) {
        lineItems += '<tr><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c">Entity — ' + ent.name + '</td><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;text-align:center">1</td><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;text-align:right">R' + entityExcl.toFixed(2) + '</td><td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;text-align:right;font-weight:600">R' + entityExcl.toFixed(2) + '</td></tr>';
        subtotal += entityExcl;
    });
    var vatAmount = parseFloat((subtotal * PRICING.vatRate).toFixed(2));
    var total     = parseFloat((subtotal + vatAmount).toFixed(2));
    return '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff;padding:32px">' +
        '<h1 style="color:#0d4a5c">TAX INVOICE #' + data.invoiceNumber + '</h1>' +
        '<p style="color:#5a8a96">' + data.invoiceDate + ' | Due: ' + data.dueDate + ' | ' + (data.isPaid ? '✅ PAID' : '⏳ DUE') + '</p>' +
        emailInfoBox([
            { label: 'Bill To', value: data.companyName || data.ownerName },
            { label: 'Email',   value: data.ownerEmail || '—' }
        ]) +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px"><thead><tr style="background:#0d4a5c"><th style="padding:12px 16px;text-align:left;color:#fff">Description</th><th style="padding:12px 16px;text-align:center;color:#fff">Qty</th><th style="padding:12px 16px;text-align:right;color:#fff">Unit</th><th style="padding:12px 16px;text-align:right;color:#fff">Amount</th></tr></thead><tbody>' + lineItems + '</tbody></table>' +
        '<div style="text-align:right"><p>Subtotal: R' + subtotal.toFixed(2) + '</p><p>VAT (15%): R' + vatAmount.toFixed(2) + '</p><p style="font-size:1.2rem;font-weight:900;color:#1a8ba8">TOTAL: R' + total.toFixed(2) + '</p></div>' +
        '<p style="font-size:.72rem;color:#8aabb5;margin-top:24px;text-align:center">' + COMPANY_DETAILS.name + ' T/A ' + COMPANY_DETAILS.trading + ' • ' + COMPANY_DETAILS.address + '</p>' +
        '</div>';
}

function emailMonthlyInvoice(data) {
    return sendEmail(data.ownerEmail, '📄 StockAI-Pro Invoice #' + data.invoiceNumber + ' — Due ' + data.dueDate, generateInvoiceHTML(data));
}

function sendDayEndEmails(entityData, accountData, dayEndData) {
    var recipients = [];
    if (accountData.owner && accountData.owner.email) recipients.push(accountData.owner.email);
    if (recipients.length === 0) return Promise.resolve();
    return emailDayEndReport(Object.assign({}, dayEndData, { entityName: entityData.name, recipients: recipients }));
}

function sendStockCountEmails(entityData, accountData, countData) {
    var recipients = [];
    if (accountData.owner && accountData.owner.email) recipients.push(accountData.owner.email);
    if (recipients.length === 0) return Promise.resolve();
    return emailStockCountSubmitted(Object.assign({}, countData, { entityName: entityData.name, recipients: recipients }));
}

function checkAutoInvoice(accountData) {
    if (!accountData || !accountData.owner) return;
    var now = new Date();
    if (now.getDate() !== 26) return;
    var invoiceKey = 'invoice_' + now.getFullYear() + '_' + now.getMonth();
    var billing = accountData.billing || {};
    if (billing.lastInvoiceSent === invoiceKey) return;
    var activeEntities = (accountData.entities || []).filter(function(e) { return e.status !== 'inactive'; });
    if (activeEntities.length === 0) return;
    emailMonthlyInvoice({
        invoiceNumber: 'INV-' + now.getFullYear() + now.getMonth() + '-' + (accountData.owner.email || '').substring(0, 4).toUpperCase(),
        invoiceDate: now.toLocaleDateString('en-ZA'),
        dueDate: new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString('en-ZA'),
        ownerName: accountData.owner.name || 'Customer',
        ownerEmail: accountData.owner.email,
        companyName: accountData.owner.groupName || accountData.owner.name || '',
        entities: activeEntities,
        isPaid: false
    });
    billing.lastInvoiceSent = invoiceKey;
    return billing;
}

function emailEventFeedbackRequest(data) {
    var html = emailHeader('How did we do?', 'Feedback for ' + data.eventName) +
        '<p>Hi ' + data.clientName + ', thank you for hosting your event with us!</p>' +
        emailButton('Rate My Event', 'https://www.stockai-pro.co.za/feedback?id=' + data.id, '#ec4899') +
        emailFooter();
    return sendEmail(data.clientEmail, 'Feedback: ' + data.eventName, html);
}

// ============================================================
// REGISTER ALL FUNCTIONS ON WINDOW OBJECT
// This is the critical part that makes them accessible
// ============================================================
window.sendQuoteEmailToCustomer        = sendQuoteEmailToCustomer;
window.sendQuoteNotificationToAdmin    = sendQuoteNotificationToAdmin;
window.sendBookingConfirmationToCustomer = sendBookingConfirmationToCustomer;
window.sendBookingEmailToAdmin         = sendBookingEmailToAdmin;
window.sendDailyQuoteAnalysis          = sendDailyQuoteAnalysis;
window.checkAndSendDailyAnalysis       = checkAndSendDailyAnalysis;

// ============================================================
// CONFIRM LOADED
// ============================================================
// ============================================================
// EMAIL 16 — UPGRADE CONFIRMATION TO CUSTOMER
// Triggered after successful upgrade payment via Paystack
// ============================================================
function emailUpgradeConfirmation(data) {
    var featureRows = (data.features || []).map(function(f) {
        var price = FEATURE_PRICES[f] || 0;
        var name  = FEATURE_MAP[f]    || f;
        return '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#2a5f70">' +
                '✅ ' + name +
            '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.85rem;' +
                'color:#0d4a5c;text-align:right;font-weight:700">' +
                formatR(price) + '/mo' +
            '</td>' +
        '</tr>';
    }).join('');

    var html = emailHeader(
        '🚀 Upgrade Confirmed!',
        'Your new features are now active on ' + (data.entityName || 'your entity')
    ) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
            'Your upgrade was successful! Your new features are live and ready to use immediately.' +
        '</p>' +

        '<div style="background:linear-gradient(135deg,rgba(46,168,113,.08),rgba(46,168,113,.04));' +
            'border:1px solid rgba(46,168,113,.2);border-radius:12px;padding:20px;margin:20px 0;text-align:center">' +
            '<div style="font-size:.72rem;text-transform:uppercase;letter-spacing:2px;' +
                'color:#5a8a96;font-weight:700;margin-bottom:8px">Entity Upgraded</div>' +
            '<div style="font-size:1.2rem;font-weight:900;color:#0d4a5c">' + (data.entityName || '—') + '</div>' +
        '</div>' +

        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
            '<tr><td colspan="2" style="background:#0d4a5c;color:#fff;padding:10px 14px;' +
                'font-weight:700;font-size:.78rem;letter-spacing:.5px;border-radius:8px 8px 0 0">' +
                'NEW FEATURES ACTIVATED' +
            '</td></tr>' +
            featureRows +
            '<tr style="background:#e4f1f5">' +
                '<td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">Added Monthly Cost</td>' +
                '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">' +
                    '+' + formatR(data.amount || 0) + '/mo' +
                '</td>' +
            '</tr>' +
        '</table>' +

        emailInfoBox([
            { label: 'Payment Reference', value: data.ref   || '—' },
            { label: 'Date',              value: data.date  || '—' },
            { label: 'Amount Charged',    value: formatR(data.amount || 0) + ' (first month)' }
        ]) +

        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;' +
            'padding:14px 18px;margin:20px 0;text-align:center">' +
            '<div style="font-size:.88rem;font-weight:700;color:#065f46">' +
                '✅ Features are live immediately' +
            '</div>' +
            '<div style="font-size:.78rem;color:#047857;margin-top:4px">' +
                'Refresh your app to see your new features.' +
            '</div>' +
        '</div>' +

        emailButton('🚀 Open My App', EMAIL_CONFIG.appUrl, '#2ea871') +
        emailFooter();

    // Send to customer
    sendEmail(
        data.email,
        '🚀 Upgrade Confirmed — ' + (data.entityName || 'Your Entity') + ' — StockAI-Pro',
        html
    );

    // Send notification to admin
    var adminHtml = emailHeader('💰 Customer Upgraded!', 'A customer has purchased additional features') +
        emailInfoBox([
            { label: 'Customer',     value: data.name        || '—' },
            { label: 'Email',        value: data.email       || '—' },
            { label: 'Entity',       value: data.entityName  || '—' },
            { label: 'Features',     value: data.featureNames || '—' },
            { label: 'Amount',       value: formatR(data.amount || 0) + '/mo' },
            { label: 'Payment Ref',  value: data.ref         || '—' },
            { label: 'Date',         value: data.date        || '—' }
        ]) +
        emailFooter();

    sendEmail(
        EMAIL_CONFIG.admin,
        '💰 Upgrade: ' + (data.name || data.email) + ' — +' + formatR(data.amount || 0) + '/mo',
        adminHtml
    );
}
console.log('✅ StockAI-Pro 2.0 Email Templates loaded');
console.log('📧 sendQuoteEmailToCustomer:', typeof window.sendQuoteEmailToCustomer);
console.log('📧 sendQuoteNotificationToAdmin:', typeof window.sendQuoteNotificationToAdmin);
console.log('📧 sendBookingConfirmationToCustomer:', typeof window.sendBookingConfirmationToCustomer);
console.log('📧 sendBookingEmailToAdmin:', typeof window.sendBookingEmailToAdmin);
console.log('📧 sendDailyQuoteAnalysis:', typeof window.sendDailyQuoteAnalysis);
