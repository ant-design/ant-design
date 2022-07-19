import { useContext } from 'react';
import type { ValidateStatus } from 'antd/es/form/FormItem';
import { FormItemInputContext } from '../context';
import warning from '../../_util/warning';

type UseFormItemStatus = () => {
  status?: ValidateStatus;
};

const useFormItemStatus: UseFormItemStatus = () => {
  const { status } = useContext(FormItemInputContext);

  warning(
    status !== undefined,
    'Form.Item',
    `Form.Item.useStatus should be used under Form.Item component. For more information: ${window.location.protocol}//${window.location.host}/components/form-cn/#Form.Item.useStatus`,
  );

  return { status };
};

export default useFormItemStatus;
