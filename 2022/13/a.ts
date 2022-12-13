const input = Deno.readTextFileSync("input.txt")
  .split(/[\n\r]+/g)
  .map((row) => eval(row));

const results = [];
for (let i = 0; i < input.length; i += 2) {
  const left = input[i];
  const right = input[i + 1];
  results.push(compare(left, right));
}

console.log(
  results
    .map((r, i) => (r === 1 ? i + 1 : 0))
    .filter(Boolean)
    .reduce((a, v) => a + v, 0)
);

function compare(left: unknown[], right: unknown[]) {
  const a = Array.isArray;
  const n = (x: unknown) => typeof x === "number";

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
