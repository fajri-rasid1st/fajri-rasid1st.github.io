# Project Overview & Architecture: Fajri Rasid Portfolio

## Project Purpose

This repository contains the personal portfolio website of **Muhammad Fajri Rasid**, showcasing developer skills, projects, certifications, work experiences, and contact details. It is deployed as a static web application on GitHub Pages.

## Directory Structure

```
my_portfolio/
├── .agents/
│   └── rules/                  # Antigravity Agent Workspace Rules
│       ├── project_overview.md  # Architecture, structure, and general rules
│       ├── tech_stack.md       # Tech stack, packages, and build workflows
│       ├── code_style.md       # HTML, JS, and CSS code style guidelines
│       └── styling_and_theme.md # Color tokens, typography, and dark mode rules
├── dist/
│   └── output.css              # Compiled Tailwind CSS distribution file
├── node_modules/               # Dependencies (ignored by git)
├── src/
│   ├── fontawesome/            # Local Font Awesome assets
│   ├── img/                    # Profile images, certificate proofs, project thumbnails
│   ├── js/
│   │   └── script.js           # Client-side JavaScript interactions & theme logic
│   ├── svg/                    # Skill & technology vector icons
│   └── input.css               # Source CSS with Tailwind directives & @layer components
├── .gitignore                  # Git ignore rules (node_modules, package-lock.json)
├── .prettierrc                 # Prettier configuration (Tailwind plugin, printWidth)
├── index.html                  # Main single-page application entry point
├── package.json                # NPM configuration & build scripts
├── tailwind.config.js          # Tailwind CSS custom theme & plugin configuration
└── GEMINI.md                   # Agent guidelines entry point
```

## Key Principles & Guidelines

1. **Static & Lightweight**: Maintain zero runtime framework dependencies for the frontend; keep vanilla HTML5 + CSS + JavaScript fast and responsive.
2. **Design Integrity**: Adhere strictly to the established theme tokens (`primary`, `secondary`, `tertiary`, `dark`, `darkest`) and typography (`Plus Jakarta Sans`).
3. **Responsive Design**: Ensure mobile-first responsiveness with smooth desktop layout transitions (breakpoints `sm`, `md`, `lg`, `xl`, `2xl: 1320px`).
4. **Dark Mode First-Class Support**: All UI components must maintain complete visual fidelity in both light and dark themes without Flash of Unstyled Content (FOUC).
5. **Clean Asset Management**: Store raster graphics in `src/img/` and SVGs in `src/svg/` following lowercase hyphenated naming (`name-number.ext`).
