/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const fetch = require('node-fetch');
const { join } = require('path');
const cheerio = require('cheerio');
const glob = require('glob');
const uniq = require('lodash/uniq');
const { createServer } = require('http-server');

const components = uniq(
  glob
    .sync('components/*/*.md', {
      ignore: '**/{__tests__,_util,version,index.tsx}',
      cwd: join(process.cwd()),
      dot: false,
    })
    .map(path => path.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')),
);

describe('site test', () => {
  let server;
  const port = 3000;
  const render = async path => {
    const resp = await fetch(`http://127.0.0.1:${port}${path}`).then(async res => {
      const html = await res.text();
      const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });
      return {
        html,
        status: res.status,
        $,
      };
    });
    return resp;
  };

  const handleComponentName = name => {
    const componentName = name.split('/')[1];
    return componentName.toLowerCase().replace('-', '');
  };

  const expectComponent = async component => {
    const { status, $ } = await render(`/${component}/`);
    expect(status).toBe(200);
    expect($('.markdown > h1').text().toLowerCase()).toMatch(handleComponentName(component));
  };

  beforeAll(() => {
    server = createServer({
      root: join(process.cwd(), '_site'),
    });
    server.listen(port);
    // eslint-disable-next-line no-console
    console.log('site static server run: http://localhost:3000');
  });

  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  it('Basic Pages en', async () => {
    const { status, $ } = await render('/');
    expect($('title').text()).toEqual(
      `Ant Design - The world's second most popular React UI framework`,
    );
    expect(status).toBe(200);
  });

  it('Basic Pages zh', async () => {
    const { status, $ } = await render('/index-cn');
    expect($('title').text()).toEqual(`Ant Design - 一套企业级 UI 设计语言和 React 组件库`);
    expect(status).toBe(200);
  });

  for (const component of components) {
    if (component.split('/').length < 3) {
      it(`Component ${component} zh Page`, async () => {
        await expectComponent(component);
      });

      it(`Component ${component} en Page`, async () => {
        await expectComponent(component);
      });
    }
  }
});
