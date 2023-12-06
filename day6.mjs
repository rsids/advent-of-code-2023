import fs from "node:fs/promises";

const file = await fs.readFile("input/day-6", {
  encoding: "utf-8",
});

const testInput = `Time:      7  15   30 2
Distance:  9  40  200 1`;

const lines = file.split("\n");

const times = lines[0]
  .split(" ")
  .join("")
  .match(/(\d+)$/);
const distances = lines[1]
  .split(" ")
  .join("")
  .match(/(\d+)$/);
const races = Array.from({ length: 1 }, (_, i) => ({
  time: parseInt(times[i + 1]),
  distance: parseInt(distances[i + 1]),
}));
console.log(races);
const winners = races
  .map((race) => {
    let winner = 0;
    for (let i = 0; i < race.time; i++) {
      if (calcDistance(i, race.time) > race.distance) {
        winner++;
      }
    }
    return winner;
  })
  .reduce((prev, current) => {
    return Math.max(1, prev) * Math.max(1, current);
  });
console.log(winners);

function calcDistance(held, total) {
  return held * (total - held);
}
