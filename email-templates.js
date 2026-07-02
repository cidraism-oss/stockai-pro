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

var VAT_RATE = 0.15;

// ============================================================
// MASTER SEND FUNCTION
// ============================================================
function sendEmail(to, subject, html) {
    if (!to || !subject || !html) {
        console.warn('sendEmail: missing required fields');
        return Promise.resolve();
    }
    var recipients = Array.isArray(to) ? to : [to];
    recipients = recipients.filter(function(email) {
        return email && email.indexOf('@') !== -1;
    });
    if (recipients.length === 0) {
        console.warn('sendEmail: no valid recipients');
        return Promise.resolve();
    }
    return fetch('https://api.resend.com/emails', {
        method:  'POST',
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
            console.log('✅ Email sent to:', recipients.join(', '));
        } else {
            console.warn('⚠️ Email failed:', res.status);
        }
        return res;
    })
    .catch(function(err) {
        console.warn('❌ Email error:', err);
    });
}

// ============================================================
// REUSABLE COMPONENTS
// ============================================================
function emailHeader(title, subtitle) {
    return '<div style="font-family:Poppins,Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);' +
        'padding:32px;text-align:center;border-radius:12px 12px 0 0">' +
        '<h1 style="color:#fff;font-size:1.4rem;margin:0;font-weight:800">' + title + '</h1>' +
        (subtitle ? '<p style="color:rgba(255,255,255,.85);margin:6px 0 0;font-size:.88rem">' +
        subtitle + '</p>' : '') +
        '</div>' +
        '<div style="background:#fff;padding:32px;border:1px solid #e4f1f5;' +
        'border-top:none;border-radius:0 0 12px 12px">';
}

function emailFooter() {
    return '<div style="margin-top:32px;padding-top:24px;' +
        'border-top:1px solid #e4f1f5;text-align:center">' +
        '<div style="display:flex;justify-content:center;gap:16px;margin-bottom:16px;flex-wrap:wrap">' +
        '<a href="' + EMAIL_CONFIG.website + '" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600">🌐 Website</a>' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" style="color:#25D366;text-decoration:none;font-size:.82rem;font-weight:600">💬 WhatsApp</a>' +
        '<a href="mailto:' + EMAIL_CONFIG.support + '" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600">📧 Support</a>' +
        '<a href="tel:' + EMAIL_CONFIG.phone + '" style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600">📞 ' + EMAIL_CONFIG.phone + '</a>' +
        '</div>' +
        '<p style="color:#8aabb5;font-size:.75rem;margin:0">© 2025 StockAI-Pro. Built with ❤️ in South Africa.</p>' +
        '</div></div></div>';
}

function emailInfoBox(rows) {
    return '<table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;margin:16px 0">' +
        rows.map(function(row) {
            return '<tr><td style="padding:8px 12px;color:#5a8a96;font-size:.82rem;font-weight:600;background:#f0f7f9;white-space:nowrap">' +
                row.label + '</td>' +
                '<td style="padding:8px 12px;color:#0d4a5c;font-size:.88rem;font-weight:600">' +
                row.value + '</td></tr>';
        }).join('') +
        '</table>';
}

function emailButton(text, url, color) {
    color = color || '#1a8ba8';
    return '<div style="text-align:center;margin:20px 0">' +
        '<a href="' + url + '" style="display:inline-block;padding:14px 32px;background:' + color + ';' +
        'color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:.95rem">' +
        text + '</a></div>';
}

