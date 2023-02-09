const isFunction = (value?: any): value is Function => value && typeof value === 'function';

export default isFunction;
