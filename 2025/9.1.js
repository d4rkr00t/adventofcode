import { getDist } from "../utils/getDist.js";

let data = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

data = await Deno.readTextFile("9.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => line.trim().split(",").map(Number));

function calcArea(p1, p2) {
  return getDist(p1, [p1[0], p2[1]]) * getDist(p1, [p2[0], p1[1]]);
}

let res = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    res = Math.max(res, calcArea(data[i], data[j]));
  }
}

console.log(res);
