import { writeFileSync, mkdirSync } from "node:fs";

// One-line office joke for make.fun's "One-Line Office Jokes".
// It turns on a real detail of office life, the reply-all storm, and lands
// the laugh in the last few words: forty people replying all to confirm
// they understood the email telling them to stop replying all.
const JOKE =
  "HR emailed everyone to stop replying all, and forty people replied all to confirm they understood.";

// The gate only accepts UTF-8 text of 1 to 199 characters that is not
// whitespace-only, so verify the joke meets the gate before writing it.
const chars = [...JOKE].length;
if (chars < 1 || chars > 199 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${chars} characters, outside the 1-199 gate`);
}

// The entry is one line: a newline would split the joke, and an em or en
// dash would break the tight read the judge weighs, so refuse both, along
// with any leading or trailing whitespace that would pad the count.
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}
if (/[\u0000-\u001f\u007f]/.test(JOKE)) {
  throw new Error("joke must not contain control characters");
}
if (JOKE.includes("\u2014") || JOKE.includes("\u2013")) {
  throw new Error("joke must not contain a dash");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("joke must not start or end with whitespace");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");
