const input = Deno.readTextFileSync("input.txt");
type Tuple = [number, number];
function move(direction: string, steps: number) {
  for (let i = 0; i < steps; i++) {
    const [x, y] = head;

    switch (direction) {
      case "R":
        head = [x + 1, y];
        break;
      case "D":
        head = [x, y - 1];
        break;
      case "U":
        head = [x, y + 1];
        break;
      case "L":
        head = [x - 1, y];
        break;
    }

    if (!isAdjacent(head, tail)) {
      follow();
      if (!visited.find((pos) => pos[0] === tail[0] && pos[1] === tail[1])) {
        visited.push([...tail]);
      }
    }
  }
}

function isAdjacent(head: Tuple, tail: Tuple) {
  const [hx, hy] = head;
  const [tx, ty] = tail;

  return Math.abs(tx - hx) <= 1 && Math.abs(ty - hy) <= 1;
}

function follow() {
  const [hx, hy] = head;
  const [tx, ty] = tail;

  if (hx === tx) {
    if (hy > ty) {
      tail = [tx, ty + 1];
      return;
    }

    if (hy < ty) {
      tail = [tx, ty - 1];
      return;
    }
  }
  if (hy === ty) {
    if (hx > tx) {
      tail = [tx + 1, ty];
      return;
    }

    if (hx < tx) {
      tail = [tx - 1, ty];
      return;
    }
  }
  if (hx - tx === 2) {
    tail = [tx + 1, hy > ty ? ty + 1 : ty - 1];
    return;
  }

  if (hx - tx === -2) {
    tail = [tx - 1, hy > ty ? ty + 1 : ty - 1];
    return;
  }

  if (hy - ty === 2) {
    tail = [hx > tx ? tx + 1 : tx - 1, ty + 1];
    return;
  }

  if (hy - ty === -2) {
    tail = [hx > tx ? tx + 1 : tx - 1, ty - 1];
    return;
  }
}

const visited = [[0, 0]];
let head: Tuple = [0, 0];
let tail: Tuple = [0, 0];

const moves = input.split("\n");

moves.forEach((m) => {
  const [direction, steps] = m.split(" ");
  move(direction, +steps);
});

console.log(visited.length);
