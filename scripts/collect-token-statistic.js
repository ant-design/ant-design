/* eslint-disable import/no-unresolved,no-console,global-require,import/no-dynamic-require */

const chalk = require('chalk');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const { statistic } = require('../components/theme/util/statistic');

console.log(chalk.green(`🔥 Collecting token statistics...`));

const EmptyElement = React.createElement('div');

const styleFiles = glob.sync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|locale-provider|auto-complete|col|row|page-header|comment|time-picker|)/style/index.tsx',
  ),
);
styleFiles.forEach(file => {
  console.log(file);
  let useStyle = () => {};
  if (file.includes('grid')) {
    const { useColStyle, useRowStyle } = require(file);
    useStyle = () => {
      useRowStyle();
      useColStyle();
    };
  } else {
    useStyle = require(file).default;
  }
  const Component = () => {
    useStyle('file');
    return EmptyElement;
  };
  ReactDOMServer.renderToString(React.createElement(Component));
});

// // Dropdown
// ReactDOMServer.renderToString(
//   React.createElement(antd.Dropdown, { overlay: EmptyElement }, EmptyElement),
// );
//
// // Form
// ReactDOMServer.renderToString(React.createElement(antd.Form, undefined, EmptyElement));
//
// // message
// const Message = () => {
//   useMessageStyle('message');
//   return EmptyElement;
// };
// ReactDOMServer.renderToString(React.createElement(Message));
//
// // Notification
// const Notification = () => {
//   useNotificationStyle('notification');
//   return EmptyElement;
// };
// ReactDOMServer.renderToString(React.createElement(Notification));

(async () => {
  const tokenPath = `${process.cwd()}/components/version/token.tsx`;
  const content = `export default ${JSON.stringify(statistic, null, 2)}`;
  await fs.writeFile(tokenPath, content, 'utf8');

  console.log(chalk.green(`✅  Collecting token statistics done.`));
})();
