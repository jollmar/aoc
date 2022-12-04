const input = Deno.readTextFileSync("input.txt");

const data = input
  .split("\n")
  .map((item) => item.split(",").map((p) => p.split("-").map((item) => +item)))
  .reduce((carry, value) => {
    const [leftStart, leftEnd] = value[0];
    const [rightStart, rightEnd] = value[1];

    if (leftStart <= rightStart && leftEnd >= rightEnd) {
      carry += 1;
      return carry;
    }

    if (rightStart <= leftStart && rightEnd >= leftEnd) {
      carry += 1;
      return carry;
    }

    return carry;
  }, 0);

console.log(data);
