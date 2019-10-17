const fetch = require('node-fetch');
const { join } = require('path');
const cheerio = require('cheerio');
const { createServer } = require('http-server');
const zhCN = require('../site/theme/zh-CN');
const enUS = require('../site/theme/en-US');

describe('site test', () => {
  let server;
  const host = 3000;
  const render = async path => {
    const resp = await fetch(`http://localhost:${host}${path}`).then(async res => {
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
  beforeAll(() => {
    server = createServer({
      root: join(process.cwd(), '_site'),
    });
    server.listen(host);
    console.log('site static server run: http://localhost:3000');
  });

  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  it('Home Page', async () => {
    const { status, $ } = await render('/');
    expect($('title').text()).toEqual(`Ant Design - ${enUS.messages['app.home.sloga1n']}`);
    expect(status).toBe(200);
  });
});
