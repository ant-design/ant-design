import React from 'react';
import { createStyles } from 'antd-style';
import { Tabs } from 'antd';

const useStyle = createStyles(({ token, css }) => {
  const antdTabsCls = '.ant-tabs';

  return css`
    ${antdTabsCls}${antdTabsCls}-card {
      ${antdTabsCls}-content {
        padding: ${token.padding}px;
        background: ${token.colorBgContainer};
      }

      ${antdTabsCls}-nav {
        margin: 0;

        ${antdTabsCls}-nav-wrap > ${antdTabsCls}-nav-list > ${antdTabsCls}-tab {
          background: transparent;
          border-color: transparent;

          &-active {
            border-color: ${token.colorBorderBg};
            background: ${token.colorBgContainer};
          }
        }

        &::before {
          display: none;
        }
      }
    }
  `;
});

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
  const { styles } = useStyle();

  return (
    <div className={styles}>
      <Tabs type="card" items={items} />
    </div>
  );
};

export default App;
