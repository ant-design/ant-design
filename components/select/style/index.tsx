// import '../../style/index.less';
// import './index.less';

// style dependencies
import '../../empty/style';

// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  withPrefix,
  UseComponentStyleResult,
} from '../../_util/theme';

type SelectToken = DerivativeToken & {
  selectCls: string;
};

// ============================= Selector =============================
const genSelectorStyle = (token: SelectToken): CSSObject => {
  const { selectCls } = token;

  return {
    position: 'relative',
    backgroundColor: token.componentBackground,
    border: `${token.borderWidth} ${token.borderStyle} ${token.borderColor}`,
    borderRadius: token.borderRadius,
    transition: `all ${token.duration} ${token.easeInOut}`,

    input: {
      cursor: 'pointer',
    },

    [`${selectCls}-show-search&`]: {
      cursor: 'text',

      input: {
        cursor: 'auto',
      },
    },

    [`${selectCls}-focused:not(${selectCls}-disabled)&`]: {
      //     .active();
    },
  };
};

//   .@{select-prefix-cls}-disabled& {
//     color: @disabled-color;
//     background: @input-disabled-bg;
//     cursor: not-allowed;

//     .@{select-prefix-cls}-multiple& {
//       background: @select-multiple-disabled-background;
//     }

//     input {
//       cursor: not-allowed;
//     }
//   }

// ============================== Styles ==============================
export const genSelectStyle = (
  prefixCls: string,
  token: DerivativeToken,
  hashId: string,
): CSSObject => {
  const selectCls = `.${prefixCls}`;

  const selectHeightWithoutBorder = token.height - token.borderWidth * 2;

  const selectToken = {
    ...token,
    selectCls,
  };

  return {
    ...resetComponent(token),
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',

    [`&:not(&-customize-input) ${selectCls}-selector`]: {
      ...genSelectorStyle(selectToken),
      //     .select-search-input-without-border();
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genSelectStyle(prefixCls, token, hashId), prefixCls),
    ]),
    hashId,
  ];
}
