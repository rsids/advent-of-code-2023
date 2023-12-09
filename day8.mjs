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

let current = "AAA";
let i = 0;
while (current !== "ZZZ") {
  const dir = instructions.charAt(i % instructions.length) === "L" ? 0 : 1;
  current = locations.get(current)[dir];
  console.log(current);
  i++;
}

console.log({ i });
