const input = Deno.readTextFileSync("input.txt");

const cals = input.split("\n").reduce((carry: number[], calories) => {
  if (calories === "") {
    carry.push(0);
  } else {
    carry[carry.length - 1] += +calories;
  }

  return carry;
}, []);

console.log(Math.max(...cals));
