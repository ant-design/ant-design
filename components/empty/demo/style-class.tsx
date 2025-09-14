import React, { useState } from 'react';
import { Button, Empty, Switch, Typography } from 'antd';

const App: React.FC = () => {
  const [hasDescription, setHasDescription] = useState(true);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Switch
          checked={hasDescription}
          onChange={setHasDescription}
          checkedChildren="With Description"
          unCheckedChildren="No Description"
        />
      </div>

      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          hasDescription ? (
            <Typography.Text>
              Customize <a href="#API">Description</a>
            </Typography.Text>
          ) : null
        }
        // Object-based classNames and styles
        classNames={{
          root: 'custom-empty-root',
          image: 'custom-empty-image',
          description: 'custom-empty-description',
          footer: 'custom-empty-footer',
        }}
        styles={{
          root: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' },
          image: { filter: 'grayscale(100%)' },
          description: { color: '#1890ff', fontWeight: 'bold' },
          footer: { marginTop: '16px' },
        }}
      >
        <Button type="primary">Create Now</Button>
      </Empty>

      <div style={{ marginTop: 32 }}>
        <h4>Function-based Example:</h4>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            hasDescription ? (
              <Typography.Text>
                Dynamic <a href="#API">Description</a>
              </Typography.Text>
            ) : null
          }
          // Function-based classNames and styles
          classNames={(info) => ({
            root: `dynamic-empty-root ${info.props.description ? 'with-desc' : 'no-desc'}`,
            image: 'dynamic-empty-image',
            description: 'dynamic-empty-description',
            footer: 'dynamic-empty-footer',
          })}
          styles={(info) => ({
            root: {
              backgroundColor: info.props.description ? '#e6f7ff' : '#f6ffed',
              padding: '20px',
              borderRadius: '8px',
              border: info.props.description ? '1px solid #91d5ff' : '1px solid #b7eb8f',
            },
            image: {
              filter: info.props.description ? 'hue-rotate(180deg)' : 'sepia(100%)',
            },
            description: {
              color: info.props.description ? '#1890ff' : '#52c41a',
              fontWeight: 'bold',
            },
            footer: { marginTop: '16px' },
          })}
        >
          <Button type={hasDescription ? 'primary' : 'default'}>
            {hasDescription ? 'Create Now' : 'Add Item'}
          </Button>
        </Empty>
      </div>
    </div>
  );
};

export default App;
