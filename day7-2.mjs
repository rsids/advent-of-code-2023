import fs from "node:fs/promises";
import "core-js/actual/object/group-by.js";

const file = await fs.readFile("input/day-7", {
  encoding: "utf-8",
});

const lines = file.split("\n");

const replaceMap = {
  T: "B",
  J: "1",
  Q: "C",
  K: "D",
  A: "E",
};

const result = lines.map((line) => processInput(line)).sort(sortResults);
const totalWinnings = result.reduce(
  (total, hand, i) => total + (i + 1) * hand.bid,
  0,
);
console.log(totalWinnings);

function processInput(input) {
  let [cards, bid] = input.split(" ");
  let value = parseInt(
    cards
      .replaceAll(/\w/g, (C) => (isNaN(parseInt(C)) ? replaceMap[C] : C))
      .split("")
      .map((x) => x.charCodeAt(0))
      .join(""),
  );
  cards = cards === "JJJJJ" ? "22222" : cards;
  const hand = cards
    .split("")
    .filter((x) => x !== "J")
    .map((card) => ({ card }));
  const result = {
    hand: Object.values(Object.groupBy(hand, ({ card }) => card)).sort(
      (a, b) => b.length - a.length,
    ),

    bid: parseInt(bid),
    cards,
    value,
  };
  // return result;
  return applyJokers(result);
}

function applyJokers(result) {
  const jokers = Array.from(result.cards.matchAll(/J/g));
  result.hand[0] = [
    ...result.hand[0],
    ...jokers.map(() => ({
      card: "J",
    })),
  ];
  if (result.cards === "JJ56K") {
    console.log("BRAK");
  }
  result.hand = result.hand.filter((x, i) => {
    return i === 0 || x[0].card !== "J";
  });
  return result;
}

function sortResults(a, b) {
  const aLengths = a.hand.map((x) => x.length).join("|");
  const bLengths = b.hand.map((x) => x.length).join("|");
  console.log(`A: ${a.cards} ${aLengths} / B: ${b.cards} ${bLengths}`);
  if (a.hand.length === b.hand.length) {
    if (
      a.hand.length === 1 ||
      a.hand.length === 5 ||
      a.hand[1].length === b.hand[1].length
    ) {
      return a.value - b.value;
    }

    return b.hand[1].length - a.hand[1].length;
  }
  return b.hand.length - a.hand.length;
}
