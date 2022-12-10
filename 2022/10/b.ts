const input = Deno.readTextFileSync("input.txt");
let cycles = 0;
let x = 1;
let row = 0;
let sprite = getSprite();
const display: string[][] = [[], [], [], [], [], []];
input.split("\n").forEach((line) => handle(line));
function handle(line: string) {
  if (line.startsWith("noop")) {
    addCycles(1);
  } else {
    const [, amount] = line.split(" ");
    addCycles(2);
    x += +amount;
    sprite = getSprite();
  }
}
function addCycles(num: number) {
  for (let i = 0; i < num; i++) {
    display[row].push(sprite[cycles - row * 40]);
    cycles++;
    if (cycles % 40 === 0) {
      row++;
    }
  }
}

function getSprite() {
  const sprite = [];
  for (let i = 0; i < 40; i++) {
    sprite.push("  ");
  }

  sprite.splice(x - 1, 3, "##", "##", "##");
  return sprite;
}

console.log(display.map((row) => row.join("")));
