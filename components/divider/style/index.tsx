// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
// import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  withPrefix,
} from '../../_util/theme';

// ============================== Shared ==============================
const genSharedDividerStyle = (token: DerivativeToken, dividerColor: string): CSSObject => ({
  // .reset-component()
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.textColor,
  fontSize: token.fontSize,
  fontVariant: 'tabular-nums',
  lineHeight: 1.5715,
  listStyle: 'none',
  fontFeatureSettings: 'tnum',

  borderTop: `1px solid ${dividerColor}`,

  // vertical
  '&-vertical': {
    position: 'relative',
    top: '-0.06em',
    display: 'inline-block',
    height: '0.9em',
    margin: '0 8px',
    verticalAlign: 'middle',
    borderTop: 0,
    borderLeft: `1px solid ${dividerColor}`,
  },

  '&-horizontal': {
    display: 'flex',
    clear: 'both',
    width: '100%',
    minWidth: '100%', // Fix https://github.com/ant-design/ant-design/issues/10914
    margin: '24px 0',
  },

  '&-horizontal&-with-text': {
    display: 'flex',
    margin: '16px 0',
    color: token.headingColor,
    fontWeight: 500,
    fontSize: token.fontSizeLG,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    borderTop: 0,
    borderTopColor: dividerColor,

    '&::before, &::after': {
      position: 'relative',
      top: '50%',
      width: '50%',
      borderTop: '1px solid transparent',
      // Chrome not accept `inherit` in `border-top`
      borderTopColor: 'inherit',
      borderBottom: 0,
      transform: 'translateY(50%)',
      content: "''",
    },
  },

  '&-horizontal&-with-text-right': {
    '&::before': {
      top: '50%',
      width: '95%',
    },

    '&::after': {
      top: '50%',
      width: '5%',
    },
  },

  '&-inner-text': {
    display: 'inline-block',
    padding: '0 1em',
  },

  '&-dashed': {
    background: 'none',
    borderColor: dividerColor,
    borderStyle: 'dashed',
    borderWidth: '1px 0 0',
  },

  '&-horizontal&-with-text&-dashed': {
    '&::before, &::after': {
      borderStyle: 'dashed none none',
    },
  },

  '&-vertical&-dashed': {
    borderWidth: '0 0 0 1px',
  },

  '&-plain&-with-text': {
    color: token.textColor,
    fontWeight: 'normal',
    fontSize: token.fontSize,
  },

  '&-horizontal&-with-text-left&-no-default-orientation-margin-left': {
    '&::before': {
      width: 0,
    },

    '&::after': {
      width: '100%',
    },

    '.ant-divider-inner-text': {
      paddingLeft: 0,
    },
  },

  '&-horizontal&-with-text-right&-no-default-orientation-margin-right': {
    '&::before': {
      width: '100%',
    },

    '&::after': {
      width: 0,
    },

    '.ant-divider-inner-text': {
      paddingRight: 0,
    },
  },
});

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genSharedDividerStyle(token, 'rgba(0, 0, 0, 6%)'), prefixCls),
      { display: 'none' },
    ]),
    hashId,
  ];
}
