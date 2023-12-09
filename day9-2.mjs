import fs from "node:fs/promises";
import "core-js/actual/object/group-by.js";

const file = await fs.readFile("input/day-9", {
  encoding: "utf-8",
});
console.time("perf");
const result = file
  .split("\n")
  .filter((line) => line.trim().length > 0)
  .map((line) => [line.split(" ").map((x) => x * 1)])
  .map((line) => {
    const processed = processLine(line);
    const reduced = processed.reduce((prev, current) => {
      current.unshift(current.at(0) - prev.at(0));
      return current;
    });
    return reduced;
  })
  .reduce((prev, current) => prev + current.at(0), 0);
console.log({ result });
console.timeEnd("perf");
function processLine(input) {
  const output = [];
  input[0].reduce((prev, current) => {
    output.push(current - prev);
    return current;
  });
  const result = [output, ...input];
  if (output.every((x) => x === 0)) {
    return result;
  }
  return processLine(result);
}
