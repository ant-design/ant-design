import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

const App: React.FC = () => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <Checkbox
        onChange={onChange}
        classNames={{
          root: 'custom-checkbox-root',
          icon: 'custom-checkbox-icon',
          label: 'custom-checkbox-label',
        }}
        styles={{
          root: { backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' },
          icon: { color: '#1890ff' },
          label: { fontWeight: 'bold', color: '#333' },
        }}
      >
        Checkbox with custom styles
      </Checkbox>
      <br />
      <br />
      <Checkbox.Group
        options={['Apple', 'Pear', 'Orange']}
        defaultValue={['Apple']}
        classNames={{
          root: 'custom-checkbox-group-root',
        }}
        styles={{
          root: { backgroundColor: '#fafafa', padding: '12px', borderRadius: '6px' },
        }}
      />
    </>
  );
};

export default App;
