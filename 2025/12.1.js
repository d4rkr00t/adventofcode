let data = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###
-
4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

data = await Deno.readTextFile("12.txt");

let [shapes, regions] = data.split("-");

shapes = shapes
  .trim()
  .split("\n\n")
  .reduce((acc, shape) => {
    let [id, ...sh] = shape.split("\n");
    let shape0 = sh.map((line) => line.trim().split(""));

    acc[id.trim().replace(":", "")] = shape0.reduce((acc, line) => {
      acc += line.filter((ch) => ch === "#").length;
      return acc;
    }, 0);

    return acc;
  }, {});

regions = regions
  .trim()
  .split("\n")
  .map((line) => {
    let [size, gifts] = line.split(": ");
    return {
      size: size.split("x").map(Number),
      gifts: gifts.split(" ").map(Number),
    };
  });

let res = 0;
for (let region of regions) {
  if (solveRegion(region)) {
    res += 1;
  }
}
console.log(res);

function solveRegion(region) {
  let rArea = region.size[0] * region.size[1];
  let need = 0;

  for (let i = 0; i < region.gifts.length; i++) {
    let g = region.gifts[i];
    need += g * shapes[i];
  }

  return rArea >= need;
}
