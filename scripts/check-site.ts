/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import type http from 'http';
import type https from 'https';
import { join } from 'path';
import { load } from 'cheerio';
import { globSync } from 'glob';
import { createServer } from 'http-server';
import fetch from 'isomorphic-fetch';
import uniq from 'lodash/uniq';

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
      const html: string = await res.text();
      const $ = load(html, { decodeEntities: false, recognizeSelfClosing: true });
      return { status: res.status, $ };
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

    /**
     * 断言组件的 api table 数量是否符合预期。
     * 在 #45066, #45017 中，因为 markdown 写法问题，导致 api table 无法渲染。
     * 结合每个组件页的 table 数量变动，可以判断出是否存在问题。
     * （table 数量相对比较稳定，如果 PR 有新增，则应该更新这里快照）
     */
    const tables = $('.markdown table');

    expect(tables.length).toMatchSnapshot();
  };

  beforeAll(() => {
    server = createServer({ root: join(process.cwd(), '_site') });
    server.listen(port);
    // eslint-disable-next-line no-console
    console.log(`site static server run: http://localhost:${port}`);
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

  it('Resource en', async () => {
    const { status, $ } = await render('/docs/resources');
    expect(status).toBe(200);
    expect($('h1').text()).toMatch(`Resources`);
  });

  it('Resource zh', async () => {
    const { status, $ } = await render('/docs/resources-cn');
    expect(status).toBe(200);
    expect($('h1').text()).toMatch(`资源`);
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
