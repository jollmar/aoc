const input = Deno.readTextFileSync("input.txt");

const cals = input.split("\n").reduce((carry: number[], calories) => {
  if (calories === "") {
    carry.push(0);
  } else {
    carry[carry.length - 1] += +calories;
  }

  return carry;
}, []);

const result = cals
  .sort((a, b) => b - a)
  .splice(0, 3)
  .reduce((carry, val) => (carry += val), 0);

console.log(result);
