/** Statistic API list. ref: https://github.com/ant-design/ant-design/issues/16048 */

const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const out = spawn('npm', ['run', 'sort-api'], { encoding: 'utf8' });

out.stdout.pipe(process.stdout);
out.stderr.pipe(process.stderr);

function removeComment(str) {
  return str.replace(/\(.*/, '').trim();
}

out.on('close', () => {
  const components = fs.readJsonSync(path.resolve('~component-api.json'));

  rootDynamicList = {};
  rootStaticList = {};
  rootSizeList = {};

  Object.keys(components).forEach(componentName => {
    const { dynamic: dynamicList, static: staticList, size: sizeList } = components[componentName];

    dynamicList.map(removeComment).forEach(propName => {
      rootDynamicList[propName] = rootDynamicList[propName] || new Set();
      rootDynamicList[propName].add(componentName);
    });

    staticList.map(removeComment).forEach(propName => {
      rootStaticList[propName] = rootStaticList[propName] || new Set();
      rootStaticList[propName].add(componentName);
    });

    sizeList.map(removeComment).forEach(propName => {
      rootSizeList[propName] = rootSizeList[propName] || new Set();
      rootSizeList[propName].add(componentName);
    });
  });

  // Generate markdown
  function generateMarkdown(name, data) {
    const content = [`### ${name}`, '| Name | Components | Description |', '| --- | --- | --- |'];
    Object.keys(data)
      .sort()
      .forEach(propName => {
        content.push(`| ${propName} | ${[...data[propName]].join(', ')} |  |`);
      });

    return content.join('\n');
  }

  fs.writeFileSync('~component-static.md', generateMarkdown('Static', rootStaticList));
  fs.writeFileSync('~component-dynamic.md', generateMarkdown('Dynamic', rootDynamicList));
  fs.writeFileSync('~component-size.md', generateMarkdown('Size', rootSizeList));
});
