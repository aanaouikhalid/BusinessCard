/* =========================================================
   KHALID AANAOUI - PREMIUM DIGITAL BUSINESS CARD
   SAFE VERSION
   ========================================================= */

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
    scanExplanation:
      "Scan this QR code with any smartphone camera to view and save my digital card instantly.",
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
    scanExplanation:
      "امسح رمز QR هذا باستخدام كاميرا أي هاتف ذكي لعرض وحفظ بطاقتي الرقمية على الفور.",
    luxuryEdition: "إ ص د ا ر   ف ا خ ر",
    phoneLabel: "الهاتف",
    emailLabel: "البريد الإلكتروني",
    mapsLabel: "موقع العمل",
    viewLocationBtn: "عرض موقع العمل"
  }
};


/* =========================================================
   GLOBAL DATA
   ========================================================= */

const phoneValue = "+212722303254";
const emailValue = "Aanaoui.khalid@gmail.com";

let currentLang = "en";
let currentTheme = "dark";


/* =========================================================
   SAFE PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  console.log("DOM loaded successfully");

  // مهم جداً:
  // Loading screen غادي يتحيد حتى إلا وقع خطأ فشي وظيفة أخرى
  safeCall(initSettings, "initSettings");
  safeCall(setupRippleEffects, "setupRippleEffects");
  safeCall(setupScrollReveal, "setupScrollReveal");
  safeCall(setupClickListeners, "setupClickListeners");

  // إزالة Loading دائماً
  handleLoadingScreen();

});


/* =========================================================
   SAFE FUNCTION EXECUTOR
   ========================================================= */

function safeCall(fn, name) {
  try {
    fn();
  } catch (error) {
    console.error(name + " error:", error);
  }
}


/* =========================================================
   SETTINGS
   ========================================================= */

function initSettings() {

  // Language
  try {

    const savedLang = localStorage.getItem("ka-digital-card-lang");

    if (savedLang === "en" || savedLang === "ar") {

      currentLang = savedLang;

    } else {

      const browserLang = navigator.language || "";

      if (browserLang.toLowerCase().startsWith("ar")) {
        currentLang = "ar";
      } else {
        currentLang = "en";
      }

    }

  } catch (error) {

    console.warn("Language settings unavailable:", error);
    currentLang = "en";

  }


  // Theme
  try {

    const savedTheme = localStorage.getItem("ka-digital-card-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      currentTheme = savedTheme;
    } else {
      currentTheme = "dark";
    }

  } catch (error) {

    console.warn("Theme settings unavailable:", error);
    currentTheme = "dark";

  }


  applyLanguage(currentLang);
  applyTheme(currentTheme);

}


/* =========================================================
   LANGUAGE
   ========================================================= */

function applyLanguage(lang) {

  if (lang !== "en" && lang !== "ar") {
    lang = "en";
  }

  currentLang = lang;


  try {
    localStorage.setItem("ka-digital-card-lang", lang);
  } catch (error) {
    console.warn("Cannot save language:", error);
  }


  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";


  if (document.body) {

    document.body.style.fontFamily =
      lang === "ar"
        ? '"Cairo", sans-serif'
        : '"Poppins", sans-serif';

  }


  const dictionary = translations[lang];


  document.querySelectorAll("[data-i18n]").forEach(function (element) {

    const key = element.getAttribute("data-i18n");

    if (!dictionary[key]) {
      return;
    }


    // إذا ما عندوش عناصر داخلية
    if (element.children.length === 0) {

      element.textContent = dictionary[key];

    } else {

      // نبدلو غير Text Nodes
      Array.from(element.childNodes).forEach(function (node) {

        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = dictionary[key];
        }

      });

    }

  });


  const languageButton =
    document.getElementById("btn-lang-toggle");


  if (languageButton) {

    const textSpan =
      languageButton.querySelector("span");

    if (textSpan) {

      textSpan.textContent =
        lang === "en"
          ? "العربية"
          : "English";

    }

  }

}


/* =========================================================
   THEME
   ========================================================= */

function applyTheme(theme) {

  if (theme !== "dark" && theme !== "light") {
    theme = "dark";
  }

  currentTheme = theme;


  try {
    localStorage.setItem(
      "ka-digital-card-theme",
      theme
    );
  } catch (error) {
    console.warn("Cannot save theme:", error);
  }


  const html = document.documentElement;

  if (theme === "dark") {

    html.classList.add("dark");
    html.classList.remove("light");

  } else {

    html.classList.add("light");
    html.classList.remove("dark");

  }


  const themeButton =
    document.getElementById("btn-theme-toggle");


  if (!themeButton) {
    return;
  }


  if (theme === "dark") {

    themeButton.innerHTML = `
      <svg
        class="w-4 h-4 text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
        />
      </svg>
    `;

  } else {

    themeButton.innerHTML = `
      <svg
        class="w-4 h-4 text-indigo-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    `;

  }

}


