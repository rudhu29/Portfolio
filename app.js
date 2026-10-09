/**
 * RUDRA DADHALWALA PORTFOLIO - MAIN CLIENT SCRIPT
 * Handles interactivity, animations, terminal emulator, theme accents, and dynamic filtering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCurrentYear();
  initCursorGlow();
  initNavbarScrollAndSpy();
  initMobileMenu();
  initAccentPalette();
  initTypewriterEffect();
  initTerminalTabs();
  initTerminalClock();
  initProjectFiltering();
  initSkillTabs();
  initCopyEmail();
  initContactForm();
  initBackToTop();
});

/* ----------------------------------------------------
   1. DYNAMIC FOOTER YEAR
---------------------------------------------------- */
function initCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ----------------------------------------------------
   2. AMBIENT CURSOR GLOW
---------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow) return;

  // Only activate on devices with fine pointer
  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderGlow() {
      // Smooth lerp interpolation
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(renderGlow);
    }
    requestAnimationFrame(renderGlow);
  } else {
    cursorGlow.style.display = 'none';
  }
}

/* ----------------------------------------------------
   3. NAVBAR SCROLL & ACTIVE SECTION SPY
---------------------------------------------------- */
function initNavbarScrollAndSpy() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    // Add backdrop style when scrolled past 50px
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ----------------------------------------------------
   4. MOBILE NAVIGATION TOGGLE
---------------------------------------------------- */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!mobileBtn || !navMenu) return;

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileBtn.classList.toggle('active');
    navMenu.classList.toggle('show');
  });

  // Close when link clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileBtn.classList.remove('active');
      navMenu.classList.remove('show');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      mobileBtn.classList.remove('active');
      navMenu.classList.remove('show');
    }
  });
}

/* ----------------------------------------------------
   5. ACCENT PALETTE PICKER
---------------------------------------------------- */
function initAccentPalette() {
  const accentBtn = document.getElementById('accentBtn');
  const paletteMenu = document.getElementById('paletteMenu');
  const colorDots = document.querySelectorAll('.color-dot');

  if (!accentBtn || !paletteMenu) return;

  // Load saved preference
  const savedAccent = localStorage.getItem('rudra_portfolio_accent') || 'cyan';
  setAccent(savedAccent);

  accentBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    paletteMenu.classList.toggle('show');
  });

  // Close palette when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!paletteMenu.contains(e.target) && !accentBtn.contains(e.target)) {
      paletteMenu.classList.remove('show');
    }
  });

  // Handle color selection
  colorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const color = dot.dataset.color;
      setAccent(color);
      paletteMenu.classList.remove('show');
    });
  });

  function setAccent(color) {
    document.body.setAttribute('data-accent', color);
    localStorage.setItem('rudra_portfolio_accent', color);

    colorDots.forEach((dot) => {
      dot.classList.toggle('active', dot.dataset.color === color);
    });
  }
}

/* ----------------------------------------------------
   6. TYPEWRITER SUBTITLE EFFECT
---------------------------------------------------- */
function initTypewriterEffect() {
  const typedEl = document.getElementById('typedRole');
  if (!typedEl) return;

  const roles = [
    'Architecting High-Performance Systems',
    'Rust & Systems Programmer',
    'Autonomous AI Agent Builder',
    'Full-Stack Software Engineer',
    'Competitive DSA Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeLoop, typingSpeed);
  }

  typeLoop();
}

/* ----------------------------------------------------
   7. TERMINAL TABS EMULATOR
---------------------------------------------------- */
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.term-tab');
  const contents = document.querySelectorAll('.term-tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = `term-${tab.dataset.tab}`;

      tabs.forEach((t) => t.classList.remove('active'));
      contents.forEach((c) => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
   8. TERMINAL LIVE CLOCK
---------------------------------------------------- */
function initTerminalClock() {
  const clockEl = document.getElementById('termClock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    clockEl.textContent = `${timeStr} UTC+5:30`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ----------------------------------------------------
   9. PROJECT FILTERING
---------------------------------------------------- */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('#projectFilters .filter-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   10. SKILL MATRIX TABS
---------------------------------------------------- */
function initSkillTabs() {
  const skillTabs = document.querySelectorAll('#skillTabs .skill-tab-btn');
  const categoryContents = document.querySelectorAll('.skills-category-content');

  skillTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCat = btn.dataset.skillCat;
      const targetContentId = `skill-cat-${targetCat}`;

      skillTabs.forEach((b) => b.classList.remove('active'));
      categoryContents.forEach((c) => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetContentId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
   11. COPY EMAIL ACTIONS & TOAST
---------------------------------------------------- */
function initCopyEmail() {
  const heroCopyBtn = document.getElementById('copyEmailHeroBtn');
  const cardCopyBtn = document.getElementById('copyEmailBtn');

  const copyEmail = (btn, textSpan) => {
    const email = btn.dataset.email || 'rudradadhalwala@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email address copied to clipboard!');
      if (textSpan) {
        const originalText = textSpan.textContent;
        textSpan.textContent = 'Copied!';
        setTimeout(() => {
          textSpan.textContent = originalText;
        }, 2000);
      }
    }).catch(() => {
      showToast('Copied: rudradadhalwala@gmail.com');
    });
  };

  if (heroCopyBtn) {
    const heroCopyText = document.getElementById('heroCopyText');
    heroCopyBtn.addEventListener('click', () => copyEmail(heroCopyBtn, heroCopyText));
  }

  if (cardCopyBtn) {
    cardCopyBtn.addEventListener('click', () => copyEmail(cardCopyBtn));
  }
}

function showToast(message) {
  let toast = document.querySelector('.copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ----------------------------------------------------
   12. CONTACT FORM HANDLER
---------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('messageSubject').value.trim();
    const body = document.getElementById('messageBody').value.trim();

    if (!name || !email || !body) return;

    // Compose mailto link
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject || 'Opportunity / Collaboration'}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${body}`
    );

    const mailtoUrl = `mailto:rudradadhalwala@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (formStatus) {
      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Launching email client with your message...`;
    }

    // Open user's default email client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      form.reset();
      if (formStatus) {
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    }, 1000);
  });
}

/* ----------------------------------------------------
   13. BACK TO TOP BUTTON
---------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
