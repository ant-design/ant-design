import React from 'react';
import type { DescriptionsProps } from 'antd';
import { Divider, Descriptions, Form, Radio } from 'antd';

type Props = Pick<DescriptionsProps, 'bordered' | 'layout'>;

const useSettingForm = (initialValues: Props = {}) => {
  const [props, setProps] = React.useState<Props>(initialValues);

  const Node = React.useMemo(
    () => (
      <Form<Props>
        layout="inline"
        initialValues={props}
        onValuesChange={(_, values) => setProps(values)}
      >
        <Form.Item label="Border" name="bordered">
          <Radio.Group>
            <Radio value={undefined}>undefined</Radio>
            <Radio value>true</Radio>
            <Radio value={false}>false</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Layout" name="layout">
          <Radio.Group>
            <Radio value={undefined}>undefined</Radio>
            <Radio value="vertical">vertical</Radio>
            <Radio value="horizontal">horizontal</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Size" name="size">
          <Radio.Group>
            <Radio value={undefined}>undefined</Radio>
            <Radio value="default">default</Radio>
            <Radio value="middle">middle</Radio>
            <Radio value="small">small</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    ),
    [],
  );

  return [props, Node] as const;
};

const App: React.FC = () => {
  const [parentProps, patentSettingForm] = useSettingForm();
  const [childProps, childSettingForm] = useSettingForm();

  return (
    <>
      {patentSettingForm}
      <Divider />
      {childSettingForm}
      <Divider plain orientation="left">
        Preview
      </Divider>
      <Descriptions title="User Info" {...parentProps}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Money(Nested)">
          <Descriptions {...childProps}>
            <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official Receipts($60.00)">
              <Descriptions>
                <Descriptions.Item label="Amount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Amount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Amount">$20.00</Descriptions.Item>
              </Descriptions>
            </Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default App;
