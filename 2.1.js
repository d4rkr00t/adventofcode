let data = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

data = await Deno.readTextFile("2.txt");

data = data
  .trim()
  .split(",")
  .map((line) => {
    return line.trim().split("-").map(Number);
  });

// console.log(data);
// console.log(data.length);

let res = 0;

for (let [s, e] of data) {
  let q = [0];
  let seen = new Set();
  while (q.length) {
    let cur = q.pop();

    for (let i = 0; i <= 9; i++) {
      let next = cur * 10 + i;
      let nn = parseInt("" + next + "" + next);
      if (nn > e || seen.has(next)) continue;

      q.push(next);
      seen.add(next);

      if (nn >= s && nn <= e) {
        res += nn;
      }
    }
  }
}

console.log(res);
