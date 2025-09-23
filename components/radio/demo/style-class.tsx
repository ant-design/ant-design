import React from 'react';
import { Radio } from 'antd';
import type { RadioProps } from 'antd';

const App: React.FC = () => {
  const classNames: RadioProps['classNames'] = {
    root: 'custom-radio-wrapper',
    icon: 'custom-radio-icon',
    label: 'custom-radio-label',
  };

  const styles: RadioProps['styles'] = {
    root: { border: '1px solid #1890ff', padding: '8px', borderRadius: '4px' },
    icon: { transform: 'scale(0.8)' },
  };

  const classNamesFn: RadioProps['classNames'] = (info) => {
    return {
      root: 'custom-radio-wrapper',
      icon: info?.props?.checked ? 'check-radio-icon' : 'custom-radio-icon',
      label: 'custom-radio-label',
    };
  };

  const stylesFn: RadioProps['styles'] = (info) => {
    return {
      root: { border: '1px solid #1890ff', padding: '8px', borderRadius: '4px' },
      icon: info?.props?.checked ? { transform: 'scale(1.2)' } : {},
      label: { color: '#1890ff', fontWeight: 'bold' },
    };
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Radio classNames={classNames} styles={styles}>
          Styles and classNames Object
        </Radio>
      </div>

      <div>
        <Radio classNames={classNamesFn} styles={stylesFn} checked>
          Styles and classNames Function
        </Radio>
      </div>
    </div>
  );
};

export default App;
