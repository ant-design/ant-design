/* eslint-disable no-console */
import React from 'react';
import chalk from 'chalk';
import fs from 'fs-extra';
import ProgressBar from 'progress';
import ReactDOMServer from 'react-dom/server';

import { DesignTokenContext } from '../components/theme/internal';
import seedToken from '../components/theme/themes/seed';
import { statistic } from '../components/theme/util/statistic';
import { generateCssinjs, styleFiles } from './generate-cssinjs';

console.log(chalk.green(`🔥 Collecting token statistics...`));

const bar = new ProgressBar('🚀 Collecting by component: [:bar] :component (:current/:total)', {
  complete: '=',
  incomplete: ' ',
  total: styleFiles.length,
});

(async () => {
  await generateCssinjs({
    key: 'file',
    beforeRender(componentName: string) {
      bar.tick(1, { component: componentName });
    },
    render(Component: any) {
      ReactDOMServer.renderToString(React.createElement(Component));
      // Render wireframe
      const wireframeToken = { ...seedToken, wireframe: true };
      ReactDOMServer.renderToString(
        React.createElement(
          DesignTokenContext.Provider,
          {
            value: {
              token: wireframeToken,
              override: {
                override: wireframeToken,
              },
            },
          },
          React.createElement(Component),
        ),
      );
    },
  });

  const tokenPath = `${process.cwd()}/components/version/token.json`;
  fs.writeJsonSync(tokenPath, statistic, 'utf8');
  console.log(chalk.green(`✅  Collected token statistics successfully, check it in`), tokenPath);
})();
