const input = Deno.readTextFileSync("input.txt");

type Shape = "rock" | "paper" | "scissor";
type Game = `${"A" | "B" | "C"} ${"X" | "Y" | "Z"}`;

const shapes = new Map();
shapes.set("A", "rock");
shapes.set("X", "rock");
shapes.set("B", "paper");
shapes.set("Y", "paper");
shapes.set("C", "scissor");
shapes.set("Z", "scissor");

const shapePoints = new Map();
shapePoints.set("rock", 1);
shapePoints.set("paper", 2);
shapePoints.set("scissor", 3);

function getScore(game: Game) {
  let [op, me] = game.split(" ");

  let score = 0;
  op = shapes.get(op);
  me = getMyShape(op as Shape, me);

  score += shapePoints.get(me);

  if (me === op) {
    score += 3;
    return score;
  }

  switch (me) {
    case "rock":
      return op === "scissor" ? score + 6 : score;
    case "paper":
      return op === "rock" ? score + 6 : score;
    case "scissor":
      return op === "paper" ? score + 6 : score;
    default:
      return score;
  }
}

function getMyShape(op: Shape, me: string) {
  switch (me) {
    case "Y":
      return op;
    case "X":
      return losingShape(op);
    case "Z":
    default:
      return winningShape(op);
  }
}

function losingShape(shape: Shape) {
  switch (shape) {
    case "rock":
      return "scissor";
    case "paper":
      return "rock";
    case "scissor":
      return "paper";
  }
}

function winningShape(shape: Shape) {
  switch (shape) {
    case "rock":
      return "paper";
    case "paper":
      return "scissor";
    case "scissor":
      return "rock";
  }
}

const score = input
  .split("\n")
  .map((game) => getScore(game as Game))
  .reduce((carry, val) => (carry += val), 0);
console.log(score);
