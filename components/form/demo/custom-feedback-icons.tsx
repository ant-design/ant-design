import React from 'react';
import { uniqueId } from 'lodash';

import { createStyles, css } from 'antd-style';
import { AlertFilled } from '@ant-design/icons';
import { Button, Form, Input, Tooltip } from 'antd';

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
    <Form form={form} style={{ maxWidth: 600 }}>
      <Form.Item
        name="custom-feedback-test-item"
        label="Test"
        className={styles['custom-feedback-icons']}
        rules={[{ required: true, type: 'email' }, { min: 10 }]}
        help=""
        hasFeedback
        customFeedbackIcons={({ errors }) => ({
          error: (
            <Tooltip
              key="tooltipKey"
              title={errors?.map((error) => <div key={uniqueId()}>{error}</div>)}
              color="red"
            >
              <AlertFilled />
            </Tooltip>
          ),
        })}
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
