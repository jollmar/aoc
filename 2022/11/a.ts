const input = Deno.readTextFileSync("input.txt");

type Monkey = {
  name: number;
  items: number[];
  operation: (arg: number) => number;
  truthy: number;
  falsy: number;
  inspects: number;
  test: (arg: number) => boolean;
};

const monkeys = input
  .split("\n\n")
  .map((monkey) => monkey.split("\n"))
  .map(createMonkey);

let round = 0;
while (round < 20) {
  monkeys.forEach(monkeyBusiness);
  round++;
}

function monkeyBusiness(monkey: Monkey) {
  monkey.items.forEach((item) => {
    monkey.inspects++;
    let worryLevel = monkey.operation(item);
    worryLevel = Math.floor(worryLevel / 3);
    if (monkey.test(worryLevel)) {
      monkeys.find((m) => m.name === monkey.truthy)?.items.push(worryLevel);
    } else {
      monkeys.find((m) => m.name === monkey.falsy)?.items.push(worryLevel);
    }
  });

  monkey.items = [];
}

function createMonkey(monkeyString: string[]): Monkey {
  const [monkeyName, startingItems, operation, test, truthy, falsy] =
    monkeyString;
  return {
    name: +monkeyName.split(" ")[1].replace(":", ""),
    items: parseStartingItems(startingItems),
    operation: parseOperation(operation),
    truthy: parseTruthy(truthy),
    falsy: parseFalsy(falsy),
    test: parseTest(test),
    inspects: 0,
  };
}

function parseStartingItems(startingItems: string) {
  return startingItems
    .split(": ")[1]
    .split(", ")
    .map((item) => +item);
}

function parseOperation(operationString: string) {
  const op = operationString.split("Operation: ")[1].split(" = ")[1];

  // deno-lint-ignore no-unused-vars
  return (old: number) => eval(op);
}

function parseTruthy(truthy: string) {
  return +truthy.split(" ")[truthy.split(" ").length - 1];
}

function parseFalsy(falsy: string) {
  return +falsy.split(" ")[falsy.split(" ").length - 1];
}

function parseTest(test: string) {
  const testDiv = +test.split(" ")[test.split(" ").length - 1];
  return (item: number) => {
    return item % testDiv === 0;
  };
}
console.log(
  monkeys
    .sort((a, b) => b.inspects - a.inspects)
    .slice(0, 2)
    .map((m) => m.inspects)
    .reduce((acc, val) => (acc *= val), 1)
);
