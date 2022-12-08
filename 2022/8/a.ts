const input = Deno.readTextFileSync("input.txt");

const visible = [];

const lines = input
  .split("\n")
  .map((row) => row.split("").map((tree) => +tree));

for (let i = 0; i < lines.length; i++) {
  const row = lines[i];

  for (let j = 0; j < row.length; j++) {
    const column = row[j];

    if (i === 0 || i === lines.length - 1 || j === 0 || j === row.length - 1) {
      visible.push(column);
      continue;
    }

    let add = true;
    for (let r = i - 1; r >= 0; r--) {
      if (lines[r][j] >= column) {
        add = false;
        break;
      }
    }

    if (add) {
      visible.push(column);
      continue;
    }

    add = true;
    for (let c = j - 1; c >= 0; c--) {
      if (row[c] >= column) {
        add = false;
        break;
      }
    }

    if (add) {
      visible.push(column);
      continue;
    }

    add = true;
    for (let r = i + 1; r < lines.length; r++) {
      if (lines[r][j] >= column) {
        add = false;
        break;
      }
    }

    if (add) {
      visible.push(column);
      continue;
    }

    add = true;
    for (let c = j + 1; c < row.length; c++) {
      if (row[c] >= column) {
        add = false;
        break;
      }
    }

    if (add) {
      visible.push(column);
    }
  }
}

console.log(visible.length);
