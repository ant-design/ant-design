import React from 'react';
import { Divider, Flex, Splitter } from 'antd';

const App: React.FC = () => (
  <Splitter
    style={{
      height: 300,
      borderRadius: 4,
      border: '1px solid #e5e7eb',
    }}
  >
    <Splitter.Panel defaultSize={20}>
      <Flex align="center" vertical>
        <Divider>1</Divider>
        <div>defaultSize: 20</div>
      </Flex>
    </Splitter.Panel>

    <Splitter.Panel defaultSize="25%" max={40} min={10} resizable={false}>
      <Flex align="center" vertical>
        <Divider>2</Divider>
        <div>min: 10</div>
        <div>max: 40</div>
        <div>defaultSize: 25%</div>
        <div>resizable: false</div>
      </Flex>
    </Splitter.Panel>

    <Splitter.Panel collapsible>
      <Flex align="center" vertical>
        <Divider>3</Divider>
        <div>collapsible: true</div>
      </Flex>
    </Splitter.Panel>

    <Splitter.Panel>
      <Divider>4</Divider>
    </Splitter.Panel>
  </Splitter>
);

export default App;
