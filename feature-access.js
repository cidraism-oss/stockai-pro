// ============================================================
// StockAI-Pro — feature-access.js v4.0
// Controls which features a user can access in the app
// Based on purchased features stored in Firebase accounts collection
// CSS is embedded at the bottom — no separate feature-access.css needed
// ============================================================

// ============================================================
// FEATURE REGISTRY — All 13 features
// Maps feature keys to tabs, nav items and app routes
// ============================================================
var FEATURE_REGISTRY = {

    // ── ALWAYS ACTIVE — included with every account ──
    web_boh: {
        name:        'Web App B.O.H',
        alwaysActive: true,
        tabs: [
            'dashboard', 'stock-items', 'suppliers', 'stock-count',
            'purchase-orders', 'grv', 'reports', 'food-cost',
            'month-end', 'internal-transfers', 'settings',
            'users-roles', 'ai-assistant', 'client-invoicing'
        ],
        navItems: [
            'nav-dashboard', 'nav-stock', 'nav-suppliers',
            'nav-stock-count', 'nav-purchase-orders', 'nav-grv',
            'nav-reports', 'nav-food-cost', 'nav-month-end',
            'nav-transfers', 'nav-settings', 'nav-users', 'nav-ai',
            'nav-invoicing'
        ]
    },

    // ── FREE WITH EVERY PACKAGE ──
    mobile_app: {
        name:        'Mobile App',
        alwaysActive: false,
        freeWithPackage: true,
        tabs:     ['mobile-dashboard', 'mobile-stock-count', 'mobile-approvals', 'mobile-ai-chat'],
        navItems: ['nav-mobile-app'],
        appRoutes: ['/mobile', '/mobile/dashboard', '/mobile/count', '/mobile/approvals']
    },

    procure_ai: {
        name:        'ProcureAI App',
        alwaysActive: false,
        freeWithPackage: true,
        tabs:     ['procure-dashboard', 'procure-orders', 'procure-suppliers', 'procure-history'],
        navItems: ['nav-procure-ai'],
        appRoutes: ['/procure', '/procure/dashboard', '/procure/orders', '/procure/suppliers']
    },

    // ── POINT OF SALE ──
    pos_system: {
        name:        'P.O.S System',
        alwaysActive: false,
        tabs: [
            'pos-selling-screen', 'pos-menu-builder', 'pos-departments',
            'pos-tables', 'pos-kitchen-display', 'pos-qr-payments', 'pos-reports'
        ],
        navItems: ['nav-pos', 'nav-pos-builder', 'nav-kitchen-display'],
        appRoutes: ['/pos', '/pos/sell', '/pos/builder', '/pos/kitchen', '/pos/tables']
    },

    retail_pos: {
        name:        'Retail POS',
        alwaysActive: false,
        tabs: [
            'retail-selling-screen', 'retail-products', 'retail-categories',
            'retail-customers', 'retail-reports'
        ],
        navItems: ['nav-retail-pos'],
        appRoutes: ['/retail', '/retail/sell', '/retail/products', '/retail/reports']
    },

    // ── FREE WITH POS ──
    pos_builder: {
        name:        'POS Builder',
        alwaysActive: false,
        freeWith:    ['pos_system', 'retail_pos'],
        tabs:     ['pos-builder-screen', 'pos-builder-categories', 'pos-builder-items'],
        navItems: ['nav-pos-builder-menu'],
        appRoutes: ['/pos/builder']
    },

    cashup_pro: {
        name:        'CashUp-Pro',
        alwaysActive: false,
        freeWith:    ['pos_system', 'retail_pos'],
        tabs:     ['cashup-screen', 'cashup-history', 'cashup-reports'],
        navItems: ['nav-cashup'],
        appRoutes: ['/cashup', '/cashup/history']
    },

    // ── CORE APPS ──
    menu_master: {
        name:        'Menu Master',
        alwaysActive: false,
        tabs:     ['menu', 'menu-recipes', 'menu-ingredients', 'menu-costing', 'menu-categories'],
        navItems: ['nav-menu-master'],
        appRoutes: ['/menu', '/menu/recipes', '/menu/ingredients', '/menu/costing']
    },

    invoice_scanner: {
        name:        'Invoice Scanner App',
        alwaysActive: false,
        tabs:     ['invoice-scanner', 'invoice-history', 'invoice-suppliers'],
        navItems: ['nav-invoice-scanner'],
        appRoutes: ['/invoice-scanner', '/invoice-scanner/history']
    },

    // ── BUSINESS MODULES ──
    functions_ai: {
        name:        'FunctionsAI',
        alwaysActive: false,
        tabs: [
            'functions-dashboard', 'functions-events', 'functions-menus',
            'functions-beverages', 'functions-invoices', 'functions-clients'
        ],
        navItems: ['nav-functions-ai'],
        appRoutes: ['/functions', '/functions/events', '/functions/menus', '/functions/invoices']
    },

    production: {
        name:        'Production Manager',
        alwaysActive: false,
        tabs:     ['production-dashboard', 'production-runs', 'production-recipes', 'production-reports'],
        navItems: ['nav-production'],
        appRoutes: ['/production', '/production/runs', '/production/recipes']
    },

    hr_module: {
        name:        'HR Module',
        alwaysActive: false,
        tabs:     ['hr-dashboard', 'hr-staff', 'hr-leave', 'hr-schedules', 'hr-payslips', 'hr-clockin'],
        navItems: ['nav-hr'],
        appRoutes: ['/hr', '/hr/staff', '/hr/leave', '/hr/schedules', '/hr/payslips']
    },

    // ── AI ──
    ai_brain: {
        name:        'AI Brain + Nikki Voice Bot',
        alwaysActive: false,
        tabs:     ['ai-brain', 'ai-voice', 'ai-insights', 'ai-settings'],
        navItems: ['nav-ai-brain', 'nav-nikki'],
        appRoutes: ['/ai', '/ai/voice', '/ai/insights']
    }
};

