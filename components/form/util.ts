import { InternalNamePath } from './interface';

// form item black list.  in forom ,you can use form.id get the form item.
// use object hasOwnProperty will get better performance if black list is longer.
const formItemNameBlackList: { [key: string]: number } = { parentNode: 1 };

// default form item id prefix.
const defaultItemNamePrefixCls: string = 'form_item';

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}

export function getFieldId(namePath: InternalNamePath, formName?: string): string | undefined {
  if (!namePath.length) return undefined;

  const mergedId = namePath.join('_');

  if (formName) {
    return `${formName}_${mergedId}`;
  }

  const isIllegalName = Object.prototype.hasOwnProperty.call(formItemNameBlackList, mergedId);

  return isIllegalName ? `${defaultItemNamePrefixCls}_${mergedId}` : mergedId;
}
