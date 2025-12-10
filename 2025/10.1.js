let data = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

data = await Deno.readTextFile("10.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => {
    let state = null;
    let wiring = [];
    let joltage = [];
    let segments = line.trim().split(" ");
    for (let seg of segments) {
      if (seg.startsWith("[")) {
        state = seg.substring(1, seg.length - 1).split("");
      }
      if (seg.startsWith("(")) {
        wiring.push(
          seg
            .substring(1, seg.length - 1)
            .split(",")
            .map(Number),
        );
      }
      if (seg.startsWith("{")) {
        joltage = seg
          .substring(1, seg.length - 1)
          .split(",")
          .map(Number);
      }
    }
    return {
      state,
      wiring,
      joltage,
    };
  });

// console.log(data);

let res = 0;
for (let m of data) {
  res += solve(m);
}
console.log(res);

function compare(s1, s2) {
  return s1.join(",") === s2.join(",");
}

function solve(m) {
  let queue = [[Array.from({ length: m.state.length }, () => "."), 0]];
  let visited = new Set();
  visited.add(queue[0][0].join(""));

  while (queue.length) {
    let [state, steps] = queue.shift();

    if (compare(m.state, state)) {
      return steps;
    }

    for (let w of m.wiring) {
      let nextState = [...state];
      for (let b of w) {
        nextState[b] = nextState[b] === "#" ? "." : "#";
      }
      if (visited.has(nextState.join(""))) {
        continue;
      }
      queue.push([nextState, steps + 1]);
      visited.add(nextState.join(""));
    }
  }

  return Infinity;
}
