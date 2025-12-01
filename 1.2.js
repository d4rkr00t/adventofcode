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

data = data
  .trim()
  .split("\n")
  .map((line) => {
    let [dir, ...clicks] = line.trim().split("");
    return [dir, parseInt(clicks.join(""))];
  });

let res = 0;

for (let [dir, clicks] of data) {
  let prev = cur;
  let fullCircles = Math.floor(clicks / 100);
  let leftOver = clicks - fullCircles * 100;
  let tmp = cur + (dir === "R" ? leftOver : -leftOver);

  res += fullCircles;
  cur = positiveModulo(tmp, 100);

  if (tmp < 0 && prev > 0) {
    res += 1;
  } else if (tmp > 99 && cur !== 0) {
    res += 1;
  }

  if (cur === 0) {
    res += 1;
  }
}

console.log(res);

function positiveModulo(dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor;
}
