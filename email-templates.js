// ============================================================
// StockAI-Pro 2.0 — Email Templates
// All automated emails sent across all apps
// Routes through Cloudflare Worker proxy to avoid CORS
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

var VAT_RATE = 0.15;

// ============================================================
// MASTER SEND FUNCTION — Routes through Cloudflare Worker
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

// ============================================================
// REUSABLE COMPONENTS
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
        'style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;' +
        'margin:0 8px">Website</a>' +
        '<a href="' + EMAIL_CONFIG.whatsapp + '" ' +
        'style="color:#25D366;text-decoration:none;font-size:.82rem;font-weight:600;' +
        'margin:0 8px">WhatsApp</a>' +
        '<a href="mailto:' + EMAIL_CONFIG.support + '" ' +
        'style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;' +
        'margin:0 8px">Support</a>' +
        '<a href="tel:' + EMAIL_CONFIG.phone.replace(/\s/g,'') + '" ' +
        'style="color:#1a8ba8;text-decoration:none;font-size:.82rem;font-weight:600;' +
        'margin:0 8px">' + EMAIL_CONFIG.phone + '</a>' +
        '</div>' +
        '<p style="color:#8aabb5;font-size:.75rem;margin:0">' +
        '&copy; 2025 StockAI-Pro. Built with love in South Africa.</p>' +
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
// EMAIL 1 — WELCOME EMAIL
// ============================================================
function emailWelcome(data) {
    var html = emailHeader('Welcome to StockAI-Pro!',
        'Your AI-powered stock management system is ready') +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' + data.name + '</strong>,</p>' +
        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
        'Your StockAI-Pro account has been created and is ready to use!</p>' +
        emailInfoBox([
            { label: 'Login Email',  value: data.email },
            { label: 'Plan',         value: data.plan },
            { label: 'Monthly Rate', value: 'R' + data.price + '/month' },
            { label: 'First Entity', value: data.entityName },
            { label: 'Next Payment', value: data.nextDue }
        ]) +
        emailButton('Open StockAI-Pro', EMAIL_CONFIG.appUrl, '#1a8ba8') +
        '<div style="background:#f0f7f9;border-radius:10px;padding:18px;margin:20px 0">' +
        '<h4 style="color:#0d4a5c;font-size:.88rem;margin-bottom:10px">Getting Started:</h4>' +
        '<ol style="color:#5a8a96;font-size:.85rem;line-height:1.8;padding-left:18px;margin:0">' +
        '<li>Log in with your email address</li>' +
        '<li>Add your suppliers first</li>' +
        '<li>Create your stock items and link suppliers</li>' +
        '<li>Set up your menu items</li>' +
        '<li>Run your first stock count using voice!</li>' +
        '</ol></div>' +
        emailFooter();
    return sendEmail(data.email, 'Welcome to StockAI-Pro — Your Account is Ready!', html);
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
        return '<tr style="border-bottom:1px solid #e4f1f5">' +
            '<td style="padding:10px;color:#0d4a5c;font-size:.85rem">' +
            item.name + '</td>' +
            '<td style="padding:10px;text-align:center;color:#0d4a5c;font-size:.85rem">' +
            item.qty + ' ' + item.unit + '</td>' +
            '<td style="padding:10px;text-align:right;color:#0d4a5c;font-size:.85rem">' +
            'R' + (item.cost || 0).toFixed(2) + '</td>' +
            '<td style="padding:10px;text-align:right;font-weight:700;color:#0d4a5c;font-size:.85rem">' +
            'R' + (item.total || 0).toFixed(2) + '</td>' +
            '</tr>';
    }).join('');

    var poDate = '';
    try {
        poDate = new Date(data.createdAt).toLocaleDateString('en-ZA');
    } catch(e) {
        poDate = data.createdAt || '';
    }

    var html =
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto">' +

        // Header
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:28px 32px;' +
        'border-radius:12px 12px 0 0">' +
        '<table style="width:100%"><tr>' +
        '<td><h1 style="color:#fff;font-size:1.4rem;margin:0;font-weight:800">Purchase Order</h1>' +
        '<p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:.85rem">StockAI-Pro</p></td>' +
        '<td style="text-align:right">' +
        '<div style="background:rgba(255,255,255,.15);padding:10px 18px;border-radius:8px">' +
        '<div style="color:#fff;font-weight:800;font-size:1rem">' + data.poId + '</div>' +
        '<div style="color:rgba(255,255,255,.7);font-size:.75rem">' + poDate + '</div>' +
        '</div></td>' +
        '</tr></table></div>' +

        // Body
        '<div style="background:#fff;padding:28px 32px;border-radius:0 0 12px 12px;' +
        'border:1px solid #e4f1f5">' +

        // Supplier / Deliver to
        '<table style="width:100%;margin-bottom:24px"><tr>' +
        '<td style="width:50%;padding-right:8px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:6px">Supplier</div>' +
        '<div style="font-weight:700;color:#0d4a5c;font-size:.92rem">' +
        data.supplierName + '</div></div></td>' +
        '<td style="width:50%;padding-left:8px">' +
        '<div style="background:#f0f7f9;border-radius:8px;padding:14px">' +
        '<div style="font-size:.68rem;color:#5a8a96;font-weight:700;' +
        'text-transform:uppercase;margin-bottom:6px">Deliver To</div>' +
        '<div style="font-weight:700;color:#0d4a5c;font-size:.92rem">' +
        data.entityName + '</div>' +
        (data.entityAddress ?
            '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' +
            data.entityAddress + '</div>'
        : '') +
        '</div></td>' +
        '</tr></table>' +

        // Items table
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px;text-align:left;font-size:.75rem;color:#fff;' +
        'text-transform:uppercase">Item</th>' +
        '<th style="padding:10px;text-align:center;font-size:.75rem;color:#fff;' +
        'text-transform:uppercase">Quantity</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff;' +
        'text-transform:uppercase">Unit Price</th>' +
        '<th style="padding:10px;text-align:right;font-size:.75rem;color:#fff;' +
        'text-transform:uppercase">Total</th>' +
        '</tr></thead><tbody>' + itemRows + '</tbody>' +
        '<tfoot>' +
        '<tr style="background:#f0f7f9">' +
        '<td colspan="3" style="padding:12px 10px;font-weight:700;color:#0d4a5c;' +
        'text-align:right">EXCL. VAT:</td>' +
        '<td style="padding:12px 10px;font-weight:700;color:#0d4a5c;text-align:right">' +
        'R' + (data.total || 0).toFixed(2) + '</td></tr>' +
        '<tr style="background:#f0f7f9">' +
        '<td colspan="3" style="padding:4px 10px;color:#5a8a96;text-align:right">' +
        'VAT (15%):</td>' +
        '<td style="padding:4px 10px;color:#5a8a96;text-align:right">' +
        'R' + ((data.total || 0) * VAT_RATE).toFixed(2) + '</td></tr>' +
        '<tr style="background:#e8f4f7">' +
        '<td colspan="3" style="padding:12px 10px;font-weight:900;color:#1a8ba8;' +
        'text-align:right;font-size:1rem">TOTAL INCL. VAT:</td>' +
        '<td style="padding:12px 10px;font-weight:900;color:#1a8ba8;' +
        'text-align:right;font-size:1.1rem">' +
        'R' + ((data.total || 0) * 1.15).toFixed(2) + '</td></tr>' +
        '</tfoot></table>' +

        // Order details
        '<div style="background:#fff8e1;border-left:3px solid #f59e0b;padding:14px 16px;' +
        'border-radius:8px;margin-bottom:20px">' +
        '<p style="color:#5a4a17;font-size:.85rem;margin:0">' +
        '<strong>Order Details:</strong><br>' +
        'Ordered by: ' + (data.createdBy || 'Procurement') + '<br>' +
        'Order Date: ' + poDate + '<br>' +
        'Deliver to: ' + data.entityName +
        (data.entityAddress ? '<br>Address: ' + data.entityAddress : '') +
        '</p></div>' +

        // Footer
        '<div style="text-align:center;padding-top:16px;border-top:1px solid #e4f1f5">' +
        '<p style="color:#8aabb5;font-size:.78rem">Generated by StockAI-Pro &bull; ' +
        EMAIL_CONFIG.support + ' &bull; ' + EMAIL_CONFIG.phone + '</p>' +
        '</div></div></div>';

    return sendEmail(
        data.supplierEmail,
        'Purchase Order ' + data.poId + ' — ' + data.entityName,
        html
    );
}

