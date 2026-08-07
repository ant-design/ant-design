import React from 'react';
import { Tabs } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles((props) => {
  const { cssVar, prefixCls, css } = props;

  const antdTabsCls = `.${prefixCls}-tabs`;

  return css`
    ${antdTabsCls}${antdTabsCls}-card {
      ${antdTabsCls}-body {
        padding: ${cssVar.padding};
        background: ${cssVar.colorBgContainer};
      }

      ${antdTabsCls}-nav {
        margin: 0;

        ${antdTabsCls}-nav-wrap > ${antdTabsCls}-nav-list > ${antdTabsCls}-tab {
          background: transparent;
          border-color: transparent;
          &-active {
            border-color: ${cssVar.colorBorderBg};
            background: ${cssVar.colorBgContainer};
          }
        }

        &::before {
          display: none;
        }
      }
    }
  `;
});

const items = Array.from({ length: 3 }).map((_, i) => {
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
