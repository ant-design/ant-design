import type { AnyObject } from '../_util/type';
import type { ColumnTitle, ColumnTitleProps, ColumnType, Key } from './interface';

export const getColumnKey = <RecordType extends AnyObject = AnyObject>(
  column: ColumnType<RecordType>,
  defaultKey: string,
): Key => {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : (column.dataIndex as Key);
  }
  return defaultKey;
};

export function getColumnPos(index: number, pos?: string) {
  return pos ? `${pos}-${index}` : `${index}`;
}

export const renderColumnTitle = <RecordType extends AnyObject = AnyObject>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) => {
  if (typeof title === 'function') {
    return title(props);
  }
  return title;
};

/**
 * Safe get column title
 *
 * Should filter [object Object]
 *
 * @param title
 */
export const safeColumnTitle = <RecordType extends AnyObject = AnyObject>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) => {
  const res = renderColumnTitle<RecordType>(title, props);
  if (Object.prototype.toString.call(res) === '[object Object]') {
    return '';
  }
  return res;
};

/**
 * Create a Proxy object to override a field
 *
 * Currently used for safely copy records without breaking prototype chain when
 * sorting / filtering records
 *
 * @param record value to be proxied
 * @param field The field needed to be overridden
 * @param initialValue (Optional) The new value for `field`, if not provided, `record[field]` will be used
 * @returns A Proxy object that override `field` of the target
 */
export const proxyOverrideField = <RecordType extends AnyObject = AnyObject>(
  record: RecordType,
  field: string | number | symbol,
  initialValue?: any,
) => {
  let internalValue = initialValue ?? record[field];
  return new Proxy(record, {
    apply: (target, thisArg, argArray) => Reflect.apply(target as any, thisArg, argArray),
    construct: (target, argArray, newTarget) =>
      Reflect.construct(target as any, argArray, newTarget),
    defineProperty: (target, property, attributes) =>
      Reflect.defineProperty(target, property, attributes),
    deleteProperty: (target, p) => Reflect.deleteProperty(target, p),
    get: (target, p, receiver) => {
      if (p === field) {
        return internalValue;
      }
      return Reflect.get(target, p, receiver);
    },
    getOwnPropertyDescriptor: (target, p) => Reflect.getOwnPropertyDescriptor(target, p),
    getPrototypeOf: (target) => Reflect.getPrototypeOf(target),
    has: (target, p) => Reflect.has(target, p),
    isExtensible: (target) => Reflect.isExtensible(target),
    ownKeys: (target) => Reflect.ownKeys(target),
    preventExtensions: (target) => Reflect.preventExtensions(target),
    set: (target, p, value) => {
      if (p === field) {
        internalValue = value;
        return true;
      }
      return Reflect.set(target, p, value);
    },
    setPrototypeOf: (target, v) => Reflect.setPrototypeOf(target, v),
  });
};
