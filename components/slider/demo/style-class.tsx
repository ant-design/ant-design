import React from 'react';
import { Flex, Slider, Space } from 'antd';
import type { SliderSingleProps } from 'antd';

const classNamesObject: SliderSingleProps['classNames'] = {
  root: 'demo-slider-root',
  handle: 'demo-slider-handle',
  track: 'demo-slider-track',
};

const classNamesFn: SliderSingleProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-slider-root--disabled' };
  }
  return { root: 'demo-slider-root--enabled' };
};

const stylesObject: SliderSingleProps['styles'] = {
  root: { padding: '16px 8px' },
  track: { background: 'linear-gradient(90deg, #ffd666, #ffc53d)' },
  handle: { borderColor: '#ffc53d', boxShadow: '0 2px 8px rgba(255, 197, 61, 0.6)' },
};

const stylesFn: SliderSingleProps['styles'] = (info) => {
  if (info.props.vertical) {
    return {
      root: { backgroundColor: '#f0f0f0', padding: '8px 16px' },
      track: { background: 'linear-gradient(180deg, #91caff, #1677ff)' },
    };
  }
  return {
    root: { backgroundColor: '#fff2e8', padding: '12px' },
    track: { background: 'linear-gradient(90deg, #ff9c6e, #ff7a45)' },
  };
};

const App: React.FC = () => (
  <Space size={[16, 32]} wrap>
    <Flex vertical gap="large" style={{ width: 300 }}>
      <div>
        <p>classNames Object</p>
        <Slider classNames={classNamesObject} defaultValue={30} />
      </div>
      <div>
        <p>classNames Function (disabled)</p>
        <Slider disabled classNames={classNamesFn} defaultValue={30} />
      </div>
    </Flex>
    <Flex vertical gap="large" style={{ width: 300 }}>
      <div>
        <p>styles Object</p>
        <Slider styles={stylesObject} defaultValue={30} />
      </div>
      <div>
        <p>styles Function (horizontal)</p>
        <Slider styles={stylesFn} defaultValue={30} />
      </div>
    </Flex>
    <Flex gap="large">
      <div>
        <p>styles Function (vertical)</p>
        <div style={{ height: 200 }}>
          <Slider vertical styles={stylesFn} defaultValue={30} />
        </div>
      </div>
    </Flex>
  </Space>
);

export default App;
