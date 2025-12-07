let data = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

data = await Deno.readTextFile("6.txt");

data = data
  .trim()
  .split("\n")
  .map(line => 
      line
        .trim()
        .replace(/\s+/, " ")
        .split(" ")
        .filter(Boolean)
        .map((item) => {
          let tmp = parseInt(item);
          if (isNaN(tmp)) {
            return item;
          }
          return tmp;
        }));

function getCol(idx) {
  return data.map(line => line[idx]);
}

// console.log(data);
// console.log(data.map(line => line.join(" ")).join("\n"));

// console.log(getCol(data[0].length-10))

let res = 0;

for (let colIdx = 0; colIdx < data[0].length; colIdx++) {
  let col = getCol(colIdx);
  let op = col.pop();
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
