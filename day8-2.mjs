import fs from "node:fs/promises";
import "core-js/actual/object/group-by.js";

const file = await fs.readFile("input/day-8", {
  encoding: "utf-8",
});

const lines = file.split("\n");

const instructions = lines.shift();
lines.shift();

const locations = new Map(getLocations(lines));

function getLocations(lines) {
  return lines.map((line) => {
    return [
      line.substring(0, 3),
      [line.substring(7, 10), line.substring(12, 15)],
    ];
  });
}
let currents = Array.from(locations.entries())
  .map((e) => e[0])
  .filter((l) => l.endsWith("A"));
let steps = currents.map(() => ({
  steps: 0,
  total: 0,
}));
let i = 0;
while (true) {
  const dir = instructions.charAt(i % instructions.length) === "L" ? 0 : 1;
  currents = currents.map((current) => locations.get(current)[dir]);
  i++;
  currents.forEach((c, j) => {
    if (c.endsWith("Z") && steps[j].steps === 0) {
      steps[j].steps = i;
      steps[j].total = i;
    }
  });
  if (steps.every((x) => x.steps > 0)) {
    break;
  }
}
console.time("find");
while (true) {
  steps = steps.sort((a, b) => a.total - b.total);
  steps[0].total += steps[0].steps;
  if (steps.every((s) => s.total === steps[0].total)) {
    console.log({ steps });
    console.timeEnd("find");
    process.stdout.write("\x07");
    break;
  }
}
