---
trigger: always_on
---

# Code Style & Conventions Guide

## HTML Guidelines (`index.html`)

- **Semantic Structure**: Use appropriate HTML5 semantic tags (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<main>`).
- **Section ID Anchoring**: Maintain exact section IDs for top navbar anchor navigation:
  - `#about`
  - `#skills`
  - `#portfolio`
  - `#certifications`
  - `#experiences`
  - `#contact`
- **Accessibility**: Provide meaningful `alt` attributes on all `<img>` tags and `aria-label` or descriptive button names where appropriate.
- **FOUC Prevention**: Keep the inline dark-mode detection script within `<head>` to ensure instant theme rendering before page paint.
- **Indentation & Formatting**:
  - 2 spaces indentation.
  - Line width for HTML files is targeted at 120 characters per `.prettierrc`.

## CSS & Tailwind Rules (`src/input.css`, `tailwind.config.js`)

- **Component Abstraction**: Whenever utility class combinations repeat across multiple elements (e.g. buttons, cards, navbar items), abstract them into `@layer components` in `src/input.css`:
  - `.btn-primary`
  - `.navbar-line`, `.navbar-item`, `.navbar-title`, `.navbar-fixed`
  - `.section-title`
  - `.btn-ic-circle`, `.ic-circle`
  - `.portfolio-frame`, `.portfolio-img`, `.portfolio-title`, `.portfolio-description`
  - `.ic-skill`
  - `.certificate-card`, `.certificate-title`, `.certificate-description`, `.certificate-btn-show-detail`
  - `.experience-container`, `.experience-title`, `.experience-subtitle`, `.experience-description`, `.experience-img`
  - `.footer-text`, `.footer-link`
- **Dark Mode Syntax**: Always use the `dark:` prefix variant (e.g., `dark:bg-dark`, `dark:text-white`, `dark:text-tertiary`).
- **Smooth Transitions**: Apply `transition duration-300` or `transition-colors duration-300` on interactive elements and hover states.

## JavaScript Guidelines (`src/js/script.js`)

- **Modern ES6+**:
  - Prefer `const` and `let` (never `var`).
  - Use arrow functions for callbacks.
  - Use `document.getElementById` and `document.querySelectorAll` with `forEach` for DOM access.
- **Theme Handling Protocol**:
  - Sync with `localStorage.theme` (`"dark"` or `"light"`).
  - Sync toggle input state (`checkbox.checked`) and update Font Awesome icons (`fa-sun`, `fa-moon`).
  - Respect OS level preference via `window.matchMedia("(prefers-color-scheme: dark)")`.
- **Event Listeners**:
  - Attach events cleanly and avoid inline HTML event handlers (e.g., avoid `onclick="..."` in HTML).
