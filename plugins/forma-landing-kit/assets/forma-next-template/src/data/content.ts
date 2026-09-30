export const features = [
  { number: "01", title: "An idea deserves a place.", description: "Turn a passing thought into a note. The example brings short writing, a visual reference, and a project checklist into one calm workspace.", label: "Collect the pieces", variant: "collect" },
  { number: "02", title: "Find a thread. Follow it.", description: "Group related pieces without losing the little connections between them. Try the collection filters and search in the live example above.", label: "Make a little order", variant: "organize" },
  { number: "03", title: "From scattered to started.", description: "A useful project page makes the next step feel smaller. This sample combines a short brief, collected references, and a clear sequence of tasks.", label: "Move the work forward", variant: "plan" },
] as const;

export const useCases = [
  { title: "The independent studio", text: "Keep the direction, references, and decisions close to the work.", symbol: "◈" },
  { title: "The personal project", text: "Give a weekend idea somewhere to grow at its own pace.", symbol: "↗" },
  { title: "The small team", text: "Make space for the thinking that happens between meetings.", symbol: "⊞" },
] as const;

export const questions = [
  { question: "Is Forma a real application?", answer: "No. Forma is a fictional example brand created for this landing-page kit. The small interactive workspace runs locally in your browser; it is a demonstration, not a full notes application." },
  { question: "What actually works in the example?", answer: "You can filter the sample notes, search their contents, open a note, switch the example pricing period, and use the mobile navigation. The page does not create accounts, accept payments, or upload notes." },
  { question: "Can I use the layout for another product?", answer: "The kit is designed for adaptation. Replace the brand configuration, section content, product demonstration, and pricing examples with facts and material you have permission to use. Check the release license before redistribution." },
  { question: "Does the example store my information?", answer: "The supplied search field filters fixed example data. It does not save your query or send it to a plugin server. Hosting providers and any integrations you add have their own data practices." },
  { question: "Where do I change the brand?", answer: "Start in src/config/brand.ts. Section copy lives in src/data/content.ts, sample note behavior in src/services/DemoBoardService.ts, and visual tokens in src/app/globals.css." },
] as const;
