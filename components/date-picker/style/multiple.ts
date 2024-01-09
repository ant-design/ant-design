import { genSelectionStyle } from '../../select/style/multiple';
import type { GenerateStyle } from '../../theme/internal';
import type { PickerToken } from './token';

const genPickerMultipleStyle: GenerateStyle<PickerToken> = (token) => {
  const { componentCls, controlHeight, fontHeight, lineWidth, calc } = token;

  const height = token.calc(fontHeight).add(2).equal();
  const restHeight = () => calc(controlHeight).sub(height).sub(calc(lineWidth).mul(2));

  const paddingTop = token.max(restHeight().div(2).equal(), 0);
  const paddingBottom = token.max(restHeight().sub(paddingTop).equal(), 0);

  return [
    genSelectionStyle(token),
    {
      [`${componentCls}-multiple`]: {
        width: '100%',
        paddingTop,
        paddingBottom,
        paddingInlineStart: paddingTop,

        // ==================== Selector =====================
        [`${componentCls}-selector`]: {
          flex: 'auto',
          padding: 0,

          '&:after': {
            margin: 0,
          },
        },

        // ==================== Selection ====================
        [`${componentCls}-selection-item`]: {
          marginBlock: 0,
        },

        // ====================== Input ======================
        // Input is `readonly`, which is used for a11y only
        [`${componentCls}-multiple-input`]: {
          width: 0,
          height: 0,
          border: 0,
          visibility: 'hidden',
          position: 'absolute',
          zIndex: -1,
        },
      },
    },
  ];
};

export default genPickerMultipleStyle;

// calc((var(--ant-control-height) - calc(var(--ant-font-height) + 2px) - var(--ant-line-width) * 2) / 2)
