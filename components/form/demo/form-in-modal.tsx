import React, { useState, useRef } from 'react';
import { Button, Form, Input, Modal, Radio, type FormInstance } from 'antd';

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
}

const CollectionCreateForm = React.forwardRef<FormInstance, { initialValues: Values }>(
  ({ initialValues }, ref) => (
    <Form
      ref={ref}
      layout="vertical"
      name="form_in_modal"
      preserve={false}
      initialValues={initialValues}
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
    </Form>
  ),
);

interface CollectionCreateFormModalProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  initialValues: Values;
}

const CollectionCreateFormModal: React.FC<CollectionCreateFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const formRef = useRef<FormInstance>(null);
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formRef.current?.validateFields();
          formRef.current?.resetFields();
          onCreate(values);
        } catch (error) {
          console.log('Failed:', error);
        }
      }}
    >
      <CollectionCreateForm initialValues={initialValues} ref={formRef} />
    </Modal>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        New Collection
      </Button>
      <CollectionCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={{ modifier: 'public' }}
      />
    </>
  );
};

export default App;
