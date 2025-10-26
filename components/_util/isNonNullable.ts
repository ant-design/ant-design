// \b([A-Za-z_$][\w$]*)\s*!==\s*(?:undefined\s*&&\s*\1\s*!==\s*null|null\s*&&\s*\1\s*!==\s*undefined)\b
// 用上面这个正则，可以在 vscode 中全局搜到所有类似的判空，理论上来说都可以替换为 isNonNullable 方法，但是考虑到打包体积会变大，暂时不进行大范围替换
const isNonNullable = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

export default isNonNullable;
