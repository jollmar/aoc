const input = Deno.readTextFileSync("input.txt");

type Tuple = [number, number];
function move(direction: string, steps: number) {
  for (let i = 0; i < steps; i++) {
    const [x, y] = rope[0];

    switch (direction) {
      case "R":
        rope[0] = [x + 1, y];
        break;
      case "D":
        rope[0] = [x, y - 1];
        break;
      case "U":
        rope[0] = [x, y + 1];
        break;
      case "L":
        rope[0] = [x - 1, y];
        break;
    }

    for (let i = 1; i < rope.length; i++) {
      const head = rope[i - 1];
      const tail = rope[i];
      if (!isAdjacent(head, tail)) {
        const newTail = follow(head, tail);
        rope[i] = newTail;
        if (i === rope.length - 1) {
          if (
            !visited.find(
              (pos) => pos[0] === newTail[0] && pos[1] === newTail[1]
            )
          ) {
            visited.push([...newTail]);
          }
        }
      }
    }
  }
}

function isAdjacent(head: Tuple, tail: Tuple) {
  const [hx, hy] = head;
  const [tx, ty] = tail;

  return Math.abs(tx - hx) <= 1 && Math.abs(ty - hy) <= 1;
}

function follow(head: Tuple, tail: Tuple): Tuple {
  const [hx, hy] = head;
  const [tx, ty] = tail;

  if (hx === tx) {
    if (hy > ty) {
      return [tx, ty + 1];
    }
    if (hy < ty) {
      return [tx, ty - 1];
    }
  }
  if (hy === ty) {
    if (hx > tx) {
      return [tx + 1, ty];
    }
    if (hx < tx) {
      return [tx - 1, ty];
    }
  }
  if (hx - tx === 2) {
    return [tx + 1, hy > ty ? ty + 1 : ty - 1];
  }
  if (hx - tx === -2) {
    return [tx - 1, hy > ty ? ty + 1 : ty - 1];
  }
  if (hy - ty === 2) {
    return [hx > tx ? tx + 1 : tx - 1, ty + 1];
  }
  if (hy - ty === -2) {
    return [hx > tx ? tx + 1 : tx - 1, ty - 1];
  }

  return [tx, ty];
}

const visited = [[0, 0]];
const rope: Array<[number, number]> = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

const moves = input.split("\n");

moves.forEach((m) => {
  const [direction, steps] = m.split(" ");
  move(direction, +steps);
});

console.log(visited.length);