// ── Pricing (single source of truth for feature-access displays) ──
var FA_PRICES = {
    web_boh:         799,
    mobile_app:      0,    // free
    procure_ai:      0,    // free
    pos_system:      799,
    menu_master:     349,
    functions_ai:    449,
    retail_pos:      999,
    production:      449,
    hr_module:       349,
    invoice_scanner: 499,
    ai_brain:        499,
    pos_builder:     0,    // free with POS
    cashup_pro:      0     // free with POS
};

// ============================================================
// GET USER FEATURES
// Reads from Firebase accounts collection via userMappings
// Falls back to sessionStorage then localStorage
// ============================================================
function getUserFeatures(callback) {

    // METHOD 1 — Firebase (production path)
    if (typeof firebase !== 'undefined' && firebase.auth) {
        var user = firebase.auth().currentUser;

        if (user) {
            // Use userMappings for fast account lookup
            firebase.firestore()
                .collection('userMappings')
                .doc(user.uid)
                .get()
                .then(function(mapDoc) {
                    if (!mapDoc.exists || !mapDoc.data().accountId) {
                        return fallbackToStorage(callback);
                    }
                    var accountId = mapDoc.data().accountId;
                    return firebase.firestore()
                        .collection('accounts')
                        .doc(accountId)
                        .get();
                })
                .then(function(doc) {
                    if (!doc || !doc.exists) {
                        return fallbackToStorage(callback);
                    }
                    var data     = doc.data();
                    var entities = data.entities || [];

                    // Collect all features across all active entities
                    // (union of features — user can access anything they have paid for)
                    var allFeatures = ['web_boh', 'mobile_app', 'procure_ai'];

                    entities.forEach(function(ent) {
                        if (ent.status === 'inactive') return;
                        (ent.features || []).forEach(function(f) {
                            if (allFeatures.indexOf(f) === -1) allFeatures.push(f);
                        });
                    });

                    // Auto-add POS bundles if POS is active
                    var hasPOS = allFeatures.indexOf('pos_system') !== -1 ||
                                 allFeatures.indexOf('retail_pos')  !== -1;
                    if (hasPOS) {
                        if (allFeatures.indexOf('pos_builder') === -1) allFeatures.push('pos_builder');
                        if (allFeatures.indexOf('cashup_pro')  === -1) allFeatures.push('cashup_pro');
                    }

                    console.log('🔐 Features from Firebase:', allFeatures);
                    cacheUserFeatures(allFeatures);
                    callback(allFeatures);
                })
                .catch(function(err) {
                    console.warn('⚠️ Firebase feature lookup error:', err.message);
                    fallbackToStorage(callback);
                });
            return;
        }
    }

    // No Firebase auth user — use storage
    fallbackToStorage(callback);
}

