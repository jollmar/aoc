const input = Deno.readTextFileSync("input.txt");

type Monkey = {
  name: number;
  items: number[];
  operation: string;
  truthy: number;
  falsy: number;
  inspects: number;
  test: number;
};

const monkeys = input
  .split("\n\n")
  .map((monkey) => monkey.split("\n"))
  .map(createMonkey);
const mod = monkeys.reduce((a, b) => a * b.test, 1);

let round = 0;
while (round < 10_000) {
  monkeys.forEach(monkeyBusiness);
  round++;
}

function monkeyBusiness(monkey: Monkey) {
  monkey.items.forEach((item, i) => {
    monkey.inspects++;
    // deno-lint-ignore prefer-const
    let newValue = 0;
    // deno-lint-ignore no-unused-vars prefer-const
    let old = item;
    eval(monkey.operation);
    monkey.items[i] = newValue % mod;
  });

  monkey.items.forEach((item) => {
    if (item % monkey.test === 0) {
      monkeys.find((m) => m.name === monkey.truthy)?.items.push(item);
    } else {
      monkeys.find((m) => m.name === monkey.falsy)?.items.push(item);
    }
  });

  monkey.items = [];
}

function createMonkey(monkeyString: string[]) {
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
  const op = operationString.split("Operation: ")[1];
  return op.replace("new", "newValue");
}

function parseTruthy(truthy: string) {
  return +truthy.split(" ")[truthy.split(" ").length - 1];
}

function parseFalsy(falsy: string) {
  return +falsy.split(" ")[falsy.split(" ").length - 1];
}

function parseTest(test: string) {
  return +test.split("by ")[1];
}
console.log(
  monkeys
    .sort((a, b) => b.inspects - a.inspects)
    .slice(0, 2)
    .map((m) => m.inspects)
    .reduce((acc, val) => (acc *= val), 1)
);
