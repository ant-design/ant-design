import path from 'path';
import { extractStyle } from '@ant-design/static-style-extract';
import fs from 'fs-extra';
import minimist from 'minimist';

// Site build only, not use in npm package build
const argv = minimist(process.argv.slice(2));
const enableLayer = argv.layer !== undefined;
const layerContent = typeof argv.layer === 'string' ? argv.layer : '';

const output = path.join(
  __dirname,
  '..',
  'components',
  'style',
  enableLayer ? '~antd.layer.css' : 'antd.css',
);

function buildStyle() {
  if (fs.existsSync(output)) {
    fs.unlinkSync(output);
  }

  const styleStr = extractStyle({
    antdInstance: require('../components'),
  });

  const finalStyleStr = layerContent ? `${layerContent}\n\n${styleStr}` : styleStr;

  fs.writeFileSync(output, finalStyleStr);
}

buildStyle();
