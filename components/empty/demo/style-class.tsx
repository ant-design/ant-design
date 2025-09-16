import React from 'react';
import { Button, Empty } from 'antd';

// Object-based classNames
const objectClassNames = {
  root: 'custom-empty-root',
  image: 'custom-empty-image',
  description: 'custom-empty-description',
  footer: 'custom-empty-footer',
};

// Object-based styles
const objectStyles = {
  root: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' },
  image: { filter: 'grayscale(100%)' },
  description: { color: '#1890ff', fontWeight: 'bold' },
  footer: { marginTop: '16px' },
};

// Function-based classNames
const functionClassNames = (info: { props: any }) => ({
  root: `dynamic-empty-root ${info.props.description ? 'with-desc' : 'no-desc'}`,
  image: 'dynamic-empty-image',
  description: 'dynamic-empty-description',
  footer: 'dynamic-empty-footer',
});

// Function-based styles
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
    <h4>1. Object-based classNames:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Custom classNames"
      classNames={objectClassNames}
    >
      <Button type="primary">Create Now</Button>
    </Empty>

    <h4 style={{ marginTop: 32 }}>2. Object-based styles:</h4>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Custom styles" styles={objectStyles}>
      <Button type="primary">Create Now</Button>
    </Empty>

    <h4 style={{ marginTop: 32 }}>3. Function-based classNames:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Dynamic classNames"
      classNames={functionClassNames}
    >
      <Button type="primary">Create Now</Button>
    </Empty>

    <h4 style={{ marginTop: 32 }}>4. Function-based styles:</h4>
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="Dynamic styles"
      styles={functionStyles}
    >
      <Button type="primary">Create Now</Button>
    </Empty>
  </div>
);

export default App;
