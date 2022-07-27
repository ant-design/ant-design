import React, { isValidElement, Children, useEffect, useRef, useState } from 'react';
import { render as reactRender, unmountComponentAtNode } from 'react-dom';
import type { ReactNode } from 'react';
import type { ValidateFields } from 'rc-field-form/es/interface';
import type { ModalProps } from './Modal';
import Modal from './Modal';
import destroyFns from './destroyFns';

type FormLike<T> = {
  validateFields?: ValidateFields<T>;
  validateFieldsReturnFormatValue?: ValidateFields<T>;
  [key: string]: any;
};
export type CreateModalProps<T> = Omit<
  ModalProps,
  'onOk' | 'visible' | 'destroyOnClose' | 'confirmLoading'
> & {
  /** 弹窗内容，通常是一个表单，点击确认时会尝试调用其 validateFields 方法 */
  content?: ReactNode /* | Component | FunctionComponent | ExoticComponent */;
  /** 同 children ，优先级高于 children */
  render?: (formRef: React.MutableRefObject<FormLike<T> | undefined>) => ReactNode;
  /** “确认”按钮事件，返回 promise 可以延迟关闭。参数为弹窗内容传递的值 */
  onOk?: (values?: T) => Promise<void> | void;
  onFailed?: (error: any) => void;
  /** 隐藏“取消”按钮 */
  // hideCancel?: boolean;
  /** 隐藏“确认”按钮 */
  // hideOk?: boolean;
  /** “拒绝”按钮文本 */
  // denyText?: string;
  /** “拒绝”按钮（传入此字段才显示）事件，返回 promise 可以延迟关闭 */
  // onDeny?: (values?: T) => Promise<void> | void;
};

function App<T>({
  content,
  children = content,
  render,
  onOk,
  onCancel,
  onFailed,
  // onDeny,
  // denyText,
  // hideCancel = false,
  // hideOk = false,
  ...rest
}: CreateModalProps<T>) {
  const formLikeRef = useRef<FormLike<T>>();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    // for animation
    setVisible(true);
  }, []);
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const validateFields =
        formLikeRef.current?.validateFieldsReturnFormatValue || formLikeRef.current?.validateFields;
      const values = await validateFields?.();
      await onOk?.(values);
      setVisible(false);
    } catch (error) {
      console.error(error);
      onFailed?.(error);
      // throw error;
    } finally {
      setConfirmLoading(false);
    }
  };
  // const handleDeny = async () => {
  //   setConfirmLoading(true);
  //   try {
  //     const validateFields =
  //       formLikeRef.current?.validateFieldsReturnFormatValue || formLikeRef.current?.validateFields;
  //     const values = await validateFields?.();
  //     await onDeny?.(values);
  //     setVisible(false);
  //   } catch (error) {
  // onFailed?.(error);
  //     console.error(error);
  //     // throw error;
  //   } finally {
  //     setConfirmLoading(false);
  //   }
  // };
  const handleCancel: typeof onCancel = e => {
    setVisible(false);
    onCancel?.(e);
  };

  const renderPropChildren = () => {
    if (render) return render(formLikeRef);
    let attached = false;
    return Children.map(children, child => {
      if (!isValidElement(child)) {
        return child;
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
      {...rest}
      // todo context value
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={handleOk}
      // footer={[
      //   hideCancel || (
      //     <Button key="cancel" onClick={handleCancel}>
      //       {rest?.cancelText || '取消'}
      //     </Button>
      //   ),
      //   onDeny && (
      //     <Button key="deny" type="primary" danger loading={confirmLoading} onClick={handleDeny}>
      //       {denyText || '驳回'}
      //     </Button>
      //   ),
      //   hideOk || (
      //     <Button key="ok" type="primary" loading={confirmLoading} onClick={handleOk}>
      //       {rest?.okText || '确定'}
      //     </Button>
      //   ),
      // ]}
      destroyOnClose
      visible={visible}
    >
      {renderPropChildren()}
    </Modal>
  );
}
/** 创建弹窗，默认内置 ProForm ，可直接传入表单字段：Form.Item、ProFormText 等。也可以自定义。 */
export default function createModal<T>(params: CreateModalProps<T>) {
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

      for (let i = 0; i < destroyFns.length; i++) {
        const fn = destroyFns[i];
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (fn === destory) {
          destroyFns.splice(i, 1);
          break;
        }
      }
      // console.log('destoryed modal');
    }
    destroyFns.push(destory);
    reactRender(
      // <RootContainer>
      <App<T> afterClose={destory} {...params} />,
      // </RootContainer>,
      div,
    );
  });
}
