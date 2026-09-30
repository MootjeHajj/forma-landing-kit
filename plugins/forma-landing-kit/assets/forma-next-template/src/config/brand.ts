export interface BrandConfig {
  name: string;
  headline: readonly [string, string];
  description: string;
  cta: string;
  demoNotice: string;
}

export const brand: BrandConfig = {
  name: "Forma",
  headline: ["Room for your ideas.", "Space to make them real."],
  description: "A quieter place for project notes, collected references, and the next small step. Bring the pieces together, then get back to making.",
  cta: "Explore the example",
  demoNotice: "Forma is a fictional product. This page demonstrates a reusable landing-page template.",
};
