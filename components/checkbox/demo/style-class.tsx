import React from 'react';
import { Checkbox, Divider } from 'antd';
import type { CheckboxProps } from 'antd';

const App: React.FC = () => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const classNames: CheckboxProps['classNames'] = {
    root: 'custom-checkbox-root',
    icon: 'custom-checkbox-icon',
    label: 'custom-checkbox-label',
  };

  const styles: CheckboxProps['styles'] = {
    root: { backgroundColor: '#fff', padding: '8px', borderRadius: '4px' },
    icon: { color: '#1890ff' },
    label: { fontWeight: 'bold', color: '#333' },
  };

  const classNamesFn: CheckboxProps['classNames'] = (info) => {
    return {
      root: 'custom-checkbox-root',
      icon: info?.props?.checked ? 'check-checkbox-icon' : 'custom-checkbox-icon',
      label: 'custom-checkbox-label',
    };
  };

  const stylesFn: CheckboxProps['styles'] = (info) => {
    return {
      root: {
        backgroundColor: info?.props?.checked ? '#f0f0f0' : '#fff',
        padding: '8px',
        borderRadius: '4px',
      },
      icon: { color: '#1890ff' },
      label: { fontWeight: 'bold', color: '#333' },
    };
  };

  return (
    <>
      <Checkbox onChange={onChange} classNames={classNames} styles={styles}>
        Styles and classNames Object
      </Checkbox>
      <Divider />
      <Checkbox checked onChange={onChange} classNames={classNamesFn} styles={stylesFn}>
        Styles and classNames Function
      </Checkbox>
    </>
  );
};

export default App;
