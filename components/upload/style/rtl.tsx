import type { GenerateStyle, FullToken } from '../../_util/theme';

// =========================== Motion ===========================
const genRtlStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

export default genRtlStyle;
