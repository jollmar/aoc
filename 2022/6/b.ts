const input = Deno.readTextFileSync("input.txt");

for (let i = 0; i < input.length - 14; i++) {
  const uniques = [...new Set(input.slice(i, i + 14))];
  if (uniques.length === 14) {
    console.log(i + 14);
    break;
  }
}
