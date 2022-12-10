const input = Deno.readTextFileSync("input.txt");

let cycles = 0;
let x = 1;
let signal = 0;
input.split("\n").forEach((line) => handle(line));
function handle(line: string) {
  if (line.startsWith("noop")) {
    addCycles(1);
  } else {
    const [, amount] = line.split(" ");
    addCycles(2);
    x += +amount;
  }
}

function addCycles(num: number) {
  for (let i = 0; i < num; i++) {
    cycles++;

    if ((cycles - 20) % 40 === 0) {
      signal += cycles * x;
    }
  }
}

console.log(signal);
