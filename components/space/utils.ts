import type { SpaceSize } from '.';
import type { SizeType } from '../config-provider/SizeContext';

export const isPresetSize = (size: SpaceSize): size is SizeType => {
  if (!size) {
    return false;
  }
  return typeof size === 'string' && ['small', 'middle', 'large'].includes(size);
};

export const isValidNumber = (size: SpaceSize): size is number => {
  if (!size) {
    // zh_CN
    // 这里故意排除 size = 0 的情况，因为 gap 属性在 CSS 中的默认值就是 0，所以如果用户传0进来的话，我们可以直接忽略

    // en-US
    // The case of size = 0 is deliberately excluded here, because the default value of the gap attribute in CSS is 0, so if the user passes 0 in, we can directly ignore it.

    return false;
  }
  return typeof size === 'number' && !Number.isNaN(size);
};
