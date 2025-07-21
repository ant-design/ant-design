import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import createEmotionServer from '@emotion/server/create-instance';
import type { IApi, IRoute } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import tsToJs from './utils/tsToJs';

import { dependencies, devDependencies } from '../../package.json';

function extractEmotionStyle(html: string) {
  // copy from emotion ssr
  // https://github.com/vercel/next.js/blob/deprecated-main/examples/with-emotion-vanilla/pages/_document.js
  const styles = global.__ANTD_STYLE_CACHE_MANAGER_FOR_SSR__.getCacheList().map((cache) => {
    const result = createEmotionServer(cache).extractCritical(html);
    if (!result.css) {
      return null;
    }

    const { css, ids } = result;

    return {
      key: cache.key,
      css,
      ids,
      tag: `<style data-emotion="${cache.key} ${result.ids.join(' ')}">${result.css}</style>`,
    };
  });
  return styles.filter(Boolean);
}

export const getHash = (str: string, length = 8) =>
  createHash('md5').update(str).digest('hex').slice(0, length);

/**
 * extends dumi internal tech stack, for customize previewer props
 */
class AntdReactTechStack extends ReactTechStack {
  generatePreviewerProps(...[props, opts]: any) {
    props.pkgDependencyList = { ...devDependencies, ...dependencies };
    props.jsx ??= '';

    if (opts.type === 'code-block') {
      props.jsx = opts?.entryPointCode ? tsToJs(opts.entryPointCode) : '';
    }

    if (opts.type === 'external') {
      // try to find md file with the same name as the demo tsx file
      const locale = opts.mdAbsPath.match(/index\.([a-z-]+)\.md$/i)?.[1];
      const mdPath = opts.fileAbsPath!.replace(/\.\w+$/, '.md');
      const md = fs.existsSync(mdPath) ? fs.readFileSync(mdPath, 'utf-8') : '';

      const codePath = opts.fileAbsPath!.replace(/\.\w+$/, '.tsx');
      const code = fs.existsSync(codePath) ? fs.readFileSync(codePath, 'utf-8') : '';

      props.jsx = tsToJs(code);

      if (md) {
        // extract description & css style from md file
        const blocks: Record<string, string> = {};

        const lines = md.split('\n');

        let blockName = '';
        let cacheList: string[] = [];

        // Get block name
        const getBlockName = (text: string) => {
          if (text.startsWith('## ')) {
            return text.replace('## ', '').trim();
          }

          if (text.startsWith('```css') || text.startsWith('<style>')) {
            return 'style';
          }

          return null;
        };

        // Fill block content
        const fillBlock = (name: string, lineList: string[]) => {
          if (lineList.length) {
            let fullText: string;

            if (name === 'style') {
              fullText = lineList
                .join('\n')
                .replace(/<\/?style>/g, '')
                .replace(/```(\s*css)/g, '');
            } else {
              fullText = lineList.slice(1).join('\n');
            }

            blocks[name] = fullText;
          }
        };

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Mark as new block
          const nextBlockName = getBlockName(line);
          if (nextBlockName) {
            fillBlock(blockName, cacheList);

            // Next Block
            blockName = nextBlockName;
            cacheList = [line];
          } else {
            cacheList.push(line);
          }
        }

        // Last block
        fillBlock(blockName, cacheList);

        props.description = blocks[locale];
        props.style = blocks.style;
      }
    }

    return props;
  }
}

const resolve = (p: string): string => require.resolve(p);

const RoutesPlugin = async (api: IApi) => {
  const chalk = await import('chalk').then((m) => m.default);
  // const ssrCssFileName = `ssr-${Date.now()}.css`;

  const writeCSSFile = (key: string, hashKey: string, cssString: string) => {
    const fileName = `style-${key}.${getHash(hashKey)}.css`;

    const filePath = path.join(api.paths.absOutputPath, fileName);

    if (!fs.existsSync(filePath)) {
      api.logger.event(chalk.grey(`write to: ${filePath}`));
      fs.writeFileSync(filePath, cssString, 'utf8');
    }

    return fileName;
  };

  const addLinkStyle = (html: string, cssFile: string, prepend = false) => {
    const prefix = api.userConfig.publicPath || api.config.publicPath;

    if (prepend) {
      return html.replace('<head>', `<head><link rel="stylesheet" href="${prefix + cssFile}">`);
    }

    return html.replace('</head>', `<link rel="stylesheet" href="${prefix + cssFile}"></head>`);
  };

  api.registerTechStack(() => new AntdReactTechStack());

  api.modifyRoutes((routes) => {
    // TODO: append extra routes, such as home, changelog, form-v3

    const extraRoutesList: IRoute[] = [
      {
        id: 'changelog-cn',
        path: 'changelog-cn',
        absPath: '/changelog-cn',
        parentId: 'DocLayout',
        file: resolve('../../CHANGELOG.zh-CN.md'),
      },
      {
        id: 'changelog',
        path: 'changelog',
        absPath: '/changelog',
        parentId: 'DocLayout',
        file: resolve('../../CHANGELOG.en-US.md'),
      },
    ];

    extraRoutesList.forEach((itemRoute) => {
      routes[itemRoute.path] = itemRoute;
    });

    return routes;
  });

  api.modifyExportHTMLFiles((files) =>
    files
      // exclude dynamic route path, to avoid deploy failed by `:id` directory
      .filter((f) => !f.path.includes(':'))
      .map((file) => {
        // 1. 提取 antd-style 样式
        const styles = extractEmotionStyle(file.content);

        // 2. 提取每个样式到独立 css 文件
        styles.forEach((result) => {
          api.logger.event(
            `${chalk.yellow(file.path)} include ${chalk.blue`[${result!.key}]`} ${chalk.yellow(
              result!.ids.length,
            )} styles`,
          );

          const cssFile = writeCSSFile(result!.key, result!.ids.join(''), result!.css);

          file.content = addLinkStyle(file.content, cssFile);
        });

        return file;
      }),
  );

  // add ssr css file to html
  api.modifyConfig((memo) => {
    memo.styles ??= [];
    // memo.styles.push(`/${ssrCssFileName}`);

    return memo;
  });
};

export default RoutesPlugin;
