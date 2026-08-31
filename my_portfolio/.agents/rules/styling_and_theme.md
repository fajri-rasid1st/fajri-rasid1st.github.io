# Design System, Colors, and Theme Tokens

## Color Palette Tokens (`tailwind.config.js`)
Use the defined project color tokens consistently across all components:

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `primary` | `#14b8a6` | Brand teal color, primary action buttons, active navigation, link highlights |
| `secondary` | `#64748b` | Subtitle text, muted labels, secondary icons in light mode |
| `tertiary` | `#9facbf` | Muted paragraph descriptions, footer texts |
| `dark` | `#334155` | Card backgrounds in dark mode, headings in light mode |
| `darkest` | `#1e293b` | Main dark background and dark navbar blur background |

## Container & Screen Breakpoints
- **Container**: Automatically centered (`center: true`) with horizontal padding of `24px`.
- **Breakpoints**:
  - `sm`: `640px`
  - `md`: `768px`
  - `lg`: `1024px`
  - `xl`: `1280px`
  - `2xl`: `1320px` (custom defined in `tailwind.config.js`)

## Typography
- **Primary Font Family**: `font-plusJakartaSans` (`"Plus Jakarta Sans", sans-serif`).
- Imported via Google Fonts with weights: `200`, `300`, `400`, `500`, `600`, `700`, `800`.
- Applied globally on `body` inside `src/input.css`.

## Dark Mode Conventions
- Dark mode operates via the `class` strategy (`<html class="dark">`).
- **Backgrounds**:
  - Light mode base: `#ffffff` or transparent / container.
  - Dark mode base: `dark:bg-darkest` (`#1e293b`).
  - Dark mode card/modal: `dark:bg-dark` (`#334155`).
- **Text**:
  - Headings: `text-dark dark:text-white`.
  - Body / Subtitles: `text-secondary dark:text-tertiary` or `dark:text-white`.
- **Borders & Dividers**:
  - `border-slate-300 dark:border-secondary`.

## Micro-Interactions & Hover Effects
- Skill badges: Grayscale by default with opacity `0.6`, transitions to full color (`grayscale-0`) and opacity `1.0` on hover (`.ic-skill`).
- Project image thumbnails: Zoom on card hover (`group-hover:scale-110`) with `overflow-hidden` container.
- Action buttons: Opacity decrease to `0.8` with subtle drop shadow on hover (`hover:opacity-80 hover:shadow-lg`).
