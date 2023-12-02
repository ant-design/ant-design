import React, { useState } from 'react';
import { Checkbox, ConfigProvider, Divider, Form, Input, Radio, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const ConfigDisplay = () => {
  const { componentDisabled, componentSize } = ConfigProvider.useConfig();

  return (
    <>
      <Form.Item label="componentSize value">
        <Input value={componentSize} />
      </Form.Item>
      <Form.Item label="componentDisabled value">
        <Input value={String(componentDisabled)} disabled={componentDisabled} />
      </Form.Item>
    </>
  );
};

const App: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType>('small');
  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <div>
      <Space>
        <Radio.Group
          value={componentSize}
          onChange={(e) => {
            setComponentSize(e.target.value);
          }}
        >
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
        <Checkbox checked={disabled} onChange={(e) => setDisabled(e.target.checked)}>
          Form disabled
        </Checkbox>
      </Space>
      <Divider />
      <ConfigProvider componentSize={componentSize}>
        <div className="example">
          <Form disabled={disabled}>
            <ConfigDisplay />
          </Form>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default App;
