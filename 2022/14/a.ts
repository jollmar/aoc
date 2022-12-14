const input = Deno.readTextFileSync("input.txt");
/* const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`; */
const data = input
  .split("\n")
  .map((row) =>
    row.split(" -> ").map((coord) => coord.split(",").map((point) => +point))
  );

const x = {
  max: Math.max(...data.flat().flatMap((data) => data[0])),
  min: Math.min(...data.flat().flatMap((data) => data[0])),
};

const y = {
  max: Math.max(...data.flat().flatMap((data) => data[1])),
  min: Math.min(...data.flat().flatMap((data) => data[1])),
};

const grid: string[][] = [];
for (let i = 0; i <= y.max; i++) {
  grid.push([]);
  for (let j = 0; j <= x.max - x.min; j++) {
    grid[grid.length - 1].push(" ");
  }
}

for (let i = 0; i < data.length; i++) {
  for (let j = 1; j < data[i].length; j++) {
    const prev = data[i][j - 1];
    const next = data[i][j];

    if (prev[0] === next[0]) {
      let from = prev[1];
      const to = next[1];
      let drawing = true;

      do {
        grid[from][prev[0] - x.min] = "#";
        if (from === to) drawing = false;
        if (to < from) {
          from--;
        } else {
          from++;
        }
      } while (drawing);
    }

    if (prev[1] === next[1]) {
      let from = prev[0] - x.min;
      const to = next[0] - x.min;
      let drawing = true;

      do {
        grid[prev[1]][from] = "#";
        if (from === to) drawing = false;
        if (to < from) {
          from--;
        } else {
          from++;
        }
      } while (drawing);
    }
  }
}

let full = false;
let i = -1;
const start = {
  x: 500 - x.min,
  y: 0,
};
do {
  i += fall([start.x, start.y]);
} while (!full);

function fall([x, y]: [number, number]) {
  if (x === -1 || x === grid[0].length) {
    full = true;
  }

  const block = ["#", "o"];

  if (typeof grid[y + 1] !== "undefined") {
    if (!block.includes(grid[y + 1][x])) {
      grid[y][x] = " ";
      grid[y + 1][x] = "o";
      fall([x, y + 1]);
    } else if (!block.includes(grid[y + 1][x - 1])) {
      grid[y][x] = " ";
      grid[y + 1][x - 1] = "o";
      fall([x - 1, y + 1]);
    } else if (!block.includes(grid[y + 1][x + 1])) {
      grid[y][x] = " ";
      grid[y + 1][x + 1] = "o";
      fall([x + 1, y + 1]);
    }
    return 1;
  }
  return 1;
}

console.table(grid);
console.log(i);
