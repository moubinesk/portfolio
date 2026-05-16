// ===== ANNÉE COURANTE =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MODE SOMBRE =====
document.getElementById('mode-sombre').addEventListener('change', function () {
    document.body.classList.toggle('sombre', this.checked);
    document.body.classList.toggle('clair', !this.checked);
});

// ===== LANGUE =====
const checkboxLangue = document.getElementById('langue');
const langLabel = document.querySelector('.lang-label');

function applyLang(isEn) {
    langLabel.textContent = isEn ? 'FR' : 'EN';
    const attr = isEn ? 'data-en' : 'data-fr';
    document.querySelectorAll('[' + attr + ']').forEach(el => {
        const val = el.getAttribute(attr);
        if (!val) return;
        if (val.includes('<')) el.innerHTML = val;
        else el.textContent = val;
    });
}

checkboxLangue.addEventListener('change', function () {
    applyLang(this.checked);
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
        else e.target.classList.remove('visible');
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== NAV : SCROLL SMOOTH =====
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== NAV : ITEM ACTIF =====
const navLinks = document.querySelectorAll('.nav-item');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(n => n.style.opacity = '0.6');
            const active = document.querySelector('.nav-item[href="#' + e.target.id + '"]');
            if (active) active.style.opacity = '1';
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
