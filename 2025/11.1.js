let data = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

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

function bfs() {
  let res = 0;
  let queue = [["you", "you"]];
  let visited = new Set(["you"]);
  let tgt = "out";

  while (queue.length) {
    let [cur, path] = queue.shift();
    if (cur === tgt) {
      res++;
      continue;
    }

    for (let to of data[cur] ?? []) {
      let nextPath = path + "|" + to;
      if (visited.has(nextPath)) continue;
      visited.add(nextPath);
      queue.push([to, nextPath]);
    }
  }

  return res;
}

// console.log(data);

console.log(bfs());
