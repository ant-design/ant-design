/* eslint-disable unicorn/prefer-dom-node-text-content */

import type http from 'http';
import type https from 'https';
import { join } from 'path';
import { DOMParser } from 'domparser-rs';
import { globSync } from 'glob';
import { createServer } from 'http-server';
import fetch from 'isomorphic-fetch';
import uniq from 'lodash/uniq';
import portfinder from 'portfinder';

const components = uniq(
  globSync('components/!(overview)/*.md', { cwd: join(process.cwd()), dot: false }).map((path) =>
    path.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, ''),
  ),
).filter((component) => !component.includes('_util'));

describe('site test', () => {
  let server: http.Server | https.Server;
  const portPromise = portfinder.getPortPromise({
    port: 3000,
  });
  const render = async (path: string) => {
    const port = await portPromise;
    const resp = await fetch(`http://127.0.0.1:${port}${path}`).then(async (res) => {
      const html: string = await res.text();
      const root = new DOMParser().parseFromString(html, 'text/html');
      function getTextContent(node: any): string {
        if (!node) return '';
        if (typeof node.textContent === 'string') return node.textContent.trim();
        if (typeof node.innerText === 'string') return node.innerText.trim();
        // Fallback: recursively get text from children
        if (node.children && node.children.length > 0) {
          return Array.from(node.children)
            .map((child: any) => getTextContent(child))
            .join('')
            .trim();
        }
        return '';
      }
      function wrap(nodes: any[]) {
        const list = Array.isArray(nodes) ? nodes : [];
        return {
          length: list.length,
          text: () => {
            if (list.length === 0) return '';
            return list.map((n) => getTextContent(n)).join('');
          },
          first: () => wrap(list.slice(0, 1)),
        };
      }
      const $ = (selector: string) => {
        if (!root.querySelector) {
          console.warn('DOMParser does not support querySelector');
          return wrap([]);
        }

        // Handle complex selectors that domparser-rs might not support
        if (selector === '.markdown table') {
          // Find all .markdown elements and then find tables within them
          const markdownElements = root.querySelectorAll('.markdown');
          const tables = [];
          for (const markdown of Array.from(markdownElements)) {
            const tablesInMarkdown = markdown.querySelectorAll('table');
            tables.push(...Array.from(tablesInMarkdown));
          }
          return wrap(tables);
        } else {
          // Use querySelectorAll for simple selectors
          const elements = root.querySelectorAll(selector);
          const elementsArray = Array.from(elements);
          return wrap(elementsArray);
        }
      };

      return { status: res.status, $, root };
    });
    return resp;
  };

  const handleComponentName = (name: string) => {
    const [, componentName] = name.split('/');
    return componentName.toLowerCase().replace('-cn', '').replace('-', '');
  };

  const expectComponent = async (component: string) => {
    const { status, $, root } = await render(`/${component}/`);
    expect(status).toBe(200);

    // Get all h1 elements and find the one in main content (not in header)
    const h1Elements = root.querySelectorAll('h1');
    let mainH1Text = '';

    if (h1Elements.length >= 2) {
      // The second h1 should be the main content title
      const mainH1 = h1Elements[1];
      mainH1Text = mainH1.textContent || (mainH1 as any).innerText || '';
    } else if (h1Elements.length === 1) {
      // If only one h1, check its content
      const h1 = h1Elements[0];
      mainH1Text = h1.textContent || (h1 as any).innerText || '';
    }

    // Clean up the text and extract the main component name
    mainH1Text = mainH1Text.trim();

    expect(mainH1Text.toLowerCase()).toMatch(handleComponentName(component));

    /**
     * 断言组件的 api table 数量是否符合预期。
     * 在 #45066, #45017 中，因为 markdown 写法问题，导致 api table 无法渲染。
     * 结合每个组件页的 table 数量变动，可以判断出是否存在问题。
     * （table 数量相对比较稳定，如果 PR 有新增，则应该更新这里快照）
     */
    const tables = $('.markdown table');

    expect(tables.length).toMatchSnapshot();
  };

  beforeAll(async () => {
    const port = await portPromise;
    server = createServer({ root: join(process.cwd(), '_site') });
    server.listen(port);

    console.log(`site static server run: http://localhost:${port}`);
  });

  afterAll(() => {
    server?.close();
  });

  it('Basic Pages en', async () => {
    const { status, $ } = await render('/');
    expect($('title').first().text()).toEqual(
      `Ant Design - The world's second most popular React UI framework`,
    );
    expect(status).toBe(200);
  });

  it('Basic Pages zh', async () => {
    const { status, $ } = await render('/index-cn');
    expect($('title').first().text()).toEqual(`Ant Design - 一套企业级 UI 设计语言和 React 组件库`);
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
        expect(component).toBeTruthy();
      });
      it(`Component ${component} en Page`, async () => {
        await expectComponent(component);
        expect(component).toBeTruthy();
      });
    }
  }
});
