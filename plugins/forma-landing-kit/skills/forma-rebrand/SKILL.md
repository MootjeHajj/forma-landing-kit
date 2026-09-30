---
name: forma-rebrand
description: Create or adapt a responsive Next.js product landing page using the original Forma Landing Kit, with an editorial hero, interactive product example, features, use cases, sample pricing, FAQ, and footer.
---

# Forma Rebrand

Use the bundled `../../assets/forma-next-template` as a design starting point. Forma is a fictional project-notes example, not a real product or a representation of the user's brand.

## Workflow

1. Inspect the destination and establish the product name, audience, offer, CTA, actual product capabilities, URLs, and available assets. Infer from user-provided material; ask only for missing facts that materially affect the result.
2. For a new or empty destination, run `node <plugin-root>/scripts/new-forma-site.mjs <absolute-destination>`. The script refuses to overwrite nonempty projects. For an existing app, integrate deliberately without replacing unrelated code.
3. Before editing Next.js code, read applicable project instructions and the installed Next.js documentation in `node_modules/next/dist/docs/` when available.
4. Read [brand contract](references/brand-contract.md). Adapt `src/config/brand.ts`, `src/data/content.ts`, semantic tokens in `src/app/globals.css`, and the product demonstration. Preserve the overall composition, whitespace, responsive behavior, and interaction quality while giving the target product its own visual identity.
5. Keep business behavior in small services with explicit dependencies and interfaces where dependencies can be replaced. Functional React components render the UI. Prefer composition and avoid wrapper classes without a clear purpose.
6. Use original material or assets with confirmed permission for the intended use. Do not copy a third party's logos, videos, screenshots, site text, or distinctive artwork. Changing a name does not establish redistribution rights.
7. The sample prices and feature descriptions are explicitly illustrative. Replace them with actual facts or retain clear demo labels. Do not invent customers, awards, testimonials, compatibility, privacy commitments, discounts, refunds, or pricing. Never activate payments without an actual authorized offer.
8. Adapt the example workspace into a demonstration of the target product. Preserve accessible controls, empty states, keyboard focus, Escape-to-close behavior, and reduced-motion support. Do not imply that a local demonstration is a production backend.
9. Run `npm run lint`, `npm run typecheck`, and `npm run build`, then follow [visual verification](references/visual-verification.md).

## Completion

The adapted page must represent the user's actual product truthfully. No Forma example copy, sample pricing, or misleading demo claims should remain unless the user wants a template example. Return files and an accurate validation summary, including any unresolved publishing details.
