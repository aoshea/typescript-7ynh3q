import {
  getRemovedCharList,
  removeCharAtIndex,
  truncateIndexedDict,
} from './indexer';

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
