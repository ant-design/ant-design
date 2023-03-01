import { useContext } from 'react';
import type { ValidateStatus } from 'antd/es/form/FormItem';
import { FormItemInputContext } from '../context';
import warning from '../../_util/warning';

type UseFormItemStatus = () => {
  status?: ValidateStatus;
};

const useFormItemStatus: UseFormItemStatus = () => {
  const { status } = useContext(FormItemInputContext);

  const isClient = typeof window !== 'undefined'
  if (isClient) {
    warning(
      status !== undefined,
      'Form.Item',
      `Form.Item.useStatus should be used under Form.Item component. For more information: https://ant.design/components/form#formitemusestatus,
    );
  }

  return { status };
};

// Only used for compatible package. Not promise this will work on future version.
(useFormItemStatus as any).Context = FormItemInputContext;

export default useFormItemStatus;