// ============================================================
// EMAIL 1 — WELCOME EMAIL
// ============================================================
function emailWelcome(data) {
    var html = emailHeader('🎉 Welcome to StockAI-Pro!', 'Your AI-powered stock management system is ready') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">Your StockAI-Pro account has been created and is ready to use!</p>' +
        emailInfoBox([
            { label: 'Login Email',   value: data.email },
            { label: 'Plan',          value: data.plan },
            { label: 'Monthly Rate',  value: 'R' + data.price + '/month' },
            { label: 'First Entity',  value: data.entityName },
            { label: 'Next Payment',  value: data.nextDue }
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
    // data = { name, email, role, entityName, inviteLink, invitedBy }
    var html = emailHeader('🎉 You\'ve Been Invited to StockAI-Pro!',
        'Your account has been created by ' + data.invitedBy) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
        '<strong>' + data.invitedBy + '</strong> has added you to StockAI-Pro for ' +
        '<strong>' + data.entityName + '</strong>.</p>' +
        emailInfoBox([
            { label: 'Your Name',  value: data.name },
            { label: 'Your Role',  value: data.role },
            { label: 'Entity',     value: data.entityName },
            { label: 'Login Email', value: data.email }
        ]) +
        '<div style="background:rgba(26,139,168,.08);border-left:3px solid #1a8ba8;' +
        'padding:16px;border-radius:8px;margin:20px 0">' +
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

    var html = '<div style="font-family:Poppins,Arial,sans-serif;max-width:650px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px 32px;border-radius:12px 12px 0 0">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">' +
        '<div><h1 style="color:#fff;font-size:1.4rem;margin:0;font-weight:800">Purchase Order</h1>' +
        '<p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:.85rem">StockAI-Pro</p></div>' +
        '<div style="background:rgba(255,255,255,.15);padding:10px 18px;border-radius:8px;text-align:right">' +
        '<div style="color:#fff;font-weight:800;font-size:1rem">' + data.poId + '</div>' +
        '<div style="color:rgba(255,255,255,.7);font-size:.75rem">' + new Date(data.createdAt).toLocaleDateString('en-ZA') + '</div>' +
        '</div></div></div>' +
        '<div style="background:#fff;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e4f1f5">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:6px">Supplier</div>' +
        '<div style="font-weight:700;color:#0d4a5c;font-size:.92rem">' + data.supplierName + '</div></div>' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:6px">Deliver To</div>' +
        '<div style="font-weight:700;color:#0d4a5c;font-size:.92rem">' + data.entityName + '</div>' +
        (data.entityAddress ? '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' + data.entityAddress + '</div>' : '') +
        '</div></div>' +
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff;text-transform:uppercase">Item</th>' +
        '<th style="padding:10px;text-align:center;font-size:.75rem;color:#fff;text-transform:uppercase">Quantity</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff;text-transform:uppercase">Unit Price</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff;text-transform:uppercase">Total</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody>' +
        '<tfoot><tr style="background:#f0f7f9">' +
        '<td colspan="3" style="padding:12px 10px;font-weight:700;color:#0d4a5c;text-align:right">EXCL. VAT:</td>' +
        '<td style="padding:12px 10px;font-weight:700;color:#0d4a5c;text-align:right">R' + (data.total || 0).toFixed(2) + '</td>' +
        '</tr><tr style="background:#f0f7f9">' +
        '<td colspan="3" style="padding:4px 10px;color:#5a8a96;text-align:right">VAT (15%):</td>' +
        '<td style="padding:4px 10px;color:#5a8a96;text-align:right">R' + ((data.total || 0) * VAT_RATE).toFixed(2) + '</td>' +
        '</tr><tr style="background:#e8f4f7">' +
        '<td colspan="3" style="padding:12px 10px;font-weight:900;color:#1a8ba8;text-align:right;font-size:1rem">TOTAL INCL. VAT:</td>' +
        '<td style="padding:12px 10px;font-weight:900;color:#1a8ba8;text-align:right;font-size:1.1rem">R' + ((data.total || 0) * 1.15).toFixed(2) + '</td>' +
        '</tr></tfoot></table>' +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px 16px;border-radius:8px;margin-bottom:20px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0"><strong>Order Details:</strong><br>' +
        'Ordered by: ' + (data.createdBy || 'Procurement') + '<br>' +
        'Order Date: ' + new Date(data.createdAt).toLocaleDateString('en-ZA') + '<br>' +
        'Deliver to: ' + data.entityName +
        (data.entityAddress ? '<br>Address: ' + data.entityAddress : '') + '</p></div>' +
        '<div style="text-align:center;padding-top:16px;border-top:1px solid #e4f1f5">' +
        '<p style="color:#8aabb5;font-size:.78rem">Generated by StockAI-Pro • ' +
        EMAIL_CONFIG.support + ' • ' + EMAIL_CONFIG.phone + '</p></div></div></div>';

    return sendEmail(data.supplierEmail, 'Purchase Order ' + data.poId + ' — ' + data.entityName, html);
}

// ============================================================
// EMAIL 4 — DAY END REPORT
// ============================================================
function emailDayEndReport(data) {
    var varianceColor = Math.abs(data.variance || 0) > 100 ? '#c94545' : '#2ea871';
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';

    var html = emailHeader('📊 Day End Report — ' + data.entityName,
        data.date + ' • Submitted by ' + data.submittedBy) +
        '<h3 style="color:#0d4a5c;font-size:.95rem;margin:0 0 12px">💰 Sales Summary (Excl. VAT)</h3>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;border-left:3px solid #1a8ba8">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:4px">Total Sales (Excl. VAT)</div>' +
        '<div style="font-size:1.4rem;font-weight:900;color:#0d4a5c">R' + (data.totalSales || 0).toLocaleString() + '</div></div>' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;border-left:3px solid ' + fcColor + '">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:4px">Food Cost %</div>' +
        '<div style="font-size:1.4rem;font-weight:900;color:' + fcColor + '">' + (data.foodCostPercent || 0).toFixed(1) + '%</div></div>' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;border-left:3px solid #2ea871">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:4px">Cash Sales</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">R' + (data.cashSales || 0).toLocaleString() + '</div></div>' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px;border-left:3px solid #2b8eb3">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;text-transform:uppercase;margin-bottom:4px">Card Sales</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">R' + (data.cardSales || 0).toLocaleString() + '</div></div>' +
        '</div>' +
        emailInfoBox([
            { label: 'Pax Served',       value: data.pax || '0' },
            { label: 'Avg Spend/Person', value: 'R' + (data.avgSpend || 0).toFixed(2) },
            { label: 'Promotions',       value: 'R' + (data.promotions || 0).toFixed(2) },
            { label: 'Discounts',        value: 'R' + (data.discounts || 0).toFixed(2) },
            { label: 'Purchases',        value: 'R' + (data.purchases || 0).toFixed(2) },
            { label: 'Food Cost Target', value: (data.foodCostTarget || 28) + '%' },
            { label: 'Actual Food Cost', value: '<span style="color:' + fcColor + ';font-weight:700">' + (data.foodCostPercent || 0).toFixed(1) + '%</span>' }
        ]) +
        (data.topSellers && data.topSellers.length > 0 ?
            '<h3 style="color:#0d4a5c;font-size:.95rem;margin:20px 0 12px">🏆 Top Sellers</h3>' +
            data.topSellers.map(function(s, i) {
                return '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e4f1f5;font-size:.85rem">' +
                    '<span>' + (i + 1) + '. ' + s.name + '</span><strong>' + s.qty + ' sold</strong></div>';
            }).join('') : '') +
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
        '<div style="background:linear-gradient(135deg,rgba(201,69,69,.06),rgba(201,69,69,.02));border:1px solid rgba(201,69,69,.2);border-radius:12px;padding:24px;text-align:center;margin:20px 0">' +
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
            { label: 'Month',              value: data.month + ' ' + data.year },
            { label: 'Opening Stock',      value: 'R' + (data.openingStock || 0).toFixed(2) },
            { label: 'Total Purchases',    value: 'R' + (data.totalPurchases || 0).toFixed(2) },
            { label: 'Closing Stock',      value: 'R' + (data.closingStock || 0).toFixed(2) },
            { label: 'Total Sales',        value: 'R' + (data.totalSales || 0).toFixed(2) },
            { label: 'Total Wastage',      value: 'R' + (data.totalWastage || 0).toFixed(2) },
            { label: 'Food Cost %',        value: '<span style="color:' + fcColor + ';font-weight:700">' + (data.foodCostPercent || 0).toFixed(1) + '%</span>' },
            { label: 'Food Cost Target',   value: (data.foodCostTarget || 28) + '%' }
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
            { label: 'Supplier',       value: data.supplierName },
            { label: 'PO Number',      value: data.poId },
            { label: 'Order Date',     value: data.orderDate },
            { label: 'Expected',       value: data.expectedDate },
            { label: 'Days Overdue',   value: data.daysOverdue + ' day(s)' }
        ]) +
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px 16px;border-radius:8px;margin-top:16px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">Please contact ' + data.supplierName +
        ' immediately to follow up on this delivery.</p></div>' +
        emailFooter();
    return sendEmail(data.recipients || [], '⚠️ Late Delivery — ' + data.supplierName + ' — ' + data.poId, html);
}

