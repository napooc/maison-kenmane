import fs from "node:fs";
import path from "node:path";

const targets = [
  ".next",
  ".turbo",
  // Next/webpack caches (can corrupt on Windows and lead to missing chunk modules)
  path.join("node_modules", ".cache", "next"),
  path.join("node_modules", ".cache", "webpack"),
];

for (const target of targets) {
  const p = path.join(process.cwd(), target);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
    console.log(`removed ${target}`);
  }
}
