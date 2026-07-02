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

console.log('✅ StockAI-Pro 2.0 Email Templates loaded');