// ============================================================
// EMAIL 10 — NEW SIGNUP NOTIFICATION (To Admin)
// ============================================================
function emailNewSignupNotification(data) {
    var html = emailHeader('🚀 New Customer Signed Up!', 'A new customer has joined StockAI-Pro') +
        '<div style="background:linear-gradient(135deg,rgba(245,158,11,.08),rgba(13,74,92,.04));border-radius:10px;padding:20px;margin-bottom:20px;border:1px solid rgba(245,158,11,.2)">' +
        '<div style="font-size:2rem;text-align:center;margin-bottom:8px">💰</div>' +
        '<div style="text-align:center;font-size:1.3rem;font-weight:900;color:#0d4a5c">R' + parseInt(data.price).toLocaleString() + '/month</div>' +
        '<div style="text-align:center;font-size:.82rem;color:#5a8a96;margin-top:4px">New recurring revenue</div></div>' +
        emailInfoBox([
            { label: 'Name',     value: data.name },
            { label: 'Email',    value: data.email },
            { label: 'Phone',    value: data.phone },
            { label: 'Business', value: data.business },
            { label: 'Type',     value: data.type },
            { label: 'Plan',     value: data.plan },
            { label: 'Value',    value: 'R' + parseInt(data.price).toLocaleString() + '/mo' }
        ]) +
        emailFooter();
    return sendEmail(EMAIL_CONFIG.admin,
        '🚀 New Signup: ' + data.name + ' — ' + data.plan + ' (R' + parseInt(data.price).toLocaleString() + '/mo)',
        html);
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
        if (u.email && (u.role === 'General Manager' || u.role === 'Area Manager' || u.role === 'Operations Manager')) {
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
// EMAIL — MONTHLY INVOICE
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
    baseFee:    799,    // Incl. VAT
    entityFee:  599,    // Incl. VAT per entity
    vatRate:    0.15
};

function generateInvoiceHTML(data) {
    // data = {
    //   invoiceNumber, invoiceDate, dueDate,
    //   ownerName, ownerEmail, ownerPhone,
    //   companyName, companyAddress, companyVat,
    //   entities: [{ name, id }],
    //   isPaid
    // }

    var entities  = data.entities || [];
    var baseFee   = PRICING.baseFee;
    var entityFee = PRICING.entityFee;

    // Calculate excl. VAT amounts
    var baseExcl   = parseFloat((baseFee / (1 + PRICING.vatRate)).toFixed(2));
    var entityExcl = parseFloat((entityFee / (1 + PRICING.vatRate)).toFixed(2));

    var lineItems = '';
    var subtotal  = 0;

    // Base platform fee
    lineItems += '<tr>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c">StockAI-Pro Platform Fee — Monthly Access</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:center">1</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right">R' + baseExcl.toFixed(2) + '</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:600">R' + baseExcl.toFixed(2) + '</td>' +
        '</tr>';
    subtotal += baseExcl;

    // Per entity fees
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

    var html = '<div style="font-family:Poppins,Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff">' +

        // Header
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px;border-radius:12px 12px 0 0">' +
        '<div>' +
        '<h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0;letter-spacing:1px">STOCKAI-PRO</h1>' +
        '<p style="color:rgba(255,255,255,.7);font-size:.78rem;margin:4px 0 0">Intelligence a click away</p>' +
        '</div>' +
        '<div style="text-align:right">' +
        '<div style="background:rgba(255,255,255,.15);padding:12px 20px;border-radius:8px">' +
        '<div style="color:#fff;font-size:1.4rem;font-weight:900;letter-spacing:2px">TAX INVOICE</div>' +
        '<div style="color:rgba(255,255,255,.8);font-size:.78rem;margin-top:4px">#' + data.invoiceNumber + '</div>' +
        '</div></div></div>' +

        // Body
        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none">' +

        // From / To
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:30px">' +
        // From
        '<div>' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-bottom:8px">From</div>' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c">' + COMPANY_DETAILS.name + '</div>' +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:2px">T/A ' + COMPANY_DETAILS.trading + '</div>' +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:6px;line-height:1.6">' +
        COMPANY_DETAILS.address + '<br>' +
        '<i class="fas fa-phone" style="font-size:.65rem"></i> ' + COMPANY_DETAILS.phone + '<br>' +
        '<i class="fas fa-envelope" style="font-size:.65rem"></i> ' + COMPANY_DETAILS.email + '<br>' +
        '<i class="fas fa-globe" style="font-size:.65rem"></i> ' + COMPANY_DETAILS.website +
        '</div></div>' +
        // To
        '<div>' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-bottom:8px">Bill To</div>' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c">' + (data.companyName || data.ownerName) + '</div>' +
        (data.companyAddress ? '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px;line-height:1.6">' + data.companyAddress + '</div>' : '') +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' + (data.ownerEmail || '') + '</div>' +
        (data.ownerPhone ? '<div style="font-size:.78rem;color:#5a8a96">' + data.ownerPhone + '</div>' : '') +
        (data.companyVat ? '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">VAT: ' + data.companyVat + '</div>' : '') +
        '</div></div>' +

        // Invoice details
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:24px;padding:14px;background:#f0f7f9;border-radius:8px">' +
        '<div><div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">Invoice Date</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:#0d4a5c">' + data.invoiceDate + '</div></div>' +
        '<div><div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">Due Date</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:' + (data.isPaid ? '#2ea871' : '#c94545') + '">' + data.dueDate + '</div></div>' +
        '<div><div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">Status</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:' + (data.isPaid ? '#2ea871' : '#c94545') + '">' + (data.isPaid ? '✅ PAID' : '⏳ DUE') + '</div></div></div>' +

        // Line items table
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:12px 16px;text-align:left;font-size:.72rem;color:#fff;text-transform:uppercase;font-weight:600;letter-spacing:.5px">Description</th>' +
        '<th style="padding:12px 16px;text-align:center;font-size:.72rem;color:#fff;text-transform:uppercase;font-weight:600">Qty</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff;text-transform:uppercase;font-weight:600">Unit Price</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff;text-transform:uppercase;font-weight:600">Amount</th>' +
        '</tr></thead><tbody>' + lineItems + '</tbody></table>' +

        // Totals
        '<div style="display:flex;justify-content:flex-end">' +
        '<div style="width:280px">' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:.88rem;color:#5a8a96">' +
        '<span>Subtotal (excl. VAT)</span><strong style="color:#0d4a5c">R' + subtotal.toFixed(2) + '</strong></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:.88rem;color:#5a8a96;border-bottom:1px solid #e4f1f5">' +
        '<span>VAT (15%)</span><strong style="color:#0d4a5c">R' + vatAmount.toFixed(2) + '</strong></div>' +
        '<div style="display:flex;justify-content:space-between;padding:14px 0;font-size:1.1rem;font-weight:900;color:#1a8ba8">' +
        '<span>TOTAL (incl. VAT)</span><strong>R' + total.toFixed(2) + '</strong></div>' +
        '</div></div>' +

        // Payment note
        '<div style="margin-top:24px;padding:16px;background:#fff8e1;border-left:3px solid #f59e0b;border-radius:8px;font-size:.82rem;color:#5a4a17">' +
        '<strong>Payment Methods:</strong><br>' +
        '• EFT / Bank Transfer<br>' +
        '• Card Payment via Customer Portal<br>' +
        '• WhatsApp: ' + COMPANY_DETAILS.phone + '<br><br>' +
        '<strong>Payment Reference:</strong> ' + data.invoiceNumber +
        '</div>' +

        // Footer
        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4f1f5;text-align:center">' +
        '<p style="font-size:.72rem;color:#8aabb5">' + COMPANY_DETAILS.name + ' T/A ' + COMPANY_DETAILS.trading + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5">' + COMPANY_DETAILS.address + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5">' + COMPANY_DETAILS.phone + ' • ' + COMPANY_DETAILS.email + ' • ' + COMPANY_DETAILS.website + '</p>' +
        '</div>' +

        '</div></div>';

    return html;
}

function emailMonthlyInvoice(data) {
    var html = generateInvoiceHTML(data);
    return sendEmail(
        data.ownerEmail,
        '📄 StockAI-Pro Tax Invoice #' + data.invoiceNumber + ' — Due ' + data.dueDate,
        html
    );
}

// ============================================================
// CONSOLIDATED STATEMENT
// ============================================================
function generateStatementHTML(data) {
    // data = { ownerName, companyName, companyAddress, companyVat,
    //          ownerEmail, ownerPhone, dateFrom, dateTo,
    //          invoices: [{ invoiceNumber, date, dueDate, total, isPaid }] }

    var invoiceRows = (data.invoices || []).map(function(inv) {
        return '<tr>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.82rem;color:#0d4a5c">' + inv.invoiceNumber + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.82rem;color:#0d4a5c">' + inv.date + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.82rem;color:#0d4a5c">' + inv.dueDate + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;font-size:.82rem;color:#0d4a5c;text-align:right;font-weight:600">R' + inv.total.toFixed(2) + '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;text-align:center">' +
            '<span style="padding:3px 10px;border-radius:12px;font-size:.68rem;font-weight:600;' +
            'background:' + (inv.isPaid ? 'rgba(46,168,113,.12)' : 'rgba(201,69,69,.12)') + ';' +
            'color:' + (inv.isPaid ? '#2ea871' : '#c94545') + '">' +
            (inv.isPaid ? 'Paid' : 'Outstanding') + '</span></td></tr>';
    }).join('');

    var totalOutstanding = (data.invoices || []).filter(function(i) { return !i.isPaid; })
        .reduce(function(s, i) { return s + i.total; }, 0);
    var totalPaid = (data.invoices || []).filter(function(i) { return i.isPaid; })
        .reduce(function(s, i) { return s + i.total; }, 0);

    return '<div style="font-family:Poppins,Arial,sans-serif;max-width:700px;margin:0 auto;background:#fff">' +
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;border-radius:12px 12px 0 0;display:flex;justify-content:space-between;align-items:flex-start">' +
        '<div><h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0">STOCKAI-PRO</h1>' +
        '<p style="color:rgba(255,255,255,.7);font-size:.78rem;margin:4px 0 0">Intelligence a click away</p></div>' +
        '<div style="background:rgba(255,255,255,.15);padding:12px 20px;border-radius:8px;text-align:right">' +
        '<div style="color:#fff;font-size:1.2rem;font-weight:900;letter-spacing:2px">STATEMENT</div>' +
        '<div style="color:rgba(255,255,255,.8);font-size:.75rem;margin-top:4px">' + data.dateFrom + ' — ' + data.dateTo + '</div>' +
        '</div></div>' +
        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none;border-radius:0 0 12px 12px">' +

        // Client details
        '<div style="margin-bottom:24px">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;font-weight:700;letter-spacing:1px;margin-bottom:6px">Statement For</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#0d4a5c">' + (data.companyName || data.ownerName) + '</div>' +
        '</div>' +

        // Summary
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:24px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;border-left:3px solid #1a8ba8">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">Total Invoiced</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">R' + (totalPaid + totalOutstanding).toFixed(2) + '</div></div>' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;border-left:3px solid #2ea871">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">Total Paid</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#2ea871">R' + totalPaid.toFixed(2) + '</div></div>' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;border-left:3px solid #c94545">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;font-weight:600">Outstanding</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#c94545">R' + totalOutstanding.toFixed(2) + '</div></div></div>' +

        // Invoice table
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff;text-transform:uppercase">Invoice #</th>' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff;text-transform:uppercase">Date</th>' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff;text-transform:uppercase">Due Date</th>' +
        '<th style="padding:10px 14px;text-align:right;font-size:.7rem;color:#fff;text-transform:uppercase">Amount</th>' +
        '<th style="padding:10px 14px;text-align:center;font-size:.7rem;color:#fff;text-transform:uppercase">Status</th>' +
        '</tr></thead><tbody>' + invoiceRows + '</tbody></table>' +

        // Company footer
        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4f1f5;text-align:center">' +
        '<p style="font-size:.72rem;color:#8aabb5">' + COMPANY_DETAILS.name + ' T/A ' + COMPANY_DETAILS.trading + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5">' + COMPANY_DETAILS.address + '</p>' +
        '</div></div></div>';
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

    // Only on the 26th
    if (day !== 26) return;

    // Check if already sent this month
    var invoiceKey = 'invoice_' + year + '_' + month;
    var billing    = accountData.billing || {};
    if (billing.lastInvoiceSent === invoiceKey) return;

    var entities = accountData.entities || [];
    var activeEntities = entities.filter(function(e) { return e.status !== 'inactive'; });

    if (activeEntities.length === 0) return;

    // Calculate last day of current month
    var lastDay = new Date(year, month + 1, 0).getDate();

    var invoiceNumber = 'INV-' + year + (month + 1 < 10 ? '0' : '') + (month + 1) + '-' +
        (accountData.owner.email || '').replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase();

    var invoiceDate = now.toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' });
    var dueDate     = new Date(year, month, lastDay).toLocaleDateString('en-ZA', { day:'numeric', month:'long', year:'numeric' });

    emailMonthlyInvoice({
        invoiceNumber: invoiceNumber,
        invoiceDate:   invoiceDate,
        dueDate:       dueDate,
        ownerName:     accountData.owner.name || 'Customer',
        ownerEmail:    accountData.owner.email,
        ownerPhone:    accountData.owner.phone || '',
        companyName:   accountData.owner.groupName || accountData.owner.name || '',
        companyAddress: accountData.owner.groupAddress || '',
        companyVat:    accountData.owner.groupVat || '',
        entities:      activeEntities,
        isPaid:        false
    });

    // Mark as sent
    billing.lastInvoiceSent = invoiceKey;
    return billing;
}

console.log('✅ StockAI-Pro 2.0 Email Templates loaded');
