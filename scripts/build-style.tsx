import path from 'path';
import React from 'react';
import { createCache, StyleProvider, extractStyle as extStyle } from '@ant-design/cssinjs';
import fs from 'fs-extra';
import { renderToString } from 'react-dom/server';
import * as antd from '../components';

const output = path.join(__dirname, '../components/style/antd.css');

const blackList: string[] = [
  'ConfigProvider',
  'Drawer',
  'Grid',
  'Modal',
  'Popconfirm',
  'Popover',
  'Tooltip',
  'Tour',
];

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
  Dropdown: (Dropdown) => (
    <Dropdown menu={{ items: [] }}>
      <div />
    </Dropdown>
  ),
  Menu: (Menu) => <Menu items={[]} />,
  QRCode: (QRCode) => <QRCode value="https://ant.design" />,
  Tree: (Tree) => <Tree treeData={[]} />,
};

const defaultNode = () => (
  <>
    {Object.keys(antd)
      .filter((name) => !blackList.includes(name) && name[0] === name[0].toUpperCase())
      .map((compName) => {
        const Comp = antd[compName];

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
