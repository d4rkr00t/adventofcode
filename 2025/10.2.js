import GLPK from "npm:glpk.js";

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

    let sortedWiring = wiring.toSorted((a, b) => b.length - a.length);

    return {
      state,
      wiring: sortedWiring,
      joltage,
    };
  });

console.log("Total:", data.length);
let res = 0;
let solved = 0;
for (let m of data) {
  res += solve(m);
  solved++;
  console.log("Solved", solved, "of", data.length);
}

console.log("Ans:", res);

function solve(m) {
  const glpk = GLPK();
  const variables = m.wiring.map((_, btnIdx) => ({
    name: `btn_${btnIdx}`,
    coef: 1,
  }));

  const constraints = m.joltage.map((targetVal, targetIdx) => {
    const affectingButtons = [];
    m.wiring.forEach((wires, btnIdx) => {
      if (wires.includes(targetIdx)) {
        affectingButtons.push({
          name: `btn_${btnIdx}`,
          coef: 1, // Each press adds +1 joltage
        });
      }
    });

    return {
      name: `target_index_${targetIdx}`,
      vars: affectingButtons,
      bnds: { type: glpk.GLP_FX, ub: targetVal, lb: targetVal },
    };
  });

  const lp = {
    name: "Joltage",
    objective: {
      direction: glpk.GLP_MIN, // Minimize button presses
      name: "min_presses",
      vars: variables,
    },
    subjectTo: constraints,
    generals: variables.map((v) => v.name),
  };

  const options = {
    msglev: glpk.GLP_MSG_OFF,
    presol: true,
  };

  const res = glpk.solve(lp, options);

  if (res.result.status === glpk.GLP_OPT) {
    return res.result.z;
  } else {
    return 0;
  }
}
// 19380 -> incorrect
// 18755 -> incorrect
