/**
 * Doesnt work :(
 */
import fs from "node:fs/promises";

const file = await fs.readFile("input/day-5", {
  encoding: "utf-8",
});
const lines = file.split("\n");
let seeds = [];
let mapTypes = [];
let maps = {};
let mapType = "";
lines.forEach((line) => {
  if (line.startsWith("seeds")) {
    seeds = line
      .substring(7)
      .split(" ")
      .map((x) => parseInt(x));
  } else if (line.endsWith(" map:")) {
    mapType = line.split(" ").shift();
    mapTypes.push(mapType);
    maps[mapType] = [];
  } else if (line.trim() !== "") {
    const input = line.split(" ").map((x) => parseInt(x));
    const [source, _, dest] = mapType.split("-");
    const map = {
      min: input[0],
      max: input[0] + input[2],
      offset: input[1] - input[0],
      source,
      dest,
    };
    map[`dest_min`] = input[0];
    map[`dest_max`] = input[0] + input[2];
    map[`source_min`] = input[1];
    map[`source_max`] = input[1] + input[2];
    maps[mapType].push(map);
  }
});

mapTypes.forEach((m) => {
  maps[m].sort((a, b) => a.min - b.min);
});

const reversedMapTypes = [...mapTypes].reverse();

let seedRanges = [];
while (seeds.length > 0) {
  seedRanges.push(seeds.splice(0, 2));
}
seedRanges = seedRanges
  .sort((a, b) => a[0] - b[0])
  .map((c) => {
    return [c[0], c[0] + c[1], c[1]];
  });

const locations = maps["humidity-to-location"];
const filteredMaps = {
  "humidity-to-location": [locations[0], locations[1]],
};
const start = reversedMapTypes.shift();
reversedMapTypes.reduce((prev, type) => {
  filteredMaps[type] = filteredMaps[prev]
    .reduce((f, map) => {
      return [
        ...f,
        ...filterSourceForDest(map.source_min, map.source_max, type),
      ];
    }, [])
    .sort((a, b) => a.min - b.min);
  return type;
}, start);

let ranges = Array.from(
  new Set(
    filteredMaps["seed-to-soil"].map((sts) =>
      JSON.stringify([sts.min, sts.max]),
    ),
  ),
);

ranges = mergeRanges(ranges.map((x) => JSON.parse(x)));
const validSeedsRanges = intersectRanges(seedRanges, ranges);

let lowest = validSeedsRanges.reduce((current, seed) => {
  let minSeed = 177942185; //Number.POSITIVE_INFINITY;
  for (let i = seed[0], j = 0; i < seed[1]; i++, j++) {
    if (j % 10000 === 0) {
      console.log(`Processed ${j} (${i}) seeds`);
    }
    let location = mapTypes.reduce(
      (input, map) => getDestForSource(input, map),
      i,
    );
    if (location > 0) minSeed = Math.min(minSeed, location);
  }
  console.log(`Current location: ${Math.min(current, minSeed)}`);
  return Math.min(current, minSeed);
}, Number.POSITIVE_INFINITY);

function filterSourceForDest(min, max, type) {
  return maps[type]
    .filter((map) => {
      return map[`dest_min`] <= max && map[`dest_max`] >= min;
    })
    .map((value) => {
      if (value.max > max) {
        value.max = value.min + (max - value.min);
        value[`dest_max`] = value.max;
        value[`source_max`] = value.max + value.offset;
      }
      if (value.min < min) {
        value.min = min;
        value.dest_min = min;
      }
      return value;
    });
}

function getDestForSource(value, type) {
  const mapped = maps[type].find(
    (s) => s[`source_min`] <= value && s[`source_max`] >= value,
  );
  if (mapped) {
    return value + mapped.offset;
  }
  // console.log(`No dest found for ${type} with value ${value}`);
  return value;
}
function getSourceForDest(value, type) {
  const mapped = maps[type].find(
    (s) => s[`dest_min`] <= value && s[`dest_max`] >= value,
  );
  let c = value;
  if (mapped) {
    c = value + mapped.offset;
  } else {
    console.log(`No source found for ${type} with value ${value}`);
  }
  return c;
}

function mergeRanges(ranges) {
  const merged = [ranges[0]];
  ranges.forEach((range) => {
    if (range[0] <= merged.at(-1)[1]) {
      // Start of range is within last range
      if (range[1] > merged.at(-1)[1]) {
        // End of range exceeds current range
        merged.at(-1)[1] = range[1];
      }
    } else {
      merged.push(range);
    }
  });
  return merged;
}

function intersectRanges(rangeA, rangeB) {
  const intersected = [];
  rangeA.forEach((itemA) => {
    rangeB.forEach((itemB) => {
      if (itemB[0] < itemA[0]) {
        // B starts before A
        if (itemB[1] < itemA[1]) {
          // B ends before A, do nothing
        } else {
          intersected.push([itemA[0], itemB[1]]);
        }
      } else if (itemB[0] > itemA[1]) {
        // B starts after A, do nothing
      } else {
        intersected.push([itemB[0], Math.min(itemA[1], itemB[1])]);
      }
    });
  });
  return mergeRanges(intersected);
}

console.log(lowest);
