import { Checkbox, Col, ConfigProvider, Radio, Row, Space, Switch } from 'antd';
import React from 'react';

export default () => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const id = setInterval(() => {
      setChecked((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, []);

  const nodes = (
    <Space>
      <Checkbox checked={checked}>Checkbox</Checkbox>
      <Radio checked={checked}>Radio</Radio>
      <Switch checked={checked} />
    </Space>
  );

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>{nodes}</Col>

      <Col span={24}>
        <ConfigProvider
          theme={{
            token: {
              motion: false,
            },
          }}
        >
          {nodes}
        </ConfigProvider>
      </Col>
    </Row>
  );
};
