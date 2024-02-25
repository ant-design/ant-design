import React, { useContext, useState } from 'react';
import type { FormProps, ModalProps } from 'antd';
import { Form, Modal } from 'antd';

import type { onCancel } from './action2';
import { Context, ContextReset } from './action2';

export interface FormModalProps<Values = any> extends ModalProps {
  children?: React.ReactNode;
  onCancel?: onCancel;
  initialValues?: FormProps<Values>['initialValues'];
  onFinish?: FormProps<Values>['onFinish'];
  formProps?: FormProps<Values>;
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

export default FormModal;
