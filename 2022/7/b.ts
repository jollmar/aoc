const input = Deno.readTextFileSync("input.txt");

type Dir = {
  _size: number;
  children: {
    [key: string]: Dir;
  };
};

const tree: Record<string, Dir> = {
  root: {
    _size: 0,
    children: {},
  },
};

let path = ["root"];

const lines = input.split("\n");

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith("$ cd")) {
    cd(line.split(" cd ")[1]);
  } else if (line.startsWith("dir")) {
    // noop
  } else if (line.startsWith("$ ls")) {
    // noop
  } else {
    addSize(+line.split(" ")[0]);
  }
}

const systemSpace = 70_000_000;
const neededSpace = 30_000_000;
const availableSpace = systemSpace - tree.root._size;
const spaceToFree = neededSpace - availableSpace;

const matches: Dir[] = [];
iterate(tree.root);
function iterate(object: Dir) {
  if (object._size >= spaceToFree) {
    matches.push(object);
  }

  Object.keys(object.children).forEach((key) => {
    iterate(object.children[key]);
  });
}

console.log(Math.min(...matches.map((obj) => obj._size)));

function cd(to: string) {
  switch (to) {
    case "/":
      path = ["root"];
      break;
    case "..":
      path.pop();
      break;
    default: {
      const part = path.reduce((carry, part) => {
        return carry[part].children;
      }, tree);

      part[to] = {
        _size: 0,
        children: {},
      };

      path.push(to);
      break;
    }
  }
}

function addSize(size: number) {
  path.reduce((carry, part) => {
    carry[part]._size += size;
    carry = carry[part].children;
    return carry;
  }, tree);
}
