function TrieNode(key = '', value = '', children = [], count = 0) {
  this.key = key;
  this.value = value;
  this.children = children;
  this.count = count;
}

export function Trie() {
  this.root = new TrieNode();
}

Trie.prototype.insert = function (str: string) {
  let curr = this.root;
  for (const c of str) {
    const index = curr.children.findIndex((x) => x.key === c);
    if (index !== -1) {
      curr = curr.children[index];
    } else {
      curr.children.push(new TrieNode(c));
      curr = curr.children[curr.children.length - 1];
    }
  }
  curr.count += 1;
  curr.value = str;
};

Trie.prototype.contains = function (str: string): boolean {
  let curr = this.root;
  for (const c of str) {
    const index = curr.children.findIndex((x) => x.key === c);
    if (index !== -1) {
      curr = curr.children[index];
    } else {
      return false;
    }
  }
  return curr.count > 0;
};

Trie.prototype.startsWith = function (str: string): string[] {
  let curr = this.root;
  for (const c of str) {
    const index = curr.children.findIndex((x) => x.key === c);
    if (index !== -1) {
      curr = curr.children[index];
    } else {
      return [];
    }
  }
  const result = [];
  const q = [curr];
  while (q.length > 0) {
    const node = q.pop();
    for (const child of node.children) {
      q.push(child);
    }
    if (node.count > 0) {
      result.push(node.value);
    }
  }
  return result;
};
