import React, { useState } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';

import Action from './FormModal/action';
import FormModal from './FormModal/FormModal';

export const sleep = async (timeout = 0) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CollectionCreateForm = () => {
  const [form] = Form.useForm();

  return (
    <FormModal
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      initialValues={{ modifier: 'public', title: 'Title' }}
      onFinish={async (values) => {
        await sleep(300);
        if (values.modifier === 'public') {
          message.error('Please select private');
          const error = 'error';
          return Promise.reject(error);
        }
        message.success(JSON.stringify(values));
      }}
      formProps={{ form, name: 'form_in_modal', layout: 'vertical' }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input type="textarea" />
      </Form.Item>
      <Form.Item name="modifier" className="collection-create-form_last-form-item">
        <Radio.Group>
          <Radio value="public">Public</Radio>
          <Radio value="private">Private</Radio>
        </Radio.Group>
      </Form.Item>
    </FormModal>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        New Collection
      </Button>
      <Action open={open} onCancel={() => setOpen(false)}>
        <CollectionCreateForm />
      </Action>
    </>
  );
};

export default App;
