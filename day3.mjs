import fs from "node:fs/promises";

const file = await fs.readFile("input/day-3", { encoding: "utf-8" });

const lines = file.split("\n");
const symbol = /[^.\d]/;
let total = 0;
for (let i = 0; i < lines.length; i++) {
  const parts = lines[i].matchAll(/(\d+)/g);
  let part = parts.next();
  while (!part.done) {
    const num = parseInt(part.value[0]);
    const minIndex = part.value.index - 1;
    const maxIndex = part.value.index + part.value[0].length + 1;
    const testLines = new Set([
      i,
      Math.max(0, i - 1),
      Math.min(i + 1, lines.length - 1),
    ]);
    testLines.forEach((line) => {
      if (symbol.test(lines[line].substring(minIndex, maxIndex))) {
        total += num;
      }
    });
    part = parts.next();
  }
}
console.log(total);
