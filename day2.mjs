import fs from "node:fs/promises";

const file = await fs.readFile("input/day-2", { encoding: "utf-8" });
const test = {
  red: 12,
  green: 13,
  blue: 14,
};
const ids = file.split("\n").reduce((prev, current) => {
  let valid = true;
  const parts = current.split(":");
  parts[1].split(/;|,/).forEach((cubes) => {
    const colored = cubes.match(/(\d+) (red|green|blue)/);
    if (parseInt(colored[1]) > test[colored[2]]) {
      valid = false;
    }
  });

  if (valid) {
    prev += parseInt(parts[0].substring(5));
  }
  return prev;
}, 0);
console.log(ids);
