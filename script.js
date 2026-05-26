/* ============================================================
   RESET
============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ============================================================
   BASE — smooth scroll handled by JS lerp, NOT css snap
============================================================ */
html, body { height: 100%; }

body {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  background: var(--bg);
  color: var(--text);
  transition: background 0.35s ease, color 0.35s ease;
}

/* ============================================================
   CSS VARIABLES — Light mode
============================================================ */
:root {
  --bg:               #ffffff;
  --bg-card:          #ffffff;
  --text:             #111111;
  --text-2:           #374151;
  --text-muted:       #6b7280;
  --border:           #e5e7eb;
  --border-2:         #d1d5db;
  --accent:           #4f46e5;
  --accent-light:     #6366f1;
  --tag-bg:           #ffffff;
  --tag-hover-border: #6366f1;
  --tag-hover-text:   #4f46e5;
  --modal-bg:         #ffffff;
  --modal-tag-bg:     #f0f0ff;
  --modal-tag-c:      #4f46e5;
  --modal-tag-b:      #e0e0ff;
  --btn-gh-bg:        #111111;
  --btn-gh-text:      #ffffff;
  --btn-gh-hover:     #374151;
  --thumb-bg:         #f3f4f6;
  --edu-logo-bg:      #ede9fe;
  --progress-bg:      rgba(79,70,229,0.12);
  --cursor-color:     rgba(99,102,241,0.10);
}

/* ============================================================
   DARK MODE
============================================================ */
body.dark {
  --bg:               #0f1117;
  --bg-card:          #181c27;
  --text:             #e2e8f0;
  --text-2:           #94a3b8;
  --text-muted:       #64748b;
  --border:           #252b3b;
  --border-2:         #2e3548;
  --accent:           #818cf8;
  --accent-light:     #a5b4fc;
  --tag-bg:           #181c27;
  --tag-hover-border: #818cf8;
  --tag-hover-text:   #818cf8;
  --modal-bg:         #181c27;
  --modal-tag-bg:     rgba(99,102,241,0.15);
  --modal-tag-c:      #818cf8;
  --modal-tag-b:      rgba(99,102,241,0.25);
  --btn-gh-bg:        #e2e8f0;
  --btn-gh-text:      #111;
  --btn-gh-hover:     #cbd5e1;
  --thumb-bg:         #1e2333;
  --edu-logo-bg:      rgba(109,40,217,0.2);
  --progress-bg:      rgba(129,140,248,0.12);
  --cursor-color:     rgba(129,140,248,0.13);
}

/* ============================================================
   SCROLL PROGRESS BAR — thin line at very top
============================================================ */
#scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2.5px;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-light));
  z-index: 9999;
  transition: width 0.05s linear;
  border-radius: 0 2px 2px 0;
}

/* ============================================================
   CURSOR GLOW
============================================================ */
#cursor-glow {
  position: fixed;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--cursor-color) 0%, transparent 68%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.4s ease;
  opacity: 0;
}

/* ============================================================
   SMOOTH SCROLL WRAPPER
============================================================ */
#smooth-wrapper {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  z-index: 1;
}

#smooth-root { will-change: transform; }

/* ============================================================
   PAGE LAYOUT
============================================================ */
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
}

/* ============================================================
   FULL-PAGE DOT GRID  (graph-paper style, fixed behind everything)
   ── To adjust: change background-size (dot spacing) or the
      rgba alpha (dot intensity). 28px spacing feels like graph paper.
============================================================ */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
  background-size: 28px 28px;
}
body.dark::before {
  background-image: radial-gradient(circle, rgba(129,140,248,0.13) 1px, transparent 1px);
}

/* ============================================================
   ★ TOP-RIGHT SPACE — reserved for future illustration ★
============================================================ */
.grid-bg {
  position: absolute;
  top: 0; right: 0;
  width: 360px; height: 310px;
  z-index: 0;
  pointer-events: none;
  /* Add your own illustration here later */
}

/* ============================================================
   DARK MODE TOGGLE BUTTON
============================================================ */
.theme-btn {
  position: fixed;
  top: 18px; right: 20px;
  z-index: 500;
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  font-size: 16px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.2s;
}
.theme-btn:hover { transform: scale(1.1); }

/* ============================================================
   HERO
============================================================ */
.hero {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  padding: 60px 0 64px;
}

.avatar {
  width: 96px; height: 96px;
  border-radius: 50%;
  background: #e0e7ff;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 34px; font-weight: 700;
  margin-bottom: 20px;
  overflow: hidden; flex-shrink: 0;
  border: 2px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.avatar:hover {
  transform: scale(1.06);
  box-shadow: 0 8px 28px rgba(99,102,241,0.2);
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }

.hero-name {
  font-size: 28px; font-weight: 700;
  color: var(--text); margin-bottom: 6px; text-align: center;
}

/* STATUS BADGE */
.hero-status {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12.5px; color: var(--text-muted);
  margin-bottom: 6px;
}
.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.5); }
  60%  { box-shadow: 0 0 0 6px rgba(34,197,94,0);   }
  100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
}

.hero-role {
  font-size: 15px; color: var(--text-muted);
  margin-bottom: 22px; text-align: center;
}

.hero-btns { display: flex; gap: 10px; margin-bottom: 22px; }

.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 22px;
  background: var(--accent); color: #fff;
  font-size: 13.5px; font-weight: 500;
  border-radius: 6px; text-decoration: none;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  cursor: pointer; border: none;
}
.btn-primary:hover {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(79,70,229,0.28);
}
.btn-primary:active { transform: translateY(0); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 22px;
  background: var(--bg-card); color: var(--text);
  font-size: 13.5px; font-weight: 500;
  border-radius: 6px; text-decoration: none;
  border: 1.5px solid var(--border-2);
  transition: border-color 0.2s, background 0.3s, color 0.3s, transform 0.15s;
  cursor: pointer;
}
.btn-outline:hover { border-color: var(--text-muted); transform: translateY(-1px); }
.btn-outline:active { transform: translateY(0); }

.hero-socials { display: flex; gap: 20px; align-items: center; }
.hero-socials a {
  color: var(--text-2); font-size: 18px;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
}
.hero-socials a:hover { color: var(--accent); transform: translateY(-2px); }

/* ============================================================
   SECTION ROWS — fade-in on scroll
============================================================ */
.section-row {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 0 52px;
  padding: 52px 0;
  /* initial state for reveal animation */
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.section-row.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  font-size: 14px; font-weight: 600;
  color: var(--text); padding-top: 2px;
}

/* ============================================================
   ABOUT
============================================================ */
.about-text p {
  font-size: 14px; color: var(--text-2);
  line-height: 1.78; margin-bottom: 14px;
}
.about-text p:last-child { margin-bottom: 0; }

/* ============================================================
   CERT BADGES — in skills section
============================================================ */
.cert-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.cert-badge {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 12px 5px 8px;
  border: 1.5px solid var(--border-2);
  border-radius: 20px;
  font-size: 12px; font-weight: 500;
  color: var(--text-2);
  background: var(--bg-card);
  transition: border-color 0.2s, color 0.2s, transform 0.2s;
  cursor: default;
}
.cert-badge:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
.cert-badge img {
  width: 18px; height: 18px;
  object-fit: contain; border-radius: 3px;
}

/* ============================================================
   GITHUB STATS
============================================================ */
.github-stats {
  margin-top: 8px;
}
.github-stats img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border);
  display: block;
  transition: border-color 0.3s;
}

