const input = Deno.readTextFileSync("input.txt")
  .split(/[\n\r]+/g)
  .map((row: string): Array<number[] | number> => eval(row));

input.push([[2]]);
input.push([[6]]);

const a = Array.isArray;
const n = (x: unknown) => typeof x === "number";
const res = input.sort((a, b) => compare(b, a));

const first =
  res.findIndex(
    (i) => i.length === 1 && a(i[0]) && i[0].length === 1 && i[0][0] === 2
  ) + 1;
const second =
  res.findIndex(
    (i) => i.length === 1 && a(i[0]) && i[0].length === 1 && i[0][0] === 6
  ) + 1;

console.log(first * second);

function compare(left: unknown[], right: unknown[]) {
  if (!a(left) && a(right)) left = [left];
  if (a(left) && !a(right)) right = [right];

  if (n(left) && n(right)) {
    if (left < right) return 1;
    if (left === right) return 0;
    return -1;
  }

  let i = 0;
  if (a(left) && a(right)) {
    while (i < left.length && i < right.length) {
      const x = compare(left[i], right[i]);

      if (x === 1) return 1;
      if (x === -1) return -1;

      i++;
    }

    if (i === left.length) {
      if (left.length === right.length) {
        return 0;
      }
      return 1;
    }
  }
  return -1;
}
