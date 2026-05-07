/* ================================================================
   BUTTER-SMOOTH SCROLL  (lerp / inertia)
   ----------------------------------------------------------------
   How it works:
   • The page sits inside #smooth-root which is fixed — the browser
     never actually scrolls the document.
   • We track a "target" Y from wheel / touch / keyboard events.
   • Every animation frame we lerp currentY → targetY by factor EASE.
       EASE = 0.10  →  nice trailing deceleration (default)
       Lower value  →  more drift / floatier
       Higher value →  snappier / closer to instant
   • #smooth-root is translated by -currentY on each frame.
   • Zero CSS scroll-snap or section-stop interference.
================================================================ */
(function () {
  const root = document.getElementById('smooth-root');

  let targetY  = 0;
  let currentY = 0;
  const EASE   = 0.10;   // ← tune smoothness here

  function maxScroll() {
    return root.scrollHeight - window.innerHeight;
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /* ── Mouse wheel ── */
  window.addEventListener('wheel', e => {
    e.preventDefault();
    targetY = clamp(targetY + e.deltaY, 0, maxScroll());
  }, { passive: false });

  /* ── Touch ── */
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    const dy = touchStartY - e.touches[0].clientY;
    touchStartY = e.touches[0].clientY;
    targetY = clamp(targetY + dy, 0, maxScroll());
  }, { passive: true });

  /* ── Keyboard ── */
  window.addEventListener('keydown', e => {
    const map = {
      ArrowDown:  80,
      ArrowUp:   -80,
      PageDown:   window.innerHeight * 0.85,
      PageUp:    -window.innerHeight * 0.85,
      End:        maxScroll(),
      Home:      -maxScroll(),
    };
    if (map[e.key] !== undefined) {
      e.preventDefault();
      targetY = clamp(targetY + map[e.key], 0, maxScroll());
    }
  });

  /* ── RAF loop ── */
  function tick() {
    currentY += (targetY - currentY) * EASE;
    if (Math.abs(targetY - currentY) < 0.05) currentY = targetY;
    root.style.transform = `translateY(${-currentY}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* ── Anchor smooth-scroll (e.g. "Connect me" button) ── */
  window.smoothScrollTo = function (targetEl) {
    if (!targetEl) return;
    const elTop = targetEl.getBoundingClientRect().top + currentY;
    targetY = clamp(elTop - 40, 0, maxScroll());
  };

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.smoothScrollTo(el);
      }
    });
  });

  /* ── Keep bounds correct on resize ── */
  window.addEventListener('resize', () => {
    targetY  = clamp(targetY,  0, maxScroll());
    currentY = clamp(currentY, 0, maxScroll());
  });
})();


/* ================================================================
   DARK MODE
   ----------------------------------------------------------------
   Toggles the "dark" class on <body>.
   Icon and preference are saved to localStorage.
================================================================ */
const themeIcon = document.getElementById('themeIcon');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function toggleDark() {
  applyTheme(!document.body.classList.contains('dark'));
}

/* Restore saved preference on load */
applyTheme(localStorage.getItem('theme') === 'dark');


/* ================================================================
   PROJECT MODAL
   ----------------------------------------------------------------
   openModal(p)  — called from onclick on each project card.
   p = { emoji, title, tags[], desc, github, live }
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

/* Close modal on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