/* ============================================================
   PROJECTS
============================================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(176px, 1fr));
  gap: 14px;
}

.project-card {
  border: 1px solid var(--border);
  border-radius: 10px; overflow: hidden;
  color: inherit; display: block; cursor: pointer;
  background: var(--bg-card);
  transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
}
.project-card:hover {
  box-shadow: 0 8px 28px rgba(0,0,0,0.10);
  transform: translateY(-4px);
  border-color: var(--accent-light);
}
.project-card:active { transform: translateY(-1px); }

.project-thumb {
  width: 100%; height: 128px;
  background: var(--thumb-bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 42px; overflow: hidden; user-select: none;
  transition: background 0.3s;
}
.project-thumb img { width: 100%; height: 100%; object-fit: cover; }

.project-info { padding: 12px 14px; }
.project-name { font-size: 13.5px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.project-sub  { font-size: 12.5px; color: var(--text-muted); }

/* ============================================================
   EXPERIENCE
============================================================ */
.exp-list { display: flex; flex-direction: column; gap: 12px; }

.exp-card {
  border: 1px solid var(--border);
  border-radius: 10px; padding: 16px 18px;
  background: var(--bg-card);
  transition: border-color 0.25s, background 0.3s, transform 0.25s, box-shadow 0.25s;
}
.exp-card:hover {
  border-color: var(--border-2);
  transform: translateX(3px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

.exp-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 12px; margin-bottom: 10px;
}
.exp-left { display: flex; align-items: center; gap: 12px; }
.exp-logo {
  width: 36px; height: 36px; border-radius: 8px;
  background: var(--thumb-bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
  transition: background 0.3s;
}
.exp-title   { font-size: 14px; font-weight: 600; color: var(--text); }
.exp-company { font-size: 13px; color: var(--text-muted); margin-top: 1px; }
.exp-period  { font-size: 12.5px; color: var(--text-muted); white-space: nowrap; padding-top: 2px; }

.exp-bullets { list-style: disc; padding-left: 18px; }
.exp-bullets li {
  font-size: 13.5px; color: var(--text-2);
  line-height: 1.65; margin-bottom: 5px;
}
.exp-bullets li:last-child { margin-bottom: 0; }

/* ============================================================
   EDUCATION
============================================================ */
.edu-card {
  border: 1px solid var(--border);
  border-radius: 10px; padding: 16px 18px;
  background: var(--bg-card);
  transition: border-color 0.25s, background 0.3s, transform 0.25s, box-shadow 0.25s;
}
.edu-card:hover {
  border-color: var(--border-2);
  transform: translateX(3px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}
.edu-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 12px; margin-bottom: 10px;
}
.edu-left { display: flex; align-items: center; gap: 12px; }
.edu-logo {
  width: 36px; height: 36px; border-radius: 8px;
  background: var(--edu-logo-bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
  transition: background 0.3s;
}
.edu-degree { font-size: 14px; font-weight: 600; color: var(--text); }
.edu-school { font-size: 13px; color: var(--text-muted); margin-top: 1px; }
.edu-period { font-size: 12.5px; color: var(--text-muted); white-space: nowrap; padding-top: 2px; }
.edu-desc   { font-size: 13.5px; color: var(--text-2); line-height: 1.68; }

/* ============================================================
   SKILLS
============================================================ */
.skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }

.skill-tag {
  padding: 6px 14px;
  border: 1.5px solid var(--border-2);
  border-radius: 6px;
  font-size: 13px; color: var(--text-2); font-weight: 500;
  background: var(--tag-bg);
  transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s;
  cursor: default;
}
.skill-tag:hover {
  border-color: var(--tag-hover-border);
  color: var(--tag-hover-text);
  transform: translateY(-2px);
}

/* ============================================================
   CONTACT
============================================================ */
.contact-list { display: flex; flex-direction: column; gap: 10px; }

.contact-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; color: var(--text-2);
}
.contact-label { font-weight: 600; color: var(--text); min-width: 56px; }
.contact-item a { color: var(--text-2); text-decoration: none; transition: color 0.2s; }
.contact-item a:hover { color: var(--accent); text-decoration: underline; }

/* Copy email button */
.copy-email-btn {
  display: inline-flex; align-items: center; gap: 5px;
  margin-left: 8px;
  padding: 2px 9px;
  border: 1.5px solid var(--border-2);
  border-radius: 5px;
  font-size: 11.5px; font-weight: 500;
  color: var(--text-muted);
  background: var(--bg-card);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  vertical-align: middle;
}
.copy-email-btn:hover { border-color: var(--accent); color: var(--accent); }
.copy-email-btn.copied {
  border-color: #22c55e;
  color: #22c55e;
  background: rgba(34,197,94,0.06);
}

/* ============================================================
   FOOTER
============================================================ */
.footer {
  position: relative; z-index: 1;
  text-align: center;
  padding: 24px 0 32px;
  font-size: 12.5px; color: var(--text-muted);
}

/* ============================================================
   PROJECT MODAL
============================================================ */
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  opacity: 0; pointer-events: none;
  transition: opacity 0.28s ease;
}
.modal-backdrop.open { opacity: 1; pointer-events: all; }