function fallbackToStorage(callback) {
    // METHOD 2 — sessionStorage
    var stored = sessionStorage.getItem('stockai_features');
    if (stored) {
        try {
            var features = JSON.parse(stored);
            console.log('🔐 Features from sessionStorage:', features);
            callback(features);
            return;
        } catch(e) { /* invalid JSON */ }
    }

    // METHOD 3 — localStorage cache
    var cached = localStorage.getItem('stockai_user_features');
    if (cached) {
        try {
            var features = JSON.parse(cached);
            console.log('🔐 Features from localStorage cache:', features);
            callback(features);
            return;
        } catch(e) { /* invalid JSON */ }
    }

    // DEFAULT — base features only
    console.log('🔐 No features found — defaulting to base package');
    callback(['web_boh', 'mobile_app', 'procure_ai']);
}

// ============================================================
// CACHE FEATURES LOCALLY
// ============================================================
function cacheUserFeatures(features) {
    try {
        localStorage.setItem('stockai_user_features', JSON.stringify(features));
        sessionStorage.setItem('stockai_features',    JSON.stringify(features));
    } catch(e) { /* storage not available */ }
}

// ============================================================
// CHECK IF FEATURE IS ACTIVE
// ============================================================
function isFeatureActive(featureKey, userFeatures) {
    var reg = FEATURE_REGISTRY[featureKey];
    if (!reg) return false;
    if (reg.alwaysActive)      return true;
    if (reg.freeWithPackage)   return true; // mobile_app, procure_ai always on
    return userFeatures.indexOf(featureKey) !== -1;
}

// ============================================================
// APPLY FEATURE ACCESS TO UI
// Shows/hides nav items, tabs, sections
// ============================================================
function applyFeatureAccess(userFeatures) {
    console.log('🔐 Applying feature access for:', userFeatures.length, 'features');
    cacheUserFeatures(userFeatures);

    Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
        var reg      = FEATURE_REGISTRY[featureKey];
        var isActive = isFeatureActive(featureKey, userFeatures);

        // ── Show/hide nav items ──
        if (reg.navItems) {
            reg.navItems.forEach(function(navId) {
                var el = document.getElementById(navId);
                if (!el) return;
                el.style.display = isActive ? '' : 'none';
                el.setAttribute('data-feature', featureKey);
                el.setAttribute('data-feature-active', String(isActive));
            });
        }

        // ── Show/hide tab panels ──
        if (reg.tabs) {
            reg.tabs.forEach(function(tabId) {
                var el = document.getElementById(tabId);
                if (!el) return;
                el.style.display = isActive ? '' : 'none';
                el.setAttribute('data-feature', featureKey);
                el.setAttribute('data-feature-active', String(isActive));
            });
        }

        // ── Handle data-requires-feature attributes ──
        document.querySelectorAll('[data-requires-feature="' + featureKey + '"]')
            .forEach(function(el) {
                el.style.display = isActive ? '' : 'none';
            });
    });

    // ── Add locked overlays to inactive lockable sections ──
    addLockedOverlays(userFeatures);

    // ── Update feature status widget if present ──
    renderFeatureStatusWidget(userFeatures);

    console.log('✅ Feature access applied');
}

// ============================================================
// ADD LOCKED OVERLAYS
// Shows "Upgrade to Unlock" over inactive feature sections
// ============================================================
function addLockedOverlays(userFeatures) {
    Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
        var reg      = FEATURE_REGISTRY[featureKey];
        if (reg.alwaysActive || reg.freeWithPackage) return;

        var isActive = userFeatures.indexOf(featureKey) !== -1;
        if (isActive) return;

        var price = FA_PRICES[featureKey] || 0;

        document.querySelectorAll('[data-feature-lockable="' + featureKey + '"]')
            .forEach(function(el) {
                // Don't add if overlay already exists
                if (el.querySelector('.feature-locked-overlay')) return;

                el.style.position = 'relative';
                el.style.overflow = 'hidden';

                var overlay = document.createElement('div');
                overlay.className = 'feature-locked-overlay';

                overlay.innerHTML =
                    '<div style="width:58px;height:58px;border-radius:50%;' +
                        'background:linear-gradient(135deg,#0d4a5c,#1a8ba8);' +
                        'display:flex;align-items:center;justify-content:center;' +
                        'margin-bottom:13px;box-shadow:0 6px 20px rgba(26,139,168,.3)">' +
                        '<i class="fas fa-lock" style="color:#fff;font-size:1.3rem"></i>' +
                    '</div>' +
                    '<div style="font-size:.98rem;font-weight:800;color:#0d4a5c;margin-bottom:5px">' +
                        reg.name +
                    '</div>' +
                    '<div style="font-size:.8rem;color:#5a8a96;margin-bottom:15px;' +
                        'text-align:center;max-width:240px;line-height:1.5">' +
                        'This feature is not included in your current package.' +
                    '</div>' +
                    '<button onclick="requestUpgrade(\'' + featureKey + '\')" ' +
                        'class="feature-upgrade-btn">' +
                        '<i class="fas fa-arrow-up"></i> ' +
                        (price > 0 ? 'Add for R' + price + '/mo' : 'Upgrade to Unlock') +
                    '</button>';

                overlay.onclick = function(e) {
                    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
                        requestUpgrade(featureKey);
                    }
                };

                el.appendChild(overlay);
            });
    });
}

