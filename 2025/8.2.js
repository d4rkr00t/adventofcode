import { UF } from "../utils/uf.js";

let data = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

data = await Deno.readTextFile("8.txt");

function getDist(p1, p2) {
  return Math.floor(
    Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) +
      Math.pow(p1[1] - p2[1], 2) +
      Math.pow(p1[2] - p2[2], 2),
    ),
  );
}

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(",").map(Number));

// Calc distances
let dists = [];

for (let i = 0; i < data.length; i++) {
  let p1 = data[i];
  for (let j = i + 1; j < data.length; j++) {
    let p2 = data[j];
    let dist = getDist(p1, p2);
    dists.push([i, dist, j]);
  }
}

let sortedByDist = dists.toSorted((a, b) => a[1] - b[1]);
let notConnected = new Set(data.map((item) => item.join(",")));
let uf = new UF();

let i = 0;
while (i < sortedByDist.length) {
  let [f, _, t] = sortedByDist[i];
  i++;

  uf.union(f, t);

  notConnected.delete(data[f].join(","));
  notConnected.delete(data[t].join(","));

  if (notConnected.size === 0 && uf.count() === 1) {
    console.log("Last", f, t, data[f][0] * data[t][0]);
    break;
  }
}
