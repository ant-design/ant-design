import React, { useState } from 'react';
import { CaretRightOutlined, createFromIconfontCN, RetweetOutlined } from '@ant-design/icons';
// import { RocketFilled } from '@ant-design/icons';
import { Button, Flex, Progress } from 'antd';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_4585480_4gzgcal5y0w.js'],
});

const App: React.FC = () => {
  const [percent, setPercent] = useState<number>(0);

  const increase = () => {
    let timer: ReturnType<typeof setInterval> | null;
    timer = setInterval(() => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 1;
        if (newPercent > 100) {
          clearInterval(timer as ReturnType<typeof setInterval>);
          timer = null;
          return 100;
        }
        return newPercent;
      });
    }, 100);
  };

  const decline = () => {
    setPercent(0);
  };
  return (
    <Flex gap="small" vertical>
      <Flex gap="small" vertical>
        <Progress
          percent={60}
          size="small"
          indicatorIcon={<IconFont type="icon-feiji" style={{ fontSize: 32 }} />}
        />
        <Progress
          percent={90}
          status="active"
          size="small"
          strokeColor="#B7EB8F"
          indicatorIcon={<IconFont type="icon-hangzou" style={{ fontSize: 26 }} />}
        />
        <Progress
          percent={70}
          status="exception"
          indicatorIcon={<IconFont type="icon-group43" style={{ fontSize: 22 }} />}
        />
        <Progress
          percent={percent}
          strokeColor="#fadb14"
          indicatorIcon={<IconFont type="icon-tongchengwaimai" style={{ fontSize: 26 }} />}
          showInfo={false}
        />
      </Flex>
      <Button.Group>
        <Button onClick={decline} icon={<RetweetOutlined />} />
        <Button onClick={increase} icon={<CaretRightOutlined />} />
      </Button.Group>
    </Flex>
  );
};
export default App;
