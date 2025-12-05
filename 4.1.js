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

// console.log(data);

let res = 0;

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[row].length; col++) {
    if (data[row][col] === ".") { 
      continue;
    }

    if (valid(row,col)) {
      res++;
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

function inBounds(row, col) {
  return row >= 0 && row < data.length && col >= 0 && col < data[row].length;
}

console.log(res);
