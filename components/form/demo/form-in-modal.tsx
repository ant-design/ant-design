import React, { cloneElement, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';

export interface ModalCloseDestroyChildrenContextProps {
  open?: boolean;
  onCancel?: () => void;
  onDestroy?: () => void;
}

export interface ModalCloseDestroyChildrenProps extends ModalCloseDestroyChildrenContextProps {
  children: React.ReactElement;
}

const ModalCloseDestroyChildren = (props: ModalCloseDestroyChildrenProps) => {
  const { children, open: propsOpen, onCancel } = props;

  const [load, setLoad] = useState<Record<string, any>>();
  const [open, setOpen] = useState<boolean>();

  useLayoutEffect(() => {
    if (propsOpen) {
      setLoad({});
    } else {
      setOpen(false);
    }
  }, [propsOpen]);

  useLayoutEffect(() => {
    setOpen(!!load);
  }, [load]);

  return (
    <div>
      {(load || propsOpen) &&
        cloneElement(children, {
          open,
          onCancel: () => {
            onCancel?.();
            setOpen(false);
          },
          onDestroy: () => setLoad(undefined),
        })}
    </div>
  );
};

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
}

interface CollectionCreateFormModalProps extends ModalCloseDestroyChildrenContextProps {
  onCreate: (values: Values) => void;
  initialValues: Values;
}

const CollectionCreateFormModal: React.FC<CollectionCreateFormModalProps> = (props) => {
  const { open, onCancel, onDestroy, onCreate, initialValues } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    console.log('mount');
    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      destroyOnClose
      onCancel={onCancel}
      okButtonProps={{ htmlType: 'submit' }}
      afterClose={() => onDestroy?.()}
      modalRender={(node) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={initialValues}
          onFinish={onCreate}
        >
          {node}
        </Form>
      )}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input autoFocus />
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
    </Modal>
  );
};

const App: React.FC = () => {
  const [formValues, setFormValues] = useState<Values>();
  const [open, setOpen] = useState(false);

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values);
    setFormValues(values);
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        New Collection
      </Button>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <ModalCloseDestroyChildren open={open} onCancel={() => setOpen(false)}>
        <CollectionCreateFormModal
          onCreate={onCreate}
          initialValues={{ title: 'title', modifier: 'public' }}
        />
      </ModalCloseDestroyChildren>
    </>
  );
};

export default App;
