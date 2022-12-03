const input = Deno.readTextFileSync("input.txt");
const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const result = input
  .split("\n")
  .reduce((carry: string[], row) => {
    const a = row.split("").slice(0, row.split("").length / 2);
    const b = row
      .split("")
      .slice(row.split("").length / 2, row.split("").length);

    const dupe = a.find((char) => b.includes(char));
    if (dupe) {
      carry.push(dupe);
    }

    return carry;
  }, [])
  .sort((a, b) => a.localeCompare(b))
  .reduce((carry, char) => {
    carry += chars.indexOf(char) + 1;
    return carry;
  }, 0);

console.log(result);
