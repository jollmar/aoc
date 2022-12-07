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

let total = 0;
iterate(tree.root);
function iterate(object: Dir) {
  if (object._size <= 100000) {
    total += object._size;
  }

  Object.keys(object.children).forEach((key) => {
    iterate(object.children[key]);
  });
}

console.log(total);

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
