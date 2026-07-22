/* -------------------------------------------------------------
 * PREMIUM DIGITAL BUSINESS CARD JAVASCRIPT - KHALID AANAOUI
 * Vanilla JavaScript - Zero Dependencies - Offline Compatible
 * ------------------------------------------------------------- */

// Translations Dictionary
const translations = {
  en: {
    title: "Khalid Aanaoui",
    subtitle: "Premium Digital Business Card",
    saveContact: "Save Contact",
    shareCard: "Share Card",
    copyPhone: "Copy Phone Number",
    copyEmail: "Copy Email Address",
    copiedPhone: "Phone number copied!",
    copiedEmail: "Email address copied!",
    copiedLink: "Business card link copied!",
    call: "Call",
    whatsapp: "WhatsApp",
    email: "Email",
    location: "Business Location",
    instagram: "Instagram",
    facebook: "Facebook",
    copied: "Copied!",
    viewLocation: "Open in Google Maps",
    connectTitle: "Digital Identity",
    quickActions: "Quick Actions",
    socialNetworks: "Social Networks",
    showQr: "Show QR Code",
    closeQr: "Close QR Code",
    scanExplanation: "Scan this QR code with any smartphone camera to view and save my digital card instantly.",
    luxuryEdition: "L U X U R Y   E D I T I O N",
    phoneLabel: "Phone",
    emailLabel: "Email",
    mapsLabel: "Business Location",
    viewLocationBtn: "View Business Location"
  },
  ar: {
    title: "خالد أعناوي",
    subtitle: "بطاقة الأعمال الرقمية الفاخرة",
    saveContact: "حفظ جهة الاتصال",
    shareCard: "مشاركة البطاقة",
    copyPhone: "نسخ رقم الهاتف",
    copyEmail: "نسخ البريد الإلكتروني",
    copiedPhone: "تم نسخ رقم الهاتف!",
    copiedEmail: "تم نسخ البريد الإلكتروني!",
    copiedLink: "تم نسخ رابط بطاقة الأعمال!",
    call: "اتصال",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    location: "موقع العمل",
    instagram: "إنستغرام",
    facebook: "فيسبوك",
    copied: "تم النسخ!",
    viewLocation: "فتح في خرائط Google",
    connectTitle: "الهوية الرقمية",
    quickActions: "إجراءات سريعة",
    socialNetworks: "شبكات التواصل الاجتماعي",
    showQr: "عرض رمز QR",
    closeQr: "إغلاق رمز QR",
    scanExplanation: "امسح رمز QR هذا باستخدام كاميرا أي هاتف ذكي لعرض وحفظ بطاقتي الرقمية على الفور.",
    luxuryEdition: "إ ص د ا ر   ف ا خ ر",
    phoneLabel: "الهاتف",
    emailLabel: "البريد الإلكتروني",
    mapsLabel: "موقع العمل",
    viewLocationBtn: "عرض موقع العمل"
  }
};

// Global Values
const phoneValue = '+212722303254';
const emailValue = 'Aanaoui.khalid@gmail.com';

// State Variables
let currentLang = 'en';
let currentTheme = 'dark';

// DOM Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State Loading from LocalStorage
  initSettings();

  // 2. Load Screen Removal
  handleLoadingScreen();

  // 3. Register Ripple Effects on Buttons
  setupRippleEffects();

  // 4. Register Scroll Reveal Observer
  setupScrollReveal();

  // 5. Setup Action Click Handlers
  setupClickListeners();
});

// Setup Settings from Cache/Preferences
function initSettings() {
  const savedLang = localStorage.getItem('ka-digital-card-lang');
  if (savedLang === 'en' || savedLang === 'ar') {
    currentLang = savedLang;
  } else {
    // Attempt browser language detection (default to Arabic for MA locales)
    const navLang = navigator.language || navigator.userLanguage;
    if (navLang && (navLang.startsWith('ar') || navLang.includes('MA'))) {
      currentLang = 'ar';
    }
  }

  const savedTheme = localStorage.getItem('ka-digital-card-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    currentTheme = savedTheme;
  } else {
    // Default to luxury Dark mode
    currentTheme = 'dark';
  }

  // Apply to DOM
  applyLanguage(currentLang);
  applyTheme(currentTheme);
}

// Translate Entire Page Nodes
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ka-digital-card-lang', lang);

  // Set document attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Toggle active styling & visibility on components
  if (lang === 'ar') {
    document.body.style.fontFamily = '"Cairo", sans-serif';
  } else {
    document.body.style.fontFamily = '"Poppins", sans-serif';
  }

  // Update translatable nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // Keep SVG nested elements if present by updating text nodes only
      if (el.children.length === 0) {
        el.textContent = translations[lang][key];
      } else {
        // Find text node and update it
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = translations[lang][key];
          }
        });
      }
    }
  });

  // Switch button UI texts (Lang Toggle shows the NEXT target language)
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  if (langToggleBtn) {
    const textSpan = langToggleBtn.querySelector('span');
    if (textSpan) {
      textSpan.textContent = lang === 'en' ? 'العربية' : 'English';
    }
  }
}

