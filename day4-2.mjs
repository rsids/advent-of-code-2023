import fs from "node:fs/promises";

const file = await fs.readFile("input/day-4", {
  encoding: "utf-8",
});

const lines = file.split("\n");
let total = 0;
const copies = new Map(lines.map((_, i) => [i, 1]));
const entries = lines.entries();
let scratchCard = entries.next();
let processed = 0;
while (!scratchCard.done) {
  processed++;
  const card = scratchCard.value[1].split(":").pop();
  let [winning, ticket] = card.split("|");
  winning = winning
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));
  ticket = ticket
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => parseInt(x));

  ticket
    .filter((v) => winning.includes(v))
    .forEach((_, idx) => {
      const t = copies.get(scratchCard.value[0] + 1 + idx);
      copies.set(scratchCard.value[0] + 1 + idx, t + 1);
    });

  if (copies.get(scratchCard.value[0]) === processed) {
    processed = 0;
    scratchCard = entries.next();
  }
}
total = Array.from(copies.values()).reduce((p, c) => p + c, 0);
console.log(total);
