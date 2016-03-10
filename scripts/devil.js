'use strict';

const babel = require('babel-core');
const recast = require('recast');
const builders = recast.types.builders;

const babelrc = {
  presets: ['es2015', 'react']
};

// const demo = 'import { Button } from \'antd\';' +
//         'ReactDOM.render(<div>' +
//         '  <Button type="primary">主按钮</Button>' +
//         '  <Button>次按钮</Button>' +
//         '  <Button type="ghost">幽灵按钮</Button>' +
//         '</div>,' +
//         'document.getElementById(\'components-button-demo-basic\'));';
// devil(demo);
module.exports = function devil(demo, params) {
  const compiled = babel.transform(demo, babelrc).code;

  const ast = recast.parse(compiled);
  const astProgramBody = ast.program.body;
  const lastIndex = astProgramBody.length - 1;
  astProgramBody[lastIndex] = builders.returnStatement(
    astProgramBody[lastIndex].expression.arguments[0]
  );

  const code = recast.print(ast).code;
  return new Function((params || []).join(', '), code);
}
