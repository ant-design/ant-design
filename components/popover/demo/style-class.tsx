import React from 'react';
import { Button, Popover } from 'antd';
import type { PopoverProps } from 'antd';

const App: React.FC = () => {
  const classNames: PopoverProps['classNames'] = {
    root: 'my-popover',
    container: 'custom-content',
  };

  const styles: PopoverProps['styles'] = {
    root: { background: '#f6ffed' },
    container: { padding: '12px' },
  };

  const dynamicClassNames: PopoverProps['classNames'] = (info) => {
    if (info.props.placement === 'top') {
      return {
        root: 'my-popover-top',
        container: 'custom-content-top',
      };
    }
    return classNames;
  };

  const dynamicStyles: PopoverProps['styles'] = (info) => {
    if (info.props.open) {
      return {
        root: { background: '#e6f7ff' },
        container: { padding: '16px' },
      };
    }
    return styles;
  };

  return (
    <>
      <Popover
        title="Static Style"
        content="This is a popover with static classNames and styles"
        classNames={classNames}
        styles={styles}
      >
        <Button style={{ marginRight: 16 }}>Static</Button>
      </Popover>

      <Popover
        title="Dynamic Style"
        content="This is a popover with dynamic classNames and styles"
        classNames={dynamicClassNames}
        styles={dynamicStyles}
        placement="top"
      >
        <Button>Dynamic</Button>
      </Popover>
    </>
  );
};

export default App;
