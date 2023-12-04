import fs from "node:fs/promises";

const file = await fs.readFile("input/day-3", {
  encoding: "utf-8",
});

const lines = file.split("\n");
console.log("Num *:", Array.from(file.matchAll(/(\*)/g)).length);
const symbol = /\*/;
const gears = new Map();
for (let i = 0; i < lines.length; i++) {
  const parts = lines[i].matchAll(/(\d+)/g);
  let part = parts.next();
  while (!part.done) {
    const num = parseInt(part.value[0]);
    const minIndex = Math.max(0, part.value.index - 1);
    const maxIndex = part.value.index + part.value[0].length + 1;
    const testLines = new Set([
      i,
      Math.max(0, i - 1),
      Math.min(i + 1, lines.length - 1),
    ]);
    testLines.forEach((line) => {
      const substr = lines[line].substring(minIndex, maxIndex);
      if (symbol.test(substr)) {
        const gearSubstring = substr.matchAll(/(\*)/g);
        if (gearSubstring) {
          let gear = gearSubstring.next();
          while (!gear.done) {
            let gearId = `${line}_${minIndex + gear.value.index}`;
            let cogs = [num];
            if (gears.has(gearId)) {
              cogs = [...gears.get(gearId), num];
            }
            gears.set(gearId, cogs);
            gear = gearSubstring.next();
          }
        }
      }
    });
    part = parts.next();
  }
}
console.log(gears);
console.log(
  Array.from(gears.values())
    .filter((x) => x.length >= 2)
    .reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue[0] * currentValue[1],
      0,
    ),
);
