import canUseDom from '@rc-component/util/lib/Dom/canUseDom';
import { isStyleSupport } from '@rc-component/util/lib/Dom/styleChecker';

export const canUseDocElement = () => canUseDom() && window.document.documentElement;

export { isStyleSupport };
