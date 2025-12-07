let data = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^...^
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

data = await Deno.readTextFile("7.txt");

data = data
  .trim()
  .split("\n")
  .map(line => line.trim().split(""));

let start = data[0].findIndex(el => el === "S");

let queue = [[0, start]];

let res = 0;

function inBounds(x, y) {
  return x < data.length && x >= 0 && y < data[x].length && y >= 0;
}

while (queue.length) {
  let [row, col] = queue.shift();
  let ch = data[row][col];
  if (ch !== "X" && ch !== "S") {
    data[row][col] = "|";
  }

  if (ch !== "^" && ch !== "X") {
    if (inBounds(row + 1, col)) {
      queue.push([row + 1, col]);
    }
    continue;
  }

  if (ch === "^") {
    data[row][col] = "X";
    res += 1;
  } else {
    continue;
  }

  if (inBounds(row, col + 1)) {
    data[row][col + 1] = "|";
    queue.push([row, col + 1]);
  }

  if (inBounds(row, col - 1)) {
    data[row][col - 1] = "|";
    queue.push([row, col - 1]);
  }
}

console.log(data.map(line => line.join(" ")).join("\n"));

console.log(res);