// ============================================================
// REQUEST UPGRADE
// Redirects to the portal upgrade page
// ============================================================
function requestUpgrade(featureKey) {
    var reg   = FEATURE_REGISTRY[featureKey];
    var price = FA_PRICES[featureKey] || 0;
    if (!reg) return;

    // Try to get accountId from localStorage or app state
    var accountId = '';
    try {
        var cached = localStorage.getItem('stockai_account_id');
        if (cached) accountId = cached;
    } catch(e) {}

    // Also try global app state if available
    if (!accountId && typeof window.CURRENT_ACCOUNT_ID !== 'undefined') {
        accountId = window.CURRENT_ACCOUNT_ID;
    }

    var confirmed = confirm(
        'Upgrade to ' + reg.name + '?\n\n' +
        (price > 0 ? 'Additional cost: R' + price + '/month\n\n' : '') +
        'Click OK to go to the upgrade page.\n' +
        'Or contact us on 079 044 0508.'
    );

    if (!confirmed) return;

    if (accountId) {
        // Go directly to upgrade page with account pre-loaded
        window.location.href = '/upgrade.html?accountId=' + accountId + '&feature=' + featureKey;
    } else {
        // Go to portal to log in first
        window.location.href = '/portal.html';
    }
}

// ============================================================
// ROUTE GUARD
// Call on tab/route changes to block access
// ============================================================
function guardRoute(route, userFeatures) {
    var allowed = false;

    // BOH base routes always allowed
    var bohRoutes = ['/', '/dashboard', '/stock', '/suppliers',
                     '/stock-count', '/purchase-orders', '/grv',
                     '/reports', '/settings', '/food-cost', '/month-end'];
    bohRoutes.forEach(function(r) {
        if (route === r || route.startsWith(r + '/')) allowed = true;
    });

    if (allowed) return true;

    Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
        var reg = FEATURE_REGISTRY[featureKey];
        if (!reg.appRoutes) return;
        if (!isFeatureActive(featureKey, userFeatures)) return;
        reg.appRoutes.forEach(function(r) {
            if (route === r || route.startsWith(r + '/')) allowed = true;
        });
    });

    if (!allowed) {
        console.warn('🚫 Access denied for route:', route);
        showFeatureBlockedMessage(route);
    }
    return allowed;
}

// ============================================================
// SHOW FEATURE BLOCKED MESSAGE
// ============================================================
function showFeatureBlockedMessage(route) {
    var blockedKey = null;
    Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
        var reg = FEATURE_REGISTRY[featureKey];
        if (!reg.appRoutes) return;
        reg.appRoutes.forEach(function(r) {
            if (route === r || route.startsWith(r + '/')) blockedKey = featureKey;
        });
    });
    if (blockedKey) {
        var reg = FEATURE_REGISTRY[blockedKey];
        alert(
            '🔒 ' + reg.name + ' is not included in your package.\n\n' +
            'Contact us on 079 044 0508 or upgrade your package to access this feature.'
        );
    }
}

// ============================================================
// GET FEATURE SUMMARY
// Returns object with active/inactive status for all features
// ============================================================
function getFeatureSummary(userFeatures) {
    var summary = {};
    Object.keys(FEATURE_REGISTRY).forEach(function(key) {
        var reg = FEATURE_REGISTRY[key];
        summary[key] = {
            name:           reg.name,
            active:         isFeatureActive(key, userFeatures),
            alwaysIncluded: reg.alwaysActive || reg.freeWithPackage || false,
            freeWith:       reg.freeWith     || null,
            price:          FA_PRICES[key]   || 0
        };
    });
    return summary;
}

