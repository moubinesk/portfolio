//  Theme
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

// Language 
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


document.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof Element)) return;
  if (t.closest("[data-theme-toggle]")) { isDark = !isDark; applyTheme(); }
  if (t.closest("[data-lang-toggle]")) { lang = lang === "fr" ? "en" : "fr"; applyLang(); }
});

// ---------- Smooth scroll for hash links ----------
// document.addEventListener("click", (e) => {
//   const a = e.target.closest && e.target.closest('a[href^="#"]');
//   if (!a) return;
//   const id = a.getAttribute("href");
//   if (id.length <= 1) return;
//   const el = document.querySelector(id);
//   if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
// });

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

// ---------- Année ----------
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

applyTheme();
