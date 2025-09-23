import React from 'react';
import { Space, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';

const App: React.FC = () => {
  const classNamesObject: TimePickerProps['classNames'] = {
    root: 'custom-time-picker-root',
    prefix: 'custom-prefix',
    input: 'custom-input',
    suffix: 'custom-suffix',
    popup: 'custom-popup-root',
  };

  const stylesObject: TimePickerProps['styles'] = {
    root: {
      borderColor: '#1890ff',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    prefix: {
      color: '#1890ff',
      marginRight: 8,
    },
    input: {
      color: '#262626',
    },
    suffix: {
      color: '#8c8c8c',
    },
    popup: {
      root: {
        borderRadius: 8,
        boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
        border: '2px solid #fffbe6',
      },
    },
  };

  const classNamesFn: TimePickerProps['classNames'] = (info) => {
    return {
      root: info.props.size === 'large' ? 'large-time-picker-root' : 'custom-time-picker-root',
      prefix: info.props.size === 'large' ? 'large-prefix' : 'custom-prefix',
      input: info.props.size === 'large' ? 'large-input' : 'custom-input',
    };
  };

  const stylesFn: TimePickerProps['styles'] = (info) => {
    return {
      root: {
        borderColor: '#1890ff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
      prefix: {
        color: '#1890ff',
        marginRight: 8,
      },
      input: {
        color: '#262626',
        fontWeight: info.props.size === 'large' ? 500 : 300,
      },
      suffix: {
        color: '#8c8c8c',
      },
      popup: {
        root: {
          borderRadius: 8,
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          border: info.props.size === 'large' ? '2px solid #1890ff' : 'none',
        },
      },
    };
  };

  return (
    <Space size="middle" style={{ display: 'flex' }}>
      <Space wrap>
        <TimePicker
          size="small"
          placeholder="small"
          classNames={classNamesObject}
          styles={stylesObject}
        />

        <TimePicker size="large" placeholder="large" classNames={classNamesFn} styles={stylesFn} />
      </Space>
    </Space>
  );
};

export default App;
