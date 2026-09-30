# Forma Landing Kit

An original, responsive Next.js landing-page kit packaged as an AI skill plugin. Its fictional Forma example demonstrates a project-notes product with an interactive workspace, editorial feature sections, geometric illustrations, use cases, illustrative pricing, FAQ, and footer.

## Install in a compatible agent

The plugin directory is `plugins/forma-landing-kit`. It contains a portable `plugin.json`, a Codex compatibility manifest, a skill, the complete Next.js template, and a cross-platform Node.js scaffolder.

The repository includes `.agents/plugins/marketplace.json`. Use `https://github.com/MootjeHajj/forma-landing-kit.git` with **Add plugin marketplace** in Codex. Other compatible agents can read `skills/forma-rebrand/SKILL.md` and the bundled files directly. Public Git access does not install the plugin automatically.

## Create a site

```sh
node plugins/forma-landing-kit/scripts/new-forma-site.mjs /absolute/path/to/my-site
```

The destination must be new or empty. Then run from the generated project:

```sh
npm ci
npm run dev
```

Use `src/config/brand.ts` for the brand, `src/data/content.ts` for section content, `src/services/DemoBoardService.ts` for example behavior, and `src/app/globals.css` for visual tokens. Run lint, typecheck, and build before delivery.

Example prompt: “Use Forma Landing Kit for my product. Adapt the brand, product demonstration, section copy, and assets while preserving its responsive composition.”

## What works

- Sample note filters and search, including an empty state and reset.
- Note dialogs with keyboard focus, Escape closing, and return focus.
- Mobile navigation and in-page section links.
- Example monthly/yearly pricing display, native FAQ disclosure, and reduced-motion handling.

Forma is fictional. The prices are illustrative; there is no account system, payment flow, cloud storage, or production notes backend. The example is marked `noindex` by default.

## Material and architecture

All product text, UI illustrations, mark, and template UI source were created for this example. No Supaste source UI, copied media, customer quotes, awards, external product links, downloaded fonts, or portraits are included. Next.js project configuration and dependency declarations originate from the existing development setup; the third-party dependencies retain their own licenses.

Filtering logic is separated into `DemoBoardService` with an injected `NoteRepository` interface. Functional React components handle presentation and browser interactions.

## Publication status

Distributed through the public Git repository and its Git-backed marketplace catalog. The OpenAI public-directory submission is still pending: verified publisher identity, reuse license, country targeting, and the website, support, privacy, and terms pages have not yet been finalized. This is not an approved public-directory release.
