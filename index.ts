// Import stylesheets
import './style.css';
import { Trie } from './trie';
import { createIndexedDict } from './indexer';
import { requestDict } from './request_dict';
import { findConnectors } from './connectors';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>Trie</h1>`;

// tests
const trie = new Trie();

const test_dict =
  'rip ripe prim prime impure premium mire umpire obelisk generators exhibitionist ab pi';
const indexed = createIndexedDict(test_dict, ' ');
for (const key in indexed) {
  trie.insert(key);
}
console.log(findConnectors(indexed));

requestDict(function (res) {
  const indexed = createIndexedDict(res);
  for (const key in indexed) {
    trie.insert(key);
  }
});
