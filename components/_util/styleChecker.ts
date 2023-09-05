import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { isStyleSupport } from 'rc-util/lib/Dom/styleChecker';

export const canUseDocElement = () => canUseDom() && window.document.documentElement;

export { isStyleSupport };
