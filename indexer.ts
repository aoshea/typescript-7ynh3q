export function createIndexedDict(dict, splitter = '\n') {
  const x = {};
  const lines = dict.split(splitter);
  for (const line of lines) {
    const sanitized = line.replace(/[-\n\r]+/g, '');
    const sorted_index = sanitized.split('').sort().join('');
    if (x[sorted_index]) {
      x[sorted_index].push(sanitized);
    } else {
      x[sorted_index] = [sanitized];
    }
  }
  return x;
}
