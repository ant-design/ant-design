import React from 'react';
import { AlertFilled, CloseSquareFilled } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';
import { createStyles, css } from 'antd-style';
import uniqueId from 'lodash/uniqueId';

const useStyle = createStyles(() => ({
  'custom-feedback-icons': css`
    .ant-form-item-feedback-icon {
      pointer-events: all;
    }
  `,
}));

const App: React.FC = () => {
  const [form] = Form.useForm();
  const { styles } = useStyle();

  return (
    <Form
      name="custom-feedback-icons"
      form={form}
      style={{ maxWidth: 600 }}
      feedbackIcons={({ errors }) => ({
        error: (
          <Tooltip
            key="tooltipKey"
            title={errors?.map((error) => <div key={uniqueId()}>{error}</div>)}
            color="red"
          >
            <CloseSquareFilled />
          </Tooltip>
        ),
      })}
    >
      <Form.Item
        name="custom-feedback-test-item"
        label="Test"
        className={styles['custom-feedback-icons']}
        rules={[{ required: true, type: 'email' }, { min: 10 }]}
        help=""
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="custom-feedback-test-item2"
        label="Test"
        className={styles['custom-feedback-icons']}
        rules={[{ required: true, type: 'email' }, { min: 10 }]}
        help=""
        hasFeedback={{
          icons: ({ errors }) => ({
            error: (
              <Tooltip
                key="tooltipKey"
                title={errors?.map((error) => <div key={uniqueId()}>{error}</div>)}
                color="pink"
              >
                <AlertFilled />
              </Tooltip>
            ),
            success: false,
          }),
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default App;