// ============================================================
// RENDER FEATURE STATUS WIDGET
// Place <div id="feature-status-widget"></div> anywhere in app
// ============================================================
function renderFeatureStatusWidget(userFeatures) {
    var widget = document.getElementById('feature-status-widget');
    if (!widget) return;

    var summary  = getFeatureSummary(userFeatures);
    var activeCount   = 0;
    var monthlyTotal  = 0;

    Object.keys(summary).forEach(function(key) {
        if (summary[key].active && !summary[key].alwaysIncluded && FA_PRICES[key] > 0) {
            activeCount++;
            monthlyTotal += FA_PRICES[key];
        }
    });

    var html =
        '<div style="background:#fff;border-radius:14px;padding:20px;' +
        'box-shadow:0 4px 20px rgba(13,74,92,.08)">' +

        // Header
        '<div style="display:flex;align-items:center;justify-content:space-between;' +
        'margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #e0eff3">' +
        '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c;display:flex;' +
        'align-items:center;gap:8px"><i class="fas fa-puzzle-piece" style="color:#1a8ba8"></i>' +
        'Your Package</div>' +
        '<div style="font-size:.82rem;color:#1a8ba8;font-weight:600">' +
        'R' + (799 + monthlyTotal).toLocaleString() + '/mo</div>' +
        '</div>';

    Object.keys(summary).forEach(function(key) {
        var feat   = summary[key];
        var isOn   = feat.active;
        var icon   = isOn ? 'fa-check-circle' : 'fa-lock';
        var color  = isOn ? '#2ea871' : '#c4dde4';
        var txtClr = isOn ? '#0d4a5c' : '#8aabb5';
        var badge  = '';

        if (feat.alwaysIncluded && !feat.freeWith) {
            badge = '<span style="font-size:.6rem;background:rgba(46,168,113,.1);' +
                'color:#2ea871;padding:2px 8px;border-radius:6px;font-weight:700;' +
                'margin-left:7px">ALWAYS ON</span>';
        } else if (feat.alwaysIncluded && !feat.freeWith) {
            badge = '<span style="font-size:.6rem;background:rgba(245,158,11,.1);' +
                'color:#d97706;padding:2px 8px;border-radius:6px;font-weight:700;' +
                'margin-left:7px">FREE</span>';
        }

        html +=
            '<div style="display:flex;align-items:center;justify-content:space-between;' +
            'padding:9px 0;border-bottom:1px solid #f0f7f9">' +
            '<div style="display:flex;align-items:center;gap:9px">' +
            '<i class="fas ' + icon + '" style="color:' + color + ';font-size:.95rem"></i>' +
            '<span style="font-size:.83rem;font-weight:600;color:' + txtClr + '">' +
            feat.name + badge + '</span>' +
            '</div>';

        if (!isOn && !feat.alwaysIncluded && feat.price > 0) {
            html +=
                '<button onclick="requestUpgrade(\'' + key + '\')" ' +
                'style="padding:4px 13px;background:#f59e0b;color:#fff;border:none;' +
                'border-radius:8px;font-size:.7rem;font-weight:700;cursor:pointer;' +
                'font-family:inherit">+R' + feat.price + '/mo</button>';
        } else if (isOn) {
            html += '<span style="font-size:.72rem;color:#2ea871;font-weight:600">Active</span>';
        }

        html += '</div>';
    });

    html += '</div>';
    widget.innerHTML = html;
}

// ============================================================
// SAVE ACCOUNT ID FOR UPGRADE REDIRECTS
// Call this after successful login in hub.html
// ============================================================
function saveAccountIdForUpgrade(accountId) {
    try {
        localStorage.setItem('stockai_account_id', accountId);
    } catch(e) {}
    window.CURRENT_ACCOUNT_ID = accountId;
}

// ============================================================
// CLEAR FEATURE CACHE
// Call on logout
// ============================================================
function clearFeatureCache() {
    try {
        localStorage.removeItem('stockai_user_features');
        localStorage.removeItem('stockai_account_id');
        sessionStorage.removeItem('stockai_features');
    } catch(e) {}
    window.CURRENT_ACCOUNT_ID = null;
    console.log('🔐 Feature cache cleared');
}

