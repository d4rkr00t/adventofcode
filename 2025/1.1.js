let data = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

data = await Deno.readTextFile("1.txt");

let cur = 50;

data = data.split("\n").map((line) => {
  let [dir, ...clicks] = line.trim().split("");
  return [dir, parseInt(clicks.join(""))];
});

let res = 0;

for (let [dir, clicks] of data) {
  if (dir === "R") {
    cur = (cur + clicks) % 100;
  } else if (dir === "L") {
    cur = positiveModulo(cur - clicks, 100);
  }

  if (cur === 0) {
    res += 1;
  }
}

console.log(res);

function positiveModulo(dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor;
}
