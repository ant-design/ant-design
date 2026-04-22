import React from 'react';
import { Button, ConfigProvider, Flex, TextTooltip } from 'antd';

const text = 'Static placement';
const buttonWidth = 84;

const App: React.FC = () => (
  <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
    <Flex vertical justify="center" align="center" className="demo">
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <TextTooltip placement="topLeft" title={text}>
          <Button>TL</Button>
        </TextTooltip>
        <TextTooltip placement="top" title={text}>
          <Button>Top</Button>
        </TextTooltip>
        <TextTooltip placement="topRight" title={text}>
          <Button>TR</Button>
        </TextTooltip>
      </Flex>
      <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
        <Flex align="center" vertical>
          <TextTooltip placement="leftTop" title={text}>
            <Button>LT</Button>
          </TextTooltip>
          <TextTooltip placement="left" title={text}>
            <Button>Left</Button>
          </TextTooltip>
          <TextTooltip placement="leftBottom" title={text}>
            <Button>LB</Button>
          </TextTooltip>
        </Flex>
        <Flex align="center" vertical>
          <TextTooltip placement="rightTop" title={text}>
            <Button>RT</Button>
          </TextTooltip>
          <TextTooltip placement="right" title={text}>
            <Button>Right</Button>
          </TextTooltip>
          <TextTooltip placement="rightBottom" title={text}>
            <Button>RB</Button>
          </TextTooltip>
        </Flex>
      </Flex>
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <TextTooltip placement="bottomLeft" title={text}>
          <Button>BL</Button>
        </TextTooltip>
        <TextTooltip placement="bottom" title={text}>
          <Button>Bottom</Button>
        </TextTooltip>
        <TextTooltip placement="bottomRight" title={text}>
          <Button>BR</Button>
        </TextTooltip>
      </Flex>
    </Flex>
  </ConfigProvider>
);

export default App;
