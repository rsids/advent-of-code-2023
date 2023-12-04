import fs from "node:fs/promises";

const file = await fs.readFile("input/day-1", { encoding: "utf-8" });
const numbers = file.split("\n").reduce((prev, current, idx) => {
  let n = current.match(/^\D*(\d).*?(\d)\D*$/);
  console.log(n);
  if (n === null) {
    n = current.match(/(\d)/);
    if (n !== null) {
      n = [0, n[1], n[1]];
    } else {
      n = [0, 0, 0];
    }
  }
  prev += parseInt(n[1] + n[2]);
  return prev;
}, 0);
console.log(numbers);
