import { DotChartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round' | 'default';
type AvatarShapeType = 'circle' | 'square';

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState<SizeType>('default');
  const [buttonShape, setButtonShape] = useState<ButtonShapeType>('default');
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>('circle');

  const handleActiveChange = (checked: boolean) => {
    setActive(checked);
  };

  const handleBlockChange = (checked: boolean) => {
    setBlock(checked);
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const handleShapeButton = (e: RadioChangeEvent) => {
    setButtonShape(e.target.value);
  };

  const handleAvatarShape = (e: RadioChangeEvent) => {
    setAvatarShape(e.target.value);
  };

  return (
    <>
      <Space>
        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
        <Skeleton.Avatar active={active} size={size} shape={avatarShape} />
        <Skeleton.Input active={active} size={size} />
      </Space>
      <br />
      <br />
      <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
      <br />
      <br />
      <Skeleton.Input active={active} size={size} block={block} />
      <br />
      <br />
      <Space>
        <Skeleton.Image active={active} />
        <Skeleton.Node active={active}>
          <DotChartOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
        </Skeleton.Node>
      </Space>
      <Divider />
      <Form layout="inline" style={{ margin: '16px 0' }}>
        <Space size={16} wrap>
          <Form.Item label="Active">
            <Switch checked={active} onChange={handleActiveChange} />
          </Form.Item>
          <Form.Item label="Button and Input Block">
            <Switch checked={block} onChange={handleBlockChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Button Shape">
            <Radio.Group value={buttonShape} onChange={handleShapeButton}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="round">Round</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Avatar Shape">
            <Radio.Group value={avatarShape} onChange={handleAvatarShape}>
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default App;
