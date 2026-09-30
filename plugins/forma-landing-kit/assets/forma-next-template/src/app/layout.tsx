import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forma — Room for your ideas",
  description: "A fictional project-notes product demonstrating the Forma Landing Kit. Original graphics, responsive sections, and an interactive example workspace.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
