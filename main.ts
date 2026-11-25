// One-Star Review of Something Essential — make.fun entry.
//
// Writes one deadpan one-star review of an everyday essential to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Gate: UTF-8 text, 1-160 characters, not only whitespace, single line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review. Sleep: the essential everyone pays eight hours a night for,
// and still wakes up tired. Deadpan throughout; the sting lands in the
// last three words.
const REVIEW =
  "★ Sleep: eight hours a night and I still wake up tired. Cancelled my subscription; it renewed anyway.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = REVIEW.trim();
if (text.length < 1 || text.length > 160) {
  throw new Error(`review must be 1-160 characters, got ${text.length}`);
}
// Deadpan rule: no exclamation marks, no winking, no explaining the joke.
// The sting lands in the last three words, after the complaint is read straight.
if (text.includes("!")) {
  throw new Error("deadpan review must not use exclamation marks");
}
if (text.length === 0) {
  throw new Error("review must not be only whitespace");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("review must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote entry.txt (${text.length} chars)`);
