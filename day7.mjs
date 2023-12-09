import fs from "node:fs/promises";
import "core-js/actual/object/group-by.js";

const file = await fs.readFile("input/day-7", {
  encoding: "utf-8",
});

const lines = file.split("\n");

const replaceMap = {
  T: "B",
  J: "C",
  Q: "D",
  K: "E",
  A: "F",
};

const result = lines
  .map((line) => inputToObject(line))
  .sort((a, b) => a.points - b.points);
const totalWinnings = result.reduce(
  (total, hand, i) => total + (i + 1) * hand.bid,
  0,
);
console.log(totalWinnings);

function inputToObject(input) {
  let [cards, bid] = input.split(" ");
  let replacedCard = cards.replaceAll(/\w/g, (C) => {
    return isNaN(parseInt(C)) ? replaceMap[C] : C;
  });
  let value = replacedCard
    .split("")
    .map((card) => card.charCodeAt(0))
    .join("");
  bid = parseInt(bid);
  const hand = replacedCard
    .split("")
    .map((card) => card.charCodeAt(0))
    .map((card) => ({ card }));
  const result = {
    hand: Object.values(Object.groupBy(hand, ({ card }) => card)).sort(
      (a, b) => b.length - a.length,
    ),
    bid,
    value,
  };
  return calcResult(result);
}

function calcResult(result) {
  //1AABBCCDDEE
  let points = "0";
  if (result.hand.length === 1) {
    // 5 of a kind
    points = `6`;
  } else if (result.hand.length === 2) {
    // 4 of a kind / full house
    points = result.hand[0].length === 4 ? "5" : "4";
  } else if (result.hand.length === 3) {
    // 3 of a kind / 2 pair
    points = result.hand[0].length === 3 ? "3" : "2";
  } else if (result.hand.length === 4) {
    points = "1";
  }
  points += result.value;
  return { ...result, points };
}
