import React from 'react';
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import ReactDOMServer from 'react-dom/server';
import { Col, Row } from '..';

expect.extend({ toMatchImageSnapshot });

const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const serve = require('koa-static');

const port = 5000;

describe('Grid image', () => {
  let browser;
  let server;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    const app = new Koa();
    app.use(views(path.join(__dirname, '../../../tests')));
    app.use(serve(path.join(__dirname, '../../../dist')));

    app.use(async ctx => {
      await ctx.render('index');
    });

    server = app.listen(port);

    // eslint-disable-next-line no-console
    console.info(`Listening to http://localhost:${port} 🚀`);
  });

  afterAll(() => {
    browser.close();
    server.close();
  });

  it('Basic', async () => {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}`);
    const html = ReactDOMServer.renderToStaticMarkup(
      <>
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </>,
    );
    await page.evaluate(innerHTML => {
      document.querySelector('#root').innerHTML = innerHTML;
    }, html);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });
});
