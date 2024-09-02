/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Splitter } from 'antd';

import type { PanelProps, SplitterProps } from '../interface';

const SplitterDemo = ({ items = [{}, {}], ...props }: { items?: PanelProps[] } & SplitterProps) => (
  <Splitter {...props}>
    {items?.map((item, idx) => (
      <Splitter.Panel key={idx} {...item}>
        {idx}
      </Splitter.Panel>
    ))}
  </Splitter>
);

const App: React.FC = () => (
  <>
    <Splitter
      transition
      style={{ height: 300, borderRadius: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel collapsible>
        <div style={{ padding: 12 }}>first</div>
      </Splitter.Panel>

      <Splitter.Panel>
        <div style={{ padding: 12 }}>second</div>
      </Splitter.Panel>
    </Splitter>

    <br />
    <Splitter
      style={{ height: 300, borderRadius: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      layout="vertical"
    >
      <Splitter.Panel collapsible={{ start: true }} min={10}>
        <div style={{ padding: 12 }}>first</div>
      </Splitter.Panel>

      <Splitter.Panel min={20}>
        <div style={{ padding: 12 }}>second</div>
      </Splitter.Panel>
    </Splitter>

    <br />
    <Splitter
      layout="vertical"
      style={{ height: 300, borderRadius: 4, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Splitter.Panel>
        <Splitter>
          <Splitter.Panel>
            <div>111</div>
          </Splitter.Panel>

          <Splitter.Panel>
            <Splitter layout="vertical">
              <Splitter.Panel>
                <div>111</div>
              </Splitter.Panel>

              <Splitter.Panel>
                <div>111</div>
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>

          <Splitter.Panel>
            <div>2222</div>
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>

      <Splitter.Panel>
        <SplitterDemo
          items={[
            { size: 10, className: 'wanpan-panel', style: { background: 'red' } },
            { max: 75 },
            {},
          ]}
        />
      </Splitter.Panel>
    </Splitter>
  </>
);

export default App;
