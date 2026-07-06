// ============================================================
// FEATURE-ACCESS.JS — StockAI-Pro
// Controls which features a customer can access
// Based on their purchased package stored in Firebase
// ============================================================

// ============================================================
// FEATURE REGISTRY
// Maps feature keys to their app routes/tabs/elements
// ============================================================
var FEATURE_REGISTRY = {

  // ALWAYS AVAILABLE (included with web_boh)
  web_boh: {
    name: 'Web App B.O.H',
    alwaysActive: true,
    tabs: [
      'dashboard',
      'stock-items',
      'suppliers',
      'stock-count',
      'purchase-orders',
      'grv',
      'reports',
      'food-cost',
      'month-end',
      'internal-transfers',
      'settings',
      'users-roles',
      'ai-assistant',
      'client-invoicing',
      'functions-ai'
    ],
    navItems: [
      'nav-dashboard',
      'nav-stock',
      'nav-suppliers',
      'nav-stock-count',
      'nav-purchase-orders',
      'nav-grv',
      'nav-reports',
      'nav-food-cost',
      'nav-month-end',
      'nav-transfers',
      'nav-settings',
      'nav-users',
      'nav-ai',
      'nav-invoicing',
      'nav-functions'
    ]
  },

  // OPTIONAL — Mobile App
  mobile_app: {
    name: 'Mobile App',
    alwaysActive: false,
    tabs: [
      'mobile-dashboard',
      'mobile-stock-count',
      'mobile-approvals',
      'mobile-ai-chat'
    ],
    navItems: [
      'nav-mobile-app'
    ],
    appRoutes: [
      '/mobile',
      '/mobile/dashboard',
      '/mobile/count',
      '/mobile/approvals',
      '/mobile/ai'
    ]
  },

  // OPTIONAL — ProcureAI
  procure_ai: {
    name: 'ProcureAI App',
    alwaysActive: false,
    tabs: [
      'procure-dashboard',
      'procure-orders',
      'procure-suppliers',
      'procure-history'
    ],
    navItems: [
      'nav-procure-ai'
    ],
    appRoutes: [
      '/procure',
      '/procure/dashboard',
      '/procure/orders',
      '/procure/suppliers',
      '/procure/history'
    ]
  },

  // OPTIONAL — POS System
  pos_system: {
    name: 'P.O.S System',
    alwaysActive: false,
    tabs: [
      'pos-selling-screen',
      'pos-menu-builder',
      'pos-departments',
      'pos-tables',
      'pos-kitchen-display',
      'pos-qr-payments',
      'pos-reports'
    ],
    navItems: [
      'nav-pos',
      'nav-pos-builder',
      'nav-kitchen-display'
    ],
    appRoutes: [
      '/pos',
      '/pos/sell',
      '/pos/builder',
      '/pos/kitchen',
      '/pos/tables',
      '/pos/qr',
      '/pos/reports'
    ]
  },

    menu_master: {
    name: 'Menu Master',
    alwaysActive: false,
    tabs: [
      'menu',
      'menu-recipes',
      'menu-ingredients',
      'menu-costing',
      'menu-categories'
    ],
    navItems: [
      'nav-menu-master'
    ],
    appRoutes: [
      '/menu',
      '/menu/recipes',
      '/menu/ingredients',
      '/menu/costing',
      '/menu/categories'
    ]
  },

  // OPTIONAL — FunctionsAI Events Manager
  functions_ai: {
    name: 'FunctionsAI',
    alwaysActive: false,
    tabs: [
      'functions-dashboard',
      'functions-events',
      'functions-menus',
      'functions-beverages',
      'functions-invoices',
      'functions-clients'
    ],
    navItems: [
      'nav-functions-ai'
    ],
    appRoutes: [
      '/functions',
      '/functions/dashboard',
      '/functions/events',
      '/functions/menus',
      '/functions/beverages',
      '/functions/invoices',
      '/functions/clients'
    ]
  }
};


