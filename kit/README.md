# Kit

The design system every page is built from. It starts almost empty and grows as pages are made.

| File | What it is | When it appears |
|---|---|---|
| `base.css` | The neutral foundation: reset, keyboard focus, placeholders, reduced motion. No colours or fonts. | Already here. Don't add a look to it. |
| `tokens.css` | Colours, fonts, type sizes, spacing and easing as CSS variables, written from `design.md`. | When the first page's look is agreed. |
| `fonts/` | The font files, self-hosted. Open-licence fonts only. | With `tokens.css`. |
| `templates/section.html` | The starting point for every section option (A and B). | Already here. |
| Shared components | Anything two or more sections use: buttons, a heading style, an accordion, a script. One file each, e.g. `button.css`, `tabs.js`. | When a second section needs the same thing. |

## How Claude adds to it

- **Colours and fonts live only in `tokens.css`.** Sections and components use the variables, never a raw colour value or font name.
- **Move shared things up.** When a second section needs something the first one built, Claude moves it into `kit/` and both sections link it.
- **One component, one file**, named for what it is (`button.css`, not `misc.css`), with a comment at the top showing how to use it.
- **Don't change shared files quietly.** A change to a kit file can alter every section that uses it, so Claude says which sections are affected.
- **Pages stay on the same kit.** If a new page needs a different look, that's a decision for `design.md` first, not a quiet override in one section.
