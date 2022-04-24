import { Keyframes } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';

const uploadAnimateInlineIn = new Keyframes('uploadAnimateInlineIn', {
  from: {
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
  },
});

const uploadAnimateInlineOut = new Keyframes('uploadAnimateInlineOut', {
  to: {
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    opacity: 0,
  },
});
// =========================== Motion ===========================
const genMotionStyle: GenerateStyle<FullToken<'Upload'>> = (token, hashId) => {
  const { componentCls } = token;
  const inlineCls = `${componentCls}-animate-inline`;

  return [
    {
      [`${componentCls}-wrapper`]: {
        [`
        ${inlineCls}-appear,
        ${inlineCls}-enter,
        ${inlineCls}-leave
      `]: {
          animationDuration: token.motionDurationSlow,
          animationFillMode: token.motionEaseInOutCirc,
        },

        [`
        ${inlineCls}-appear,
        ${inlineCls}-enter
      `]: {
          animationName: `${uploadAnimateInlineIn.getName(hashId)}`,
        },

        [`${inlineCls}-leave`]: {
          animationName: `${uploadAnimateInlineOut.getName(hashId)}`,
        },
      },
    },
    uploadAnimateInlineIn,
    uploadAnimateInlineOut,
  ];
};

export default genMotionStyle;
