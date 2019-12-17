export = Util;
export as namespace Util;

declare namespace Util {
  function getMenuItems(...args: any[]): string;
  function isZhCN(pathname: string): boolean;
  function getLocalizedPathname(path: string, isChinese: boolean): string;
  function ping(callback: Function): string;
  function isLocalStorageNameSupported(): boolean;
  function loadScript(src: string): void;
  function getMetaDescription(jml: any): any;
}