/* =========================================================
   LOADING SCREEN
   ========================================================= */

function handleLoadingScreen() {

  const loader =
    document.getElementById("loading-screen");


  if (!loader) {

    console.log("Loading screen not found");
    return;

  }


  // نضمنو أنه غادي يختفي
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";


  setTimeout(function () {

    if (loader && loader.parentNode) {
      loader.parentNode.removeChild(loader);
    }

  }, 700);

}


/* =========================================================
   RIPPLE EFFECT
   ========================================================= */

function setupRippleEffects() {

  document
    .querySelectorAll(".ripple-btn")
    .forEach(function (button) {

      button.addEventListener("click", function (event) {

        const rect =
          this.getBoundingClientRect();

        const ripple =
          document.createElement("span");

        ripple.className = "ripple";

        ripple.style.left =
          (event.clientX - rect.left) + "px";

        ripple.style.top =
          (event.clientY - rect.top) + "px";

        this.appendChild(ripple);


        setTimeout(function () {

          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }

        }, 650);

      });

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupScrollReveal() {

  const elements =
    document.querySelectorAll(".reveal");


  if (!elements.length) {
    return;
  }


  // إذا المتصفح ما كيدعمش IntersectionObserver
  if (!("IntersectionObserver" in window)) {

    elements.forEach(function (element) {
      element.classList.add("reveal-active");
    });

    return;

  }


  const observer =
    new IntersectionObserver(
      function (entries, observerInstance) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "reveal-active"
            );

            observerInstance.unobserve(
              entry.target
            );

          }

        });

      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );


  elements.forEach(function (element) {

    observer.observe(element);

  });

}


/* =========================================================
   CLICK LISTENERS
   ========================================================= */

function setupClickListeners() {


  // Language
  const langButton =
    document.getElementById("btn-lang-toggle");


  if (langButton) {

    langButton.addEventListener("click", function () {

      const nextLanguage =
        currentLang === "en"
          ? "ar"
          : "en";

      applyLanguage(nextLanguage);

      showToast(
        nextLanguage === "en"
          ? "Language: English"
          : "اللغة المحددة: العربية"
      );

    });

  }


  // Theme
  const themeButton =
    document.getElementById("btn-theme-toggle");


  if (themeButton) {

    themeButton.addEventListener("click", function () {

      const nextTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      applyTheme(nextTheme);

    });

  }


  // Copy phone
  const copyPhoneButton =
    document.getElementById("btn-copy-phone");


  if (copyPhoneButton) {

    copyPhoneButton.addEventListener(
      "click",
      function () {

        copyTextToClipboard(
          phoneValue,
          "phone"
        );

      }
    );

  }


  // Copy email
  const copyEmailButton =
    document.getElementById("btn-copy-email");


  if (copyEmailButton) {

    copyEmailButton.addEventListener(
      "click",
      function () {

        copyTextToClipboard(
          emailValue,
          "email"
        );

      }
    );

  }


  // Save contact
  const saveContactButton =
    document.getElementById(
      "btn-save-contact"
    );


  if (saveContactButton) {

    saveContactButton.addEventListener(
      "click",
      triggerVCardDownload
    );

  }


  // QR open
  const qrButton =
    document.getElementById("btn-show-qr");


  if (qrButton) {

    qrButton.addEventListener(
      "click",
      openQrModal
    );

  }


  // QR close
  const qrCloseButton =
    document.getElementById("btn-close-qr");


  if (qrCloseButton) {

    qrCloseButton.addEventListener(
      "click",
      closeQrModal
    );

  }


  const qrBackground =
    document.getElementById("qr-close-bg");


  if (qrBackground) {

    qrBackground.addEventListener(
      "click",
      closeQrModal
    );

  }


  // Share
  const shareButton =
    document.getElementById("btn-share-card");


  if (shareButton) {

    shareButton.addEventListener(
      "click",
      handleShareAction
    );

  }


  // QR share
  const qrShareButton =
    document.getElementById("btn-copy-link");


  if (qrShareButton) {

    qrShareButton.addEventListener(
      "click",
      handleShareAction
    );

  }

}


/* =========================================================
   QR CODE
   ========================================================= */

