// Moubine Sekalaoudine — Portfolio (static export)

// ---------- Theme (dark / light) ----------
const root = document.documentElement;
let isDark = true;
root.classList.add("dark");

function applyTheme() {
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  document.querySelectorAll("[data-theme-icon]").forEach((b) => {
    b.textContent = isDark ? "☀" : "☾";
  });
}

// ---------- Language (FR / EN) ----------
let lang = "fr";
function applyLang() {
  const attr = lang === "en" ? "data-en" : "data-fr";
  document.querySelectorAll(`[${attr}]`).forEach((el) => {
    const val = el.getAttribute(attr);
    if (val == null) return;
    if (val.includes("<")) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll("[data-lang-label]").forEach((b) => {
    b.textContent = lang === "fr" ? "EN" : "FR";
  });
  document.documentElement.setAttribute("lang", lang);
}

// ---------- Wire toggles ----------
document.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof Element)) return;
  if (t.closest("[data-theme-toggle]")) { isDark = !isDark; applyTheme(); }
  if (t.closest("[data-lang-toggle]")) { lang = lang === "fr" ? "en" : "fr"; applyLang(); }
});

// ---------- Smooth scroll for hash links ----------
document.addEventListener("click", (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  if (id.length <= 1) return;
  const el = document.querySelector(id);
  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
});

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- Active nav highlight ----------
const sections = ["accueil", "apropos", "productions", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
if (sections.length) {
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-links a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { threshold: 0.4 });
  sections.forEach((s) => navIO.observe(s));
}

// ---------- Hero parallax ----------
const heroBg = document.querySelector(".hero-bg");
if (heroBg) {
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = heroBg.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = -progress * 0.25 * 100;
      heroBg.style.transform = `translate3d(0, ${y}px, 0) scale(1.08)`;
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---------- Year ----------
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

applyTheme();
