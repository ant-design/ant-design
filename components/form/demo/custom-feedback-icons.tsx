import React from 'react';
import { AlertFilled, CloseSquareFilled } from '@ant-design/icons';
import { Button, Form, Input, Mentions, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import uniqueId from 'lodash/uniqueId';

const useStyles = createStyles((props) => {
  const { css, prefixCls } = props;
  return {
    customFeedbackIcons: css`
      .${prefixCls}-form-item-feedback-icon {
        pointer-events: all;
      }
    `,
  };
});

const App: React.FC = () => {
  const [form] = Form.useForm();
  const { styles } = useStyles();
  return (
    <Form
      name="custom-feedback-icons"
      form={form}
      style={{ maxWidth: 600 }}
      feedbackIcons={({ errors }) => ({
        error: (
          <Tooltip
            color="red"
            key="tooltipKey"
            title={errors?.map((error) => (
              <div key={uniqueId('red')}>{error}</div>
            ))}
          >
            <CloseSquareFilled />
          </Tooltip>
        ),
      })}
    >
      <Form.Item
        name="custom-feedback-test-item"
        label="Test"
        className={styles.customFeedbackIcons}
        rules={[{ required: true, type: 'email' }, { min: 10 }]}
        help=""
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="custom-feedback-test-item2"
        label="Test"
        className={styles.customFeedbackIcons}
        rules={[{ required: true, type: 'email' }, { min: 10 }]}
        help=""
        hasFeedback={{
          icons: ({ errors }) => ({
            error: (
              <Tooltip
                color="pink"
                key="tooltipKey"
                title={errors?.map((error) => (
                  <div key={uniqueId('pink')}>{error}</div>
                ))}
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
      <Form.Item
        name="custom-feedback-test-item3"
        label="Test"
        className={styles.customFeedbackIcons}
        hasFeedback
        validateStatus="success"
        initialValue="@mention1"
      >
        <Mentions
          allowClear
          options={[
            { value: 'mention1', label: 'mention1' },
            { value: 'mention2', label: 'mention2' },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default App;
