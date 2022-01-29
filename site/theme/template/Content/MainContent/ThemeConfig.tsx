import * as React from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { DesignToken } from '../../../../../components/_util/theme';
import defaultTheme from '../../../../../components/_util/theme/default';

export interface ThemeConfigProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  formatMessage: (config: { id: string }) => string;
  onChangeTheme: (theme: DesignToken) => void;
}

export default ({ visible, onVisibleChange, formatMessage, onChangeTheme }: ThemeConfigProps) => {
  const [form] = Form.useForm();

  const keys = Object.keys(defaultTheme);

  const onFinish = (nextToken: DesignToken) => {
    onChangeTheme(nextToken);
  };

  return (
    <Drawer
      zIndex={10001}
      visible={visible}
      onClose={() => {
        onVisibleChange(false);
      }}
      title={formatMessage({ id: 'app.theme.switch.dynamic' })}
      extra={
        <Button onClick={form.submit} type="primary">
          Submit
        </Button>
      }
    >
      <Form form={form} initialValues={defaultTheme} layout="vertical" onFinish={onFinish}>
        {keys.map(key => (
          <Form.Item key={key} label={key} name={key}>
            <Input />
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  );
};
