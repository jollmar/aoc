const input = Deno.readTextFileSync("input.txt");

const data = input
  .split("\n")
  .map((item) => item.split(",").map((p) => p.split("-").map((item) => +item)))
  .reduce((carry, value) => {
    const [leftStart, leftEnd] = value[0];
    const [rightStart, rightEnd] = value[1];

    const leftRange = range(leftStart, leftEnd);
    const rightRange = range(rightStart, rightEnd);
    const overlap = leftRange.find((num) => rightRange.includes(num));

    if (overlap) {
      carry += 1;
    }

    return carry;
  }, 0);

function range(from: number, to: number) {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
}

console.log(data);
