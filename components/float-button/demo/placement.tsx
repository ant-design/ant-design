import React from 'react';
import {
  CommentOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Flex, FloatButton } from 'antd';

const BOX_SIZE = 100;
const BUTTON_SIZE = 40;

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
};

const boxStyle: React.CSSProperties = {
  width: BOX_SIZE,
  height: BOX_SIZE,
  position: 'relative',
};

const insetInlineEnd: React.CSSProperties['insetInlineEnd'][] = [
  (BOX_SIZE - BUTTON_SIZE) / 2,
  -(BUTTON_SIZE / 2),
  (BOX_SIZE - BUTTON_SIZE) / 2,
  BOX_SIZE - BUTTON_SIZE / 2,
];

const bottom: React.CSSProperties['bottom'][] = [
  BOX_SIZE - BUTTON_SIZE / 2,
  (BOX_SIZE - BUTTON_SIZE) / 2,
  -BUTTON_SIZE / 2,
  (BOX_SIZE - BUTTON_SIZE) / 2,
];

const icons = [
  <UpOutlined key="up" />,
  <RightOutlined key="right" />,
  <DownOutlined key="down" />,
  <LeftOutlined key="left" />,
];

const App: React.FC = () => (
  <Flex justify="space-evenly" align="center" style={wrapperStyle}>
    <div style={boxStyle}>
      {(['top', 'right', 'bottom', 'left'] as const).map((placement, i) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          insetInlineEnd: insetInlineEnd[i],
          bottom: bottom[i],
        };
        return (
          <FloatButton.Group
            key={placement}
            trigger="click"
            placement={placement}
            style={style}
            icon={icons[i]}
          >
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
          </FloatButton.Group>
        );
      })}
    </div>
  </Flex>
);

export default App;
