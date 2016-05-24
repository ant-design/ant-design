'use strict';
const recast = require('recast');
const builders = recast.types.builders;

// WAITING: esprima will support JSX
const parseOptions = {
  parser: require('esprima-fb'),
};

function isImport(node) {
  return node.type === 'ImportDeclaration';
}
function isNotImport(node) {
  return !isImport(node);
}

module.exports = (content) => {
  if (this.cacheable) {
    this.cacheable();
  }

  let imports = [];
  const ast = recast.visit(recast.parse(content, parseOptions), {
    visitArrayExpression(path) {
      const node = path.node;

      const firstItem = node.elements[0];
      const secondItem = node.elements[1];

      if (firstItem &&
          firstItem.type === 'Literal' &&
          firstItem.value === 'pre' &&
          secondItem.properties[0].value.value === '__react') { // TODO
        const codeAst = recast.parse(node.elements[2].elements[1].value, parseOptions);
        const astProgramBody = codeAst.program.body;

        const codeImports = astProgramBody.filter(isImport);
        imports = imports.concat(codeImports);

        const codeBody = astProgramBody.filter(isNotImport);
        const lastIndex = codeBody.length - 1;
        codeBody[lastIndex] = builders.returnStatement(
          codeBody[lastIndex].expression.arguments[0]
        );

        return builders.functionExpression(null, [
          builders.identifier('React'), // TODO
          builders.identifier('ReactDOM'),
        ], builders.blockStatement(codeBody));
      }

      this.traverse(path);
    },
  });

  ast.program.body = imports.concat(ast.program.body);
  return recast.print(ast).code;
};
