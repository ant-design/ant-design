const React = require('react');
const glob = require('glob');
const path = require('path');

const styleFiles = glob.globSync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|auto-complete|col|row|time-picker)/style/index.?(ts|tsx)',
  ),
);

module.exports = {
  generateCssinjs({ key, beforeRender, render }) {
    const EmptyElement = React.createElement('div');

    styleFiles.forEach((file) => {
      let useStyle = () => {};
      if (file.includes('grid')) {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const { useColStyle, useRowStyle } = require(file);
        useStyle = () => {
          useRowStyle();
          useColStyle();
        };
      } else {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        useStyle = require(file).default;
      }
      const Component = () => {
        useStyle(key);
        return EmptyElement;
      };

      const pathArr = file.split('/');
      const styleIndex = pathArr.lastIndexOf('style');
      const componentName = pathArr[styleIndex - 1];
      beforeRender?.(componentName);
      render(Component);
    });
  },
  filenames: styleFiles,
};
