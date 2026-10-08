import { isNonNullable } from '@rc-component/util';

export const isNumber = (val: any): val is number => {
  return typeof val === 'number' && !Number.isNaN(val);
};

export const isString = (val: any): val is string => {
  return typeof val === 'string';
};

export const isPlainObject = <T extends object = object>(val: any): val is T => {
  return val !== null && typeof val === 'object';
};

export const isFunction = <Value, Args extends unknown[], Result>(
  val: Value | ((...args: Args) => Result),
): val is (...args: Args) => Result => {
  return typeof val === 'function';
};

export const isThenable = <T>(val?: PromiseLike<T>): val is PromiseLike<T> => {
  return isNonNullable(val) && isFunction(val.then);
};

export const isPrimitive = (val: any) => {
  return (typeof val !== 'object' && !isFunction(val)) || val === null;
};

export const isTransitionEvent = (event: Event): event is TransitionEvent => {
  return isPlainObject(event) && 'propertyName' in event && isString(event.propertyName);
};

export const isWindow = (val?: any): val is Window => {
  if (!isNonNullable(val)) {
    return false;
  }
  return val === val.window;
};

export const isDocument = (val: Document | HTMLElement | null): val is Document => {
  if (!isNonNullable(val)) {
    return false;
  }
  return (
    val instanceof Document ||
    val.constructor.name === 'HTMLDocument' ||
    val.nodeType === window.Node.DOCUMENT_NODE
  );
};

export const isHTMLElement = (val?: unknown): val is HTMLElement => {
  if (!isNonNullable(val)) {
    return false;
  }
  return typeof HTMLElement !== 'undefined' && val instanceof HTMLElement;
};
