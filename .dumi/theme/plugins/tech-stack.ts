import fs from 'fs';
import type { IApi } from 'dumi';
import ReactTechStack from 'dumi/dist/techStacks/react';
import tsToJs from '../utils/tsToJs';

import { dependencies, devDependencies } from '../../../package.json';

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

export default function techStackPlugin(api: IApi) {
  api.registerTechStack(() => new AntdReactTechStack());
}
