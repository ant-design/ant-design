import React, { useMemo, useContext } from 'react';
import type { PropsWithChildren } from 'react';
import FieldContext from 'rc-field-form/es/FieldContext';
import * as valueUtil from 'rc-field-form/es/utils/valueUtil';
import type { NamePath } from 'rc-field-form/es/interface';

/**
 * Purpose:
 *
 * 1. Namepath's proxy
 * 2. Create a local store
 */
interface IFormAccessProps {
  name: NamePath;
}
const FormAccess = (props: PropsWithChildren<IFormAccessProps>) => {
  const { name, children } = props;

  const context = useContext(FieldContext);
  const value = useMemo(
    () => ({
      ...context,
      prefixName: [...(context.prefixName || []), ...valueUtil.getNamePath(name)],
    }),
    [context, name],
  );

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>;
};

export default FormAccess;
