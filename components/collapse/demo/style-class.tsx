import React from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from '..';

const App: React.FC = () => {
  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: (
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </p>
      ),
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: (
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </p>
      ),
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: (
        <p>
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be
          found as a welcome guest in many households across the world.
        </p>
      ),
    },
  ];

  const collapseClassNames: CollapseProps['classNames'] = {
    root: 'custom-collapse-root',
    header: 'custom-collapse-header',
    title: 'custom-collapse-title',
    body: 'custom-collapse-body',
    icon: 'custom-collapse-icon',
  };

  const collapseStyles: CollapseProps['styles'] = {
    root: {
      backgroundColor: '#fafafa',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
    },
    header: {
      backgroundColor: '#f0f0f0',
      padding: '12px 16px',
      fontWeight: 'bold',
    },
    title: {
      color: '#1890ff',
    },
    body: {
      backgroundColor: '#ffffff',
      padding: '16px',
    },
    icon: {
      color: '#52c41a',
      fontSize: '16px',
    },
  };

  const functionBasedClassNames: CollapseProps['classNames'] = ({ props }) => ({
    root: `dynamic-collapse-${props.size}`,
    header: 'dynamic-header',
    title: props.ghost ? 'ghost-title' : 'normal-title',
    body: 'dynamic-body',
    icon: props.expandIconPlacement === 'end' ? 'end-icon' : 'start-icon',
  });

  const functionBasedStyles: CollapseProps['styles'] = ({ props }) => ({
    root: {
      borderWidth: props.bordered ? '2px' : '0px',
      opacity: props.ghost ? 0.8 : 1,
    },
    header: {
      fontSize: props.size === 'large' ? '16px' : '14px',
    },
    title: {
      fontWeight: props.size === 'large' ? 'bold' : 'normal',
    },
    body: {
      fontSize: '14px',
    },
    icon: {
      transform: props.expandIconPlacement === 'end' ? 'rotate(180deg)' : 'none',
    },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4>Static classNames and styles</h4>
        <Collapse
          items={items}
          defaultActiveKey={['1']}
          classNames={collapseClassNames}
          styles={collapseStyles}
        />
      </div>

      <div>
        <h4>Function-based classNames and styles</h4>
        <Collapse
          items={items}
          defaultActiveKey={['2']}
          size="large"
          ghost
          expandIconPlacement="end"
          classNames={functionBasedClassNames}
          styles={functionBasedStyles}
        />
      </div>
    </div>
  );
};

export default App;
