let data = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

data = await Deno.readTextFile("11.txt");

data = data
  .trim()
  .split("\n")
  .reduce((acc, line) => {
    let [from, rest] = line.trim().split(": ");
    let to = rest.split(" ");
    acc[from] = to;
    return acc;
  }, {});

let from = "svr";
let tgt = "out";
let cache = {};
let cacheKey = (cur, fft, dac) => `${cur}|${fft}${dac}`;

function dfs(cur, fft, dac) {
  let kk = cacheKey(cur, fft, dac);
  if (kk in cache) {
    return cache[kk];
  }

  let res = 0;
  for (let con of data[cur]) {
    if (con === "out") {
      res += fft && dac ? 1 : 0;
      continue;
    }
    res += dfs(con, con === "fft" ? true : fft, con === "dac" ? true : dac);
  }

  cache[kk] = res;
  return res;
}

console.log(dfs(from, false, false));
