# Axiom design system

## The two surfaces

- **Axiom:** a thin public header, content-first hero with a program directory, light page fields with one dark course feature, and editorial rows rather than repeated decorative cards.
- **Axiom Learn:** the same type and accent, with a quiet workspace, a curriculum rail that becomes a disclosure on mobile, and longer line-height for reading. The active quiz keeps its time visible without making the entire briefing sticky.

The [Apple homepage](https://www.apple.com/) informed the presentation pattern: concise openings, clear actions, and restraint in supporting visuals. The [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) and [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) Human Interface Guidelines informed hierarchy, adaptation, and legibility. Axiom’s mark, color choices, and content remain its own.

## Tokens and components

| Role                      | Value / convention                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| Page / surface            | White / `#f5f6f8`                                                                                     |
| Text / secondary          | `#17202d` / `#535e6d`                                                                                 |
| Action / hover / selected | `#1557ad` / `#124686` / `#edf3fb`                                                                     |
| Feature dark              | `#162338`                                                                                             |
| Divider / strong divider  | `#e1e5eb` / `#c6ced9`                                                                                 |
| Font                      | System stack: Aptos, Helvetica Neue, system UI, sans-serif; no downloaded fonts                       |
| Radius                    | About 9px for buttons and 12px for standard panels; larger radii reserved for prominent visuals       |
| Layout                    | 76rem maximum width; fluid horizontal gutters; major section spacing separate from internal spacing   |
| Responsive                | 58rem for public header collapse, 54rem for the learning rail, 43rem for single-column editorial rows |
| Motion                    | 160ms feedback for interactive styling; reduced-motion preference disables nonessential transitions   |

Shared design tokens live in `src/editorial.css`, with Tailwind aliases in `src/styles.css` and the course mapping in `src/course/styles/course.css`. Use `site-wrap`, `site-button`, `site-text-link`, and the editorial list primitives before introducing another pattern. Use blue for action, not decoration. Never use color alone for results, locks, or current-unit status.