.modal {
  background: var(--modal-bg);
  border-radius: 16px;
  width: 100%; max-width: 520px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.22);
  overflow: hidden;
  transform: translateY(28px) scale(0.96);
  transition: transform 0.32s cubic-bezier(0.34,1.28,0.64,1), opacity 0.28s ease, background 0.3s;
  opacity: 0;
}
.modal-backdrop.open .modal { transform: translateY(0) scale(1); opacity: 1; }

.modal-header {
  position: relative; height: 160px;
  background: var(--thumb-bg);
  display: flex; align-items: center; justify-content: center;
  font-size: 62px; user-select: none;
  transition: background 0.3s;
}
.modal-close {
  position: absolute; top: 14px; right: 14px;
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--bg-card); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 14px; color: var(--text-muted);
  transition: background 0.2s, color 0.2s, transform 0.2s;
}
.modal-close:hover { background: var(--bg); color: var(--text); transform: scale(1.1); }

.modal-body { padding: 24px 26px 26px; }
.modal-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.modal-tag {
  font-size: 11.5px; padding: 3px 10px;
  border-radius: 20px;
  background: var(--modal-tag-bg); color: var(--modal-tag-c);
  border: 1px solid var(--modal-tag-b); font-weight: 500;
}
.modal-title { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 10px; }
.modal-desc  { font-size: 14px; color: var(--text-2); line-height: 1.75; margin-bottom: 20px; }
.modal-footer { display: flex; gap: 10px; flex-wrap: wrap; }

.modal-btn-github {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 20px;
  background: var(--btn-gh-bg); color: var(--btn-gh-text);
  font-size: 13.5px; font-weight: 500;
  border-radius: 7px; text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.modal-btn-github:hover { background: var(--btn-gh-hover); transform: translateY(-1px); }

.modal-btn-live {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 9px 20px;
  background: var(--bg-card); color: var(--text);
  font-size: 13.5px; font-weight: 500;
  border-radius: 7px; text-decoration: none;
  border: 1.5px solid var(--border-2);
  transition: border-color 0.2s, background 0.3s, color 0.3s, transform 0.15s;
}
.modal-btn-live:hover { border-color: var(--text-muted); transform: translateY(-1px); }

/* ============================================================
   RESPONSIVE
============================================================ */
@media (max-width: 640px) {
  .page           { padding: 0 20px; }
  .section-row    { grid-template-columns: 1fr; gap: 14px; padding: 38px 0; }
  .hero           { padding: 44px 0 48px; }
  .hero-name      { font-size: 24px; }
  .projects-grid  { grid-template-columns: 1fr 1fr; }
  .grid-bg        { width: 200px; height: 200px; }
  .exp-header     { flex-direction: column; gap: 4px; }
  .edu-header     { flex-direction: column; gap: 4px; }
  #cursor-glow    { display: none; }
}
