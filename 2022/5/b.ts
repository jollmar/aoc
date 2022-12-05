const input = Deno.readTextFileSync("input.txt");
const [crates, rules] = input.split("\n\n");
const crateLines = crates.split("\n").filter((line) => line.startsWith("["));
const maxLength = Math.max(...crates.split("\n").map((str) => str.length));

const crateData = crateLines.reduce((carry: string[][], _value, i) => {
  let currentIndex = -1;
  for (let j = 1; j < maxLength; j += 4) {
    currentIndex++;
    if (crateLines[i][j] === " ") {
      continue;
    }

    if (!carry[currentIndex]) {
      carry[currentIndex] = [];
    }

    carry[currentIndex].push(crateLines[i][j]);
  }

  return carry;
}, []);

const result = rules.split("\n").reduce((carry, row) => {
  const [, amount, , from, , to] = row.split(" ").map((num) => +num);
  const take = carry[from - 1].slice(0, amount);
  carry[to - 1] = take.concat(carry[to - 1]);
  carry[from - 1].splice(0, amount);
  return carry;
}, crateData);

console.log(result.map((row) => row[0]).join(""));
