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
let connections = 10;

data = await Deno.readTextFile("8.txt");
connections = 1000;

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
let clusters = {};
let clusterId = 0;

for (let i = 0; i < connections; i++) {
  let [f, d, t] = sortedByDist[i];
  clusters[f] = clusters[f] ?? new Set();
  clusters[t] = clusters[t] ?? new Set();
  clusters[f].add(t);
  clusters[t].add(f);
}

let cc = [];
let visited = new Set();
for (let k of Object.keys(clusters)) {
  if (!visited.has(k)) {
    cc.push(connect(Number(k), visited));
  }
}

function connect(k, visited) {
  let q = [k];
  let total = 0;
  visited.add(k);

  while (q.length) {
    let k = q.shift();
    total += 1;
    for (let ch of clusters[k].values()) {
      if (visited.has(ch)) continue;
      visited.add(ch);
      q.push(ch);
    }
  }

  return total;
}

console.log(
  cc
    .toSorted((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, item) => acc * item, 1),
);
