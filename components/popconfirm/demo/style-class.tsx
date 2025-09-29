import React from 'react';
import { Button, Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';

const App: React.FC = () => {
  const classNames: PopconfirmProps['classNames'] = {
    root: 'my-popconfirm',
    container: 'custom-content',
  };

  const styles: PopconfirmProps['styles'] = {
    root: { background: '#f6ffed' },
    container: { padding: '12px' },
  };

  // Function-based example
  const dynamicClassNames: PopconfirmProps['classNames'] = (info) => {
    if (info.props.placement === 'top') {
      return {
        root: 'top-popconfirm',
        container: 'top-content',
      };
    }
    return classNames;
  };

  const dynamicStyles: PopconfirmProps['styles'] = (info) => {
    if (info.props.placement === 'top') {
      return {
        root: { background: '#e6f7ff' },
        container: { padding: '16px' },
      };
    }
    return styles;
  };

  return (
    <>
      <Popconfirm
        title="静态样式"
        description="使用对象形式的 classNames 和 styles"
        classNames={classNames}
        styles={styles}
      >
        <Button style={{ marginRight: 16 }}>静态样式</Button>
      </Popconfirm>

      <Popconfirm
        title="动态样式"
        description="使用函数形式的 classNames 和 styles"
        placement="top"
        classNames={dynamicClassNames}
        styles={dynamicStyles}
      >
        <Button>动态样式</Button>
      </Popconfirm>
    </>
  );
};

export default App;
