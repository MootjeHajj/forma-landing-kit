import { cp, mkdir, readdir, realpath, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

class SiteScaffolder {
  constructor(templateRoot) { this.templateRoot = templateRoot; }

  async scaffold(destination) {
    const source = await realpath(this.templateRoot);
    const target = resolve(destination);
    const targetFromSource = relative(source, target);
    if (!targetFromSource || (!targetFromSource.startsWith(`..${sep}`) && targetFromSource !== ".." && !isAbsolute(targetFromSource))) {
      throw new Error("Choose a destination outside the bundled template.");
    }
    const sourceFromTarget = relative(target, source);
    if (!sourceFromTarget || (!sourceFromTarget.startsWith(`..${sep}`) && sourceFromTarget !== ".." && !isAbsolute(sourceFromTarget))) {
      throw new Error("Choose a destination that does not contain the bundled template.");
    }
    let existing;
    try { existing = await stat(target); } catch (error) { if (error.code !== "ENOENT") throw error; }
    if (existing && (!existing.isDirectory() || (await readdir(target)).length)) {
      throw new Error("Destination must be a new or empty folder. Existing projects are never overwritten.");
    }
    await mkdir(target, { recursive: true });
    const excluded = new Set(["node_modules", ".next", ".git", "out"]);
    await cp(source, target, {
      recursive: true,
      filter: path => !relative(source, path).split(sep).some(part => excluded.has(part) || part.endsWith(".tsbuildinfo")),
    });
    console.log(`Forma example created at ${target}`);
    console.log("Next: npm ci, adapt your brand, then run lint, typecheck, build, and desktop/mobile verification.");
  }
}

const destination = process.argv[2];
if (!destination) {
  console.error("Usage: node scripts/new-forma-site.mjs <destination>");
  process.exitCode = 1;
} else {
  const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  try { await new SiteScaffolder(join(pluginRoot, "assets", "forma-next-template")).scaffold(destination); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
