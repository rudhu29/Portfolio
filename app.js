/**
 * RUDRA DADHALWALA PORTFOLIO — CLIENT ENGINE
 * Handles Lucide icons, theme toggle, terminal typing, cursor glow, and modal dialogs.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initThemeToggle();
  initCursorGlow();
  initTerminalTyping();
  initModals();
  initMobileMenu();
});

/* ----------------------------------------------------
   1. LUCIDE ICONS INITIALIZATION
---------------------------------------------------- */
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ----------------------------------------------------
   2. PURE WHITE / PITCH DARK THEME TOGGLE (Trope 3)
---------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const label = document.getElementById('themeToggleLabel');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('rudra_theme') || 'dark';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('rudra_theme', theme);

    if (label) {
      label.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    // Refresh icons if needed
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

/* ----------------------------------------------------
   3. CURSOR GLOW AURA TRACKER
---------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currX = mouseX;
    let currY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function loop() {
      currX += (mouseX - currX) * 0.15;
      currY += (mouseY - currY) * 0.15;
      glow.style.left = `${currX}px`;
      glow.style.top = `${currY}px`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  } else {
    glow.style.display = 'none';
  }
}

/* ----------------------------------------------------
   4. TERMINAL LIVE TYPING ANIMATION
---------------------------------------------------- */
function initTerminalTyping() {
  const typingEl = document.getElementById('termLiveTyping');
  if (!typingEl) return;

  const commands = [
    'curl -X POST https://api.rudra.dev/v1/hire',
    'cargo build --release --bin sendbridge',
    'agentmaxxing --orchestrate --autonomous-mode',
    'git commit -m "ship: zero-downtime architecture"'
  ];

  let cmdIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 70;

  function type() {
    const currentCmd = commands[cmdIndex];

    if (isDeleting) {
      typingEl.textContent = currentCmd.substring(0, charIndex - 1);
      charIndex--;
      speed = 35;
    } else {
      typingEl.textContent = currentCmd.substring(0, charIndex + 1);
      charIndex++;
      speed = 70;
    }

    if (!isDeleting && charIndex === currentCmd.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ----------------------------------------------------
   5. TROPE MODALS (No TOS, No Privacy, Demo Waitlist)
---------------------------------------------------- */
function initModals() {
  const modal = document.getElementById('genericModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const okBtn = document.getElementById('modalOkBtn');

  if (!modal) return;

  const openModal = (title, content) => {
    modalTitle.innerHTML = title;
    modalBody.innerHTML = content;
    modal.classList.add('active');
  };

  const closeModal = () => {
    modal.classList.remove('active');
  };

  closeBtn?.addEventListener('click', closeModal);
  okBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Trope 18: No Real Product Demos
  const demoBtn = document.getElementById('openDemoWaitlistBtn');
  demoBtn?.addEventListener('click', () => {
    openModal(
      '⏳ Interactive Sandbox — Early Access Waitlist',
      `You have discovered the classic tech startup rite of passage: <strong>The Interactive Demo That Is Not Quite Ready Yet</strong>.<br><br>
      The autonomous live coding sandbox is scheduled for <strong>Q4 2026</strong>. In the meantime, you can inspect 15+ actual production repositories on GitHub or test Rudra directly in a technical interview!`
    );
  });

  // Trope 26: No TOS (404)
  const noTosLink = document.getElementById('noTosLink');
  noTosLink?.addEventListener('click', () => {
    openModal(
      '📜 Terms of Service: Error 404',
      `<strong>Section 1: General Usage</strong><br>
      By viewing this portfolio, you agree to build cool software, avoid unnecessary microservices, and never deploy uncompiled code directly to main on a Friday afternoon.<br><br>
      <strong>Section 2: Intellectual Honesty</strong><br>
      All 30 landing page tropes on this site are presented with 100% genuine engineering foundations behind them.`
    );
  });

  // Trope 27: No Privacy Policy (N/A)
  const noPrivacyLink = document.getElementById('noPrivacyLink');
  noPrivacyLink?.addEventListener('click', () => {
    openModal(
      '🛡️ Privacy Policy: Cryptographically Unnecessary',
      `<strong>Zero Tracking Guarantee:</strong><br>
      We run zero third-party tracking scripts, zero session cookies, and zero behavioral telemetry. Your browsing state is as private as a local Rust binary running in an air-gapped terminal.<br><br>
      Stay curious, keep shipping.`
    );
  });
}

/* ----------------------------------------------------
   6. MOBILE MENU
---------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    if (navMenu.style.display === 'flex') {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '1.5rem';
      navMenu.style.right = '1.5rem';
      navMenu.style.background = 'var(--bg-card)';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderRadius = 'var(--radius-lg)';
      navMenu.style.border = '1px solid var(--border-glass)';
      navMenu.style.backdropFilter = 'blur(20px)';
    }
  });
}
