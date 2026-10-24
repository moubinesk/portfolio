// ---------- Theme ----------
const root = document.documentElement;
let isDark = localStorage.getItem("portfolio_theme") !== "light";

function applyTheme() {
  root.classList.toggle("dark", isDark);
  root.classList.toggle("light", !isDark);
  document.querySelectorAll("[data-theme-icon]").forEach((b) => {
    b.textContent = isDark ? "☀" : "☾";
  });
  localStorage.setItem("portfolio_theme", isDark ? "dark" : "light");
}

// ---------- Language ----------
let lang = localStorage.getItem("portfolio_lang") === "en" ? "en" : "fr";

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
  localStorage.setItem("portfolio_lang", lang);
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof Element)) return;
  if (t.closest("[data-theme-toggle]")) {
    isDark = !isDark;
    applyTheme();
  }
  if (t.closest("[data-lang-toggle]")) {
    lang = lang === "fr" ? "en" : "fr";
    applyLang();
  }
});

// ---------- Smooth scroll for hash links ----------
document.addEventListener("click", (e) => {
  const t = e.target;
  if (!(t instanceof Element)) return;
  const a = t.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  if (!id || id.length <= 1) return;
  const el = document.querySelector(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  }
});

// ---------- Scroll reveal ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- Active nav highlight ----------
const sections = ["accueil", "apropos", "productions", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (sections.length) {
  const navIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-links a").forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => navIO.observe(s));
}

// ---------- Année ----------
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

// Initialisation au chargement
applyTheme();
applyLang();

// ---------- Project Lightbox ----------
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbMedia = document.getElementById("lightboxMedia");
  const lbCat = document.getElementById("lightboxCat");
  const lbTitle = document.getElementById("lightboxTitle");
  const lbDesc = document.getElementById("lightboxDesc");
  const lbYear = document.getElementById("lightboxYear");

function openLightbox(card) {
    const d = card.dataset;
    const isPhoto = d.type === "photo";
    
    // Active le mode photo minimaliste si c'est une photo
    lightbox.classList.toggle("is-photo", isPhoto);

    if (isPhoto) {
      // Pour les photos : juste le titre et l'image
      const title = d.title || d.titleFr || "";
      lbTitle.setAttribute("data-fr", title);
      lbTitle.setAttribute("data-en", d.titleEn || title);
      lbMedia.innerHTML = `<img src="${d.src}" alt="${title}" />`;
      lbMedia.classList.remove("is-pending", "is-portrait");
    } else {
      // Pour les autres projets (vidéos, design, DA) : affichage complet
      lbCat.setAttribute("data-fr", d.catFr || "");
      lbCat.setAttribute("data-en", d.catEn || "");
      lbTitle.setAttribute("data-fr", d.titleFr || "");
      lbTitle.setAttribute("data-en", d.titleEn || "");
      lbDesc.setAttribute("data-fr", d.descFr || "");
      lbDesc.setAttribute("data-en", d.descEn || "");
      lbYear.textContent = d.year || "";

      if (d.type === "video") {
        lbMedia.innerHTML = `<iframe src="${d.src}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
        lbMedia.classList.remove("is-pending");
      } else if (d.type === "pending") {
        lbMedia.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg><span data-fr="Média à venir" data-en="Media coming soon">Média à venir</span>`;
        lbMedia.classList.add("is-pending");
      } else {
        lbMedia.innerHTML = `<img src="${d.src}" alt="${d.titleFr || ""}" />`;
        lbMedia.classList.remove("is-pending");
      }
      lbMedia.classList.toggle("is-portrait", d.aspect === "portrait");
    }

    applyLang();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    setTimeout(() => {
      lbMedia.innerHTML = "";
    }, 350);
  }

  document.querySelectorAll(".js-project").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target instanceof Element && e.target.closest("a")) return;
      e.preventDefault();
      openLightbox(card);
    });
  });

  document.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

// ---------- Vision ScrollSpy (Highlight active section on scroll) ----------
const visionSections = document.querySelectorAll(".vision-sections section");
const visionLinks = document.querySelectorAll(".vision-link");

if (visionSections.length > 0 && visionLinks.length > 0) {
  const visionIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      
      // Récupère l'ID de la section visible
      const id = entry.target.getAttribute("id");
      
      // Met à jour la classe "active" sur tous les liens du menu vision
      visionLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    });
  }, { 
    threshold: 0.15, 
    rootMargin: "-20% 0px -40% 0px" // Déclenche le changement un peu avant le milieu de l'écran
  });

  visionSections.forEach((section) => visionIO.observe(section));
}