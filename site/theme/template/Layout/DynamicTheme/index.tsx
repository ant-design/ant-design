import * as React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Drawer, Form, Input, Button, InputNumber, Checkbox, Space } from 'antd';
import { useIntl } from 'react-intl';
import { BugOutlined, EyeOutlined } from '@ant-design/icons';
import { SeedToken } from '../../../../../components/_util/theme';
import defaultSeedToken from '../../../../../components/_util/theme/themes/default';
import Preview from './Preview';

export interface ThemeConfigProps {
  componentName: string;
  defaultToken: SeedToken;
  onChangeTheme: (theme: SeedToken) => void;
}

export default ({ onChangeTheme, defaultToken, componentName }: ThemeConfigProps) => {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [form] = Form.useForm();

  const keys = Object.keys(defaultSeedToken);

  const onFinish = (nextToken: SeedToken) => {
    onChangeTheme(nextToken);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: 0,
          bottom: 32,
          fontSize: 16,
          borderRadius: '4px 0 0 4px',
          background: '#FFF',
          boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
          padding: '8px 16px 8px 12px',
          cursor: 'pointer',
        }}
        onClick={() => setVisible(true)}
      >
        <BugOutlined /> Dynamic Theme
      </div>

      <Drawer
        mask={false}
        zIndex={10001}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        title={formatMessage({ id: 'app.theme.switch.dynamic' })}
        extra={
          <Space>
            <Button icon={<EyeOutlined />} onClick={() => setPreviewVisible(true)} />
            <Button onClick={form.submit} type="primary">
              Submit
            </Button>
          </Space>
        }
        destroyOnClose
      >
        <Form
          form={form}
          initialValues={defaultToken}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {keys.map((key: keyof typeof defaultToken) => {
            const originValue = defaultToken[key];
            const originValueType = typeof originValue;

            let node: React.ReactElement;

            switch (originValueType) {
              case 'number':
                node = <InputNumber />;
                break;

              default:
                node = <Input />;
            }

            const rules: any[] = [{ required: true }];
            const originColor = new TinyColor(originValue);
            if (originValueType === 'string' && originColor.isValid) {
              rules.push({
                validator: async (_: any, value: string) => {
                  if (!new TinyColor(value).isValid) {
                    throw new Error('Invalidate color type');
                  }
                },
              });
            }

            return (
              <Form.Item key={key} label={key} name={key} rules={rules} validateFirst>
                {node}
              </Form.Item>
            );
          })}

          <Form.Item name="hashed" valuePropName="checked">
            <Checkbox>Bind Style on hash className</Checkbox>
          </Form.Item>
        </Form>
      </Drawer>

      <Preview
        visible={previewVisible}
        componentName={componentName}
        onClose={() => setPreviewVisible(false)}
      />
    </>
  );
};
