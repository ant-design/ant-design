const fs = require('fs');
const { join } = require('path');
const glob = require('glob');

const docPaths = glob
  .sync('components/*/*.md', {
    ignore: '**/{__tests__,_util,version,index.tsx}',
    cwd: join(process.cwd()),
    dot: false,
  })
  .map(path => join(process.cwd(), path));

docPaths.forEach(path => {
  const text = fs.readFileSync(path, 'utf-8');
  const tables = [];
  let table = false;
  const lines = text.split('\n');
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.startsWith('|')) {
      if (!table) {
        tables.push({ lines: [line], start: index });
        table = true;
      } else {
        tables[tables.length - 1].lines.push(line);
      }
    } else if (table) {
      table = false;
    }
  }
  for (let index = 0; index < tables.length; index++) {
    const { lines: tableLines, start } = tables[index];
    if (tableLines.length > 3) {
      const sortList = [];
      sortList.push(tableLines.shift());
      sortList.push(tableLines.shift());
      sortList.push(...tableLines.sort());
      for (let j = 0; j < sortList.length; j++) {
        lines[start + j] = sortList[j];
      }
    }
  }
  fs.writeFileSync(path, lines.join('\n'));
});
