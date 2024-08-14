import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Flex, FloatButton } from 'antd';

const BOX_SIZE = 100;
const BUTTON_SIZE = 40;

const App: React.FC = () => (
  <Flex style={{ width: '100%', height: '100vh' }} justify="space-evenly" align="center">
    <div style={{ width: BOX_SIZE, height: BOX_SIZE, position: 'relative' }}>
      <FloatButton.Group
        trigger="click"
        shape="square"
        placement="top"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetInlineEnd: 'auto',
          insetBlockStart: -(BUTTON_SIZE / 2),
          insetBlockEnd: 'auto',
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="click"
        shape="square"
        placement="right"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: BOX_SIZE - BUTTON_SIZE / 2,
          insetInlineEnd: 'auto',
          insetBlockStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetBlockEnd: 'auto',
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="click"
        shape="square"
        placement="bottom"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetInlineEnd: 'auto',
          insetBlockStart: 'auto',
          insetBlockEnd: -(BUTTON_SIZE / 2),
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="click"
        shape="square"
        placement="left"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: -(BUTTON_SIZE / 2),
          insetInlineEnd: 'auto',
          insetBlockStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetBlockEnd: 'auto',
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </div>
    <div style={{ width: BOX_SIZE, height: BOX_SIZE, position: 'relative' }}>
      <FloatButton.Group
        trigger="click"
        placement="top"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetInlineEnd: 'auto',
          insetBlockStart: -(BUTTON_SIZE / 2),
          insetBlockEnd: 'auto',
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="click"
        placement="right"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: BOX_SIZE - BUTTON_SIZE / 2,
          insetInlineEnd: 'auto',
          insetBlockStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetBlockEnd: 'auto',
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="click"
        placement="bottom"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetInlineEnd: 'auto',
          insetBlockStart: 'auto',
          insetBlockEnd: -(BUTTON_SIZE / 2),
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="click"
        placement="left"
        icon={<CustomerServiceOutlined />}
        style={{
          position: 'absolute',
          insetInlineStart: -(BUTTON_SIZE / 2),
          insetInlineEnd: 'auto',
          insetBlockStart: BOX_SIZE / 2 - BUTTON_SIZE / 2,
          insetBlockEnd: 'auto',
        }}
      >
        <FloatButton />
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </div>
  </Flex>
);

export default App;
