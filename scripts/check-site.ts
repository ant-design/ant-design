/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import cheerio from 'cheerio';
import { globSync } from 'glob';
import type http from 'http';
import { createServer } from 'http-server';
import type https from 'https';
import fetch from 'isomorphic-fetch';
import uniq from 'lodash/uniq';
import { join } from 'path';

const components = uniq(
  globSync('components/!(overview)/*.md', { cwd: join(process.cwd()), dot: false }).map((path) =>
    path.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, ''),
  ),
);

describe('site test', () => {
  let server: http.Server | https.Server;
  const port = 3000;
  const render = async (path: string) => {
    const resp = await fetch(`http://127.0.0.1:${port}${path}`).then(async (res) => {
      const html = await res.text();
      const $ = cheerio.load(html, { decodeEntities: false, recognizeSelfClosing: true });
      return { html, status: res.status, $ };
    });
    return resp;
  };

  const handleComponentName = (name: string) => {
    const [, componentName] = name.split('/');
    return componentName.toLowerCase().replace('-cn', '').replace('-', '');
  };

  const expectComponent = async (component: string) => {
    const { status, $ } = await render(`/${component}/`);
    expect(status).toBe(200);
    expect($('h1').text().toLowerCase()).toMatch(handleComponentName(component));
  };

  beforeAll(() => {
    server = createServer({ root: join(process.cwd(), '_site') });
    server.listen(port);
    // eslint-disable-next-line no-console
    console.log('site static server run: http://localhost:3000');
  });

  afterAll(() => {
    server?.close();
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

  it('Overview en', async () => {
    const { status, $ } = await render('/components/overview');
    expect(status).toBe(200);
    expect($('h1').text()).toMatch(`Overview`);
  });

  it('Overview zh', async () => {
    const { status, $ } = await render('/components/overview-cn');
    expect(status).toBe(200);
    expect($('h1').text()).toMatch(`组件总览`);
  });

  for (const component of components) {
    if (component.split('/').length < 3) {
      it(`Component ${component} zh Page`, async () => {
        await expectComponent(`${component}-cn`);
      });
      it(`Component ${component} en Page`, async () => {
        await expectComponent(component);
      });
    }
  }
});
