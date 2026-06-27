# Moubine Sekalaoudine — Portfolio (static HTML/CSS/JS export)

Open `index.html` in any browser. No build step required.

## Files
- `index.html` — Home (Hero, About, Productions, Contact)
- `productions.html` — All productions + personal photo gallery
- `styles.css` — Full design system (noir / orange, dark + light mode)
- `script.js` — Scroll reveal, parallax, FR/EN toggle, dark mode, smooth scroll
- `assets/` — Images

## Add photos to the gallery
In `productions.html`, replace any `<figure class="photo-tile …">…</figure>`
placeholder with:

```html
<figure class="photo-tile f-45">
  <img src="assets/your-photo.jpg" alt="Description"
       style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />
</figure>
```

Aspect classes: `f-45` (4/5), `f-sq` (1/1), `f-34` (3/4).
