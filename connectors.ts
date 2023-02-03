import {
  getRemovedCharList,
  removeCharAtIndex,
  truncateIndexedDict,
} from './indexer';

function indexer(str, splitter = ' ', min = 3, max = 7) {
  const hashmap = {};
  const lines = str
    .split(splitter)
    .filter((x) => x.length >= min && x.length <= max);
  for (const line of lines) {
    const sanitized_line = line.replace(/[-\n\r]+/g, '');
    const sorted_line = sanitized_line.split('').sort().join('');
    if (hashmap[sorted_line]) {
      hashmap[sorted_line].push(sanitized_line);
    } else {
      hashmap[sorted_line] = [sanitized_line];
    }
  }
  return hashmap;
}

const MAX_LEN = 7;
const MIN_LEN = 3;
const INPUT =
  'prime impure premium prim mire rip umpire pi absolutely empire cheese';
const SPLITTER = ' ';

const indexed_dict = indexer(INPUT, SPLITTER, MIN_LEN, MAX_LEN);
const starters = Object.keys(indexed_dict).filter((x) => x.length === MAX_LEN);

const result = [];

type Node = {
  parent?: Node;
  value: string;
  children: Node[];
  is_complete: boolean;
};

function toNode(x: string, parent?: Node) {
  return {
    parent: parent,
    value: x,
    children: [],
    is_complete: x.length === 3,
  };
}

function removeCharAtIndex(x, index) {
  return x.slice(0, index).concat(x.slice(index + 1));
}

function getRemovedCharList(x) {
  const result = [];
  const len = x.length;
  for (let i = 0; i < len; ++i) {
    result.push(removeCharAtIndex(x, i));
  }
  return result.filter((el, index, arr) => arr.indexOf(el) === index);
}

export function findConnectors(indexed: Record<string, string[]>): string[] {
  // so, filter out anything longer than max
  const truncated = truncateIndexedDict(indexed, 3, 7);
  // then pop off all max words
  const starters = Object.keys(truncated).filter((x) => x.length === 7);
  const result = [];

  for (const x of starters) {
    let node = toNode(x);
    node.children.push(...getRemovedCharList(x).map((x) => toNode(x, node)));

    const q = [...node.children];

    let curr = null;
    while (q.length > 0) {
      curr = q.pop();
      if (indexed[curr.value]) {
        if (curr.value.length > 3) {
          const new_nodes = getRemovedCharList(curr.value).map((x) =>
            toNode(x, curr)
          );
          curr.children.push(...new_nodes);
          q.push(...new_nodes);
        } else {
          let printer = curr;
          let set = [curr.value];
          while (printer) {
            set.push(printer.value);
            printer = printer.parent;
          }
          result.push(set);
        }
      }
    }
  }

  return result;
}
