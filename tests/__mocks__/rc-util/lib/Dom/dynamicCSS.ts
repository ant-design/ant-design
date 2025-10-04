import {
  injectCSS,
  updateCSS,
  clearContainerCache,
  removeCSS,
} from '@rc-component/util/lib/Dom/dynamicCSS';

const fixCSS = (css: string) => {
  return css.replace(/@container\s+[^)]*\)/g, '@supports (display: not-exist)');
};

const mockInjectCSS: typeof injectCSS = (css, ...rest) => {
  return injectCSS(fixCSS(css), ...rest);
};

const mockUpdateCSS: typeof updateCSS = (css, ...rest) => {
  return updateCSS(fixCSS(css), ...rest);
};

export { mockInjectCSS as injectCSS, mockUpdateCSS as updateCSS, clearContainerCache, removeCSS };
