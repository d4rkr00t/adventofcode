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

let prevLineNums = [];
for (let i = 0; i < data[0].length; i++) {
  if (data[0][i] !== "S") {
    prevLineNums.push(0);
  } else {
    prevLineNums.push(1);
  }
}

for (let i = 1; i < data.length; i++) {
  let line = data[i];
  let nextLineNums = [];
  for (let j = 0; j < line.length; j++) {
    let ch = line[j];
    if (ch === "^") {
      nextLineNums.push(prevLineNums[j]);
    } else if (ch === ".") {
      let tmp = 0;
      if (data[i - 1][j] === "^") {
        nextLineNums.push(0);
        continue;
      }
      if (data[i - 1][j] === "." || data[i - 1][j] === "S") {
        tmp += prevLineNums[j];
      }
      if (inBounds(i - 1, j - 1) && data[i - 1][j - 1] === "^") {
        tmp += prevLineNums[j - 1];
      }
      if (inBounds(i - 1, j + 1) && data[i - 1][j + 1] === "^") {
        tmp += prevLineNums[j + 1];
      }
      nextLineNums.push(tmp);
    }
  }

  prevLineNums = nextLineNums;
}


console.log(prevLineNums.reduce((acc, item) => acc + item, 0));

function inBounds(x, y) {
  return x < data.length && x >= 0 && y < data[x].length && y >= 0;
}
