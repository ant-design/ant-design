import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const App: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large');

  return (
    <>
      <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Button type="primary" size={size}>
        Primary
      </Button>
      <Button size={size}>Default</Button>
      <Button type="dashed" size={size}>
        Dashed
      </Button>
      <br />
      <Button type="link" size={size}>
        Link
      </Button>
      <br />
      <Button type="primary" icon={<DownloadOutlined />} size={size} />
      <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
      <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
      <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
        Download
      </Button>
      <Button type="primary" icon={<DownloadOutlined />} size={size}>
        Download
      </Button>
    </>
  );
};

export default App;
