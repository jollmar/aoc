const lines = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((line) => line.split(""));
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const bfs = (
  start: string,
  end: string,
  neighbors: (v: string) => string[]
) => {
  const queue: string[] = [start];
  const visited = new Set<string>();
  const paths = new Map<string, string>();

  while (queue.length > 0) {
    const v = queue.pop();

    if (typeof v !== "string") {
      throw new Error("Faulty input");
    }

    if (!visited.has(v)) {
      visited.add(v);

      if (v === end) {
        return getPath(paths, start, end).length - 1;
      }

      const nbs = neighbors(v);
      for (let i = 0; i < nbs.length; i++) {
        const neighbor = nbs[i];
        if (!visited.has(neighbor)) {
          paths.set(neighbor, v);
          queue.unshift(neighbor);
        }
      }
    }
  }
};

function getPath(
  paths: Map<string, string>,
  start: string,
  end: string
): string[] {
  const path: string[] = [end];
  let current = end;
  while (current !== start) {
    current = paths.get(current) ?? "";
    path.unshift(current);
  }
  return path;
}

function neighbors(coord: string) {
  const [x, y] = JSON.parse(coord);
  const neighbors = [];
  let letter = lines[y][x];

  if (letter === "S") {
    letter = "a";
  }

  if (letter === "E") {
    letter = "z";
  }

  const height = letters.indexOf(letter);

  let neighbor = undefined;
  const getNeighbor = (letter: string) => {
    return letter === "S" ? "a" : letter === "E" ? "z" : letter;
  };

  if (lines[y + 1]) {
    neighbor = getNeighbor(lines[y + 1][x]);
    if (letters.indexOf(neighbor) <= height + 1) {
      neighbors.push(JSON.stringify([x, y + 1]));
    }
  }

  if (lines[y - 1]) {
    neighbor = getNeighbor(lines[y - 1][x]);
    if (letters.indexOf(neighbor) <= height + 1) {
      neighbors.push(JSON.stringify([x, y - 1]));
    }
  }

  if (lines[y][x + 1]) {
    neighbor = getNeighbor(lines[y][x + 1]);
    if (letters.indexOf(neighbor) <= height + 1) {
      neighbors.push(JSON.stringify([x + 1, y]));
    }
  }

  if (lines[y][x - 1]) {
    neighbor = getNeighbor(lines[y][x - 1]);
    if (letters.indexOf(neighbor) <= height + 1) {
      neighbors.push(JSON.stringify([x - 1, y]));
    }
  }

  return neighbors;
}

let start;
let end;
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (lines[y][x] === "S") start = [x, y];
    if (lines[y][x] === "E") end = [x, y];
  }
}

const result = bfs(JSON.stringify(start), JSON.stringify(end), neighbors);
console.log(result);
