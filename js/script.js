// ===== IMAGE THUMBNAILS =====
document.querySelectorAll('.thumbs img').forEach(img => {
  img.addEventListener('click', () => {
    const main = img.closest('.project-media').querySelector('.main-img');
    if (main) main.src = img.src;
  });
});


// ===== FOOTER YEAR =====
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}


// ===== MOBILE MENU =====
const mobile = document.getElementById('mobile');
const hamb = document.querySelector('.hamb');

function toggleMobile(force) {
  if (!mobile || !hamb) return;

  const open = force ?? mobile.style.display !== 'flex';
  mobile.style.display = open ? 'flex' : 'none';
  hamb.setAttribute('aria-expanded', open ? 'true' : 'false');
}

if (hamb) {
  hamb.addEventListener('click', () => toggleMobile());
}


// ===== SCROLL REVEAL =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));


// ===== FILTER TABS =====
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.dataset.filter;

    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.display = show ? '' : 'none';
    });

  });
});


// ===== DARK / LIGHT MODE =====
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function applyTheme() {

  if (darkMode) {
    root.style.setProperty('--bg', '#070a13');
    root.style.setProperty('--text', '#e6f1ff');
    root.style.setProperty('--panel', 'rgba(255,255,255,.06)');
    root.style.setProperty('--muted', '#9fb0c8');
    if (themeToggle) themeToggle.textContent = "🌞";
  } else {
    root.style.setProperty('--bg', '#f8fafc');
    root.style.setProperty('--text', '#0f172a');
    root.style.setProperty('--panel', '#ffffffa6');
    root.style.setProperty('--muted', '#475569');
    if (themeToggle) themeToggle.textContent = "🌙";
  }

}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    applyTheme();
  });
}

applyTheme();


// ===== LANGUAGE TOGGLE =====
const langToggle = document.getElementById("langToggle");
let isArabic = false;

const texts = {
  en: {
    services: "Services",
    process: "Process",
    about: "About",
    contact: "Contact",
    quote: "Get a Quote",
    heroHeadline: "Build. Test. Launch. Grow.",
    heroSub: "End-to-end mobile app solutions for iOS & Android.",
    startProject: "Start your project",
    explore: "Explore services ↓"
  },
  ar: {
    services: "الخدمات",
    process: "العملية",
    about: "من نحن",
    contact: "تواصل معنا",
    quote: "احصل على عرض سعر",
    heroHeadline: "ابنِ. اختبر. أطلق. وتطور.",
    heroSub: "حلول تطوير تطبيقات شاملة لأنظمة iOS وAndroid.",
    startProject: "ابدأ مشروعك",
    explore: "استكشف الخدمات ↓"
  }
};

function setLanguage(lang) {

  const t = texts[lang];

  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  if (langToggle) {
    langToggle.textContent = lang === "ar" ? "English" : "عربي";
  }

  const navLinks = document.querySelectorAll("nav.menu a");

  if (navLinks.length >= 4) {
    navLinks[0].textContent = t.services;
    navLinks[1].textContent = t.process;
    navLinks[2].textContent = t.about;
    navLinks[3].textContent = t.contact;
  }

  const quoteBtn = document.querySelector(".cta");
  if (quoteBtn) quoteBtn.textContent = t.quote;

  const headline = document.querySelector(".headline");
  if (headline) headline.textContent = t.heroHeadline;

  const sub = document.querySelector(".sub");
  if (sub) sub.textContent = t.heroSub;

  const startBtn = document.querySelector(".actions .cta");
  if (startBtn) startBtn.textContent = t.startProject;

  const exploreBtn = document.querySelector(".actions .link");
  if (exploreBtn) exploreBtn.textContent = t.explore;

}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    isArabic = !isArabic;
    setLanguage(isArabic ? "ar" : "en");
  });
}


// ===== DATE PICKER =====
const picker = document.getElementById("datetime");

if (picker && typeof flatpickr !== "undefined") {
  flatpickr(picker, {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today"
  });
}


// ===== MEETING FORM =====
const meetingForm = document.getElementById("meetingForm");

if (meetingForm) {

  meetingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const datetime = document.getElementById("datetime").value;

    if (!name || !email || !datetime) {
      alert("Please complete the form");
      return;
    }

    const date = datetime.replace(/[-: ]/g, "");
    const start = date + "00";
    const end = date + "30";

    const url =
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Website Meeting" +
      "&dates=" + start + "/" + end +
      "&details=Meeting with " + name + " (" + email + ")";

    window.open(url, "_blank");

  });

};

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));