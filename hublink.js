/* ============================================================
   hublink.js — StockAI-Pro Data Bridge v4.0
   Include in hub.html: <script src="/hublink.js"></script>
   This file provides shared functions + data contracts
   between hub.html and all front-end files
============================================================ */

window.HUBLINK = {

    // ── Config ──
    ADMIN_EMAIL: 'cidraism@gmail.com',
    PORTAL_URL:  'https://www.stockai-pro.co.za/portal.html',
    APP_URL:     'https://www.stockai-pro.co.za/hub.html',
    PROXY_URL:   'https://bold-dust-c51b.cidraism.workers.dev/',

    // ── Feature catalogue ──
    FEATURES: {
        web_boh:         { name:'Web App B.O.H',      price:799,  always:true,  free:false },
        mobile_app:      { name:'Mobile App',          price:0,    always:false, free:true  },
        procure_ai:      { name:'ProcureAI App',       price:0,    always:false, free:true  },
        pos_system:      { name:'P.O.S System',        price:799,  always:false, free:false },
        menu_master:     { name:'Menu Master',         price:349,  always:false, free:false },
        functions_ai:    { name:'FunctionsAI',         price:449,  always:false, free:false },
        retail_pos:      { name:'Retail POS',          price:999,  always:false, free:false },
        production:      { name:'Production Manager',  price:449,  always:false, free:false },
        invoice_scanner: { name:'Invoice Scanner',     price:499,  always:false, free:false },
        ai_brain:        { name:'AI Brain + Nikki',    price:499,  always:false, free:false },
        pos_builder:     { name:'POS Builder',         price:0,    always:false, free:false,
                           freeWith:['pos_system','retail_pos'] },
        cashup_pro:      { name:'CashUp-Pro',          price:0,    always:false, free:false,
                           freeWith:['pos_system','retail_pos'] },
        item_pro:        { name:'ItemPro',             price:0,    always:false, free:false,
                           freeWith:['retail_pos'] }
    },

    // ── SSO: Read shared session written by hub ──
    // Called by pos.html, kitchen.html, supplier.html to skip login
    readSharedSession: function() {
        try {
            var raw = sessionStorage.getItem('sso_session');
            if (!raw) return null;
            var s = JSON.parse(raw);
            if (s && s.valid && s.accountId) return s;
            return null;
        } catch(e) { return null; }
    },

    // ── Get features for entity ──
    getEntityFeatures: function(accountData, entityId) {
        var entities = accountData.entities || [];
        var entity   = entities.find(function(e) { return e.id === entityId; });
        if (!entity) return ['web_boh','mobile_app','procure_ai'];

        var features = (entity.features || ['web_boh']).slice();
        if (features.indexOf('mobile_app') === -1) features.push('mobile_app');
        if (features.indexOf('procure_ai') === -1) features.push('procure_ai');
        if (features.indexOf('web_boh')    === -1) features.unshift('web_boh');

        var hasPOS = features.indexOf('pos_system') !== -1 ||
                     features.indexOf('retail_pos') !== -1;
        if (hasPOS) {
            if (features.indexOf('pos_builder') === -1) features.push('pos_builder');
            if (features.indexOf('cashup_pro')  === -1) features.push('cashup_pro');
        }
        if (features.indexOf('retail_pos') !== -1) {
            if (features.indexOf('item_pro') === -1) features.push('item_pro');
        }
        return features;
    },

    // ── Check entity access ──
    // Returns: { allowed:bool, reason:string }
    checkEntityAccess: function(accountData, entityId) {
        if (accountData.accountStatus === 'suspended') {
            return {
                allowed: false,
                reason:  'Account suspended: ' +
                          (accountData.suspendedReason || 'Contact support')
            };
        }
        var entity = (accountData.entities || []).find(function(e) {
            return e.id === entityId;
        });
        if (!entity) return { allowed: false, reason: 'Entity not found' };
        if (entity.status === 'inactive') {
            return { allowed: false, reason: 'Entity is not activated' };
        }
        if (entity.paymentStatus === 'unpaid') {
            return { allowed: false, reason: 'Payment required' };
        }
        return { allowed: true, reason: 'ok' };
    },

    // ── Fast account lookup via userMappings ──
    getAccountId: function(db, uid, callback) {
        db.collection('userMappings').doc(uid).get()
            .then(function(mapDoc) {
                if (mapDoc.exists && mapDoc.data().accountId) {
                    callback(null, mapDoc.data().accountId);
                } else {
                    callback(null, null);
                }
            })
            .catch(function(err) { callback(err, null); });
    },

    // ── Build quote link ──
    buildQuoteLink: function(customerData, features, entities) {
        var base   = 'https://www.stockai-pro.co.za/quote-builder.html';
        var params = new URLSearchParams();
        params.set('name',     customerData.name     || '');
        params.set('email',    customerData.email    || '');
        params.set('phone',    customerData.phone    || '');
        params.set('business', customerData.business || '');
        params.set('ref',      'QR-' + Date.now().toString(36).toUpperCase());
        if (features && features.length) params.set('features', features.join(','));
        if (entities && entities > 1) params.set('entities', String(entities));
        return base + '?' + params.toString();
    },

    // ── URL builders ──
    getPOSUrl:           function() { return '/pos.html'; },
    getPOSSetupUrl:      function() { return '/pos-setup.html'; },
    getKitchenUrl:       function() { return '/kitchen.html'; },
    getSupplierUrl:      function() { return '/supplier.html'; },
    getTableBillUrl: function(accountId, entityId, tableNumber) {
        return '/table.html?a=' + accountId +
               '&e=' + entityId + '&t=' + tableNumber;
    },
    getUpgradeUrl: function(accountId, entityIdx) {
        return '/upgrade.html?accountId=' + accountId +
               '&entityIdx=' + (entityIdx || 0);
    },
    getPortalUrl: function() { return '/portal.html'; },
    getHubUrl:    function() { return '/hub.html'; },

    // ── Activate entity ──
    activateEntity: function(db, accountId, entityIdx, adminName) {
        return db.collection('accounts').doc(accountId).get()
            .then(function(doc) {
                if (!doc.exists) throw new Error('Account not found');
                var data     = doc.data();
                var entities = data.entities || [];
                if (!entities[entityIdx]) throw new Error('Entity not found');

                entities[entityIdx].status        = 'active';
                entities[entityIdx].paymentStatus  = 'paid';
                entities[entityIdx].activatedAt    = new Date().toISOString();
                if (!entities[entityIdx].features ||
                    !entities[entityIdx].features.length) {
                    entities[entityIdx].features =
                        ['web_boh','mobile_app','procure_ai'];
                }

                return db.collection('accounts').doc(accountId).update({
                    entities:      entities,
                    lastUpdated:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdatedBy: adminName || 'Hub',
                    statusHistory:
                        firebase.firestore.FieldValue.arrayUnion({
                            action: 'entity_activated',
                            date:   new Date().toISOString(),
                            by:     adminName || 'Hub',
                            reason: 'Activated via Hub'
                        })
                });
            });
    },

    // ── Deactivate entity ──
    deactivateEntity: function(db, accountId, entityIdx, reason, adminName) {
        return db.collection('accounts').doc(accountId).get()
            .then(function(doc) {
                if (!doc.exists) throw new Error('Account not found');
                var data     = doc.data();
                var entities = data.entities || [];
                if (!entities[entityIdx]) throw new Error('Entity not found');

                entities[entityIdx].status        = 'inactive';
                entities[entityIdx].paymentStatus  = 'unpaid';
                entities[entityIdx].deactivatedAt  = new Date().toISOString();

                return db.collection('accounts').doc(accountId).update({
                    entities:      entities,
                    lastUpdated:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdatedBy: adminName || 'Hub',
                    statusHistory:
                        firebase.firestore.FieldValue.arrayUnion({
                            action: 'entity_deactivated',
                            date:   new Date().toISOString(),
                            by:     adminName || 'Hub',
                            reason: reason || 'Deactivated'
                        })
                });
            });
    },

    // ── Suspend account ──
    suspendAccount: function(db, accountId, reason, adminName) {
        return db.collection('accounts').doc(accountId).update({
            accountStatus:   'suspended',
            suspendedReason: reason || 'Account suspended',
            suspendedAt:     new Date().toISOString(),
            suspendedBy:     adminName || 'Hub',
            lastUpdated:
                firebase.firestore.FieldValue.serverTimestamp(),
            statusHistory:
                firebase.firestore.FieldValue.arrayUnion({
                    action: 'account_suspended',
                    date:   new Date().toISOString(),
                    by:     adminName || 'Hub',
                    reason: reason || 'Suspended'
                })
        });
    },

    // ── Reinstate account ──
    reinstateAccount: function(db, accountId, adminName) {
        return db.collection('accounts').doc(accountId).update({
            accountStatus:  'active',
            suspendedReason: null,
            reinstatedAt:   new Date().toISOString(),
            lastUpdated:
                firebase.firestore.FieldValue.serverTimestamp(),
            statusHistory:
                firebase.firestore.FieldValue.arrayUnion({
                    action: 'account_reinstated',
                    date:   new Date().toISOString(),
                    by:     adminName || 'Hub',
                    reason: 'Reinstated'
                })
        });
    },

    // ── Toggle feature ──
    toggleEntityFeature: function(db, accountId, entityIdx,
                                   featureKey, enable, adminName) {
        return db.collection('accounts').doc(accountId).get()
            .then(function(doc) {
                if (!doc.exists) throw new Error('Account not found');
                var data     = doc.data();
                var entities = data.entities || [];
                var ent      = entities[entityIdx];
                if (!ent) throw new Error('Entity not found');

                var features =
                    (ent.features || ['web_boh']).slice();

                // Always keep base features
                ['web_boh','mobile_app','procure_ai'].forEach(function(f) {
                    if (features.indexOf(f) === -1) features.push(f);
                });

                if (enable) {
                    if (features.indexOf(featureKey) === -1)
                        features.push(featureKey);
                    if (featureKey === 'pos_system' ||
                        featureKey === 'retail_pos') {
                        if (features.indexOf('pos_builder') === -1)
                            features.push('pos_builder');
                        if (features.indexOf('cashup_pro')  === -1)
                            features.push('cashup_pro');
                    }
                    if (featureKey === 'retail_pos') {
                        if (features.indexOf('item_pro') === -1)
                            features.push('item_pro');
                    }
                } else {
                    if (featureKey === 'web_boh'    ||
                        featureKey === 'mobile_app' ||
                        featureKey === 'procure_ai') return Promise.resolve();

                    features = features.filter(function(f) {
                        return f !== featureKey;
                    });

                    var hasPOS = features.indexOf('pos_system') !== -1 ||
                                 features.indexOf('retail_pos')  !== -1;
                    if (!hasPOS) {
                        features = features.filter(function(f) {
                            return f !== 'pos_builder' &&
                                   f !== 'cashup_pro';
                        });
                    }
                    if (features.indexOf('retail_pos') === -1) {
                        features = features.filter(function(f) {
                            return f !== 'item_pro';
                        });
                    }
                }

                entities[entityIdx].features = features;

                return db.collection('accounts').doc(accountId).update({
                    entities:      entities,
                    lastUpdated:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdatedBy: adminName || 'Hub',
                    statusHistory:
                        firebase.firestore.FieldValue.arrayUnion({
                            action: enable ? 'feature_enabled'
                                           : 'feature_disabled',
                            date:   new Date().toISOString(),
                            by:     adminName || 'Hub',
                            reason: (enable ? 'Enabled: ' : 'Disabled: ') +
                                    featureKey
                        })
                });
            });
    },

    // ── Navigation map ──
    FEATURE_NAV_MAP: {
        'dashboard':       ['web_boh'],
        'stock-items':     ['web_boh'],
        'suppliers':       ['web_boh'],
        'stock-count':     ['web_boh'],
        'purchase-orders': ['web_boh'],
        'grv':             ['web_boh'],
        'reports':         ['web_boh'],
        'food-cost':       ['web_boh'],
        'month-end':       ['web_boh'],
        'settings':        ['web_boh'],
        'pos':             ['pos_system'],
        'pos-builder':     ['pos_system','retail_pos'],
        'cashup':          ['pos_system','retail_pos'],
        'retail-pos':      ['retail_pos'],
        'menu-master':     ['menu_master'],
        'functions-ai':    ['functions_ai'],
        'production':      ['production'],
        'invoice-scanner': ['invoice_scanner'],
        'ai-brain':        ['ai_brain'],
        'mobile-app':      ['mobile_app'],
        'procure-ai':      ['procure_ai'],
        'item-pro':        ['item_pro']
    },

    isNavVisible: function(navKey, features) {
        var required = this.FEATURE_NAV_MAP[navKey];
        if (!required) return true;
        return required.some(function(req) {
            return features.indexOf(req) !== -1;
        });
    }
};

// Make read session available globally
window.readSharedSession  = window.HUBLINK.readSharedSession;
window.writeSharedSession = window.writeSharedSession || function() {};

console.log('✅ HubLink v4.0 loaded');
console.log('🔗 ' + Object.keys(HUBLINK.FEATURES).length + ' features registered');
console.log('🗺️ ' + Object.keys(HUBLINK.FEATURE_NAV_MAP).length + ' nav items mapped');
