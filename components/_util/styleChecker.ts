import { canUseDom, isStyleSupport } from '@rc-component/util';

export const canUseDocElement = () => canUseDom() && window.document.documentElement;

export { isStyleSupport };
