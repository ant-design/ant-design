import React from 'react';
import { Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    layout="vertical"
    style={{
      height: 300,
      borderRadius: '4px',
      border: '1px solid #e5e7eb',
    }}
  >
    <Splitter.Panel defaultSize={50}>
      <div>1</div>
    </Splitter.Panel>

    <Splitter.Panel>
      <Splitter>
        <Splitter.Panel>
          <div>2</div>
        </Splitter.Panel>

        <Splitter.Panel>
          <Splitter layout="vertical">
            <Splitter.Panel collapsible>
              <div>3</div>
            </Splitter.Panel>

            <Splitter.Panel>
              <div>4</div>
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>

        <Splitter.Panel>
          <div>5</div>
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

export default App;
