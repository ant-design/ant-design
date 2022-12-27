/* eslint-disable import/prefer-default-export */
export function isObject(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]';
}
