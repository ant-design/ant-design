import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { FormProps, ModalProps } from 'antd';
import { Button, Form, Input, message, Modal, Radio } from 'antd';

// ------------------------------------------------------------------FormModal start-----------------------------------------------------------

export type onCancel = (e?: React.MouseEvent<HTMLElement>) => void;

export interface ActionContextProps {
  open?: boolean;
  onCancel: onCancel;
  onDestroy: () => void;
}
export const Context = createContext<ActionContextProps>({
  onCancel: () => undefined,
  onDestroy: () => undefined,
});

export interface ActionProps extends Pick<ActionContextProps, 'open' | 'onCancel'> {
  children?: React.ReactNode;
}

const Action = (props: ActionProps) => {
  const { onCancel, children, open: propsOpen } = props;

  const [load, setLoad] = useState<Record<string, any>>();
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (propsOpen) {
      setLoad({});
    } else {
      setOpen(false);
    }
  }, [propsOpen]);

  useEffect(() => {
    setOpen(!!load);
  }, [load]);

  const context = useMemo<ActionContextProps>(
    () => ({
      open,
      onCancel: (e) => {
        onCancel?.(e);
        setOpen(false);
      },
      onDestroy: () => setLoad(undefined),
    }),
    [open],
  );

  return <Context.Provider value={context}>{(load || propsOpen) && children}</Context.Provider>;
};

export const ContextReset = ({ children }: { children: React.ReactNode }) => {
  const context = useMemo<ActionContextProps>(
    () => ({ onCancel: () => undefined, onDestroy: () => undefined }),
    [],
  );
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export interface FormModalProps<Values = any> extends ModalProps {
  children?: React.ReactNode;
  onCancel?: onCancel;
  initialValues?: FormProps<Values>['initialValues'];
  onFinish?: FormProps<Values>['onFinish'];
  formProps?: Omit<FormProps<Values>, 'initialValues' | 'onFinish'>;
}

function FormModal<T = any>(props: FormModalProps<T>) {
  const { onDestroy, ...contextRest } = useContext(Context);
  const {
    children,
    onCancel,
    initialValues,
    onFinish,
    formProps = {},
    ...rest
  } = { ...contextRest, ...props };
  const [loading, setLoading] = useState(false);

  const handleOnFinish = async (values: T) => {
    if (loading) return;
    setLoading(true);
    try {
      await onFinish?.(values);
      onCancel?.();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const modalRender: ModalProps['modalRender'] = (node) => (
    <Form initialValues={initialValues} onFinish={handleOnFinish} {...formProps}>
      {node}
    </Form>
  );

  return (
    <Modal
      modalRender={modalRender}
      afterClose={() => onDestroy?.()}
      onCancel={onCancel}
      destroyOnClose
      cancelButtonProps={{ onClick: onCancel }}
      okButtonProps={{ htmlType: 'submit', loading }}
      {...rest}
    >
      <ContextReset>{children}</ContextReset>
    </Modal>
  );
}

// ------------------------------------------------------------------FormModal end-----------------------------------------------------------

const CollectionCreateForm = () => {
  const [form] = Form.useForm();

  return (
    <FormModal
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      initialValues={{ modifier: 'public', title: 'Title' }}
      onFinish={async (values) => {
        // mock loading
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });
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
      <Form.Item name="modifier">
        <Radio.Group
          options={[
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
          ]}
        />
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
