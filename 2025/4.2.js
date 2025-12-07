let data = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

data = await Deno.readTextFile("4.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => {
    return line.trim().split("");
  });

let queue = [];

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[row].length; col++) {
    if (data[row][col] === ".") { 
      continue;
    }

    if (valid(row,col)) {
      queue.push([row, col]);
    }
  }
}

let res = 0;
let removed = new Set();
while (queue.length) {
  let [row,col] = queue.pop();
  if (!removed.has(`${row}|${col}`)) {
    res++;
    removed.add(`${row}|${col}`);
  }
  data[row][col] = ".";
  let tmp = getRolls(row, col);
  for (let [r,c] of tmp) {
    if (data[r][c] === ".") {
      continue;
    }

    if (valid(r,c)) {
      data[r][c] = ".";
      queue.push([r,c]);
    }
  }
}


function valid(row, col) {
  let tmp = 0;
  for (let [x,y] of [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]]) {
    let rx = row + x;
    let cy = col + y;
    if (!inBounds(rx, cy) || data[rx][cy] === ".") {
      continue;
    } 
    tmp++;
  }
  return tmp < 4;
}

function getRolls(row, col) {
  let tmp = [];
  for (let [x,y] of [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1,-1], [0,-1]]) {
    let rx = row + x;
    let cy = col + y;
    if (inBounds(rx, cy) && data[rx][cy] === "@") {
      tmp.push([rx, cy])
    } 
  }
  return tmp;
}

function inBounds(row, col) {
  return row >= 0 && row < data.length && col >= 0 && col < data[row].length;
}

console.log(res);