// ============================================================
// GET USER'S PURCHASED FEATURES
// Reads from Firebase or sessionStorage
// ============================================================
function getUserFeatures(callback) {
  // METHOD 1: Check Firebase (production)
  if (typeof firebase !== 'undefined' && firebase.auth) {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('customers').doc(user.uid).get()
        .then(function(doc) {
          if (doc.exists) {
            var data = doc.data();
            var features = data.features || data.purchasedFeatures || ['web_boh'];
            console.log('🔐 Features from Firebase:', features);
            callback(features);
          } else {
            console.warn('⚠️ No customer doc found — defaulting to web_boh');
            callback(['web_boh']);
          }
        })
        .catch(function(err) {
          console.error('❌ Firebase error:', err);
          callback(['web_boh']);
        });
      return;
    }
  }

  // METHOD 2: Check sessionStorage (from signup flow)
  var stored = sessionStorage.getItem('signup_features');
  if (stored) {
    try {
      var features = JSON.parse(stored);
      console.log('🔐 Features from session:', features);
      callback(features);
      return;
    } catch (e) {
      console.error('❌ Error parsing features:', e);
    }
  }

  // METHOD 3: Check localStorage (cached)
  var cached = localStorage.getItem('stockai_user_features');
  if (cached) {
    try {
      var features = JSON.parse(cached);
      console.log('🔐 Features from cache:', features);
      callback(features);
      return;
    } catch (e) {
      console.error('❌ Error parsing cached features:', e);
    }
  }

  // DEFAULT: Only web_boh
  console.log('🔐 No features found — defaulting to web_boh');
  callback(['web_boh']);
}


// ============================================================
// CACHE FEATURES LOCALLY
// Call after successful login or signup
// ============================================================
function cacheUserFeatures(features) {
  localStorage.setItem('stockai_user_features', JSON.stringify(features));
  console.log('💾 Features cached:', features);
}


// ============================================================
// CHECK IF FEATURE IS ACTIVE
// ============================================================
function isFeatureActive(featureKey, userFeatures) {
  var reg = FEATURE_REGISTRY[featureKey];
  if (!reg) return false;
  if (reg.alwaysActive) return true;
  return userFeatures.indexOf(featureKey) !== -1;
}


// ============================================================
// APPLY FEATURE ACCESS TO UI
// Hides/shows nav items, tabs, and sections
// ============================================================
function applyFeatureAccess(userFeatures) {
  console.log('🔐 Applying feature access:', userFeatures);

  // Cache for future use
  cacheUserFeatures(userFeatures);

  // Go through each feature in registry
  Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
    var reg = FEATURE_REGISTRY[featureKey];
    var isActive = isFeatureActive(featureKey, userFeatures);

    // Show/hide nav items
    if (reg.navItems) {
      reg.navItems.forEach(function(navId) {
        var el = document.getElementById(navId);
        if (el) {
          el.style.display = isActive ? '' : 'none';
          el.setAttribute('data-feature', featureKey);
          el.setAttribute('data-feature-active', isActive);
        }
      });
    }

    // Show/hide tab panels
    if (reg.tabs) {
      reg.tabs.forEach(function(tabId) {
        var el = document.getElementById(tabId);
        if (el) {
          el.style.display = isActive ? '' : 'none';
          el.setAttribute('data-feature', featureKey);
          el.setAttribute('data-feature-active', isActive);
        }
      });
    }

    // Handle elements with data-feature attribute
    document.querySelectorAll('[data-requires-feature="' + featureKey + '"]').forEach(function(el) {
      el.style.display = isActive ? '' : 'none';
    });
  });

  // Add locked overlays to disabled features
  addLockedOverlays(userFeatures);

  console.log('✅ Feature access applied');
}


