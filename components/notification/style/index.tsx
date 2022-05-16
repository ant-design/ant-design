// deps-lint-skip-all
import { genComponentStyleHook } from '../../_util/theme';
import type { FullToken, GenerateStyle } from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

export interface NotificationToken extends FullToken<'Notification'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<NotificationToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {},
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Notification',
  token => [genBaseStyle(token)],
  token => {
    // Not error in lint tmp
    console.log('>>', !!token);
    return {};
  },
);
