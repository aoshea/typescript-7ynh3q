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

for (const starter of starters) {
  const set = [starter];
  // remove one letter and check if it exists to add to game set
  let node;
  let temp_connx = null;
  let q = [];
  q = q.concat(getRemovedCharList(starter));
  while (q.length > 0) {
    node = q.pop();
    if (temp_connx && temp_connx.length <= node.length) {
      temp_connx = null;
    }
    if (indexed_dict[node]) {
      if (temp_connx) {
        // add to set,
        set.push(temp_connx);
      }
      temp_connx = node;
      if (node.length === MIN_LEN) {
        result.push(set.slice(0).concat(node));
        q = [];
      } else {
        q = q.concat(getRemovedCharList(node));
      }
    }
  }
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

  for (const starter of starters) {
    let depth = 0;
    const collection = [];
    const q = [];
    q.push(...getRemovedCharList(starter));
    while (q.length > 0) {
      const key = q.pop();
      depth = key.length;
      const isKey = typeof truncated[key] !== 'undefined';
      if (isKey) {
        console.log(depth, 'found key!', key);
        // save it at depth point
        if (Array.isArray(collection[depth])) {
          collection[depth].push(key);
        } else {
          console.log('save it');
          collection[depth] = [key];
        }

        // better check all the subs of this node then too
        q.push(...getRemovedCharList(key));
      } else {
        // i guess we go up a depth? er..
        console.log('nothing found for this key');
        console.log(`at depth:${depth} key:${key}`);
      }
    }
    console.log('collection', collection);
  }

  return [''];
}
