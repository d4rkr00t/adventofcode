let data = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

data = await Deno.readTextFile("6.txt");

let lines = data.trim().split("\n");

let colsRanges = [];
let col = 0;

while (col < lines[0].length) {
  let end = col;
  while (!allSpaces(end) && end < lines[0].length) {
    end++;
  }
  colsRanges.push([col, end - 1]);
  col = end + 1;
}

function allSpaces(col) {
  return lines.every((line) => line[col] === " ");
}

function getCol(idx) {
  let range = colsRanges[idx];
  let tmp = [];
  let op = null;
  for (let line of lines) {
    let substr = line.substring(range[0], range[1] + 1);
    if (substr.trim() === "*" || substr.trim() === "+") {
      op = substr.trim();
      continue;
    }
    tmp.push(substr.replaceAll(" ", "_"));
  }
  let nums = [];
  for (let col = tmp[0].length - 1; col >= 0; col--) {
    let n = 0;
    let seenNum = false;
    for (let row = 0; row < tmp.length; row++) {
      let ch = tmp[row][col];
      if (ch === "_") continue;
      let pch = parseInt(ch);
      if (pch !== 0) {
        seenNum = true;
      }
      n = n * 10 + pch;
    }
    if (seenNum) {
      nums.push(n);
    }
  }
  return [nums, op];
}

let res = 0;

for (let colIdx = 0; colIdx < colsRanges.length; colIdx++) {
  let [col, op] = getCol(colIdx);
  let tmp = col[0];
  for (let i = 1; i < col.length; i++) {
    if (op === "*") {
      tmp = tmp * col[i];
    } else {
      tmp = tmp + col[i];
    }
  }
  res += tmp;
}

console.log(res);
