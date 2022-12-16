const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((line) =>
    line.split(" ").map((pair) => pair.split(",").map((num) => +num))
  );
type Point = [number, number];

const manhattan = ([x1, y1]: Point, [x2, y2]: Point) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);
const visited = new Set<string>();
const LINE = 2_000_000;

for (let i = 0; i < input.length; i++) {
  const [sensor, beacon] = input[i];
  const [sx, sy] = sensor;
  const distance = manhattan(sensor as Point, beacon as Point);

  let overflow;
  if (sy > LINE && sy - distance <= LINE) {
    overflow = Math.abs(sy - distance - LINE);
  }
  if (sy < LINE && sy + distance >= LINE) {
    overflow = sy + distance - LINE;
  }

  if (typeof overflow === "undefined") {
    continue;
  }

  if (sy < LINE || sy > LINE) {
    visited.add(JSON.stringify([sx, LINE]));

    for (let i = 1; i <= overflow; i++) {
      visited.add(JSON.stringify([sx - i, LINE]));
      visited.add(JSON.stringify([sx + i, LINE]));
    }
  }
  if (visited.has(JSON.stringify(beacon))) {
    visited.delete(JSON.stringify(beacon));
  }
}

console.log([...visited].map((v) => JSON.parse(v)).length);
