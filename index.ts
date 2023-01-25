// Import stylesheets
import './style.css';
import { Trie } from './trie';
import { createIndexedDict } from './indexer';
import { requestDict } from './request_dict';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Trie</h1>`;

// tests
const trie = new Trie();
console.log(trie.insert('premium'));
console.log(trie.insert('pre'));
console.log(trie.contains('premium'));
console.log(trie.startsWith('pre'));

const test_dict = 'rip ripe prim prime impure premium mire umpire obelisk';
const indexed = createIndexedDict(test_dict, ' ');
for (const key in indexed) {
  trie.insert(key);
}

requestDict(function (res) {
  const indexed = createIndexedDict(res);
  let i = 0;
  for (const key in indexed) {
    trie.insert(key);
  }
});
