// Read all the api from current documents

const glob = require('glob');
const fs = require('fs');

const COMPONENT_NAME = /components\/([^/]*)/;
const PROP_NAME = /^\s*\|\s*([^\s|]*)/;

const components = {};

function mappingPropLine(component, line) {
  const propMatch = line.match(PROP_NAME);
  if (!propMatch) return;

  const propName = propMatch[1];
  if (!/^[a-z]/.test(propName)) return;

  components[component] = Array.from(new Set([...(components[component] || []), propName]));
}

function apiReport(entities) {
  const apis = {};
  Object.keys(entities).forEach(component => {
    const apiList = entities[component];
    apiList.forEach(api => {
      if (typeof apis[api] === 'function') {
        apis[api] = [];
      }
      apis[api] = [...(apis[api] || []), component];
    });
  });

  return apis;
}

function printReport(apis) {
  const apiList = Object.keys(apis).map(api => ({
    name: api,
    componentList: apis[api],
  }));
  apiList.sort((a, b) => b.componentList.length - a.componentList.length);
  console.log('| name | components | comments |');
  console.log('| ---- | ---------- | -------- |');
  apiList.forEach(({ name, componentList }) => {
    console.log('|', name, '|', componentList.join(', '), '| |');
  });
}

glob('components/*/*.md', (error, files) => {
  files.forEach(filePath => {
    // Read md file to parse content
    const content = fs.readFileSync(filePath, 'utf8');
    const component = filePath.match(COMPONENT_NAME)[1];

    // Parse lines to get API
    const lines = content.split(/[\r\n]+/);
    lines.forEach(line => {
      mappingPropLine(component, line);
    });
  });

  printReport(apiReport(components));
});
