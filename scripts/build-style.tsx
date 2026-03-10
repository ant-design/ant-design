import Module from 'module';
import path from 'path';
import fs from 'fs-extra';
import minimist from 'minimist';

const originalResolve = (Module as any)._resolveFilename;

(Module as any)._resolveFilename = function (request: string, ...args: any[]) {
  if (request === 'antd') {
    return require.resolve('../components');
  }
  return originalResolve.call(this, request, ...args);
};

const run = async () => {
  const { extractStyle } = await import('@ant-design/static-style-extract');

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

    const styleStr = extractStyle();

    const finalStyleStr = layerContent ? `${layerContent}\n\n${styleStr}` : styleStr;

    fs.writeFileSync(output, finalStyleStr);
  }

  buildStyle();
};

run();
