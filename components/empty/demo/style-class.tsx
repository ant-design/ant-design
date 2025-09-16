import React from 'react';
import { Button, Empty, Typography } from 'antd';

// Object-based classNames and styles
const objectClassNames = {
  root: 'custom-empty-root',
  image: 'custom-empty-image',
  description: 'custom-empty-description',
  footer: 'custom-empty-footer',
};

const objectStyles = {
  root: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' },
  image: { filter: 'grayscale(100%)' },
  description: { color: '#1890ff', fontWeight: 'bold' },
  footer: { marginTop: '16px' },
};

// Function-based classNames and styles
const functionClassNames = (info: { props: any }) => ({
  root: `dynamic-empty-root ${info.props.description ? 'with-desc' : 'no-desc'}`,
  image: 'dynamic-empty-image',
  description: 'dynamic-empty-description',
  footer: 'dynamic-empty-footer',
});

const functionStyles = (info: { props: any }) => ({
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
});

const App: React.FC = () => (
  <div>
    <h4>1. Object-based classNames and styles:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <Typography.Text>
          Customize <a href="#API">Description</a>
        </Typography.Text>
      }
      classNames={objectClassNames}
      styles={objectStyles}
    >
      <Button type="primary">Create Now</Button>
    </Empty>

    <h4 style={{ marginTop: 32 }}>2. Function-based classNames and styles:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <Typography.Text>
          Dynamic <a href="#API">Description</a>
        </Typography.Text>
      }
      classNames={functionClassNames}
      styles={functionStyles}
    >
      <Button type="primary">Create Now</Button>
    </Empty>

    <h4 style={{ marginTop: 32 }}>3. Inline object classNames and styles:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      classNames={{
        root: 'inline-empty-root',
        image: 'inline-empty-image',
      }}
      styles={{
        root: { backgroundColor: '#fff2e8', padding: '16px' },
        image: { opacity: 0.8 },
      }}
    >
      <Button>Add Item</Button>
    </Empty>

    <h4 style={{ marginTop: 32 }}>4. Inline function classNames and styles:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="No data available"
      classNames={(info) => ({
        root: info.props.description ? 'has-description' : 'no-description',
        description: 'custom-desc',
      })}
      styles={(info) => ({
        root: {
          backgroundColor: info.props.description ? '#f0f0f0' : '#fafafa',
          padding: '12px',
        },
        description: { fontSize: '14px', color: '#666' },
      })}
    >
      <Button type="default">Refresh</Button>
    </Empty>
  </div>
);

export default App;
