import { DependencyList, FunctionComponent, useMemo } from 'react';
import useToggleComponent from './useToggleComponent';
import { ModalProps } from '../index';
import Form, { FormProps } from '../../form';
import { ButtonProps } from '../../button';

const useToggleModal = <Props, FormValue = any>(
  Component: FunctionComponent<Props>,
  dependency: DependencyList = [],
) => {
  const toggleComponent = useToggleComponent<Props>(Component, dependency);
  const [form] = Form.useForm<FormValue>();
  const randomFormId = useMemo(() => `form${Math.random()}`, []);
  const modalProps: ModalProps = {
    visible: true,
    onCancel: toggleComponent.hideComponent,
  };
  // OkButton的form指向Form的id。这样Modal的确认按钮点击后会触发Form的OnFinish
  const okButtonProps: ButtonProps = {
    htmlType: 'submit',
    form: randomFormId,
  };
  const formProps: Required<Pick<FormProps, 'form' | 'id'>> = {
    form: form!,
    id: randomFormId,
  };
  return {
    ...toggleComponent,
    form,
    formProps,
    okButtonProps,
    modalProps,
  };
};

export default useToggleModal;
