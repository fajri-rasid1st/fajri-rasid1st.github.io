# Antigravity Workspace Guidelines: Muhammad Fajri Rasid Portfolio

Welcome to the **Muhammad Fajri Rasid Portfolio** workspace. This repository contains the static portfolio website built with HTML5, Tailwind CSS, Vanilla JavaScript, and Font Awesome.

## Rule Index & Documentation

Detailed rules and conventions for this project are structured in `.agents/rules/`:

- [.agents/rules/project_overview.md](file:///c:/Users/fajri/OneDrive/Documents/GitHub/fajri-rasid1st.github.io/my_portfolio/.agents/rules/project_overview.md): Project overview, structure, and general guidelines.
- [.agents/rules/tech_stack.md](file:///c:/Users/fajri/OneDrive/Documents/GitHub/fajri-rasid1st.github.io/my_portfolio/.agents/rules/tech_stack.md): Tech stack details, dependencies, build/watch scripts.
- [.agents/rules/code_style.md](file:///c:/Users/fajri/OneDrive/Documents/GitHub/fajri-rasid1st.github.io/my_portfolio/.agents/rules/code_style.md): HTML, CSS/Tailwind, and JavaScript style guide & conventions.
- [.agents/rules/styling_and_theme.md](file:///c:/Users/fajri/OneDrive/Documents/GitHub/fajri-rasid1st.github.io/my_portfolio/.agents/rules/styling_and_theme.md): Design system tokens, color palette, typography, and dark mode protocol.

## Quick Reference Commands

- Watch Tailwind compilation during development:
  ```bash
  npm run watch
  ```
- Minify / Production CSS compilation:
  ```bash
  npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
  ```

## Critical Constraints for Agents

1. **Never edit `dist/output.css` directly**: All style modifications must be made in `src/input.css` or via Tailwind classes in `index.html`.
2. **Preserve Dark Mode Integrity**: Always test/support both light and dark modes (`dark:...`) and maintain FOUC prevention logic.
3. **Keep it Static & Modular**: Do not introduce heavy frontend frameworks (React, Vue, etc.) unless explicitly instructed by the user. Maintain vanilla JS and clean CSS component layers.
