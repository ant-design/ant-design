import { useCallback, useContext, useMemo } from 'react';
import FieldContext from 'rc-field-form/es/FieldContext';
import type { NamePath } from 'rc-field-form/es/interface';
import type { FormInstance } from './useForm';
import getLocalForm from '../helper/localForm';
import { lookUpward } from '../util';

export type GlobalForm = Omit<FormInstance, 'scrollToField' | 'getFieldInstance' | '__INTERNAL__'>;

interface IUseLocalProps {
  basePath?: NamePath;
  upward?: number;
  mode?: 'global' | 'local';
}
const useLocalForm = (props: IUseLocalProps) => {
  const { basePath, mode, upward = 0 } = props;
  const context = useContext(FieldContext);

  const localForm = useMemo(
    () =>
      getLocalForm(
        context,
        mode === 'global' ? [] : lookUpward(context.prefixName || [], upward),
        basePath,
      ),
    [basePath, context, mode, upward],
  );

  const getForm = useCallback(
    (options?: IUseLocalProps) =>
      getLocalForm(
        context,
        options?.mode === 'global'
          ? []
          : lookUpward(context.prefixName || [], options?.upward ?? upward),
        options?.basePath,
      ),
    [context, upward],
  );

  return useMemo(
    () => [localForm, context as GlobalForm, getForm] as const,
    [context, getForm, localForm],
  );
};

export default useLocalForm;