// ============================================================
// INITIALISE FEATURE ACCESS
// Call this after user authentication in hub.html
// Example:
//   auth.onAuthStateChanged(function(user) {
//       if (user) initFeatureAccess();
//   });
// ============================================================
function initFeatureAccess() {
    getUserFeatures(function(features) {
        applyFeatureAccess(features);
        console.log('🔐 Feature access initialised');
        console.log('📋 Active features:', features);
    });
}

// ============================================================
// INJECT FEATURE ACCESS CSS
// Injects all required styles — no separate CSS file needed
// ============================================================
(function injectFeatureAccessCSS() {
    if (document.getElementById('feature-access-styles')) return;
    var style = document.createElement('style');
    style.id  = 'feature-access-styles';
    style.textContent =

        /* ── Locked overlay ── */
        '.feature-locked-overlay {' +
            'position:absolute;inset:0;' +
            'background:rgba(255,255,255,.93);' +
            'backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);' +
            'display:flex;flex-direction:column;align-items:center;' +
            'justify-content:center;z-index:100;border-radius:inherit;' +
            'cursor:pointer;animation:featureLockIn .35s ease;' +
        '}' +

        '@keyframes featureLockIn {' +
            'from{opacity:0}to{opacity:1}' +
        '}' +

        '.feature-locked-overlay:hover {' +
            'background:rgba(255,255,255,.97)' +
        '}' +

        /* ── Upgrade button inside overlay ── */
        '.feature-upgrade-btn {' +
            'padding:10px 24px;' +
            'background:linear-gradient(135deg,#f59e0b,#d97706);' +
            'color:#fff;border:none;border-radius:10px;' +
            'font-weight:700;font-size:.85rem;cursor:pointer;' +
            'font-family:inherit;' +
            'box-shadow:0 4px 12px rgba(245,158,11,.3);' +
            'transition:transform .2s ease,box-shadow .2s ease;' +
        '}' +

        '.feature-upgrade-btn:hover {' +
            'transform:translateY(-2px);' +
            'box-shadow:0 8px 20px rgba(245,158,11,.4);' +
        '}' +

        /* ── Nav item locked state ── */
        '.nav-item-locked {' +
            'opacity:.4;pointer-events:none;position:relative' +
        '}' +

        '.nav-item-locked::after {' +
            'content:"🔒";font-size:.55rem;' +
            'position:absolute;top:-2px;right:-8px' +
        '}' +

        /* ── Feature card disabled ── */
        '.feature-card-disabled {' +
            'opacity:.5;filter:grayscale(.5);pointer-events:none' +
        '}' +

        /* ── Upgrade banner ── */
        '.upgrade-banner {' +
            'background:linear-gradient(135deg,#f59e0b,#d97706);' +
            'color:#fff;padding:12px 18px;border-radius:10px;' +
            'display:flex;align-items:center;justify-content:space-between;' +
            'gap:12px;margin-bottom:14px;' +
            'box-shadow:0 4px 12px rgba(245,158,11,.25)' +
        '}' +

        '.upgrade-banner-text {' +
            'font-size:.85rem;font-weight:600' +
        '}' +

        '.upgrade-banner-btn {' +
            'padding:7px 16px;background:#fff;color:#d97706;' +
            'border:none;border-radius:8px;font-weight:700;' +
            'font-size:.8rem;cursor:pointer;font-family:inherit;' +
            'white-space:nowrap;transition:transform .2s ease' +
        '}' +

        '.upgrade-banner-btn:hover {' +
            'transform:translateY(-2px)' +
        '}' +

        /* ── Feature status widget ── */
        '#feature-status-widget {margin:18px 0}' +

        /* ── Tooltip for locked nav items ── */
        '[data-feature-active="false"][data-feature] {' +
            'position:relative' +
        '}';

    document.head.appendChild(style);
    console.log('🎨 Feature access styles injected');
})();

// ============================================================
// LOG
// ============================================================
console.log('🔐 StockAI-Pro feature-access.js v4.0 loaded');
console.log('🔐 ' + Object.keys(FEATURE_REGISTRY).length + ' features registered');
console.log('🔐 Call initFeatureAccess() after user login');
console.log('🔐 Call clearFeatureCache() on logout');
