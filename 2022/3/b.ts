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
  .reduce((carry: Array<string[]>, value, index) => {
    if (index % 3 === 0) {
      carry.push([]);
    }

    carry[carry.length - 1].push(value);
    return carry;
  }, [])
  .reduce((carry, arrays) => {
    const [a, b, c] = arrays.map((arr) => arr.split(""));

    const dupe = a.find((char) => b.includes(char) && c.includes(char));

    if (dupe) {
      carry += chars.indexOf(dupe) + 1;
    }

    return carry;
  }, 0);

console.log(result);
