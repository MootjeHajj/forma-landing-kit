# Visual verification

Run the actual site and inspect desktop at 1440 px and mobile at 390 px, plus a narrow 320 px viewport when available.

Check headline wrapping, margins, CTA visibility, note-card legibility, illustration crop, stacked pricing, FAQ, and footer. Confirm no horizontal overflow.

Exercise the mobile menu, each collection filter, a successful search, an empty search, reset, note opening, keyboard focus, Escape closing, pricing period switching, and FAQ expansion. Every navigation link must reach its intended section.

Inspect failed network requests and runtime errors. The bundled example needs no remote media. Confirm `prefers-reduced-motion` stops reveal transitions and content remains visible.

Capture the actual desktop and mobile views for review. Do not report checks as passed if they were not run. A successful build alone does not establish visual quality.
