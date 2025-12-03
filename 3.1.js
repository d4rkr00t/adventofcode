let data = `987654321111111
811111111111119
234234234234278
818181911112111`;

data = await Deno.readTextFile("3.txt");

data = data
  .trim()
  .split("\n")
  .map((line) => {
    return line.trim().split("").map(Number);
  });

// console.log(data);

let res = 0;

for (let bank of data) {
  res += processBank(bank);
}

function processBank(bank) {
  bank = bank.map((item, idx) => [item, idx]).toSorted((a,b) => b[0]-a[0]);
  // console.log(bank.join(", "));
  for (let i = 0; i < bank.length; i++) {
    let n = bank[i];
    for (let j = 0; j < bank.length; j++) {
      let m = bank[j];
      if (n[1] < m[1]) {
        let ans = n[0] * 10 + m[0];
        // console.log(ans);
        return ans;
      }
    }
  }
}

console.log(res);
