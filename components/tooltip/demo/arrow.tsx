import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Flex, Segmented, Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 80;

const App: React.FC = () => {
  const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      <Segmented
        value={arrow}
        options={['Show', 'Hide', 'Center']}
        onChange={setArrow}
        style={{ marginBottom: 24 }}
      />
      <Flex vertical justify="center" align="center" className="demo">
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="topLeft" title={text} arrow={mergedArrow}>
            <Button>TL</Button>
          </Tooltip>
          <Tooltip placement="top" title={text} arrow={mergedArrow}>
            <Button>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" title={text} arrow={mergedArrow}>
            <Button>TR</Button>
          </Tooltip>
        </Flex>
        <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
          <Flex align="center" vertical>
            <Tooltip placement="leftTop" title={text} arrow={mergedArrow}>
              <Button>LT</Button>
            </Tooltip>
            <Tooltip placement="left" title={text} arrow={mergedArrow}>
              <Button>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text} arrow={mergedArrow}>
              <Button>LB</Button>
            </Tooltip>
          </Flex>
          <Flex align="center" vertical>
            <Tooltip placement="rightTop" title={text} arrow={mergedArrow}>
              <Button>RT</Button>
            </Tooltip>
            <Tooltip placement="right" title={text} arrow={mergedArrow}>
              <Button>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text} arrow={mergedArrow}>
              <Button>RB</Button>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="bottomLeft" title={text} arrow={mergedArrow}>
            <Button>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" title={text} arrow={mergedArrow}>
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            <Button>BR</Button>
          </Tooltip>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
