import fs from "node:fs/promises";

const file = await fs.readFile("input/day-5", {
  encoding: "utf-8",
});

const lines = file.split("\n");
let seeds = [];
let mapTypes = [];
let maps = {};
let mapType = "";
lines.forEach((line) => {
  if (line.startsWith("seeds")) {
    seeds = line
      .substring(7)
      .split(" ")
      .map((x) => parseInt(x));
  } else if (line.endsWith(" map:")) {
    mapType = line.split(" ").shift();
    mapTypes.push(mapType);
    maps[mapType] = [];
  } else if (line.trim() !== "") {
    const input = line.split(" ").map((x) => parseInt(x));
    maps[mapType].push({
      min: input[1],
      max: input[1] + input[2],
      offset: input[0] - input[1],
    });
  }
});

let lowest = seeds.reduce((current, seed) => {
  let location = mapTypes.reduce((input, map) => getAForB(input, map), seed);
  return Math.min(current, location);
}, Number.POSITIVE_INFINITY);

function getAForB(b, type) {
  const mapped = maps[type].find((s) => s.min <= b && s.max >= b);
  if (mapped) {
    return b + mapped.offset;
  }
  return b;
}

console.log(lowest);
