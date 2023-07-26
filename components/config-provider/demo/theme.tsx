import { Button, ColorPicker, ConfigProvider, Form, InputNumber, theme } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React from 'react';

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: '#1677ff',
};

export default () => {
  const [form] = Form.useForm();

  const [data, setData] = React.useState<ThemeData>(defaultData);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
        },
        components: {
          Button: {
            colorPrimary: 'red',
            borderRadius: 0,
            algorithm: true,
          },
          InputNumber: {
            colorPrimary: 'green',
            colorBgBase: '#000',
            colorTextBase: '#fff',
            algorithm: theme.darkAlgorithm,
          },
        },
      }}
    >
      <Form
        form={form}
        onValuesChange={(changedValues, allValues) => {
          const colorObj = changedValues?.colorPrimary
            ? { colorPrimary: (allValues?.colorPrimary as Color)?.toHexString() }
            : {};
          setData({
            ...allValues,
            ...colorObj,
          });
        }}
        name="theme"
        initialValues={defaultData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item valuePropName="color" name="colorPrimary" label="Primary Color">
          <ColorPicker />
        </Form.Item>
        <div style={{ background: 'rgb(20, 20, 20)', padding: 24 }}>
          <Form.Item name="borderRadius" label="Border Radius">
            <InputNumber />
          </Form.Item>
        </div>
        <Form.Item name="submit" wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
