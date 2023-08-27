import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Popconfirm, Radio, Upload } from 'antd';
import { justifyContentValues } from 'antd/es/flex/classNames';

const App: React.FC = () => {
  const [justify, setJustify] = useState<React.CSSProperties['justifyContent']>('space-around');
  return (
    <>
      <Radio.Group value={justify} onChange={(e) => setJustify(e.target.value)}>
        {justifyContentValues.map((item) => (
          <Radio key={item} value={item}>
            {item}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      <Flex justify={justify} align="center">
        <Button>Flex</Button>
        <Button type="primary">Button</Button>
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button>Confirm</Button>
        </Popconfirm>
      </Flex>
    </>
  );
};

export default App;
