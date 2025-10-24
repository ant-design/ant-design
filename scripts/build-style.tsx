import path from 'path';
import React from 'react';
import { createCache, extractStyle as extStyle, StyleProvider } from '@ant-design/cssinjs';
import Cascader from '@rc-component/cascader';
import fs from 'fs-extra';
import { renderToString } from 'react-dom/server';

import * as antd from '../components';

const output = path.join(__dirname, '../components/style/antd.css');

const blackList: string[] = ['ConfigProvider', 'Grid'];

const ComponentCustomizeRender: Record<
  string,
  (component: React.ComponentType<any>) => React.ReactNode
> = {
  Affix: (Affix) => (
    <Affix>
      <div />
    </Affix>
  ),
  BackTop: () => <antd.FloatButton.BackTop />,
  Cascader: () => (
    <>
      <Cascader />
      <Cascader.Panel />
    </>
  ),
  Dropdown: (Dropdown) => (
    <Dropdown menu={{ items: [] }}>
      <div />
    </Dropdown>
  ),
  Menu: (Menu) => <Menu items={[]} />,
  QRCode: (QRCode) => <QRCode value="https://ant.design" />,
  Tree: (Tree) => <Tree treeData={[]} />,
  Tag: (Tag) => (
    <>
      <Tag color="blue">Tag</Tag>
      <Tag color="success">Tag</Tag>
    </>
  ),
  Badge: (Badge: any) => (
    <>
      <Badge />
      <Badge.Ribbon />
    </>
  ),
  Space: (Space: any) => (
    <>
      <Space />
      <Space.Compact>
        <antd.Button />
      </Space.Compact>
    </>
  ),
  Input: (Input: any) => (
    <>
      <Input />
      <Input.Group>
        <Input />
        <Input />
      </Input.Group>
      <Input.Search />
      <Input.TextArea />
      <Input.Password />
      <Input.OTP />
    </>
  ),
  Modal: (Modal: any) => (
    <>
      <Modal />
      <Modal._InternalPanelDoNotUseOrYouWillBeFired />
      <Modal._InternalPanelDoNotUseOrYouWillBeFired type="confirm" />
    </>
  ),
  message: (message: any) => {
    const { _InternalPanelDoNotUseOrYouWillBeFired: PurePanel } = message;
    return <PurePanel />;
  },
  notification: (notification: any) => {
    const { _InternalPanelDoNotUseOrYouWillBeFired: PurePanel } = notification;
    return <PurePanel />;
  },
};

const defaultNode = () => (
  <>
    {Object.keys(antd)
      .filter(
        (name) =>
          !blackList.includes(name) &&
          (name[0] === name[0].toUpperCase() || ['message', 'notification'].includes(name)),
      )
      .map((compName) => {
        const Comp = (antd as any)[compName];

        const renderFunc = ComponentCustomizeRender[compName];

        if (renderFunc) {
          return <React.Fragment key={compName}>{renderFunc(Comp)}</React.Fragment>;
        }

        return <Comp key={compName} />;
      })}
  </>
);

function extractStyle(customTheme?: any): string {
  const cache = createCache();
  renderToString(
    <StyleProvider cache={cache}>
      {customTheme ? customTheme(defaultNode()) : defaultNode()}
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extStyle(cache, { plain: true, types: 'style' });

  return styleText;
}

async function buildStyle() {
  if (fs.existsSync(output)) {
    // Remove the old file if it exists
    fs.unlinkSync(output);
  }
  // fs.rmSync(output);
  const styleStr = extractStyle();
  fs.writeFileSync(output, styleStr);
}

buildStyle();