function openQrModal() {

  const modal =
    document.getElementById("qr-modal");

  const content =
    document.getElementById(
      "qr-modal-content"
    );

  const qrImage =
    document.getElementById("qr-image");


  if (!modal || !content || !qrImage) {
    return;
  }


  const currentUrl =
    window.location.href;


  const qrColor = "111827";
  const qrBg = "ffffff";


  qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/" +
    "?size=300x300" +
    "&color=" + qrColor +
    "&bgcolor=" + qrBg +
    "&data=" +
    encodeURIComponent(currentUrl);


  modal.classList.remove(
    "opacity-0",
    "pointer-events-none"
  );

  modal.classList.add(
    "opacity-100",
    "pointer-events-auto"
  );


  content.classList.remove("scale-95");
  content.classList.add("scale-100");

}


/* =========================================================
   CLOSE QR
   ========================================================= */

function closeQrModal() {

  const modal =
    document.getElementById("qr-modal");

  const content =
    document.getElementById(
      "qr-modal-content"
    );


  if (!modal || !content) {
    return;
  }


  modal.classList.remove(
    "opacity-100",
    "pointer-events-auto"
  );

  modal.classList.add(
    "opacity-0",
    "pointer-events-none"
  );


  content.classList.remove(
    "scale-100"
  );

  content.classList.add(
    "scale-95"
  );

}


/* =========================================================
   COPY TEXT
   ========================================================= */

async function copyTextToClipboard(
  text,
  type
) {

  try {

    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {

      await navigator.clipboard.writeText(text);

    } else {

      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      textarea.remove();

    }


    const message =
      type === "phone"
        ? translations[currentLang].copiedPhone
        : translations[currentLang].copiedEmail;


    showToast(message);


  } catch (error) {

    console.error(
      "Copy failed:",
      error
    );

    showToast(
      currentLang === "ar"
        ? "تعذر النسخ"
        : "Failed to copy"
    );

  }

}


/* =========================================================
   VCARD DOWNLOAD
   ========================================================= */

function triggerVCardDownload() {

  const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:Khalid Aanaoui
N:Aanaoui;Khalid;;;
TEL;TYPE=CELL:+212722303254
EMAIL:Aanaoui.khalid@gmail.com
URL:${window.location.origin}
END:VCARD`;


  try {

    const blob =
      new Blob(
        [vcard],
        {
          type: "text/vcard;charset=utf-8"
        }
      );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;

    link.download =
      "khalid_aanaoui.vcf";


    document.body.appendChild(link);

    link.click();

    link.remove();


    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);


    showToast(
      currentLang === "ar"
        ? "جاري تحميل جهة الاتصال..."
        : "Contact downloading..."
    );


  } catch (error) {

    console.error(
      "VCF error:",
      error
    );

    showToast(
      currentLang === "ar"
        ? "تعذر حفظ جهة الاتصال"
        : "Unable to save contact"
    );

  }

}


/* =========================================================
   SHARE
   ========================================================= */

async function handleShareAction() {

  const shareData = {

    title:
      "Khalid Aanaoui - Digital Identity",

    text:
      "Connect with Khalid Aanaoui via this premium digital business card.",

    url:
      window.location.href

  };


  // Web Share
  if (
    navigator.share &&
    typeof navigator.share === "function"
  ) {

    try {

      await navigator.share(
        shareData
      );

      return;

    } catch (error) {

      // المستخدم يمكن يكون غير سد المشاركة
      console.log(
        "Share cancelled or unavailable"
      );

    }

  }


  // Fallback
  copyCardLinkFallback();

}


/* =========================================================
   COPY CARD LINK
   ========================================================= */

async function copyCardLinkFallback() {

  try {

    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {

      await navigator.clipboard.writeText(
        window.location.href
      );

    } else {

      const textarea =
        document.createElement("textarea");

      textarea.value =
        window.location.href;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      textarea.remove();

    }


    showToast(
      translations[currentLang].copiedLink
    );


  } catch (error) {

    console.error(
      "Link copy failed:",
      error
    );

    showToast(
      currentLang === "ar"
        ? "تعذر نسخ الرابط"
        : "Failed to copy link"
    );

  }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  const toastMessage =
    document.getElementById(
      "toast-message"
    );


  if (!toast || !toastMessage) {
    return;
  }


  toastMessage.textContent =
    message;


  toast.classList.remove(
    "opacity-0",
    "translate-y-4",
    "pointer-events-none"
  );


  toast.classList.add(
    "opacity-100",
    "translate-y-0"
  );


  setTimeout(function () {

    toast.classList.remove(
      "opacity-100",
      "translate-y-0"
    );

    toast.classList.add(
      "opacity-0",
      "translate-y-4",
      "pointer-events-none"
    );

  }, 3000);

}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    function () {

      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function () {

          console.log(
            "Service Worker registered"
          );

        })
        .catch(function (error) {

          console.error(
            "Service Worker registration failed:",
            error
          );

        });

    }
  );

}
