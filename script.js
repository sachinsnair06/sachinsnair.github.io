/* ================================================================
   BUTTER-SMOOTH SCROLL  (lerp / inertia)
================================================================ */
(function () {
  const root = document.getElementById('smooth-root');

  let targetY  = 0;
  let currentY = 0;
  const EASE   = 0.10;

  function maxScroll() { return root.scrollHeight - window.innerHeight; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  window.addEventListener('wheel', e => {
    e.preventDefault();
    targetY = clamp(targetY + e.deltaY, 0, maxScroll());
  }, { passive: false });

  let touchStartY = 0;
  window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', e => {
    const dy = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    targetY = clamp(targetY + dy, 0, maxScroll());
  }, { passive: true });

  window.addEventListener('keydown', e => {
    const map = {
      ArrowDown: 80, ArrowUp: -80,
      PageDown: window.innerHeight * 0.85, PageUp: -(window.innerHeight * 0.85),
      End: maxScroll(), Home: -maxScroll(),
    };
    if (map[e.key] !== undefined) { e.preventDefault(); targetY = clamp(targetY + map[e.key], 0, maxScroll()); }
  });

  /* ── Scroll progress bar ── */
  const progressBar = document.getElementById('scroll-progress');

  function tick() {
    currentY += (targetY - currentY) * EASE;
    if (Math.abs(targetY - currentY) < 0.05) currentY = targetY;
    root.style.transform = `translateY(${-currentY}px)`;

    /* update progress bar */
    const pct = maxScroll() > 0 ? (currentY / maxScroll()) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.smoothScrollTo = function (targetEl) {
    if (!targetEl) return;
    const elTop = targetEl.getBoundingClientRect().top + currentY;
    targetY = clamp(elTop - 40, 0, maxScroll());
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); window.smoothScrollTo(el); }
    });
  });

  window.addEventListener('resize', () => {
    targetY  = clamp(targetY,  0, maxScroll());
    currentY = clamp(currentY, 0, maxScroll());
  });
})();


/* ================================================================
   CURSOR GLOW
================================================================ */
(function () {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mx = -999, my = -999;
  let cx = -999, cy = -999;
  let visible = false;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { glow.style.opacity = '1'; visible = true; }
  });

  window.addEventListener('mouseleave', () => {
    glow.style.opacity = '0'; visible = false;
  });

  function animateGlow() {
    cx += (mx - cx) * 0.10;
    cy += (my - cy) * 0.10;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animateGlow);
  }
  requestAnimationFrame(animateGlow);
})();


/* ================================================================
   SECTION FADE-IN ON SCROLL  (IntersectionObserver)
================================================================ */
(function () {
  const sections = document.querySelectorAll('.section-row');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    /* We use a custom check because our scroller is fixed-position.
       We trigger visibility based on the element's bounding rect. */
    threshold: 0.12,
  });

  /* Because smooth-root uses transform (not real scroll), the standard
     IntersectionObserver root won't fire correctly. We poll instead. */
  function checkVisibility() {
    sections.forEach(sec => {
      if (sec.classList.contains('visible')) return;
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
        sec.classList.add('visible');
      }
    });
  }

  /* Hook into the RAF loop indirectly via a custom event from scroll */
  setInterval(checkVisibility, 80);
  checkVisibility(); /* run once immediately */
})();


/* ================================================================
   DARK MODE
================================================================ */
const themeIcon = document.getElementById('themeIcon');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function toggleDark() { applyTheme(!document.body.classList.contains('dark')); }

applyTheme(localStorage.getItem('theme') === 'dark');


/* ================================================================
   COPY EMAIL BUTTON
================================================================ */
function copyEmail(btn, email) {
  navigator.clipboard.writeText(email).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    }, 2000);
  });
}


/* ================================================================
   RESUME BUTTON — ripple + download feedback
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const resumeBtn = document.getElementById('resumeBtn');
  if (!resumeBtn) return;

  resumeBtn.addEventListener('click', function (e) {
    /* ripple effect */
    const circle = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.cssText = `
      position:absolute; width:${size}px; height:${size}px;
      border-radius:50%; background:rgba(255,255,255,0.3);
      top:${e.clientY - rect.top - size/2}px;
      left:${e.clientX - rect.left - size/2}px;
      transform:scale(0); animation:ripple 0.5s linear;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });
});

/* inject ripple keyframe */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform:scale(2.5); opacity:0; } }`;
document.head.appendChild(rippleStyle);


/* ================================================================
   PROJECT MODAL
================================================================ */
function openModal(p) {
  document.getElementById('modalEmoji').textContent = p.emoji;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent  = p.desc;
  document.getElementById('modalGithub').href       = p.github;
  document.getElementById('modalLive').href         = p.live;
  document.getElementById('modalTags').innerHTML    =
    p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
  document.getElementById('modalBackdrop').classList.add('open');
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalBackdrop')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });