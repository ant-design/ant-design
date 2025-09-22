import React from 'react';
import { Splitter } from 'antd';
import type { SplitterProps } from 'antd';

const classNamesObject: SplitterProps['classNames'] = {
  root: 'demo-splitter-root',
  panel: 'demo-splitter-panel',
  dragger: 'demo-splitter-dragger',
};

const classNamesFn: SplitterProps['classNames'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return { root: 'demo-splitter-root--vertical' };
  }
  return { root: 'demo-splitter-root--horizontal' };
};

const stylesObject: SplitterProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', marginBottom: 10 },
  panel: { backgroundColor: '#fafafa', padding: 16 },
  dragger: { backgroundColor: '#e6f4ff' },
};

const stylesFn: SplitterProps['styles'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return { root: { backgroundColor: '#fffbe6', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' } };
};

const App: React.FC = () => (
  <>
    <Splitter
      style={{ height: 200, marginBottom: 16 }}
      styles={stylesObject}
      classNames={classNamesObject}
    >
      <Splitter.Panel>
        <div>Panel 1 with function classNames</div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div>Panel 2 with function classNames</div>
      </Splitter.Panel>
    </Splitter>
    <Splitter
      orientation="vertical"
      style={{ height: 200 }}
      classNames={classNamesFn}
      styles={stylesFn}
    >
      <Splitter.Panel>
        <div>Panel 1 with function styles</div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div>Panel 2 with function styles</div>
      </Splitter.Panel>
    </Splitter>
  </>
);

export default App;
