const input = Deno.readTextFileSync("input.txt");

for (let i = 0; i < input.length - 4; i++) {
  const uniques = [...new Set(input.slice(i, i + 4))];
  if (uniques.length === 4) {
    console.log(i + 4);
    break;
  }
}
