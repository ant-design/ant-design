import type { Meta } from 'rc-field-form/lib/interface';

import type { ValidateStatus } from './FormItem';
import type { InternalNamePath } from './interface';

// form item name black list.  in form ,you can use form.id get the form item element.
// use object hasOwnProperty will get better performance if black list is longer.
const formItemNameBlackList = ['parentNode'];

// default form item id prefix.
const defaultItemNamePrefixCls: string = 'form_item';

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}

export function getFieldId(namePath: InternalNamePath, formName?: string): string | undefined {
  if (!namePath.length) {
    return undefined;
  }

  const mergedId = namePath.join('_');

  if (formName) {
    return `${formName}_${mergedId}`;
  }

  const isIllegalName = formItemNameBlackList.includes(mergedId);

  return isIllegalName ? `${defaultItemNamePrefixCls}_${mergedId}` : mergedId;
}

/**
 * Get merged status by meta or passed `validateStatus`.
 */
export function getStatus<DefaultValue>(
  errors: React.ReactNode[],
  warnings: React.ReactNode[],
  meta: Meta,
  defaultValidateStatus: ValidateStatus | DefaultValue,
  hasFeedback?: boolean,
  validateStatus?: ValidateStatus,
): ValidateStatus | DefaultValue {
  let status = defaultValidateStatus;

  if (validateStatus !== undefined) {
    status = validateStatus;
  } else if (meta.validating) {
    status = 'validating';
  } else if (errors.length) {
    status = 'error';
  } else if (warnings.length) {
    status = 'warning';
  } else if (meta.touched || (hasFeedback && meta.validated)) {
    // success feedback should display when pass hasFeedback prop and current value is valid value
    status = 'success';
  }
  return status;
}