// Toggle Theme (Dark / Light)
function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('ka-digital-card-theme', theme);

  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('btn-theme-toggle');

  if (theme === 'dark') {
    htmlEl.classList.remove('light');
    htmlEl.classList.add('dark');
    if (themeToggleBtn) {
      // Set Sun icon SVG for switching back to light mode
      themeToggleBtn.innerHTML = `
        <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      `;
    }
  } else {
    htmlEl.classList.remove('dark');
    htmlEl.classList.add('light');
    if (themeToggleBtn) {
      // Set Moon icon SVG for switching back to dark mode
      themeToggleBtn.innerHTML = `
        <svg class="w-4 h-4 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  }
}

// Elegant Loading Fade Out
function handleLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('opacity-0');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 1200);
  }
}

// Fluid Micro-ripple effect generator
function setupRippleEffects() {
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });
}

// Scroll Intersection Reveal System
function setupScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        self.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// Click Triggers & Event Register
function setupClickListeners() {
  // Language Button Toggle
  const langBtn = document.getElementById('btn-lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(nextLang);
      showToast(nextLang === 'en' ? 'Language: English' : 'اللغة المحددة: العربية');
    });
  }

  // Theme Button Toggle
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Copy Phone Button
  const copyPhoneBtn = document.getElementById('btn-copy-phone');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyTextToClipboard(phoneValue, 'phone');
    });
  }

  // Copy Email Button
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyTextToClipboard(emailValue, 'email');
    });
  }

  // Download Contact Button
  const saveContactBtn = document.getElementById('btn-save-contact');
  if (saveContactBtn) {
    saveContactBtn.addEventListener('click', triggerVCardDownload);
  }

  // QR Modal Open Triggers
  const showQrBtn = document.getElementById('btn-show-qr');
  if (showQrBtn) {
    showQrBtn.addEventListener('click', openQrModal);
  }

  // QR Modal Close Triggers
  const closeQrBtn = document.getElementById('btn-close-qr');
  if (closeQrBtn) {
    closeQrBtn.addEventListener('click', closeQrModal);
  }

  const closeQrBg = document.getElementById('qr-close-bg');
  if (closeQrBg) {
    closeQrBg.addEventListener('click', closeQrModal);
  }

  // QR Modal Copy Card Link
  const copyLinkBtn = document.getElementById('btn-copy-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      handleShareAction();
    });
  }

  // Share Card Button
  const shareCardBtn = document.getElementById('btn-share-card');
  if (shareCardBtn) {
    shareCardBtn.addEventListener('click', handleShareAction);
  }
}

// Dynamic QR code API setup with elegant sizing
function openQrModal() {
  const modal = document.getElementById('qr-modal');
  const content = document.getElementById('qr-modal-content');
  const qrImage = document.getElementById('qr-image');

  if (modal && content && qrImage) {
    const currentUrl = window.location.href;
    
    // Luxury custom colored QR: golden elements, white background
    const qrColor = '111827'; // high-contrast dark color for maximum scanning reliability
    const qrBg = 'ffffff';
    
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=${qrColor}&bgcolor=${qrBg}&data=${encodeURIComponent(currentUrl)}`;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
  }
}

function closeQrModal() {
  const modal = document.getElementById('qr-modal');
  const content = document.getElementById('qr-modal-content');

  if (modal && content) {
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');
  }
}

// Copy Text to Clipboard with Interactive Button feedback
function copyTextToClipboard(text, type) {
  navigator.clipboard.writeText(text).then(() => {
    // Show toast confirmation
    const msg = type === 'phone' ? translations[currentLang].copiedPhone : translations[currentLang].copiedEmail;
    showToast(msg);

    // Swap copy icon with check icon temporarily
    const btnId = type === 'phone' ? 'btn-copy-phone' : 'btn-copy-email';
    const btn = document.getElementById(btnId);
    if (btn) {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `
        <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      `;
      setTimeout(() => {
        btn.innerHTML = originalHtml;
      }, 2000);
    }
  }).catch(() => {
    showToast('Failed to copy');
  });
}

// Save contact direct download trigger
function triggerVCardDownload() {
  const link = document.createElement('a');
  link.href = 'contact.vcf';
  link.setAttribute('download', 'khalid_aanaoui.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const msg = currentLang === 'en' ? 'Contact downloading...' : 'جاري تحميل جهة الاتصال...';
  showToast(msg);
}

// Native Web Share API integration with Clipboard Link fallback
async function handleShareAction() {
  const shareData = {
    title: 'Khalid Aanaoui - Digital Identity',
    text: 'Connect with Khalid Aanaoui via this luxury premium digital business card.',
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // Ignored or dismissed, fallback to copy
      copyCardLinkFallback();
    }
  } else {
    copyCardLinkFallback();
  }
}

// Fallback link copy
function copyCardLinkFallback() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast(translations[currentLang].copiedLink);
  }).catch(() => {
    showToast('Failed to copy link');
  });
}

// Beautiful Floating Toast Indicator
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    
    // Transition in
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 3000);
  }
}
