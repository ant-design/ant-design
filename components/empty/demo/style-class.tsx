import React from 'react';
import { Button, Empty, Typography } from 'antd';

const App: React.FC = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={
      <Typography.Text>
        Customize <a href="#API">Description</a>
      </Typography.Text>
    }
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
);

export default App;
