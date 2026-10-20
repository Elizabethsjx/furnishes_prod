#!/usr/bin/env node
// Rebuild public/examples/family-apartment.html from examples-src/family-apartment/app.js.
//
// The page is a single self-contained file: an HTML shell, then one module script that
// holds the minified Three.js bundle followed by the application code. This script keeps
// the shell and the bundle as they are and replaces everything from the application's
// first function (APP_MARKER) to the end of that script with app.js.
//
// Usage: node scripts/build-family-apartment.mjs [--check]
//   --check  exit 1 if the page is out of date instead of writing it

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(import.meta.url), "..", "..");
const pagePath = resolve(repoRoot, "public/examples/family-apartment.html");
const sourcePath = resolve(repoRoot, "examples-src/family-apartment/app.js");
const SCRIPT_OPEN = '<script type="module">';
const SCRIPT_CLOSE = "</script>";
const APP_MARKER = "function Lu(";

const page = readFileSync(pagePath, "utf8");
const source = readFileSync(sourcePath, "utf8");

const scriptStart = page.indexOf(SCRIPT_OPEN);
if (scriptStart < 0) throw new Error("module script not found in the page");
const bodyStart = scriptStart + SCRIPT_OPEN.length;
const bodyEnd = page.indexOf(SCRIPT_CLOSE, bodyStart);
const body = page.slice(bodyStart, bodyEnd);

// The application starts at the first APP_MARKER that follows a header comment, or at the
// first APP_MARKER for pages built before the header existed.
const headerAt = body.indexOf("// Family apartment 3D example");
const appStart = headerAt >= 0 ? headerAt : body.indexOf(APP_MARKER);
if (appStart < 0)
  throw new Error(`application marker "${APP_MARKER}" not found`);
if (source.includes(SCRIPT_CLOSE))
  throw new Error("app.js must not contain </script>");

const rebuilt =
  page.slice(0, bodyStart) +
  body.slice(0, appStart) +
  source +
  page.slice(bodyEnd);

if (process.argv.includes("--check")) {
  if (rebuilt !== page) {
    console.error(
      "family-apartment.html is out of date; run pnpm build:family-apartment",
    );
    process.exit(1);
  }
  console.log("family-apartment.html is up to date");
} else {
  writeFileSync(pagePath, rebuilt);
  console.log(`wrote ${pagePath} (${(rebuilt.length / 1e6).toFixed(2)} MB)`);
}