// ============================================================
// ADD LOCKED OVERLAYS
// Shows "Upgrade to unlock" for inactive features
// ============================================================
function addLockedOverlays(userFeatures) {
  Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
    var reg = FEATURE_REGISTRY[featureKey];
    if (reg.alwaysActive) return;

    var isActive = userFeatures.indexOf(featureKey) !== -1;
    if (isActive) return;

    // Find any element with data-feature-lockable attribute
    document.querySelectorAll('[data-feature-lockable="' + featureKey + '"]').forEach(function(el) {
      // Don't add if already has overlay
      if (el.querySelector('.feature-locked-overlay')) return;

      el.style.position = 'relative';
      el.style.overflow = 'hidden';

      var overlay = document.createElement('div');
      overlay.className = 'feature-locked-overlay';
      overlay.style.cssText = 'position:absolute;inset:0;background:rgba(255,255,255,.92);' +
        'backdrop-filter:blur(4px);display:flex;flex-direction:column;align-items:center;' +
        'justify-content:center;z-index:100;border-radius:inherit;cursor:pointer';

      overlay.innerHTML = '' +
        '<div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#0d4a5c,#1a8ba8);' +
          'display:flex;align-items:center;justify-content:center;margin-bottom:14px;' +
          'box-shadow:0 6px 20px rgba(26,139,168,.3)">' +
          '<i class="fas fa-lock" style="color:#fff;font-size:1.4rem"></i>' +
        '</div>' +
        '<div style="font-size:1rem;font-weight:800;color:#0d4a5c;margin-bottom:6px">' +
          reg.name +
        '</div>' +
        '<div style="font-size:.82rem;color:#5a8a96;margin-bottom:16px;text-align:center;max-width:250px">' +
          'This feature is not included in your current package.' +
        '</div>' +
        '<button onclick="requestFeatureUpgrade(\'' + featureKey + '\')" ' +
          'style="padding:10px 24px;background:linear-gradient(135deg,#f59e0b,#d97706);' +
          'color:#fff;border:none;border-radius:10px;font-weight:700;font-size:.85rem;' +
          'cursor:pointer;font-family:inherit;box-shadow:0 4px 12px rgba(245,158,11,.3);' +
          'transition:transform .2s">' +
          '<i class="fas fa-arrow-up" style="margin-right:6px"></i> Upgrade to Unlock' +
        '</button>';

      overlay.onclick = function(e) {
        if (e.target.tagName !== 'BUTTON') {
          requestFeatureUpgrade(featureKey);
        }
      };

      el.appendChild(overlay);
    });
  });
}


// ============================================================
// REQUEST FEATURE UPGRADE
// Called when user clicks "Upgrade to Unlock"
// ============================================================
function requestFeatureUpgrade(featureKey) {
  var reg = FEATURE_REGISTRY[featureKey];
  if (!reg) return;

    var price = {
    mobile_app: 349,
    procure_ai: 399,
    pos_system: 799,
    menu_master: 349,
    functions_ai: 449
  };

  var amount = price[featureKey] || 0;

  var confirmed = confirm(
    'Upgrade to ' + reg.name + '?\n\n' +
    'Additional cost: R' + amount + '/month\n\n' +
    'This will be added to your monthly subscription.\n' +
    'Click OK to proceed or contact us at 079 044 0508.'
  );

  if (confirmed) {
    // Option 1: Redirect to signup with feature pre-selected
    window.location.href = 'signup.html?features=' + featureKey;

    // Option 2: If you want to handle it via WhatsApp
    // window.open('https://wa.me/27790440508?text=Hi%2C%20I%20want%20to%20add%20' +
    //   encodeURIComponent(reg.name) + '%20to%20my%20package', '_blank');
  }
}


// ============================================================
// ROUTE GUARD
// Prevents access to routes the user hasn't paid for
// Call this on page/route change
// ============================================================
function guardRoute(route, userFeatures) {
  var allowed = false;

  Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
    var reg = FEATURE_REGISTRY[featureKey];
    if (!reg.appRoutes) return;

    var isActive = isFeatureActive(featureKey, userFeatures);
    if (!isActive) return;

    reg.appRoutes.forEach(function(r) {
      if (route === r || route.startsWith(r + '/')) {
        allowed = true;
      }
    });
  });

  // Always allow base BOH routes
  var bohRoutes = ['/', '/dashboard', '/stock', '/suppliers', '/settings'];
  bohRoutes.forEach(function(r) {
    if (route === r || route.startsWith(r + '/')) allowed = true;
  });

  if (!allowed) {
    console.warn('🚫 Access denied for route:', route);
    showFeatureBlockedMessage(route);
    return false;
  }

  return true;
}


