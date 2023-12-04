import fs from "node:fs/promises";

const file = await fs.readFile("input/day-2", { encoding: "utf-8" });

const ids = file.split("\n").reduce((prev, current) => {
  const minimum = { red: 0, green: 0, blue: 0 };
  const parts = current.split(":");
  parts[1].split(/;|,/).forEach((cubes) => {
    const colored = cubes.match(/(\d+) (red|green|blue)/);
    minimum[colored[2]] = Math.max(minimum[colored[2]], parseInt(colored[1]));
  });

  prev += minimum.red * minimum.blue * minimum.green;
  return prev;
}, 0);
console.log(ids);
