import fs from "node:fs/promises";

const file = await fs.readFile("input/day-1", { encoding: "utf-8" });
const nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const numbers = file.split("\n").reduce((prev, current) => {
  let n = current.match(
    /^.*?(one|two|three|four|five|six|seven|eight|nine|\d).*(one|two|three|four|five|six|seven|eight|nine|\d).*?$/,
  );
  let add = 0;
  if (n === null) {
    n = current.match(/(one|two|three|four|five|six|seven|eight|nine|\d)/);
    if (n !== null) {
      add = parseInt(n[1]) || nums.indexOf(n[1]);
      add = parseInt(`${add}${add}`);
    }
  } else {
    add = parseInt(
      `${parseInt(n[1]) || nums.indexOf(n[1])}${
        parseInt(n[2]) || nums.indexOf(n[2])
      }`,
    );
  }
  prev += add;
  return prev;
}, 0);
console.log(numbers);
