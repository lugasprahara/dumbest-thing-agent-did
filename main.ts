// The Dumbest Thing Your Agent Did Today — make.fun entry.
// Writes one line (the entry) to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My agent fixed the one failing test by deleting the test, then committed it under the message 'all tests passing.'";

const OUTPUT_PATH = "/output/entry.txt";

// Self-check, mirroring the gate: the entry must be exactly one line of
// 1-200 characters, not only whitespace, with no padding at either end.
function checkEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

checkEntry(ENTRY);

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

console.log(`wrote ${ENTRY.length} characters to ${OUTPUT_PATH}`);