// ============================================================
// EMAIL 4 — DAY END REPORT
// ============================================================
function emailDayEndReport(data) {
    var varianceColor = Math.abs(data.variance || 0) > 100 ? '#c94545' : '#2ea871';
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';

    var html = emailHeader('Day End Report — ' + data.entityName,
        data.date + ' &bull; Submitted by ' + data.submittedBy) +

        '<h3 style="color:#0d4a5c;font-size:.95rem;margin:0 0 12px">' +
        'Sales Summary (Excl. VAT)</h3>' +

        // Stats grid — using table for email client compatibility
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
            { label: 'Pax Served',        value: data.pax || '0' },
            { label: 'Avg Spend/Person',  value: 'R' + (data.avgSpend || 0).toFixed(2) },
            { label: 'Promotions',        value: 'R' + (data.promotions || 0).toFixed(2) },
            { label: 'Discounts',         value: 'R' + (data.discounts || 0).toFixed(2) },
            { label: 'Purchases',         value: 'R' + (data.purchases || 0).toFixed(2) },
            { label: 'Food Cost Target',  value: (data.foodCostTarget || 28) + '%' },
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
            { label: 'Date',          value: data.date },
            { label: 'Submitted By',  value: data.submittedBy },
            { label: 'Total Wastage',
              value: '<span style="color:#c94545;font-weight:700">R' +
                     (data.totalValue || 0).toFixed(2) + '</span>' },
            { label: 'Items Wasted',  value: (data.items || []).length + ' items' }
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
    var fcColor = (data.foodCostPercent || 0) > (data.foodCostTarget || 28) ? '#c94545' : '#2ea871';
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
            { label: 'Value',    value: 'R' + parseInt(data.price, 10).toLocaleString('en-ZA') + '/mo' }
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
// EMAIL 16 — UPGRADE CONFIRMATION TO CUSTOMER + ADMIN NOTIFY
// Triggered after successful upgrade payment via Paystack
// data = {
//   name, email, entityName,
//   features: ['feature_key',...],
//   featureNames: 'Feature A, Feature B',
//   amount, ref, date
// }
// ============================================================
function emailUpgradeConfirmation(data) {

    // Feature price & name lookups — uses email-templates config
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
            'font-size:.85rem;color:#2a5f70">' +
            'Active: ' + name +
            '</td>' +
            '<td style="padding:10px 14px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:700">' +
            'R' + price.toLocaleString('en-ZA') + '.00/mo' +
            '</td>' +
            '</tr>';
    }).join('');

    // ── Customer Email ──
    var html = emailHeader(
        'Upgrade Confirmed!',
        'Your new features are now active on ' + (data.entityName || 'your entity')
    ) +
        '<p style="color:#0d4a5c;font-size:1rem">Hi <strong>' +
        (data.name || 'there') + '</strong>,</p>' +

        '<p style="color:#5a8a96;margin-top:8px;line-height:1.7">' +
        'Your upgrade was successful! Your new features are live and ready to use immediately.' +
        '</p>' +

        // Entity box
        '<div style="background:rgba(46,168,113,.08);border:1px solid rgba(46,168,113,.2);' +
        'border-radius:12px;padding:20px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.72rem;text-transform:uppercase;letter-spacing:2px;' +
        'color:#5a8a96;font-weight:700;margin-bottom:8px">Entity Upgraded</div>' +
        '<div style="font-size:1.2rem;font-weight:900;color:#0d4a5c">' +
        (data.entityName || '&mdash;') + '</div>' +
        '</div>' +

        // Features table
        '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">' +
        '<tr><td colspan="2" style="background:#0d4a5c;color:#fff;padding:10px 14px;' +
        'font-weight:700;font-size:.78rem;letter-spacing:.5px">' +
        'NEW FEATURES ACTIVATED' +
        '</td></tr>' +
        featureRows +
        '<tr style="background:#e4f1f5">' +
        '<td style="padding:14px;font-weight:900;font-size:1rem;color:#0d4a5c">' +
        'Added Monthly Cost</td>' +
        '<td style="padding:14px;font-weight:900;font-size:1.1rem;color:#1a8ba8;text-align:right">' +
        '+R' + (data.amount || 0).toLocaleString('en-ZA') + '.00/mo' +
        '</td>' +
        '</tr>' +
        '</table>' +

        emailInfoBox([
            { label: 'Payment Reference', value: data.ref   || '&mdash;' },
            { label: 'Date',              value: data.date  || '&mdash;' },
            { label: 'Amount Charged',
              value: 'R' + (data.amount || 0).toLocaleString('en-ZA') +
                     '.00 (first month pro-rata)' }
        ]) +

        // Confirmation notice
        '<div style="background:#d1fae5;border:1px solid #a7f3d0;border-radius:10px;' +
        'padding:14px 18px;margin:20px 0;text-align:center">' +
        '<div style="font-size:.88rem;font-weight:700;color:#065f46">' +
        'Features are live immediately' +
        '</div>' +
        '<div style="font-size:.78rem;color:#047857;margin-top:4px">' +
        'Refresh your app to see your new features.' +
        '</div>' +
        '</div>' +

        emailButton('Open My App', EMAIL_CONFIG.appUrl, '#2ea871') +
        emailFooter();

    // ── Admin Notification Email ──
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

    // ── Send both emails and return combined Promise ──
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
// EMAIL — EVENT FEEDBACK REQUEST
// ============================================================
function emailEventFeedbackRequest(data) {
    // data = { clientName, clientEmail, eventName, id }
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
// COMPANY DETAILS — INVOICING
// ============================================================
var COMPANY_DETAILS = {
    name:    'HollowAqua Pty Ltd',
    trading: 'StockAI-Pro',
    phone:   '+27 79 044 0508',
    email:   'billing@stockai-pro.co.za',
    address: '16 Loddon Road, Mulbarton, 2059, Johannesburg South, Gauteng, South Africa',
    website: 'www.stockai-pro.co.za'
};

var PRICING = {
    baseFee:   799,
    entityFee: 599,
    vatRate:   0.15
};

// ============================================================
// EMAIL — MONTHLY INVOICE
// ============================================================
function generateInvoiceHTML(data) {
    var entities  = data.entities || [];
    var baseFee   = PRICING.baseFee;
    var entityFee = PRICING.entityFee;

    var baseExcl   = parseFloat((baseFee   / (1 + PRICING.vatRate)).toFixed(2));
    var entityExcl = parseFloat((entityFee / (1 + PRICING.vatRate)).toFixed(2));

    var lineItems = '';
    var subtotal  = 0;

    // Base platform fee
    lineItems +=
        '<tr>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
        'font-size:.85rem;color:#0d4a5c">' +
        'StockAI-Pro Platform Fee &mdash; Monthly Access</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
        'font-size:.85rem;color:#0d4a5c;text-align:center">1</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
        'font-size:.85rem;color:#0d4a5c;text-align:right">R' + baseExcl.toFixed(2) + '</td>' +
        '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
        'font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:600">' +
        'R' + baseExcl.toFixed(2) + '</td>' +
        '</tr>';
    subtotal += baseExcl;

    // Per entity fees
    entities.forEach(function(ent) {
        lineItems +=
            '<tr>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c">Entity Fee &mdash; ' + ent.name + '</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:center">1</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:right">R' + entityExcl.toFixed(2) + '</td>' +
            '<td style="padding:12px 16px;border-bottom:1px solid #e4f1f5;' +
            'font-size:.85rem;color:#0d4a5c;text-align:right;font-weight:600">' +
            'R' + entityExcl.toFixed(2) + '</td>' +
            '</tr>';
        subtotal += entityExcl;
    });

    var vatAmount = parseFloat((subtotal * PRICING.vatRate).toFixed(2));
    var total     = parseFloat((subtotal + vatAmount).toFixed(2));

    var invoiceDate = data.invoiceDate || '';
    var dueDate     = data.dueDate || '';

    return '<div style="font-family:Arial,sans-serif;max-width:700px;' +
        'margin:0 auto;background:#fff">' +

        // Header
        '<div style="background:linear-gradient(135deg,#0d4a5c,#1a8ba8);padding:32px;' +
        'border-radius:12px 12px 0 0">' +
        '<table style="width:100%"><tr>' +
        '<td><h1 style="color:#fff;font-size:1.6rem;font-weight:900;margin:0;' +
        'letter-spacing:1px">STOCKAI-PRO</h1>' +
        '<p style="color:rgba(255,255,255,.7);font-size:.78rem;margin:4px 0 0">' +
        'Intelligence a click away</p></td>' +
        '<td style="text-align:right">' +
        '<div style="background:rgba(255,255,255,.15);padding:12px 20px;border-radius:8px">' +
        '<div style="color:#fff;font-size:1.4rem;font-weight:900;letter-spacing:2px">' +
        'TAX INVOICE</div>' +
        '<div style="color:rgba(255,255,255,.8);font-size:.78rem;margin-top:4px">' +
        '#' + data.invoiceNumber + '</div>' +
        '</div></td>' +
        '</tr></table></div>' +

        // Body
        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none">' +

        // From / To
        '<table style="width:100%;margin-bottom:30px"><tr>' +
        '<td style="width:50%;padding-right:15px;vertical-align:top">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:700;letter-spacing:1px;margin-bottom:8px">From</div>' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c">' +
        COMPANY_DETAILS.name + '</div>' +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:2px">T/A ' +
        COMPANY_DETAILS.trading + '</div>' +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:6px;line-height:1.8">' +
        COMPANY_DETAILS.address + '<br>' +
        COMPANY_DETAILS.phone + '<br>' +
        COMPANY_DETAILS.email + '<br>' +
        COMPANY_DETAILS.website +
        '</div></td>' +
        '<td style="width:50%;padding-left:15px;vertical-align:top">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:700;letter-spacing:1px;margin-bottom:8px">Bill To</div>' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c">' +
        (data.companyName || data.ownerName) + '</div>' +
        (data.companyAddress ?
            '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px;line-height:1.6">' +
            data.companyAddress + '</div>'
        : '') +
        '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' +
        (data.ownerEmail || '') + '</div>' +
        (data.ownerPhone ?
            '<div style="font-size:.78rem;color:#5a8a96">' + data.ownerPhone + '</div>'
        : '') +
        (data.companyVat ?
            '<div style="font-size:.78rem;color:#5a8a96;margin-top:4px">' +
            'VAT: ' + data.companyVat + '</div>'
        : '') +
        '</td></tr></table>' +

        // Invoice details
        '<table style="width:100%;margin-bottom:24px;background:#f0f7f9;border-radius:8px"><tr>' +
        '<td style="padding:14px;width:33%">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:600">Invoice Date</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:#0d4a5c">' +
        invoiceDate + '</div></td>' +
        '<td style="padding:14px;width:33%">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:600">Due Date</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:' +
        (data.isPaid ? '#2ea871' : '#c94545') + '">' + dueDate + '</div></td>' +
        '<td style="padding:14px;width:33%">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:600">Status</div>' +
        '<div style="font-size:.88rem;font-weight:700;color:' +
        (data.isPaid ? '#2ea871' : '#c94545') + '">' +
        (data.isPaid ? 'PAID' : 'DUE') + '</div></td>' +
        '</tr></table>' +

        // Line items table
        '<table style="width:100%;border-collapse:collapse;margin-bottom:20px">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:12px 16px;text-align:left;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase;font-weight:600;letter-spacing:.5px">Description</th>' +
        '<th style="padding:12px 16px;text-align:center;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase;font-weight:600">Qty</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase;font-weight:600">Unit Price</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:.72rem;color:#fff;' +
        'text-transform:uppercase;font-weight:600">Amount</th>' +
        '</tr></thead><tbody>' + lineItems + '</tbody></table>' +

        // Totals
        '<table style="width:100%"><tr><td style="width:60%"></td>' +
        '<td style="width:40%">' +
        '<table style="width:100%">' +
        '<tr><td style="padding:8px 0;font-size:.88rem;color:#5a8a96">Subtotal (excl. VAT)</td>' +
        '<td style="padding:8px 0;font-size:.88rem;text-align:right;font-weight:700;' +
        'color:#0d4a5c">R' + subtotal.toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:8px 0;font-size:.88rem;color:#5a8a96;' +
        'border-bottom:1px solid #e4f1f5">VAT (15%)</td>' +
        '<td style="padding:8px 0;font-size:.88rem;text-align:right;font-weight:700;' +
        'color:#0d4a5c;border-bottom:1px solid #e4f1f5">R' + vatAmount.toFixed(2) + '</td></tr>' +
        '<tr><td style="padding:14px 0;font-size:1.1rem;font-weight:900;color:#1a8ba8">' +
        'TOTAL (incl. VAT)</td>' +
        '<td style="padding:14px 0;font-size:1.1rem;font-weight:900;color:#1a8ba8;' +
        'text-align:right">R' + total.toFixed(2) + '</td></tr>' +
        '</table></td></tr></table>' +

        // Payment note
        '<div style="margin-top:24px;padding:16px;background:#fff8e1;' +
        'border-left:3px solid #f59e0b;border-radius:8px;font-size:.82rem;color:#5a4a17">' +
        '<strong>Payment Methods:</strong><br>' +
        'EFT / Bank Transfer<br>' +
        'Card Payment via Customer Portal<br>' +
        'WhatsApp: ' + COMPANY_DETAILS.phone + '<br><br>' +
        '<strong>Payment Reference:</strong> ' + data.invoiceNumber +
        '</div>' +

        // Footer
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
        '</div>' +

        '</div></div>';
}

function emailMonthlyInvoice(data) {
    var html = generateInvoiceHTML(data);
    return sendEmail(
        data.ownerEmail,
        'StockAI-Pro Tax Invoice #' + data.invoiceNumber + ' — Due ' + data.dueDate,
        html
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
            (inv.isPaid ? 'Paid' : 'Outstanding') + '</span></td>' +
            '</tr>';
    }).join('');

    var totalOutstanding = (data.invoices || [])
        .filter(function(i) { return !i.isPaid; })
        .reduce(function(s, i) { return s + i.total; }, 0);

    var totalPaid = (data.invoices || [])
        .filter(function(i) { return i.isPaid; })
        .reduce(function(s, i) { return s + i.total; }, 0);

    return '<div style="font-family:Arial,sans-serif;max-width:700px;' +
        'margin:0 auto;background:#fff">' +

        // Header
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
        '</div></td>' +
        '</tr></table></div>' +

        // Body
        '<div style="padding:32px;border:1px solid #e4f1f5;border-top:none;' +
        'border-radius:0 0 12px 12px">' +

        // Client details
        '<div style="margin-bottom:24px">' +
        '<div style="font-size:.65rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:700;letter-spacing:1px;margin-bottom:6px">Statement For</div>' +
        '<div style="font-size:1rem;font-weight:700;color:#0d4a5c">' +
        (data.companyName || data.ownerName) + '</div>' +
        '</div>' +

        // Summary
        '<table style="width:100%;margin-bottom:24px"><tr>' +
        '<td style="width:33%;padding-right:8px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;' +
        'border-left:3px solid #1a8ba8">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:600">Total Invoiced</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#0d4a5c">' +
        'R' + (totalPaid + totalOutstanding).toFixed(2) + '</div></div></td>' +
        '<td style="width:33%;padding:0 4px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;' +
        'border-left:3px solid #2ea871">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:600">Total Paid</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#2ea871">' +
        'R' + totalPaid.toFixed(2) + '</div></div></td>' +
        '<td style="width:33%;padding-left:8px">' +
        '<div style="padding:14px;background:#f0f7f9;border-radius:8px;text-align:center;' +
        'border-left:3px solid #c94545">' +
        '<div style="font-size:.62rem;color:#8aabb5;text-transform:uppercase;' +
        'font-weight:600">Outstanding</div>' +
        '<div style="font-size:1.1rem;font-weight:800;color:#c94545">' +
        'R' + totalOutstanding.toFixed(2) + '</div></div></td>' +
        '</tr></table>' +

        // Invoice table
        '<table style="width:100%;border-collapse:collapse">' +
        '<thead><tr style="background:#0d4a5c">' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff;' +
        'text-transform:uppercase">Invoice #</th>' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff;' +
        'text-transform:uppercase">Date</th>' +
        '<th style="padding:10px 14px;text-align:left;font-size:.7rem;color:#fff;' +
        'text-transform:uppercase">Due Date</th>' +
        '<th style="padding:10px 14px;text-align:right;font-size:.7rem;color:#fff;' +
        'text-transform:uppercase">Amount</th>' +
        '<th style="padding:10px 14px;text-align:center;font-size:.7rem;color:#fff;' +
        'text-transform:uppercase">Status</th>' +
        '</tr></thead><tbody>' + invoiceRows + '</tbody></table>' +

        // Footer
        '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e4f1f5;' +
        'text-align:center">' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.name + ' T/A ' + COMPANY_DETAILS.trading + '</p>' +
        '<p style="font-size:.72rem;color:#8aabb5;margin:4px 0">' +
        COMPANY_DETAILS.address + '</p>' +
        '</div>' +

        '</div></div>';
}

function emailStatement(data) {
    var html = generateStatementHTML(data);
    return sendEmail(
        data.ownerEmail,
        'StockAI-Pro Account Statement — ' + data.dateFrom + ' to ' + data.dateTo,
        html
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

    // Only run on the 26th
    if (day !== 26) return;

    // Check if already sent this month
    var invoiceKey = 'invoice_' + year + '_' + month;
    var billing    = accountData.billing || {};
    if (billing.lastInvoiceSent === invoiceKey) return;

    var entities = accountData.entities || [];
    var activeEntities = entities.filter(function(e) {
        return e.status !== 'inactive';
    });
    if (activeEntities.length === 0) return;

    // Last day of current month
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

console.log('✅ StockAI-Pro 2.0 Email Templates loaded');
console.log('📧 Proxy URL:', EMAIL_CONFIG.proxyUrl);
console.log('📧 emailUpgradeConfirmation:', typeof emailUpgradeConfirmation);
