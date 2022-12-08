const input = Deno.readTextFileSync("input.txt");

let count = [];
const counts = [];
const lines = input
  .split("\n")
  .map((row) => row.split("").map((tree) => +tree));

for (let i = 0; i < lines.length; i++) {
  const row = lines[i];

  for (let j = 0; j < row.length; j++) {
    const column = row[j];

    if (i === 0 || i === lines.length - 1 || j === 0 || j === row.length - 1) {
      continue;
    }

    let steps = 0;
    for (let r = i - 1; r >= 0; r--) {
      if (lines[r][j] >= column) {
        steps++;
        break;
      }
      if (lines[r][j] < column) {
        steps++;
        continue;
      }
    }

    count.push(steps);
    steps = 0;
    for (let c = j - 1; c >= 0; c--) {
      if (row[c] >= column) {
        steps++;
        break;
      }
      if (row[c] < column) {
        steps++;
        continue;
      }
    }

    count.push(steps);
    steps = 0;
    for (let r = i + 1; r < lines.length; r++) {
      if (lines[r][j] >= column) {
        steps++;
        break;
      }
      if (lines[r][j] < column) {
        steps++;
        continue;
      }
    }

    count.push(steps);
    steps = 0;
    for (let c = j + 1; c < row.length; c++) {
      if (row[c] >= column) {
        steps++;
        break;
      }
      if (row[c] < column) {
        steps++;
        continue;
      }
    }

    count.push(steps);
    counts.push(count.reduce((count, value) => (count *= value), 1));
    count = [];
  }
}

console.log(Math.max(...counts));
