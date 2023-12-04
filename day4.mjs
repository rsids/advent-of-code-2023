import fs from "node:fs/promises";

const file = await fs.readFile("input/day-4", {
  encoding: "utf-8",
});

const lines = file.split("\n");
let total = 0;
lines.forEach((line) => {
  const card = line.split(":").pop();
  let [winning, ticket] = card.split("|");
  winning = winning
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));
  ticket = ticket
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));

  const price = ticket.filter((v) => winning.includes(v));
  if (price.length > 0) {
    const points = price.reduce((p, _) => p * 2, 1) / 2;
    total += points;
  }
});
console.log(total);