// ============================================================
// SHOW BLOCKED MESSAGE
// ============================================================
function showFeatureBlockedMessage(route) {
  // Find which feature this route belongs to
  var blockedFeature = null;
  Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
    var reg = FEATURE_REGISTRY[featureKey];
    if (!reg.appRoutes) return;
    reg.appRoutes.forEach(function(r) {
      if (route === r || route.startsWith(r + '/')) {
        blockedFeature = featureKey;
      }
    });
  });

  if (blockedFeature) {
    var reg = FEATURE_REGISTRY[blockedFeature];
    alert(
      '🔒 ' + reg.name + ' is not included in your package.\n\n' +
      'Contact us at 079 044 0508 or upgrade your package to access this feature.'
    );
  }
}


// ============================================================
// GET FEATURE SUMMARY
// Returns object showing what's active/inactive
// Useful for displaying in settings or profile page
// ============================================================
function getFeatureSummary(userFeatures) {
  var summary = {};

  Object.keys(FEATURE_REGISTRY).forEach(function(featureKey) {
    var reg = FEATURE_REGISTRY[featureKey];
    summary[featureKey] = {
      name: reg.name,
      active: isFeatureActive(featureKey, userFeatures),
      alwaysIncluded: reg.alwaysActive || false,
            price: {
        web_boh: 799,
        mobile_app: 349,
        procure_ai: 399,
        pos_system: 799,
        menu_master: 349,
        functions_ai: 449
      }[featureKey] || 0
    };
  });

  return summary;
}


// ============================================================
// RENDER FEATURE STATUS WIDGET
// Shows the user their active/inactive features
// Paste element with id="feature-status-widget" in your app
// ============================================================
function renderFeatureStatusWidget(userFeatures) {
  var widget = document.getElementById('feature-status-widget');
  if (!widget) return;

  var summary = getFeatureSummary(userFeatures);
  var html = '<div style="background:#fff;border-radius:14px;padding:20px;box-shadow:0 4px 20px rgba(13,74,92,.08)">';
  html += '<div style="font-size:.92rem;font-weight:700;color:#0d4a5c;margin-bottom:14px;display:flex;align-items:center;gap:8px">' +
    '<i class="fas fa-puzzle-piece" style="color:#1a8ba8"></i> Your Package</div>';

  Object.keys(summary).forEach(function(key) {
    var feat = summary[key];
    var active = feat.active;
    var icon = active ? 'fa-check-circle' : 'fa-lock';
    var color = active ? '#2ea871' : '#c4dde4';
    var textColor = active ? '#0d4a5c' : '#8aabb5';
    var badge = feat.alwaysIncluded ? '<span style="font-size:.6rem;background:rgba(46,168,113,.1);color:#2ea871;padding:2px 8px;border-radius:6px;font-weight:700;margin-left:8px">INCLUDED</span>' : '';

    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f7f9">';
    html += '<div style="display:flex;align-items:center;gap:10px">';
    html += '<i class="fas ' + icon + '" style="color:' + color + ';font-size:1rem"></i>';
    html += '<span style="font-size:.85rem;font-weight:600;color:' + textColor + '">' + feat.name + badge + '</span>';
    html += '</div>';

    if (!active && !feat.alwaysIncluded) {
      html += '<button onclick="requestFeatureUpgrade(\'' + key + '\')" ' +
        'style="padding:5px 14px;background:#f59e0b;color:#fff;border:none;border-radius:8px;' +
        'font-size:.72rem;font-weight:700;cursor:pointer;font-family:inherit">' +
        '+R' + feat.price + '/mo</button>';
    } else if (active) {
      html += '<span style="font-size:.75rem;color:#2ea871;font-weight:600">Active</span>';
    }

    html += '</div>';
  });

  html += '</div>';
  widget.innerHTML = html;
}


// ============================================================
// INITIALIZATION
// Call this when your app loads (after user authentication)
// ============================================================
function initFeatureAccess() {
  getUserFeatures(function(features) {
    applyFeatureAccess(features);
    renderFeatureStatusWidget(features);
    console.log('🔐 Feature access system initialized');
    console.log('📋 Active features:', features);
  });
}


// ============================================================
// LOG
// ============================================================
console.log('🔐 Feature Access System — Loaded');
console.log('🔐 Call initFeatureAccess() after user login');
