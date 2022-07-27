import React, { isValidElement, Children, useEffect, useRef, useState } from 'react';
import { render as reactRender, unmountComponentAtNode } from 'react-dom';
import type { ReactNode } from 'react';
import type { ValidateFields } from 'rc-field-form/es/interface';
import type { ModalProps } from './Modal';
import Modal from './Modal';
import Button from '../button';
import destroyFns from './destroyFns';

type FormLike<T> = {
  validateFields?: ValidateFields<T>;
  validateFieldsReturnFormatValue?: ValidateFields<T>;
  [key: string]: any;
};
export type CreateModalProps<T> = {
  /** 弹窗内容，通常是一个表单，点击确认时会尝试调用其 validateFields 方法 */
  children?: ReactNode /* | Component | FunctionComponent | ExoticComponent */;
  /** 同 children ，优先级高于 children */
  render?: (formRef: React.MutableRefObject<FormLike<T> | undefined>) => ReactNode;
  /** 隐藏“取消”按钮 */
  hideCancel?: boolean;
  /** 隐藏“确认”按钮 */
  hideOk?: boolean;
  /** “确认”按钮事件 */
  onConfirm?: (values?: T) => Promise<void> | void;
  /** “取消”按钮事件 */
  onCancel?: () => void;
  /** “拒绝”按钮（传入此字段才显示）事件 */
  onDeny?: (values?: T) => Promise<void> | void;
  /** “拒绝”按钮文本，其它按钮配置请查阅 ModalProps */
  denyText?: string;
  /** 全部转发给 Modal */
  modalProps?: Omit<
    ModalProps,
    'onCancel' | 'onOk' | 'visible' | 'destroyOnClose' | 'confirmLoading'
  >;
};

function App<T>({
  children,
  render,
  onConfirm,
  onDeny,
  denyText,
  hideCancel = false,
  hideOk = false,
  modalProps,
}: CreateModalProps<T>) {
  const formLikeRef = useRef<FormLike<T>>();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const validateFields =
        formLikeRef.current?.validateFieldsReturnFormatValue || formLikeRef.current?.validateFields;
      const values = await validateFields?.();
      await onConfirm?.(values);
      setVisible(false);
    } catch (error) {
      console.error(error);
      // throw error;
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleDeny = async () => {
    setConfirmLoading(true);
    try {
      const validateFields =
        formLikeRef.current?.validateFieldsReturnFormatValue || formLikeRef.current?.validateFields;
      const values = await validateFields?.();
      await onDeny?.(values);
      setVisible(false);
    } catch (error) {
      console.error(error);
      // throw error;
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const renderPropChildren = () => {
    if (render) return render(formLikeRef);
    let attached = false;
    return Children.map(children, child => {
      if (!isValidElement(child)) {
        return null;
      }
      if (attached) return child;
      const childProps = {
        ...child.props,
        ref: formLikeRef,
      };
      attached = true;
      return React.cloneElement(child, childProps);
    });
  };

  return (
    <Modal
      {...modalProps}
      // okText="确定"
      // cancelText="取消"
      // confirmLoading={confirmLoading}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        hideCancel || (
          <Button key="cancel" onClick={handleCancel}>
            {modalProps?.cancelText || '取消'}
          </Button>
        ),
        onDeny && (
          <Button key="deny" type="primary" danger loading={confirmLoading} onClick={handleDeny}>
            {denyText || '驳回'}
          </Button>
        ),
        hideOk || (
          <Button key="ok" type="primary" loading={confirmLoading} onClick={handleOk}>
            {modalProps?.okText || '确定'}
          </Button>
        ),
      ]}
      destroyOnClose
      visible={visible}
    >
      {renderPropChildren()}
    </Modal>
  );
}
/**
 * @description 创建弹窗，默认内置 ProForm ，可直接传入表单字段：Form.Item、ProFormText 等。也可以自定义。
 */
export default function createModal<T>({ modalProps, ...rest }: CreateModalProps<T>) {
  /**
   * https://github.com/ant-design/ant-design/issues/23623
   *
   * Sync render blocks React event. Let's make this async.
   */
  setTimeout(() => {
    const div = document.createElement('div');
    div.setAttribute('role', 'Dynamically created modal');
    document.body.appendChild(div);
    function destory() {
      unmountComponentAtNode(div);
      document.body.removeChild(div);
      // console.log('destoryed modal');
    }
    destroyFns.push(destory);
    reactRender(
      // <RootContainer>
      <App<T> modalProps={{ ...modalProps, afterClose: destory }} {...rest} />,
      // </RootContainer>,
      div,
    );
  });
}
