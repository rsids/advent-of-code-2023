import fs from "node:fs/promises";

const file = await fs.readFile("input/day-9", {
  encoding: "utf-8",
});

function processLine(input) {
  const output = [];
  let total = 0;
  input[0].reduce((prev, current) => {
    total += current - prev;
    output.push(current - prev);
    return current;
  });
  const result = [output, ...input];
  if (total === 0) return result;
  return processLine(result);
}

console.time("perf");
const result = file
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => [line.split(" ").map((x) => x * 1)])
  .map((line) =>
    processLine(line).reduce((prev, current) => {
      current.unshift(current.at(0) - prev.at(0));
      return current;
    }),
  )
  .reduce((prev, current) => prev + current.at(0), 0);
console.log({ result });
console.timeEnd("perf");
