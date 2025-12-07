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


let res = 0;

for (let bank of data) {
  let tmp = processBank(bank);
  res += tmp;
}

function getBiggest(bank, s, e) {
  let res = bank[s];
  let pos = s;

  while (s < e) {
    if (res < bank[s]) {
      res = bank[s];
      pos = s;
    }
    s++;
  }

  return [res, pos];
}

function processBank(bank) {
  let used = 0;
  let pos = 0;
  let res = 0;

  while (used < 12) {
    let end = bank.length - (pos + 12 - used - 1) + pos;
    let [num, numPos] = getBiggest(bank, pos, end);
    used += 1;
    pos = numPos + 1;
    res = res * 10 + num;
  }

  return res;
}


console.log(res);

