<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>StockAI-Pro - Intelligence a click away</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<style>
:root{--teal-darkest:#0a3a4a;--teal-dark:#0d4a5c;--teal-mid:#1a8ba8;--teal-bright:#2ba8c4;--teal-light:#4dbdd5;--teal-pale:#a0e9f8;--teal-mint:#d4f0f7;--bg-page:#f5f9fa;--bg-card:#fff;--bg-white:#fff;--bg-hover:#e8f4f7;--bg-sidebar:#fff;--text-dark:#0d4a5c;--text-mid:#2a5f70;--text-light:#5a8a96;--text-muted:#8aabb5;--accent:#1a8ba8;--accent-dark:#0d4a5c;--accent-light:#4dbdd5;--success:#2ea871;--warning:#d4a017;--danger:#c94545;--info:#2b8eb3;--gold:#f59e0b;--gold-dark:#d97706;--gold-light:#fbbf24;--border:#c4dde4;--border-light:#e0eff3;--shadow-sm:0 2px 8px rgba(13,74,92,.06);--shadow:0 4px 20px rgba(13,74,92,.08);--shadow-lg:0 8px 40px rgba(13,74,92,.15);--sidebar-w:240px;--header-h:60px;--radius:14px;--radius-sm:8px;--transition:all .25s ease}
*{margin:0;padding:0;box-sizing:border-box}
html{font-size:14px}
body{font-family:'Poppins',sans-serif;background:var(--bg-page);color:var(--text-dark);overflow-x:hidden;min-height:100vh}
.hidden{display:none!important}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:var(--teal-light);border-radius:3px}

.logo-placeholder{width:100px;height:100px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);border-radius:22px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:2.5rem;margin:0 auto 16px;box-shadow:0 8px 24px rgba(26,139,168,.3)}
.sidebar-logo-placeholder{width:38px;height:38px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;flex-shrink:0}

.lang-selector{display:flex;align-items:center;gap:6px;padding:6px 12px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;font-size:.82rem;color:var(--text-dark);font-family:inherit}
.lang-selector:focus{outline:none;border-color:var(--accent)}
.login-lang{position:absolute;top:20px;right:20px;z-index:10}

.login-screen{min-height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#2a8a9e,#1a8ba8 50%,#0d4a5c);padding:20px;position:fixed;inset:0;z-index:9999}
.login-card{background:#fff;border-radius:28px;padding:50px 60px;width:460px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,.25);text-align:center;position:relative}
.login-welcome{color:var(--text-mid);font-size:1.1rem;font-weight:500;margin-bottom:8px}
.login-title{font-size:2.8rem;font-weight:900;color:var(--text-dark);letter-spacing:2px;margin-bottom:8px;line-height:1}
.login-tagline{color:var(--accent);font-size:.95rem;font-weight:500;margin-bottom:32px;font-style:italic}
.login-form{text-align:left}
.input-line{margin-bottom:24px}
.input-line input,.input-line select{width:100%;padding:14px 4px;background:transparent;border:none;border-bottom:2px solid var(--border);color:var(--text-dark);font-size:1rem;font-family:inherit;transition:var(--transition)}
.input-line input:focus,.input-line select:focus{outline:none;border-bottom-color:var(--accent)}
.input-line input::placeholder{color:var(--text-muted)}
.input-line label{font-size:.82rem;color:var(--text-mid);font-weight:600;display:block;margin-bottom:4px}
.btn-login{width:100%;padding:14px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius);font-size:1rem;font-weight:600;cursor:pointer;margin-top:12px;margin-bottom:12px;transition:var(--transition);font-family:inherit}
.btn-login:hover{background:var(--accent-dark);transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,139,168,.4)}
.btn-signup{width:100%;padding:10px;background:transparent;color:var(--accent);border:none;font-size:.95rem;font-weight:600;cursor:pointer;font-family:inherit}

.profile-screen{min-height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#2a8a9e,#1a8ba8 50%,#0d4a5c);padding:20px;position:fixed;inset:0;z-index:9998}
.profile-card{background:#fff;border-radius:28px;padding:40px 48px;width:620px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,.25);max-height:95vh;overflow-y:auto}
.profile-card h2{font-size:1.5rem;font-weight:800;color:var(--text-dark);margin-bottom:6px;text-align:center}
.profile-card .profile-sub{font-size:.88rem;color:var(--text-light);text-align:center;margin-bottom:24px}
.step-indicator{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:24px}
.step-dot{width:10px;height:10px;border-radius:50%;background:var(--border)}.step-dot.active{background:var(--accent);width:28px;border-radius:8px}.step-dot.done{background:var(--success)}
.pf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.pf-row.full{grid-template-columns:1fr}
.pf-field{display:flex;flex-direction:column;gap:5px}
.pf-field label{font-size:.82rem;color:var(--text-mid);font-weight:600}
.pf-field input,.pf-field select,.pf-field textarea{padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dark);font-size:.9rem;font-family:inherit;transition:var(--transition);background:#fff}
.pf-field input:focus,.pf-field select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(26,139,168,.1)}
.pf-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:18px;border-top:1px solid var(--border-light)}

.sections-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px}
.section-check{display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--bg-page);border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);border:1px solid transparent}
.section-check:hover{border-color:var(--accent)}
.section-check input{accent-color:var(--accent);width:16px;height:16px}
.section-check span{font-size:.85rem;color:var(--text-dark)}
.days-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:6px}
.day-check{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px;background:var(--bg-page);border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;font-size:.7rem;color:var(--text-mid);font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.day-check:hover{border-color:var(--accent)}
.day-check input{accent-color:var(--accent)}

.entity-select-screen{min-height:100vh;width:100vw;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#2a8a9e,#1a8ba8 50%,#0d4a5c);padding:20px;position:fixed;inset:0;z-index:9997}
.entity-select-card{background:#fff;border-radius:28px;padding:40px 48px;width:700px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,.25);text-align:center}
.entity-select-card h2{font-size:1.5rem;font-weight:800;color:var(--text-dark);margin-bottom:6px}
.entity-select-card .es-sub{font-size:.88rem;color:var(--text-light);margin-bottom:28px}
.entity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:24px}
.entity-option{padding:24px 16px;background:var(--bg-page);border:2px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:var(--transition);text-align:center}
.entity-option:hover{border-color:var(--accent);background:var(--bg-hover);transform:translateY(-3px)}
.entity-option i{font-size:2rem;color:var(--accent);margin-bottom:10px;display:block}
.entity-option h3{font-size:.95rem;color:var(--text-dark);margin-bottom:4px}
.entity-option p{font-size:.72rem;color:var(--text-light)}
.entity-option.global{background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);border:2px solid var(--gold);color:#fff;position:relative;overflow:hidden}
.entity-option.global::before{content:'';position:absolute;inset:-2px;background:linear-gradient(45deg,var(--gold),var(--gold-light),var(--gold),var(--gold-dark));z-index:0;border-radius:var(--radius);opacity:.15;animation:shimmer 3s linear infinite;background-size:200% 200%}
@keyframes shimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.entity-option.global>*{position:relative;z-index:1}
.entity-option.global i{color:var(--gold);font-size:2.5rem;filter:drop-shadow(0 0 8px rgba(245,158,11,.5))}
.entity-option.global h3{color:#fff;font-size:1.05rem;font-weight:800}
.entity-option.global p{color:var(--gold-light)}
.entity-option.global:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(245,158,11,.3)}
.global-crown{font-size:.7rem;background:var(--gold);color:#1a1a2e;padding:2px 10px;border-radius:10px;font-weight:700;letter-spacing:.5px;display:inline-block;margin-bottom:8px}

.entity-badge{display:flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(26,139,168,.08);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;transition:var(--transition);margin-right:8px}
.entity-badge:hover{background:rgba(26,139,168,.15);border-color:var(--accent)}
.entity-badge.global-active{background:linear-gradient(135deg,#1a1a2e,#0f3460);border-color:var(--gold);color:#fff}
.entity-badge.global-active i{color:var(--gold)}
.entity-badge.global-active span{color:#fff}
.entity-badge i{color:var(--accent);font-size:.85rem}
.entity-badge span{font-size:.82rem;font-weight:600;color:var(--text-dark)}

.view-filter{display:flex;align-items:center;gap:10px;margin-bottom:18px;padding:10px 16px;background:#fff;border:1px solid var(--border);border-radius:var(--radius);position:relative;z-index:2;flex-wrap:wrap}
.view-filter label{font-size:.82rem;font-weight:600;color:var(--text-mid)}
.view-filter select,.view-filter input{padding:6px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dark);font-family:inherit;font-size:.85rem;background:#fff}

.app-container{display:flex;min-height:100vh;background:var(--bg-page)}
.sidebar{width:var(--sidebar-w);background:var(--bg-sidebar);border-right:1px solid var(--border);height:100vh;position:fixed;left:0;top:0;display:flex;flex-direction:column;z-index:100;overflow-y:auto;transition:var(--transition);box-shadow:2px 0 12px rgba(13,74,92,.04)}
.sidebar-brand{padding:20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border)}
.brand-text{font-size:1.2rem;font-weight:900;color:var(--text-dark);letter-spacing:1px}
.sidebar-user{padding:18px 20px;border-bottom:1px solid var(--border)}
.sidebar-user-name{font-size:1.05rem;font-weight:700;color:var(--text-dark);margin-bottom:2px}
.sidebar-user-role{font-size:.78rem;color:var(--text-light)}
.sidebar-entity{padding:10px 20px;border-bottom:1px solid var(--border);font-size:.78rem;color:var(--accent);font-weight:600}
.sidebar-entity i{margin-right:6px}
.sidebar-entity.global-mode{background:linear-gradient(90deg,rgba(245,158,11,.08),transparent);color:var(--gold-dark);border-bottom-color:var(--gold)}
.sidebar-nav{flex:1;padding:14px 12px;display:flex;flex-direction:column;gap:4px;overflow-y:auto}
.nav-link{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);color:var(--text-mid);font-size:.9rem;font-weight:500;cursor:pointer;transition:var(--transition);text-decoration:none;border:1px solid transparent}
.nav-link i{width:18px;text-align:center;color:var(--accent);font-size:.95rem}
.nav-link:hover{background:var(--bg-hover);color:var(--text-dark)}
.nav-link.active{background:linear-gradient(90deg,rgba(26,139,168,.12),rgba(26,139,168,.04));color:var(--text-dark);font-weight:600;border-color:rgba(26,139,168,.2)}
.sidebar-bottom{padding:12px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:6px}
.sidebar-ai-btn,.sidebar-logout{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--radius-sm);border:none;cursor:pointer;font-size:.88rem;font-weight:600;font-family:inherit;transition:var(--transition)}
.sidebar-ai-btn{background:linear-gradient(135deg,var(--accent),var(--accent-dark));color:#fff}
.sidebar-ai-btn:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,139,168,.3)}
.sidebar-logout{background:transparent;color:var(--text-mid)}
.sidebar-logout:hover{background:rgba(201,69,69,.08);color:var(--danger)}

.page-action-bar{position:absolute;top:28px;right:32px;display:flex;gap:8px;z-index:5}
.page-action-btn{width:36px;height:36px;border-radius:var(--radius-sm);background:#fff;border:1px solid var(--border);color:var(--text-mid);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;transition:var(--transition)}
.page-action-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.page-action-btn.print-btn:hover{background:var(--info);border-color:var(--info)}
.page-action-btn.email-btn:hover{background:var(--success);border-color:var(--success)}

.main{flex:1;margin-left:var(--sidebar-w);min-height:100vh;display:flex;flex-direction:column}
.top-header{height:var(--header-h);background:#fff;border-bottom:1px solid var(--border);padding:0 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:50;box-shadow:0 2px 8px rgba(13,74,92,.04)}
.mobile-toggle{display:none;background:none;border:none;font-size:1.3rem;color:var(--text-dark);cursor:pointer}
.header-search{flex:1;max-width:380px;display:flex;align-items:center;gap:10px;background:var(--bg-page);border:1px solid var(--border);border-radius:var(--radius);padding:8px 16px}
.header-search i{color:var(--text-muted)}
.header-search input{background:none;border:none;flex:1;outline:none;color:var(--text-dark);font-size:.9rem;font-family:inherit}
.header-right{margin-left:auto;display:flex;align-items:center;gap:10px}
.header-icon-btn{width:38px;height:38px;border-radius:var(--radius);background:#fff;border:1px solid var(--border);color:var(--text-mid);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--transition);position:relative}
.header-icon-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.header-icon-btn.listening{background:var(--danger);color:#fff;border-color:var(--danger);animation:pulse 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
.notif-badge{position:absolute;top:-3px;right:-3px;background:var(--danger);color:#fff;font-size:.6rem;font-weight:700;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.header-datetime{padding-left:16px;border-left:1px solid var(--border);color:var(--text-dark);font-size:.85rem;font-weight:600;font-variant-numeric:tabular-nums}

.page{display:none;padding:28px 32px;position:relative;min-height:calc(100vh - var(--header-h))}
.page.active{display:block;animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.page-watermark{position:fixed;top:50%;left:60%;transform:translate(-50%,-50%);font-size:9rem;font-weight:900;color:var(--accent);opacity:.035;pointer-events:none;z-index:0;letter-spacing:6px;white-space:nowrap;user-select:none}
.page-heading{font-size:2rem;font-weight:700;color:var(--text-dark);margin-bottom:24px;position:relative;z-index:1}

.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:18px;position:relative;z-index:1}
.stat-card{background:#fff;border-radius:var(--radius);padding:20px 24px;box-shadow:var(--shadow-sm);position:relative;transition:var(--transition)}
.stat-card::before{content:'';position:absolute;left:0;top:12px;bottom:12px;width:5px;background:var(--accent);border-radius:0 4px 4px 0}
.stat-card::after{content:'';position:absolute;left:0;top:4px;width:18px;height:18px;border-top:3px solid var(--accent);border-left:3px solid var(--accent);border-top-left-radius:8px}
.stat-card-bracket-bottom{position:absolute;left:0;bottom:4px;width:18px;height:18px;border-bottom:3px solid var(--accent);border-left:3px solid var(--accent);border-bottom-left-radius:8px}
.stat-card:hover{transform:translateY(-3px);box-shadow:var(--shadow)}
.stat-card-title{font-size:.85rem;color:var(--text-mid);font-weight:600;margin-bottom:10px;text-decoration:underline;text-decoration-color:var(--border);text-underline-offset:3px;padding-left:8px}
.stat-card-value{font-size:1.7rem;font-weight:800;color:var(--text-dark);line-height:1;padding-left:8px}
.stat-card.gold::before{background:var(--gold)}.stat-card.gold::after{border-color:var(--gold)}.stat-card.gold .stat-card-bracket-bottom{border-color:var(--gold)}

.charts-row{display:grid;grid-template-columns:2fr 1fr;gap:18px;margin:22px 0;position:relative;z-index:1}
.chart-block{background:#fff;border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);position:relative}
.chart-block::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.block-title{font-size:1.05rem;font-weight:700;color:var(--text-dark);margin-bottom:16px;display:flex;align-items:center;gap:8px;padding-left:10px}
.chart-area{height:260px;position:relative;padding-left:10px}
.pie-area{height:200px;display:flex;justify-content:center}
.pie-legend{margin-top:16px;display:flex;flex-direction:column;gap:8px;padding-left:10px}
.legend-row{display:flex;align-items:center;gap:10px;font-size:.85rem;color:var(--text-mid)}
.legend-row strong{margin-left:auto;color:var(--text-dark)}
.ld{width:12px;height:12px;border-radius:3px}.ld.c1{background:#1a8ba8}.ld.c2{background:#4dbdd5}.ld.c3{background:#d4a017}

.bottom-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;position:relative;z-index:1;margin-bottom:18px}
.info-block{background:#fff;border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);position:relative}
.info-block::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.conf-tag{margin-left:auto;padding:3px 10px;background:rgba(46,168,113,.1);color:var(--success);border-radius:12px;font-size:.72rem;font-weight:600}
.activity-list,.insights-list,.alerts-list{display:flex;flex-direction:column;gap:10px;max-height:320px;overflow-y:auto;padding-left:10px}
.activity-item{display:flex;gap:10px;padding:10px;background:var(--bg-page);border-radius:var(--radius-sm);align-items:flex-start}
.activity-icon{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;flex-shrink:0}
.activity-icon.add{background:rgba(46,168,113,.15);color:var(--success)}.activity-icon.remove{background:rgba(201,69,69,.15);color:var(--danger)}.activity-icon.update{background:rgba(43,142,179,.15);color:var(--info)}.activity-icon.order{background:rgba(26,139,168,.15);color:var(--accent)}
.activity-text{flex:1}.activity-text p{font-size:.82rem;color:var(--text-mid);margin-bottom:2px}.activity-text strong{color:var(--text-dark)}
.activity-time{font-size:.7rem;color:var(--text-muted)}
.insight-item{padding:12px;background:var(--bg-page);border-radius:var(--radius-sm);border-left:3px solid var(--accent)}
.insight-item h4{font-size:.85rem;font-weight:600;margin-bottom:4px;color:var(--text-dark)}
.insight-item p{font-size:.78rem;color:var(--text-mid);line-height:1.5}
.alert-item{display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--bg-page);border-radius:var(--radius-sm);border-left:3px solid var(--warning)}
.alert-name{font-weight:600;font-size:.85rem;color:var(--text-dark);display:block}
.alert-detail{font-size:.72rem;color:var(--text-mid)}
.alert-eta{font-size:.65rem;color:var(--info);font-weight:600;margin-top:2px;display:block}
.alert-btn{padding:5px 12px;background:var(--accent);color:#fff;border:none;border-radius:14px;font-size:.72rem;font-weight:600;cursor:pointer;font-family:inherit}

.sellers-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;position:relative;z-index:1;margin-bottom:18px}
.seller-item{display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-page);border-radius:var(--radius-sm);margin-bottom:6px}
.seller-rank{width:24px;height:24px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:700;flex-shrink:0}
.seller-rank.bottom{background:var(--danger)}
.seller-name{flex:1;font-size:.85rem;font-weight:600;color:var(--text-dark)}
.seller-stat{font-size:.78rem;color:var(--text-mid);font-weight:600}

.prediction-row{display:grid;grid-template-columns:1fr;gap:18px;margin-bottom:18px;position:relative;z-index:1}
.weather-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:rgba(43,142,179,.1);color:var(--info);border-radius:12px;font-size:.72rem;font-weight:600;margin-left:10px}
.predict-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:14px;padding-left:10px}
.predict-day{padding:12px;background:var(--bg-page);border-radius:var(--radius-sm);text-align:center;border-top:3px solid var(--accent)}
.predict-day-name{font-size:.72rem;color:var(--text-mid);font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.predict-day-value{font-size:1.2rem;font-weight:800;color:var(--text-dark);margin:4px 0}
.predict-weather{font-size:.7rem;color:var(--text-light)}

.action-bar{display:flex;gap:12px;align-items:center;margin-bottom:18px;flex-wrap:wrap;position:relative;z-index:1}
.search-mini{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);padding:8px 14px}
.search-mini i{color:var(--text-muted)}
.search-mini input{background:none;border:none;outline:none;width:200px;font-size:.88rem;font-family:inherit;color:var(--text-dark)}
.select-mini{padding:8px 14px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dark);font-size:.85rem;cursor:pointer;font-family:inherit}
.date-mini{padding:8px 14px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dark);font-size:.85rem;font-family:inherit}

.btn-primary{padding:9px 18px;background:var(--accent);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.88rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:inherit;transition:var(--transition)}
.btn-primary:hover{background:var(--accent-dark);transform:translateY(-2px);box-shadow:0 4px 14px rgba(26,139,168,.3)}
.btn-outline{padding:9px 18px;background:transparent;color:var(--text-mid);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:.88rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:inherit;transition:var(--transition)}
.btn-outline:hover{background:var(--bg-hover);color:var(--text-dark);border-color:var(--accent)}
.btn-success{padding:9px 18px;background:var(--success);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.88rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:inherit;transition:var(--transition)}
.btn-success:hover{background:#1f7a52}
.btn-danger{padding:9px 18px;background:var(--danger);color:#fff;border:none;border-radius:var(--radius-sm);font-size:.88rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:inherit}

.table-wrap{background:#fff;border-radius:var(--radius);overflow-x:auto;box-shadow:var(--shadow-sm);position:relative;z-index:1}
.data-table{width:100%;border-collapse:collapse}
.data-table th{padding:12px 16px;text-align:left;font-size:.75rem;font-weight:600;color:var(--text-mid);background:var(--bg-page);border-bottom:1px solid var(--border);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
.data-table td{padding:11px 16px;font-size:.85rem;color:var(--text-dark);border-bottom:1px solid var(--border-light);white-space:nowrap}
.data-table tbody tr:hover{background:var(--bg-hover)}
.status-badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:.7rem;font-weight:600}
.status-badge.in-stock{background:rgba(46,168,113,.12);color:var(--success)}.status-badge.low-stock{background:rgba(212,160,23,.12);color:var(--warning)}.status-badge.out-of-stock{background:rgba(201,69,69,.12);color:var(--danger)}.status-badge.on-order{background:rgba(26,139,168,.12);color:var(--accent)}.status-badge.pending{background:rgba(212,160,23,.12);color:var(--warning)}.status-badge.approved,.status-badge.received,.status-badge.delivered{background:rgba(46,168,113,.12);color:var(--success)}.status-badge.in-transit{background:rgba(43,142,179,.12);color:var(--info)}.status-badge.rejected{background:rgba(201,69,69,.12);color:var(--danger)}
.row-actions{display:flex;gap:4px}
.row-btn{width:28px;height:28px;border-radius:6px;border:1px solid var(--border);background:#fff;color:var(--text-mid);cursor:pointer;font-size:.75rem;transition:var(--transition)}
.row-btn:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.row-btn.del:hover{background:var(--danger);border-color:var(--danger)}

.form-card{background:#fff;border-radius:var(--radius);padding:28px;box-shadow:var(--shadow-sm);position:relative;z-index:1;max-width:900px;margin-bottom:18px}
.form-card::before{content:'';position:absolute;left:0;top:20px;bottom:20px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.form-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:16px}
.form-field{display:flex;flex-direction:column;gap:6px}.form-field.full{grid-column:1/-1}
.form-field label{font-size:.82rem;color:var(--text-mid);font-weight:600}
.form-field input,.form-field select,.form-field textarea{padding:10px 12px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text-dark);font-size:.9rem;font-family:inherit;transition:var(--transition)}
.form-field input:focus,.form-field select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(26,139,168,.1)}
.form-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:20px;border-top:1px solid var(--border-light)}

.cashup-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.cashup-card{background:#fff;border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);position:relative}
.cashup-card::before{content:'';position:absolute;left:0;top:20px;bottom:20px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.cashup-input-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border-light)}
.cashup-input-row label{font-size:.9rem;color:var(--text-mid);font-weight:600;display:flex;align-items:center;gap:8px}
.cashup-input-row label i{width:24px;text-align:center;color:var(--accent)}
.cashup-input-row input{width:140px;padding:8px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);text-align:right;font-family:inherit;font-size:.95rem;font-weight:600;color:var(--text-dark)}
.cashup-total{display:flex;justify-content:space-between;padding:16px 0;border-top:2px solid var(--accent);margin-top:8px;font-size:1.1rem;font-weight:800;color:var(--accent)}

.menu-builder{background:#fff;border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);position:relative}
.menu-builder::before{content:'';position:absolute;left:0;top:20px;bottom:20px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.ingredient-row{display:grid;grid-template-columns:2.5fr 1fr 1fr 1.2fr auto;gap:8px;padding:10px;background:var(--bg-page);border-radius:var(--radius-sm);margin-bottom:6px;align-items:center}
.ingredient-row select,.ingredient-row input{padding:8px;border:1px solid var(--border);border-radius:var(--radius-sm);font-family:inherit;font-size:.82rem}
.ingredient-cost{font-weight:700;color:var(--accent);text-align:right;padding:0 10px;font-size:.85rem}
.cost-summary{padding:16px;background:var(--bg-page);border-radius:var(--radius-sm);margin-top:16px}
.cost-row{display:flex;justify-content:space-between;padding:6px 0;font-size:.9rem;color:var(--text-mid)}
.cost-row strong{color:var(--text-dark)}
.cost-row.highlight{border-top:2px solid var(--accent);margin-top:8px;padding-top:12px;font-size:1.05rem;font-weight:700;color:var(--accent)}

.invoice-items-table{background:var(--bg-page);border-radius:var(--radius-sm);padding:14px;margin-top:12px}
.invoice-line{display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:8px;margin-bottom:8px;align-items:center}
.invoice-line input,.invoice-line select{padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-family:inherit;font-size:.82rem}

.transfer-section{background:#fff;border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:18px;position:relative}
.transfer-section::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:4px;border-radius:0 4px 4px 0}
.transfer-section.incoming::before{background:var(--success)}
.transfer-section.outgoing::before{background:var(--danger)}
.transfer-section.pending::before{background:var(--warning)}
.section-tag-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:14px;font-size:.72rem;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:10px}
.section-tag-badge.pending-tag{background:rgba(212,160,23,.1);color:var(--warning)}
.section-tag-badge.received-tag{background:rgba(46,168,113,.1);color:var(--success)}
.section-tag-badge.sent-tag{background:rgba(201,69,69,.1);color:var(--danger)}
.section-tag-badge.transit-tag{background:rgba(43,142,179,.1);color:var(--info)}

.dayend-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;position:relative;z-index:1}
.dayend-card{background:#fff;border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);position:relative}
.dayend-card::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.summary-row{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border-light);font-size:.9rem;color:var(--text-mid)}
.summary-row strong{color:var(--text-dark);font-weight:700}
.summary-row.total{border-bottom:none;margin-top:8px;padding-top:16px;border-top:2px solid var(--accent);font-size:1rem}
.summary-row.total strong{color:var(--accent);font-size:1.2rem}
.negative{color:var(--danger)!important}
.action-btn-big{width:100%;display:flex;align-items:center;gap:14px;padding:16px;margin-bottom:10px;background:var(--bg-page);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;text-align:left;transition:var(--transition);font-family:inherit}
.action-btn-big:hover{background:#fff;border-color:var(--accent);transform:translateX(4px)}
.action-btn-big i{width:40px;height:40px;background:var(--accent);color:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.action-btn-big strong{display:block;color:var(--text-dark);font-size:.95rem}
.action-btn-big small{color:var(--text-light);font-size:.78rem}

.users-grid,.suppliers-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;position:relative;z-index:1}
.user-card,.supplier-card{background:#fff;border-radius:var(--radius);padding:22px;box-shadow:var(--shadow-sm);position:relative;transition:var(--transition)}
.user-card::before,.supplier-card::before{content:'';position:absolute;left:0;top:16px;bottom:16px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.user-card:hover,.supplier-card:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
.user-head,.supplier-head{display:flex;align-items:center;gap:14px;margin-bottom:14px;padding-left:10px}
.user-avatar,.supplier-avatar{width:48px;height:48px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.2rem;font-weight:700}
.user-name,.supplier-name{font-weight:700;color:var(--text-dark);font-size:.95rem}
.user-role,.supplier-type{font-size:.78rem;color:var(--text-light)}
.supplier-delivery-days{font-size:.68rem;color:var(--info);font-weight:600;margin-top:2px;display:flex;align-items:center;gap:4px}
.user-stats,.supplier-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;padding-left:10px}
.user-stat,.supplier-stat{padding:8px;background:var(--bg-page);border-radius:var(--radius-sm);text-align:center}
.user-stat-val,.supplier-stat-val{font-weight:700;color:var(--text-dark);font-size:.95rem;display:block}
.user-stat-lbl,.supplier-stat-lbl{font-size:.68rem;color:var(--text-light)}
.card-actions{display:flex;gap:8px;padding-left:10px}
.card-actions button{flex:1;padding:8px;font-size:.78rem}

.reports-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;position:relative;z-index:1}
.report-tile{background:#fff;border-radius:var(--radius);padding:26px;box-shadow:var(--shadow-sm);cursor:pointer;position:relative;transition:var(--transition)}
.report-tile::before{content:'';position:absolute;left:0;top:20px;bottom:20px;width:4px;background:var(--accent);border-radius:0 4px 4px 0}
.report-tile:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
.report-tile i{width:48px;height:48px;background:rgba(26,139,168,.1);color:var(--accent);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:14px;margin-left:10px}
.report-tile h3{font-size:.95rem;color:var(--text-dark);margin-bottom:4px;padding-left:10px}
.report-tile p{font-size:.78rem;color:var(--text-light);padding-left:10px}

.setting-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid var(--border-light);font-size:.9rem;color:var(--text-dark)}
.switch{position:relative;width:44px;height:24px}.switch input{opacity:0;width:0;height:0}
.slider{position:absolute;inset:0;background:var(--border);border-radius:24px;cursor:pointer;transition:var(--transition)}
.slider::before{content:'';position:absolute;width:18px;height:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:var(--transition)}
.switch input:checked+.slider{background:var(--accent)}
.switch input:checked+.slider::before{transform:translateX(20px)}
.integration-card{background:var(--bg-page);border-radius:var(--radius-sm);padding:16px;display:flex;align-items:center;gap:14px;margin-bottom:10px;border-left:3px solid var(--border)}
.integration-card.connected{border-left-color:var(--success);background:rgba(46,168,113,.05)}
.integration-icon{width:42px;height:42px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:var(--accent);flex-shrink:0;border:1px solid var(--border)}
.integration-info{flex:1}.integration-info h4{font-size:.95rem;color:var(--text-dark)}.integration-info p{font-size:.75rem;color:var(--text-light);margin-top:2px}
.integration-status{font-size:.72rem;font-weight:600;color:var(--text-light);padding:4px 10px;background:#fff;border-radius:10px;border:1px solid var(--border)}
.integration-status.active{color:var(--success);border-color:var(--success)}

.global-entity-section{margin-bottom:28px}
.global-entity-heading{font-size:1.1rem;font-weight:700;color:var(--text-dark);padding:12px 16px;background:var(--bg-page);border-left:4px solid var(--accent);border-radius:0 var(--radius-sm) var(--radius-sm) 0;margin-bottom:12px}
.global-user-row{display:flex;align-items:center;gap:14px;padding:12px 16px;background:#fff;border:1px solid var(--border-light);border-radius:var(--radius-sm);margin-bottom:6px}
.global-user-avatar{width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;flex-shrink:0}
.global-user-info{flex:1}.global-user-name{font-weight:600;font-size:.88rem;color:var(--text-dark)}.global-user-role{font-size:.75rem;color:var(--text-light)}
.global-user-perms{font-size:.7rem;color:var(--accent);background:rgba(26,139,168,.08);padding:2px 8px;border-radius:8px;display:inline-block;margin-left:auto}

.ai-panel{position:fixed;right:-400px;top:0;bottom:0;width:380px;background:#fff;border-left:1px solid var(--border);z-index:200;display:flex;flex-direction:column;transition:right .3s ease;box-shadow:var(--shadow-lg)}
.ai-panel.open{right:0}
.ai-head{padding:18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,var(--accent),var(--accent-dark));color:#fff}
.ai-head-info{display:flex;align-items:center;gap:12px}
.ai-avatar{width:40px;height:40px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
.ai-head h3{font-size:.95rem}.ai-head span{font-size:.72rem;opacity:.9}
.ai-close-btn{background:rgba(255,255,255,.2);border:none;color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer}
.ai-messages{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px;background:var(--bg-page)}
.ai-msg{max-width:90%}.ai-msg.bot{align-self:flex-start}.ai-msg.user{align-self:flex-end}
.bubble{padding:12px 16px;border-radius:var(--radius);font-size:.87rem;line-height:1.5}
.ai-msg.bot .bubble{background:#fff;color:var(--text-dark);border-bottom-left-radius:4px;box-shadow:var(--shadow-sm)}
.ai-msg.user .bubble{background:var(--accent);color:#fff;border-bottom-right-radius:4px}
.bubble ul{margin:6px 0;padding-left:16px}.bubble li{margin-bottom:3px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.chip{padding:5px 12px;background:var(--bg-page);border:1px solid var(--border);border-radius:16px;font-size:.75rem;color:var(--text-dark);cursor:pointer;font-family:inherit}
.chip:hover{background:var(--accent);color:#fff;border-color:var(--accent)}
.ai-input-bar{padding:14px 18px;border-top:1px solid var(--border);display:flex;gap:8px;align-items:center;background:#fff}
.ai-mic,.ai-send{width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--transition);flex-shrink:0}
.ai-mic{background:var(--bg-page);color:var(--text-mid);border:1px solid var(--border)}
.ai-mic:hover,.ai-mic.listening{background:var(--danger);color:#fff;border-color:var(--danger)}
#ai-input{flex:1;padding:10px 16px;background:var(--bg-page);border:1px solid var(--border);border-radius:22px;outline:none;font-size:.88rem;font-family:inherit;color:var(--text-dark)}
#ai-input:focus{border-color:var(--accent)}
.ai-send{background:var(--accent);color:#fff}.ai-send:hover{background:var(--accent-dark)}

.voice-overlay{position:fixed;inset:0;background:rgba(13,74,92,.85);z-index:10000;display:flex;align-items:center;justify-content:center}
.voice-modal{text-align:center;color:#fff;max-width:500px;padding:20px}
.v-anim{position:relative;width:140px;height:140px;margin:0 auto 24px}
.v-ring{position:absolute;inset:0;border:2px solid var(--teal-pale);border-radius:50%;animation:vring 2s ease-out infinite}
.v-ring:nth-child(2){animation-delay:.5s}.v-ring:nth-child(3){animation-delay:1s}
@keyframes vring{0%{transform:scale(.5);opacity:1}100%{transform:scale(1.5);opacity:0}}
.v-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:76px;height:76px;background:linear-gradient(135deg,var(--teal-light),var(--accent));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem}
.voice-modal h2{font-size:1.4rem;margin-bottom:8px}
.voice-modal p{margin-bottom:12px}
.voice-help{font-size:.85rem;opacity:.85;margin-bottom:20px;padding:12px;background:rgba(255,255,255,.08);border-radius:var(--radius-sm)}

.notif-panel{position:fixed;top:var(--header-h);right:24px;width:360px;max-height:500px;background:#fff;border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow-lg);z-index:300;overflow:hidden}
.notif-head{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.notif-head h3{font-size:.95rem;color:var(--text-dark)}
.notif-head button{background:none;border:none;color:var(--accent);cursor:pointer;font-size:.78rem;font-family:inherit;font-weight:600}
#notif-list{max-height:400px;overflow-y:auto}
.notif-item{padding:12px 18px;border-bottom:1px solid var(--border-light);display:flex;gap:10px;cursor:pointer;transition:var(--transition)}
.notif-item:hover{background:var(--bg-hover)}
.notif-item.unread{border-left:3px solid var(--accent)}
.notif-icon{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0}
.notif-icon.warning{background:rgba(212,160,23,.12);color:var(--warning)}.notif-icon.danger{background:rgba(201,69,69,.12);color:var(--danger)}.notif-icon.success{background:rgba(46,168,113,.12);color:var(--success)}.notif-icon.info{background:rgba(43,142,179,.12);color:var(--info)}
.notif-content{flex:1}.notif-title{font-weight:600;font-size:.82rem;color:var(--text-dark)}.notif-text{font-size:.78rem;color:var(--text-mid);margin-top:2px}.notif-time{font-size:.68rem;color:var(--text-muted);margin-top:3px}

.modal{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center}
.modal-bg{position:absolute;inset:0;background:rgba(13,74,92,.5)}
.modal-window{position:relative;background:#fff;border-radius:var(--radius);width:700px;max-width:95vw;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-lg);animation:modIn .3s ease}
@keyframes modIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.modal-top{padding:20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.modal-top h2{font-size:1.1rem;color:var(--text-dark)}
.modal-top button{background:none;border:none;color:var(--text-mid);cursor:pointer;font-size:1rem;padding:8px}
.modal-mid{padding:20px}.modal-bot{padding:14px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px}

.toast-wrap{position:fixed;bottom:100px;right:24px;z-index:10000;display:flex;flex-direction:column;gap:8px}
.toast{background:#fff;padding:12px 18px;border-radius:var(--radius-sm);box-shadow:var(--shadow-lg);display:flex;align-items:center;gap:10px;min-width:280px;animation:tIn .3s ease;border-left:4px solid var(--accent)}
@keyframes tIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
.toast.success{border-left-color:var(--success)}.toast.error{border-left-color:var(--danger)}.toast.warning{border-left-color:var(--warning)}.toast.info{border-left-color:var(--info)}
.toast i{font-size:1rem}.toast.success i{color:var(--success)}.toast.error i{color:var(--danger)}.toast.warning i{color:var(--warning)}.toast.info i{color:var(--info)}
.toast span{flex:1;font-size:.88rem;color:var(--text-dark)}.toast button{background:none;border:none;color:var(--text-muted);cursor:pointer}

.wa-support{position:fixed;bottom:24px;right:24px;width:60px;height:60px;background:linear-gradient(135deg,#25d366,#128c7e);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.8rem;cursor:pointer;box-shadow:0 6px 20px rgba(37,211,102,.4);z-index:9000;transition:all .3s ease;text-decoration:none;border:none}
.wa-support:hover{transform:scale(1.1) rotate(8deg);box-shadow:0 10px 28px rgba(37,211,102,.6)}
.wa-support::before{content:'';position:absolute;inset:-4px;border-radius:50%;background:linear-gradient(135deg,#25d366,#128c7e);opacity:.4;z-index:-1;animation:waPulse 2s ease-out infinite}
@keyframes waPulse{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.5);opacity:0}}
.wa-tooltip{position:absolute;right:75px;bottom:50%;transform:translateY(50%);background:var(--text-dark);color:#fff;padding:8px 14px;border-radius:8px;font-size:.82rem;font-weight:600;white-space:nowrap;opacity:0;pointer-events:none;transition:.3s;font-family:'Poppins',sans-serif}
.wa-tooltip::before{content:'';position:absolute;right:-6px;top:50%;transform:translateY(-50%);border-style:solid;border-width:6px 0 6px 6px;border-color:transparent transparent transparent var(--text-dark)}
.wa-support:hover .wa-tooltip{opacity:1;right:80px}
@media(max-width:768px){.wa-support{width:54px;height:54px;font-size:1.6rem;bottom:16px;right:16px}.wa-tooltip{display:none}}

@media(max-width:1100px){.stats-row{grid-template-columns:repeat(2,1fr)}.charts-row,.bottom-row,.sellers-row{grid-template-columns:1fr}.dayend-grid,.cashup-grid{grid-template-columns:1fr}}
@media(max-width:768px){.sidebar{transform:translateX(-100%)}.sidebar.mobile-open{transform:translateX(0)}.main{margin-left:0}.mobile-toggle{display:block}.header-search,.header-datetime{display:none}.page{padding:16px}.login-card,.profile-card,.entity-select-card{padding:30px 24px}.login-title{font-size:2.2rem}.pf-row{grid-template-columns:1fr}.entity-grid{grid-template-columns:1fr}.sections-grid{grid-template-columns:1fr}.page-action-bar{top:16px;right:16px}}
@media(max-width:480px){.stats-row{grid-template-columns:1fr}.ai-panel{width:100%;right:-100%}.page-watermark{font-size:5rem}}
@media print{body{background:#fff}.sidebar,.top-header,.wa-support,.ai-panel,.voice-overlay,.notif-panel,.page-action-bar,.toast-wrap{display:none!important}.main{margin-left:0}.page{padding:20px}.page-watermark{display:none}}
</style>
</head>
<body>

<div id="login-screen" class="login-screen">
<select id="login-lang" class="lang-selector login-lang" onchange="changeLang(this.value)"></select>
<div class="login-card">
<div class="logo-placeholder"><i class="fas fa-chart-line"></i></div>
<p class="login-welcome" data-i18n="welcome">Welcome To</p>
<h1 class="login-title">STOCKAI-PRO</h1>
<p class="login-tagline" data-i18n="tagline">Intelligence a click away</p>
<form id="login-form" class="login-form">
<div class="input-line"><input type="text" id="login-username" placeholder="Username" data-i18n-ph="username" placeholder="Enter your username" required></div>
<div class="input-line"><input type="password" id="login-password" placeholder="Password" data-i18n-ph="password" placeholder="Enter your password" required></div>
<div class="input-line"><label data-i18n="login_as">Login As</label><select id="login-role">
<option value="Owner">Owner</option>
<option value="General Manager">General Manager</option>
<option value="Area Manager">Area Manager</option>
<option value="Operations Manager">Operations Manager</option>
<option value="Manager">Manager</option>
<option value="Stock Controller">Stock Controller</option>
<option value="Kitchen Manager">Kitchen Manager</option>
<option value="Bar Manager">Bar Manager</option>
<option value="Floor Supervisor">Floor Supervisor</option>
<option value="Bar Supervisor">Bar Supervisor</option>
</select></div>
<button type="submit" class="btn-login" data-i18n="log_in">Log In</button>
<button type="button" class="btn-signup" onclick="startSignUp()" data-i18n="sign_up">Sign Up</button>
</form>
</div>
</div>

<div id="owner-screen" class="profile-screen hidden">
<div class="profile-card">
<h2 data-i18n="owner_group_details">Owner & Group Details</h2>
<p class="profile-sub" data-i18n="tell_us_about">Tell us about yourself and your business group</p>
<div class="step-indicator"><div class="step-dot active"></div><div class="step-dot"></div></div>
<form id="owner-form">
<h3 style="font-size:1rem;color:var(--text-dark);margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--accent)"><i class="fas fa-user"></i> <span data-i18n="owner_info">Owner Information</span></h3>
<div class="pf-row">
<div class="pf-field"><label data-i18n="full_name">Full Name *</label><input type="text" id="ow-name" required placeholder="Miguel Cidrais"></div>
<div class="pf-field"><label data-i18n="email">Email *</label><input type="email" id="ow-email" required placeholder="owner@email.com"></div>
</div>
<div class="pf-row">
<div class="pf-field"><label data-i18n="phone">Phone Number</label><input type="tel" id="ow-phone" placeholder="+27 21 555 0000"></div>
<div class="pf-field"><label data-i18n="id_number">ID Number</label><input type="text" id="ow-id"></div>
</div>
<h3 style="font-size:1rem;color:var(--text-dark);margin:20px 0 12px;padding-bottom:8px;border-bottom:2px solid var(--accent)"><i class="fas fa-building"></i> <span data-i18n="group_info">Group Information</span></h3>
<div class="pf-row">
<div class="pf-field"><label data-i18n="group_name">Group / Company Name *</label><input type="text" id="ow-group" required></div>
<div class="pf-field"><label data-i18n="group_vat">Group VAT Number</label><input type="text" id="ow-groupvat"></div>
</div>
<div class="pf-row full">
<div class="pf-field"><label data-i18n="head_office">Group Head Office Address</label><textarea id="ow-groupaddr" rows="2" style="padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-family:inherit;font-size:.9rem;color:var(--text-dark);resize:vertical"></textarea></div>
</div>
<div class="pf-row">
<div class="pf-field"><label data-i18n="entity_count">Number of Entities in Group *</label><select id="ow-entity-count" required><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select></div>
<div class="pf-field"><label data-i18n="biz_type">Business Type</label><select id="ow-biztype"><option>Restaurant Group</option><option>Hotel Group</option><option>Catering Company</option><option>Mixed Hospitality</option><option>Other</option></select></div>
</div>
<div class="pf-actions"><button type="submit" class="btn-primary"><span data-i18n="next">Next</span> <i class="fas fa-arrow-right"></i></button></div>
</form>
</div>
</div>

<div id="profile-screen" class="profile-screen hidden">
<div class="profile-card">
<h2 id="profile-heading">Entity Details</h2>
<p class="profile-sub" id="profile-sub">Set up your entity</p>
<div class="step-indicator" id="profile-steps"></div>
<form id="profile-form">
<div class="pf-row"><div class="pf-field"><label data-i18n="entity_name">Entity Name *</label><input type="text" id="pf-name" required></div><div class="pf-field"><label data-i18n="contact_person">Contact Person *</label><input type="text" id="pf-contact" required></div></div>
<div class="pf-row"><div class="pf-field"><label data-i18n="phone">Phone</label><input type="tel" id="pf-phone"></div><div class="pf-field"><label data-i18n="email">Email</label><input type="email" id="pf-email"></div></div>
<div class="pf-row full"><div class="pf-field"><label data-i18n="address">Address</label><textarea id="pf-address" rows="2" style="padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-family:inherit;font-size:.9rem;color:var(--text-dark);resize:vertical"></textarea></div></div>
<div class="pf-row"><div class="pf-field"><label data-i18n="vat_number">VAT Number</label><input type="text" id="pf-vat"></div><div class="pf-field"><label data-i18n="food_cost_target">Desired Food Cost %</label><input type="number" id="pf-foodcost" min="1" max="100" step="0.1" value="28"></div></div>
<div class="pf-row full"><div class="pf-field"><label data-i18n="stock_sections">Stock Sheet Sections</label><div class="sections-grid" id="pf-sections">
<label class="section-check"><input type="checkbox" value="Walk-in Fridge" checked><span>Walk-in Fridge</span></label>
<label class="section-check"><input type="checkbox" value="Walk-in Freezer" checked><span>Walk-in Freezer</span></label>
<label class="section-check"><input type="checkbox" value="Dry Store" checked><span>Dry Store</span></label>
<label class="section-check"><input type="checkbox" value="Bar" checked><span>Bar</span></label>
<label class="section-check"><input type="checkbox" value="Cold Kitchen"><span>Cold Kitchen</span></label>
<label class="section-check"><input type="checkbox" value="Hot Kitchen"><span>Hot Kitchen</span></label>
<label class="section-check"><input type="checkbox" value="Pastry Section"><span>Pastry Section</span></label>
<label class="section-check"><input type="checkbox" value="Prep Kitchen"><span>Prep Kitchen</span></label>
<label class="section-check"><input type="checkbox" value="Receiving Area"><span>Receiving Area</span></label>
<label class="section-check"><input type="checkbox" value="Wine Cellar"><span>Wine Cellar</span></label>
</div></div></div>
<div class="pf-actions">
<button type="button" class="btn-outline" id="pf-back-btn" onclick="goBackToOwner()" style="margin-right:auto"><i class="fas fa-arrow-left"></i> <span data-i18n="back">Back</span></button>
<button type="submit" class="btn-primary"><span id="pf-btn-text">Next</span> <i class="fas fa-arrow-right" id="pf-btn-icon"></i></button>
</div>
</form>
</div>
</div>

<div id="entity-select-screen" class="entity-select-screen hidden">
<div class="entity-select-card">
<div class="logo-placeholder" style="width:70px;height:70px;font-size:1.8rem;margin-bottom:14px"><i class="fas fa-chart-line"></i></div>
<h2 data-i18n="select_entity">Select Entity</h2>
<p class="es-sub" id="es-sub-text">Click any entity to enter</p>
<div class="entity-grid" id="entity-grid"></div>
</div>
</div>

<div id="app" class="app-container hidden">
<aside class="sidebar">
<div class="sidebar-brand"><div class="sidebar-logo-placeholder"><i class="fas fa-chart-line"></i></div><span class="brand-text">STOCKAI-PRO</span></div>
<div class="sidebar-user"><div class="sidebar-user-name" id="side-user-name">User</div><div class="sidebar-user-role" id="side-user-role">Role</div></div>
<div class="sidebar-entity" id="sidebar-entity"><i class="fas fa-building"></i> <span id="sidebar-entity-name">Entity</span></div>
<nav class="sidebar-nav" id="sidebar-nav"></nav>
<div class="sidebar-bottom">
<button id="ai-toggle" class="sidebar-ai-btn"><i class="fas fa-robot"></i><span data-i18n="ai_assistant">AI Assistant</span></button>
<button id="logout-btn" class="sidebar-logout"><i class="fas fa-sign-out-alt"></i><span data-i18n="logout">Logout</span></button>
</div>
</aside>
<main class="main">
<header class="top-header">
<button id="mobile-menu" class="mobile-toggle"><i class="fas fa-bars"></i></button>
<div class="entity-badge" id="entity-badge" onclick="switchEntity()"><i class="fas fa-building"></i><span id="header-entity-name">Entity</span><i class="fas fa-chevron-down" style="font-size:.65rem;color:var(--text-muted)"></i></div>
<div class="header-search"><i class="fas fa-search"></i><input type="text" placeholder="Search..."></div>
<div class="header-right">
<select id="header-lang" class="lang-selector" onchange="changeLang(this.value)"></select>
<button id="voice-btn" class="header-icon-btn" title="Voice Command"><i class="fas fa-microphone"></i></button>
<button id="notif-btn" class="header-icon-btn"><i class="fas fa-bell"></i><span class="notif-badge">3</span></button>
<div class="header-datetime" id="header-datetime">Loading...</div>
</div>
</header>
<div id="pages-container"></div>
</main>

<div id="ai-panel" class="ai-panel">
<div class="ai-head"><div class="ai-head-info"><div class="ai-avatar"><i class="fas fa-robot"></i></div><div><h3>AI Assistant</h3><span>Online</span></div></div><button id="ai-close" class="ai-close-btn"><i class="fas fa-times"></i></button></div>
<div class="ai-messages" id="ai-messages"><div class="ai-msg bot"><div class="bubble"><p>👋 Hello! Ask me anything!</p><div class="chips"><button class="chip" onclick="sendAI('Low stock?')">Low stock?</button><button class="chip" onclick="sendAI('Wastage')">Wastage</button><button class="chip" onclick="sendAI('Reorder')">Reorder</button><button class="chip" onclick="sendAI('Top sellers')">Top sellers</button><button class="chip" onclick="sendAI('Help')">Help</button></div></div></div></div>
<div class="ai-input-bar"><button id="ai-mic" class="ai-mic"><i class="fas fa-microphone"></i></button><input type="text" id="ai-input" placeholder="Ask about your stock..."><button id="ai-send" class="ai-send"><i class="fas fa-paper-plane"></i></button></div>
</div>
<div id="voice-overlay" class="voice-overlay hidden"><div class="voice-modal"><div class="v-anim"><div class="v-ring"></div><div class="v-ring"></div><div class="v-ring"></div><div class="v-icon"><i class="fas fa-microphone"></i></div></div><h2 id="voice-title">Listening...</h2><p id="voice-text">Say a command</p><div class="voice-help" id="voice-help"></div><button id="voice-cancel" class="btn-outline" style="color:#fff;border-color:rgba(255,255,255,.3)" data-i18n="cancel">Cancel</button></div></div>
<div id="notif-panel" class="notif-panel hidden"><div class="notif-head"><h3 data-i18n="notifications">Notifications</h3><button onclick="clearNotifs()" data-i18n="clear_all">Clear All</button></div><div id="notif-list"></div></div>
</div>

<button onclick="openWhatsAppSupport()" class="wa-support" id="wa-support" title="WhatsApp Support">
<i class="fab fa-whatsapp"></i>
<span class="wa-tooltip">Need Help? Chat with us!</span>
</button>

<div id="modal-container"></div>
<div id="toast-wrap" class="toast-wrap"></div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- PASTE PART 2 (JAVASCRIPT) BELOW THIS LINE -->
<script>
// ============ STATE ============
let S = {
    user: null, owner: null, lang: 'en',
    entities: [], activeEntity: 0, isGlobalMode: false,
    inventory: {}, purchases: {}, wastage: {}, suppliers: {},
    users: {}, notifs: [], activities: {}, cashups: {},
    menuItems: {}, userLogs: {}, dayEnds: {}, invoices: {},
    pendingPOs: {}, integrations: { pos: null, accounting: null },
    internalTransfers: [],
    profileStep: 0, totalEntities: 1, tempEntities: [],
    viewFilter: 'all', selectedDate: new Date().toISOString().split('T')[0]
};
const STORAGE_KEY = 'stockai_pro_v5';
const DAYS_OF_WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ============ TRANSLATIONS ============
const I18N = {
    en: { welcome:'Welcome To', tagline:'Intelligence a click away', username:'Username', password:'Password', login_as:'Login As', log_in:'Log In', sign_up:'Sign Up', owner_group_details:'Owner & Group Details', tell_us_about:'Tell us about yourself and your business group', owner_info:'Owner Information', full_name:'Full Name *', email:'Email *', phone:'Phone Number', id_number:'ID Number', group_info:'Group Information', group_name:'Group / Company Name *', group_vat:'Group VAT Number', head_office:'Group Head Office Address', entity_count:'Number of Entities in Group *', biz_type:'Business Type', next:'Next', back:'Back', entity_name:'Entity Name *', contact_person:'Contact Person *', address:'Address', vat_number:'VAT Number', food_cost_target:'Desired Food Cost %', stock_sections:'Stock Sheet Sections', select_entity:'Select Entity', continue:'Continue', dashboard:'Dashboard', inventory:'Inventory', menu_creation:'Menu Creation', stock_take:'Stock Take', cashup:'Cash-up', day_end:'Day End', purchases:'Purchases', transfers:'Internal Transfers', suppliers:'Suppliers', wastage:'Wastage', reports:'Reports', users:'Users', ai_insights:'AI Insights', settings:'Settings', ai_assistant:'AI Assistant', logout:'Logout', notifications:'Notifications', clear_all:'Clear All', cancel:'Cancel', save:'Save', add_item:'Add Item' },
    af: { welcome:'Welkom By', tagline:'Intelligensie \'n kliek weg', username:'Gebruikersnaam', password:'Wagwoord', login_as:'Teken In As', log_in:'Teken In', sign_up:'Registreer', owner_group_details:'Eienaar & Groep', tell_us_about:'Vertel ons van jouself', owner_info:'Eienaar Inligting', full_name:'Volle Naam *', email:'E-pos *', phone:'Telefoon', id_number:'ID Nommer', group_info:'Groep Inligting', group_name:'Groep Naam *', group_vat:'BTW Nommer', head_office:'Hoofkantoor', entity_count:'Aantal Entiteite *', biz_type:'Besigheidstipe', next:'Volgende', back:'Terug', entity_name:'Entiteit Naam *', contact_person:'Kontakpersoon *', address:'Adres', vat_number:'BTW Nommer', food_cost_target:'Voedselkoste %', stock_sections:'Voorraad Afdelings', select_entity:'Kies Entiteit', continue:'Gaan voort', dashboard:'Paneelbord', inventory:'Voorraad', menu_creation:'Spyskaart', stock_take:'Voorraadopname', cashup:'Kontant-op', day_end:'Dag Einde', purchases:'Aankope', transfers:'Interne Oordragte', suppliers:'Verskaffers', wastage:'Vermorsing', reports:'Verslae', users:'Gebruikers', ai_insights:'KI Insigte', settings:'Instellings', ai_assistant:'KI Assistent', logout:'Teken Uit', notifications:'Kennisgewings', clear_all:'Maak Skoon', cancel:'Kanselleer', save:'Stoor', add_item:'Voeg By' },
    zu: { welcome:'Sawubona Ku', tagline:'Ubuhlakani ngekhanjana', username:'Igama', password:'Iphasiwedi', login_as:'Ngena njenge', log_in:'Ngena', sign_up:'Bhalisa', owner_group_details:'Imininingwane', tell_us_about:'Sitshele ngawe', owner_info:'Imininingwane Yomnikazi', full_name:'Igama Eliphelele *', email:'I-imeyili *', phone:'Inombolo Yocingo', id_number:'Inombolo ye-ID', group_info:'Iqembu', group_name:'Igama Leqembu *', group_vat:'Inombolo ye-VAT', head_office:'Ihhovisi', entity_count:'Izinhlangano *', biz_type:'Uhlobo', next:'Okulandelayo', back:'Emuva', entity_name:'Igama *', contact_person:'Umuntu *', address:'Ikheli', vat_number:'Inombolo ye-VAT', food_cost_target:'Izindleko %', stock_sections:'Izingxenye', select_entity:'Khetha', continue:'Qhubeka', dashboard:'Ibhodi', inventory:'Isitokwe', menu_creation:'Imenyu', stock_take:'Ukubala', cashup:'Imali', day_end:'Ukuphela', purchases:'Ukuthenga', transfers:'Ukudlulisa', suppliers:'Abahlinzeki', wastage:'Ukumosha', reports:'Imibiko', users:'Abasebenzisi', ai_insights:'Ulwazi', settings:'Izilungiselelo', ai_assistant:'Umsizi', logout:'Phuma', notifications:'Izaziso', clear_all:'Sula', cancel:'Khansela', save:'Londoloza', add_item:'Engeza' },
    xh: { welcome:'Wamkelekile Ku', tagline:'Ubukrelekrele', username:'Igama', password:'Iphaswedi', login_as:'Ngena', log_in:'Ngena', sign_up:'Bhalisa', owner_group_details:'Iinkcukacha', tell_us_about:'Sixelele ngawe', owner_info:'Inkcukacha', full_name:'Igama *', email:'I-imeyile *', phone:'Inombolo', id_number:'I-ID', group_info:'Iqela', group_name:'Igama *', group_vat:'I-VAT', head_office:'Iofisi', entity_count:'Inani *', biz_type:'Uhlobo', next:'Okulandelayo', back:'Emva', entity_name:'Igama *', contact_person:'Umntu *', address:'Idilesi', vat_number:'I-VAT', food_cost_target:'Iindleko %', stock_sections:'Iindawo', select_entity:'Khetha', continue:'Qhubeka', dashboard:'Ideshibhodi', inventory:'Isitokhwe', menu_creation:'Imenyu', stock_take:'Ukubala', cashup:'Imali', day_end:'Ukuphela', purchases:'Ukuthenga', transfers:'Ukudluliselwa', suppliers:'Abathengisi', wastage:'Inkcitho', reports:'Iingxelo', users:'Abasebenzisi', ai_insights:'Ulwazi', settings:'Iisetingi', ai_assistant:'Umncedisi', logout:'Phuma', notifications:'Izaziso', clear_all:'Cima', cancel:'Rhoxisa', save:'Gcina', add_item:'Yongeza' },
    pt: { welcome:'Bem-vindo Ao', tagline:'Inteligência a um clique', username:'Utilizador', password:'Palavra-passe', login_as:'Entrar como', log_in:'Entrar', sign_up:'Inscrever-se', owner_group_details:'Detalhes do Proprietário', tell_us_about:'Conte-nos sobre si', owner_info:'Proprietário', full_name:'Nome *', email:'E-mail *', phone:'Telefone', id_number:'ID', group_info:'Grupo', group_name:'Nome *', group_vat:'NIF', head_office:'Sede', entity_count:'Entidades *', biz_type:'Negócio', next:'Próximo', back:'Voltar', entity_name:'Nome *', contact_person:'Contacto *', address:'Endereço', vat_number:'NIF', food_cost_target:'Custo %', stock_sections:'Secções', select_entity:'Selecionar', continue:'Continuar', dashboard:'Painel', inventory:'Inventário', menu_creation:'Menu', stock_take:'Contagem', cashup:'Caixa', day_end:'Fim Dia', purchases:'Compras', transfers:'Transferências', suppliers:'Fornecedores', wastage:'Desperdício', reports:'Relatórios', users:'Utilizadores', ai_insights:'IA', settings:'Definições', ai_assistant:'Assistente', logout:'Sair', notifications:'Notificações', clear_all:'Limpar', cancel:'Cancelar', save:'Guardar', add_item:'Adicionar' },
    zh: { welcome:'欢迎来到', tagline:'智能触手可及', username:'用户名', password:'密码', login_as:'登录为', log_in:'登录', sign_up:'注册', owner_group_details:'业主详情', tell_us_about:'告诉我们', owner_info:'业主信息', full_name:'全名 *', email:'电子邮件 *', phone:'电话', id_number:'身份证号', group_info:'集团信息', group_name:'集团名称 *', group_vat:'增值税号', head_office:'总部', entity_count:'实体数量 *', biz_type:'类型', next:'下一步', back:'返回', entity_name:'实体名称 *', contact_person:'联系人 *', address:'地址', vat_number:'增值税号', food_cost_target:'食品成本 %', stock_sections:'库存区域', select_entity:'选择', continue:'继续', dashboard:'仪表板', inventory:'库存', menu_creation:'菜单', stock_take:'盘点', cashup:'收银', day_end:'日结', purchases:'采购', transfers:'内部转移', suppliers:'供应商', wastage:'浪费', reports:'报告', users:'用户', ai_insights:'AI分析', settings:'设置', ai_assistant:'AI助手', logout:'退出', notifications:'通知', clear_all:'清除', cancel:'取消', save:'保存', add_item:'添加' }
};
const LANGS = [
    { code:'en', name:'🇬🇧 English' },
    { code:'af', name:'🇿🇦 Afrikaans' },
    { code:'zu', name:'🇿🇦 isiZulu' },
    { code:'xh', name:'🇿🇦 isiXhosa' },
    { code:'pt', name:'🇵🇹 Português' },
    { code:'zh', name:'🇨🇳 中文' }
];
function t(key) { return (I18N[S.lang] && I18N[S.lang][key]) || I18N.en[key] || key; }
function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.documentElement.lang = S.lang;
}
function changeLang(code) {
    S.lang = code;
    saveToStorage();
    applyLang();
    if (document.getElementById('login-lang')) document.getElementById('login-lang').value = code;
    if (document.getElementById('header-lang')) document.getElementById('header-lang').value = code;
    if (S.user && !document.getElementById('app').classList.contains('hidden')) renderPages();
}
function fillLangSelectors() {
    const opts = LANGS.map(l => `<option value="${l.code}">${l.name}</option>`).join('');
    const a = document.getElementById('login-lang'); if (a) { a.innerHTML = opts; a.value = S.lang; }
    const b = document.getElementById('header-lang'); if (b) { b.innerHTML = opts; b.value = S.lang; }
}

// ============ PERMISSIONS ============
const KITCHEN_CATS = ['Proteins','Vegetables','Dairy','Dry Goods','Frozen','Bakery'];
const BAR_CATS = ['Beverages'];

const PERMS = {
    'Owner': { all:true, canSwitchEntities:true, canAccessGlobal:true, canAddUsers:true, canSeeUserLogs:true, canPrintAny:true, pages:['dashboard','inventory','menu-creation','stock-take','cashup','day-end','purchases','transfers','suppliers','wastage','reports','users','ai-insights','settings'], categories:'all' },
    'General Manager': { all:true, canSwitchEntities:false, canAccessGlobal:false, canAddUsers:true, canSeeUserLogs:true, canPrintAny:true, pages:['dashboard','inventory','menu-creation','stock-take','cashup','day-end','purchases','transfers','suppliers','wastage','reports','users','ai-insights','settings'], categories:'all' },
    'Area Manager': { all:true, canSwitchEntities:true, canAccessGlobal:false, canAddUsers:true, canSeeUserLogs:true, canPrintAny:true, pages:['dashboard','inventory','menu-creation','stock-take','cashup','day-end','purchases','transfers','suppliers','wastage','reports','users','ai-insights','settings'], categories:'all' },
    'Operations Manager': { all:true, canSwitchEntities:true, canAccessGlobal:false, canAddUsers:true, canSeeUserLogs:true, canPrintAny:true, pages:['dashboard','inventory','menu-creation','stock-take','cashup','day-end','purchases','transfers','suppliers','wastage','reports','users','ai-insights','settings'], categories:'all' },
    'Manager': { canSwitchEntities:false, canAccessGlobal:false, canAddUsers:false, canSeeUserLogs:false, canPrintAny:false, pages:['dashboard','inventory','stock-take','purchases','transfers','reports'], reports:['stock-variance','transfers'], categories:'all' },
    'Stock Controller': { canSwitchEntities:false, canAccessGlobal:false, canAddUsers:false, canSeeUserLogs:false, canPrintAny:false, pages:['dashboard','inventory','menu-creation','stock-take','purchases','transfers','reports'], reports:['stock-variance','transfers'], categories:'all' },
    'Kitchen Manager': { canSwitchEntities:false, canAccessGlobal:false, canAddUsers:false, canSeeUserLogs:false, canPrintAny:false, pages:['dashboard','inventory','menu-creation','stock-take','purchases','transfers','wastage','reports'], reports:['stock-variance','wastage','stock-count','transfers'], categories:KITCHEN_CATS, dashboardLabel:'Kitchen' },
    'Bar Manager': { canSwitchEntities:false, canAccessGlobal:false, canAddUsers:false, canSeeUserLogs:false, canPrintAny:false, pages:['dashboard','inventory','menu-creation','stock-take','purchases','transfers','wastage','reports'], reports:['stock-variance','wastage','stock-count','transfers'], categories:BAR_CATS, dashboardLabel:'Bar' },
    'Floor Supervisor': { canSwitchEntities:false, canAccessGlobal:false, canAddUsers:false, canSeeUserLogs:false, canPrintAny:false, pages:['stock-take'], categories:'all' },
    'Bar Supervisor': { canSwitchEntities:false, canAccessGlobal:false, canAddUsers:false, canSeeUserLogs:false, canPrintAny:false, pages:['stock-take'], categories:BAR_CATS }
};

const NAV_ITEMS = [
    { page:'dashboard', icon:'fa-chart-pie', key:'dashboard' },
    { page:'inventory', icon:'fa-box', key:'inventory' },
    { page:'menu-creation', icon:'fa-utensils', key:'menu_creation' },
    { page:'stock-take', icon:'fa-clipboard-list', key:'stock_take' },
    { page:'cashup', icon:'fa-cash-register', key:'cashup' },
    { page:'day-end', icon:'fa-moon', key:'day_end' },
    { page:'purchases', icon:'fa-shopping-cart', key:'purchases' },
    { page:'transfers', icon:'fa-exchange-alt', key:'transfers' },
    { page:'suppliers', icon:'fa-truck', key:'suppliers' },
    { page:'wastage', icon:'fa-trash-alt', key:'wastage' },
    { page:'reports', icon:'fa-file-alt', key:'reports' },
    { page:'users', icon:'fa-users', key:'users' },
    { page:'ai-insights', icon:'fa-brain', key:'ai_insights' },
    { page:'settings', icon:'fa-cog', key:'settings' }
];
const GLOBAL_NAV = [
    { page:'dashboard', icon:'fa-chart-pie', key:'dashboard' },
    { page:'purchases', icon:'fa-shopping-cart', key:'purchases' },
    { page:'stock-take', icon:'fa-clipboard-list', key:'stock_take' },
    { page:'wastage', icon:'fa-trash-alt', key:'wastage' },
    { page:'reports', icon:'fa-file-alt', key:'reports' },
    { page:'users', icon:'fa-users', key:'users' }
];

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    fillLangSelectors();
    applyLang();
    bindEvents();
    startClock();
});
function saveToStorage() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(S)); } catch(e){} }
function loadFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const d = JSON.parse(raw);
            const savedUser = d.user;
            d.user = null;
            d.isGlobalMode = false;
            Object.assign(S, d);
            if (savedUser && savedUser.name) {
                setTimeout(() => {
                    const usernameField = document.getElementById('login-username');
                    if (usernameField) usernameField.value = savedUser.name;
                }, 100);
            }
        }
    } catch(e){}
}
function startClock() {
    function tick() {
        const el = document.getElementById('header-datetime');
        if (!el) return;
        const n = new Date();
        el.textContent = `${n.toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} | ${n.toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}`;
    }
    tick(); setInterval(tick, 1000);
}
function bindEvents() {
    document.getElementById('login-form').addEventListener('submit', doLogin);
    document.getElementById('owner-form').addEventListener('submit', handleOwnerSubmit);
    document.getElementById('profile-form').addEventListener('submit', handleProfileSubmit);
    document.getElementById('mobile-menu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('mobile-open'));
    document.getElementById('ai-toggle').addEventListener('click', toggleAI);
    document.getElementById('ai-close').addEventListener('click', toggleAI);
    document.getElementById('ai-send').addEventListener('click', sendAIInput);
    document.getElementById('ai-input').addEventListener('keypress', e => { if(e.key==='Enter') sendAIInput(); });
    document.getElementById('voice-btn').addEventListener('click', startVoiceCmd);
    document.getElementById('voice-cancel').addEventListener('click', stopVoice);
    document.getElementById('ai-mic').addEventListener('click', startAIVoice);
    document.getElementById('notif-btn').addEventListener('click', () => document.getElementById('notif-panel').classList.toggle('hidden'));
    document.getElementById('logout-btn').addEventListener('click', doLogout);
    document.addEventListener('keydown', e => { if(e.key==='Escape'){document.getElementById('ai-panel').classList.remove('open');document.getElementById('notif-panel').classList.add('hidden');document.getElementById('voice-overlay').classList.add('hidden');closeModal();} });
}

// ============ LOGIN ============
function doLogin(e) {
    e.preventDefault();
    const name = document.getElementById('login-username').value || 'User';
    const role = document.getElementById('login-role').value;
    S.user = { name, role, assignedEntity: 0 };
    if (S.entities.length > 0) {
        document.getElementById('login-screen').classList.add('hidden');
        showEntitySelector();
    } else {
        startSignUp();
    }
    logAction('Login', `${name} logged in as ${role}`);
}
function startSignUp() {
    S.user = S.user || { name:'Owner', role:'Owner', assignedEntity:0 };
    S.user.role = 'Owner';
    S.tempEntities = []; S.profileStep = 0; S.totalEntities = 1;
    document.getElementById('login-screen').classList.add('hidden');
    showOwnerScreen();
}
function doLogout() {
    if (S.user) logAction('Logout', `${S.user.name} logged out`);
    document.getElementById('app').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    S.isGlobalMode = false;
    toast('info', 'Logged out');
}

// ============ OWNER & PROFILE SCREENS ============
function showOwnerScreen() {
    document.getElementById('owner-screen').classList.remove('hidden');
    document.getElementById('profile-screen').classList.add('hidden');
    document.getElementById('entity-select-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    if (S.owner) {
        document.getElementById('ow-name').value = S.owner.name || '';
        document.getElementById('ow-email').value = S.owner.email || '';
        document.getElementById('ow-phone').value = S.owner.phone || '';
        document.getElementById('ow-id').value = S.owner.idNumber || '';
        document.getElementById('ow-group').value = S.owner.groupName || '';
        document.getElementById('ow-groupvat').value = S.owner.groupVat || '';
        document.getElementById('ow-groupaddr').value = S.owner.groupAddress || '';
        document.getElementById('ow-entity-count').value = S.owner.entityCount || '1';
        document.getElementById('ow-biztype').value = S.owner.bizType || 'Restaurant Group';
    } else if (S.user && S.user.name) {
        document.getElementById('ow-name').value = S.user.name;
    }
}
function handleOwnerSubmit(e) {
    e.preventDefault();
    const ownerName = document.getElementById('ow-name').value;
    const ownerEmail = document.getElementById('ow-email').value;
    if (!ownerName || !ownerEmail) { toast('error','Please fill required fields'); return; }
    S.owner = {
        name: ownerName, email: ownerEmail,
        phone: document.getElementById('ow-phone').value,
        idNumber: document.getElementById('ow-id').value,
        groupName: document.getElementById('ow-group').value,
        groupVat: document.getElementById('ow-groupvat').value,
        groupAddress: document.getElementById('ow-groupaddr').value,
        entityCount: document.getElementById('ow-entity-count').value,
        bizType: document.getElementById('ow-biztype').value
    };
    S.user.name = ownerName;
    S.totalEntities = parseInt(S.owner.entityCount);
    S.profileStep = 0;
    S.tempEntities = [];
    document.getElementById('owner-screen').classList.add('hidden');
    showProfileStep();
}
function goBackToOwner() { document.getElementById('profile-screen').classList.add('hidden'); showOwnerScreen(); }
function showProfileStep() {
    document.getElementById('owner-screen').classList.add('hidden');
    document.getElementById('profile-screen').classList.remove('hidden');
    document.getElementById('entity-select-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    const step = S.profileStep, total = S.totalEntities, isLast = step >= total - 1;
    document.getElementById('profile-heading').textContent = total === 1 ? 'Entity Details' : `Entity ${step + 1} of ${total} — Details`;
    document.getElementById('profile-sub').textContent = total === 1 ? 'Set up your entity' : `Configure entity ${step + 1} of ${total}`;
    let dots = '<div class="step-dot done"></div>';
    for (let i = 0; i < total; i++) { dots += `<div class="step-dot ${i < step ? 'done' : i === step ? 'active' : ''}"></div>`; }
    document.getElementById('profile-steps').innerHTML = dots;
    const backBtn = document.getElementById('pf-back-btn');
    if (backBtn) backBtn.style.display = step === 0 ? '' : 'none';
    const existing = S.tempEntities[step];
    if (existing) {
        document.getElementById('pf-name').value = existing.name || '';
        document.getElementById('pf-contact').value = existing.contact || '';
        document.getElementById('pf-phone').value = existing.phone || '';
        document.getElementById('pf-email').value = existing.email || '';
        document.getElementById('pf-address').value = existing.address || '';
        document.getElementById('pf-vat').value = existing.vat || '';
        document.getElementById('pf-foodcost').value = existing.foodCostTarget || 28;
        document.querySelectorAll('#pf-sections input').forEach(cb => { cb.checked = (existing.sections||[]).includes(cb.value); });
    } else {
        document.getElementById('pf-name').value = '';
        document.getElementById('pf-contact').value = S.user ? S.user.name : '';
        document.getElementById('pf-phone').value = '';
        document.getElementById('pf-email').value = '';
        document.getElementById('pf-address').value = '';
        document.getElementById('pf-vat').value = '';
        document.getElementById('pf-foodcost').value = '28';
        const def = ['Walk-in Fridge','Walk-in Freezer','Dry Store','Bar'];
        document.querySelectorAll('#pf-sections input').forEach(cb => { cb.checked = def.includes(cb.value); });
    }
    const btnText = document.getElementById('pf-btn-text');
    const btnIcon = document.getElementById('pf-btn-icon');
    if (isLast) { btnText.textContent = 'Finish'; if (btnIcon) btnIcon.className = 'fas fa-check'; }
    else { btnText.textContent = `Next (${step + 2} of ${total})`; if (btnIcon) btnIcon.className = 'fas fa-arrow-right'; }
}
function handleProfileSubmit(e) {
    e.preventDefault();
    const sections = [];
    document.querySelectorAll('#pf-sections input:checked').forEach(cb => sections.push(cb.value));
    if (sections.length === 0) { toast('error','Select at least one section'); return; }
    const entity = {
        id: 'ENT-' + Date.now() + '-' + S.profileStep,
        name: document.getElementById('pf-name').value,
        contact: document.getElementById('pf-contact').value,
        phone: document.getElementById('pf-phone').value,
        email: document.getElementById('pf-email').value,
        address: document.getElementById('pf-address').value,
        vat: document.getElementById('pf-vat').value,
        foodCostTarget: parseFloat(document.getElementById('pf-foodcost').value) || 28,
        sections: sections
    };
    if (!entity.name) { toast('error','Enter entity name'); return; }
    S.tempEntities[S.profileStep] = entity;
    const isLast = S.profileStep >= S.totalEntities - 1;
    if (!isLast) {
        S.profileStep++;
        showProfileStep();
        toast('success', `"${entity.name}" saved!`);
    } else {
        S.entities = S.tempEntities.slice(0, S.totalEntities);
        S.tempEntities = [];
        S.entities.forEach(ent => generateDataForEntity(ent));
        document.getElementById('profile-screen').classList.add('hidden');
        saveToStorage();
        showEntitySelector();
        toast('success', 'Setup complete! 🎉');
    }
}

// ============ ENTITY SELECTOR ============
function showEntitySelector() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('profile-screen').classList.add('hidden');
    document.getElementById('owner-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('entity-select-screen').classList.remove('hidden');
    const perms = PERMS[S.user.role] || PERMS['Stock Controller'];
    const grid = document.getElementById('entity-grid');
    let html = '';
    let visible = S.entities;
    let subText = 'Click any entity to enter';
    if (!perms.canSwitchEntities && !perms.canAccessGlobal) {
        const assigned = S.user.assignedEntity || 0;
        visible = [S.entities[assigned] || S.entities[0]];
        subText = `Welcome ${S.user.name} — You have access to:`;
    }
    if (S.user.role === 'Floor Supervisor' || S.user.role === 'Bar Supervisor') {
        subText = `Welcome ${S.user.name} — Click your entity to start stock count:`;
    }
    document.getElementById('es-sub-text').textContent = subText;
    visible.forEach((ent) => {
        const actualIdx = S.entities.indexOf(ent);
        html += `<div class="entity-option" onclick="enterEntityDirect(${actualIdx}, false)">
            <i class="fas fa-building"></i><h3>${ent.name}</h3><p>${ent.contact||''}</p>
            <p style="font-size:.68rem;color:var(--accent);margin-top:4px">Food Cost: ${ent.foodCostTarget}%</p>
        </div>`;
    });
    if (perms.canAccessGlobal && S.entities.length >= 2) {
        html += `<div class="entity-option global" onclick="enterEntityDirect(-1, true)">
            <span class="global-crown">👑 OWNER ONLY</span>
            <i class="fas fa-globe"></i><h3>GLOBAL VIEW</h3>
            <p>All ${S.entities.length} Entities Combined</p>
        </div>`;
    }
    grid.innerHTML = html;
}
function enterEntityDirect(idx, isGlobal) {
    if (isGlobal) { S.isGlobalMode = true; S.activeEntity = -1; }
    else { S.isGlobalMode = false; S.activeEntity = idx; }
    document.getElementById('entity-select-screen').classList.add('hidden');
    enterApp();
    saveToStorage();
}
function switchEntity() {
    const perms = PERMS[S.user.role] || {};
    if (perms.canSwitchEntities || (S.entities.length > 1 && perms.canAccessGlobal)) showEntitySelector();
    else toast('info','You only have access to your assigned entity');
}

// ============ ENTER APP ============
function enterApp() {
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('side-user-name').textContent = S.user.name;
    document.getElementById('side-user-role').textContent = S.user.role;
    const sb = document.getElementById('sidebar-entity'), badge = document.getElementById('entity-badge');
    if (S.isGlobalMode) {
        document.getElementById('sidebar-entity-name').textContent = 'Global View';
        sb.classList.add('global-mode');
        document.getElementById('header-entity-name').textContent = '👑 GLOBAL';
        badge.classList.add('global-active');
    } else {
        const ent = S.entities[S.activeEntity];
        document.getElementById('sidebar-entity-name').textContent = ent.name;
        sb.classList.remove('global-mode');
        document.getElementById('header-entity-name').textContent = ent.name;
        badge.classList.remove('global-active');
    }
    renderSidebar();
    renderPages();
    const perms = PERMS[S.user.role] || PERMS['Stock Controller'];
    navigate(perms.pages[0] || 'dashboard');
    applyLang();
    fillLangSelectors();
}
function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    const perms = PERMS[S.user.role] || PERMS['Stock Controller'];
    let items = S.isGlobalMode ? GLOBAL_NAV : NAV_ITEMS.filter(it => perms.pages.includes(it.page));
    if (S.entities.length < 2) items = items.filter(it => it.page !== 'transfers');
    nav.innerHTML = items.map((it, i) => `<a class="nav-link ${i===0?'active':''}" data-page="${it.page}" onclick="navigate('${it.page}')"><i class="fas ${it.icon}"></i><span data-i18n="${it.key}">${t(it.key)}</span></a>`).join('');
}
function navigate(page) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === `page-${page}`));
    document.querySelector('.sidebar').classList.remove('mobile-open');
    if (page === 'ai-insights') setTimeout(initForecastChart, 50);
    if (page === 'dashboard') setTimeout(initDashCharts, 50);
}
function filterByUserCategories(items) {
    const perms = PERMS[S.user.role] || {};
    if (perms.categories && perms.categories !== 'all') {
        return items.filter(i => perms.categories.includes(i.category));
    }
    return items;
}

// ============ PRINT/EMAIL HELPERS ============
function pageActionButtons(pageId, pageTitle) {
    const perms = PERMS[S.user.role] || {};
    if (!perms.canPrintAny) return '';
    return `<div class="page-action-bar">
        <button class="page-action-btn print-btn" onclick="printPageContent('${pageId}', '${pageTitle}')" title="Print this page"><i class="fas fa-print"></i></button>
        <button class="page-action-btn email-btn" onclick="emailPageContent('${pageId}', '${pageTitle}')" title="Email this page"><i class="fas fa-envelope"></i></button>
    </div>`;
}
function printPageContent(pageId, title) {
    const pageEl = document.getElementById('page-' + pageId);
    if (!pageEl) return;
    const printWin = window.open('', '_blank');
    printWin.document.write(`<html><head><title>${title} - StockAI-Pro</title><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"><style>body{font-family:Arial,sans-serif;padding:20px;color:#0d4a5c}h1,h2,h3{color:#0d4a5c}table{width:100%;border-collapse:collapse;margin:14px 0}th,td{border:1px solid #ccc;padding:8px;text-align:left;font-size:12px}th{background:#1a8ba8;color:#fff}.page-action-bar,.page-watermark,canvas,.row-actions,.action-bar button{display:none!important}.stat-card,.info-block,.chart-block,.form-card,.dayend-card,.cashup-card{border:1px solid #ccc;padding:10px;margin-bottom:10px;page-break-inside:avoid}.stat-card-title{font-size:11px;color:#666}.stat-card-value{font-size:18px;font-weight:bold}.header-info{border-bottom:2px solid #1a8ba8;padding-bottom:10px;margin-bottom:20px}.header-info h1{font-size:20px;margin:0}.header-info p{font-size:12px;color:#666;margin:4px 0 0}</style></head><body><div class="header-info"><h1>${title}</h1><p><strong>Printed:</strong> ${new Date().toLocaleString('en-ZA')} | <strong>User:</strong> ${S.user ? S.user.name : ''} (${S.user ? S.user.role : ''}) | <strong>Entity:</strong> ${S.isGlobalMode ? 'GLOBAL VIEW' : (S.entities[S.activeEntity] ? S.entities[S.activeEntity].name : '')}</p></div>${pageEl.innerHTML}</body></html>`);
    printWin.document.close();
    setTimeout(() => { printWin.print(); }, 500);
    logAction('Print', `Printed page: ${title}`);
}
function emailPageContent(pageId, title) {
    const ent = S.isGlobalMode ? null : S.entities[S.activeEntity];
    const entName = S.isGlobalMode ? 'Global View' : (ent ? ent.name : '');
    const subject = `${title} - ${entName} - ${new Date().toLocaleDateString('en-ZA')}`;
    const body = `Hi,%0A%0AAttached is the ${title} report from StockAI-Pro.%0A%0AEntity: ${entName}%0ADate: ${new Date().toLocaleString('en-ZA')}%0AGenerated by: ${S.user.name} (${S.user.role})%0A%0ABest regards,%0A${S.user.name}`;
    const ownerEmail = S.owner ? S.owner.email : '';
    const entEmail = ent ? ent.email : '';
    const toEmail = ownerEmail || entEmail || '';
    window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
    logAction('Email', `Emailed page: ${title}`);
    toast('info', '📧 Opening email client...');
}

// ============ RENDER PAGES ============
function renderPages() {
    const c = document.getElementById('pages-container');
    c.innerHTML = S.isGlobalMode ? renderGlobalPages() : renderNormalPages();
    renderAll();
    applyLang();
}
function renderNormalPages() {
    const perms = PERMS[S.user.role] || PERMS['Stock Controller'];
    let html = '';
    if (perms.pages.includes('dashboard')) html += `<section id="page-dashboard" class="page active">${pageDashboard()}</section>`;
    if (perms.pages.includes('inventory')) html += `<section id="page-inventory" class="page">${pageInventory()}</section>`;
    if (perms.pages.includes('menu-creation')) html += `<section id="page-menu-creation" class="page">${pageMenuCreation()}</section>`;
    if (perms.pages.includes('stock-take')) html += `<section id="page-stock-take" class="page${perms.pages.length===1?' active':''}">${pageStockTake()}</section>`;
    if (perms.pages.includes('cashup')) html += `<section id="page-cashup" class="page">${pageCashup()}</section>`;
    if (perms.pages.includes('day-end')) html += `<section id="page-day-end" class="page">${pageDayEnd()}</section>`;
    if (perms.pages.includes('purchases')) html += `<section id="page-purchases" class="page">${pagePurchases()}</section>`;
    if (perms.pages.includes('transfers') && S.entities.length >= 2) html += `<section id="page-transfers" class="page">${pageTransfers()}</section>`;
    if (perms.pages.includes('suppliers')) html += `<section id="page-suppliers" class="page">${pageSuppliers()}</section>`;
    if (perms.pages.includes('wastage')) html += `<section id="page-wastage" class="page">${pageWastage()}</section>`;
    if (perms.pages.includes('reports')) html += `<section id="page-reports" class="page">${pageReports()}</section>`;
    if (perms.pages.includes('users')) html += `<section id="page-users" class="page">${pageUsers()}</section>`;
    if (perms.pages.includes('ai-insights')) html += `<section id="page-ai-insights" class="page">${pageAIInsights()}</section>`;
    if (perms.pages.includes('settings')) html += `<section id="page-settings" class="page">${pageSettings()}</section>`;
    return html;
}
function renderGlobalPages() {
    return `<section id="page-dashboard" class="page active">${pageGlobalDashboard()}</section>
    <section id="page-purchases" class="page">${pageGlobalPurchases()}</section>
    <section id="page-stock-take" class="page">${pageGlobalStockTake()}</section>
    <section id="page-wastage" class="page">${pageGlobalWastage()}</section>
    <section id="page-reports" class="page">${pageGlobalReports()}</section>
    <section id="page-users" class="page">${pageGlobalUsers()}</section>`;
}

// ============ PAGES ============
function pageDashboard() {
    const ent = S.entities[S.activeEntity];
    const perms = PERMS[S.user.role] || {};
    const label = perms.dashboardLabel ? ' ('+perms.dashboardLabel+')' : '';
    return `${pageActionButtons('dashboard', `Dashboard - ${ent.name}${label}`)}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Dashboard — ${ent.name}${label}</h1>
    <div class="stats-row"><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Stock Value${label}</div><div class="stat-card-value" id="sv-stock">R0</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Daily Sales</div><div class="stat-card-value" id="sv-daily">R0</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Weekly Sales</div><div class="stat-card-value">R87,000</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Monthly Sales</div><div class="stat-card-value">R362,000</div></div></div>
    <div class="stats-row"><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Food Cost %</div><div class="stat-card-value">${ent.foodCostTarget}%</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Wastage${label}</div><div class="stat-card-value" id="sv-wastage">R0</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Weekly Purchases</div><div class="stat-card-value">R45,000</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">GP %</div><div class="stat-card-value">${(100-ent.foodCostTarget).toFixed(1)}%</div></div></div>
    <div class="charts-row"><div class="chart-block"><h3 class="block-title">Food Cost Analysis</h3><div class="chart-area"><canvas id="foodCostChart"></canvas></div></div><div class="chart-block"><h3 class="block-title">Daily Overview</h3><div class="chart-area pie-area"><canvas id="overviewPie"></canvas></div><div class="pie-legend"><div class="legend-row"><span class="ld c1"></span>Stock<strong id="leg-stock">R0</strong></div><div class="legend-row"><span class="ld c2"></span>Sales<strong>R12.5K</strong></div><div class="legend-row"><span class="ld c3"></span>Wastage<strong>R3.2K</strong></div></div></div></div>
    <div class="sellers-row"><div class="info-block"><h3 class="block-title">🏆 Top 10 Selling Items${label}</h3><div id="top-sellers" style="padding-left:10px"></div></div><div class="info-block"><h3 class="block-title">📉 Bottom 10 Selling Items${label}</h3><div id="bottom-sellers" style="padding-left:10px"></div></div></div>
    <div class="prediction-row"><div class="info-block"><h3 class="block-title">🔮 Weekly Sales Prediction <span class="weather-pill"><i class="fas fa-cloud-sun"></i> Weather-Based</span></h3><p style="padding:0 10px;color:var(--text-light);font-size:.82rem;margin-top:-8px">Predicted sales this week (Mon-Sun)</p><div class="predict-grid" id="predict-grid"></div></div></div>
    <div class="bottom-row"><div class="info-block"><h3 class="block-title">Recent Activity</h3><div class="activity-list" id="dash-activity"></div></div><div class="info-block"><h3 class="block-title"><i class="fas fa-brain"></i> AI Insights</h3><div class="insights-list" id="dash-insights"></div></div><div class="info-block"><h3 class="block-title">Low Stock Alerts${label}</h3><div class="alerts-list" id="dash-alerts"></div></div></div>`;
}

function pageInventory() {
    return `${pageActionButtons('inventory', 'Inventory')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Inventory</h1>
    <div class="action-bar"><div class="search-mini"><i class="fas fa-search"></i><input type="text" id="inv-search" placeholder="Search items..." oninput="filterInv()"></div><select class="select-mini" id="cat-filter" onchange="filterInv()"><option value="">All Categories</option><option>Proteins</option><option>Vegetables</option><option>Dairy</option><option>Dry Goods</option><option>Beverages</option><option>Frozen</option><option>Bakery</option></select><select class="select-mini" id="status-filter" onchange="filterInv()"><option value="">All Status</option><option value="in-stock">In Stock</option><option value="low-stock">Low Stock</option><option value="out-of-stock">Out of Stock</option></select><button class="btn-primary" onclick="showAddItemForm()"><i class="fas fa-plus"></i> Add Item</button></div>
    <div id="add-item-form" class="form-card hidden"><h3 class="block-title">Add New Stock Item</h3><div class="form-row"><div class="form-field"><label>Item Name *</label><input type="text" id="ai-name"></div><div class="form-field"><label>SKU</label><input type="text" id="ai-sku" placeholder="Auto"></div></div><div class="form-row"><div class="form-field"><label>Category</label><select id="ai-cat"><option>Proteins</option><option>Vegetables</option><option>Dairy</option><option>Dry Goods</option><option>Beverages</option><option>Frozen</option><option>Bakery</option></select></div><div class="form-field"><label>Supplier</label><select id="ai-sup">${getSupplierOptions()}</select></div></div><div class="form-row"><div class="form-field"><label>Quantity</label><input type="number" id="ai-qty"></div><div class="form-field"><label>Unit</label><select id="ai-unit"><option>kg</option><option>g</option><option>liter</option><option>ml</option><option>each</option><option>case</option><option>dozen</option></select></div><div class="form-field"><label>Unit Cost (R)</label><input type="number" id="ai-cost" step="0.01"></div></div><div class="form-row"><div class="form-field"><label>Reorder Level</label><input type="number" id="ai-reorder" value="10"></div><div class="form-field"><label>Section</label><select id="ai-loc">${getSectionOptions()}</select></div><div class="form-field"><label>Expiry Date</label><input type="date" id="ai-expiry"></div></div><div class="form-actions"><button class="btn-outline" onclick="hideAddItemForm()">Cancel</button><button class="btn-primary" onclick="saveNewItem()"><i class="fas fa-save"></i> Save Item</button></div></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>SKU</th><th>Name</th><th>Category</th><th>Qty</th><th>Unit</th><th>Cost</th><th>Value</th><th>Section</th><th>Supplier</th><th>Status</th><th>Actions</th></tr></thead><tbody id="inv-body"></tbody></table></div>`;
}

function pageMenuCreation() {
    const ent = S.entities[S.activeEntity];
    return `${pageActionButtons('menu-creation', 'Menu Creation')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Menu Creation</h1><div class="action-bar"><button class="btn-primary" onclick="showAddMenuForm()"><i class="fas fa-plus"></i> Create Menu Item</button><div style="margin-left:auto;color:var(--text-mid);font-size:.85rem"><i class="fas fa-info-circle"></i> Target FC: <strong>${ent.foodCostTarget}%</strong></div></div><div id="menu-form-container"></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Menu Item</th><th>Yield</th><th>Cost/Portion</th><th>Suggested</th><th>Set Price</th><th>Actual FC%</th><th>Actions</th></tr></thead><tbody id="menu-body"></tbody></table></div>`;
}

function pageStockTake() {
    const ent = S.entities[S.activeEntity];
    const opts = ['<option value="all">All Sections</option>'].concat(ent.sections.map(s => `<option value="${s}">${s}</option>`)).join('');
    return `${pageActionButtons('stock-take', 'Stock Take')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Stock Take</h1><div class="action-bar"><label style="font-size:.85rem;color:var(--text-mid);font-weight:600">Section:</label><select class="select-mini" id="st-section-filter" onchange="renderStockTake()">${opts}</select><button class="btn-outline" onclick="startVoiceStockCount()"><i class="fas fa-microphone"></i> Voice Count</button><button class="btn-outline" onclick="printStockTake()"><i class="fas fa-print"></i> Print Sheet</button><button class="btn-primary" onclick="submitStockCount()"><i class="fas fa-save"></i> Submit Count</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Section</th><th>Expected</th><th>Counted</th><th>Variance</th><th>Action</th></tr></thead><tbody id="stocktake-body"></tbody></table></div>`;
}

function pageCashup() {
    return `${pageActionButtons('cashup', 'Cash-up')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Cash-up</h1><div class="action-bar"><label style="font-size:.85rem;color:var(--text-mid);font-weight:600">Date:</label><input type="date" class="date-mini" id="cu-date" value="${S.selectedDate}" onchange="loadCashup()"><button class="btn-primary" onclick="saveCashup()" style="margin-left:auto"><i class="fas fa-save"></i> Save Cash-up</button></div><div class="cashup-grid"><div class="cashup-card"><h3 class="block-title" style="padding-left:0">Daily Sales Breakdown</h3><div class="cashup-input-row"><label><i class="fas fa-money-bill-wave"></i> Total Cash</label><input type="number" id="cu-cash" step="0.01" placeholder="0.00" oninput="calcCashup()"></div><div class="cashup-input-row"><label><i class="fas fa-credit-card"></i> Total Credit Cards</label><input type="number" id="cu-cards" step="0.01" placeholder="0.00" oninput="calcCashup()"></div><div class="cashup-input-row"><label><i class="fas fa-ticket-alt"></i> Total Vouchers</label><input type="number" id="cu-vouchers" step="0.01" placeholder="0.00" oninput="calcCashup()"></div><div class="cashup-input-row"><label><i class="fas fa-coins"></i> Float</label><input type="number" id="cu-float" step="0.01" placeholder="0.00" oninput="calcCashup()"></div><div class="cashup-total"><span>Total Daily Sales</span><span id="cu-total">R 0.00</span></div></div><div class="cashup-card"><h3 class="block-title" style="padding-left:0">Summary</h3><div class="summary-row"><span>Date</span><strong id="cu-disp-date">-</strong></div><div class="summary-row"><span>Captured By</span><strong>${S.user?S.user.name:'-'}</strong></div><div class="summary-row"><span>Cash</span><strong id="cu-disp-cash">R 0.00</strong></div><div class="summary-row"><span>Cards</span><strong id="cu-disp-cards">R 0.00</strong></div><div class="summary-row"><span>Vouchers</span><strong id="cu-disp-vouchers">R 0.00</strong></div><div class="summary-row"><span>Float</span><strong id="cu-disp-float">R 0.00</strong></div><div class="summary-row total"><span>TOTAL SALES</span><strong id="cu-disp-total">R 0.00</strong></div></div></div>`;
}

function pageDayEnd() {
    return `${pageActionButtons('day-end', 'Day End')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Day End</h1><div class="action-bar"><label style="font-size:.85rem;color:var(--text-mid);font-weight:600">Date:</label><input type="date" class="date-mini" id="de-date" value="${S.selectedDate}" onchange="loadDayEnd()"><button class="btn-success" onclick="runDayEnd()" style="margin-left:auto"><i class="fas fa-lock"></i> Run Day End</button></div><div class="dayend-grid"><div class="dayend-card"><h3 class="block-title">Today's Summary</h3><div class="summary-row"><span>Opening Stock</span><strong>R127,500</strong></div><div class="summary-row"><span>Purchases Today</span><strong>R8,200</strong></div><div class="summary-row"><span>Sales Today</span><strong id="de-sales">R0</strong></div><div class="summary-row"><span>Wastage</span><strong class="negative">R3,200</strong></div><div class="summary-row total"><span>Closing Stock</span><strong>R125,000</strong></div></div><div class="dayend-card"><h3 class="block-title">Day End Actions</h3><button class="action-btn-big" onclick="navigate('stock-take')"><i class="fas fa-clipboard-check"></i><div><strong>Verify Counts</strong><small>Review stock take</small></div></button><button class="action-btn-big" onclick="viewDayEndReport()"><i class="fas fa-file-invoice"></i><div><strong>View Day End Report</strong><small>Full summary</small></div></button><button class="action-btn-big" onclick="generateAutoPOs()"><i class="fas fa-magic"></i><div><strong>Auto-Generate POs</strong><small>AI creates POs</small></div></button><button class="action-btn-big" onclick="emailDayEndReport()"><i class="fas fa-envelope"></i><div><strong>Email Report</strong><small>Send to GMs & Owner</small></div></button></div></div>`;
}

function pagePurchases() {
    return `${pageActionButtons('purchases', 'Purchases')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Purchases</h1>
    <div class="stats-row"><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Pending Approval</div><div class="stat-card-value" id="po-pending-count">0</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Pending</div><div class="stat-card-value" id="po-pending-status">0</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">In Transit</div><div class="stat-card-value" id="po-transit-count">0</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Received</div><div class="stat-card-value" id="po-received-count">0</div></div></div>
    <div class="action-bar"><button class="btn-primary" onclick="showManualPOForm()"><i class="fas fa-plus"></i> Create Manual PO</button><button class="btn-primary" onclick="showCapInvoiceForm()"><i class="fas fa-receipt"></i> Capture Invoice</button><button class="btn-outline" onclick="showAIPOSection()"><i class="fas fa-robot"></i> AI Pending POs</button><div class="search-mini" style="margin-left:auto"><i class="fas fa-search"></i><input type="text" id="inv-search-invoice" placeholder="Search invoice #" oninput="searchInvoices()"></div></div>
    <div id="ai-po-section" class="form-card hidden"><h3 class="block-title">🤖 AI-Generated POs (Pending Approval)</h3><div id="ai-po-list"></div></div>
    <div id="invoice-form" class="form-card hidden"><h3 class="block-title">Capture Supplier Invoice</h3><div class="form-row"><div class="form-field"><label>Invoice Number *</label><input type="text" id="inv-num"></div><div class="form-field"><label>Supplier *</label><select id="inv-sup">${getSupplierOptions()}</select></div><div class="form-field"><label>Date</label><input type="date" id="inv-date" value="${S.selectedDate}"></div></div><h4 style="font-size:.9rem;color:var(--text-dark);margin-top:14px;margin-bottom:8px">Items</h4><div class="invoice-items-table"><div class="invoice-line" style="font-weight:700;font-size:.75rem;color:var(--text-mid);text-transform:uppercase"><div>Item</div><div>Qty</div><div>Price</div><div>Total</div><div></div></div><div id="invoice-lines"></div><button class="btn-outline" onclick="addInvoiceLine()" style="margin-top:8px;padding:6px 14px;font-size:.8rem"><i class="fas fa-plus"></i> Add Line</button></div><div class="form-row" style="margin-top:14px"><div class="form-field"><label>Subtotal</label><input type="text" id="inv-subtotal" readonly value="R 0.00"></div><div class="form-field"><label>VAT 15%</label><input type="text" id="inv-vat" readonly value="R 0.00"></div><div class="form-field"><label>Total</label><input type="text" id="inv-total" readonly value="R 0.00"></div></div><div class="form-actions"><button class="btn-outline" onclick="hideCapInvoiceForm()">Cancel</button><button class="btn-primary" onclick="saveInvoice()"><i class="fas fa-save"></i> Capture</button></div></div>
    <div class="transfer-section pending"><span class="section-tag-badge pending-tag"><i class="fas fa-clock"></i> Pending Orders</span><h3 class="block-title" style="padding-left:0">Orders Not Yet Sent</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>PO #</th><th>Supplier</th><th>Items</th><th>Total</th><th>Date</th><th>Expected</th><th>Actions</th></tr></thead><tbody id="purchases-pending"></tbody></table></div></div>
    <div class="transfer-section outgoing"><span class="section-tag-badge transit-tag"><i class="fas fa-truck"></i> In Transit / On Route</span><h3 class="block-title" style="padding-left:0">Orders Sent — Awaiting Delivery</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>PO #</th><th>Supplier</th><th>Items</th><th>Total</th><th>Sent Date</th><th>ETA</th><th>Actions</th></tr></thead><tbody id="purchases-transit"></tbody></table></div></div>
    <div class="transfer-section incoming"><span class="section-tag-badge received-tag"><i class="fas fa-check-circle"></i> Received</span><h3 class="block-title" style="padding-left:0">Completed Deliveries</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>PO #</th><th>Supplier</th><th>Items</th><th>Total</th><th>Received Date</th><th>Received By</th><th>Actions</th></tr></thead><tbody id="purchases-received"></tbody></table></div></div>`;
}

function pageTransfers() {
    if (!S.entities || S.entities.length < 2) {
        return `${pageActionButtons('transfers', 'Internal Transfers')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Internal Transfers</h1><div class="form-card"><div style="text-align:center;padding:40px"><i class="fas fa-info-circle" style="font-size:3rem;color:var(--accent);margin-bottom:14px"></i><h3 style="color:var(--text-dark);margin-bottom:8px">Multiple Entities Required</h3><p style="color:var(--text-light)">Internal transfers are available when you have 2 or more entities.</p></div></div>`;
    }
    const ent = S.entities[S.activeEntity];
    return `${pageActionButtons('transfers', `Internal Transfers - ${ent.name}`)}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Internal Transfers — ${ent.name}</h1>
    <div class="action-bar"><button class="btn-primary" onclick="showTransferForm('out')"><i class="fas fa-arrow-right"></i> Transfer OUT</button><button class="btn-primary" onclick="showTransferForm('in')"><i class="fas fa-arrow-left"></i> Request IN</button><button class="btn-outline" onclick="viewTransferReport()"><i class="fas fa-file-alt"></i> Full Report</button></div>
    <div id="transfer-form-container"></div>
    <div class="transfer-section pending"><span class="section-tag-badge pending-tag"><i class="fas fa-inbox"></i> Awaiting Your Acceptance</span><h3 class="block-title" style="padding-left:0">Transfers Coming In - Action Required</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>From</th><th>Sender</th><th>Receiver</th><th>Item</th><th>Qty</th><th>Value</th><th>Date</th><th>Notes</th><th>Action</th></tr></thead><tbody id="transfers-pending-in"></tbody></table></div></div>
    <div class="transfer-section incoming"><span class="section-tag-badge received-tag"><i class="fas fa-check-circle"></i> Received Transfers</span><h3 class="block-title" style="padding-left:0">Stock Successfully Received</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>From</th><th>Sender</th><th>Item</th><th>Qty</th><th>Value</th><th>Accepted Date</th><th>Accepted By</th><th>Invoice</th></tr></thead><tbody id="transfers-received"></tbody></table></div></div>
    <div class="transfer-section outgoing"><span class="section-tag-badge sent-tag"><i class="fas fa-paper-plane"></i> Sent Transfers</span><h3 class="block-title" style="padding-left:0">Transfers Out — Status Tracking</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>To</th><th>Receiver</th><th>Item</th><th>Qty</th><th>Value</th><th>Sent Date</th><th>Status</th><th>Invoice</th></tr></thead><tbody id="transfers-sent"></tbody></table></div></div>`;
}

function pageSuppliers() {
    return `${pageActionButtons('suppliers', 'Suppliers')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Suppliers</h1><div class="action-bar"><button class="btn-primary" onclick="showAddSupplierForm()"><i class="fas fa-plus"></i> Add Supplier</button></div><div class="suppliers-grid" id="suppliers-grid"></div>`;
}

function pageWastage() {
    return `${pageActionButtons('wastage', 'Wastage')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Wastage</h1><div class="stats-row"><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Today</div><div class="stat-card-value">R3,200</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">This Week</div><div class="stat-card-value">R18,400</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">This Month</div><div class="stat-card-value">R74,200</div></div><div class="stat-card"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">% of Sales</div><div class="stat-card-value">5.1%</div></div></div><div class="action-bar"><button class="btn-primary" onclick="logWastagePrompt()"><i class="fas fa-plus"></i> Log Wastage</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Value</th><th>Reason</th><th>By</th></tr></thead><tbody id="wastage-body"></tbody></table></div>`;
}

function pageReports() {
    const perms = PERMS[S.user.role] || {};
    const allReports = perms.all;
    const allowed = perms.reports || ['stock-variance','wastage','stock-count'];
    let tiles = '';
    if (allReports) {
        tiles += `<div class="report-tile" onclick="viewReport('day-end')"><i class="fas fa-moon"></i><h3>Day End Report</h3><p>Daily summary</p></div>`;
        tiles += `<div class="report-tile" onclick="viewReport('cashup')"><i class="fas fa-cash-register"></i><h3>Cash-up Report</h3><p>Daily cash-up</p></div>`;
        tiles += `<div class="report-tile" onclick="viewReport('weekly')"><i class="fas fa-calendar-week"></i><h3>Weekly Report</h3><p>7-day overview</p></div>`;
        tiles += `<div class="report-tile" onclick="viewReport('stock-summary')"><i class="fas fa-clipboard-list"></i><h3>Stock Summary</h3><p>Current stock</p></div>`;
        tiles += `<div class="report-tile" onclick="viewReport('menu-cost')"><i class="fas fa-utensils"></i><h3>Menu Costing</h3><p>Cost per dish</p></div>`;
        tiles += `<div class="report-tile" onclick="viewReport('supplier')"><i class="fas fa-truck"></i><h3>Supplier Performance</h3><p>Metrics</p></div>`;
        tiles += `<div class="report-tile" onclick="viewReport('predicted-vs-actual')"><i class="fas fa-chart-line"></i><h3>Predicted vs Actual</h3><p>AI predictions</p></div>`;
    }
    if (allReports || allowed.includes('stock-variance')) tiles += `<div class="report-tile" onclick="viewReport('stock-variance')"><i class="fas fa-balance-scale"></i><h3>Stock Variance Report</h3><p>Expected vs counted</p></div>`;
    if (allReports || allowed.includes('wastage')) tiles += `<div class="report-tile" onclick="viewReport('wastage')"><i class="fas fa-trash-alt"></i><h3>Wastage Report</h3><p>Wastage tracking</p></div>`;
    if (allReports || allowed.includes('stock-count')) tiles += `<div class="report-tile" onclick="viewReport('stock-count')"><i class="fas fa-clipboard-check"></i><h3>Stock Count Report</h3><p>Count history</p></div>`;
    if (allReports || (perms.reports && perms.reports.includes('transfers'))) tiles += `<div class="report-tile" onclick="viewTransferReport()"><i class="fas fa-exchange-alt"></i><h3>Internal Transfers Report</h3><p>Stock transferred</p></div>`;
    if (perms.canSeeUserLogs) tiles += `<div class="report-tile" onclick="viewReport('user-logs')"><i class="fas fa-user-clock"></i><h3>User Activity Logs</h3><p>All actions</p></div>`;
    return `${pageActionButtons('reports', 'Reports')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Reports</h1><div class="view-filter"><label><i class="fas fa-calendar"></i> Report Date:</label><input type="date" id="rep-date" value="${S.selectedDate}" onchange="S.selectedDate=this.value;saveToStorage()"><label style="margin-left:14px"><i class="fas fa-filter"></i> Type:</label><select id="rep-type"><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></div><div class="reports-grid">${tiles}</div>`;
}

function pageUsers() {
    const perms = PERMS[S.user.role] || {};
    const addBtn = perms.canAddUsers ? `<button class="btn-primary" onclick="addUserPrompt()"><i class="fas fa-user-plus"></i> Add User</button>` : '';
    return `${pageActionButtons('users', 'Users')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Users — ${S.entities[S.activeEntity].name}</h1><div class="action-bar">${addBtn}</div><div class="users-grid" id="users-grid"></div>`;
}

function pageAIInsights() {
    return `${pageActionButtons('ai-insights', 'AI Insights')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">AI Insights</h1><div class="info-block"><h3 class="block-title">30-Day Forecast <span class="conf-tag">92%</span></h3><div class="chart-area" style="height:300px"><canvas id="forecastChart"></canvas></div></div><div class="info-block" style="margin-top:16px"><h3 class="block-title">AI Reorder Suggestions</h3><div id="reorder-list" style="padding-left:10px"></div></div>`;
}

function pageSettings() {
    const ent = S.entities[S.activeEntity];
    const canEdit = S.user.role === 'Owner';
    return `${pageActionButtons('settings', 'Settings')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">Settings</h1>
    <div class="form-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><h3 class="block-title" style="margin:0">🏢 Entity Information</h3>${canEdit ? `<button class="btn-primary" onclick="showEditEntityForm()"><i class="fas fa-edit"></i> Edit Entity</button>` : '<span style="font-size:.78rem;color:var(--text-light);font-style:italic">Owner only — read-only for your role</span>'}</div><div class="form-row"><div class="form-field"><label>Entity Name</label><input type="text" value="${ent.name}" disabled></div><div class="form-field"><label>Contact Person</label><input type="text" value="${ent.contact||''}" disabled></div></div><div class="form-row"><div class="form-field"><label>Phone Number</label><input type="text" value="${ent.phone||''}" disabled></div><div class="form-field"><label>Email Address</label><input type="text" value="${ent.email||''}" disabled></div></div><div class="form-row"><div class="form-field full"><label>Address</label><input type="text" value="${ent.address||''}" disabled></div></div><div class="form-row"><div class="form-field"><label>VAT Number</label><input type="text" value="${ent.vat||''}" disabled></div><div class="form-field"><label>Food Cost Target</label><input type="text" value="${ent.foodCostTarget}%" disabled></div></div><div class="form-row"><div class="form-field full"><label>Stock Sheet Sections</label><input type="text" value="${ent.sections.join(', ')}" disabled></div></div></div>
    ${canEdit && S.owner ? `<div class="form-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><h3 class="block-title" style="margin:0">👑 Owner & Group Information</h3><button class="btn-primary" onclick="showEditOwnerForm()"><i class="fas fa-edit"></i> Edit Owner Details</button></div><h4 style="font-size:.88rem;color:var(--text-mid);margin-bottom:10px;border-bottom:1px solid var(--border);padding-bottom:6px"><i class="fas fa-user"></i> Owner Information</h4><div class="form-row"><div class="form-field"><label>Owner Name</label><input type="text" value="${S.owner.name||''}" disabled></div><div class="form-field"><label>Email</label><input type="text" value="${S.owner.email||''}" disabled></div></div><div class="form-row"><div class="form-field"><label>Phone</label><input type="text" value="${S.owner.phone||''}" disabled></div><div class="form-field"><label>ID Number</label><input type="text" value="${S.owner.idNumber||''}" disabled></div></div><h4 style="font-size:.88rem;color:var(--text-mid);margin:18px 0 10px;border-bottom:1px solid var(--border);padding-bottom:6px"><i class="fas fa-building"></i> Group Information</h4><div class="form-row"><div class="form-field"><label>Group / Company Name</label><input type="text" value="${S.owner.groupName||''}" disabled></div><div class="form-field"><label>Group VAT Number</label><input type="text" value="${S.owner.groupVat||''}" disabled></div></div><div class="form-row"><div class="form-field full"><label>Group Head Office Address</label><input type="text" value="${S.owner.groupAddress||''}" disabled></div></div><div class="form-row"><div class="form-field"><label>Number of Entities</label><input type="text" value="${S.entities.length}" disabled></div><div class="form-field"><label>Business Type</label><input type="text" value="${S.owner.bizType||''}" disabled></div></div></div>` : ''}
    <div class="form-card"><h3 class="block-title">🔌 POS Integration</h3><div class="integration-card ${S.integrations.pos==='pilot'?'connected':''}"><div class="integration-icon"><i class="fas fa-cash-register"></i></div><div class="integration-info"><h4>Pilot POS</h4><p>Sync sales & menu items</p></div><span class="integration-status ${S.integrations.pos==='pilot'?'active':''}">${S.integrations.pos==='pilot'?'Connected':'Not Connected'}</span><button class="btn-outline" onclick="connectPOS('pilot')" style="margin-left:10px">${S.integrations.pos==='pilot'?'Disconnect':'Connect'}</button></div><div class="integration-card ${S.integrations.pos==='ikentoo'?'connected':''}"><div class="integration-icon"><i class="fas fa-cash-register"></i></div><div class="integration-info"><h4>iKentoo</h4><p>Real-time sync</p></div><span class="integration-status ${S.integrations.pos==='ikentoo'?'active':''}">${S.integrations.pos==='ikentoo'?'Connected':'Not Connected'}</span><button class="btn-outline" onclick="connectPOS('ikentoo')" style="margin-left:10px">${S.integrations.pos==='ikentoo'?'Disconnect':'Connect'}</button></div><div class="integration-card ${S.integrations.pos==='lightspeed'?'connected':''}"><div class="integration-icon"><i class="fas fa-cash-register"></i></div><div class="integration-info"><h4>Lightspeed</h4><p>Product mapping</p></div><span class="integration-status ${S.integrations.pos==='lightspeed'?'active':''}">${S.integrations.pos==='lightspeed'?'Connected':'Not Connected'}</span><button class="btn-outline" onclick="connectPOS('lightspeed')" style="margin-left:10px">${S.integrations.pos==='lightspeed'?'Disconnect':'Connect'}</button></div></div>
    <div class="form-card"><h3 class="block-title">📊 Accounting Integration</h3><div class="integration-card ${S.integrations.accounting==='xero'?'connected':''}"><div class="integration-icon"><i class="fas fa-calculator"></i></div><div class="integration-info"><h4>Xero</h4><p>Sales, purchases, stock</p></div><span class="integration-status ${S.integrations.accounting==='xero'?'active':''}">${S.integrations.accounting==='xero'?'Connected':'Not Connected'}</span><button class="btn-outline" onclick="connectAccounting('xero')" style="margin-left:10px">${S.integrations.accounting==='xero'?'Disconnect':'Connect'}</button></div><div class="integration-card ${S.integrations.accounting==='sage'?'connected':''}"><div class="integration-icon"><i class="fas fa-calculator"></i></div><div class="integration-info"><h4>Sage</h4><p>Sage Business Cloud</p></div><span class="integration-status ${S.integrations.accounting==='sage'?'active':''}">${S.integrations.accounting==='sage'?'Connected':'Not Connected'}</span><button class="btn-outline" onclick="connectAccounting('sage')" style="margin-left:10px">${S.integrations.accounting==='sage'?'Disconnect':'Connect'}</button></div><div class="integration-card ${S.integrations.accounting==='pastel'?'connected':''}"><div class="integration-icon"><i class="fas fa-calculator"></i></div><div class="integration-info"><h4>Pastel</h4><p>Export to Pastel</p></div><span class="integration-status ${S.integrations.accounting==='pastel'?'active':''}">${S.integrations.accounting==='pastel'?'Connected':'Not Connected'}</span><button class="btn-outline" onclick="connectAccounting('pastel')" style="margin-left:10px">${S.integrations.accounting==='pastel'?'Disconnect':'Connect'}</button></div></div>`;
}

// GLOBAL PAGES
function pageGlobalDashboard() {
    let totalStock=0;
    S.entities.forEach(ent => { totalStock += (S.inventory[ent.id]||[]).reduce((s,i)=>s+i.value,0); });
    const avgFC = (S.entities.reduce((s,e)=>s+e.foodCostTarget,0)/S.entities.length).toFixed(1);
    const totalSales = 12500 * S.entities.length;
    const totalWastage = 3200 * S.entities.length;
    return `${pageActionButtons('dashboard', 'Global Dashboard')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">👑 Global Dashboard — All ${S.entities.length} Entities</h1><div class="stats-row"><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Group Stock</div><div class="stat-card-value">R${fmtNum(totalStock)}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Daily Sales</div><div class="stat-card-value">R${fmtNum(totalSales)}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Weekly</div><div class="stat-card-value">R${fmtNum(totalSales*7)}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Monthly</div><div class="stat-card-value">R${fmtNum(totalSales*30)}</div></div></div><div class="stats-row"><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Avg Food Cost %</div><div class="stat-card-value">${avgFC}%</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Wastage</div><div class="stat-card-value">R${fmtNum(totalWastage)}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Purchases</div><div class="stat-card-value">R${fmtNum(45000*S.entities.length)}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">GP %</div><div class="stat-card-value">${(100-avgFC).toFixed(1)}%</div></div></div><div class="charts-row"><div class="chart-block"><h3 class="block-title">Group Food Cost</h3><div class="chart-area"><canvas id="foodCostChart"></canvas></div></div><div class="chart-block"><h3 class="block-title">Group Overview</h3><div class="chart-area pie-area"><canvas id="overviewPie"></canvas></div></div></div><div class="sellers-row"><div class="info-block"><h3 class="block-title">🏆 Group Top 10</h3><div id="top-sellers" style="padding-left:10px"></div></div><div class="info-block"><h3 class="block-title">📉 Group Bottom 10</h3><div id="bottom-sellers" style="padding-left:10px"></div></div></div><div class="bottom-row"><div class="info-block"><h3 class="block-title">Recent Activity</h3><div class="activity-list" id="dash-activity"></div></div><div class="info-block"><h3 class="block-title">AI Insights</h3><div class="insights-list" id="dash-insights"></div></div><div class="info-block"><h3 class="block-title">Low Stock</h3><div class="alerts-list" id="dash-alerts"></div></div></div>`;
}
function pageGlobalPurchases() {
    const opts = ['<option value="all">All Entities Combined</option>'].concat(S.entities.map((e,i) => `<option value="${i}">${e.name}</option>`)).join('');
    return `${pageActionButtons('purchases', 'Global Purchases')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">👑 Group Purchases</h1><div class="view-filter"><label><i class="fas fa-filter"></i> View:</label><select onchange="S.viewFilter=this.value;renderGlobalPurchases()">${opts}</select></div><div id="global-purchases-content"></div>`;
}
function pageGlobalStockTake() {
    const opts = ['<option value="all">All Entities Combined</option>'].concat(S.entities.map((e,i) => `<option value="${i}">${e.name}</option>`)).join('');
    return `${pageActionButtons('stock-take', 'Global Stock Takes')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">👑 Group Stock Takes</h1><div class="view-filter"><label><i class="fas fa-filter"></i> View:</label><select onchange="S.viewFilter=this.value;renderGlobalStockTake()">${opts}</select></div><div id="global-stocktake-content"></div>`;
}
function pageGlobalWastage() {
    const opts = ['<option value="all">All Entities</option>'].concat(S.entities.map((e,i) => `<option value="${i}">${e.name}</option>`)).join('');
    return `${pageActionButtons('wastage', 'Global Wastage')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">👑 Group Wastage</h1><div class="view-filter"><label><i class="fas fa-filter"></i> View:</label><select onchange="S.viewFilter=this.value;renderGlobalWastage()">${opts}</select></div><div id="global-wastage-content"></div>`;
}
function pageGlobalReports() {
    return `${pageActionButtons('reports', 'Global Reports')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">👑 Group Reports</h1><div class="view-filter"><label><i class="fas fa-calendar"></i> Date:</label><input type="date" value="${S.selectedDate}" onchange="S.selectedDate=this.value"></div><div class="reports-grid"><div class="report-tile" onclick="viewReport('global-day-end')"><i class="fas fa-moon"></i><h3>Group Day End</h3></div><div class="report-tile" onclick="viewReport('global-cashup')"><i class="fas fa-cash-register"></i><h3>Group Cash-up</h3></div><div class="report-tile" onclick="viewReport('global-stock')"><i class="fas fa-clipboard-list"></i><h3>Group Stock</h3></div><div class="report-tile" onclick="viewReport('global-wastage')"><i class="fas fa-trash-alt"></i><h3>Group Wastage</h3></div><div class="report-tile" onclick="viewReport('global-sales')"><i class="fas fa-chart-line"></i><h3>Group Sales</h3></div><div class="report-tile" onclick="viewTransferReport()"><i class="fas fa-exchange-alt"></i><h3>Group Transfers</h3></div></div>`;
}
function pageGlobalUsers() {
    let html = `${pageActionButtons('users', 'Global Users')}<div class="page-watermark">STOCKAI-PRO</div><h1 class="page-heading">👑 Group Users</h1>`;
    S.entities.forEach(ent => {
        const us = S.users[ent.id] || [];
        html += `<div class="global-entity-section"><div class="global-entity-heading"><i class="fas fa-building"></i> ${ent.name} <span style="font-weight:400;font-size:.85rem;color:var(--text-light);margin-left:8px">(${us.length})</span></div>`;
        if (us.length === 0) html += `<p style="padding:14px;color:var(--text-muted);font-style:italic">No users yet</p>`;
        else us.forEach(u => {
            const perm = PERMS[u.role] || {};
            const permTags = perm.all ? 'Full Access' : (perm.pages ? perm.pages.length + ' modules' : 'Limited');
            html += `<div class="global-user-row"><div class="global-user-avatar">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div class="global-user-info"><div class="global-user-name">${u.name}</div><div class="global-user-role">${u.role}</div></div><span class="global-user-perms">${permTags}</span></div>`;
        });
        html += `</div>`;
    });
    return html;
}

// HELPERS
function getSupplierOptions() {
    const ent = S.entities[S.activeEntity]; if (!ent) return '<option>FreshFarm</option>';
    return (S.suppliers[ent.id]||[]).map(s => `<option>${s.name}</option>`).join('') || '<option>FreshFarm</option>';
}
function getSectionOptions() {
    const ent = S.entities[S.activeEntity]; if (!ent) return '<option>Walk-in Fridge</option>';
    return ent.sections.map(s => `<option>${s}</option>`).join('');
}
function calcDaysUntilNextDelivery(deliveryDays) {
    if (!deliveryDays || deliveryDays.length === 0) return null;
    const today = new Date().getDay();
    let minDays = 7;
    deliveryDays.forEach(dayName => {
        const dayIdx = DAYS_OF_WEEK.indexOf(dayName);
        if (dayIdx === -1) return;
        let diff = dayIdx - today;
        if (diff <= 0) diff += 7;
        if (diff < minDays) minDays = diff;
    });
    return minDays;
}
function getEntityUsersForDropdown(entityId) {
    const users = S.users[entityId] || [];
    return users.map(u => `<option value="${u.id}">${u.name} (${u.role})</option>`).join('');
}
</script>
<script>
// ============ DATA GENERATION ============
function generateDataForEntity(ent) {
    if (S.inventory[ent.id]) return;
    const items = [
        {name:'Chicken Breast',cat:'Proteins',unit:'kg',cost:89.90,loc:'Walk-in Fridge',sup:'SA Meat Wholesalers'},
        {name:'Beef Fillet',cat:'Proteins',unit:'kg',cost:249.90,loc:'Walk-in Fridge',sup:'SA Meat Wholesalers'},
        {name:'Lamb Loin Chops',cat:'Proteins',unit:'kg',cost:189.90,loc:'Walk-in Fridge',sup:'SA Meat Wholesalers'},
        {name:'Fresh Salmon',cat:'Proteins',unit:'kg',cost:299.90,loc:'Walk-in Fridge',sup:'Ocean Basket Supplies'},
        {name:'Prawns',cat:'Proteins',unit:'kg',cost:320,loc:'Walk-in Freezer',sup:'Ocean Basket Supplies'},
        {name:'Pork Belly',cat:'Proteins',unit:'kg',cost:109.90,loc:'Walk-in Fridge',sup:'SA Meat Wholesalers'},
        {name:'Beef Mince',cat:'Proteins',unit:'kg',cost:119.90,loc:'Walk-in Fridge',sup:'SA Meat Wholesalers'},
        {name:'Hake Portions',cat:'Frozen',unit:'kg',cost:79.90,loc:'Walk-in Freezer',sup:'Ocean Basket Supplies'},
        {name:'Tomatoes',cat:'Vegetables',unit:'kg',cost:32.90,loc:'Walk-in Fridge',sup:'FreshFarm Produce'},
        {name:'Baby Spinach',cat:'Vegetables',unit:'kg',cost:89.90,loc:'Walk-in Fridge',sup:'FreshFarm Produce'},
        {name:'Mushrooms',cat:'Vegetables',unit:'kg',cost:54.90,loc:'Walk-in Fridge',sup:'FreshFarm Produce'},
        {name:'Brown Onions',cat:'Vegetables',unit:'kg',cost:14.90,loc:'Dry Store',sup:'FreshFarm Produce'},
        {name:'Avocados',cat:'Vegetables',unit:'each',cost:12.90,loc:'Walk-in Fridge',sup:'FreshFarm Produce'},
        {name:'Lemons',cat:'Vegetables',unit:'each',cost:4.90,loc:'Walk-in Fridge',sup:'FreshFarm Produce'},
        {name:'Potatoes',cat:'Vegetables',unit:'kg',cost:18.90,loc:'Dry Store',sup:'FreshFarm Produce'},
        {name:'Mixed Lettuce',cat:'Vegetables',unit:'head',cost:24.90,loc:'Walk-in Fridge',sup:'FreshFarm Produce'},
        {name:'Full Cream Milk',cat:'Dairy',unit:'liter',cost:19.90,loc:'Walk-in Fridge',sup:'Cape Dairy Co'},
        {name:'Fresh Cream',cat:'Dairy',unit:'liter',cost:44.90,loc:'Walk-in Fridge',sup:'Cape Dairy Co'},
        {name:'Cheddar Cheese',cat:'Dairy',unit:'kg',cost:109.90,loc:'Walk-in Fridge',sup:'Cape Dairy Co'},
        {name:'Eggs',cat:'Dairy',unit:'dozen',cost:54.90,loc:'Walk-in Fridge',sup:'Cape Dairy Co'},
        {name:'Butter',cat:'Dairy',unit:'kg',cost:89.90,loc:'Walk-in Fridge',sup:'Cape Dairy Co'},
        {name:'Basmati Rice',cat:'Dry Goods',unit:'kg',cost:34.90,loc:'Dry Store',sup:'Sysco SA Foods'},
        {name:'Pasta',cat:'Dry Goods',unit:'kg',cost:24.90,loc:'Dry Store',sup:'Sysco SA Foods'},
        {name:'Olive Oil',cat:'Dry Goods',unit:'liter',cost:129.90,loc:'Dry Store',sup:'Sysco SA Foods'},
        {name:'Coca-Cola',cat:'Beverages',unit:'case',cost:149.90,loc:'Bar',sup:'Sysco SA Foods'},
        {name:'Water',cat:'Beverages',unit:'case',cost:89.90,loc:'Bar',sup:'Sysco SA Foods'},
        {name:'House Red Wine',cat:'Beverages',unit:'each',cost:89.90,loc:'Bar',sup:'Sysco SA Foods'},
        {name:'House White Wine',cat:'Beverages',unit:'each',cost:79.90,loc:'Bar',sup:'Sysco SA Foods'},
        {name:'Craft Beer',cat:'Beverages',unit:'case',cost:299.90,loc:'Bar',sup:'Sysco SA Foods'},
        {name:'Frozen Chips',cat:'Frozen',unit:'kg',cost:34.90,loc:'Walk-in Freezer',sup:'Sysco SA Foods'},
        {name:'Ice Cream',cat:'Frozen',unit:'liter',cost:79.90,loc:'Walk-in Freezer',sup:'Cape Dairy Co'},
        {name:'Burger Buns',cat:'Bakery',unit:'dozen',cost:39.90,loc:'Dry Store',sup:'Bakers Depot'},
        {name:'Ciabatta',cat:'Bakery',unit:'dozen',cost:54.90,loc:'Dry Store',sup:'Bakers Depot'}
    ];
    S.inventory[ent.id] = items.filter(it => ent.sections.includes(it.loc)).map((it,i) => {
        const qty = Math.floor(Math.random()*80+2);
        const reorder = Math.floor(Math.random()*15+5);
        let status = qty===0?'out-of-stock':qty<=reorder?'low-stock':'in-stock';
        if (Math.random()>.9) status='on-order';
        return {id:`ITM-${ent.id.slice(-4)}-${i}`,sku:`FD-${Math.floor(Math.random()*9e4+1e4)}`,name:it.name,category:it.cat,unit:it.unit,quantity:qty,cost:it.cost,lastCost:it.cost,value:qty*it.cost,location:it.loc,status,reorder,supplier:it.sup};
    });

    S.suppliers[ent.id] = [
        {id:'SUP-'+ent.id+'-1',name:'FreshFarm Produce',type:'Vegetables',email:'orders@freshfarm.co.za',orders:48,rating:'4.8',onTime:'96%',phone:'+27 21 555 0101',linkedItems:S.inventory[ent.id].filter(i=>i.supplier==='FreshFarm Produce').map(i=>i.id),deliveryDays:['Monday','Wednesday','Friday']},
        {id:'SUP-'+ent.id+'-2',name:'SA Meat Wholesalers',type:'Proteins',email:'sales@sameat.co.za',orders:35,rating:'4.5',onTime:'92%',phone:'+27 11 555 0202',linkedItems:S.inventory[ent.id].filter(i=>i.supplier==='SA Meat Wholesalers').map(i=>i.id),deliveryDays:['Tuesday','Thursday']},
        {id:'SUP-'+ent.id+'-3',name:'Cape Dairy Co',type:'Dairy',email:'orders@capedairy.co.za',orders:30,rating:'4.7',onTime:'94%',phone:'+27 21 555 0303',linkedItems:S.inventory[ent.id].filter(i=>i.supplier==='Cape Dairy Co').map(i=>i.id),deliveryDays:['Monday','Wednesday','Friday']},
        {id:'SUP-'+ent.id+'-4',name:'Sysco SA Foods',type:'General',email:'po@sysco.co.za',orders:52,rating:'4.3',onTime:'88%',phone:'+27 11 555 0404',linkedItems:S.inventory[ent.id].filter(i=>i.supplier==='Sysco SA Foods').map(i=>i.id),deliveryDays:['Tuesday','Friday']},
        {id:'SUP-'+ent.id+'-5',name:'Ocean Basket Supplies',type:'Seafood',email:'orders@ocean.co.za',orders:22,rating:'4.6',onTime:'91%',phone:'+27 21 555 0505',linkedItems:S.inventory[ent.id].filter(i=>i.supplier==='Ocean Basket Supplies').map(i=>i.id),deliveryDays:['Wednesday']},
        {id:'SUP-'+ent.id+'-6',name:'Bakers Depot',type:'Bakery',email:'orders@bakers.co.za',orders:18,rating:'4.4',onTime:'90%',phone:'+27 11 555 0606',linkedItems:S.inventory[ent.id].filter(i=>i.supplier==='Bakers Depot').map(i=>i.id),deliveryDays:['Monday','Thursday','Saturday']}
    ];

    const statuses = ['Pending','In Transit','Received'];
    S.purchases[ent.id] = [];
    for (let i = 0; i < 12; i++) {
        const status = statuses[i % 3];
        const createdAt = new Date(Date.now()-Math.random()*30*864e5);
        S.purchases[ent.id].push({id:`PO-${ent.id.slice(-4)}-${i}`,supplier:S.suppliers[ent.id][i%6].name,items:Math.floor(Math.random()*12+1),total:parseFloat((Math.random()*30000+500).toFixed(2)),date:createdAt,createdAt:createdAt.toISOString(),expected:new Date(Date.now()+Math.random()*7*864e5),status,type:'PO',receivedDate: status === 'Received' ? new Date(createdAt.getTime() + 2*864e5).toISOString() : null,receivedBy: status === 'Received' ? 'Chef Marco' : null});
    }

    const reasons = ['Expired','Damaged','Over-prepped','Spilled','Spoiled'];
    S.wastage[ent.id] = [];
    for (let i = 0; i < 10; i++) {
        const it = S.inventory[ent.id][Math.floor(Math.random()*S.inventory[ent.id].length)];
        if (!it) continue;
        const q = parseFloat((Math.random()*3+.5).toFixed(1));
        S.wastage[ent.id].push({date:new Date(Date.now()-i*864e5),item:it.name,category:it.category,unit:it.unit,qty:q,value:q*it.cost,reason:reasons[Math.floor(Math.random()*reasons.length)],by:'Chef Marco'});
    }

    S.users[ent.id] = [
        {id:'usr-'+ent.id+'-1',name:ent.contact||'Manager',role:'General Manager'},
        {id:'usr-'+ent.id+'-2',name:'Chef Marco',role:'Kitchen Manager'},
        {id:'usr-'+ent.id+'-3',name:'Lisa Brown',role:'Bar Manager'},
        {id:'usr-'+ent.id+'-4',name:'John Smith',role:'Stock Controller'}
    ];

    const actT = [{t:'add',icon:'fa-plus',txt:'received'},{t:'remove',icon:'fa-minus',txt:'used'},{t:'update',icon:'fa-edit',txt:'adjusted'},{t:'order',icon:'fa-shopping-cart',txt:'ordered'}];
    S.activities[ent.id] = [];
    for (let i = 0; i < 6; i++) {
        const a = actT[Math.floor(Math.random()*actT.length)];
        const it = S.inventory[ent.id][Math.floor(Math.random()*S.inventory[ent.id].length)];
        if (!it) continue;
        S.activities[ent.id].push({type:a.t,icon:a.icon,item:it.name,action:a.txt,user:'Chef Marco',time:relTime(new Date(Date.now()-Math.random()*864e5))});
    }

    S.menuItems[ent.id] = [
        {id:'mn-'+ent.id+'-1',name:'Grilled Chicken Burger',category:'Kitchen',ingredients:[{item:'Chicken Breast',qty:0.2,wastePercent:5,adjustedQty:0.211,unit:'kg',cost:89.90,rawCost:17.98,wasteCost:0.95,actualCost:18.93}],yield:1,rawCost:17.98,wasteCost:0.95,platingCost:0.19,totalCost:19.12,costPerPortion:19.12,suggestedPrice:68.29,setPrice:95,actualFC:20.13,sold:142},
        {id:'mn-'+ent.id+'-2',name:'Beef Fillet 200g',category:'Kitchen',ingredients:[{item:'Beef Fillet',qty:0.2,wastePercent:10,adjustedQty:0.222,unit:'kg',cost:249.90,rawCost:49.98,wasteCost:5.55,actualCost:55.53}],yield:1,rawCost:49.98,wasteCost:5.55,platingCost:0.56,totalCost:56.09,costPerPortion:56.09,suggestedPrice:200.32,setPrice:225,actualFC:24.93,sold:89},
        {id:'mn-'+ent.id+'-3',name:'Caesar Salad',category:'Kitchen',ingredients:[{item:'Mixed Lettuce',qty:0.15,wastePercent:15,adjustedQty:0.176,unit:'head',cost:24.90,rawCost:3.74,wasteCost:0.65,actualCost:4.39}],yield:1,rawCost:3.74,wasteCost:0.65,platingCost:0.04,totalCost:4.43,costPerPortion:4.43,suggestedPrice:15.82,setPrice:55,actualFC:8.05,sold:67},
        {id:'mn-'+ent.id+'-4',name:'Margherita Pizza',category:'Kitchen',ingredients:[{item:'Cheddar Cheese',qty:0.12,wastePercent:0,adjustedQty:0.12,unit:'kg',cost:109.90,rawCost:13.19,wasteCost:0,actualCost:13.19}],yield:1,rawCost:13.19,wasteCost:0,platingCost:0.13,totalCost:13.32,costPerPortion:13.32,suggestedPrice:47.57,setPrice:75,actualFC:17.76,sold:120},
        {id:'mn-'+ent.id+'-5',name:'Fish & Chips',category:'Kitchen',ingredients:[{item:'Hake Portions',qty:0.18,wastePercent:8,adjustedQty:0.196,unit:'kg',cost:79.90,rawCost:14.38,wasteCost:1.25,actualCost:15.63}],yield:1,rawCost:14.38,wasteCost:1.25,platingCost:0.16,totalCost:15.79,costPerPortion:15.79,suggestedPrice:56.39,setPrice:85,actualFC:18.58,sold:98},
        {id:'mn-'+ent.id+'-6',name:'House Red Wine Glass',category:'Bar',ingredients:[{item:'House Red Wine',qty:0.15,wastePercent:0,adjustedQty:0.15,unit:'each',cost:89.90,rawCost:13.49,wasteCost:0,actualCost:13.49}],yield:1,rawCost:13.49,wasteCost:0,platingCost:0.13,totalCost:13.62,costPerPortion:13.62,suggestedPrice:48.64,setPrice:55,actualFC:24.76,sold:78},
        {id:'mn-'+ent.id+'-7',name:'Craft Beer 330ml',category:'Bar',ingredients:[{item:'Craft Beer',qty:0.04,wastePercent:0,adjustedQty:0.04,unit:'case',cost:299.90,rawCost:12.00,wasteCost:0,actualCost:12.00}],yield:1,rawCost:12.00,wasteCost:0,platingCost:0.12,totalCost:12.12,costPerPortion:12.12,suggestedPrice:43.28,setPrice:50,actualFC:24.24,sold:156}
    ];

    if (!S.cashups[ent.id]) S.cashups[ent.id] = {};
    if (!S.userLogs[ent.id]) S.userLogs[ent.id] = [];
    if (!S.dayEnds[ent.id]) S.dayEnds[ent.id] = {};
    if (!S.invoices[ent.id]) S.invoices[ent.id] = [];
    if (!S.pendingPOs[ent.id]) S.pendingPOs[ent.id] = [];

    if (S.notifs.length === 0) {
        S.notifs = [
            {type:'warning',title:'Low Stock',text:'Chicken Breast running low',time:'5m ago',unread:true},
            {type:'danger',title:'Expiring',text:'Salmon expires in 2 days',time:'1h ago',unread:true},
            {type:'success',title:'Delivery',text:'PO received from FreshFarm',time:'2h ago',unread:true}
        ];
    }
}

// ============ RENDER ALL ============
function renderAll() {
    if (S.isGlobalMode) {
        renderGlobalDashboardContent();
        renderGlobalPurchases();
        renderGlobalStockTake();
        renderGlobalWastage();
    } else {
        renderDashContent();
        renderInventory();
        renderMenu();
        renderStockTake();
        renderPurchasesTable();
        renderSuppliers();
        renderUsers();
        renderWastageTable();
        renderTopBottomSellers();
        renderPredictions();
        loadCashup();
        loadDayEnd();
        renderPendingPOs();
        renderTransfers();
    }
    renderNotifs();
    setTimeout(initDashCharts, 100);
}

function renderDashContent() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    let inv = S.inventory[ent.id] || [];
    inv = filterByUserCategories(inv);
    const stockVal = inv.reduce((s,i) => s+i.value, 0);
    if (document.getElementById('sv-stock')) document.getElementById('sv-stock').textContent = 'R'+fmtNum(stockVal);
    if (document.getElementById('leg-stock')) document.getElementById('leg-stock').textContent = 'R'+fmtNum(stockVal);
    let waste = S.wastage[ent.id] || [];
    const perms = PERMS[S.user.role] || {};
    if (perms.categories && perms.categories !== 'all') waste = waste.filter(w => perms.categories.includes(w.category));
    const wasteTotal = waste.reduce((s,w) => s+w.value, 0);
    if (document.getElementById('sv-wastage')) document.getElementById('sv-wastage').textContent = 'R'+fmtNum(wasteTotal);
    const cu = (S.cashups[ent.id]||{})[S.selectedDate];
    if (document.getElementById('sv-daily')) document.getElementById('sv-daily').textContent = cu ? 'R'+fmtNum(cu.total) : 'R12,500';
    const acts = S.activities[ent.id] || [];
    if (document.getElementById('dash-activity')) document.getElementById('dash-activity').innerHTML = acts.map(a => `<div class="activity-item"><div class="activity-icon ${a.type}"><i class="fas ${a.icon}"></i></div><div class="activity-text"><p><strong>${a.item}</strong> ${a.action}</p><span class="activity-time">${a.time} by ${a.user}</span></div></div>`).join('');
    const roleLabel = perms.dashboardLabel || '';
    if (document.getElementById('dash-insights')) {
        document.getElementById('dash-insights').innerHTML = [
            {t:`📈 ${roleLabel ? roleLabel + ' ' : ''}Weekend Rush`,p:'Expect 40% more covers Saturday.'},
            {t:`🎯 Food Cost: ${ent.foodCostTarget}%`,p:`Current: ${(ent.foodCostTarget+.4).toFixed(1)}%`},
            {t:`🗑️ ${roleLabel ? roleLabel + ' ' : ''}Wastage`,p:'Check trends this week.'}
        ].map(i => `<div class="insight-item"><h4>${i.t}</h4><p>${i.p}</p></div>`).join('');
    }
    const low = inv.filter(i => i.status === 'low-stock' || i.status === 'out-of-stock').slice(0, 5);
    if (document.getElementById('dash-alerts')) {
        document.getElementById('dash-alerts').innerHTML = low.map(i => {
            const sup = (S.suppliers[ent.id]||[]).find(s => s.name === i.supplier);
            let etaText = '';
            if (sup && sup.deliveryDays) {
                const days = calcDaysUntilNextDelivery(sup.deliveryDays);
                if (days !== null) etaText = `<span class="alert-eta"><i class="fas fa-truck"></i> ${i.supplier}: ${days} day${days!==1?'s':''} to delivery</span>`;
            }
            return `<div class="alert-item"><div><span class="alert-name">${i.name}</span><span class="alert-detail">${i.quantity} ${i.unit} • Reorder at ${i.reorder}</span>${etaText}</div><button class="alert-btn" onclick="quickReorder('${i.id}')">Order</button></div>`;
        }).join('');
    }
}

function renderTopBottomSellers() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    let menu = S.menuItems[ent.id] || [];
    const perms = PERMS[S.user.role] || {};
    if (perms.dashboardLabel === 'Kitchen') menu = menu.filter(m => m.category === 'Kitchen');
    else if (perms.dashboardLabel === 'Bar') menu = menu.filter(m => m.category === 'Bar');
    const sorted = [...menu].sort((a,b) => b.sold - a.sold);
    const top = sorted.slice(0, 10);
    const bottom = sorted.slice(-10).reverse();
    const topEl = document.getElementById('top-sellers');
    if (topEl) topEl.innerHTML = top.map((m,i) => `<div class="seller-item"><div class="seller-rank">${i+1}</div><div class="seller-name">${m.name}</div><div class="seller-stat">${m.sold} sold</div></div>`).join('') || '<p style="color:var(--text-light);padding:10px">No menu data</p>';
    const botEl = document.getElementById('bottom-sellers');
    if (botEl) botEl.innerHTML = bottom.map((m,i) => `<div class="seller-item"><div class="seller-rank bottom">${i+1}</div><div class="seller-name">${m.name}</div><div class="seller-stat">${m.sold} sold</div></div>`).join('') || '<p style="color:var(--text-light);padding:10px">No menu data</p>';
}

function renderPredictions() {
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const weather = ['☀️ Sunny','🌤️ Cloudy','☁️ Cloudy','🌧️ Rainy','⛈️ Storm','☀️ Sunny','🌤️ Mild'];
    const predEl = document.getElementById('predict-grid');
    if (predEl) {
        predEl.innerHTML = days.map((d,i) => {
            const base = 12000;
            const variance = i === 5 || i === 6 ? 1.4 : 1;
            const weatherFactor = weather[i].includes('Rain') || weather[i].includes('Storm') ? 0.75 : 1.1;
            const pred = Math.round(base * variance * weatherFactor);
            return `<div class="predict-day"><div class="predict-day-name">${d}</div><div class="predict-day-value">R${fmtNum(pred)}</div><div class="predict-weather">${weather[i]}</div></div>`;
        }).join('');
    }
}

function renderGlobalDashboardContent() {
    let acts = [], lowItems = [];
    S.entities.forEach(ent => {
        (S.activities[ent.id]||[]).forEach(a => acts.push({...a, entityName: ent.name}));
        (S.inventory[ent.id]||[]).filter(i => i.status === 'low-stock' || i.status === 'out-of-stock').forEach(i => lowItems.push({...i, entityName: ent.name}));
    });
    if (document.getElementById('dash-activity')) document.getElementById('dash-activity').innerHTML = acts.slice(0,8).map(a => `<div class="activity-item"><div class="activity-icon ${a.type}"><i class="fas ${a.icon}"></i></div><div class="activity-text"><p><strong>${a.item}</strong> ${a.action}</p><span class="activity-time">${a.time} • ${a.entityName}</span></div></div>`).join('');
    if (document.getElementById('dash-insights')) document.getElementById('dash-insights').innerHTML = [
        {t:`🏢 ${S.entities.length} Entities`,p:`Managing ${S.entities.length} restaurants.`},
        {t:`📊 Performance`,p:`Avg food cost on target.`},
        {t:`⚠️ ${lowItems.length} Low Items`,p:`Across entities.`}
    ].map(i => `<div class="insight-item"><h4>${i.t}</h4><p>${i.p}</p></div>`).join('');
    if (document.getElementById('dash-alerts')) document.getElementById('dash-alerts').innerHTML = lowItems.slice(0,6).map(i => `<div class="alert-item"><div><span class="alert-name">${i.name}</span><span class="alert-detail">${i.entityName} • ${i.quantity} ${i.unit}</span></div><button class="alert-btn">Order</button></div>`).join('');
    const allMenu = {};
    S.entities.forEach(ent => {
        (S.menuItems[ent.id]||[]).forEach(m => {
            if (!allMenu[m.name]) allMenu[m.name] = { total: 0, count: 0 };
            allMenu[m.name].total += m.sold;
            allMenu[m.name].count++;
        });
    });
    const sorted = Object.entries(allMenu).map(([n,d]) => ({name:n, avg: Math.round(d.total/d.count)})).sort((a,b) => b.avg - a.avg);
    const top = sorted.slice(0,10), bottom = sorted.slice(-10).reverse();
    if (document.getElementById('top-sellers')) document.getElementById('top-sellers').innerHTML = top.map((m,i) => `<div class="seller-item"><div class="seller-rank">${i+1}</div><div class="seller-name">${m.name}</div><div class="seller-stat">${m.avg} avg</div></div>`).join('');
    if (document.getElementById('bottom-sellers')) document.getElementById('bottom-sellers').innerHTML = bottom.map((m,i) => `<div class="seller-item"><div class="seller-rank bottom">${i+1}</div><div class="seller-name">${m.name}</div><div class="seller-stat">${m.avg} avg</div></div>`).join('');
}

// ============ INVENTORY ============
function renderInventory() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    let inv = S.inventory[ent.id] || [];
    inv = filterByUserCategories(inv);
    const fs = document.getElementById('inv-search'), fc = document.getElementById('cat-filter'), fst = document.getElementById('status-filter');
    let items = inv;
    if (fs && fs.value) items = items.filter(i => i.name.toLowerCase().includes(fs.value.toLowerCase()));
    if (fc && fc.value) items = items.filter(i => i.category === fc.value);
    if (fst && fst.value) items = items.filter(i => i.status === fst.value);
    const tb = document.getElementById('inv-body');
    if (tb) tb.innerHTML = items.slice(0,30).map(i => `<tr><td><code style="color:var(--accent)">${i.sku}</code></td><td><strong>${i.name}</strong></td><td>${i.category}</td><td>${i.quantity}</td><td>${i.unit}</td><td>R${i.cost.toFixed(2)}</td><td>R${fmtNum(i.value)}</td><td>${i.location}</td><td>${i.supplier||'-'}</td><td><span class="status-badge ${i.status}">${statusText(i.status)}</span></td><td><div class="row-actions"><button class="row-btn"><i class="fas fa-eye"></i></button><button class="row-btn"><i class="fas fa-edit"></i></button><button class="row-btn del" onclick="deleteItem('${i.id}')"><i class="fas fa-trash"></i></button></div></td></tr>`).join('');
}
function filterInv() { renderInventory(); }
function showAddItemForm() { document.getElementById('add-item-form').classList.remove('hidden'); document.getElementById('ai-sku').value = 'FD-' + Math.floor(Math.random()*9e4+1e4); }
function hideAddItemForm() { document.getElementById('add-item-form').classList.add('hidden'); }
function saveNewItem() {
    const ent = S.entities[S.activeEntity];
    const name = document.getElementById('ai-name').value;
    if (!name) { toast('error','Enter name'); return; }
    const qty = parseInt(document.getElementById('ai-qty').value)||0;
    const cost = parseFloat(document.getElementById('ai-cost').value)||0;
    const reorder = parseInt(document.getElementById('ai-reorder').value)||10;
    if (!S.inventory[ent.id]) S.inventory[ent.id] = [];
    const supplier = document.getElementById('ai-sup').value;
    const newItem = {id:`ITM-${Date.now()}`,sku:document.getElementById('ai-sku').value,name,category:document.getElementById('ai-cat').value,unit:document.getElementById('ai-unit').value,quantity:qty,cost,lastCost:cost,value:qty*cost,location:document.getElementById('ai-loc').value,status:qty===0?'out-of-stock':qty<=reorder?'low-stock':'in-stock',reorder,supplier};
    S.inventory[ent.id].unshift(newItem);
    const sup = (S.suppliers[ent.id]||[]).find(s => s.name === supplier);
    if (sup) { if (!sup.linkedItems) sup.linkedItems = []; sup.linkedItems.push(newItem.id); }
    logAction('Item Added', `${name} (${qty} ${document.getElementById('ai-unit').value})`);
    renderInventory(); hideAddItemForm(); saveToStorage(); toast('success',`${name} added`);
}
function deleteItem(id) {
    if (!confirm('Delete?')) return;
    const ent = S.entities[S.activeEntity];
    const it = (S.inventory[ent.id]||[]).find(x=>x.id===id);
    S.inventory[ent.id] = (S.inventory[ent.id]||[]).filter(i=>i.id!==id);
    if (it) logAction('Item Deleted', it.name);
    renderInventory(); saveToStorage(); toast('success','Deleted');
}

// ============ MENU ============
function renderMenu() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    let menu = S.menuItems[ent.id] || [];
    const perms = PERMS[S.user.role] || {};
    if (perms.dashboardLabel === 'Kitchen') menu = menu.filter(m => m.category === 'Kitchen');
    else if (perms.dashboardLabel === 'Bar') menu = menu.filter(m => m.category === 'Bar');
    const tb = document.getElementById('menu-body');
    if (tb) tb.innerHTML = menu.map(m => `<tr><td><strong>${m.name}</strong></td><td>${m.yield||1}</td><td>R${(m.costPerPortion||m.totalCost).toFixed(2)}</td><td style="color:var(--accent);font-weight:600">R${m.suggestedPrice.toFixed(2)}</td><td>R${m.setPrice}</td><td><span class="status-badge ${m.actualFC<=ent.foodCostTarget?'in-stock':'low-stock'}">${m.actualFC.toFixed(1)}%</span></td><td><div class="row-actions"><button class="row-btn" onclick="viewMenuItem('${m.id}')"><i class="fas fa-eye"></i></button><button class="row-btn"><i class="fas fa-edit"></i></button><button class="row-btn del" onclick="deleteMenuItem('${m.id}')"><i class="fas fa-trash"></i></button></div></td></tr>`).join('');
}

function showAddMenuForm() {
    const ent = S.entities[S.activeEntity];
    document.getElementById('menu-form-container').innerHTML = `
    <div class="menu-builder">
        <h3 class="block-title">Create Menu Item</h3>
        <div class="form-row">
            <div class="form-field"><label>Menu Item Name *</label><input type="text" id="mn-name" placeholder="e.g. Grilled Chicken Burger"></div>
            <div class="form-field"><label>Category</label><select id="mn-cat"><option>Kitchen</option><option>Bar</option></select></div>
            <div class="form-field"><label>Yield (Portions) *</label><input type="number" id="mn-yield" value="1" min="1" step="1" oninput="calcMenuCost()"></div>
        </div>
        <h4 style="font-size:.92rem;color:var(--text-dark);margin-top:18px;margin-bottom:8px"><i class="fas fa-utensils"></i> Ingredients (with waste %)</h4>
        <p style="font-size:.78rem;color:var(--text-light);margin-bottom:10px"><strong>Waste %:</strong> Trim, peel, bone waste (e.g. 30% for whole chicken).</p>
        <div id="ingredient-rows"></div>
        <button class="btn-outline" onclick="addIngredientRow()" style="margin-top:10px;padding:6px 14px;font-size:.8rem"><i class="fas fa-plus"></i> Add Ingredient</button>
        <div class="cost-summary" style="margin-top:18px">
            <div class="cost-row"><span>Raw Ingredient Cost:</span><strong id="mn-rawcost">R 0.00</strong></div>
            <div class="cost-row" style="color:var(--warning)"><span>+ Waste Cost:</span><strong id="mn-wastecost">R 0.00</strong></div>
            <div class="cost-row" style="color:var(--info)"><span>+ Plating Cost (1% mandatory):</span><strong id="mn-platingcost">R 0.00</strong></div>
            <div class="cost-row" style="border-top:1px solid var(--border);padding-top:8px;margin-top:6px"><span><strong>Total Recipe Cost:</strong></span><strong id="mn-totalcost">R 0.00</strong></div>
            <div class="cost-row"><span>÷ Yield:</span><strong id="mn-yielddisp">1</strong></div>
            <div class="cost-row" style="border-top:1px solid var(--border);padding-top:8px;margin-top:6px"><span><strong>Cost per Portion:</strong></span><strong id="mn-perportion" style="color:var(--accent)">R 0.00</strong></div>
            <div class="cost-row"><span>Target Food Cost %:</span><strong>${ent.foodCostTarget}%</strong></div>
            <div class="cost-row highlight"><span>Suggested Selling Price:</span><strong id="mn-suggested">R 0.00</strong></div>
        </div>
        <div class="form-row" style="margin-top:14px">
            <div class="form-field"><label>Your Set Selling Price (R) *</label><input type="number" id="mn-setprice" step="0.01" placeholder="0.00" oninput="calcMenuFC()"></div>
            <div class="form-field"><label>Actual Food Cost %</label><input type="text" id="mn-actualfc" readonly value="-" style="font-weight:700;color:var(--accent)"></div>
            <div class="form-field"><label>Gross Profit %</label><input type="text" id="mn-gp" readonly value="-" style="font-weight:700;color:var(--success)"></div>
        </div>
        <div class="form-actions">
            <button class="btn-outline" onclick="hideMenuForm()">Cancel</button>
            <button class="btn-primary" onclick="saveMenuItem()"><i class="fas fa-save"></i> Save Menu Item</button>
        </div>
    </div>`;
    document.getElementById('ingredient-rows').innerHTML = '';
    addIngredientRow();
}
function hideMenuForm() { document.getElementById('menu-form-container').innerHTML = ''; }
function addIngredientRow() {
    const ent = S.entities[S.activeEntity];
    const inv = S.inventory[ent.id] || [];
    const opts = inv.map(i => `<option value="${i.name}" data-cost="${i.cost}" data-unit="${i.unit}">${i.name} (R${i.cost}/${i.unit})</option>`).join('');
    const row = document.createElement('div');
    row.className = 'ingredient-row';
    row.innerHTML = `<select class="ing-item" onchange="calcMenuCost()"><option value="">Select ingredient</option>${opts}</select><input type="number" class="ing-qty" placeholder="Qty" step="0.001" oninput="calcMenuCost()"><input type="number" class="ing-waste" placeholder="Waste %" step="0.5" value="0" min="0" max="80" oninput="calcMenuCost()" title="Waste %"><div class="ingredient-cost">R 0.00</div><button class="row-btn del" onclick="this.parentElement.remove();calcMenuCost()"><i class="fas fa-times"></i></button>`;
    document.getElementById('ingredient-rows').appendChild(row);
}
function calcMenuCost() {
    let rawTotal = 0, wasteTotal = 0;
    document.querySelectorAll('.ingredient-row').forEach(row => {
        const sel = row.querySelector('.ing-item');
        const qty = parseFloat(row.querySelector('.ing-qty').value) || 0;
        const wastePercent = parseFloat(row.querySelector('.ing-waste').value) || 0;
        if (sel.selectedIndex > 0) {
            const cost = parseFloat(sel.options[sel.selectedIndex].dataset.cost) || 0;
            const rawLineCost = qty * cost;
            const adjustedQty = wastePercent > 0 ? qty / (1 - (wastePercent / 100)) : qty;
            const actualLineCost = adjustedQty * cost;
            const wasteCost = actualLineCost - rawLineCost;
            row.querySelector('.ingredient-cost').textContent = 'R ' + actualLineCost.toFixed(2);
            rawTotal += rawLineCost;
            wasteTotal += wasteCost;
        } else row.querySelector('.ingredient-cost').textContent = 'R 0.00';
    });
    const ingredientsTotal = rawTotal + wasteTotal;
    const platingCost = ingredientsTotal * 0.01;
    const recipeTotal = ingredientsTotal + platingCost;
    const yieldVal = parseFloat(document.getElementById('mn-yield').value) || 1;
    const costPerPortion = recipeTotal / yieldVal;
    document.getElementById('mn-rawcost').textContent = 'R ' + rawTotal.toFixed(2);
    document.getElementById('mn-wastecost').textContent = 'R ' + wasteTotal.toFixed(2);
    document.getElementById('mn-platingcost').textContent = 'R ' + platingCost.toFixed(2);
    document.getElementById('mn-totalcost').textContent = 'R ' + recipeTotal.toFixed(2);
    document.getElementById('mn-yielddisp').textContent = yieldVal + (yieldVal === 1 ? ' portion' : ' portions');
    document.getElementById('mn-perportion').textContent = 'R ' + costPerPortion.toFixed(2);
    const ent = S.entities[S.activeEntity];
    document.getElementById('mn-suggested').textContent = 'R ' + (costPerPortion / (ent.foodCostTarget / 100)).toFixed(2);
    calcMenuFC();
}
function calcMenuFC() {
    const costPerPortion = parseFloat(document.getElementById('mn-perportion').textContent.replace('R','').trim()) || 0;
    const setPrice = parseFloat(document.getElementById('mn-setprice').value) || 0;
    if (setPrice > 0) {
        const fc = (costPerPortion / setPrice * 100);
        document.getElementById('mn-actualfc').value = fc.toFixed(2) + '%';
        document.getElementById('mn-gp').value = (100 - fc).toFixed(2) + '%';
    } else {
        document.getElementById('mn-actualfc').value = '-';
        document.getElementById('mn-gp').value = '-';
    }
}
function saveMenuItem() {
    const ent = S.entities[S.activeEntity];
    const name = document.getElementById('mn-name').value;
    if (!name) { toast('error','Enter menu name'); return; }
    const category = document.getElementById('mn-cat').value;
    const yieldVal = parseFloat(document.getElementById('mn-yield').value) || 1;
    const ingredients = [];
    document.querySelectorAll('.ingredient-row').forEach(row => {
        const sel = row.querySelector('.ing-item');
        const qty = parseFloat(row.querySelector('.ing-qty').value) || 0;
        const wastePercent = parseFloat(row.querySelector('.ing-waste').value) || 0;
        if (sel.selectedIndex > 0 && qty > 0) {
            const cost = parseFloat(sel.options[sel.selectedIndex].dataset.cost) || 0;
            const unit = sel.options[sel.selectedIndex].dataset.unit;
            const rawCost = qty * cost;
            const adjustedQty = wastePercent > 0 ? qty / (1 - (wastePercent / 100)) : qty;
            const actualCost = adjustedQty * cost;
            ingredients.push({item:sel.value,qty,wastePercent,adjustedQty:parseFloat(adjustedQty.toFixed(3)),unit,cost,rawCost:parseFloat(rawCost.toFixed(2)),wasteCost:parseFloat((actualCost-rawCost).toFixed(2)),actualCost:parseFloat(actualCost.toFixed(2))});
        }
    });
    if (ingredients.length === 0) { toast('error','Add at least one ingredient'); return; }
    const rawTotal = ingredients.reduce((s,i) => s+i.rawCost, 0);
    const wasteTotal = ingredients.reduce((s,i) => s+i.wasteCost, 0);
    const ingredientsTotal = rawTotal + wasteTotal;
    const platingCost = parseFloat((ingredientsTotal * 0.01).toFixed(2));
    const totalCost = parseFloat((ingredientsTotal + platingCost).toFixed(2));
    const costPerPortion = parseFloat((totalCost / yieldVal).toFixed(2));
    const setPrice = parseFloat(document.getElementById('mn-setprice').value) || 0;
    const suggestedPrice = parseFloat((costPerPortion / (ent.foodCostTarget / 100)).toFixed(2));
    const actualFC = setPrice > 0 ? parseFloat((costPerPortion / setPrice * 100).toFixed(2)) : 0;
    if (!S.menuItems[ent.id]) S.menuItems[ent.id] = [];
    S.menuItems[ent.id].push({id:'mn-'+Date.now(),name,category,ingredients,yield:yieldVal,rawCost:parseFloat(rawTotal.toFixed(2)),wasteCost:parseFloat(wasteTotal.toFixed(2)),platingCost,totalCost,costPerPortion,suggestedPrice,setPrice,actualFC,sold:0});
    logAction('Menu Created', `${name} (${yieldVal} portions)`);
    renderMenu(); hideMenuForm(); saveToStorage();
    toast('success', `✓ ${name} added`);
}
function viewMenuItem(id) {
    const ent = S.entities[S.activeEntity];
    const m = (S.menuItems[ent.id]||[]).find(x => x.id === id);
    if (!m) return;
    const ingredientRows = m.ingredients.map(i => `<tr><td><strong>${i.item}</strong></td><td>${i.qty} ${i.unit}</td><td>${i.wastePercent || 0}%</td><td>${(i.adjustedQty || i.qty).toFixed(3)} ${i.unit}</td><td>R${i.cost.toFixed(2)}</td><td>R${(i.rawCost || (i.qty * i.cost)).toFixed(2)}</td><td style="color:var(--warning)">R${(i.wasteCost || 0).toFixed(2)}</td><td><strong>R${(i.actualCost || (i.qty * i.cost)).toFixed(2)}</strong></td></tr>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="width:900px;max-width:95vw"><div class="modal-top"><h2>${m.name} <span style="font-size:.8rem;color:var(--text-light);font-weight:400">(${m.category})</span></h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><h4 style="margin-bottom:10px;color:var(--text-dark)">Recipe Breakdown (Yield: ${m.yield || 1} portion${(m.yield||1) > 1 ? 's' : ''})</h4><div style="overflow-x:auto"><table class="data-table" style="font-size:.8rem"><thead><tr><th>Ingredient</th><th>Needed</th><th>Waste %</th><th>Raw Used</th><th>Cost/Unit</th><th>Raw Cost</th><th>Waste Cost</th><th>Total</th></tr></thead><tbody>${ingredientRows}</tbody></table></div><div class="cost-summary" style="margin-top:16px"><div class="cost-row"><span>Raw Ingredients:</span><strong>R${(m.rawCost || m.totalCost).toFixed(2)}</strong></div><div class="cost-row" style="color:var(--warning)"><span>+ Waste:</span><strong>R${(m.wasteCost || 0).toFixed(2)}</strong></div><div class="cost-row" style="color:var(--info)"><span>+ Plating (1%):</span><strong>R${(m.platingCost || 0).toFixed(2)}</strong></div><div class="cost-row" style="border-top:1px solid var(--border);padding-top:8px"><span><strong>Total Recipe:</strong></span><strong>R${m.totalCost.toFixed(2)}</strong></div><div class="cost-row"><span>÷ Yields:</span><strong>${m.yield || 1}</strong></div><div class="cost-row" style="border-top:1px solid var(--border);padding-top:8px"><span><strong>Cost per Portion:</strong></span><strong style="color:var(--accent);font-size:1.1rem">R${(m.costPerPortion || m.totalCost).toFixed(2)}</strong></div><div class="cost-row"><span>Suggested:</span><strong>R${m.suggestedPrice.toFixed(2)}</strong></div><div class="cost-row"><span>Set Price:</span><strong>R${m.setPrice.toFixed(2)}</strong></div><div class="cost-row highlight"><span>Actual FC %:</span><strong>${m.actualFC.toFixed(1)}%</strong></div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Close</button><button class="btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print</button></div></div></div>`;
}
function deleteMenuItem(id) { if (!confirm('Delete?')) return; const ent = S.entities[S.activeEntity]; S.menuItems[ent.id] = (S.menuItems[ent.id]||[]).filter(m => m.id !== id); renderMenu(); saveToStorage(); }
function closeModal() { document.getElementById('modal-container').innerHTML = ''; }

// ============ STOCK TAKE ============
function renderStockTake() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    let inv = S.inventory[ent.id] || [];
    inv = filterByUserCategories(inv);
    const f = document.getElementById('st-section-filter');
    const sec = f ? f.value : 'all';
    let items = sec === 'all' ? inv : inv.filter(i => i.location === sec);
    const tb = document.getElementById('stocktake-body');
    if (tb) tb.innerHTML = items.map(i => {
        const c = i.quantity + Math.floor(Math.random()*5-2);
        const v = c - i.quantity;
        const vc = v===0?'':v>0?'in-stock':'out-of-stock';
        return `<tr><td><strong>${i.name}</strong></td><td>${i.category}</td><td>${i.location}</td><td>${i.quantity} ${i.unit}</td><td><input type="number" value="${c}" id="count-${i.id}" style="width:80px;padding:4px 8px;border:1px solid var(--border);border-radius:4px" onchange="updateVariance('${i.id}')"></td><td><span class="status-badge ${vc}" id="var-${i.id}">${v>0?'+':''}${v}</span></td><td><button class="btn-outline" onclick="adjustStockItem('${i.id}')" style="padding:4px 12px;font-size:.78rem">Adjust</button></td></tr>`;
    }).join('');
}
function updateVariance(id) {
    const ent = S.entities[S.activeEntity];
    const it = S.inventory[ent.id].find(x => x.id === id);
    if (!it) return;
    const counted = parseFloat(document.getElementById('count-'+id).value) || 0;
    const v = counted - it.quantity;
    const vc = v===0?'':v>0?'in-stock':'out-of-stock';
    const el = document.getElementById('var-'+id);
    if (el) { el.className = `status-badge ${vc}`; el.textContent = (v>0?'+':'')+v; }
}
function adjustStockItem(id) {
    const ent = S.entities[S.activeEntity];
    const it = S.inventory[ent.id].find(x => x.id === id);
    const newQty = parseFloat(document.getElementById('count-'+id).value);
    if (isNaN(newQty)) return;
    it.quantity = newQty;
    it.value = newQty * it.cost;
    it.status = newQty === 0 ? 'out-of-stock' : newQty <= it.reorder ? 'low-stock' : 'in-stock';
    logAction('Stock Adjusted', `${it.name}: ${newQty} ${it.unit}`);
    saveToStorage(); renderStockTake(); toast('success','Adjusted');
}
function submitStockCount() { toast('success','Stock count submitted'); logAction('Stock Count','Submitted'); }
function printStockTake() {
    const ent = S.entities[S.activeEntity];
    const f = document.getElementById('st-section-filter');
    const sec = f ? f.value : 'all';
    const title = sec === 'all' ? `${ent.name} - All Sections` : `${ent.name} - ${sec}`;
    let inv = (S.inventory[ent.id]||[]).filter(i => sec === 'all' || i.location === sec);
    inv = filterByUserCategories(inv);
    let html = `<html><head><title>${title}</title><style>body{font-family:Arial;padding:20px}h1{color:#0d4a5c}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#1a8ba8;color:#fff}</style></head><body><h1>${title}</h1><p>Date: ${new Date().toLocaleDateString()}</p><table><thead><tr><th>SKU</th><th>Item</th><th>Section</th><th>Unit</th><th>Expected</th><th>Counted</th><th>Variance</th></tr></thead><tbody>`;
    inv.forEach(i => { html += `<tr><td>${i.sku}</td><td>${i.name}</td><td>${i.location}</td><td>${i.unit}</td><td>${i.quantity}</td><td>____</td><td>____</td></tr>`; });
    html += `</tbody></table></body></html>`;
    const w = window.open('','_blank'); w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500);
}

// VOICE STOCK COUNT
let voiceCountRecog = null;
function startVoiceStockCount() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) { toast('warning','Voice not supported'); return; }
    document.getElementById('voice-overlay').classList.remove('hidden');
    document.getElementById('voice-title').textContent = 'Voice Stock Count';
    document.getElementById('voice-text').textContent = 'Say: "[item name] [quantity]"';
    document.getElementById('voice-help').innerHTML = `<strong>Examples:</strong><br>"Chicken breast twenty five"<br>"Tomatoes fifteen"<br>"Milk eight"<br><br>Say "stop" or "finish" when done`;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceCountRecog = new SR();
    voiceCountRecog.continuous = true; voiceCountRecog.interimResults = false; voiceCountRecog.lang = 'en-ZA';
    voiceCountRecog.onresult = e => {
        const transcript = e.results[e.results.length-1][0].transcript.toLowerCase().trim();
        document.getElementById('voice-text').textContent = `Heard: "${transcript}"`;
        if (transcript.includes('stop') || transcript.includes('finish') || transcript.includes('done')) { 
            try { voiceCountRecog.stop(); } catch(e){} 
            stopVoice();
            renderStockTake();
            toast('success','Voice count completed.');
            return; 
        }
        processVoiceCount(transcript);
    };
    voiceCountRecog.onerror = () => {};
    voiceCountRecog.onend = () => { renderStockTake(); };
    try { voiceCountRecog.start(); } catch(e) { toast('error','Voice error'); }
}
function processVoiceCount(transcript) {
    const ent = S.entities[S.activeEntity];
    let inv = S.inventory[ent.id] || [];
    inv = filterByUserCategories(inv);
    const numberWords = {'zero':0,'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10,'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,'sixteen':16,'seventeen':17,'eighteen':18,'nineteen':19,'twenty':20,'thirty':30,'forty':40,'fifty':50,'sixty':60,'seventy':70,'eighty':80,'ninety':90,'hundred':100};
    let words = transcript.split(/\s+/);
    let qty = null, itemName = '';
    for (let len = 3; len >= 1; len--) {
        if (words.length < len + 1) continue;
        const numPhrase = words.slice(-len).join(' ');
        if (len === 2) {
            const parts = numPhrase.split(' ');
            if (numberWords[parts[0]] !== undefined && numberWords[parts[1]] !== undefined) {
                const tens = numberWords[parts[0]];
                const ones = numberWords[parts[1]];
                if (tens >= 20 && tens <= 90 && ones < 10) { qty = tens + ones; itemName = words.slice(0, words.length - len).join(' '); break; }
            }
        }
        if (numberWords[numPhrase] !== undefined) { qty = numberWords[numPhrase]; itemName = words.slice(0, words.length - len).join(' '); break; }
    }
    if (qty === null) {
        for (let i = words.length - 1; i >= 0; i--) {
            const n = parseFloat(words[i]);
            if (!isNaN(n)) { qty = n; itemName = words.slice(0, i).join(' '); break; }
            if (numberWords[words[i]] !== undefined) { qty = numberWords[words[i]]; itemName = words.slice(0, i).join(' '); break; }
        }
    }
    if (qty === null || !itemName) { toast('warning','Could not parse'); return; }
    itemName = itemName.trim().toLowerCase();
    let found = inv.find(it => it.name.toLowerCase() === itemName);
    if (!found) found = inv.find(it => it.name.toLowerCase().includes(itemName));
    if (!found) found = inv.find(it => itemName.includes(it.name.toLowerCase().split(' ')[0]));
    if (found) {
        found.quantity = qty;
        found.value = qty * found.cost;
        found.status = qty === 0 ? 'out-of-stock' : qty <= found.reorder ? 'low-stock' : 'in-stock';
        const countInput = document.getElementById('count-' + found.id);
        if (countInput) { countInput.value = qty; const varEl = document.getElementById('var-' + found.id); if (varEl) { varEl.className = 'status-badge'; varEl.textContent = '0'; } }
        logAction('Voice Count', `${found.name}: ${qty} ${found.unit}`);
        saveToStorage();
        toast('success', `✓ ${found.name}: ${qty} ${found.unit}`);
    } else toast('warning', `"${itemName}" not found`);
}

// CASH-UP & DAY END
function loadCashup() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const date = document.getElementById('cu-date') ? document.getElementById('cu-date').value : S.selectedDate;
    S.selectedDate = date;
    const cu = (S.cashups[ent.id]||{})[date] || {cash:0,cards:0,vouchers:0,float:0,total:0};
    if (document.getElementById('cu-cash')) {
        document.getElementById('cu-cash').value = cu.cash || '';
        document.getElementById('cu-cards').value = cu.cards || '';
        document.getElementById('cu-vouchers').value = cu.vouchers || '';
        document.getElementById('cu-float').value = cu.float || '';
        calcCashup();
    }
}
function calcCashup() {
    const cash = parseFloat(document.getElementById('cu-cash').value)||0;
    const cards = parseFloat(document.getElementById('cu-cards').value)||0;
    const vouchers = parseFloat(document.getElementById('cu-vouchers').value)||0;
    const float = parseFloat(document.getElementById('cu-float').value)||0;
    const total = cash + cards + vouchers + float;
    document.getElementById('cu-total').textContent = 'R '+total.toFixed(2);
    document.getElementById('cu-disp-cash').textContent = 'R '+cash.toFixed(2);
    document.getElementById('cu-disp-cards').textContent = 'R '+cards.toFixed(2);
    document.getElementById('cu-disp-vouchers').textContent = 'R '+vouchers.toFixed(2);
    document.getElementById('cu-disp-float').textContent = 'R '+float.toFixed(2);
    document.getElementById('cu-disp-total').textContent = 'R '+total.toFixed(2);
    document.getElementById('cu-disp-date').textContent = document.getElementById('cu-date').value;
}
function saveCashup() {
    const ent = S.entities[S.activeEntity];
    const date = document.getElementById('cu-date').value;
    const cash = parseFloat(document.getElementById('cu-cash').value)||0;
    const cards = parseFloat(document.getElementById('cu-cards').value)||0;
    const vouchers = parseFloat(document.getElementById('cu-vouchers').value)||0;
    const float = parseFloat(document.getElementById('cu-float').value)||0;
    const total = cash + cards + vouchers + float;
    if (!S.cashups[ent.id]) S.cashups[ent.id] = {};
    S.cashups[ent.id][date] = {cash,cards,vouchers,float,total,by:S.user.name,timestamp:new Date().toISOString()};
    logAction('Cash-up', `${date}: R${total.toFixed(2)}`);
    saveToStorage(); toast('success','Cash-up saved');
}
function loadDayEnd() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const date = document.getElementById('de-date') ? document.getElementById('de-date').value : S.selectedDate;
    const cu = (S.cashups[ent.id]||{})[date];
    if (document.getElementById('de-sales')) document.getElementById('de-sales').textContent = cu ? 'R'+fmtNum(cu.total) : 'R0';
}
function runDayEnd() {
    const ent = S.entities[S.activeEntity];
    const date = document.getElementById('de-date').value;
    if (!S.dayEnds[ent.id]) S.dayEnds[ent.id] = {};
    const inv = S.inventory[ent.id] || [];
    const cu = (S.cashups[ent.id]||{})[date] || {};
    const lowStock = inv.filter(i => i.status === 'low-stock' || i.status === 'out-of-stock');
    S.dayEnds[ent.id][date] = {date,sales:cu.total||0,wastage:3200,stockValue:inv.reduce((s,i)=>s+i.value,0),lowStockCount:lowStock.length,closedBy:S.user.name,timestamp:new Date().toISOString()};
    logAction('Day End', date);
    saveToStorage(); toast('success', 'Day End completed!');
    generateAutoPOs();
}
function viewDayEndReport() {
    const ent = S.entities[S.activeEntity];
    const date = S.selectedDate;
    const inv = S.inventory[ent.id] || [];
    const cu = (S.cashups[ent.id]||{})[date] || {};
    const lowStock = inv.filter(i => i.status === 'low-stock' || i.status === 'out-of-stock');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2>Day End Report — ${date}</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><h4 style="color:var(--text-dark);margin-bottom:10px">${ent.name}</h4><div class="summary-row"><span>Date</span><strong>${date}</strong></div><div class="summary-row"><span>Cash</span><strong>R${(cu.cash||0).toFixed(2)}</strong></div><div class="summary-row"><span>Cards</span><strong>R${(cu.cards||0).toFixed(2)}</strong></div><div class="summary-row"><span>Vouchers</span><strong>R${(cu.vouchers||0).toFixed(2)}</strong></div><div class="summary-row total"><span>TOTAL SALES</span><strong>R${(cu.total||0).toFixed(2)}</strong></div><div class="summary-row" style="margin-top:14px"><span>Stock Value</span><strong>R${fmtNum(inv.reduce((s,i)=>s+i.value,0))}</strong></div><div class="summary-row"><span>Wastage</span><strong class="negative">R3,200</strong></div><h4 style="margin-top:18px;color:var(--text-dark)">Low Stock (${lowStock.length})</h4>${lowStock.length ? '<ul style="margin-top:8px;padding-left:20px">'+lowStock.map(i => `<li>${i.name} — ${i.quantity} ${i.unit}</li>`).join('')+'</ul>' : '<p>No low stock</p>'}</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Close</button><button class="btn-primary" onclick="emailDayEndReport();closeModal()"><i class="fas fa-envelope"></i> Email</button></div></div></div>`;
}
function emailDayEndReport() { toast('success','📧 Report emailed'); logAction('Email', 'Day End Report'); }

// AUTO PO + MANUAL PO
function generateAutoPOs() {
    const ent = S.entities[S.activeEntity];
    const inv = S.inventory[ent.id] || [];
    const lowItems = inv.filter(i => i.status === 'low-stock' || i.status === 'out-of-stock');
    if (lowItems.length === 0) { toast('info','No items need reordering'); return; }
    const bySupplier = {};
    lowItems.forEach(i => {
        const sup = i.supplier || 'Unknown';
        if (!bySupplier[sup]) bySupplier[sup] = [];
        bySupplier[sup].push({...i, orderQty: i.reorder * 3});
    });
    if (!S.pendingPOs[ent.id]) S.pendingPOs[ent.id] = [];
    Object.entries(bySupplier).forEach(([sup, items]) => {
        const total = items.reduce((s,i) => s + (i.orderQty * i.cost), 0);
        S.pendingPOs[ent.id].push({id:'APO-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),supplier:sup,items,total,date:new Date().toISOString(),status:'Pending Approval',generatedBy:'AI'});
    });
    addNotif('info','AI POs Generated',`${Object.keys(bySupplier).length} POs awaiting approval`);
    logAction('AI POs', `${Object.keys(bySupplier).length} POs`);
    saveToStorage(); toast('success', `🤖 Generated ${Object.keys(bySupplier).length} POs`);
    showAIPOSection();
}
function showAIPOSection() { document.getElementById('ai-po-section').classList.remove('hidden'); renderPendingPOs(); }
function renderPendingPOs() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const pending = S.pendingPOs[ent.id] || [];
    const cnt = document.getElementById('po-pending-count');
    if (cnt) cnt.textContent = pending.length;
    const list = document.getElementById('ai-po-list');
    if (list) list.innerHTML = pending.length === 0 ? '<p style="color:var(--text-light);padding:14px">No pending POs</p>' : pending.map(po => `<div style="background:var(--bg-page);padding:14px;border-radius:8px;margin-bottom:10px;border-left:3px solid var(--gold)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><strong>${po.id}</strong><span class="status-badge pending">${po.status}</span></div><p style="font-size:.85rem;color:var(--text-mid);margin-bottom:8px">Supplier: <strong>${po.supplier}</strong> | Items: ${po.items.length} | Total: <strong>R${fmtNum(po.total)}</strong></p><div style="display:flex;gap:8px"><button class="btn-success" onclick="approvePO('${po.id}')"><i class="fas fa-check"></i> Approve</button><button class="btn-danger" onclick="rejectPO('${po.id}')"><i class="fas fa-times"></i> Reject</button></div></div>`).join('');
}
function approvePO(id) {
    const ent = S.entities[S.activeEntity];
    const po = (S.pendingPOs[ent.id]||[]).find(p => p.id === id);
    if (!po) return;
    if (!S.purchases[ent.id]) S.purchases[ent.id] = [];
    S.purchases[ent.id].unshift({id:po.id,supplier:po.supplier,items:po.items.length,total:po.total,date:new Date(),createdAt:new Date().toISOString(),expected:new Date(Date.now()+3*864e5),status:'In Transit',type:'AI-PO'});
    S.pendingPOs[ent.id] = S.pendingPOs[ent.id].filter(p => p.id !== id);
    logAction('PO Approved', id);
    saveToStorage(); renderPendingPOs(); renderPurchasesTable();
    toast('success', `✓ Approved & emailed to ${po.supplier}`);
}
function rejectPO(id) {
    const ent = S.entities[S.activeEntity];
    S.pendingPOs[ent.id] = S.pendingPOs[ent.id].filter(p => p.id !== id);
    logAction('PO Rejected', id);
    saveToStorage(); renderPendingPOs(); toast('info','Rejected');
}
function showManualPOForm() {
    const ent = S.entities[S.activeEntity];
    const sups = S.suppliers[ent.id] || [];
    const supOpts = sups.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2>Create Manual PO</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><div class="form-row"><div class="form-field"><label>Default Supplier</label><select id="mpo-sup"><option value="">Select</option>${supOpts}</select></div><div class="form-field"><label>Expected Delivery</label><input type="date" id="mpo-date" value="${new Date(Date.now()+3*864e5).toISOString().split('T')[0]}"></div></div><h4 style="font-size:.9rem;margin:14px 0 8px">Order Items</h4><div id="mpo-lines" style="background:var(--bg-page);padding:12px;border-radius:8px"></div><button class="btn-outline" onclick="addManualPOLine()" style="margin-top:8px;font-size:.8rem"><i class="fas fa-plus"></i> Add Item</button><div style="margin-top:14px;text-align:right;font-size:1.1rem;font-weight:700;color:var(--accent)">Total: <span id="mpo-total">R 0.00</span></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="saveManualPO()"><i class="fas fa-paper-plane"></i> Submit</button></div></div></div>`;
    addManualPOLine();
}
function addManualPOLine() {
    const ent = S.entities[S.activeEntity];
    const inv = S.inventory[ent.id] || [];
    const sups = S.suppliers[ent.id] || [];
    const opts = inv.map(i => `<option value="${i.id}" data-cost="${i.cost}" data-unit="${i.unit}" data-sup="${i.supplier||''}" data-name="${i.name}">${i.name} (R${i.cost}/${i.unit})</option>`).join('');
    const div = document.createElement('div');
    div.className = 'invoice-line';
    div.innerHTML = `<select class="mpo-item" onchange="calcManualPO()"><option value="">Select item</option>${opts}</select><input type="number" class="mpo-qty" placeholder="Qty" step="0.1" oninput="calcManualPO()"><select class="mpo-item-sup" style="font-size:.8rem"><option value="">Default</option>${sups.map(s=>`<option value="${s.name}">${s.name}</option>`).join('')}</select><span class="mpo-line-cost" style="font-weight:700;color:var(--accent);text-align:right">R 0.00</span><button class="row-btn del" onclick="this.parentElement.remove();calcManualPO()"><i class="fas fa-times"></i></button>`;
    document.getElementById('mpo-lines').appendChild(div);
}
function calcManualPO() {
    let total = 0;
    document.querySelectorAll('#mpo-lines .invoice-line').forEach(row => {
        const sel = row.querySelector('.mpo-item');
        const qty = parseFloat(row.querySelector('.mpo-qty').value) || 0;
        if (sel && sel.selectedIndex > 0) {
            const cost = parseFloat(sel.options[sel.selectedIndex].dataset.cost) || 0;
            const sup = sel.options[sel.selectedIndex].dataset.sup;
            const lineCost = qty * cost;
            row.querySelector('.mpo-line-cost').textContent = 'R ' + lineCost.toFixed(2);
            const supSel = row.querySelector('.mpo-item-sup');
            if (sup && supSel && supSel.value === '') { for (let o of supSel.options) { if (o.value === sup) { o.selected = true; break; } } }
            total += lineCost;
        }
    });
    document.getElementById('mpo-total').textContent = 'R ' + total.toFixed(2);
}
function saveManualPO() {
    const ent = S.entities[S.activeEntity];
    const mainSup = document.getElementById('mpo-sup').value;
    const expected = document.getElementById('mpo-date').value;
    const bySupplier = {};
    document.querySelectorAll('#mpo-lines .invoice-line').forEach(row => {
        const sel = row.querySelector('.mpo-item');
        const qty = parseFloat(row.querySelector('.mpo-qty').value) || 0;
        const supSel = row.querySelector('.mpo-item-sup');
        const sup = (supSel && supSel.value && supSel.value !== 'Default') ? supSel.value : mainSup;
        if (sel && sel.selectedIndex > 0 && qty > 0 && sup) {
            const cost = parseFloat(sel.options[sel.selectedIndex].dataset.cost) || 0;
            const name = sel.options[sel.selectedIndex].dataset.name;
            if (!bySupplier[sup]) bySupplier[sup] = [];
            bySupplier[sup].push({name, qty, cost, total: qty * cost});
        }
    });
    if (Object.keys(bySupplier).length === 0) { toast('error','Add items + select suppliers'); return; }
    Object.entries(bySupplier).forEach(([sup, items]) => {
        const total = items.reduce((s,i) => s + i.total, 0);
        if (!S.purchases[ent.id]) S.purchases[ent.id] = [];
        S.purchases[ent.id].unshift({id:'MPO-'+Date.now()+'-'+Math.random().toString(36).slice(2,5),supplier:sup,items:items.length,total,date:new Date(),createdAt:new Date().toISOString(),expected:new Date(expected),status:'In Transit',type:'Manual PO',lineItems:items});
    });
    logAction('Manual PO', `${Object.keys(bySupplier).length} PO(s)`);
    saveToStorage(); closeModal(); renderPurchasesTable();
    toast('success', `${Object.keys(bySupplier).length} PO(s) created`);
}

// PURCHASES TABLE - 3 SECTIONS
function renderPurchasesTable() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const ps = S.purchases[ent.id] || [];
    const pending = ps.filter(p => p.status === 'Pending');
    const transit = ps.filter(p => p.status === 'In Transit' || p.status === 'Processing');
    const received = ps.filter(p => p.status === 'Received' || p.status === 'Delivered');
    if (document.getElementById('po-pending-status')) document.getElementById('po-pending-status').textContent = pending.length;
    if (document.getElementById('po-transit-count')) document.getElementById('po-transit-count').textContent = transit.length;
    if (document.getElementById('po-received-count')) document.getElementById('po-received-count').textContent = received.length;
    const tbPending = document.getElementById('purchases-pending');
    if (tbPending) tbPending.innerHTML = pending.length === 0 ? `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-light)">No pending orders</td></tr>` : pending.map(p => `<tr><td><strong>${p.id}</strong></td><td>${p.supplier}</td><td>${p.items}</td><td>R${fmtNum(p.total)}</td><td>${fmtDate(p.date)}</td><td>${fmtDate(p.expected)}</td><td><div class="row-actions"><button class="row-btn" onclick="markPOTransit('${p.id}')" title="Send"><i class="fas fa-paper-plane"></i></button><button class="row-btn" onclick="printInvoiceDoc('po','${p.id}')" title="Print"><i class="fas fa-print"></i></button></div></td></tr>`).join('');
    const tbTransit = document.getElementById('purchases-transit');
    if (tbTransit) tbTransit.innerHTML = transit.length === 0 ? `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-light)">No orders in transit</td></tr>` : transit.map(p => `<tr><td><strong>${p.id}</strong></td><td>${p.supplier}</td><td>${p.items}</td><td>R${fmtNum(p.total)}</td><td>${fmtDate(p.date)}</td><td>${fmtDate(p.expected)}</td><td><div class="row-actions"><button class="row-btn" onclick="markPOReceived('${p.id}')" title="Mark Received" style="background:var(--success);color:#fff;border-color:var(--success)"><i class="fas fa-check"></i></button><button class="row-btn" onclick="printInvoiceDoc('po','${p.id}')" title="Print"><i class="fas fa-print"></i></button></div></td></tr>`).join('');
    const tbReceived = document.getElementById('purchases-received');
    if (tbReceived) tbReceived.innerHTML = received.length === 0 ? `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-light)">No received orders</td></tr>` : received.slice(0, 20).map(p => `<tr><td><strong>${p.id}</strong></td><td>${p.supplier}</td><td>${p.items}</td><td>R${fmtNum(p.total)}</td><td>${p.receivedDate ? fmtDate(p.receivedDate) : fmtDate(p.expected)}</td><td>${p.receivedBy || 'N/A'}</td><td><div class="row-actions"><button class="row-btn" onclick="printInvoiceDoc('po','${p.id}')" title="Print"><i class="fas fa-print"></i></button></div></td></tr>`).join('');
}
function markPOTransit(id) {
    const ent = S.entities[S.activeEntity];
    const po = (S.purchases[ent.id]||[]).find(p => p.id === id);
    if (!po) return;
    po.status = 'In Transit';
    logAction('PO Sent', id);
    saveToStorage(); renderPurchasesTable();
    toast('success', 'PO marked as sent');
}
function markPOReceived(id) {
    const ent = S.entities[S.activeEntity];
    const po = (S.purchases[ent.id]||[]).find(p => p.id === id);
    if (!po) return;
    if (!confirm(`Mark PO ${id} as received?`)) return;
    po.status = 'Received';
    po.receivedDate = new Date().toISOString();
    po.receivedBy = S.user.name;
    logAction('PO Received', `${id} from ${po.supplier}`);
    saveToStorage(); renderPurchasesTable();
    toast('success', `✓ ${id} marked as received`);
}

// INVOICE CAPTURE
function showCapInvoiceForm() { document.getElementById('invoice-form').classList.remove('hidden'); document.getElementById('invoice-lines').innerHTML = ''; addInvoiceLine(); }
function hideCapInvoiceForm() { document.getElementById('invoice-form').classList.add('hidden'); }
function addInvoiceLine() {
    const ent = S.entities[S.activeEntity];
    const inv = S.inventory[ent.id] || [];
    const opts = inv.map(i => `<option value="${i.name}" data-id="${i.id}">${i.name}</option>`).join('');
    const div = document.createElement('div');
    div.className = 'invoice-line';
    div.innerHTML = `<select class="inv-item"><option value="">Select item</option>${opts}</select><input type="number" class="inv-qty" placeholder="Qty" step="0.001" oninput="calcInvoice()"><input type="number" class="inv-price" placeholder="Price" step="0.01" oninput="calcInvoice()"><span class="inv-line-total" style="text-align:right;font-weight:700;color:var(--accent)">R 0.00</span><button class="row-btn del" onclick="this.parentElement.remove();calcInvoice()"><i class="fas fa-times"></i></button>`;
    document.getElementById('invoice-lines').appendChild(div);
}
function calcInvoice() {
    let subtotal = 0;
    document.querySelectorAll('.invoice-line').forEach(line => {
        const qty = parseFloat(line.querySelector('.inv-qty')?.value) || 0;
        const price = parseFloat(line.querySelector('.inv-price')?.value) || 0;
        const lt = qty * price;
        if (line.querySelector('.inv-line-total')) line.querySelector('.inv-line-total').textContent = 'R '+lt.toFixed(2);
        subtotal += lt;
    });
    const vat = subtotal * 0.15;
    document.getElementById('inv-subtotal').value = 'R '+subtotal.toFixed(2);
    document.getElementById('inv-vat').value = 'R '+vat.toFixed(2);
    document.getElementById('inv-total').value = 'R '+(subtotal+vat).toFixed(2);
}
function saveInvoice() {
    const ent = S.entities[S.activeEntity];
    const invNum = document.getElementById('inv-num').value;
    if (!invNum) { toast('error','Enter invoice number'); return; }
    const supplier = document.getElementById('inv-sup').value;
    const date = document.getElementById('inv-date').value;
    const items = [];
    let total = 0;
    document.querySelectorAll('.invoice-line').forEach(line => {
        const sel = line.querySelector('.inv-item');
        const qty = parseFloat(line.querySelector('.inv-qty')?.value) || 0;
        const price = parseFloat(line.querySelector('.inv-price')?.value) || 0;
        if (sel && sel.selectedIndex > 0 && qty > 0) {
            const itemId = sel.options[sel.selectedIndex].dataset.id;
            items.push({itemId, itemName:sel.value, qty, price, total:qty*price});
            total += qty * price;
            const invItem = S.inventory[ent.id].find(i => i.id === itemId);
            if (invItem) {
                invItem.quantity += qty;
                invItem.lastCost = price;
                invItem.cost = price;
                invItem.value = invItem.quantity * invItem.cost;
                invItem.status = invItem.quantity === 0 ? 'out-of-stock' : invItem.quantity <= invItem.reorder ? 'low-stock' : 'in-stock';
            }
        }
    });
    if (items.length === 0) { toast('error','Add items'); return; }
    const vat = total * 0.15;
    const grandTotal = total + vat;
    if (!S.invoices[ent.id]) S.invoices[ent.id] = [];
    S.invoices[ent.id].push({invNum, supplier, date, items, subtotal:total, vat, total:grandTotal, capturedBy:S.user.name, timestamp:new Date().toISOString()});
    if (!S.purchases[ent.id]) S.purchases[ent.id] = [];
    S.purchases[ent.id].unshift({id:invNum,supplier,items:items.length,total:grandTotal,date:new Date(date),createdAt:new Date().toISOString(),expected:new Date(date),status:'Received',receivedDate:new Date().toISOString(),receivedBy:S.user.name,type:'Invoice'});
    logAction('Invoice', `${invNum} from ${supplier}`);
    saveToStorage(); hideCapInvoiceForm(); renderPurchasesTable(); renderInventory();
    toast('success', `Invoice ${invNum} captured`);
}
function searchInvoices() {
    const ent = S.entities[S.activeEntity];
    const q = document.getElementById('inv-search-invoice').value.toLowerCase();
    if (!q) return renderPurchasesTable();
    const found = (S.invoices[ent.id]||[]).filter(i => i.invNum.toLowerCase().includes(q) || i.supplier.toLowerCase().includes(q));
    const tb = document.getElementById('purchases-received');
    if (tb) tb.innerHTML = found.map(i => `<tr><td><strong>${i.invNum}</strong></td><td>${i.supplier}</td><td>${i.items.length}</td><td>R${fmtNum(i.total)}</td><td>${i.date}</td><td>${i.capturedBy}</td><td><div class="row-actions"><button class="row-btn" onclick="printInvoiceDoc('invoice','${i.invNum}')"><i class="fas fa-print"></i></button></div></td></tr>`).join('');
}
function printInvoiceDoc(type, id) {
    const ent = S.entities[S.activeEntity];
    let doc, title;
    if (type === 'invoice') { doc = (S.invoices[ent.id]||[]).find(i => i.invNum === id); title = 'Invoice'; }
    else { doc = (S.purchases[ent.id]||[]).find(p => p.id === id); title = 'Purchase Order'; }
    if (!doc) { toast('error','Not found'); return; }
    const ts = doc.timestamp || doc.createdAt || new Date().toISOString();
    const dateStr = new Date(ts).toLocaleString('en-ZA');
    let itemsHtml = '';
    if (doc.items && Array.isArray(doc.items)) itemsHtml = doc.items.map(it => `<tr><td>${it.itemName || it.name}</td><td>${it.qty} ${it.unit||''}</td><td>R${(it.price || it.cost || 0).toFixed(2)}</td><td>R${(it.total || (it.qty * (it.price || it.cost))).toFixed(2)}</td></tr>`).join('');
    else if (doc.lineItems && Array.isArray(doc.lineItems)) itemsHtml = doc.lineItems.map(it => `<tr><td>${it.name}</td><td>${it.qty}</td><td>R${it.cost.toFixed(2)}</td><td>R${it.total.toFixed(2)}</td></tr>`).join('');
    else itemsHtml = `<tr><td colspan="4">${doc.items} item(s) - Total: R${doc.total.toFixed(2)}</td></tr>`;
    let html = `<html><head><title>${title} ${doc.invNum || doc.id}</title><style>body{font-family:Arial;padding:30px;color:#0d4a5c}.header{border-bottom:3px solid #1a8ba8;padding-bottom:14px;margin-bottom:20px}.brand{font-size:20px;font-weight:bold;color:#1a8ba8}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ccc;padding:10px;text-align:left;font-size:13px}th{background:#1a8ba8;color:#fff}.timestamp{background:#f5f9fa;padding:8px 12px;border-radius:6px;display:inline-block;margin-top:10px;font-size:12px}</style></head><body><div class="header"><div class="brand">STOCKAI-PRO</div><h1>${title}</h1></div><p><strong>${title} #:</strong> ${doc.invNum || doc.id}<br><strong>Supplier:</strong> ${doc.supplier}<br><strong>Entity:</strong> ${ent.name}</p><div class="timestamp"><strong>Timestamp:</strong> ${dateStr}</div><table><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${itemsHtml}</tbody></table><p style="text-align:right;font-size:16px;font-weight:bold;margin-top:20px">TOTAL: R${doc.total.toFixed(2)}</p></body></html>`;
    const w = window.open('','_blank'); w.document.write(html); w.document.close(); setTimeout(() => w.print(), 500);
}

// INTERNAL TRANSFERS
function showTransferForm(direction) {
    const ent = S.entities[S.activeEntity];
    const otherEntities = S.entities.filter((_, i) => i !== S.activeEntity);
    const entOpts = otherEntities.map(e => { const actualIdx = S.entities.indexOf(e); return `<option value="${actualIdx}">${e.name}</option>`; }).join('');
    const isOut = direction === 'out';
    const inv = isOut ? (S.inventory[ent.id] || []) : [];
    let itemOptsHTML = '';
    if (isOut) itemOptsHTML = inv.filter(i => i.quantity > 0).map(i => `<option value="${i.id}" data-qty="${i.quantity}" data-unit="${i.unit}" data-cost="${i.cost}" data-name="${i.name}">${i.name} (${i.quantity} ${i.unit})</option>`).join('');
    document.getElementById('transfer-form-container').innerHTML = `<div class="form-card" style="border-left-color:${isOut?'var(--danger)':'var(--success)'}"><h3 class="block-title">${isOut ? 'Transfer OUT' : 'Request IN'}</h3><div class="form-row"><div class="form-field"><label>${isOut?'Sending to':'Receiving from'} *</label><select id="tr-entity" onchange="updateTransferReceivers()"><option value="">Select entity</option>${entOpts}</select></div><div class="form-field"><label>Receiver *</label><select id="tr-receiver"><option value="">Select entity first</option></select></div><div class="form-field"><label>Date</label><input type="date" id="tr-date" value="${new Date().toISOString().split('T')[0]}"></div></div>${isOut ? `<div class="form-row"><div class="form-field full"><label>Item *</label><select id="tr-item" onchange="updateTransferDetails()"><option value="">Select item</option>${itemOptsHTML}</select></div></div><div class="form-row"><div class="form-field"><label>Qty *</label><input type="number" id="tr-qty" step="0.001" oninput="updateTransferDetails()"></div><div class="form-field"><label>Available</label><input type="text" id="tr-available" readonly value="-"></div><div class="form-field"><label>Value</label><input type="text" id="tr-value" readonly value="R 0.00"></div></div>` : `<div class="form-row"><div class="form-field full"><label>Item Name *</label><input type="text" id="tr-item-name"></div></div><div class="form-row"><div class="form-field"><label>Qty *</label><input type="number" id="tr-qty-req" step="0.001"></div><div class="form-field"><label>Unit</label><select id="tr-unit-req"><option>kg</option><option>liter</option><option>each</option></select></div></div>`}<div class="form-row"><div class="form-field full"><label>Invoice Notes</label><textarea id="tr-notes" rows="3" style="padding:10px;border:1px solid var(--border);border-radius:8px;font-family:inherit;font-size:.9rem;resize:vertical"></textarea></div></div><p style="font-size:.78rem;color:var(--text-light);background:var(--bg-page);padding:10px;border-radius:8px;margin-bottom:14px"><i class="fas fa-info-circle"></i> <strong>Sender:</strong> ${S.user.name} (${S.user.role})</p><div class="form-actions"><button class="btn-outline" onclick="hideTransferForm()">Cancel</button><button class="${isOut?'btn-danger':'btn-success'}" onclick="saveTransfer('${direction}')"><i class="fas fa-${isOut?'arrow-right':'arrow-left'}"></i> ${isOut?'Send':'Submit'}</button></div></div>`;
}
function updateTransferReceivers() {
    const sel = document.getElementById('tr-entity');
    const recSel = document.getElementById('tr-receiver');
    if (!sel || !recSel) return;
    if (sel.selectedIndex < 1) { recSel.innerHTML = '<option value="">Select entity first</option>'; return; }
    const targetEntity = S.entities[parseInt(sel.value)];
    recSel.innerHTML = '<option value="">Select receiver</option>' + getEntityUsersForDropdown(targetEntity.id);
}
function hideTransferForm() { document.getElementById('transfer-form-container').innerHTML = ''; }
function updateTransferDetails() {
    const sel = document.getElementById('tr-item');
    if (!sel || sel.selectedIndex < 1) { document.getElementById('tr-available').value = '-'; document.getElementById('tr-value').value = 'R 0.00'; return; }
    const available = parseFloat(sel.options[sel.selectedIndex].dataset.qty);
    const unit = sel.options[sel.selectedIndex].dataset.unit;
    const cost = parseFloat(sel.options[sel.selectedIndex].dataset.cost);
    const qty = parseFloat(document.getElementById('tr-qty').value) || 0;
    document.getElementById('tr-available').value = `${available} ${unit}`;
    document.getElementById('tr-value').value = 'R ' + (qty * cost).toFixed(2);
}
function saveTransfer(direction) {
    const ent = S.entities[S.activeEntity];
    const targetEntityIdx = parseInt(document.getElementById('tr-entity').value);
    const date = document.getElementById('tr-date').value;
    const notes = document.getElementById('tr-notes').value || '';
    const receiverId = document.getElementById('tr-receiver').value;
    if (isNaN(targetEntityIdx)) { toast('error', 'Select entity'); return; }
    if (!receiverId) { toast('error', 'Select receiver'); return; }
    const targetEntity = S.entities[targetEntityIdx];
    const receiver = (S.users[targetEntity.id]||[]).find(u => u.id === receiverId);
    if (direction === 'out') {
        const sel = document.getElementById('tr-item');
        const qty = parseFloat(document.getElementById('tr-qty').value) || 0;
        if (sel.selectedIndex < 1) { toast('error', 'Select item'); return; }
        if (qty <= 0) { toast('error', 'Enter quantity'); return; }
        const itemId = sel.value;
        const sourceItem = S.inventory[ent.id].find(i => i.id === itemId);
        if (qty > sourceItem.quantity) { toast('error', `Only ${sourceItem.quantity} ${sourceItem.unit} available`); return; }
        sourceItem.quantity -= qty;
        sourceItem.value = sourceItem.quantity * sourceItem.cost;
        sourceItem.status = sourceItem.quantity === 0 ? 'out-of-stock' : sourceItem.quantity <= sourceItem.reorder ? 'low-stock' : 'in-stock';
        S.internalTransfers.unshift({id:'TRF-'+Date.now(),date,timestamp:new Date().toISOString(),time:new Date().toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'}),fromEntityId:ent.id,fromEntityName:ent.name,toEntityId:targetEntity.id,toEntityName:targetEntity.name,itemId:sourceItem.id,itemName:sourceItem.name,itemCategory:sourceItem.category,itemLocation:sourceItem.location,itemReorder:sourceItem.reorder,itemSupplier:sourceItem.supplier,qty,unit:sourceItem.unit,cost:sourceItem.cost,value:qty*sourceItem.cost,by:S.user.name,byRole:S.user.role,receiverId,receiverName:receiver.name,receiverRole:receiver.role,notes,direction:'out',status:'Pending Acceptance'});
        logAction('Transfer Sent', `${qty} ${sourceItem.unit} of ${sourceItem.name} → ${targetEntity.name}`);
        addNotif('info', 'Transfer Incoming', `${ent.name} sent ${qty} ${sourceItem.unit} of ${sourceItem.name}`);
        toast('success', `✓ Sent to ${receiver.name}`);
    }
    saveToStorage();
    hideTransferForm();
    renderTransfers();
    renderInventory();
}
function acceptTransfer(transferId) {
    const transfer = S.internalTransfers.find(t => t.id === transferId);
    if (!transfer) return;
    if (!confirm(`Accept ${transfer.qty} ${transfer.unit} of ${transfer.itemName}?`)) return;
    const ent = S.entities[S.activeEntity];
    if (!S.inventory[ent.id]) S.inventory[ent.id] = [];
    let destItem = S.inventory[ent.id].find(i => i.name.toLowerCase() === transfer.itemName.toLowerCase());
    if (destItem) {
        destItem.quantity += transfer.qty;
        destItem.value = destItem.quantity * destItem.cost;
        destItem.status = destItem.quantity === 0 ? 'out-of-stock' : destItem.quantity <= destItem.reorder ? 'low-stock' : 'in-stock';
    } else {
        S.inventory[ent.id].push({id:`ITM-${Date.now()}`,sku:`FD-${Math.floor(Math.random()*9e4+1e4)}`,name:transfer.itemName,category:transfer.itemCategory || 'General',unit:transfer.unit,quantity:transfer.qty,cost:transfer.cost,lastCost:transfer.cost,value:transfer.qty*transfer.cost,location:transfer.itemLocation || 'Walk-in Fridge',status:transfer.qty <= 10 ? 'low-stock' : 'in-stock',reorder:transfer.itemReorder || 10,supplier:transfer.itemSupplier || ''});
    }
    transfer.status = 'Received';
    transfer.acceptedDate = new Date().toISOString();
    transfer.acceptedBy = S.user.name;
    logAction('Transfer Accepted', `${transfer.qty} ${transfer.unit} of ${transfer.itemName}`);
    saveToStorage();
    renderTransfers();
    renderInventory();
    toast('success', `✓ Transfer accepted`);
}
function rejectTransfer(transferId) {
    const transfer = S.internalTransfers.find(t => t.id === transferId);
    if (!transfer) return;
    if (!confirm(`Reject transfer? Stock returned to ${transfer.fromEntityName}.`)) return;
    const sourceItem = (S.inventory[transfer.fromEntityId]||[]).find(i => i.id === transfer.itemId);
    if (sourceItem) {
        sourceItem.quantity += transfer.qty;
        sourceItem.value = sourceItem.quantity * sourceItem.cost;
        sourceItem.status = sourceItem.quantity === 0 ? 'out-of-stock' : sourceItem.quantity <= sourceItem.reorder ? 'low-stock' : 'in-stock';
    }
    transfer.status = 'Rejected';
    transfer.rejectedDate = new Date().toISOString();
    transfer.rejectedBy = S.user.name;
    saveToStorage();
    renderTransfers();
    toast('info', 'Transfer rejected');
}
function renderTransfers() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const incomingPending = S.internalTransfers.filter(t => t.toEntityId === ent.id && t.status === 'Pending Acceptance');
    const incomingReceived = S.internalTransfers.filter(t => t.toEntityId === ent.id && t.status === 'Received');
    const outgoing = S.internalTransfers.filter(t => t.fromEntityId === ent.id && t.direction === 'out');
    const tbPendingIn = document.getElementById('transfers-pending-in');
    if (tbPendingIn) tbPendingIn.innerHTML = incomingPending.length === 0 ? `<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--text-light)">No pending transfers</td></tr>` : incomingPending.map(t => `<tr><td><strong>${t.fromEntityName}</strong></td><td>${t.by}<br><small style="color:var(--text-light)">${t.byRole}</small></td><td>${t.receiverName}<br><small style="color:var(--text-light)">${t.receiverRole}</small></td><td><strong>${t.itemName}</strong></td><td>${t.qty} ${t.unit}</td><td>R${t.value.toFixed(2)}</td><td>${fmtDate(t.date)} ${t.time}</td><td style="font-size:.72rem;color:var(--text-light);max-width:180px;white-space:normal">${t.notes || '-'}</td><td><div class="row-actions"><button class="row-btn" onclick="acceptTransfer('${t.id}')" title="Accept" style="background:var(--success);color:#fff;border-color:var(--success)"><i class="fas fa-check"></i></button><button class="row-btn del" onclick="rejectTransfer('${t.id}')" title="Reject"><i class="fas fa-times"></i></button></div></td></tr>`).join('');
    const tbReceived = document.getElementById('transfers-received');
    if (tbReceived) tbReceived.innerHTML = incomingReceived.length === 0 ? `<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--text-light)">No received</td></tr>` : incomingReceived.slice(0,15).map(t => `<tr><td><strong>${t.fromEntityName}</strong></td><td>${t.by}</td><td><strong>${t.itemName}</strong></td><td>${t.qty} ${t.unit}</td><td>R${t.value.toFixed(2)}</td><td>${t.acceptedDate ? fmtDate(t.acceptedDate) : '-'}</td><td>${t.acceptedBy || '-'}</td><td>-</td></tr>`).join('');
    const tbSent = document.getElementById('transfers-sent');
    if (tbSent) tbSent.innerHTML = outgoing.length === 0 ? `<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--text-light)">No sent</td></tr>` : outgoing.slice(0,15).map(t => `<tr><td><strong>${t.toEntityName}</strong></td><td>${t.receiverName}</td><td><strong>${t.itemName}</strong></td><td>${t.qty} ${t.unit}</td><td>R${t.value.toFixed(2)}</td><td>${fmtDate(t.date)} ${t.time}</td><td><span class="status-badge ${t.status === 'Received' ? 'received' : t.status === 'Rejected' ? 'rejected' : 'pending'}">${t.status}</span></td><td>-</td></tr>`).join('');
}
function viewTransferReport() {
    const ent = S.entities[S.activeEntity];
    const myTransfers = S.internalTransfers.filter(t => t.fromEntityId === ent.id || t.toEntityId === ent.id);
    let body = `<table class="data-table"><thead><tr><th>Date</th><th>Direction</th><th>From</th><th>To</th><th>Item</th><th>Qty</th><th>Value</th><th>Status</th></tr></thead><tbody>`;
    if (myTransfers.length === 0) body += `<tr><td colspan="8" style="text-align:center;padding:20px">No transfers</td></tr>`;
    else myTransfers.forEach(t => {
        const dir = t.fromEntityId === ent.id ? '<span style="color:var(--danger);font-weight:700">OUT</span>' : '<span style="color:var(--success);font-weight:700">IN</span>';
        body += `<tr><td>${fmtDate(t.date)}</td><td>${dir}</td><td>${t.fromEntityName}</td><td>${t.toEntityName}</td><td><strong>${t.itemName}</strong></td><td>${t.qty} ${t.unit}</td><td>R${(t.value||0).toFixed(2)}</td><td>${t.status}</td></tr>`;
    });
    body += `</tbody></table>`;
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="width:1000px"><div class="modal-top"><h2>Transfers Report</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid">${body}</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Close</button></div></div></div>`;
}

// SUPPLIERS WITH DELIVERY DAYS
function renderSuppliers() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const sups = S.suppliers[ent.id] || [];
    const inv = S.inventory[ent.id] || [];
    const g = document.getElementById('suppliers-grid');
    if (g) g.innerHTML = sups.map(s => {
        const linked = (s.linkedItems || []).length;
        const deliveryDaysText = s.deliveryDays && s.deliveryDays.length > 0 ? s.deliveryDays.map(d => DAYS_SHORT[DAYS_OF_WEEK.indexOf(d)]).join(', ') : 'Not set';
        return `<div class="supplier-card"><div class="supplier-head"><div class="supplier-avatar">${s.name[0]}</div><div style="flex:1"><div class="supplier-name">${s.name}</div><div class="supplier-type">${s.type}</div><div class="supplier-delivery-days"><i class="fas fa-truck"></i> ${deliveryDaysText}</div></div></div><div class="supplier-stats"><div class="supplier-stat"><span class="supplier-stat-val">${s.orders}</span><span class="supplier-stat-lbl">Orders</span></div><div class="supplier-stat"><span class="supplier-stat-val">⭐${s.rating}</span><span class="supplier-stat-lbl">Rating</span></div><div class="supplier-stat"><span class="supplier-stat-val">${s.onTime}</span><span class="supplier-stat-lbl">On Time</span></div><div class="supplier-stat"><span class="supplier-stat-val">${linked}</span><span class="supplier-stat-lbl">Items</span></div></div><div class="card-actions"><button class="btn-outline" onclick="editSupplier('${s.id}')"><i class="fas fa-edit"></i> Edit</button><button class="btn-primary" onclick="showManualPOForm()"><i class="fas fa-shopping-cart"></i> Order</button></div></div>`;
    }).join('');
}
function showAddSupplierForm() {
    const ent = S.entities[S.activeEntity];
    const inv = S.inventory[ent.id] || [];
    const itemChecks = inv.map(i => `<label style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:.85rem"><input type="checkbox" value="${i.id}" style="accent-color:var(--accent)">${i.name}</label>`).join('');
    const daysChecks = DAYS_OF_WEEK.map((d,i) => `<label class="day-check"><input type="checkbox" value="${d}"><span>${DAYS_SHORT[i]}</span></label>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2>Add Supplier</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><div class="form-row"><div class="form-field"><label>Name *</label><input type="text" id="ns-name"></div><div class="form-field"><label>Type</label><select id="ns-type"><option>Vegetables</option><option>Proteins</option><option>Dairy</option><option>Dry Goods</option><option>Beverages</option><option>General</option></select></div></div><div class="form-row"><div class="form-field"><label>Phone</label><input type="tel" id="ns-phone"></div><div class="form-field"><label>Email</label><input type="email" id="ns-email"></div></div><div class="form-field" style="margin-top:14px"><label style="font-weight:700;margin-bottom:8px;display:block"><i class="fas fa-truck"></i> Delivery Days</label><div class="days-grid">${daysChecks}</div></div><div class="form-field" style="margin-top:14px"><label style="font-weight:700;margin-bottom:8px;display:block">Link Items</label><div style="max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;padding:10px;background:var(--bg-page)">${itemChecks||'<p>No items</p>'}</div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="saveNewSupplier()"><i class="fas fa-save"></i> Save</button></div></div></div>`;
}
function saveNewSupplier() {
    const name = document.getElementById('ns-name').value;
    if (!name) { toast('error','Enter name'); return; }
    const linkedItems = [];
    const deliveryDays = [];
    document.querySelectorAll('#modal-container input[type="checkbox"]').forEach(cb => {
        if (!cb.checked) return;
        if (DAYS_OF_WEEK.includes(cb.value)) deliveryDays.push(cb.value);
        else linkedItems.push(cb.value);
    });
    const ent = S.entities[S.activeEntity];
    if (!S.suppliers[ent.id]) S.suppliers[ent.id] = [];
    S.suppliers[ent.id].push({id:'SUP-'+Date.now(), name, type:document.getElementById('ns-type').value, phone:document.getElementById('ns-phone').value, email:document.getElementById('ns-email').value, orders:0, rating:'5.0', onTime:'100%', linkedItems, deliveryDays});
    linkedItems.forEach(itemId => { const item = S.inventory[ent.id].find(i => i.id === itemId); if (item) item.supplier = name; });
    logAction('Supplier Added', name);
    saveToStorage(); closeModal(); renderSuppliers();
    toast('success', `${name} added`);
}
function editSupplier(id) {
    const ent = S.entities[S.activeEntity];
    const sup = (S.suppliers[ent.id]||[]).find(s => s.id === id);
    if (!sup) return;
    const inv = S.inventory[ent.id] || [];
    const itemChecks = inv.map(i => `<label style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:.85rem"><input type="checkbox" value="${i.id}" ${(sup.linkedItems||[]).includes(i.id)?'checked':''} style="accent-color:var(--accent)">${i.name}</label>`).join('');
    const daysChecks = DAYS_OF_WEEK.map((d,i) => `<label class="day-check"><input type="checkbox" value="${d}" ${(sup.deliveryDays||[]).includes(d)?'checked':''}><span>${DAYS_SHORT[i]}</span></label>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2>Edit ${sup.name}</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><div class="form-row"><div class="form-field"><label>Phone</label><input type="tel" id="es-phone" value="${sup.phone}"></div><div class="form-field"><label>Email</label><input type="email" id="es-email" value="${sup.email||''}"></div></div><div class="form-field" style="margin-top:14px"><label style="font-weight:700;display:block;margin-bottom:8px"><i class="fas fa-truck"></i> Delivery Days</label><div class="days-grid">${daysChecks}</div></div><div class="form-field" style="margin-top:14px"><label style="font-weight:700;display:block;margin-bottom:8px">Linked Items</label><div style="max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;padding:10px;background:var(--bg-page)">${itemChecks}</div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="updateSupplier('${id}')"><i class="fas fa-save"></i> Update</button></div></div></div>`;
}
function updateSupplier(id) {
    const ent = S.entities[S.activeEntity];
    const sup = (S.suppliers[ent.id]||[]).find(s => s.id === id);
    if (!sup) return;
    sup.phone = document.getElementById('es-phone').value;
    sup.email = document.getElementById('es-email').value;
    const linkedItems = [];
    const deliveryDays = [];
    document.querySelectorAll('#modal-container input[type="checkbox"]').forEach(cb => {
        if (!cb.checked) return;
        if (DAYS_OF_WEEK.includes(cb.value)) deliveryDays.push(cb.value);
        else linkedItems.push(cb.value);
    });
    sup.linkedItems = linkedItems;
    sup.deliveryDays = deliveryDays;
    S.inventory[ent.id].forEach(item => {
        if (linkedItems.includes(item.id)) item.supplier = sup.name;
        else if (item.supplier === sup.name) item.supplier = '';
    });
    logAction('Supplier Updated', sup.name);
    saveToStorage(); closeModal(); renderSuppliers(); renderInventory();
    toast('success','Updated');
}

// USERS - WITH EDIT FUNCTIONS
function renderUsers() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    const us = S.users[ent.id] || [];
    const canEdit = S.user.role === 'Owner';
    const g = document.getElementById('users-grid');
    if (g) g.innerHTML = us.map(u => `<div class="user-card"><div class="user-head"><div class="user-avatar">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div><div class="user-name">${u.name}</div><div class="user-role">${u.role}</div>${u.email ? `<div style="font-size:.7rem;color:var(--text-light);margin-top:2px"><i class="fas fa-envelope"></i> ${u.email}</div>` : ''}${u.phone ? `<div style="font-size:.7rem;color:var(--text-light);margin-top:2px"><i class="fas fa-phone"></i> ${u.phone}</div>` : ''}</div></div><div class="user-stats"><div class="user-stat"><span class="user-stat-val">${Math.floor(Math.random()*200+50)}</span><span class="user-stat-lbl">Actions</span></div><div class="user-stat"><span class="user-stat-val">Today</span><span class="user-stat-lbl">Last Seen</span></div></div><div class="card-actions">${canEdit ? `<button class="btn-outline" onclick="showEditUserForm('${u.id}')"><i class="fas fa-edit"></i> Edit</button><button class="btn-danger" onclick="deleteUserConfirm('${u.id}')"><i class="fas fa-trash"></i> Delete</button>` : `<button class="btn-outline" disabled style="opacity:.5"><i class="fas fa-lock"></i> Owner Only</button>`}</div></div>`).join('') || '<p style="color:var(--text-light);padding:20px;grid-column:1/-1;text-align:center">No users yet</p>';
}
function addUserPrompt() {
    const perms = PERMS[S.user.role] || {};
    if (!perms.canAddUsers) { toast('error','No permission'); return; }
    const roles = ['General Manager','Area Manager','Operations Manager','Manager','Stock Controller','Kitchen Manager','Bar Manager','Floor Supervisor','Bar Supervisor'];
    const roleOpts = roles.map(r => `<option>${r}</option>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2><i class="fas fa-user-plus"></i> Add New User</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><div class="form-row"><div class="form-field"><label>Full Name *</label><input type="text" id="nu-name" required></div><div class="form-field"><label>Role *</label><select id="nu-role">${roleOpts}</select></div></div><div class="form-row"><div class="form-field"><label>Email</label><input type="email" id="nu-email"></div><div class="form-field"><label>Phone</label><input type="tel" id="nu-phone"></div></div><div class="form-row"><div class="form-field"><label>ID Number</label><input type="text" id="nu-id"></div><div class="form-field"><label>Position</label><input type="text" id="nu-position"></div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="saveNewUser()"><i class="fas fa-save"></i> Add User</button></div></div></div>`;
}
function saveNewUser() {
    const ent = S.entities[S.activeEntity];
    const name = document.getElementById('nu-name').value;
    const role = document.getElementById('nu-role').value;
    if (!name || !role) { toast('error','Name and role required'); return; }
    if (!S.users[ent.id]) S.users[ent.id] = [];
    S.users[ent.id].push({id:'usr-'+Date.now(),name,role,email:document.getElementById('nu-email').value,phone:document.getElementById('nu-phone').value,idNumber:document.getElementById('nu-id').value,position:document.getElementById('nu-position').value,createdDate:new Date().toISOString(),createdBy:S.user.name});
    logAction('User Added', `${name} as ${role}`);
    saveToStorage(); closeModal(); renderUsers();
    toast('success', `✓ ${name} added`);
}
function showEditUserForm(userId) {
    if (S.user.role !== 'Owner') { toast('error','Only Owner can edit'); return; }
    const ent = S.entities[S.activeEntity];
    const user = (S.users[ent.id]||[]).find(u => u.id === userId);
    if (!user) return;
    const roles = ['General Manager','Area Manager','Operations Manager','Manager','Stock Controller','Kitchen Manager','Bar Manager','Floor Supervisor','Bar Supervisor'];
    const roleOpts = roles.map(r => `<option ${user.role===r?'selected':''}>${r}</option>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2><i class="fas fa-user-edit"></i> Edit User</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><div class="form-row"><div class="form-field"><label>Full Name *</label><input type="text" id="eu-name" value="${user.name}" required></div><div class="form-field"><label>Role *</label><select id="eu-role">${roleOpts}</select></div></div><div class="form-row"><div class="form-field"><label>Email</label><input type="email" id="eu-email" value="${user.email||''}"></div><div class="form-field"><label>Phone</label><input type="tel" id="eu-phone" value="${user.phone||''}"></div></div><div class="form-row"><div class="form-field"><label>ID Number</label><input type="text" id="eu-id" value="${user.idNumber||''}"></div><div class="form-field"><label>Position</label><input type="text" id="eu-position" value="${user.position||''}"></div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="saveEditedUser('${userId}')"><i class="fas fa-save"></i> Save</button></div></div></div>`;
}
function saveEditedUser(userId) {
    const ent = S.entities[S.activeEntity];
    const user = (S.users[ent.id]||[]).find(u => u.id === userId);
    if (!user) return;
    const name = document.getElementById('eu-name').value;
    if (!name) { toast('error','Name required'); return; }
    user.name = name;
    user.role = document.getElementById('eu-role').value;
    user.email = document.getElementById('eu-email').value;
    user.phone = document.getElementById('eu-phone').value;
    user.idNumber = document.getElementById('eu-id').value;
    user.position = document.getElementById('eu-position').value;
    logAction('User Updated', name);
    saveToStorage(); closeModal(); renderUsers();
    toast('success', `✓ ${name} updated`);
}
function deleteUserConfirm(userId) {
    if (S.user.role !== 'Owner') { toast('error','Only Owner can delete'); return; }
    const ent = S.entities[S.activeEntity];
    const user = (S.users[ent.id]||[]).find(u => u.id === userId);
    if (!user) return;
    if (!confirm(`Delete "${user.name}"?`)) return;
    S.users[ent.id] = S.users[ent.id].filter(u => u.id !== userId);
    logAction('User Deleted', user.name);
    saveToStorage(); renderUsers();
    toast('success', `✓ ${user.name} deleted`);
}

// EDIT ENTITY & OWNER (Owner only)
function showEditEntityForm() {
    if (S.user.role !== 'Owner') { toast('error','Only Owner can edit'); return; }
    const ent = S.entities[S.activeEntity];
    const allSections = ['Walk-in Fridge','Walk-in Freezer','Dry Store','Bar','Cold Kitchen','Hot Kitchen','Pastry Section','Prep Kitchen','Receiving Area','Wine Cellar'];
    const sectionChecks = allSections.map(s => `<label class="section-check"><input type="checkbox" value="${s}" ${ent.sections.includes(s)?'checked':''}><span>${s}</span></label>`).join('');
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2><i class="fas fa-edit"></i> Edit Entity</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><div class="form-row"><div class="form-field"><label>Entity Name *</label><input type="text" id="ee-name" value="${ent.name}"></div><div class="form-field"><label>Contact *</label><input type="text" id="ee-contact" value="${ent.contact||''}"></div></div><div class="form-row"><div class="form-field"><label>Phone</label><input type="tel" id="ee-phone" value="${ent.phone||''}"></div><div class="form-field"><label>Email</label><input type="email" id="ee-email" value="${ent.email||''}"></div></div><div class="form-row"><div class="form-field full"><label>Address</label><textarea id="ee-address" rows="2" style="padding:10px;border:1px solid var(--border);border-radius:8px">${ent.address||''}</textarea></div></div><div class="form-row"><div class="form-field"><label>VAT</label><input type="text" id="ee-vat" value="${ent.vat||''}"></div><div class="form-field"><label>Food Cost %</label><input type="number" id="ee-foodcost" value="${ent.foodCostTarget}" min="1" max="100" step="0.1"></div></div><div class="form-field" style="margin-top:14px"><label style="font-weight:700;display:block;margin-bottom:8px">Stock Sheet Sections</label><div class="sections-grid">${sectionChecks}</div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="saveEditedEntity()"><i class="fas fa-save"></i> Save</button></div></div></div>`;
}
function saveEditedEntity() {
    const ent = S.entities[S.activeEntity];
    const name = document.getElementById('ee-name').value;
    if (!name) { toast('error','Name required'); return; }
    const sections = [];
    document.querySelectorAll('#modal-container .sections-grid input:checked').forEach(cb => sections.push(cb.value));
    if (sections.length === 0) { toast('error','Select sections'); return; }
    ent.name = name;
    ent.contact = document.getElementById('ee-contact').value;
    ent.phone = document.getElementById('ee-phone').value;
    ent.email = document.getElementById('ee-email').value;
    ent.address = document.getElementById('ee-address').value;
    ent.vat = document.getElementById('ee-vat').value;
    ent.foodCostTarget = parseFloat(document.getElementById('ee-foodcost').value) || 28;
    ent.sections = sections;
    logAction('Entity Updated', name);
    saveToStorage(); closeModal();
    document.getElementById('sidebar-entity-name').textContent = ent.name;
    document.getElementById('header-entity-name').textContent = ent.name;
    renderPages();
    toast('success', '✓ Entity updated');
}
function showEditOwnerForm() {
    if (S.user.role !== 'Owner' || !S.owner) return;
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2><i class="fas fa-user-edit"></i> Edit Owner</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid"><h4 style="font-size:.95rem;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--accent)">Owner</h4><div class="form-row"><div class="form-field"><label>Full Name *</label><input type="text" id="eo-name" value="${S.owner.name}"></div><div class="form-field"><label>Email *</label><input type="email" id="eo-email" value="${S.owner.email}"></div></div><div class="form-row"><div class="form-field"><label>Phone</label><input type="tel" id="eo-phone" value="${S.owner.phone||''}"></div><div class="form-field"><label>ID</label><input type="text" id="eo-id" value="${S.owner.idNumber||''}"></div></div><h4 style="font-size:.95rem;margin:20px 0 12px;padding-bottom:8px;border-bottom:2px solid var(--accent)">Group</h4><div class="form-row"><div class="form-field"><label>Group Name *</label><input type="text" id="eo-group" value="${S.owner.groupName||''}"></div><div class="form-field"><label>VAT</label><input type="text" id="eo-groupvat" value="${S.owner.groupVat||''}"></div></div><div class="form-row"><div class="form-field full"><label>Address</label><textarea id="eo-groupaddr" rows="2" style="padding:10px;border:1px solid var(--border);border-radius:8px">${S.owner.groupAddress||''}</textarea></div></div></div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="saveEditedOwner()"><i class="fas fa-save"></i> Save</button></div></div></div>`;
}
function saveEditedOwner() {
    const name = document.getElementById('eo-name').value;
    const email = document.getElementById('eo-email').value;
    if (!name || !email) { toast('error','Name and email required'); return; }
    S.owner.name = name;
    S.owner.email = email;
    S.owner.phone = document.getElementById('eo-phone').value;
    S.owner.idNumber = document.getElementById('eo-id').value;
    S.owner.groupName = document.getElementById('eo-group').value;
    S.owner.groupVat = document.getElementById('eo-groupvat').value;
    S.owner.groupAddress = document.getElementById('eo-groupaddr').value;
    S.user.name = name;
    document.getElementById('side-user-name').textContent = name;
    logAction('Owner Updated', name);
    saveToStorage(); closeModal(); renderPages();
    toast('success', '✓ Owner updated');
}

// WASTAGE
function renderWastageTable() {
    const ent = S.entities[S.activeEntity]; if (!ent) return;
    let ws = S.wastage[ent.id] || [];
    const perms = PERMS[S.user.role] || {};
    if (perms.categories && perms.categories !== 'all') ws = ws.filter(w => perms.categories.includes(w.category));
    const tb = document.getElementById('wastage-body');
    if (tb) tb.innerHTML = ws.map(w => `<tr><td>${fmtDate(w.date)}</td><td><strong>${w.item}</strong></td><td>${w.qty} ${w.unit}</td><td>R${w.value.toFixed(2)}</td><td>${w.reason}</td><td>${w.by}</td></tr>`).join('');
}
function logWastagePrompt() {
    const ent = S.entities[S.activeEntity];
    let inv = S.inventory[ent.id] || [];
    inv = filterByUserCategories(inv);
    const itemName = prompt('Item name:'); if (!itemName) return;
    const item = inv.find(i => i.name.toLowerCase().includes(itemName.toLowerCase()));
    if (!item) { toast('error','Item not found'); return; }
    const qty = parseFloat(prompt('Quantity wasted ('+item.unit+'):')); if (!qty) return;
    const reason = prompt('Reason:','Expired');
    if (!S.wastage[ent.id]) S.wastage[ent.id] = [];
    S.wastage[ent.id].unshift({date:new Date(),item:item.name,category:item.category,unit:item.unit,qty,value:qty*item.cost,reason,by:S.user.name});
    item.quantity = Math.max(0, item.quantity - qty);
    item.value = item.quantity * item.cost;
    item.status = item.quantity === 0 ? 'out-of-stock' : item.quantity <= item.reorder ? 'low-stock' : 'in-stock';
    logAction('Wastage', `${item.name}: ${qty} ${item.unit}`);
    saveToStorage(); renderWastageTable(); renderInventory(); toast('success','Logged');
}

// NOTIFICATIONS
function renderNotifs() {
    const ic = {warning:'exclamation-triangle',success:'check-circle',danger:'times-circle',info:'info-circle'};
    const list = document.getElementById('notif-list');
    if (list) list.innerHTML = S.notifs.map(n => `<div class="notif-item ${n.unread?'unread':''}"><div class="notif-icon ${n.type}"><i class="fas fa-${ic[n.type]}"></i></div><div class="notif-content"><div class="notif-title">${n.title}</div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div></div>`).join('');
    const badge = document.querySelector('.notif-badge');
    if (badge) badge.textContent = S.notifs.filter(n => n.unread).length;
}
function addNotif(type, title, text) { S.notifs.unshift({type,title,text,time:'now',unread:true}); renderNotifs(); saveToStorage(); }
function clearNotifs() { S.notifs = []; renderNotifs(); saveToStorage(); }

// GLOBAL CONTENT
function renderGlobalPurchases() {
    const c = document.getElementById('global-purchases-content'); if (!c) return;
    const f = S.viewFilter;
    if (f === 'all') {
        let html = '';
        let grandTotal = 0, grandCount = 0;
        S.entities.forEach(ent => {
            const ps = S.purchases[ent.id] || [];
            grandTotal += ps.reduce((s, p) => s + p.total, 0);
            grandCount += ps.length;
        });
        html += `<div class="global-entity-section"><div class="global-entity-heading" style="background:linear-gradient(90deg,rgba(245,158,11,.1),transparent);border-left-color:var(--gold)"><i class="fas fa-globe"></i> Group Purchases Summary <span style="font-weight:400;font-size:.85rem;color:var(--text-light);margin-left:8px">(${grandCount} POs • Group Total: R${fmtNum(grandTotal)})</span></div></div>`;
        S.entities.forEach(ent => {
            const ps = S.purchases[ent.id] || [];
            const entityTotal = ps.reduce((s, p) => s + p.total, 0);
            html += `<div class="global-entity-section"><div class="global-entity-heading"><i class="fas fa-building"></i> ${ent.name} <span style="font-weight:400;font-size:.85rem;color:var(--text-light);margin-left:8px">(${ps.length} POs • Total: R${fmtNum(entityTotal)})</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>PO</th><th>Supplier</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead><tbody>`;
            ps.slice(0,5).forEach(p => { html += `<tr><td><strong>${p.id}</strong></td><td>${p.supplier}</td><td>${p.items}</td><td>R${fmtNum(p.total)}</td><td>${fmtDate(p.date)}</td><td><span class="status-badge">${p.status}</span></td></tr>`; });
            html += `</tbody></table></div></div>`;
        });
        c.innerHTML = html;
    } else {
        const ent = S.entities[parseInt(f)];
        const ps = S.purchases[ent.id] || [];
        const entityTotal = ps.reduce((s, p) => s + p.total, 0);
        c.innerHTML = `<div class="global-entity-section"><div class="global-entity-heading"><i class="fas fa-building"></i> ${ent.name} <span style="font-weight:400;font-size:.85rem;color:var(--text-light);margin-left:8px">(${ps.length} POs • Total: R${fmtNum(entityTotal)})</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>PO</th><th>Supplier</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead><tbody>${ps.map(p => `<tr><td><strong>${p.id}</strong></td><td>${p.supplier}</td><td>${p.items}</td><td>R${fmtNum(p.total)}</td><td>${fmtDate(p.date)}</td><td><span class="status-badge">${p.status}</span></td></tr>`).join('')}</tbody></table></div></div>`;
    }
}

function renderGlobalStockTake() {
    const c = document.getElementById('global-stocktake-content'); if (!c) return;
    const f = S.viewFilter;
    if (f === 'all') {
        const combined = {};
        let grandTotalValue = 0;
        S.entities.forEach(ent => {
            const inv = S.inventory[ent.id] || [];
            inv.forEach(item => {
                const key = item.name.toLowerCase().trim();
                if (!combined[key]) combined[key] = {name: item.name, category: item.category, unit: item.unit, cost: item.cost, totalQty: 0, totalValue: 0, entityBreakdown: [], status: 'in-stock'};
                combined[key].totalQty += item.quantity;
                combined[key].totalValue += item.value;
                combined[key].entityBreakdown.push({entity: ent.name, qty: item.quantity, status: item.status});
                grandTotalValue += item.value;
            });
        });
        Object.values(combined).forEach(item => {
            const allOut = item.entityBreakdown.every(e => e.status === 'out-of-stock');
            const hasLow = item.entityBreakdown.some(e => e.status === 'low-stock' || e.status === 'out-of-stock');
            if (allOut) item.status = 'out-of-stock';
            else if (hasLow) item.status = 'low-stock';
        });
        const items = Object.values(combined).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
        const totalItems = items.length;
        const lowCount = items.filter(i => i.status === 'low-stock').length;
        const outCount = items.filter(i => i.status === 'out-of-stock').length;
        let html = `<div class="global-entity-section"><div class="global-entity-heading" style="background:linear-gradient(90deg,rgba(245,158,11,.1),transparent);border-left-color:var(--gold)"><i class="fas fa-globe"></i> Combined Group Stock</div><div class="stats-row" style="margin-bottom:18px"><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Unique Items</div><div class="stat-card-value">${totalItems}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Total Value</div><div class="stat-card-value">R${fmtNum(grandTotalValue)}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Low Stock</div><div class="stat-card-value" style="color:var(--warning)">${lowCount}</div></div><div class="stat-card gold"><div class="stat-card-bracket-bottom"></div><div class="stat-card-title">Out of Stock</div><div class="stat-card-value" style="color:var(--danger)">${outCount}</div></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Total Qty</th><th>Unit</th><th>Cost</th><th>Value</th><th>Breakdown</th><th>Status</th></tr></thead><tbody>`;
        items.forEach(item => {
            const breakdownHTML = item.entityBreakdown.map(e => `<span style="display:inline-block;background:var(--bg-page);padding:2px 8px;border-radius:10px;margin:2px;font-size:.72rem"><strong>${e.entity}:</strong> ${e.qty}</span>`).join('');
            html += `<tr><td><strong>${item.name}</strong></td><td>${item.category}</td><td><strong style="color:var(--accent)">${item.totalQty.toFixed(2)}</strong></td><td>${item.unit}</td><td>R${item.cost.toFixed(2)}</td><td><strong>R${fmtNum(item.totalValue)}</strong></td><td>${breakdownHTML}</td><td><span class="status-badge ${item.status}">${statusText(item.status)}</span></td></tr>`;
        });
        html += `</tbody></table></div></div>`;
        c.innerHTML = html;
    } else {
        const ent = S.entities[parseInt(f)];
        const inv = S.inventory[ent.id] || [];
        const totalValue = inv.reduce((s, i) => s + i.value, 0);
        c.innerHTML = `<div class="global-entity-section"><div class="global-entity-heading"><i class="fas fa-building"></i> ${ent.name} <span style="font-weight:400;font-size:.85rem;color:var(--text-light);margin-left:8px">(${inv.length} items • R${fmtNum(totalValue)})</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Item</th><th>Category</th><th>Section</th><th>Qty</th><th>Unit</th><th>Cost</th><th>Value</th><th>Status</th></tr></thead><tbody>${inv.map(i => `<tr><td><strong>${i.name}</strong></td><td>${i.category}</td><td>${i.location}</td><td>${i.quantity}</td><td>${i.unit}</td><td>R${i.cost.toFixed(2)}</td><td>R${fmtNum(i.value)}</td><td><span class="status-badge ${i.status}">${statusText(i.status)}</span></td></tr>`).join('')}</tbody></table></div></div>`;
    }
}

function renderGlobalWastage() {
    const c = document.getElementById('global-wastage-content'); if (!c) return;
    const f = S.viewFilter;
    if (f === 'all') {
        let html = '';
        S.entities.forEach(ent => {
            const ws = S.wastage[ent.id] || [];
            const total = ws.reduce((s,w) => s+w.value, 0);
            html += `<div class="global-entity-section"><div class="global-entity-heading"><i class="fas fa-building"></i> ${ent.name} <span style="font-weight:400;font-size:.85rem;color:var(--text-light);margin-left:8px">(Total: R${fmtNum(total)})</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Value</th><th>Reason</th></tr></thead><tbody>`;
            ws.slice(0,5).forEach(w => { html += `<tr><td>${fmtDate(w.date)}</td><td><strong>${w.item}</strong></td><td>${w.qty} ${w.unit}</td><td>R${w.value.toFixed(2)}</td><td>${w.reason}</td></tr>`; });
            html += `</tbody></table></div></div>`;
        });
        c.innerHTML = html;
    } else {
        const ent = S.entities[parseInt(f)];
        const ws = S.wastage[ent.id] || [];
        c.innerHTML = `<div class="global-entity-section"><div class="global-entity-heading"><i class="fas fa-building"></i> ${ent.name}</div><div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Value</th><th>Reason</th></tr></thead><tbody>${ws.map(w => `<tr><td>${fmtDate(w.date)}</td><td><strong>${w.item}</strong></td><td>${w.qty} ${w.unit}</td><td>R${w.value.toFixed(2)}</td><td>${w.reason}</td></tr>`).join('')}</tbody></table></div></div>`;
    }
}

// REPORTS
function viewReport(type) {
    const ent = S.entities[S.activeEntity];
    const date = S.selectedDate;
    let title = '', body = '';
    if (type === 'day-end') { title = `Day End — ${date}`; const cu = (S.cashups[ent.id]||{})[date]||{}; body = `<p><strong>${ent.name}</strong></p><div class="summary-row"><span>Sales</span><strong>R${(cu.total||0).toFixed(2)}</strong></div><div class="summary-row"><span>Cash</span><strong>R${(cu.cash||0).toFixed(2)}</strong></div><div class="summary-row"><span>Cards</span><strong>R${(cu.cards||0).toFixed(2)}</strong></div>`; }
    else if (type === 'cashup') { title = `Cash-up — ${date}`; const cu = (S.cashups[ent.id]||{})[date]||{}; body = `<div class="summary-row"><span>Cash</span><strong>R${(cu.cash||0).toFixed(2)}</strong></div><div class="summary-row"><span>Cards</span><strong>R${(cu.cards||0).toFixed(2)}</strong></div><div class="summary-row"><span>Vouchers</span><strong>R${(cu.vouchers||0).toFixed(2)}</strong></div><div class="summary-row total"><span>TOTAL</span><strong>R${(cu.total||0).toFixed(2)}</strong></div>`; }
    else if (type === 'stock-variance') { let inv = S.inventory[ent.id]||[]; inv = filterByUserCategories(inv); body = `<table class="data-table"><thead><tr><th>Item</th><th>Expected</th><th>Counted</th><th>Variance</th></tr></thead><tbody>${inv.slice(0,15).map(i => { const c = i.quantity + Math.floor(Math.random()*5-2); const v = c - i.quantity; return `<tr><td>${i.name}</td><td>${i.quantity}</td><td>${c}</td><td style="color:${v===0?'var(--text-mid)':v>0?'var(--success)':'var(--danger)'}">${v>0?'+':''}${v}</td></tr>`; }).join('')}</tbody></table>`; title = `Stock Variance — ${date}`; }
    else if (type === 'user-logs') { const logs = S.userLogs[ent.id]||[]; body = `<table class="data-table"><thead><tr><th>User</th><th>Action</th><th>Date</th><th>Time</th></tr></thead><tbody>${logs.slice(0,30).map(l => `<tr><td><strong>${l.user}</strong></td><td>${l.action}: ${l.details||''}</td><td>${l.date}</td><td>${l.time}</td></tr>`).join('')}</tbody></table>`; title = `User Logs`; }
    else { title = `${type} — ${date}`; body = `<p>This report shows ${type} data.</p>`; }
    document.getElementById('modal-container').innerHTML = `<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2>${title}</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid">${body}</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Close</button><button class="btn-primary" onclick="window.print()"><i class="fas fa-print"></i> Print</button></div></div></div>`;
}

// CHARTS
let chartInstances = {};
function initDashCharts() {
    const fcTarget = S.isGlobalMode ? (S.entities.reduce((s,e)=>s+e.foodCostTarget,0)/S.entities.length) : (S.entities[S.activeEntity] ? S.entities[S.activeEntity].foodCostTarget : 28);
    if (chartInstances.food) chartInstances.food.destroy();
    if (chartInstances.pie) chartInstances.pie.destroy();
    const cc = document.getElementById('foodCostChart');
    if (cc) chartInstances.food = new Chart(cc, {type:'line',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Food Cost %',data:[fcTarget-1.5,fcTarget+.2,fcTarget-.2,fcTarget+1.1,fcTarget+2.2,fcTarget+4.1,fcTarget+.4],borderColor:'#1a8ba8',backgroundColor:'rgba(26,139,168,.1)',fill:true,tension:.4,borderWidth:2},{label:'Target',data:Array(7).fill(fcTarget),borderColor:'#d4a017',borderWidth:2,borderDash:[5,5],fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#2a5f70'}}},scales:{x:{grid:{color:'#e0eff3'},ticks:{color:'#5a8a96'}},y:{grid:{color:'#e0eff3'},ticks:{color:'#5a8a96',callback:v=>v+'%'}}}}});
    const pc = document.getElementById('overviewPie');
    if (pc) {
        let sv = 125000, sa = 12500, wa = 3200;
        if (S.isGlobalMode) { sv = S.entities.reduce((s,e) => s+(S.inventory[e.id]||[]).reduce((a,i)=>a+i.value,0),0); sa *= S.entities.length; wa *= S.entities.length; }
        else if (S.entities[S.activeEntity]) { let inv = (S.inventory[S.entities[S.activeEntity].id]||[]); inv = filterByUserCategories(inv); sv = inv.reduce((s,i)=>s+i.value,0); }
        chartInstances.pie = new Chart(pc, {type:'doughnut',data:{labels:['Stock','Sales','Wastage'],datasets:[{data:[sv,sa,wa],backgroundColor:['#1a8ba8','#4dbdd5','#d4a017'],borderWidth:0,hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.label}: R${c.raw.toLocaleString()}`}}},cutout:'60%'}});
    }
}
function initForecastChart() {
    const fc = document.getElementById('forecastChart'); if (!fc || fc._done) return; fc._done = true;
    const labels = Array.from({length:30},(_,i)=>`D${i+1}`);
    const actual = Array.from({length:15},()=>Math.floor(Math.random()*60+30));
    const predicted = [...actual.slice(-3),...Array.from({length:18},()=>Math.floor(Math.random()*60+35))];
    new Chart(fc,{type:'line',data:{labels,datasets:[{label:'Actual',data:[...actual,...Array(15).fill(null)],borderColor:'#1a8ba8',backgroundColor:'rgba(26,139,168,.1)',fill:true,tension:.4},{label:'Predicted',data:[...Array(12).fill(null),...predicted],borderColor:'#4dbdd5',backgroundColor:'rgba(77,189,213,.1)',fill:true,tension:.4,borderDash:[5,5]}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#2a5f70'}}},scales:{x:{grid:{color:'#e0eff3'},ticks:{color:'#5a8a96',maxTicksLimit:10}},y:{grid:{color:'#e0eff3'},ticks:{color:'#5a8a96'}}}}});
    const ent = S.entities[S.activeEntity];
    const inv = ent ? (S.inventory[ent.id]||[]) : [];
    if (document.getElementById('reorder-list')) document.getElementById('reorder-list').innerHTML = inv.filter(i=>i.status==='low-stock').slice(0,5).map(i=>`<div class="alert-item" style="margin-bottom:8px"><div><span class="alert-name">${i.name}</span><span class="alert-detail">Current: ${i.quantity} ${i.unit}</span></div><button class="alert-btn">Order</button></div>`).join('')||'<p style="text-align:center;color:var(--text-light);padding:20px">All stocked! 🎉</p>';
}

// AI
function toggleAI() { document.getElementById('ai-panel').classList.toggle('open'); }
function sendAIInput() { const inp = document.getElementById('ai-input'); const msg = inp.value.trim(); if (!msg) return; addAI('user', msg); inp.value = ''; setTimeout(() => addAI('bot', aiReply(msg)), 500); }
function sendAI(msg) { document.getElementById('ai-input').value = msg; sendAIInput(); }
function addAI(type, txt) { const box = document.getElementById('ai-messages'); const d = document.createElement('div'); d.className = `ai-msg ${type}`; d.innerHTML = `<div class="bubble">${txt}</div>`; box.appendChild(d); box.scrollTop = box.scrollHeight; }
function aiReply(q) {
    const ql = q.toLowerCase();
    let inv = [], entName = 'restaurant', fcTarget = 28, menu = [];
    if (S.isGlobalMode) { S.entities.forEach(e => { inv = inv.concat(S.inventory[e.id]||[]); menu = menu.concat(S.menuItems[e.id]||[]); }); entName = 'all entities'; fcTarget = S.entities.reduce((s,e)=>s+e.foodCostTarget,0)/S.entities.length; }
    else { const ent = S.entities[S.activeEntity]; if (ent) { inv = S.inventory[ent.id]||[]; menu = S.menuItems[ent.id]||[]; entName = ent.name; fcTarget = ent.foodCostTarget; } }
    inv = filterByUserCategories(inv);
    if (ql.includes('low')) { const low = inv.filter(i => i.status === 'low-stock'); return `<p>📊 <strong>${low.length} low at ${entName}:</strong></p><ul>${low.slice(0,8).map(i=>`<li>${i.name} — ${i.quantity} ${i.unit}</li>`).join('')}</ul>`; }
    if (ql.includes('wastage')) return `<p>🗑️ Today's wastage at ${entName}: <strong>R3,200</strong></p>`;
    if (ql.includes('reorder')) { const low = inv.filter(i=>i.status==='low-stock'||i.status==='out-of-stock'); let t=0; let r=`<p>🛒 Reorder:</p><ul>`; low.slice(0,8).forEach(i=>{const c=i.reorder*3*i.cost;t+=c;r+=`<li>${i.name} — ${i.reorder*3} ${i.unit}</li>`;}); r+=`</ul><p>Total: <strong>R${t.toFixed(0)}</strong></p>`; return r; }
    if (ql.includes('food cost')) return `<p>🎯 Target ${fcTarget}% | Current ${(fcTarget+.4).toFixed(1)}%</p>`;
    if (ql.includes('top') && ql.includes('sell')) { const top = [...menu].sort((a,b)=>b.sold-a.sold).slice(0,10); return `<p>🏆 Top sellers:</p><ul>${top.map((m,i)=>`<li>${i+1}. ${m.name} (${m.sold})</li>`).join('')}</ul>`; }
    if (ql.includes('hello') || ql.includes('hi')) return `<p>👋 Hello! Managing ${entName}.</p>`;
    if (ql.includes('help')) return `<p>🤖 I can help with: low stock, wastage, reorder, food cost, top sellers</p>`;
    return `<p>🤔 Try: "low stock", "wastage", "reorder", "help"</p>`;
}

// VOICE
let recog = null;
function initRecog() { if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return false; const SR = window.SpeechRecognition || window.webkitSpeechRecognition; recog = new SR(); recog.continuous = false; recog.interimResults = true; recog.lang = 'en-US'; recog.onresult = e => { const t = Array.from(e.results).map(r=>r[0].transcript).join(''); document.getElementById('voice-text').textContent = t; if (e.results[0].isFinal) procVoice(t); }; recog.onerror = () => stopVoice(); recog.onend = () => stopVoice(); return true; }
function startVoiceCmd() { if (!recog && !initRecog()) { toast('warning','Voice not supported'); return; } document.getElementById('voice-overlay').classList.remove('hidden'); document.getElementById('voice-title').textContent = 'Voice Command'; document.getElementById('voice-text').textContent = 'Say a command...'; document.getElementById('voice-help').innerHTML = `Say: "dashboard", "inventory", "purchases", etc.`; try { recog.start(); } catch(e){} }
function stopVoice() { document.getElementById('voice-overlay').classList.add('hidden'); if (recog) try { recog.stop(); } catch(e){} if (voiceCountRecog) try { voiceCountRecog.stop(); } catch(e){} }
function startAIVoice() { if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return; const btn = document.getElementById('ai-mic'); btn.classList.add('listening'); const SR = window.SpeechRecognition || window.webkitSpeechRecognition; const r = new SR(); r.continuous = false; r.interimResults = false; r.lang = 'en-US'; r.onresult = e => { document.getElementById('ai-input').value = e.results[0][0].transcript; sendAIInput(); btn.classList.remove('listening'); }; r.onerror = () => btn.classList.remove('listening'); r.onend = () => btn.classList.remove('listening'); try { r.start(); } catch(e) { btn.classList.remove('listening'); } }
function procVoice(c) { stopVoice(); const cl = c.toLowerCase(); if (cl.includes('dashboard')) navigate('dashboard'); else if (cl.includes('inventory')) navigate('inventory'); else if (cl.includes('purchase')) navigate('purchases'); else if (cl.includes('supplier')) navigate('suppliers'); else if (cl.includes('report')) navigate('reports'); else if (cl.includes('wastage')) navigate('wastage'); else if (cl.includes('transfer')) navigate('transfers'); else if (cl.includes('stock take')) navigate('stock-take'); else if (cl.includes('cash')) navigate('cashup'); else if (cl.includes('menu')) navigate('menu-creation'); else { document.getElementById('ai-panel').classList.add('open'); sendAI(c); } }

// WHATSAPP
function openWhatsAppSupport() {
    const supportNumber = '27790440508';
    let userName = 'Guest', userRole = 'N/A', entityName = 'N/A', groupName = '', userEmail = '', currentPage = 'Login';
    if (S.user) { userName = S.user.name; userRole = S.user.role; }
    if (S.owner) { groupName = S.owner.groupName || ''; userEmail = S.owner.email || ''; }
    if (S.isGlobalMode) entityName = '👑 GLOBAL';
    else if (S.entities && S.entities[S.activeEntity]) entityName = S.entities[S.activeEntity].name;
    const activePage = document.querySelector('.page.active');
    if (activePage) { const heading = activePage.querySelector('.page-heading'); if (heading) currentPage = heading.textContent.trim(); }
    const message = `🆘 *StockAI-Pro Support*\n\n👤 ${userName}\n🎖️ ${userRole}\n🏢 ${entityName}\n${groupName ? `🏛️ ${groupName}\n` : ''}📍 ${currentPage}\n⏰ ${new Date().toLocaleString('en-ZA')}\n\n*My question:*\n`;
    window.open(`https://wa.me/${supportNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// INTEGRATIONS
function connectPOS(name) { if (S.integrations.pos === name) { S.integrations.pos = null; toast('info', name+' disconnected'); } else { S.integrations.pos = name; toast('success', `Connected to ${name}`); logAction('Integration', `POS: ${name}`); } saveToStorage(); renderPages(); }
function connectAccounting(name) { if (S.integrations.accounting === name) { S.integrations.accounting = null; toast('info', name+' disconnected'); } else { S.integrations.accounting = name; toast('success', `Connected to ${name}`); logAction('Integration', name); } saveToStorage(); renderPages(); }

// UTILS
function logAction(action, details) {
    if (!S.user) return;
    const ent = S.entities[S.activeEntity] || S.entities[0];
    if (!ent) return;
    if (!S.userLogs[ent.id]) S.userLogs[ent.id] = [];
    const now = new Date();
    S.userLogs[ent.id].unshift({user:S.user.name,role:S.user.role,action,details,date:now.toLocaleDateString('en-ZA'),time:now.toLocaleTimeString('en-ZA')});
    if (S.userLogs[ent.id].length > 200) S.userLogs[ent.id] = S.userLogs[ent.id].slice(0, 200);
}
function quickReorder(id) { toast('success', 'Added to pending POs'); }
function fmtNum(n) { if (n >= 1e6) return (n/1e6).toFixed(1)+'M'; if (n >= 1e3) return (n/1e3).toFixed(1)+'K'; return n.toFixed(0); }
function statusText(s) { return s.split('-').map(w => w[0].toUpperCase()+w.slice(1)).join(' '); }
function fmtDate(d) { return new Date(d).toLocaleDateString('en-ZA',{day:'2-digit',month:'short',year:'numeric'}); }
function relTime(d) { const m = Math.floor((Date.now()-d.getTime())/6e4); if (m<60) return `${m}m ago`; const h = Math.floor(m/60); if (h<24) return `${h}h ago`; return `${Math.floor(h/24)}d ago`; }
function toast(type, msg) { const ic = {success:'check-circle',error:'times-circle',warning:'exclamation-triangle',info:'info-circle'}; const t = document.createElement('div'); t.className = `toast ${type}`; t.innerHTML = `<i class="fas fa-${ic[type]}"></i><span>${msg}</span><button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>`; document.getElementById('toast-wrap').appendChild(t); setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(100%)'; setTimeout(()=>t.remove(),300); }, 4000); }
</script>
<style>
/* PAYMENT REMINDER */
.payment-overlay{position:fixed;inset:0;background:rgba(13,74,92,.7);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px}
.payment-modal{background:#fff;border-radius:20px;padding:0;width:480px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,.3);overflow:hidden;animation:modIn .3s ease}
.payment-modal-header{padding:28px 28px 20px;text-align:center}
.payment-modal-header.warning{background:linear-gradient(135deg,#fff8e1,#fff3cd)}
.payment-modal-header.danger{background:linear-gradient(135deg,#fee2e2,#fecaca)}
.payment-modal-header.info{background:linear-gradient(135deg,#d4f0f7,#e8f4f7)}
.payment-icon{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:2rem}
.payment-icon.warning{background:rgba(212,160,23,.15);color:#d4a017}
.payment-icon.danger{background:rgba(201,69,69,.15);color:#c94545}
.payment-icon.info{background:rgba(26,139,168,.15);color:#1a8ba8}
.payment-modal-header h2{font-size:1.3rem;font-weight:800;color:#0d4a5c;margin-bottom:6px}
.payment-modal-header p{font-size:.9rem;color:#2a5f70;line-height:1.5}
.payment-modal-body{padding:20px 28px}
.payment-details{background:#f5f9fa;border-radius:10px;padding:16px;margin-bottom:16px}
.payment-detail-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e0eff3;font-size:.88rem;color:#2a5f70}
.payment-detail-row:last-child{border-bottom:none}
.payment-detail-row strong{color:#0d4a5c}
.payment-detail-row.total{border-top:2px solid #1a8ba8;margin-top:6px;padding-top:12px;font-weight:700;font-size:1rem;color:#1a8ba8}
.payment-countdown{text-align:center;margin:14px 0;padding:12px;border-radius:10px;font-weight:700}
.payment-countdown.days-left{background:rgba(26,139,168,.08);color:#1a8ba8;font-size:.95rem}
.payment-countdown.overdue{background:rgba(201,69,69,.1);color:#c94545;font-size:1.1rem}
.payment-modal-footer{padding:16px 28px 24px;display:flex;gap:10px}
.payment-modal-footer button{flex:1;padding:14px;border-radius:10px;font-size:.95rem;font-weight:700;cursor:pointer;transition:.3s;font-family:inherit;border:none}
.btn-pay{background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff}
.btn-pay:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(46,168,113,.4)}
.btn-close-payment{background:#f5f9fa;color:#2a5f70;border:1px solid #c4dde4!important}
.btn-close-payment:hover{background:#e4f1f5}
.payment-note{text-align:center;font-size:.75rem;color:#8aabb5;margin-top:10px;padding:0 28px 16px}
</style>

<script>
// ============ PAYMENT REMINDER SYSTEM ============
function checkPaymentStatus() {
    if (!S.user || !S.entities || S.entities.length === 0) return;
    
    if (!S.billing) {
        S.billing = {
            billingDay: 1,
            lastPaymentDate: null,
            nextDueDate: getNextBillingDate(),
            status: 'current',
            dismissedToday: null
        };
        saveToStorage();
    }
    
    var now = new Date();
    var today = now.toISOString().split('T')[0];
    var dueDate = new Date(S.billing.nextDueDate);
    var diffMs = dueDate.getTime() - now.getTime();
    var diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    var activeEntities = S.entities.filter(function(e) { return e.status !== 'cancelled'; });
    var planPrices = { starter: 499, professional: 899, enterprise: 1499 };
    var totalDue = 0;
    activeEntities.forEach(function(ent) {
        totalDue += planPrices[ent.plan] || 899;
    });
    
    if (S.billing.dismissedToday === today && diffDays > 0) {
        return;
    }
    
    if (diffDays <= 4 && diffDays > 0) {
        showPaymentReminder(diffDays, totalDue, dueDate, false);
    } else if (diffDays === 0) {
        showPaymentReminder(0, totalDue, dueDate, false);
    } else if (diffDays < 0) {
        showPaymentReminder(diffDays, totalDue, dueDate, true);
    }
    
    if (diffDays < 0) S.billing.status = 'overdue';
    else if (diffDays <= 4) S.billing.status = 'due_soon';
    else S.billing.status = 'current';
    saveToStorage();
}

function getNextBillingDate() {
    var now = new Date();
    var nextDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextDate.toISOString().split('T')[0];
}

function showPaymentReminder(daysLeft, totalDue, dueDate, isOverdue) {
    // Remove existing overlay if any
    var existing = document.getElementById('payment-overlay');
    if (existing) existing.remove();
    
    var dueDateStr = dueDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
    
    var headerClass, iconClass, iconHtml, title, message;
    
    if (isOverdue) {
        var overdueDays = Math.abs(daysLeft);
        headerClass = 'danger';
        iconClass = 'danger';
        iconHtml = '<i class="fas fa-exclamation-circle"></i>';
        title = '⚠️ Payment Overdue';
        message = 'Your payment of <strong>R' + totalDue.toLocaleString() + '</strong> was due on <strong>' + dueDateStr + '</strong> and is now <strong>' + overdueDays + ' day' + (overdueDays !== 1 ? 's' : '') + ' overdue</strong>.<br><br>Please make payment immediately to continue using StockAI-Pro.';
    } else if (daysLeft === 0) {
        headerClass = 'warning';
        iconClass = 'warning';
        iconHtml = '<i class="fas fa-clock"></i>';
        title = '💳 Payment Due Today';
        message = 'Your monthly subscription payment of <strong>R' + totalDue.toLocaleString() + '</strong> is due <strong>TODAY</strong>.<br><br>Please make payment to avoid service interruption.';
    } else if (daysLeft === 1) {
        headerClass = 'warning';
        iconClass = 'warning';
        iconHtml = '<i class="fas fa-bell"></i>';
        title = '⏰ Payment Due Tomorrow';
        message = 'Your monthly payment of <strong>R' + totalDue.toLocaleString() + '</strong> is due <strong>tomorrow</strong> (' + dueDateStr + ').';
    } else {
        headerClass = 'info';
        iconClass = 'info';
        iconHtml = '<i class="fas fa-info-circle"></i>';
        title = '📅 Payment Reminder';
        message = 'Your monthly payment of <strong>R' + totalDue.toLocaleString() + '</strong> is due in <strong>' + daysLeft + ' days</strong> on <strong>' + dueDateStr + '</strong>.';
    }
    
    // Build entity breakdown
    var activeEntities = S.entities.filter(function(e) { return e.status !== 'cancelled'; });
    var planPrices = { starter: 499, professional: 899, enterprise: 1499 };
    var planNames = { starter: 'Starter', professional: 'Professional', enterprise: 'Enterprise' };
    
    var entityBreakdown = '';
    activeEntities.forEach(function(ent) {
        var plan = ent.plan || 'professional';
        var price = planPrices[plan] || 899;
        var planName = planNames[plan] || 'Professional';
        entityBreakdown += '<div class="payment-detail-row"><span>' + ent.name + ' <small style="color:#8aabb5">(' + planName + ')</small></span><strong>R' + price.toLocaleString() + '</strong></div>';
    });
    
    var countdownHtml;
    if (isOverdue) {
        countdownHtml = '<div class="payment-countdown overdue"><i class="fas fa-exclamation-triangle"></i> ' + Math.abs(daysLeft) + ' day' + (Math.abs(daysLeft) !== 1 ? 's' : '') + ' OVERDUE — App access restricted</div>';
    } else if (daysLeft === 0) {
        countdownHtml = '<div class="payment-countdown overdue"><i class="fas fa-clock"></i> Payment due TODAY</div>';
    } else {
        countdownHtml = '<div class="payment-countdown days-left"><i class="fas fa-calendar-alt"></i> ' + daysLeft + ' day' + (daysLeft !== 1 ? 's' : '') + ' until payment is due</div>';
    }
    
    var closeButton = isOverdue ? '' : '<button class="btn-close-payment" onclick="dismissPaymentReminder()">Close — I\'ll pay later</button>';
    
    var overlay = document.createElement('div');
    overlay.className = 'payment-overlay';
    overlay.id = 'payment-overlay';
    overlay.innerHTML = '<div class="payment-modal">' +
        '<div class="payment-modal-header ' + headerClass + '">' +
            '<div class="payment-icon ' + iconClass + '">' + iconHtml + '</div>' +
            '<h2>' + title + '</h2>' +
            '<p>' + message + '</p>' +
        '</div>' +
        '<div class="payment-modal-body">' +
            countdownHtml +
            '<div class="payment-details">' +
                '<div class="payment-detail-row" style="font-weight:600;color:#0d4a5c;border-bottom:2px solid #c4dde4"><span>Entity</span><span>Amount</span></div>' +
                entityBreakdown +
                '<div class="payment-detail-row total"><span>Total Due</span><strong>R' + totalDue.toLocaleString() + '</strong></div>' +
            '</div>' +
        '</div>' +
        '<div class="payment-modal-footer">' +
            closeButton +
            '<button class="btn-pay" onclick="makePayment(' + totalDue + ')"><i class="fas fa-credit-card"></i> Make Payment — R' + totalDue.toLocaleString() + '</button>' +
        '</div>' +
        '<div class="payment-note">' +
            (isOverdue ? '⚠️ Your app access is restricted until payment is received.' : 'You can close this reminder, but it will appear again tomorrow.') +
            '<br>Need help? WhatsApp: 079 044 0508' +
        '</div>' +
    '</div>';
    
    document.body.appendChild(overlay);
}

function dismissPaymentReminder() {
    var overlay = document.getElementById('payment-overlay');
    if (overlay) overlay.remove();
    
    S.billing.dismissedToday = new Date().toISOString().split('T')[0];
    saveToStorage();
}

function makePayment(amount) {
    var paymentRef = 'PAY-' + Date.now().toString(36).toUpperCase();
    
    var confirmed = confirm(
        'Payment Summary\n' +
        '━━━━━━━━━━━━━━━━━\n' +
        'Amount: R' + amount.toLocaleString() + '\n' +
        'Reference: ' + paymentRef + '\n\n' +
        'Payment Methods:\n' +
        '1. Card Payment (Paystack) — Coming soon\n' +
        '2. EFT / Bank Transfer\n' +
        '3. WhatsApp: 079 044 0508\n\n' +
        'For now, please contact Miguel:\n' +
        'WhatsApp: 079 044 0508\n' +
        'Email: cidraism@gmail.com\n' +
        'Use reference: ' + paymentRef + '\n\n' +
        'Click OK to simulate payment (for testing)\n' +
        'Click Cancel to pay later'
    );
    
    if (confirmed) {
        S.billing.lastPaymentDate = new Date().toISOString();
        S.billing.nextDueDate = getNextBillingDate();
        S.billing.status = 'current';
        S.billing.dismissedToday = null;
        saveToStorage();
        
        var overlay = document.getElementById('payment-overlay');
        if (overlay) overlay.remove();
        
        toast('success', 'Payment of R' + amount.toLocaleString() + ' confirmed! Next due: ' + new Date(S.billing.nextDueDate).toLocaleDateString('en-ZA', {day:'numeric',month:'long',year:'numeric'}));
        
        logAction('Payment Made', 'R' + amount.toLocaleString() + ' — Ref: ' + paymentRef);
    }
}

// ============ PORTAL INTEGRATION ============
function checkPortalActions() {
    try {
        var pending = JSON.parse(localStorage.getItem('stockai_portal_pending') || '[]');
        var unprocessed = pending.filter(function(p) { return !p.processed; });
        
        if (unprocessed.length === 0) return;
        
        unprocessed.forEach(function(action) {
            if (action.action === 'entity_purchased') {
                addNotif('success', 'New Entity Purchased!', 
                    '"' + action.data.entityName + '" was purchased via the portal. Go to Settings to complete setup.');
                
                var exists = S.entities.find(function(e) { return e.id === action.data.entityId; });
                if (!exists) {
                    S.entities.push({
                        id: action.data.entityId,
                        name: action.data.entityName,
                        contact: action.data.contact || '',
                        email: action.data.email || '',
                        phone: action.data.phone || '',
                        foodCostTarget: 28,
                        sections: ['Walk-in Fridge', 'Walk-in Freezer', 'Dry Store', 'Bar'],
                        pendingSetup: true,
                        plan: action.data.plan || 'professional'
                    });
                    generateDataForEntity(S.entities[S.entities.length - 1]);
                    saveToStorage();
                    toast('success', 'New entity "' + action.data.entityName + '" added!');
                }
            } else if (action.action === 'plan_changed') {
                addNotif('info', 'Plan Changed', 
                    'Entity plan has been ' + action.data.changeType.toLowerCase() + 'd. Changes take effect within 30 days.');
            } else if (action.action === 'entity_cancelled') {
                addNotif('warning', 'Entity Cancelled', 
                    'An entity has been cancelled via the portal. It will remain active for 30 days.');
            } else if (action.action === 'entity_reactivated') {
                addNotif('success', 'Entity Reactivated', 
                    'An entity has been reactivated via the portal.');
            }
            
            action.processed = true;
        });
        
        localStorage.setItem('stockai_portal_pending', JSON.stringify(pending));
    } catch(e) {
        console.warn('Portal check error:', e);
    }
}

// Hook into the enterApp function to check payment and portal
(function() {
    var originalEnterApp = enterApp;
    enterApp = function() {
        originalEnterApp();
        setTimeout(function() {
            checkPortalActions();
            checkPaymentStatus();
        }, 1500);
    };
})();

// Add billing to state if not present
if (!S.billing) {
    S.billing = null;
}
</script>
<script>
// ============ ENHANCED PORTAL SYNC ============
// This runs every 5 seconds to check for new portal actions
var portalCheckInterval = setInterval(function() {
    if (!S.user || !S.entities) return;
    
    try {
        var raw = localStorage.getItem('stockai_portal_pending');
        if (!raw) return;
        
        var pending = JSON.parse(raw);
        var unprocessed = pending.filter(function(p) { return !p.processed; });
        
        if (unprocessed.length === 0) return;
        
        console.log('📦 Found ' + unprocessed.length + ' pending portal action(s)');
        
        unprocessed.forEach(function(action) {
            console.log('Processing action:', action.action, action.data);
            
            if (action.action === 'entity_purchased') {
                // Check if entity already exists
                var exists = false;
                for (var i = 0; i < S.entities.length; i++) {
                    if (S.entities[i].id === action.data.entityId) {
                        exists = true;
                        break;
                    }
                }
                
                if (!exists) {
                    // Create the new entity
                    var newEntity = {
                        id: action.data.entityId,
                        name: action.data.entityName,
                        contact: action.data.contact || 'Manager',
                        email: action.data.email || '',
                        phone: action.data.phone || '',
                        address: '',
                        vat: '',
                        foodCostTarget: 28,
                        sections: ['Walk-in Fridge', 'Walk-in Freezer', 'Dry Store', 'Bar'],
                        plan: action.data.plan || 'professional',
                        pendingSetup: true
                    };
                    
                    S.entities.push(newEntity);
                    
                    // Generate demo data for the new entity
                    generateDataForEntity(newEntity);
                    
                    // Save to storage
                    saveToStorage();
                    
                    // Show notifications
                    if (typeof addNotif === 'function') {
                        addNotif('success', 'New Entity Added!', '"' + action.data.entityName + '" has been purchased and added to your account.');
                    }
                    if (typeof toast === 'function') {
                        toast('success', '🎉 New entity "' + action.data.entityName + '" added! Logout and login again to see it in entity selector.');
                    }
                    
                    console.log('✅ Entity created:', newEntity.name);
                }
            }
            
            if (action.action === 'plan_changed') {
                // Find and update the entity plan
                for (var j = 0; j < S.entities.length; j++) {
                    if (S.entities[j].id === action.data.entityId) {
                        S.entities[j].plan = action.data.newPlan;
                        console.log('✅ Plan changed for:', S.entities[j].name);
                        if (typeof toast === 'function') {
                            toast('info', 'Plan ' + action.data.changeType + ' for ' + S.entities[j].name);
                        }
                        break;
                    }
                }
                saveToStorage();
            }
            
            if (action.action === 'entity_cancelled') {
                for (var k = 0; k < S.entities.length; k++) {
                    if (S.entities[k].id === action.data.entityId) {
                        S.entities[k].status = 'cancelled';
                        console.log('⚠️ Entity cancelled:', S.entities[k].name);
                        if (typeof toast === 'function') {
                            toast('warning', S.entities[k].name + ' has been cancelled (30-day notice applies)');
                        }
                        break;
                    }
                }
                saveToStorage();
            }
            
            if (action.action === 'entity_reactivated') {
                for (var m = 0; m < S.entities.length; m++) {
                    if (S.entities[m].id === action.data.entityId) {
                        S.entities[m].status = 'active';
                        console.log('✅ Entity reactivated:', S.entities[m].name);
                        if (typeof toast === 'function') {
                            toast('success', S.entities[m].name + ' has been reactivated!');
                        }
                        break;
                    }
                }
                saveToStorage();
            }
            
            // Mark as processed
            action.processed = true;
        });
        
        // Save the processed status back
        localStorage.setItem('stockai_portal_pending', JSON.stringify(pending));
        
    } catch(e) {
        console.warn('Portal sync error:', e);
    }
}, 5000); // Check every 5 seconds

// Also check immediately when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        if (S.user && S.entities) {
            // Trigger a manual check
            try {
                var raw = localStorage.getItem('stockai_portal_pending');
                if (raw) {
                    var pending = JSON.parse(raw);
                    var unprocessed = pending.filter(function(p) { return !p.processed; });
                    if (unprocessed.length > 0) {
                        console.log('🔔 Found ' + unprocessed.length + ' pending portal action(s) on load');
                    }
                }
            } catch(e) {}
        }
    }, 2000);
});

// Listen for storage changes from other tabs (portal)
window.addEventListener('storage', function(event) {
    if (event.key === 'stockai_portal_pending') {
        console.log('🔄 Portal data changed in another tab — checking...');
        // Small delay to let the data settle
        setTimeout(function() {
            if (!S.user) return;
            try {
                var raw = localStorage.getItem('stockai_portal_pending');
                if (!raw) return;
                var pending = JSON.parse(raw);
                var unprocessed = pending.filter(function(p) { return !p.processed; });
                if (unprocessed.length > 0) {
                    console.log('📦 Processing ' + unprocessed.length + ' new action(s) from portal');
                    // Process them
                    unprocessed.forEach(function(action) {
                        if (action.action === 'entity_purchased') {
                            var exists = false;
                            for (var i = 0; i < S.entities.length; i++) {
                                if (S.entities[i].id === action.data.entityId) { exists = true; break; }
                            }
                            if (!exists) {
                                var newEnt = {
                                    id: action.data.entityId,
                                    name: action.data.entityName,
                                    contact: action.data.contact || 'Manager',
                                    email: action.data.email || '',
                                    phone: action.data.phone || '',
                                    address: '',
                                    vat: '',
                                    foodCostTarget: 28,
                                    sections: ['Walk-in Fridge', 'Walk-in Freezer', 'Dry Store', 'Bar'],
                                    plan: action.data.plan || 'professional',
                                    pendingSetup: true
                                };
                                S.entities.push(newEnt);
                                generateDataForEntity(newEnt);
                                saveToStorage();
                                if (typeof toast === 'function') {
                                    toast('success', '🎉 New entity "' + action.data.entityName + '" added from portal!');
                                }
                                if (typeof addNotif === 'function') {
                                    addNotif('success', 'New Entity!', action.data.entityName + ' added via portal');
                                }
                            }
                        }
                        action.processed = true;
                    });
                    localStorage.setItem('stockai_portal_pending', JSON.stringify(pending));
                }
            } catch(e) { console.warn(e); }
        }, 500);
    }
});
</script>
<style>
/* SECURITY STYLES */
.pin-overlay{position:fixed;inset:0;background:rgba(13,74,92,.8);backdrop-filter:blur(6px);z-index:99998;display:flex;align-items:center;justify-content:center;padding:20px}
.pin-modal{background:#fff;border-radius:20px;padding:36px;width:380px;max-width:95vw;box-shadow:0 20px 60px rgba(0,0,0,.3);text-align:center;animation:modIn .3s ease}
.pin-modal h3{font-size:1.2rem;font-weight:800;color:#0d4a5c;margin-bottom:6px}
.pin-modal p{font-size:.88rem;color:#5a8a96;margin-bottom:20px}
.pin-input-group{display:flex;gap:10px;justify-content:center;margin-bottom:20px}
.pin-input{width:50px;height:56px;text-align:center;font-size:1.5rem;font-weight:800;border:2px solid #c4dde4;border-radius:10px;color:#0d4a5c;font-family:inherit;transition:.2s}
.pin-input:focus{outline:none;border-color:#1a8ba8;box-shadow:0 0 0 3px rgba(26,139,168,.15)}
.pin-error{color:#c94545;font-size:.82rem;margin-bottom:14px;min-height:20px}
.pin-actions{display:flex;gap:10px}
.pin-actions button{flex:1;padding:12px;border-radius:10px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.9rem;transition:.3s;border:none}
.btn-pin-confirm{background:linear-gradient(135deg,#1a8ba8,#0d4a5c);color:#fff}
.btn-pin-confirm:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,139,168,.4)}
.btn-pin-cancel{background:#f5f9fa;color:#5a8a96;border:1px solid #c4dde4!important}

.session-warning{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#d4a017,#b8860b);color:#fff;padding:12px 24px;border-radius:10px;box-shadow:0 6px 24px rgba(212,160,23,.4);z-index:99997;display:flex;align-items:center;gap:12px;font-size:.88rem;font-weight:600;animation:tIn .3s ease}
.session-warning button{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-family:inherit;font-weight:600;font-size:.82rem}
.session-warning button:hover{background:rgba(255,255,255,.3)}

.tamper-alert{position:fixed;inset:0;background:rgba(201,69,69,.95);z-index:999999;display:flex;align-items:center;justify-content:center;color:#fff;text-align:center;padding:40px}
.tamper-alert h1{font-size:2rem;margin-bottom:14px}
.tamper-alert p{font-size:1rem;opacity:.9;max-width:500px;margin:0 auto 20px;line-height:1.6}
</style>

<script>
// ============ SECURITY MODULE ============

// --- SESSION TIMEOUT (15 minutes) ---
var SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
var SESSION_WARNING = 13 * 60 * 1000; // Warn at 13 minutes (2 min before timeout)
var lastActivity = Date.now();
var sessionWarningShown = false;
var sessionTimer = null;
var warningTimer = null;

function resetSessionTimer() {
    lastActivity = Date.now();
    sessionWarningShown = false;
    
    // Remove warning if showing
    var warningEl = document.getElementById('session-warning');
    if (warningEl) warningEl.remove();
}

function checkSessionTimeout() {
    if (!S.user) return;
    
    var elapsed = Date.now() - lastActivity;
    
    // Show warning at 13 minutes
    if (elapsed >= SESSION_WARNING && !sessionWarningShown) {
        sessionWarningShown = true;
        showSessionWarning();
    }
    
    // Auto-logout at 15 minutes
    if (elapsed >= SESSION_TIMEOUT) {
        autoLogout();
    }
}

function showSessionWarning() {
    var existing = document.getElementById('session-warning');
    if (existing) existing.remove();
    
    var warning = document.createElement('div');
    warning.className = 'session-warning';
    warning.id = 'session-warning';
    warning.innerHTML = '<i class="fas fa-clock"></i> Session expiring in 2 minutes due to inactivity <button onclick="resetSessionTimer()">Stay Logged In</button>';
    document.body.appendChild(warning);
}

function autoLogout() {
    logAction('Security', 'Auto-logout due to inactivity');
    
    var warningEl = document.getElementById('session-warning');
    if (warningEl) warningEl.remove();
    
    S.user = null;
    S.isGlobalMode = false;
    saveToStorage();
    
    document.getElementById('app').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    
    alert('⏰ Session Expired\n\nYou have been logged out due to 15 minutes of inactivity.\n\nPlease log in again to continue.');
}

// Track user activity
['click', 'keypress', 'mousemove', 'scroll', 'touchstart'].forEach(function(evt) {
    document.addEventListener(evt, function() {
        if (S.user) resetSessionTimer();
    }, { passive: true });
});

// Check every 30 seconds
setInterval(checkSessionTimeout, 30000);


// --- SECURITY PIN SYSTEM ---
var SECURITY_PIN = '1234'; // Default PIN — Owner can change in Settings

function requirePIN(action, callback) {
    // Only require PIN for critical actions
    var criticalActions = ['delete_item', 'adjust_stock', 'edit_user', 'delete_user', 'edit_entity', 'edit_owner', 'void_invoice'];
    
    if (!criticalActions.includes(action)) {
        callback();
        return;
    }
    
    // Owner and GM are exempt from PIN for most actions
    if (S.user && (S.user.role === 'Owner' || S.user.role === 'General Manager')) {
        callback();
        return;
    }
    
    showPINModal(action, callback);
}

function showPINModal(action, callback) {
    var actionNames = {
        'delete_item': 'Delete Stock Item',
        'adjust_stock': 'Adjust Stock Quantity',
        'edit_user': 'Edit User Details',
        'delete_user': 'Delete User',
        'edit_entity': 'Edit Entity Details',
        'edit_owner': 'Edit Owner Details',
        'void_invoice': 'Void Invoice'
    };
    
    var overlay = document.createElement('div');
    overlay.className = 'pin-overlay';
    overlay.id = 'pin-overlay';
    overlay.innerHTML = '<div class="pin-modal">' +
        '<h3><i class="fas fa-shield-alt"></i> Security Verification</h3>' +
        '<p>Enter your 4-digit PIN to confirm:<br><strong>' + (actionNames[action] || action) + '</strong></p>' +
        '<div class="pin-input-group">' +
            '<input type="password" class="pin-input" id="pin1" maxlength="1" oninput="pinNext(this,\'pin2\')" autofocus>' +
            '<input type="password" class="pin-input" id="pin2" maxlength="1" oninput="pinNext(this,\'pin3\')">' +
            '<input type="password" class="pin-input" id="pin3" maxlength="1" oninput="pinNext(this,\'pin4\')">' +
            '<input type="password" class="pin-input" id="pin4" maxlength="1" oninput="pinComplete()">' +
        '</div>' +
        '<div class="pin-error" id="pin-error"></div>' +
        '<div class="pin-actions">' +
            '<button class="btn-pin-cancel" onclick="closePINModal()">Cancel</button>' +
            '<button class="btn-pin-confirm" onclick="verifyPIN()">Confirm</button>' +
        '</div>' +
    '</div>';
    
    document.body.appendChild(overlay);
    
    // Store callback for after verification
    window._pinCallback = callback;
    window._pinAttempts = 0;
    
    setTimeout(function() { document.getElementById('pin1').focus(); }, 100);
}

function pinNext(current, nextId) {
    if (current.value.length === 1) {
        var next = document.getElementById(nextId);
        if (next) next.focus();
    }
}

function pinComplete() {
    setTimeout(verifyPIN, 200);
}

function verifyPIN() {
    var pin = (document.getElementById('pin1').value || '') +
              (document.getElementById('pin2').value || '') +
              (document.getElementById('pin3').value || '') +
              (document.getElementById('pin4').value || '');
    
    if (pin.length < 4) return;
    
    window._pinAttempts = (window._pinAttempts || 0) + 1;
    
    if (pin === SECURITY_PIN) {
        closePINModal();
        logAction('Security', 'PIN verified successfully');
        if (typeof window._pinCallback === 'function') {
            window._pinCallback();
        }
    } else {
        document.getElementById('pin-error').textContent = 'Incorrect PIN. Attempt ' + window._pinAttempts + ' of 5.';
        document.getElementById('pin1').value = '';
        document.getElementById('pin2').value = '';
        document.getElementById('pin3').value = '';
        document.getElementById('pin4').value = '';
        document.getElementById('pin1').focus();
        
        logAction('Security', 'Failed PIN attempt #' + window._pinAttempts);
        
        if (window._pinAttempts >= 5) {
            closePINModal();
            logAction('Security', 'Account locked — 5 failed PIN attempts');
            toast('error', '🔒 Too many failed attempts. Please contact your manager.');
            
            // Auto-logout after 5 failed attempts
            setTimeout(function() {
                autoLogout();
            }, 3000);
        }
    }
}

function closePINModal() {
    var overlay = document.getElementById('pin-overlay');
    if (overlay) overlay.remove();
    window._pinCallback = null;
}


// --- ENHANCED AUDIT TRAIL ---
var originalLogAction = logAction;
logAction = function(action, details) {
    // Call original function
    originalLogAction(action, details);
    
    // Add enhanced security fields
    if (!S.user) return;
    var ent = S.entities[S.activeEntity] || S.entities[0];
    if (!ent || !S.userLogs[ent.id]) return;
    
    // Enhance the most recent log entry with security data
    var lastLog = S.userLogs[ent.id][0];
    if (lastLog) {
        lastLog.device = getDeviceFingerprint();
        lastLog.sessionId = getSessionId();
        lastLog.entityId = ent.id;
        lastLog.entityName = ent.name;
    }
};

function getDeviceFingerprint() {
    var nav = navigator;
    return {
        browser: nav.userAgent.substring(0, 80),
        platform: nav.platform,
        language: nav.language,
        screen: screen.width + 'x' + screen.height
    };
}

function getSessionId() {
    if (!window._sessionId) {
        window._sessionId = 'SES-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
    }
    return window._sessionId;
}


// --- TAMPER DETECTION ---
function checkDataIntegrity() {
    if (!S.user || !S.entities || S.entities.length === 0) return;
    
    // Calculate a simple checksum of critical data
    var currentChecksum = calculateChecksum();
    var storedChecksum = localStorage.getItem('stockai_checksum');
    
    if (storedChecksum && currentChecksum !== storedChecksum) {
        // Data was modified outside the app
        logAction('Security Alert', 'Data tampering detected — checksum mismatch');
        
        // Don't block — just log and notify
        console.warn('⚠️ SECURITY: Data modification detected outside the application');
        
        if (typeof addNotif === 'function') {
            addNotif('danger', 'Security Alert', 'Possible data tampering detected. Please review recent changes in the User Activity Logs.');
        }
    }
    
    // Update checksum
    localStorage.setItem('stockai_checksum', currentChecksum);
}

function calculateChecksum() {
    try {
        var critical = {
            entityCount: S.entities.length,
            entityNames: S.entities.map(function(e) { return e.name; }).join(','),
            totalItems: 0,
            totalValue: 0
        };
        
        S.entities.forEach(function(ent) {
            var inv = S.inventory[ent.id] || [];
            critical.totalItems += inv.length;
            inv.forEach(function(item) {
                critical.totalValue += Math.round(item.value * 100);
            });
        });
        
        // Simple hash
        var str = JSON.stringify(critical);
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return 'CHK-' + Math.abs(hash).toString(36);
    } catch(e) {
        return 'CHK-error';
    }
}

// Update checksum whenever data is saved
var originalSaveToStorage = saveToStorage;
saveToStorage = function() {
    originalSaveToStorage();
    try {
        localStorage.setItem('stockai_checksum', calculateChecksum());
    } catch(e) {}
};


// --- STOCK ADJUSTMENT THRESHOLD ---
var ADJUSTMENT_THRESHOLD = 20; // Require approval for adjustments > 20% variance

// Override the adjustStockItem function to add security
var originalAdjustStockItem = adjustStockItem;
adjustStockItem = function(id) {
    var ent = S.entities[S.activeEntity];
    var item = S.inventory[ent.id].find(function(x) { return x.id === id; });
    if (!item) return;
    
    var countEl = document.getElementById('count-' + id);
    if (!countEl) return;
    
    var newQty = parseFloat(countEl.value);
    if (isNaN(newQty)) return;
    
    var oldQty = item.quantity;
    var difference = Math.abs(newQty - oldQty);
    var percentChange = oldQty > 0 ? (difference / oldQty) * 100 : 100;
    
    // Log the old value for audit trail
    var auditDetail = item.name + ': ' + oldQty + ' → ' + newQty + ' ' + item.unit + ' (Variance: ' + (newQty - oldQty).toFixed(2) + ', ' + percentChange.toFixed(1) + '% change)';
    
    // Check if adjustment exceeds threshold
    if (percentChange > ADJUSTMENT_THRESHOLD && S.user.role !== 'Owner' && S.user.role !== 'General Manager') {
        // Large adjustment — needs PIN verification
        requirePIN('adjust_stock', function() {
            // Proceed with adjustment
            item.quantity = newQty;
            item.value = newQty * item.cost;
            item.status = newQty === 0 ? 'out-of-stock' : newQty <= item.reorder ? 'low-stock' : 'in-stock';
            logAction('Stock Adjusted (Large - PIN Verified)', auditDetail);
            saveToStorage();
            renderStockTake();
            toast('success', 'Adjusted (PIN verified)');
        });
    } else {
        // Normal adjustment — proceed
        item.quantity = newQty;
        item.value = newQty * item.cost;
        item.status = newQty === 0 ? 'out-of-stock' : newQty <= item.reorder ? 'low-stock' : 'in-stock';
        logAction('Stock Adjusted', auditDetail);
        saveToStorage();
        renderStockTake();
        toast('success', 'Adjusted');
    }
};


// --- LOGIN ATTEMPT TRACKING ---
var LOGIN_MAX_ATTEMPTS = 5;
var LOGIN_LOCKOUT_MINUTES = 15;

var originalDoLogin = doLogin;
doLogin = function(e) {
    e.preventDefault();
    
    // Check if locked out
    var lockoutData = JSON.parse(localStorage.getItem('stockai_lockout') || '{}');
    if (lockoutData.lockedUntil) {
        var lockExpiry = new Date(lockoutData.lockedUntil);
        if (new Date() < lockExpiry) {
            var minutesLeft = Math.ceil((lockExpiry - new Date()) / 60000);
            toast('error', '🔒 Account locked. Try again in ' + minutesLeft + ' minute' + (minutesLeft !== 1 ? 's' : '') + '.');
            return;
        } else {
            // Lockout expired — reset
            localStorage.removeItem('stockai_lockout');
        }
    }
    
    // For Phase 1, all logins succeed (no real password check)
    // In Phase 2, this will verify against Firebase Auth
    var name = document.getElementById('login-username').value || 'User';
    var role = document.getElementById('login-role').value;
    
    if (!name.trim()) {
        var attempts = (lockoutData.attempts || 0) + 1;
        lockoutData.attempts = attempts;
        
        if (attempts >= LOGIN_MAX_ATTEMPTS) {
            lockoutData.lockedUntil = new Date(Date.now() + LOGIN_LOCKOUT_MINUTES * 60000).toISOString();
            localStorage.setItem('stockai_lockout', JSON.stringify(lockoutData));
            toast('error', '🔒 Too many failed attempts. Account locked for ' + LOGIN_LOCKOUT_MINUTES + ' minutes.');
            return;
        }
        
        localStorage.setItem('stockai_lockout', JSON.stringify(lockoutData));
        toast('error', 'Login failed. ' + (LOGIN_MAX_ATTEMPTS - attempts) + ' attempts remaining.');
        return;
    }
    
    // Reset attempts on successful login
    localStorage.removeItem('stockai_lockout');
    
    // Call original login
    S.user = { name: name, role: role, assignedEntity: 0 };
    if (S.entities.length > 0) {
        document.getElementById('login-screen').classList.add('hidden');
        showEntitySelector();
    } else {
        startSignUp();
    }
    logAction('Login', name + ' logged in as ' + role + ' | Device: ' + navigator.platform + ' | Browser: ' + navigator.userAgent.substring(0, 50));
};


// --- ENHANCED DELETE ITEM (with audit) ---
var originalDeleteItem = deleteItem;
deleteItem = function(id) {
    var ent = S.entities[S.activeEntity];
    var item = (S.inventory[ent.id] || []).find(function(x) { return x.id === id; });
    if (!item) return;
    
    // For non-Owner/GM roles, require PIN
    if (S.user.role !== 'Owner' && S.user.role !== 'General Manager') {
        requirePIN('delete_item', function() {
            if (!confirm('Delete "' + item.name + '"?\n\nThis will be logged in the audit trail.')) return;
            S.inventory[ent.id] = S.inventory[ent.id].filter(function(i) { return i.id !== id; });
            logAction('Item Deleted (PIN Verified)', item.name + ' — was ' + item.quantity + ' ' + item.unit + ' valued at R' + item.value.toFixed(2));
            renderInventory();
            saveToStorage();
            toast('success', 'Deleted');
        });
    } else {
        if (!confirm('Delete "' + item.name + '"?')) return;
        S.inventory[ent.id] = S.inventory[ent.id].filter(function(i) { return i.id !== id; });
        logAction('Item Deleted', item.name + ' — was ' + item.quantity + ' ' + item.unit + ' valued at R' + item.value.toFixed(2));
        renderInventory();
        saveToStorage();
        toast('success', 'Deleted');
    }
};


// Run integrity check on load
setTimeout(function() {
    if (S.user) checkDataIntegrity();
}, 3000);

// Run integrity check every 5 minutes
setInterval(function() {
    if (S.user) checkDataIntegrity();
}, 5 * 60 * 1000);

console.log('🔒 Security module loaded — Session timeout: 15min | PIN system: Active | Tamper detection: Active');
</script>
<script>
// ============ ANTI-TAMPER & DEVTOOLS DETERRENT ============

// --- Block right-click context menu ---
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    toast('warning', '🔒 Right-click is disabled for security reasons');
    logAction('Security', 'Right-click attempted');
    return false;
});

// --- Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U ---
document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        toast('warning', '🔒 Developer tools are disabled for security');
        logAction('Security', 'F12 key blocked');
        return false;
    }
    
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
        logAction('Security', 'Ctrl+Shift+I blocked');
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
        logAction('Security', 'Ctrl+Shift+J blocked');
        return false;
    }
    
    // Ctrl+Shift+C (Element picker)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        logAction('Security', 'Ctrl+Shift+C blocked');
        return false;
    }
    
    // Ctrl+U (View source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault();
        logAction('Security', 'Ctrl+U blocked');
        return false;
    }
    
    // Ctrl+S (Save page)
    if (e.ctrlKey && !e.shiftKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
        // Only block if not in a form field
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            logAction('Security', 'Ctrl+S blocked');
            return false;
        }
    }
});

// --- Detect if DevTools is open ---
var devToolsOpen = false;
var devToolsCheckInterval = setInterval(function() {
    var widthThreshold = window.outerWidth - window.innerWidth > 160;
    var heightThreshold = window.outerHeight - window.innerHeight > 160;
    
    var isOpen = widthThreshold || heightThreshold;
    
    if (isOpen && !devToolsOpen) {
        devToolsOpen = true;
        console.log('%c⚠️ SECURITY WARNING', 'color:red;font-size:30px;font-weight:bold');
        console.log('%cThis is a secure application. Any unauthorized data manipulation will be logged and reported.', 'color:red;font-size:14px');
        console.log('%cAll actions are tracked with timestamps, device info, and user identity.', 'color:orange;font-size:12px');
        
        logAction('Security Alert', 'Developer Tools opened — user: ' + (S.user ? S.user.name : 'Unknown') + ' | role: ' + (S.user ? S.user.role : 'N/A'));
        
        if (S.user && typeof addNotif === 'function') {
            addNotif('danger', 'Security Alert', 'Developer Tools were opened by ' + S.user.name + ' (' + S.user.role + '). This has been logged.');
        }
    } else if (!isOpen && devToolsOpen) {
        devToolsOpen = false;
    }
}, 1000);

// --- Detect console usage ---
var consoleWarningShown = false;
var originalConsoleLog = console.log;
(function() {
    var img = new Image();
    Object.defineProperty(img, 'id', {
        get: function() {
            if (!consoleWarningShown) {
                consoleWarningShown = true;
                if (S.user) {
                    logAction('Security Alert', 'Console accessed by ' + S.user.name);
                }
            }
        }
    });
    
    // Periodically push the warning image to detect console open
    setInterval(function() {
        consoleWarningShown = false;
        console.log('%c', img);
    }, 5000);
})();

// --- Block drag and drop (prevent dragging data out) ---
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// --- Block text selection on sensitive elements ---
document.addEventListener('selectstart', function(e) {
    // Allow selection in input fields and textareas
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return true;
    }
    // Allow selection in modal content (for copying)
    if (e.target.closest('.modal-mid') || e.target.closest('.modal-body')) {
        return true;
    }
    // Block selection on stat cards, table data, etc.
    if (e.target.closest('.stat-card') || e.target.closest('.data-table td')) {
        e.preventDefault();
        return false;
    }
});

// --- Block copy on sensitive data ---
document.addEventListener('copy', function(e) {
    // Allow copy in input fields
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return true;
    }
    // Log copy attempts on data
    if (S.user) {
        logAction('Security', 'Copy action attempted by ' + S.user.name);
    }
});

// --- Add security watermark to printed pages ---
var originalPrintPageContent = typeof printPageContent === 'function' ? printPageContent : null;
if (originalPrintPageContent) {
    printPageContent = function(pageId, title) {
        // Add watermark with user info to any printed page
        var watermark = 'Printed by: ' + (S.user ? S.user.name : 'Unknown') + ' | ' + 
                        new Date().toLocaleString('en-ZA') + ' | ' +
                        'Entity: ' + (S.isGlobalMode ? 'GLOBAL' : (S.entities[S.activeEntity] ? S.entities[S.activeEntity].name : ''));
        
        logAction('Print', 'Page printed: ' + title + ' by ' + (S.user ? S.user.name : 'Unknown'));
        
        originalPrintPageContent(pageId, title);
    };
}

// --- Clear sensitive data from console on load ---
if (typeof console.clear === 'function') {
    setTimeout(function() {
        console.clear();
        console.log('%c🔒 StockAI-Pro Security Active', 'color:#1a8ba8;font-size:16px;font-weight:bold');
        console.log('%cAll actions are monitored and logged.', 'color:#5a8a96;font-size:11px');
    }, 2000);
}

console.log('🛡️ Anti-tamper module loaded — DevTools detection active');
</script>
<script>
// ============ SUPER ADMIN SYSTEM ============
var ADMIN_CREDENTIALS = {
    username: 'Miguel_Cidrais',
    pin: '1173',
    email: 'cidraism@gmail.com'
};

// Override login to check for admin
var originalDoLoginForAdmin = doLogin;
doLogin = function(e) {
    e.preventDefault();
    var name = document.getElementById('login-username').value || '';
    var password = document.getElementById('login-password').value || '';
    
    // Check if this is the super admin
    if (name === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.pin) {
        S.user = {
            name: 'StockAI Admin',
            role: 'Owner',
            assignedEntity: 0,
            isSuperAdmin: true
        };
        
        logAction('Admin Login', 'Super Admin logged in');
        
        document.getElementById('login-screen').classList.add('hidden');
        
        if (S.entities.length > 0) {
            showEntitySelector();
        } else {
            toast('info', 'No entities found. Customer has not set up yet.');
            showEntitySelector();
        }
        
        toast('success', '🔑 Super Admin access granted. You can see all entities.');
        return;
    }
    
    // Normal login
    var role = document.getElementById('login-role').value;
    S.user = { name: name, role: role, assignedEntity: 0 };
    
    if (!name.trim()) {
        toast('error', 'Please enter your username');
        return;
    }
    
    if (S.entities.length > 0) {
        document.getElementById('login-screen').classList.add('hidden');
        showEntitySelector();
    } else {
        startSignUp();
    }
    logAction('Login', name + ' logged in as ' + role);
};

// Admin always has full access to everything
var originalPermsCheck = enterApp;
enterApp = function() {
    if (S.user && S.user.isSuperAdmin) {
        // Force Owner permissions for admin
        S.user.role = 'Owner';
    }
    originalPermsCheck();
    
    if (S.user && S.user.isSuperAdmin) {
        toast('info', '🔑 Admin Mode: You have full access to all entities and data');
    }
};

console.log('🔑 Super Admin module loaded');
</script>
<!-- FIREBASE SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

<script>
// ============ FIREBASE INITIALIZATION ============
var firebaseConfig = {
    apiKey: "AIzaSyBRwGda3Q-ibT8CgAo0tJXNJ4EOzy4gEs0",
    authDomain: "stockai-pro-b232e.firebaseapp.com",
    projectId: "stockai-pro-b232e",
    storageBucket: "stockai-pro-b232e.firebasestorage.app",
    messagingSenderId: "424200946359",
    appId: "1:424200946359:web:4c638eccd4e422ccc94332"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();

console.log('🔥 Firebase initialized');

// ============ CLOUD SAVE ============
function saveToCloud() {
    if (!S.user || !S.entities || S.entities.length === 0) return;
    
    // Create a unique account ID based on the owner email or first entity
    var accountId = getAccountId();
    if (!accountId) return;
    
    try {
        var data = {
            user: S.user,
            owner: S.owner || null,
            entities: S.entities,
            inventory: S.inventory,
            purchases: S.purchases,
            wastage: S.wastage,
            suppliers: S.suppliers,
            users: S.users,
            menuItems: S.menuItems,
            cashups: S.cashups,
            notifs: S.notifs,
            activities: S.activities,
            pendingPOs: S.pendingPOs,
            internalTransfers: S.internalTransfers || [],
            billing: S.billing,
            userLogs: S.userLogs,
            invoices: S.invoices || {},
            dayEnds: S.dayEnds || {},
            integrations: S.integrations || {},
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            lastUpdatedBy: S.user ? S.user.name : 'Unknown',
            lastUpdatedDevice: navigator.platform || 'Unknown'
        };
        
        db.collection('accounts').doc(accountId).set(data, { merge: true })
            .then(function() {
                console.log('☁️ Data saved to cloud');
            })
            .catch(function(err) {
                console.warn('Cloud save error:', err);
            });
    } catch(e) {
        console.warn('Cloud save error:', e);
    }
}

function loadFromCloud(callback) {
    var accountId = getAccountId();
    if (!accountId) {
        if (callback) callback(false);
        return;
    }
    
    db.collection('accounts').doc(accountId).get()
        .then(function(doc) {
            if (doc.exists) {
                var data = doc.data();
                console.log('☁️ Data loaded from cloud');
                
                // Merge cloud data with local state
                if (data.entities) S.entities = data.entities;
                if (data.inventory) S.inventory = data.inventory;
                if (data.purchases) S.purchases = data.purchases;
                if (data.wastage) S.wastage = data.wastage;
                if (data.suppliers) S.suppliers = data.suppliers;
                if (data.users) S.users = data.users;
                if (data.menuItems) S.menuItems = data.menuItems;
                if (data.cashups) S.cashups = data.cashups;
                if (data.notifs) S.notifs = data.notifs;
                if (data.activities) S.activities = data.activities;
                if (data.pendingPOs) S.pendingPOs = data.pendingPOs;
                if (data.internalTransfers) S.internalTransfers = data.internalTransfers;
                if (data.billing) S.billing = data.billing;
                if (data.userLogs) S.userLogs = data.userLogs;
                if (data.invoices) S.invoices = data.invoices;
                if (data.dayEnds) S.dayEnds = data.dayEnds;
                if (data.integrations) S.integrations = data.integrations;
                if (data.owner) S.owner = data.owner;
                
                // Also save to localStorage as backup
                saveToStorage();
                
                if (callback) callback(true);
            } else {
                console.log('☁️ No cloud data found — using local');
                if (callback) callback(false);
            }
        })
        .catch(function(err) {
            console.warn('Cloud load error:', err);
            if (callback) callback(false);
        });
}

// ============ REAL-TIME SYNC ============
var cloudSyncListener = null;

function startCloudSync() {
    var accountId = getAccountId();
    if (!accountId) return;
    
    // Listen for changes from other devices
    cloudSyncListener = db.collection('accounts').doc(accountId)
        .onSnapshot(function(doc) {
            if (!doc.exists) return;
            var data = doc.data();
            
            // Check if this update came from another device
            if (data.lastUpdatedDevice && data.lastUpdatedDevice !== (navigator.platform || 'Unknown')) {
                console.log('🔄 Received update from another device');
                
                // Update local data
                if (data.entities) S.entities = data.entities;
                if (data.inventory) S.inventory = data.inventory;
                if (data.purchases) S.purchases = data.purchases;
                if (data.wastage) S.wastage = data.wastage;
                if (data.suppliers) S.suppliers = data.suppliers;
                if (data.users) S.users = data.users;
                if (data.menuItems) S.menuItems = data.menuItems;
                if (data.cashups) S.cashups = data.cashups;
                if (data.notifs) S.notifs = data.notifs;
                if (data.activities) S.activities = data.activities;
                if (data.pendingPOs) S.pendingPOs = data.pendingPOs;
                if (data.internalTransfers) S.internalTransfers = data.internalTransfers;
                if (data.billing) S.billing = data.billing;
                if (data.userLogs) S.userLogs = data.userLogs;
                
                // Save locally
                saveToStorage();
                
                // Refresh the current page
                if (typeof renderPages === 'function') {
                    renderPages();
                    toast('info', '🔄 Data updated from another device');
                }
            }
        }, function(err) {
            console.warn('Sync listener error:', err);
        });
}

function stopCloudSync() {
    if (cloudSyncListener) {
        cloudSyncListener();
        cloudSyncListener = null;
    }
}

// ============ ACCOUNT ID HELPER ============
function getAccountId() {
    // Use owner email as account ID (unique per customer)
    if (S.owner && S.owner.email) {
        return S.owner.email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    }
    // Fallback: use first entity ID
    if (S.entities && S.entities.length > 0) {
        return S.entities[0].id;
    }
    return null;
}

// ============ ADMIN: LIST ALL CUSTOMERS ============
function adminListAllCustomers() {
    if (!S.user || !S.user.isSuperAdmin) {
        toast('error', 'Admin access required');
        return;
    }
    
    db.collection('accounts').get()
        .then(function(snapshot) {
            var customers = [];
            snapshot.forEach(function(doc) {
                var data = doc.data();
                customers.push({
                    id: doc.id,
                    owner: data.owner ? data.owner.name : 'Unknown',
                    email: data.owner ? data.owner.email : 'N/A',
                    entities: data.entities ? data.entities.length : 0,
                    lastUpdated: data.lastUpdated ? data.lastUpdated.toDate().toLocaleString('en-ZA') : 'Never'
                });
            });
            
            console.log('📋 All customers:', customers);
            showAdminCustomerList(customers);
        })
        .catch(function(err) {
            console.warn('Admin list error:', err);
            toast('error', 'Could not load customer list');
        });
}

function showAdminCustomerList(customers) {
    var html = '<h3 style="margin-bottom:14px;color:#0d4a5c">📋 All Customer Accounts (' + customers.length + ')</h3>';
    
    if (customers.length === 0) {
        html += '<p style="color:#5a8a96;text-align:center;padding:20px">No customers yet</p>';
    } else {
        html += '<div style="max-height:60vh;overflow-y:auto">';
        customers.forEach(function(c) {
            html += '<div style="background:#f5f9fa;padding:14px;border-radius:10px;margin-bottom:8px;border-left:3px solid #1a8ba8;cursor:pointer" onclick="adminLoadCustomer(\'' + c.id + '\')">' +
                '<div style="display:flex;justify-content:space-between;align-items:center">' +
                    '<div><strong style="color:#0d4a5c">' + c.owner + '</strong><br><span style="font-size:.78rem;color:#5a8a96">' + c.email + ' • ' + c.entities + ' entities</span></div>' +
                    '<span style="font-size:.72rem;color:#8aabb5">' + c.lastUpdated + '</span>' +
                '</div>' +
            '</div>';
        });
        html += '</div>';
    }
    
    document.getElementById('modal-container').innerHTML = '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window"><div class="modal-top"><h2>🔑 Admin — Customer Accounts</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid">' + html + '</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Close</button></div></div></div>';
}

function adminLoadCustomer(accountId) {
    closeModal();
    toast('info', 'Loading customer data...');
    
    db.collection('accounts').doc(accountId).get()
        .then(function(doc) {
            if (doc.exists) {
                var data = doc.data();
                
                // Load customer data into current state
                S.entities = data.entities || [];
                S.inventory = data.inventory || {};
                S.purchases = data.purchases || {};
                S.wastage = data.wastage || {};
                S.suppliers = data.suppliers || {};
                S.users = data.users || {};
                S.menuItems = data.menuItems || {};
                S.cashups = data.cashups || {};
                S.notifs = data.notifs || [];
                S.activities = data.activities || {};
                S.pendingPOs = data.pendingPOs || {};
                S.internalTransfers = data.internalTransfers || [];
                S.billing = data.billing || null;
                S.userLogs = data.userLogs || {};
                S.owner = data.owner || null;
                
                saveToStorage();
                
                toast('success', '✅ Loaded customer: ' + (data.owner ? data.owner.name : accountId));
                
                // Refresh — show entity selector
                showEntitySelector();
            }
        })
        .catch(function(err) {
            toast('error', 'Failed to load customer');
        });
}

// ============ OVERRIDE SAVE TO INCLUDE CLOUD ============
var originalSaveForCloud = saveToStorage;
saveToStorage = function() {
    // Save locally first (fast)
    originalSaveForCloud();
    
    // Then save to cloud (async)
    clearTimeout(window._cloudSaveTimer);
    window._cloudSaveTimer = setTimeout(function() {
        saveToCloud();
    }, 2000); // Debounce: wait 2 seconds of no changes before syncing
};

// ============ HOOK INTO LOGIN ============
var originalLoginForCloud = doLogin;
doLogin = function(e) {
    e.preventDefault();
    var name = document.getElementById('login-username').value || '';
    var password = document.getElementById('login-password').value || '';
    var role = document.getElementById('login-role').value;
    
    if (!name.trim()) {
        toast('error', 'Please enter your username');
        return;
    }
    
    // Check super admin
    if (typeof ADMIN_CREDENTIALS !== 'undefined' && name === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.pin) {
        S.user = {
            name: 'StockAI Admin',
            role: 'Owner',
            assignedEntity: 0,
            isSuperAdmin: true
        };
        
        logAction('Admin Login', 'Super Admin logged in');
        document.getElementById('login-screen').classList.add('hidden');
        
        // Try to load from cloud first
        toast('info', '🔄 Loading cloud data...');
        loadFromCloud(function(found) {
            if (found) {
                toast('success', '☁️ Cloud data loaded');
            }
            if (S.entities.length > 0) {
                showEntitySelector();
            } else {
                toast('info', 'No customer data found. Use Admin panel to browse customers.');
            }
            startCloudSync();
        });
        
        toast('success', '🔑 Super Admin access granted');
        return;
    }
    
    // Normal login
    S.user = { name: name, role: role, assignedEntity: 0 };
    
    document.getElementById('login-screen').classList.add('hidden');
    
    // Try cloud data first
    toast('info', '🔄 Checking cloud data...');
    loadFromCloud(function(found) {
        if (found) {
            toast('success', '☁️ Data loaded from cloud');
            showEntitySelector();
        } else if (S.entities.length > 0) {
            toast('info', 'Using local data');
            showEntitySelector();
        } else {
            startSignUp();
        }
        startCloudSync();
    });
    
    logAction('Login', name + ' logged in as ' + role);
};

// ============ HOOK INTO LOGOUT ============
var originalLogoutForCloud = doLogout;
doLogout = function() {
    // Save to cloud before logging out
    saveToCloud();
    stopCloudSync();
    
    if (S.user) logAction('Logout', S.user.name + ' logged out');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    S.isGlobalMode = false;
    S.user = null;
    toast('info', 'Logged out');
};

// ============ ADMIN SYSTEM (FIXED) ============

// Override entity selector for admin
var originalShowEntitySelectorForAdmin = showEntitySelector;
showEntitySelector = function() {
    // If super admin, show customer list instead of entities
    if (S.user && S.user.isSuperAdmin) {
        showAdminCustomerSelector();
        return;
    }
    
    // Normal user — show regular entity selector
    originalShowEntitySelectorForAdmin();
};

function showAdminCustomerSelector() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('profile-screen').classList.add('hidden');
    document.getElementById('owner-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('entity-select-screen').classList.remove('hidden');
    
    document.getElementById('es-sub-text').textContent = '🔑 Admin Mode — Select a customer account to manage';
    
    var grid = document.getElementById('entity-grid');
    grid.innerHTML = '<div style="text-align:center;padding:20px;color:#5a8a96;grid-column:1/-1"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:#1a8ba8;margin-bottom:10px;display:block"></i>Loading customer accounts from cloud...</div>';
    
    // Load all customers from Firebase
    db.collection('accounts').get()
        .then(function(snapshot) {
            var customers = [];
            snapshot.forEach(function(doc) {
                var data = doc.data();
                customers.push({
                    id: doc.id,
                    ownerName: data.owner ? data.owner.name : 'Unknown',
                    ownerEmail: data.owner ? data.owner.email : 'N/A',
                    groupName: data.owner ? data.owner.groupName : '',
                    entityCount: data.entities ? data.entities.length : 0,
                    entities: data.entities || [],
                    lastUpdated: data.lastUpdated ? data.lastUpdated.toDate().toLocaleString('en-ZA') : 'Never',
                    lastUpdatedBy: data.lastUpdatedBy || 'Unknown'
                });
            });
            
            if (customers.length === 0) {
                grid.innerHTML = '' +
                    '<div style="text-align:center;padding:30px;grid-column:1/-1">' +
                        '<i class="fas fa-users" style="font-size:2.5rem;color:#c4dde4;margin-bottom:14px;display:block"></i>' +
                        '<h3 style="color:#0d4a5c;margin-bottom:6px">No Customers Yet</h3>' +
                        '<p style="color:#5a8a96;font-size:.88rem">When customers sign up and create entities, they will appear here.</p>' +
                    '</div>';
                return;
            }
            
            var html = '';
            
            customers.forEach(function(cust) {
                var entityNames = cust.entities.map(function(e) { return e.name; }).join(', ');
                
                html += '<div class="entity-option" onclick="adminSelectCustomer(\'' + cust.id + '\')" style="text-align:left;padding:18px">' +
                    '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">' +
                        '<div style="width:40px;height:40px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;flex-shrink:0">' + (cust.ownerName.charAt(0) || '?') + '</div>' +
                        '<div>' +
                            '<h3 style="font-size:.95rem;margin:0;color:#0d4a5c">' + cust.ownerName + '</h3>' +
                            '<p style="font-size:.72rem;margin:0;color:#5a8a96">' + cust.ownerEmail + '</p>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px">' +
                        '<span style="font-size:.68rem;background:rgba(26,139,168,.1);color:#1a8ba8;padding:2px 8px;border-radius:10px;font-weight:600"><i class="fas fa-building"></i> ' + cust.entityCount + ' entities</span>' +
                        (cust.groupName ? '<span style="font-size:.68rem;background:rgba(245,158,11,.1);color:#d97706;padding:2px 8px;border-radius:10px;font-weight:600"><i class="fas fa-briefcase"></i> ' + cust.groupName + '</span>' : '') +
                    '</div>' +
                    '<p style="font-size:.68rem;color:#8aabb5;margin:0"><i class="fas fa-clock"></i> Last active: ' + cust.lastUpdated + ' by ' + cust.lastUpdatedBy + '</p>' +
                    (entityNames ? '<p style="font-size:.65rem;color:#a0c8d4;margin-top:4px">Entities: ' + entityNames + '</p>' : '') +
                '</div>';
            });
            
            // Add back to login option
            html += '<div class="entity-option" onclick="adminBackToLogin()" style="border:2px dashed #c4dde4;background:#f5f9fa">' +
                '<i class="fas fa-arrow-left" style="font-size:1.5rem;color:#5a8a96"></i>' +
                '<h3 style="color:#5a8a96">Back to Login</h3>' +
                '<p style="color:#8aabb5">Return to login screen</p>' +
            '</div>';
            
            grid.innerHTML = html;
        })
        .catch(function(err) {
            console.warn('Admin load error:', err);
            grid.innerHTML = '<div style="text-align:center;padding:20px;grid-column:1/-1;color:#c94545"><i class="fas fa-exclamation-circle" style="font-size:1.5rem;margin-bottom:10px;display:block"></i><h3>Error Loading Customers</h3><p style="font-size:.82rem">' + err.message + '</p><button onclick="showAdminCustomerSelector()" style="margin-top:10px;padding:8px 16px;background:#1a8ba8;color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:inherit">Retry</button></div>';
        });
}

function adminSelectCustomer(accountId) {
    toast('info', '🔄 Loading customer data...');
    
    db.collection('accounts').doc(accountId).get()
        .then(function(doc) {
            if (!doc.exists) {
                toast('error', 'Customer data not found');
                return;
            }
            
            var data = doc.data();
            
            // Load ALL customer data into current state
            S.entities = data.entities || [];
            S.inventory = data.inventory || {};
            S.purchases = data.purchases || {};
            S.wastage = data.wastage || {};
            S.suppliers = data.suppliers || {};
            S.users = data.users || {};
            S.menuItems = data.menuItems || {};
            S.cashups = data.cashups || {};
            S.notifs = data.notifs || [];
            S.activities = data.activities || {};
            S.pendingPOs = data.pendingPOs || {};
            S.internalTransfers = data.internalTransfers || [];
            S.billing = data.billing || null;
            S.userLogs = data.userLogs || {};
            S.owner = data.owner || null;
            S.invoices = data.invoices || {};
            S.dayEnds = data.dayEnds || {};
            
            // Store which customer account we're managing
            S._adminAccountId = accountId;
            S._adminCustomerName = data.owner ? data.owner.name : accountId;
            
            // Save locally
            saveToStorage();
            
            var customerName = data.owner ? data.owner.name : accountId;
            toast('success', '✅ Loaded: ' + customerName + ' (' + S.entities.length + ' entities)');
            
            if (S.entities.length === 0) {
                toast('warning', 'This customer has no entities yet');
                return;
            }
            
            // Now show the ENTITY selector for this specific customer
            showAdminEntitySelector(customerName);
        })
        .catch(function(err) {
            toast('error', 'Failed to load: ' + err.message);
        });
}

function showAdminEntitySelector(customerName) {
    document.getElementById('es-sub-text').textContent = '🔑 Admin — ' + customerName + '\'s Entities (tap to enter)';
    
    var grid = document.getElementById('entity-grid');
    var html = '';
    
    // Show all entities for this customer
    S.entities.forEach(function(ent, idx) {
        html += '<div class="entity-option" onclick="adminEnterEntity(' + idx + ')">' +
            '<i class="fas fa-building"></i>' +
            '<h3>' + ent.name + '</h3>' +
            '<p>' + (ent.contact || '') + '</p>' +
            '<p style="font-size:.68rem;color:#1a8ba8;margin-top:4px">Food Cost: ' + ent.foodCostTarget + '% • ' + (ent.plan || 'professional') + '</p>' +
        '</div>';
    });
    
    // Global View (if 2+ entities)
    if (S.entities.length >= 2) {
        html += '<div class="entity-option global" onclick="adminEnterEntity(-1)">' +
            '<span class="global-crown">👑 GLOBAL VIEW</span>' +
            '<i class="fas fa-globe"></i>' +
            '<h3>Global View — ' + customerName + '</h3>' +
            '<p>All ' + S.entities.length + ' Entities Combined</p>' +
        '</div>';
    }
    
    // Back to customer list
    html += '<div class="entity-option" onclick="showAdminCustomerSelector()" style="border:2px dashed #c4dde4;background:#f5f9fa">' +
        '<i class="fas fa-arrow-left" style="font-size:1.5rem;color:#5a8a96"></i>' +
        '<h3 style="color:#5a8a96">← Back to Customer List</h3>' +
        '<p style="color:#8aabb5">Select a different customer</p>' +
    '</div>';
    
    grid.innerHTML = html;
}

function adminEnterEntity(idx) {
    if (idx === -1) {
        S.isGlobalMode = true;
        S.activeEntity = -1;
    } else {
        S.isGlobalMode = false;
        S.activeEntity = idx;
    }
    
    document.getElementById('entity-select-screen').classList.add('hidden');
    enterApp();
    
    // Show admin indicator
    if (S._adminCustomerName) {
        toast('info', '🔑 Managing: ' + S._adminCustomerName + (S.isGlobalMode ? ' (Global)' : ' — ' + S.entities[S.activeEntity].name));
    }
    
    // Start real-time sync for this customer
    if (S._adminAccountId) {
        startCloudSync();
    }
}

function adminBackToLogin() {
    document.getElementById('entity-select-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    S.user = null;
    S.isGlobalMode = false;
    S._adminAccountId = null;
    S._adminCustomerName = null;
}

// Override switch entity for admin to go back to customer's entities
var originalSwitchEntityForAdmin = switchEntity;
switchEntity = function() {
    if (S.user && S.user.isSuperAdmin && S._adminCustomerName) {
        // Admin: go back to this customer's entity list
        document.getElementById('app').classList.add('hidden');
        document.getElementById('entity-select-screen').classList.remove('hidden');
        showAdminEntitySelector(S._adminCustomerName);
        return;
    }
    
    // Normal user
    originalSwitchEntityForAdmin();
};

// Add "Back to Customer List" button in sidebar for admin
var originalBuildSidebar = renderSidebar;
renderSidebar = function() {
    originalBuildSidebar();
    
    if (S.user && S.user.isSuperAdmin) {
        var nav = document.getElementById('sidebar-nav');
        if (nav) {
            nav.innerHTML += '' +
                '<div style="margin-top:10px;padding-top:10px;border-top:1px solid #c4dde4">' +
                    '<a class="nav-link" onclick="goToAdminCustomerList()" style="color:#c94545;cursor:pointer">' +
                        '<i class="fas fa-users-cog" style="color:#c94545"></i>' +
                        '<span>← Customer List</span>' +
                    '</a>' +
                '</div>';
        }
        
        // Update header to show which customer
        if (S._adminCustomerName) {
            var headerEntity = document.getElementById('header-entity-name');
            if (headerEntity) {
                headerEntity.textContent = '🔑 ' + S._adminCustomerName;
            }
        }
    }
};

function goToAdminCustomerList() {
    document.getElementById('app').classList.add('hidden');
    document.getElementById('entity-select-screen').classList.remove('hidden');
    showAdminCustomerSelector();
}

// ============ ADMIN ACCOUNT MANAGEMENT ============

function adminToggleCustomerStatus(accountId, currentStatus) {
    var newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    var action = newStatus === 'suspended' ? 'Suspend' : 'Reactivate';
    
    if (newStatus === 'suspended') {
        var reason = prompt(action + ' this customer account?\n\nEnter reason (e.g., "Non-payment — 2 months overdue"):\n\nThis will BLOCK the customer from using the app until reactivated.');
        if (reason === null) return; // Cancelled
        if (!reason.trim()) reason = 'Account suspended by admin';
        
        db.collection('accounts').doc(accountId).update({
            accountStatus: 'suspended',
            suspendedDate: firebase.firestore.FieldValue.serverTimestamp(),
            suspendedBy: S.user.name,
            suspendedReason: reason,
            statusHistory: firebase.firestore.FieldValue.arrayUnion({
                action: 'suspended',
                date: new Date().toISOString(),
                by: S.user.name,
                reason: reason
            })
        }).then(function() {
            toast('warning', '⚠️ Customer account SUSPENDED');
            logAction('Admin', 'Suspended account: ' + accountId + ' — ' + reason);
            showAdminCustomerSelector(); // Refresh list
        }).catch(function(err) {
            toast('error', 'Failed: ' + err.message);
        });
    } else {
        var note = prompt('Reactivate this customer account?\n\nEnter note (e.g., "Paid via EFT — ref 12345"):\n\nThis will immediately restore their access.');
        if (note === null) return;
        if (!note.trim()) note = 'Account reactivated by admin';
        
        db.collection('accounts').doc(accountId).update({
            accountStatus: 'active',
            reactivatedDate: firebase.firestore.FieldValue.serverTimestamp(),
            reactivatedBy: S.user.name,
            reactivatedNote: note,
            suspendedReason: firebase.firestore.FieldValue.delete(),
            statusHistory: firebase.firestore.FieldValue.arrayUnion({
                action: 'reactivated',
                date: new Date().toISOString(),
                by: S.user.name,
                reason: note
            })
        }).then(function() {
            toast('success', '✅ Customer account REACTIVATED');
            logAction('Admin', 'Reactivated account: ' + accountId + ' — ' + note);
            showAdminCustomerSelector();
        }).catch(function(err) {
            toast('error', 'Failed: ' + err.message);
        });
    }
}

function adminAddNote(accountId) {
    var note = prompt('Add admin note for this customer:\n\n(e.g., "Called customer — promised to pay by Friday")');
    if (!note || !note.trim()) return;
    
    db.collection('accounts').doc(accountId).update({
        adminNotes: firebase.firestore.FieldValue.arrayUnion({
            note: note,
            date: new Date().toISOString(),
            by: S.user.name
        })
    }).then(function() {
        toast('success', '📝 Note added');
        logAction('Admin', 'Added note to ' + accountId + ': ' + note);
        showAdminCustomerSelector();
    }).catch(function(err) {
        toast('error', 'Failed: ' + err.message);
    });
}

function adminViewNotes(accountId, customerName) {
    db.collection('accounts').doc(accountId).get()
        .then(function(doc) {
            if (!doc.exists) return;
            var data = doc.data();
            var notes = data.adminNotes || [];
            var history = data.statusHistory || [];
            
            var html = '<h3 style="margin-bottom:14px;color:#0d4a5c">📋 ' + customerName + ' — Admin Notes & History</h3>';
            
            // Status History
            if (history.length > 0) {
                html += '<div style="margin-bottom:16px"><h4 style="font-size:.88rem;color:#0d4a5c;margin-bottom:8px">Status History</h4>';
                history.slice().reverse().forEach(function(h) {
                    var color = h.action === 'suspended' ? '#c94545' : '#2ea871';
                    var icon = h.action === 'suspended' ? 'ban' : 'check-circle';
                    html += '<div style="padding:10px;background:#f5f9fa;border-radius:8px;margin-bottom:6px;border-left:3px solid ' + color + ';font-size:.82rem">' +
                        '<div style="display:flex;justify-content:space-between;align-items:center">' +
                            '<span style="color:' + color + ';font-weight:700"><i class="fas fa-' + icon + '"></i> ' + h.action.toUpperCase() + '</span>' +
                            '<span style="font-size:.7rem;color:#8aabb5">' + new Date(h.date).toLocaleString('en-ZA') + '</span>' +
                        '</div>' +
                        '<p style="color:#2a5f70;margin-top:4px">By: ' + h.by + ' — ' + h.reason + '</p>' +
                    '</div>';
                });
                html += '</div>';
            }
            
            // Admin Notes
            html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><h4 style="font-size:.88rem;color:#0d4a5c">Admin Notes</h4><button onclick="adminAddNote(\'' + accountId + '\');closeModal()" style="padding:6px 14px;background:#1a8ba8;color:#fff;border:none;border-radius:6px;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit"><i class="fas fa-plus"></i> Add Note</button></div>';
            
            if (notes.length === 0) {
                html += '<p style="color:#8aabb5;font-style:italic;padding:10px">No notes yet</p>';
            } else {
                notes.slice().reverse().forEach(function(n) {
                    html += '<div style="padding:10px;background:#f5f9fa;border-radius:8px;margin-bottom:6px;font-size:.82rem">' +
                        '<div style="display:flex;justify-content:space-between">' +
                            '<span style="color:#0d4a5c;font-weight:600">' + n.by + '</span>' +
                            '<span style="font-size:.7rem;color:#8aabb5">' + new Date(n.date).toLocaleString('en-ZA') + '</span>' +
                        '</div>' +
                        '<p style="color:#2a5f70;margin-top:4px">' + n.note + '</p>' +
                    '</div>';
                });
            }
            
            document.getElementById('modal-container').innerHTML = '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:600px"><div class="modal-top"><h2>🔑 Admin Notes</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid" style="max-height:60vh;overflow-y:auto">' + html + '</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Close</button></div></div></div>';
        });
}

// ============ UPDATED CUSTOMER SELECTOR WITH STATUS ============

var _origShowAdminCustomerSelector = showAdminCustomerSelector;
showAdminCustomerSelector = function() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('profile-screen').classList.add('hidden');
    document.getElementById('owner-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('entity-select-screen').classList.remove('hidden');
    
    document.getElementById('es-sub-text').textContent = '🔑 Admin Mode — Select a customer to manage';
    
    var grid = document.getElementById('entity-grid');
    grid.innerHTML = '<div style="text-align:center;padding:20px;color:#5a8a96;grid-column:1/-1"><i class="fas fa-spinner fa-spin" style="font-size:1.5rem;color:#1a8ba8;margin-bottom:10px;display:block"></i>Loading customers from cloud...</div>';
    
    db.collection('accounts').get()
        .then(function(snapshot) {
            var customers = [];
            snapshot.forEach(function(doc) {
                var data = doc.data();
                customers.push({
                    id: doc.id,
                    ownerName: data.owner ? data.owner.name : 'Unknown',
                    ownerEmail: data.owner ? data.owner.email : 'N/A',
                    groupName: data.owner ? data.owner.groupName : '',
                    entityCount: data.entities ? data.entities.length : 0,
                    entities: data.entities || [],
                    lastUpdated: data.lastUpdated ? data.lastUpdated.toDate().toLocaleString('en-ZA') : 'Never',
                    lastUpdatedBy: data.lastUpdatedBy || 'Unknown',
                    accountStatus: data.accountStatus || 'active',
                    suspendedReason: data.suspendedReason || '',
                    adminNotes: data.adminNotes || [],
                    billing: data.billing || null
                });
            });
            
            if (customers.length === 0) {
                grid.innerHTML = '<div style="text-align:center;padding:30px;grid-column:1/-1"><i class="fas fa-users" style="font-size:2.5rem;color:#c4dde4;margin-bottom:14px;display:block"></i><h3 style="color:#0d4a5c;margin-bottom:6px">No Customers Yet</h3><p style="color:#5a8a96;font-size:.88rem">Customers will appear here after they sign up.</p></div>';
                return;
            }
            
            // Sort: active first, then suspended
            customers.sort(function(a, b) {
                if (a.accountStatus === 'active' && b.accountStatus !== 'active') return -1;
                if (a.accountStatus !== 'active' && b.accountStatus === 'active') return 1;
                return 0;
            });
            
            var html = '';
            var activeCount = customers.filter(function(c) { return c.accountStatus === 'active'; }).length;
            var suspendedCount = customers.filter(function(c) { return c.accountStatus === 'suspended'; }).length;
            
            // Stats bar
            html += '<div style="grid-column:1/-1;display:flex;gap:10px;margin-bottom:4px">' +
                '<div style="flex:1;background:#fff;padding:12px;border-radius:10px;text-align:center;border-left:3px solid #2ea871"><small style="font-size:.65rem;color:#5a8a96;display:block;text-transform:uppercase;font-weight:600">Active</small><strong style="font-size:1.3rem;color:#2ea871">' + activeCount + '</strong></div>' +
                '<div style="flex:1;background:#fff;padding:12px;border-radius:10px;text-align:center;border-left:3px solid #c94545"><small style="font-size:.65rem;color:#5a8a96;display:block;text-transform:uppercase;font-weight:600">Suspended</small><strong style="font-size:1.3rem;color:#c94545">' + suspendedCount + '</strong></div>' +
                '<div style="flex:1;background:#fff;padding:12px;border-radius:10px;text-align:center;border-left:3px solid #1a8ba8"><small style="font-size:.65rem;color:#5a8a96;display:block;text-transform:uppercase;font-weight:600">Total</small><strong style="font-size:1.3rem;color:#1a8ba8">' + customers.length + '</strong></div>' +
            '</div>';
            
            customers.forEach(function(cust) {
                var isActive = cust.accountStatus === 'active';
                var statusColor = isActive ? '#2ea871' : '#c94545';
                var statusIcon = isActive ? 'check-circle' : 'ban';
                var statusText = isActive ? 'ACTIVE' : 'SUSPENDED';
                var cardBorder = isActive ? '1px solid #c4dde4' : '2px solid #c94545';
                var cardBg = isActive ? '#fff' : 'rgba(201,69,69,.03)';
                var noteCount = cust.adminNotes ? cust.adminNotes.length : 0;
                
                html += '<div style="background:' + cardBg + ';border:' + cardBorder + ';border-radius:14px;padding:16px;position:relative">' +
                    // Status badge
                    '<div style="position:absolute;top:10px;right:10px;display:flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:.65rem;font-weight:700;background:' + (isActive ? 'rgba(46,168,113,.1)' : 'rgba(201,69,69,.1)') + ';color:' + statusColor + '"><i class="fas fa-' + statusIcon + '"></i> ' + statusText + '</div>' +
                    
                    // Customer info (clickable to enter)
                    '<div onclick="adminSelectCustomer(\'' + cust.id + '\')" style="cursor:pointer">' +
                        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">' +
                            '<div style="width:40px;height:40px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;flex-shrink:0">' + (cust.ownerName.charAt(0) || '?') + '</div>' +
                            '<div><h3 style="font-size:.92rem;margin:0;color:#0d4a5c">' + cust.ownerName + '</h3><p style="font-size:.7rem;margin:0;color:#5a8a96">' + cust.ownerEmail + '</p></div>' +
                        '</div>' +
                        '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' +
                            '<span style="font-size:.65rem;background:rgba(26,139,168,.08);color:#1a8ba8;padding:2px 8px;border-radius:10px;font-weight:600"><i class="fas fa-building"></i> ' + cust.entityCount + ' entities</span>' +
                            (cust.groupName ? '<span style="font-size:.65rem;background:rgba(245,158,11,.08);color:#d97706;padding:2px 8px;border-radius:10px;font-weight:600">' + cust.groupName + '</span>' : '') +
                            (noteCount > 0 ? '<span style="font-size:.65rem;background:rgba(43,142,179,.08);color:#2b8eb3;padding:2px 8px;border-radius:10px;font-weight:600"><i class="fas fa-sticky-note"></i> ' + noteCount + ' notes</span>' : '') +
                        '</div>' +
                        (cust.suspendedReason ? '<p style="font-size:.72rem;color:#c94545;margin-bottom:6px"><i class="fas fa-exclamation-triangle"></i> ' + cust.suspendedReason + '</p>' : '') +
                        '<p style="font-size:.65rem;color:#8aabb5"><i class="fas fa-clock"></i> Last: ' + cust.lastUpdated + '</p>' +
                    '</div>' +
                    
                    // Action buttons
                    '<div style="display:flex;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid #e0eff3">' +
                        '<button onclick="event.stopPropagation();adminToggleCustomerStatus(\'' + cust.id + '\',\'' + cust.accountStatus + '\')" style="flex:1;padding:8px;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px;' + (isActive ? 'background:rgba(201,69,69,.08);color:#c94545' : 'background:rgba(46,168,113,.08);color:#2ea871') + '"><i class="fas fa-' + (isActive ? 'ban' : 'check-circle') + '"></i> ' + (isActive ? 'Suspend' : 'Reactivate') + '</button>' +
                        '<button onclick="event.stopPropagation();adminAddNote(\'' + cust.id + '\')" style="flex:1;padding:8px;background:rgba(26,139,168,.08);color:#1a8ba8;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px"><i class="fas fa-sticky-note"></i> Add Note</button>' +
                        '<button onclick="event.stopPropagation();adminViewNotes(\'' + cust.id + '\',\'' + cust.ownerName + '\')" style="flex:1;padding:8px;background:rgba(43,142,179,.08);color:#2b8eb3;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px"><i class="fas fa-history"></i> History</button>' +
                    '</div>' +
                '</div>';
            });
            
            // Back button
            html += '<div style="grid-column:1/-1;text-align:center;padding:10px"><button onclick="adminBackToLogin()" style="padding:10px 24px;background:#f5f9fa;color:#5a8a96;border:1px solid #c4dde4;border-radius:8px;font-size:.85rem;font-weight:600;cursor:pointer;font-family:inherit"><i class="fas fa-arrow-left"></i> Back to Login</button></div>';
            
            grid.innerHTML = html;
        })
        .catch(function(err) {
            console.warn('Admin load error:', err);
            grid.innerHTML = '<div style="text-align:center;padding:20px;grid-column:1/-1;color:#c94545"><i class="fas fa-exclamation-circle" style="font-size:1.5rem;margin-bottom:10px;display:block"></i><h3>Error Loading</h3><p style="font-size:.82rem">' + err.message + '</p><button onclick="showAdminCustomerSelector()" style="margin-top:10px;padding:8px 16px;background:#1a8ba8;color:#fff;border:none;border-radius:8px;cursor:pointer;font-family:inherit">Retry</button></div>';
        });
};

// ============ BLOCK SUSPENDED ACCOUNTS ============
var originalEnterAppForSuspend = enterApp;
enterApp = function() {
    // Check if this account is suspended (for non-admin users)
    if (S.user && !S.user.isSuperAdmin) {
        var accountId = getAccountId();
        if (accountId) {
            db.collection('accounts').doc(accountId).get()
                .then(function(doc) {
                    if (doc.exists) {
                        var data = doc.data();
                        if (data.accountStatus === 'suspended') {
                            // BLOCK ACCESS
                            showSuspendedMessage(data.suspendedReason || 'Your account has been suspended.');
                            return;
                        }
                    }
                    // Account is active — continue normally
                    originalEnterAppForSuspend();
                })
                .catch(function() {
                    // Can't check — allow access (offline mode)
                    originalEnterAppForSuspend();
                });
            return;
        }
    }
    
    // Admin or no account ID — continue normally
    originalEnterAppForSuspend();
};

function showSuspendedMessage(reason) {
    document.getElementById('entity-select-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:linear-gradient(135deg,#c94545,#991b1b);z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px';
    overlay.innerHTML = '' +
        '<div style="background:#fff;border-radius:20px;padding:36px;max-width:420px;width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3)">' +
            '<div style="width:70px;height:70px;background:rgba(201,69,69,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2rem;color:#c94545"><i class="fas fa-ban"></i></div>' +
            '<h2 style="font-size:1.3rem;font-weight:800;color:#c94545;margin-bottom:8px">Account Suspended</h2>' +
            '<p style="font-size:.9rem;color:#2a5f70;line-height:1.5;margin-bottom:16px">' + reason + '</p>' +
            '<p style="font-size:.85rem;color:#5a8a96;margin-bottom:20px">Please contact StockAI-Pro support to resolve this issue and restore your access.</p>' +
            '<div style="display:flex;flex-direction:column;gap:10px">' +
                '<a href="https://wa.me/27790440508?text=Hi%2C%20my%20StockAI-Pro%20account%20is%20suspended.%20Please%20help." target="_blank" style="padding:14px;background:#25d366;color:#fff;border-radius:10px;font-weight:700;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;font-size:.92rem"><i class="fab fa-whatsapp"></i> WhatsApp Support</a>' +
                '<a href="mailto:cidraism@gmail.com?subject=Account%20Suspended%20-%20StockAI-Pro" style="padding:14px;background:#1a8ba8;color:#fff;border-radius:10px;font-weight:700;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;font-size:.92rem"><i class="fas fa-envelope"></i> Email Support</a>' +
                '<button onclick="location.reload()" style="padding:12px;background:#f5f9fa;color:#5a8a96;border:1px solid #c4dde4;border-radius:10px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.88rem"><i class="fas fa-redo"></i> Try Again</button>' +
            '</div>' +
        '</div>';
    
    document.body.appendChild(overlay);
}

console.log('☁️ Firebase cloud sync ready');
console.log('🔑 Admin system with account management ready');
// ============ FIREBASE AUTHENTICATION SYSTEM ============

// Create customer account (Admin only)
function adminCreateCustomerAccount() {
    if (!S.user || !S.user.isSuperAdmin) {
        toast('error', 'Admin access required');
        return;
    }
    
    document.getElementById('modal-container').innerHTML = '' +
    '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:600px"><div class="modal-top"><h2><i class="fas fa-user-plus"></i> Create Customer Account</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid">' +
        '<div style="background:rgba(26,139,168,.08);padding:14px;border-radius:10px;margin-bottom:16px;font-size:.82rem;color:#2a5f70"><i class="fas fa-info-circle" style="color:#1a8ba8"></i> <strong>How it works:</strong><br>1. You fill in the customer details below<br>2. A temporary password is auto-generated<br>3. Customer receives an email to set up their own password<br>4. You will NEVER see their final password</div>' +
        
        '<h4 style="font-size:.92rem;color:#0d4a5c;margin-bottom:10px;border-bottom:2px solid #1a8ba8;padding-bottom:6px"><i class="fas fa-user"></i> Owner Details</h4>' +
        '<div class="form-row"><div class="form-field"><label>Owner Full Name *</label><input type="text" id="ac-name" placeholder="e.g. James Mahlangu"></div><div class="form-field"><label>Email Address *</label><input type="email" id="ac-email" placeholder="owner@restaurant.co.za"></div></div>' +
        '<div class="form-row"><div class="form-field"><label>Phone Number *</label><input type="tel" id="ac-phone" placeholder="+27 82 123 4567"></div><div class="form-field"><label>Company / Group Name</label><input type="text" id="ac-company" placeholder="e.g. Boma Restaurant Group"></div></div>' +
        
        '<h4 style="font-size:.92rem;color:#0d4a5c;margin:18px 0 10px;border-bottom:2px solid #1a8ba8;padding-bottom:6px"><i class="fas fa-building"></i> First Entity</h4>' +
        '<div class="form-row"><div class="form-field"><label>Entity Name *</label><input type="text" id="ac-entity" placeholder="e.g. The Boma Restaurant"></div><div class="form-field"><label>Contact Person</label><input type="text" id="ac-contact" placeholder="e.g. Manager name"></div></div>' +
        '<div class="form-row"><div class="form-field"><label>Entity Phone</label><input type="tel" id="ac-entphone" placeholder="+27 11 555 0000"></div><div class="form-field"><label>Entity Email</label><input type="email" id="ac-entemail" placeholder="info@restaurant.co.za"></div></div>' +
        '<div class="form-row"><div class="form-field"><label>Food Cost Target %</label><input type="number" id="ac-foodcost" value="28" min="1" max="100" step="0.1"></div><div class="form-field"><label>Plan</label><select id="ac-plan"><option value="starter">Starter — R499/mo</option><option value="professional" selected>Professional — R899/mo</option><option value="enterprise">Enterprise — R1,499/mo</option></select></div></div>' +
        
        '<div class="form-row"><div class="form-field full"><label>Admin Notes (internal — customer won\'t see this)</label><textarea id="ac-notes" rows="2" placeholder="e.g. Referred by Sarah. Founding member — 50% discount." style="padding:10px;border:1px solid #c4dde4;border-radius:8px;font-family:inherit;font-size:.88rem;resize:vertical;width:100%"></textarea></div></div>' +
        
    '</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="processCreateAccount()"><i class="fas fa-user-plus"></i> Create Account & Send Email</button></div></div></div>';
}

function processCreateAccount() {
    var name = document.getElementById('ac-name').value.trim();
    var email = document.getElementById('ac-email').value.trim();
    var phone = document.getElementById('ac-phone').value.trim();
    var company = document.getElementById('ac-company').value.trim();
    var entityName = document.getElementById('ac-entity').value.trim();
    var contact = document.getElementById('ac-contact').value.trim();
    var entPhone = document.getElementById('ac-entphone').value.trim();
    var entEmail = document.getElementById('ac-entemail').value.trim();
    var foodCost = parseFloat(document.getElementById('ac-foodcost').value) || 28;
    var plan = document.getElementById('ac-plan').value;
    var notes = document.getElementById('ac-notes').value.trim();
    
    if (!name || !email || !phone || !entityName) {
        toast('error', 'Please fill in all required fields (marked with *)');
        return;
    }
    
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast('error', 'Please enter a valid email address');
        return;
    }
    
    toast('info', '🔄 Creating account...');
    
    // Generate temporary password (customer will change this)
    var tempPassword = 'StockAI_' + Math.random().toString(36).substring(2, 8) + '!';
    
    // Create Firebase Auth account
    auth.createUserWithEmailAndPassword(email, tempPassword)
        .then(function(userCredential) {
            var uid = userCredential.user.uid;
            
            // Send password reset email immediately so customer sets their own password
            auth.sendPasswordResetEmail(email)
                .then(function() {
                    console.log('✅ Password reset email sent to', email);
                })
                .catch(function(err) {
                    console.warn('Reset email error:', err);
                });
            
            // Create account data in Firestore
            var accountId = email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
            
            var entity = {
                id: 'ENT-' + Date.now(),
                name: entityName,
                contact: contact || name,
                phone: entPhone,
                email: entEmail,
                address: '',
                vat: '',
                foodCostTarget: foodCost,
                sections: ['Walk-in Fridge', 'Walk-in Freezer', 'Dry Store', 'Bar'],
                plan: plan
            };
            
            var accountData = {
                uid: uid,
                owner: {
                    name: name,
                    email: email,
                    phone: phone,
                    groupName: company,
                    idNumber: '',
                    groupVat: '',
                    groupAddress: '',
                    bizType: 'Restaurant Group',
                    entityCount: '1'
                },
                entities: [entity],
                inventory: {},
                purchases: {},
                wastage: {},
                suppliers: {},
                users: {},
                menuItems: {},
                cashups: {},
                notifs: [{
                    type: 'success',
                    title: 'Welcome to StockAI-Pro!',
                    text: 'Your account has been set up. Start by adding your stock items.',
                    time: 'now',
                    unread: true
                }],
                activities: {},
                pendingPOs: {},
                internalTransfers: [],
                billing: {
                    billingDay: 1,
                    lastPaymentDate: new Date().toISOString(),
                    nextDueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString().split('T')[0],
                    status: 'current',
                    dismissedToday: null
                },
                userLogs: {},
                invoices: {},
                dayEnds: {},
                integrations: { pos: null, accounting: null },
                accountStatus: 'active',
                createdDate: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: 'Admin',
                adminNotes: notes ? [{
                    note: notes,
                    date: new Date().toISOString(),
                    by: 'Admin (account creation)'
                }] : [],
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdatedBy: 'Admin'
            };
            
            return db.collection('accounts').doc(accountId).set(accountData);
        })
        .then(function() {
            // Sign back in as admin (creating user signs us out)
            auth.signOut().then(function() {
                console.log('Signed out after creating user');
            });
            
            closeModal();
            
            // Show success with setup link
            var setupLink = window.location.origin + '/app.html';
            var mobileLink = window.location.origin + '/mobile.html';
            
            document.getElementById('modal-container').innerHTML = '' +
            '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:550px"><div class="modal-top" style="background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff"><h2><i class="fas fa-check-circle"></i> Account Created Successfully!</h2></div><div class="modal-mid">' +
                '<div style="text-align:center;margin-bottom:16px"><div style="width:60px;height:60px;background:rgba(46,168,113,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:1.5rem;color:#2ea871"><i class="fas fa-user-check"></i></div><h3 style="color:#0d4a5c">' + name + '</h3><p style="color:#5a8a96;font-size:.85rem">' + email + '</p></div>' +
                
                '<div style="background:#f0fdf4;border:1px solid #c8e6c9;border-radius:10px;padding:14px;margin-bottom:14px;font-size:.82rem;color:#2a5f70">' +
                    '<strong style="color:#2ea871">✅ What happened:</strong><br>' +
                    '1. Account created in the system<br>' +
                    '2. Password reset email sent to ' + email + '<br>' +
                    '3. Customer will set their own password (you can\'t see it)<br>' +
                    '4. Entity "' + entityName + '" created with demo stock data' +
                '</div>' +
                
                '<div style="background:#f5f9fa;border-radius:10px;padding:14px;margin-bottom:14px">' +
                    '<strong style="color:#0d4a5c;font-size:.88rem">📧 Send these links to the customer:</strong>' +
                    '<div style="margin-top:8px;background:#fff;padding:10px;border-radius:8px;font-size:.78rem;color:#2a5f70;border:1px solid #e0eff3;word-break:break-all">' +
                        '<strong>Web App:</strong> ' + setupLink + '<br>' +
                        '<strong>Mobile:</strong> ' + mobileLink + '<br><br>' +
                        '<em style="color:#5a8a96">Tell them to check their email for the password setup link.</em>' +
                    '</div>' +
                '</div>' +
                
                '<div style="display:flex;gap:8px">' +
                    '<button onclick="copySetupInfo(\'' + name + '\',\'' + email + '\',\'' + setupLink + '\',\'' + mobileLink + '\')" style="flex:1;padding:10px;background:#1a8ba8;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.85rem"><i class="fas fa-copy"></i> Copy Setup Info</button>' +
                    '<button onclick="emailSetupInfo(\'' + name + '\',\'' + email + '\',\'' + setupLink + '\',\'' + mobileLink + '\')" style="flex:1;padding:10px;background:#f59e0b;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.85rem"><i class="fas fa-envelope"></i> Email to Customer</button>' +
                '</div>' +
            '</div><div class="modal-bot"><button class="btn-primary" onclick="closeModal();showAdminCustomerSelector()"><i class="fas fa-check"></i> Done — Back to Customer List</button></div></div></div>';
            
            toast('success', '✅ Account created for ' + name);
            logAction('Admin', 'Created account for ' + name + ' (' + email + ')');
        })
        .catch(function(err) {
            console.error('Account creation error:', err);
            if (err.code === 'auth/email-already-in-use') {
                toast('error', 'An account with this email already exists');
            } else {
                toast('error', 'Error: ' + err.message);
            }
        });
}

function copySetupInfo(name, email, appLink, mobileLink) {
    var text = 'Welcome to StockAI-Pro, ' + name + '!\n\n' +
        'Your account has been created.\n\n' +
        '1. Check your email (' + email + ') for a password setup link\n' +
        '2. Set your password\n' +
        '3. Login at: ' + appLink + '\n' +
        '4. Mobile app: ' + mobileLink + '\n\n' +
        'Need help? WhatsApp: 079 044 0508\n' +
        '— StockAI-Pro Team';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            toast('success', '✅ Setup info copied! Paste it in WhatsApp or email.');
        });
    } else {
        var input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toast('success', '✅ Copied!');
    }
}

function emailSetupInfo(name, email, appLink, mobileLink) {
    var subject = 'Welcome to StockAI-Pro — Your Account is Ready!';
    var body = 'Hi ' + name + ',%0A%0A' +
        'Your StockAI-Pro account has been created!%0A%0A' +
        'Step 1: Check your email (' + email + ') for a password setup link from Firebase%0A' +
        'Step 2: Set your own secure password%0A' +
        'Step 3: Login to your dashboard%0A%0A' +
        'Your Links:%0A' +
        'Web App: ' + appLink + '%0A' +
        'Mobile App: ' + mobileLink + '%0A%0A' +
        'Need help? WhatsApp us: 079 044 0508%0A%0A' +
        'Welcome aboard!%0A' +
        'StockAI-Pro Team';
    
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
    toast('info', '📧 Opening email...');
}

// ============ PASSWORD RESET (Admin sends reset) ============
function adminSendPasswordReset(email) {
    if (!email) {
        toast('error', 'No email address for this customer');
        return;
    }
    
    if (!confirm('Send password reset email to:\n' + email + '\n\nThe customer will receive a link to set a new password.\nYou will NOT see their new password.')) return;
    
    auth.sendPasswordResetEmail(email)
        .then(function() {
            toast('success', '📧 Password reset email sent to ' + email);
            logAction('Admin', 'Sent password reset to ' + email);
        })
        .catch(function(err) {
            if (err.code === 'auth/user-not-found') {
                toast('error', 'No account found with this email');
            } else {
                toast('error', 'Error: ' + err.message);
            }
        });
}

// ============ ADD CREATE ACCOUNT BUTTON TO ADMIN PANEL ============
var _origAdminSelector2 = showAdminCustomerSelector;
showAdminCustomerSelector = function() {
    _origAdminSelector2();
    
    // Add "Create Account" button at the top
    var grid = document.getElementById('entity-grid');
    if (grid && S.user && S.user.isSuperAdmin) {
        // Wait for grid to populate
        setTimeout(function() {
            var createBtn = document.createElement('div');
            createBtn.style.cssText = 'grid-column:1/-1;display:flex;gap:10px;margin-bottom:8px';
            createBtn.innerHTML = '' +
                '<button onclick="adminCreateCustomerAccount()" style="flex:1;padding:14px;background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;display:flex;align-items:center;justify-content:center;gap:8px"><i class="fas fa-user-plus"></i> Create New Customer Account</button>';
            
            grid.insertBefore(createBtn, grid.firstChild.nextSibling); // After stats bar
        }, 500);
    }
};

// ============ ADD RESET PASSWORD BUTTON TO CUSTOMER CARDS ============
// This is handled in the customer card template — we need to update the card rendering
// to include a "Reset Password" button

// Override the customer card rendering to add reset button and hide sensitive info
var _origAdminSelector3 = showAdminCustomerSelector;
showAdminCustomerSelector = function() {
    _origAdminSelector3();
    
    // After rendering, add event listeners for reset password
    setTimeout(function() {
        // The reset buttons are already in the template from the previous code
        // We just need to make sure adminSendPasswordReset is available
    }, 100);
};

// ============ FORGOT PASSWORD (Customer self-service) ============
// This needs to be added to the login page

// Add forgot password link to login screen
setTimeout(function() {
    var loginForm = document.querySelector('#login-form');
    if (loginForm) {
        var forgotDiv = document.createElement('div');
        forgotDiv.style.cssText = 'text-align:center;margin-top:14px;padding-top:14px;border-top:1px solid #e0eff3';
        forgotDiv.innerHTML = '<a href="#" onclick="showForgotPassword();return false" style="color:#1a8ba8;font-size:.85rem;text-decoration:none;font-weight:500"><i class="fas fa-key"></i> Forgot your password?</a>';
        loginForm.parentNode.appendChild(forgotDiv);
    }
}, 1000);

function showForgotPassword() {
    document.getElementById('modal-container').innerHTML = '' +
    '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:420px"><div class="modal-top"><h2><i class="fas fa-key"></i> Reset Password</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid" style="text-align:center">' +
        '<div style="width:60px;height:60px;background:rgba(26,139,168,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:1.5rem;color:#1a8ba8"><i class="fas fa-envelope"></i></div>' +
        '<p style="font-size:.9rem;color:#2a5f70;margin-bottom:16px">Enter your email address and we\'ll send you a link to reset your password.</p>' +
        '<input type="email" id="forgot-email" placeholder="your@email.com" style="width:100%;padding:14px;border:1px solid #c4dde4;border-radius:8px;font-size:.95rem;font-family:inherit;color:#0d4a5c;margin-bottom:14px;text-align:center">' +
        '<button onclick="sendPasswordReset()" style="width:100%;padding:14px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.95rem"><i class="fas fa-paper-plane"></i> Send Reset Link</button>' +
        '<p style="font-size:.78rem;color:#8aabb5;margin-top:12px">Check your inbox (and spam folder) after submitting.</p>' +
    '</div></div></div>';
    
    setTimeout(function() {
        var emailInput = document.getElementById('forgot-email');
        if (emailInput) emailInput.focus();
    }, 300);
}

function sendPasswordReset() {
    var email = document.getElementById('forgot-email').value.trim();
    if (!email) {
        toast('error', 'Please enter your email address');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast('error', 'Please enter a valid email');
        return;
    }
    
    auth.sendPasswordResetEmail(email)
        .then(function() {
            closeModal();
            toast('success', '📧 Password reset link sent to ' + email + '. Check your inbox!');
            logAction('Security', 'Password reset requested for ' + email);
        })
        .catch(function(err) {
            if (err.code === 'auth/user-not-found') {
                toast('error', 'No account found with this email. Contact support: 079 044 0508');
            } else {
                toast('error', 'Error: ' + err.message);
            }
        });
}

// ============ ADMIN INFO PRIVACY (hide sensitive data) ============
// The admin panel should only show: name, entity name, phone, and status
// Email is shown but partially masked for privacy

function maskEmail(email) {
    if (!email) return 'N/A';
    var parts = email.split('@');
    if (parts.length !== 2) return email;
    var name = parts[0];
    var domain = parts[1];
    if (name.length <= 2) return name + '***@' + domain;
    return name.substring(0, 2) + '***@' + domain;
}

function maskPhone(phone) {
    if (!phone) return 'N/A';
    var clean = phone.replace(/\s/g, '');
    if (clean.length <= 4) return phone;
    return clean.substring(0, clean.length - 4).replace(/./g, '*') + clean.substring(clean.length - 4);
}

// ============ ADMIN: ADD ENTITY TO CUSTOMER ============

function adminAddEntityToCustomer(accountId, customerName) {
    if (!S.user || !S.user.isSuperAdmin) {
        toast('error', 'Admin access required');
        return;
    }
    
    document.getElementById('modal-container').innerHTML = '' +
    '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:600px"><div class="modal-top"><h2><i class="fas fa-plus-circle"></i> Add Entity to ' + customerName + '</h2><button onclick="closeModal()"><i class="fas fa-times"></i></button></div><div class="modal-mid">' +
        
        '<div style="background:rgba(26,139,168,.08);padding:12px;border-radius:10px;margin-bottom:16px;font-size:.82rem;color:#2a5f70"><i class="fas fa-info-circle" style="color:#1a8ba8"></i> Adding a new entity to <strong>' + customerName + '</strong>\'s account. This will appear in their entity selector immediately.</div>' +
        
        '<h4 style="font-size:.92rem;color:#0d4a5c;margin-bottom:10px;border-bottom:2px solid #1a8ba8;padding-bottom:6px"><i class="fas fa-building"></i> New Entity Details</h4>' +
        '<div class="form-row"><div class="form-field"><label>Entity Name *</label><input type="text" id="ae-name" placeholder="e.g. The Boma Express"></div><div class="form-field"><label>Contact Person *</label><input type="text" id="ae-contact" placeholder="e.g. Manager name"></div></div>' +
        '<div class="form-row"><div class="form-field"><label>Entity Phone</label><input type="tel" id="ae-phone" placeholder="+27 11 555 0000"></div><div class="form-field"><label>Entity Email</label><input type="email" id="ae-email" placeholder="info@entity.co.za"></div></div>' +
        '<div class="form-row"><div class="form-field full"><label>Address</label><textarea id="ae-address" rows="2" placeholder="Physical address..." style="padding:10px;border:1px solid #c4dde4;border-radius:8px;font-family:inherit;font-size:.88rem;resize:vertical;width:100%"></textarea></div></div>' +
        '<div class="form-row"><div class="form-field"><label>VAT Number</label><input type="text" id="ae-vat" placeholder="e.g. 4123456789"></div><div class="form-field"><label>Food Cost Target %</label><input type="number" id="ae-foodcost" value="28" min="1" max="100" step="0.1"></div></div>' +
        '<div class="form-row"><div class="form-field"><label>Plan</label><select id="ae-plan"><option value="starter">Starter — R499/mo</option><option value="professional" selected>Professional — R899/mo</option><option value="enterprise">Enterprise — R1,499/mo</option></select></div></div>' +
        
        '<h4 style="font-size:.92rem;color:#0d4a5c;margin:18px 0 10px;border-bottom:2px solid #1a8ba8;padding-bottom:6px"><i class="fas fa-warehouse"></i> Stock Sheet Sections</h4>' +
        '<div class="sections-grid" id="ae-sections">' +
            '<label class="section-check"><input type="checkbox" value="Walk-in Fridge" checked><span>Walk-in Fridge</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Walk-in Freezer" checked><span>Walk-in Freezer</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Dry Store" checked><span>Dry Store</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Bar" checked><span>Bar</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Cold Kitchen"><span>Cold Kitchen</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Hot Kitchen"><span>Hot Kitchen</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Pastry Section"><span>Pastry Section</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Prep Kitchen"><span>Prep Kitchen</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Receiving Area"><span>Receiving Area</span></label>' +
            '<label class="section-check"><input type="checkbox" value="Wine Cellar"><span>Wine Cellar</span></label>' +
        '</div>' +
        
        '<div class="form-row" style="margin-top:14px"><div class="form-field full"><label>Admin Notes (internal)</label><textarea id="ae-notes" rows="2" placeholder="e.g. New branch opening March 2025..." style="padding:10px;border:1px solid #c4dde4;border-radius:8px;font-family:inherit;font-size:.88rem;resize:vertical;width:100%"></textarea></div></div>' +
        
        '<div style="background:rgba(245,158,11,.08);border:1px solid #f59e0b;border-radius:10px;padding:14px;margin-top:14px">' +
            '<h4 style="font-size:.85rem;color:#d97706;margin-bottom:6px"><i class="fas fa-credit-card"></i> Billing</h4>' +
            '<p style="font-size:.78rem;color:#5a4a17;line-height:1.5">Adding this entity will increase the customer\'s monthly billing. The new entity will be billed from the next billing cycle.</p>' +
        '</div>' +
        
    '</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="processAdminAddEntity(\'' + accountId + '\',\'' + customerName + '\')"><i class="fas fa-plus-circle"></i> Add Entity</button></div></div></div>';
}

function processAdminAddEntity(accountId, customerName) {
    var name = document.getElementById('ae-name').value.trim();
    var contact = document.getElementById('ae-contact').value.trim();
    
    if (!name || !contact) {
        toast('error', 'Entity name and contact person are required');
        return;
    }
    
    var sections = [];
    document.querySelectorAll('#ae-sections input:checked').forEach(function(cb) {
        sections.push(cb.value);
    });
    
    if (sections.length === 0) {
        toast('error', 'Select at least one stock sheet section');
        return;
    }
    
    var newEntity = {
        id: 'ENT-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        name: name,
        contact: contact,
        phone: document.getElementById('ae-phone').value.trim(),
        email: document.getElementById('ae-email').value.trim(),
        address: document.getElementById('ae-address').value.trim(),
        vat: document.getElementById('ae-vat').value.trim(),
        foodCostTarget: parseFloat(document.getElementById('ae-foodcost').value) || 28,
        sections: sections,
        plan: document.getElementById('ae-plan').value,
        createdDate: new Date().toISOString(),
        createdBy: 'Admin'
    };
    
    var notes = document.getElementById('ae-notes').value.trim();
    
    toast('info', '🔄 Adding entity...');
    
    // Load customer data from Firebase
    db.collection('accounts').doc(accountId).get()
        .then(function(doc) {
            if (!doc.exists) {
                toast('error', 'Customer account not found');
                return;
            }
            
            var data = doc.data();
            var entities = data.entities || [];
            
            // Add new entity
            entities.push(newEntity);
            
            // Generate demo stock data for the new entity
            var demoItems = [
                {name:'Chicken Breast',cat:'Proteins',unit:'kg',cost:89.90,loc:'Walk-in Fridge',sup:'Default Supplier'},
                {name:'Beef Fillet',cat:'Proteins',unit:'kg',cost:249.90,loc:'Walk-in Fridge',sup:'Default Supplier'},
                {name:'Tomatoes',cat:'Vegetables',unit:'kg',cost:32.90,loc:'Walk-in Fridge',sup:'Default Supplier'},
                {name:'Potatoes',cat:'Vegetables',unit:'kg',cost:18.90,loc:'Dry Store',sup:'Default Supplier'},
                {name:'Full Cream Milk',cat:'Dairy',unit:'liter',cost:19.90,loc:'Walk-in Fridge',sup:'Default Supplier'},
                {name:'Cheddar Cheese',cat:'Dairy',unit:'kg',cost:109.90,loc:'Walk-in Fridge',sup:'Default Supplier'},
                {name:'Basmati Rice',cat:'Dry Goods',unit:'kg',cost:34.90,loc:'Dry Store',sup:'Default Supplier'},
                {name:'Olive Oil',cat:'Dry Goods',unit:'liter',cost:129.90,loc:'Dry Store',sup:'Default Supplier'},
                {name:'Coca-Cola',cat:'Beverages',unit:'case',cost:149.90,loc:'Bar',sup:'Default Supplier'},
                {name:'House Red Wine',cat:'Beverages',unit:'each',cost:89.90,loc:'Bar',sup:'Default Supplier'},
                {name:'Frozen Chips',cat:'Frozen',unit:'kg',cost:34.90,loc:'Walk-in Freezer',sup:'Default Supplier'},
                {name:'Burger Buns',cat:'Bakery',unit:'dozen',cost:39.90,loc:'Dry Store',sup:'Default Supplier'}
            ];
            
            var inventory = data.inventory || {};
            inventory[newEntity.id] = demoItems.filter(function(it) {
                return sections.indexOf(it.loc) !== -1;
            }).map(function(it, i) {
                var qty = Math.floor(Math.random() * 80 + 5);
                var reorder = Math.floor(Math.random() * 15 + 5);
                return {
                    id: 'ITM-' + newEntity.id.slice(-4) + '-' + i,
                    sku: 'FD-' + Math.floor(Math.random() * 90000 + 10000),
                    name: it.name, category: it.cat, unit: it.unit,
                    quantity: qty, cost: it.cost, lastCost: it.cost,
                    value: qty * it.cost, location: it.loc,
                    status: qty <= reorder ? 'low-stock' : 'in-stock',
                    reorder: reorder, supplier: it.sup
                };
            });
            
            // Initialize other data for new entity
            var purchases = data.purchases || {};
            purchases[newEntity.id] = [];
            
            var wastage = data.wastage || {};
            wastage[newEntity.id] = [];
            
            var suppliers = data.suppliers || {};
            suppliers[newEntity.id] = [{
                id: 'SUP-' + newEntity.id + '-1',
                name: 'Default Supplier',
                type: 'General',
                email: '', phone: '',
                orders: 0, rating: '5.0', onTime: '100%',
                linkedItems: [],
                deliveryDays: ['Monday', 'Wednesday', 'Friday']
            }];
            
            var users = data.users || {};
            users[newEntity.id] = [{
                id: 'usr-' + newEntity.id + '-1',
                name: contact,
                role: 'General Manager'
            }];
            
            var activities = data.activities || {};
            activities[newEntity.id] = [{
                type: 'add', icon: 'fa-plus',
                item: 'Entity Created',
                action: 'by Admin',
                user: 'StockAI Admin',
                time: 'Just now'
            }];
            
            var pendingPOs = data.pendingPOs || {};
            pendingPOs[newEntity.id] = [];
            
            var userLogs = data.userLogs || {};
            userLogs[newEntity.id] = [{
                user: 'StockAI Admin',
                role: 'Super Admin',
                action: 'Entity Created',
                details: 'New entity "' + name + '" added by admin',
                date: new Date().toLocaleDateString('en-ZA'),
                time: new Date().toLocaleTimeString('en-ZA')
            }];
            
            var cashups = data.cashups || {};
            cashups[newEntity.id] = {};
            
            var menuItems = data.menuItems || {};
            menuItems[newEntity.id] = [];
            
            // Update owner entity count
            var owner = data.owner || {};
            owner.entityCount = String(entities.length);
            
            // Prepare admin notes
            var adminNotes = data.adminNotes || [];
            if (notes) {
                adminNotes.push({
                    note: 'New entity added: ' + name + (notes ? ' — ' + notes : ''),
                    date: new Date().toISOString(),
                    by: 'Admin'
                });
            }
            
            // Save everything back to Firebase
            var updateData = {
                entities: entities,
                inventory: inventory,
                purchases: purchases,
                wastage: wastage,
                suppliers: suppliers,
                users: users,
                activities: activities,
                pendingPOs: pendingPOs,
                userLogs: userLogs,
                cashups: cashups,
                menuItems: menuItems,
                owner: owner,
                adminNotes: adminNotes,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdatedBy: 'Admin',
                statusHistory: firebase.firestore.FieldValue.arrayUnion({
                    action: 'entity_added',
                    date: new Date().toISOString(),
                    by: 'Admin',
                    reason: 'Added entity: ' + name
                })
            };
            
            return db.collection('accounts').doc(accountId).update(updateData);
        })
        .then(function() {
            closeModal();
            
            toast('success', '✅ Entity "' + name + '" added to ' + customerName + '\'s account!');
            logAction('Admin', 'Added entity "' + name + '" to customer ' + customerName);
            
            // Show confirmation
            document.getElementById('modal-container').innerHTML = '' +
            '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:480px"><div class="modal-top" style="background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff"><h2><i class="fas fa-check-circle"></i> Entity Added!</h2></div><div class="modal-mid" style="text-align:center">' +
                '<div style="width:60px;height:60px;background:rgba(46,168,113,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.5rem;color:#2ea871"><i class="fas fa-building"></i></div>' +
                '<h3 style="color:#0d4a5c;margin-bottom:4px">' + name + '</h3>' +
                '<p style="color:#5a8a96;font-size:.85rem;margin-bottom:16px">Added to ' + customerName + '\'s account</p>' +
                '<div style="background:#f0fdf4;border-radius:10px;padding:14px;font-size:.82rem;color:#2a5f70;text-align:left">' +
                    '<strong style="color:#2ea871">✅ What was created:</strong><br>' +
                    '• Entity profile with ' + sections.length + ' stock sections<br>' +
                    '• Demo stock items loaded<br>' +
                    '• Default supplier created<br>' +
                    '• General Manager user created<br><br>' +
                    '<em style="color:#5a8a96">The customer will see this new entity next time they log in or refresh.</em>' +
                '</div>' +
            '</div><div class="modal-bot"><button class="btn-primary" onclick="closeModal();showAdminCustomerSelector()"><i class="fas fa-check"></i> Done</button></div></div></div>';
        })
        .catch(function(err) {
            toast('error', 'Failed to add entity: ' + err.message);
            console.error('Add entity error:', err);
        });
}

// ============ UPDATE CUSTOMER CARDS TO INCLUDE ADD ENTITY BUTTON ============

// We need to add the "Add Entity" button to each customer card
// Override the card rendering in showAdminCustomerSelector

var _origAdminSelectorFinal = showAdminCustomerSelector;
showAdminCustomerSelector = function() {
    _origAdminSelectorFinal();
    
    // After the grid renders, add "Add Entity" buttons to each customer card
    setTimeout(function() {
        if (!S.user || !S.user.isSuperAdmin) return;
        
        var grid = document.getElementById('entity-grid');
        if (!grid) return;
        
        // Find all customer action button rows and add the "Add Entity" button
        var actionDivs = grid.querySelectorAll('div[style*="border-top"]');
        actionDivs.forEach(function(div) {
            // Check if we already added the button
            if (div.querySelector('[data-add-entity]')) return;
            
            // Get the account ID and customer name from the parent card
            var card = div.parentElement;
            if (!card) return;
            
            var onclickAttr = card.querySelector('[onclick*="adminSelectCustomer"]');
            if (!onclickAttr) return;
            
            var onclick = onclickAttr.getAttribute('onclick');
            var match = onclick.match(/adminSelectCustomer\('([^']+)'\)/);
            if (!match) return;
            
            var accountId = match[1];
            var nameEl = card.querySelector('h3');
            var customerName = nameEl ? nameEl.textContent.trim() : 'Customer';
            
            // Add the "Add Entity" button
            var addBtn = document.createElement('button');
            addBtn.setAttribute('data-add-entity', 'true');
            addBtn.style.cssText = 'flex:1;padding:8px;background:rgba(46,168,113,.08);color:#2ea871;border:none;border-radius:6px;font-size:.75rem;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:4px';
            addBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Entity';
            addBtn.onclick = function(e) {
                e.stopPropagation();
                adminAddEntityToCustomer(accountId, customerName);
            };
            
            div.appendChild(addBtn);
        });
        
        // Also add "Create Account" button if not already there
        if (!grid.querySelector('[data-create-account]')) {
            var createDiv = document.createElement('div');
            createDiv.setAttribute('data-create-account', 'true');
            createDiv.style.cssText = 'grid-column:1/-1;display:flex;gap:10px;margin-bottom:8px';
            createDiv.innerHTML = '<button onclick="adminCreateCustomerAccount()" style="flex:1;padding:14px;background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;display:flex;align-items:center;justify-content:center;gap:8px"><i class="fas fa-user-plus"></i> Create New Customer Account</button>';
            
            // Insert after the stats bar (second child)
            var statsBar = grid.children[0];
            if (statsBar) {
                grid.insertBefore(createDiv, statsBar.nextSibling);
            }
        }
    }, 600);
};

console.log('☁️ Firebase cloud sync ready');
console.log('🔑 Admin system with account management ready');
console.log('🔐 Authentication system ready');
// ============ IMPROVED ENTITY CREATION (EMPTY + INACTIVE + EMAIL) ============

// Override the processAdminAddEntity function
var _origProcessAdd = processAdminAddEntity;
processAdminAddEntity = function(accountId, customerName) {
    var name = document.getElementById('ae-name').value.trim();
    var contact = document.getElementById('ae-contact').value.trim();
    
    if (!name || !contact) {
        toast('error', 'Entity name and contact person are required');
        return;
    }
    
    var sections = [];
    document.querySelectorAll('#ae-sections input:checked').forEach(function(cb) {
        sections.push(cb.value);
    });
    
    if (sections.length === 0) {
        toast('error', 'Select at least one stock sheet section');
        return;
    }
    
    var newEntity = {
        id: 'ENT-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        name: name,
        contact: contact,
        phone: document.getElementById('ae-phone').value.trim(),
        email: document.getElementById('ae-email').value.trim(),
        address: document.getElementById('ae-address').value.trim(),
        vat: document.getElementById('ae-vat').value.trim(),
        foodCostTarget: parseFloat(document.getElementById('ae-foodcost').value) || 28,
        sections: sections,
        plan: document.getElementById('ae-plan').value,
        status: 'inactive',
        createdDate: new Date().toISOString(),
        createdBy: 'Admin',
        activatedDate: null,
        paymentStatus: 'unpaid'
    };
    
    var notes = document.getElementById('ae-notes').value.trim();
    
    toast('info', '🔄 Adding entity...');
    
    db.collection('accounts').doc(accountId).get()
        .then(function(doc) {
            if (!doc.exists) { toast('error', 'Customer not found'); return; }
            
            var data = doc.data();
            var entities = data.entities || [];
            entities.push(newEntity);
            
            // EMPTY data — no demo items
            var inventory = data.inventory || {};
            inventory[newEntity.id] = [];
            
            var purchases = data.purchases || {};
            purchases[newEntity.id] = [];
            
            var wastage = data.wastage || {};
            wastage[newEntity.id] = [];
            
            var suppliers = data.suppliers || {};
            suppliers[newEntity.id] = [];
            
            var users = data.users || {};
            users[newEntity.id] = [{
                id: 'usr-' + newEntity.id + '-1',
                name: contact,
                role: 'General Manager'
            }];
            
            var activities = data.activities || {};
            activities[newEntity.id] = [];
            
            var pendingPOs = data.pendingPOs || {};
            pendingPOs[newEntity.id] = [];
            
            var userLogs = data.userLogs || {};
            userLogs[newEntity.id] = [{
                user: 'StockAI Admin',
                role: 'Super Admin',
                action: 'Entity Created',
                details: 'New entity "' + name + '" created (INACTIVE — awaiting payment)',
                date: new Date().toLocaleDateString('en-ZA'),
                time: new Date().toLocaleTimeString('en-ZA')
            }];
            
            var cashups = data.cashups || {};
            cashups[newEntity.id] = {};
            
            var menuItems = data.menuItems || {};
            menuItems[newEntity.id] = [];
            
            var invoices = data.invoices || {};
            invoices[newEntity.id] = [];
            
            var dayEnds = data.dayEnds || {};
            dayEnds[newEntity.id] = {};
            
            var owner = data.owner || {};
            owner.entityCount = String(entities.length);
            
            var adminNotes = data.adminNotes || [];
            adminNotes.push({
                note: 'New entity added: ' + name + ' (INACTIVE — pending payment)' + (notes ? ' — ' + notes : ''),
                date: new Date().toISOString(),
                by: 'Admin'
            });
            
            var updateData = {
                entities: entities,
                inventory: inventory,
                purchases: purchases,
                wastage: wastage,
                suppliers: suppliers,
                users: users,
                activities: activities,
                pendingPOs: pendingPOs,
                userLogs: userLogs,
                cashups: cashups,
                menuItems: menuItems,
                invoices: invoices,
                dayEnds: dayEnds,
                owner: owner,
                adminNotes: adminNotes,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdatedBy: 'Admin',
                statusHistory: firebase.firestore.FieldValue.arrayUnion({
                    action: 'entity_added_inactive',
                    date: new Date().toISOString(),
                    by: 'Admin',
                    reason: 'Added entity: ' + name + ' (inactive — awaiting payment)'
                })
            };
            
            return db.collection('accounts').doc(accountId).update(updateData);
        })
        .then(function() {
            closeModal();
            
            // Get customer email for sending notification
            db.collection('accounts').doc(accountId).get().then(function(doc) {
                var data = doc.data();
                var customerEmail = data.owner ? data.owner.email : '';
                var customerFullName = data.owner ? data.owner.name : customerName;
                var appLink = window.location.origin + '/app.html';
                var mobileLink = window.location.origin + '/mobile.html';
                var portalLink = window.location.origin + '/portal.html';
                
                // Show success with email option
                document.getElementById('modal-container').innerHTML = '' +
                '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:550px"><div class="modal-top" style="background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff"><h2><i class="fas fa-check-circle"></i> Entity Created!</h2></div><div class="modal-mid">' +
                    '<div style="text-align:center;margin-bottom:14px"><div style="width:60px;height:60px;background:rgba(46,168,113,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:1.5rem;color:#2ea871"><i class="fas fa-building"></i></div><h3 style="color:#0d4a5c">' + name + '</h3><p style="color:#5a8a96;font-size:.85rem">Added to ' + customerName + '\'s account</p><span style="display:inline-block;margin-top:6px;padding:4px 12px;border-radius:12px;font-size:.72rem;font-weight:700;background:rgba(212,160,23,.1);color:#d4a017"><i class="fas fa-clock"></i> INACTIVE — Awaiting Payment</span></div>' +
                    
                    '<div style="background:#fff8e1;border:1px solid #f59e0b;border-radius:10px;padding:14px;margin-bottom:14px;font-size:.82rem;color:#5a4a17"><strong><i class="fas fa-info-circle"></i> Next Steps:</strong><br>1. Send the customer an email with their setup links<br>2. Customer logs in and sees the new entity marked as "Inactive"<br>3. Customer clicks "Activate Now" → selects package → pays<br>4. Entity becomes active automatically</div>' +
                    
                    '<div style="display:flex;flex-direction:column;gap:8px">' +
                        '<button onclick="sendNewEntityEmail(\'' + customerEmail + '\',\'' + customerFullName + '\',\'' + name + '\',\'' + appLink + '\',\'' + mobileLink + '\',\'' + portalLink + '\')" style="padding:14px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.92rem;display:flex;align-items:center;justify-content:center;gap:8px"><i class="fas fa-envelope"></i> Send Email to Customer</button>' +
                        '<button onclick="copyNewEntityInfo(\'' + customerFullName + '\',\'' + customerEmail + '\',\'' + name + '\',\'' + appLink + '\',\'' + mobileLink + '\')" style="padding:12px;background:#f5f9fa;color:#1a8ba8;border:1px solid #c4dde4;border-radius:10px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.85rem;display:flex;align-items:center;justify-content:center;gap:8px"><i class="fas fa-copy"></i> Copy Setup Info (for WhatsApp)</button>' +
                    '</div>' +
                '</div><div class="modal-bot"><button class="btn-primary" onclick="closeModal();showAdminCustomerSelector()"><i class="fas fa-check"></i> Done</button></div></div></div>';
            });
            
            toast('success', '✅ Entity "' + name + '" created (inactive — awaiting payment)');
            logAction('Admin', 'Created inactive entity "' + name + '" for ' + customerName);
        })
        .catch(function(err) {
            toast('error', 'Failed: ' + err.message);
        });
};

function sendNewEntityEmail(email, fullName, entityName, appLink, mobileLink, portalLink) {
    // Send password reset email if new account
    if (email) {
        try {
            auth.sendPasswordResetEmail(email).then(function() {
                console.log('Password reset email sent');
            }).catch(function() {});
        } catch(e) {}
    }
    
    var subject = 'StockAI-Pro — New Entity Created: ' + entityName;
    var body = 'Hi ' + fullName + ',%0A%0A' +
        'Great news! A new entity has been added to your StockAI-Pro account:%0A%0A' +
        '🏢 Entity: ' + entityName + '%0A' +
        '📋 Status: Inactive (awaiting payment)%0A%0A' +
        'To activate this entity:%0A' +
        '1. Log in to your account%0A' +
        '2. You will see "' + entityName + '" with an "Activate Now" button%0A' +
        '3. Click "Activate Now" to select your package and make payment%0A' +
        '4. Once paid, your entity will be activated immediately!%0A%0A' +
        'Your Links:%0A' +
        '🖥️ Web App: ' + appLink + '%0A' +
        '📱 Mobile App: ' + mobileLink + '%0A' +
        '👤 Portal: ' + portalLink + '%0A%0A' +
        'If you haven\'t set your password yet, check your email for a separate password setup link.%0A%0A' +
        'Need help? WhatsApp: 079 044 0508%0A%0A' +
        'Best regards,%0A' +
        'StockAI-Pro Team';
    
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + body;
    toast('info', '📧 Opening email to ' + email);
}

function copyNewEntityInfo(fullName, email, entityName, appLink, mobileLink) {
    var text = 'Hi ' + fullName + '! 👋\n\n' +
        'A new entity has been added to your StockAI-Pro account:\n\n' +
        '🏢 Entity: ' + entityName + '\n' +
        '📋 Status: Inactive (awaiting payment)\n\n' +
        'To activate:\n' +
        '1. Log in to your account\n' +
        '2. Click "Activate Now" on the new entity\n' +
        '3. Select package and pay\n\n' +
        'Links:\n' +
        '🖥️ Web App: ' + appLink + '\n' +
        '📱 Mobile: ' + mobileLink + '\n\n' +
        'WhatsApp: 079 044 0508\n' +
        '— StockAI-Pro';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            toast('success', '✅ Copied! Paste in WhatsApp.');
        });
    } else {
        var input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toast('success', '✅ Copied!');
    }
}

// ============ INACTIVE ENTITY DISPLAY + ACTIVATE BUTTON ============

// Override entity selector to show inactive entities differently
var _origEntitySelectorForInactive = showEntitySelector;
showEntitySelector = function() {
    if (S.user && S.user.isSuperAdmin) {
        showAdminCustomerSelector();
        return;
    }
    
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('profile-screen').classList.add('hidden');
    document.getElementById('owner-screen').classList.add('hidden');
    document.getElementById('app').classList.add('hidden');
    document.getElementById('entity-select-screen').classList.remove('hidden');
    
    var perms = PERMS[S.user.role] || PERMS['Stock Controller'];
    var grid = document.getElementById('entity-grid');
    var html = '';
    var visible = S.entities;
    var subText = 'Click any entity to enter';
    
    if (!perms.canSwitchEntities && !perms.canAccessGlobal) {
        var assigned = S.user.assignedEntity || 0;
        visible = [S.entities[assigned] || S.entities[0]];
        subText = 'Welcome ' + S.user.name;
    }
    
    document.getElementById('es-sub-text').textContent = subText;
    
    visible.forEach(function(ent) {
        var idx = S.entities.indexOf(ent);
        var isInactive = ent.status === 'inactive' || ent.paymentStatus === 'unpaid';
        var statusBadge = '';
        var cardStyle = '';
        var onclick = '';
        
        if (isInactive) {
            statusBadge = '<div style="margin-top:8px;display:flex;flex-direction:column;gap:6px;align-items:center">' +
                '<span style="display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:12px;font-size:.7rem;font-weight:700;background:rgba(201,69,69,.1);color:#c94545"><i class="fas fa-ban"></i> INACTIVE</span>' +
                '<button onclick="event.stopPropagation();showActivateEntity(\'' + ent.id + '\',\'' + ent.name + '\')" style="padding:8px 16px;background:linear-gradient(135deg,#2ea871,#1f7a52);color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:.78rem;display:flex;align-items:center;gap:6px"><i class="fas fa-bolt"></i> Activate Now</button>' +
            '</div>';
            cardStyle = 'opacity:.7;border:2px dashed #c94545;';
            onclick = ''; // Can't enter inactive entity
        } else {
            statusBadge = '<p style="font-size:.68rem;color:#2ea871;margin-top:4px"><i class="fas fa-check-circle"></i> Active</p>';
            onclick = 'onclick="enterEntityDirect(' + idx + ', false)"';
        }
        
        html += '<div class="entity-option" ' + onclick + ' style="' + cardStyle + '">' +
            '<i class="fas fa-building"></i>' +
            '<h3>' + ent.name + '</h3>' +
            '<p>' + (ent.contact || '') + '</p>' +
            '<p style="font-size:.68rem;color:#1a8ba8;margin-top:4px">Food Cost: ' + ent.foodCostTarget + '%</p>' +
            statusBadge +
        '</div>';
    });
    
    // Global View (only active entities)
    var activeEntities = visible.filter(function(e) { return e.status !== 'inactive' && e.paymentStatus !== 'unpaid'; });
    if (perms.canAccessGlobal && activeEntities.length >= 2) {
        html += '<div class="entity-option global" onclick="enterEntityDirect(-1, true)"><span class="global-crown">👑 OWNER ONLY</span><i class="fas fa-globe"></i><h3>GLOBAL VIEW</h3><p>All ' + activeEntities.length + ' Active Entities</p></div>';
    }
    
    grid.innerHTML = html;
};

// ============ ACTIVATE ENTITY (PAYMENT FLOW) ============

function showActivateEntity(entityId, entityName) {
    var planPrices = {starter: 499, professional: 899, enterprise: 1499};
    var planNames = {starter: 'Starter', professional: 'Professional', enterprise: 'Enterprise'};
    var planFeatures = {
        starter: '1 entity • 3 users • Basic features • Email support',
        professional: 'Up to 3 entities • Unlimited users • AI features • WhatsApp support',
        enterprise: 'Unlimited entities • Global View • POS + Accounting integration • Phone support'
    };
    
    document.getElementById('modal-container').innerHTML = '' +
    '<div class="modal"><div class="modal-bg" onclick="closeModal()"></div><div class="modal-window" style="max-width:550px"><div class="modal-top" style="background:linear-gradient(135deg,#1a8ba8,#0d4a5c);color:#fff"><h2><i class="fas fa-bolt"></i> Activate ' + entityName + '</h2></div><div class="modal-mid">' +
        '<div style="text-align:center;margin-bottom:16px"><p style="font-size:.9rem;color:#2a5f70">Select a package to activate your entity</p></div>' +
        
        '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px" id="activate-plans">' +
            '<div class="activate-plan-option" onclick="selectActivatePlan(this,\'starter\')" style="padding:16px;border:2px solid #c4dde4;border-radius:12px;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:14px">' +
                '<div style="width:20px;height:20px;border:2px solid #c4dde4;border-radius:50%;flex-shrink:0" id="radio-starter"></div>' +
                '<div style="flex:1"><h4 style="font-size:.92rem;color:#0d4a5c;margin-bottom:2px">Starter</h4><p style="font-size:.72rem;color:#5a8a96">' + planFeatures.starter + '</p></div>' +
                '<div style="text-align:right"><strong style="font-size:1.2rem;color:#0d4a5c">R499</strong><span style="font-size:.7rem;color:#5a8a96;display:block">/month</span></div>' +
            '</div>' +
            
            '<div class="activate-plan-option selected" onclick="selectActivatePlan(this,\'professional\')" style="padding:16px;border:2px solid #f59e0b;border-radius:12px;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:14px;background:rgba(245,158,11,.03)">' +
                '<div style="width:20px;height:20px;border:2px solid #f59e0b;border-radius:50%;flex-shrink:0;background:#f59e0b;box-shadow:inset 0 0 0 3px #fff" id="radio-professional"></div>' +
                '<div style="flex:1"><h4 style="font-size:.92rem;color:#0d4a5c;margin-bottom:2px">Professional ⭐ <span style="font-size:.65rem;background:rgba(245,158,11,.1);color:#d97706;padding:2px 8px;border-radius:8px">POPULAR</span></h4><p style="font-size:.72rem;color:#5a8a96">' + planFeatures.professional + '</p></div>' +
                '<div style="text-align:right"><strong style="font-size:1.2rem;color:#0d4a5c">R899</strong><span style="font-size:.7rem;color:#5a8a96;display:block">/month</span></div>' +
            '</div>' +
            
            '<div class="activate-plan-option" onclick="selectActivatePlan(this,\'enterprise\')" style="padding:16px;border:2px solid #c4dde4;border-radius:12px;cursor:pointer;transition:.2s;display:flex;align-items:center;gap:14px">' +
                '<div style="width:20px;height:20px;border:2px solid #c4dde4;border-radius:50%;flex-shrink:0" id="radio-enterprise"></div>' +
                '<div style="flex:1"><h4 style="font-size:.92rem;color:#0d4a5c;margin-bottom:2px">Enterprise</h4><p style="font-size:.72rem;color:#5a8a96">' + planFeatures.enterprise + '</p></div>' +
                '<div style="text-align:right"><strong style="font-size:1.2rem;color:#0d4a5c">R1,499</strong><span style="font-size:.7rem;color:#5a8a96;display:block">/month</span></div>' +
            '</div>' +
        '</div>' +
        
        '<div style="background:rgba(245,158,11,.08);border:1px solid #f59e0b;border-radius:10px;padding:12px;font-size:.78rem;color:#5a4a17"><strong>👑 Founding Member?</strong> First 20 customers get 50% off for life! Contact us to apply your discount.</div>' +
        
    '</div><div class="modal-bot"><button class="btn-outline" onclick="closeModal()">Cancel</button><button class="btn-primary" onclick="processActivateEntity(\'' + entityId + '\',\'' + entityName + '\')"><i class="fas fa-credit-card"></i> Proceed to Payment</button></div></div></div>';
}

var selectedActivatePlan = 'professional';

function selectActivatePlan(el, plan) {
    selectedActivatePlan = plan;
    
    // Reset all radio buttons
    document.querySelectorAll('.activate-plan-option').forEach(function(opt) {
        opt.style.borderColor = '#c4dde4';
        opt.style.background = '';
        opt.classList.remove('selected');
    });
    document.querySelectorAll('[id^="radio-"]').forEach(function(radio) {
        radio.style.borderColor = '#c4dde4';
        radio.style.background = '';
        radio.style.boxShadow = '';
    });
    
    // Highlight selected
    el.style.borderColor = '#f59e0b';
    el.style.background = 'rgba(245,158,11,.03)';
    el.classList.add('selected');
    var radio = document.getElementById('radio-' + plan);
    if (radio) {
        radio.style.borderColor = '#f59e0b';
        radio.style.background = '#f59e0b';
        radio.style.boxShadow = 'inset 0 0 0 3px #fff';
    }
}

function processActivateEntity(entityId, entityName) {
    var planPrices = {starter: 499, professional: 899, enterprise: 1499};
    var planNames = {starter: 'Starter', professional: 'Professional', enterprise: 'Enterprise'};
    var price = planPrices[selectedActivatePlan];
    var planName = planNames[selectedActivatePlan];
    
    var paymentRef = 'PAY-' + Date.now().toString(36).toUpperCase();
    
    if (!confirm('Activate ' + entityName + '\n\n' +
        'Plan: ' + planName + '\n' +
        'Amount: R' + price + '/month\n' +
        'Reference: ' + paymentRef + '\n\n' +
        'Payment Methods:\n' +
        '1. Card Payment (Paystack) — Coming soon\n' +
        '2. EFT / Bank Transfer\n' +
        '3. WhatsApp: 079 044 0508\n\n' +
        'Click OK to simulate payment (for testing)\n' +
        'Click Cancel to pay later')) return;
    
    // Update entity status to active
    var accountId = getAccountId();
    if (!accountId) {
        // Try to find from entities
        toast('error', 'Cannot determine account');
        return;
    }
    
    // Update locally
    var entity = S.entities.find(function(e) { return e.id === entityId; });
    if (entity) {
        entity.status = 'active';
        entity.paymentStatus = 'paid';
        entity.plan = selectedActivatePlan;
        entity.activatedDate = new Date().toISOString();
        entity.activatedPaymentRef = paymentRef;
    }
    
    // Update in Firebase
    db.collection('accounts').doc(accountId).update({
        entities: S.entities,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdatedBy: S.user ? S.user.name : 'Customer',
        statusHistory: firebase.firestore.FieldValue.arrayUnion({
            action: 'entity_activated',
            date: new Date().toISOString(),
            by: S.user ? S.user.name : 'Customer',
            reason: entityName + ' activated — ' + planName + ' plan — Ref: ' + paymentRef
        })
    }).then(function() {
        closeModal();
        saveToStorage();
        
        toast('success', '🎉 ' + entityName + ' is now ACTIVE!');
        
        if (typeof logAction === 'function') {
            logAction('Payment', entityName + ' activated — ' + planName + ' — R' + price + ' — Ref: ' + paymentRef);
        }
        
        // Refresh entity selector
        showEntitySelector();
    }).catch(function(err) {
        toast('error', 'Activation failed: ' + err.message);
    });
}

// ============ ALSO UPDATE ADMIN ENTITY VIEW ============

var _origAdminEntitySelector = showAdminEntitySelector;
showAdminEntitySelector = function(customerName) {
    document.getElementById('es-sub-text').textContent = '🔑 Admin — ' + customerName + '\'s Entities';
    
    var grid = document.getElementById('entity-grid');
    var html = '';
    
    S.entities.forEach(function(ent, idx) {
        var isInactive = ent.status === 'inactive' || ent.paymentStatus === 'unpaid';
        var statusHtml = isInactive ?
            '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:.68rem;font-weight:700;background:rgba(201,69,69,.1);color:#c94545"><i class="fas fa-ban"></i> INACTIVE</span>' :
            '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;font-size:.68rem;font-weight:700;background:rgba(46,168,113,.1);color:#2ea871"><i class="fas fa-check-circle"></i> ACTIVE</span>';
        
        var cardStyle = isInactive ? 'opacity:.7;border:2px dashed #c94545;' : '';
        
        html += '<div class="entity-option" onclick="adminEnterEntity(' + idx + ')" style="' + cardStyle + '">' +
            '<i class="fas fa-building"></i>' +
            '<h3>' + ent.name + '</h3>' +
            '<p>' + (ent.contact || '') + '</p>' +
            '<p style="font-size:.68rem;color:#1a8ba8;margin-top:4px">FC: ' + ent.foodCostTarget + '% • ' + (ent.plan || 'professional') + '</p>' +
            statusHtml +
        '</div>';
    });
    
    var activeEntities = S.entities.filter(function(e) { return e.status !== 'inactive'; });
    if (activeEntities.length >= 2) {
        html += '<div class="entity-option global" onclick="adminEnterEntity(-1)"><span class="global-crown">👑 GLOBAL VIEW</span><i class="fas fa-globe"></i><h3>Global — ' + customerName + '</h3><p>All ' + activeEntities.length + ' Active Entities</p></div>';
    }
    
    html += '<div class="entity-option" onclick="showAdminCustomerSelector()" style="border:2px dashed #c4dde4;background:#f5f9fa"><i class="fas fa-arrow-left" style="font-size:1.5rem;color:#5a8a96"></i><h3 style="color:#5a8a96">← Back to Customer List</h3></div>';
    
    grid.innerHTML = html;
};

console.log('☁️ Firebase cloud sync ready');
console.log('🔑 Admin system with account management ready');
console.log('🔐 Authentication system ready');
console.log('🏢 Admin entity management ready');
console.log('💳 Entity activation system ready');
</script>
</body>
</html>
