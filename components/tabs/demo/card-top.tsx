import React from 'react';
import { Tabs, theme as antTheme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';

const { useToken } = antTheme;

const useStyle = () => {
  const { token, theme } = useToken();

  return [
    useStyleRegister({ theme, token, path: ['components-tabs-demo-card-top'] }, () => {
      const antdTabsCls = '.ant-tabs';
      return {
        [`${antdTabsCls}${antdTabsCls}-card`]: {
          [`${antdTabsCls}-content`]: {
            padding: `${token.padding}px`,
            background: token.colorBgContainer,
          },
          [`${antdTabsCls}-nav`]: {
            margin: 0,
            [`${antdTabsCls}-nav-wrap > ${antdTabsCls}-nav-list > ${antdTabsCls}-tab`]: {
              background: 'transparent',
              borderColor: 'transparent',
              '&-active': {
                borderColor: token.colorBorderBg,
                background: token.colorBgContainer,
              },
            },
            '&::before': {
              display: 'none',
            },
          },
        },
      };
    }),
  ] as const;
};

const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab Title ${id}`,
    key: id,
    children: (
      <>
        <p>Content of Tab Pane {id}</p>
        <p>Content of Tab Pane {id}</p>
        <p>Content of Tab Pane {id}</p>
      </>
    ),
  };
});

const App = () => {
  const [wrapSSR] = useStyle();
  const { token } = useToken();

  const containerStyle = {
    padding: `${token.paddingLG}px`,
    background: token.colorBgLayout,
  };

  return <div style={containerStyle}>{wrapSSR(<Tabs type="card" items={items} />)}</div>;
};

export default App;
