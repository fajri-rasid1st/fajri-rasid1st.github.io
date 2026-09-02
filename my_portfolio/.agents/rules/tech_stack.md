# Tech Stack & Build Workflows

## Core Technologies

- **Markup**: Semantic HTML5 (`index.html`)
- **Styling**: Tailwind CSS v3 (`tailwindcss: ^3.1.8`) with `@layer components` in `src/input.css`
- **Scripting**: Vanilla JavaScript (ES6+) in `src/js/script.js`
- **Iconography**:
  - Font Awesome 6 (local bundle in `src/fontawesome/`)
  - Vector icons in `src/svg/`
- **Typography**: Google Fonts ("Plus Jakarta Sans")
- **Code Formatter**: Prettier (`prettier: ^2.7.1`) with `prettier-plugin-tailwindcss`

## Package Management & Dependencies

- **Package Manager**: npm
- **Dependencies Type**: All dev-only tooling (`devDependencies`):
  ```json
  {
    "devDependencies": {
      "prettier": "^3.9.6",
      "prettier-plugin-tailwindcss": "^0.6.14",
      "tailwindcss": "^3.4.19"
    }
  }
  ```

## Available Scripts & Commands

| Command          | Action                                                         | Notes                                                         |
| :--------------- | :------------------------------------------------------------- | :------------------------------------------------------------ |
| `npm run watch`  | `tailwindcss -i ./src/input.css -o ./dist/output.css --watch`  | Runs Tailwind CLI compiler in watch mode during development   |
| `npm run build`  | `tailwindcss -i ./src/input.css -o ./dist/output.css --minify` | Compiles and minifies CSS bundle for production               |
| `npm run format` | `prettier --write .`                                           | Formats all code files with Prettier & sorts Tailwind classes |

## Build & Asset Rules

- **CSS Compilation**: Whenever modifications are made to `src/input.css`, `tailwind.config.js`, or classes in `index.html`, verify or compile `dist/output.css` so that styles are reflected.
- **Do NOT manually edit `dist/output.css`**: All styling changes must go through `src/input.css` or Tailwind utility classes in `index.html`.
- **Prettier Integration**: Run Prettier or adhere to `prettier-plugin-tailwindcss` class ordering rules when writing HTML classes.
