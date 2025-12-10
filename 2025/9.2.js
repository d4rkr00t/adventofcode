import { getDist } from "../utils/getDist.js";
import { createIsInBounds } from "../utils/createIsInBounds.js";
import { getNextDirs } from "../utils/getNextDirs.js";

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

let allRows = new Set();
let allCols = new Set();

let colsByRow = {};
let rowsByCol = {};

for (let p of data) {
  let col = p[0];
  let row = p[1];
  allRows.add(row);
  allCols.add(col);

  colsByRow[row] = colsByRow[row] ?? [];
  colsByRow[row].push(col);

  rowsByCol[col] = rowsByCol[col] ?? [];
  rowsByCol[col].push(row);
}

let rowsMap = Array.from(allRows.values())
  .toSorted((a, b) => a - b)
  .reduce((acc, item, idx) => {
    acc[item] = idx + 1;
    return acc;
  }, {});

let colsMap = Array.from(allCols.values())
  .toSorted((a, b) => a - b)
  .reduce((acc, item, idx) => {
    acc[item] = idx + 1;
    return acc;
  }, {});

let field = Array.from({ length: allRows.size + 2 }, () =>
  Array.from({ length: allCols.size + 2 }, () => "."),
);

for (let p of data) {
  let col = colsMap[p[0]];
  let row = rowsMap[p[1]];
  field[row][col] = "X";
}

for (let i = 0; i < data.length; i++) {
  let [col, row] = data[i];
  let cols = colsByRow[row].toSorted((a, b) => a - b);
  let rows = rowsByCol[col].toSorted((a, b) => a - b);

  for (let c = col + 1; c < cols[1]; c++) {
    let cc = colsMap[c];
    let rr = rowsMap[row];
    if (cc) {
      field[rr][cc] = "X";
    }
  }
  for (let r = row + 1; r < rows[1]; r++) {
    let cc = colsMap[col];
    let rr = rowsMap[r];
    if (rr) {
      field[rr][cc] = "X";
    }
  }
}

floodFill();

function floodFill() {
  let isInBounds = createIsInBounds(field);
  let queue = [[0, 0]];
  while (queue.length) {
    let [row, col] = queue.pop();
    field[row][col] = "_";
    for (let [rr, cc] of getNextDirs(row, col)) {
      if (isInBounds(rr, cc) && field[rr][cc] === ".") {
        queue.push([rr, cc]);
      }
    }
  }
}

function calcArea(p1, p2) {
  const c1 = [p1[0], p2[1]];
  const c2 = [p2[0], p1[1]];

  let startRow = rowsMap[Math.min(p1[1], p2[1])];
  let endRow = rowsMap[Math.max(p1[1], p2[1])];
  let startCol = colsMap[Math.min(p1[0], p2[0])];
  let endCol = colsMap[Math.max(p1[0], p2[0])];

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      if (field[r][c] === "_") {
        return 0;
      }
    }
  }

  let t = getDist(p1, c1) * getDist(p1, c2);
  return t;
}

let res = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    res = Math.max(res, calcArea(data[i], data[j]));
  }
}

console.log("Max Area:", res);
