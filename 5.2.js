let data = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

data = await Deno.readTextFile("5.txt");

let [ranges, ingr] = data
  .trim().split("\n\n")

ranges = ranges
    .split("\n")
    .map((line) => line.split("-").map(Number))
    .toSorted((a,b) => a[0] - b[0])

let mergedRanges = [];

for (let [s,e] of ranges) {
  if (!mergedRanges.length) {
    mergedRanges.push([s,e]);
    continue;
  }
  let [sp,ep] = mergedRanges.pop();

  if (s <= ep && e >= sp) {
    mergedRanges.push([Math.min(s, sp), Math.max(e, ep)]);
  } else {
    mergedRanges.push([sp,ep]);
    mergedRanges.push([s,e]);
  }
}

// console.log(mergedRanges);

let res = 0;

for (let [s,e] of mergedRanges) {
    res += (e-s) + 1;
}


console.log(res);
