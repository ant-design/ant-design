// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, clearFix, genComponentStyleHook, mergeToken } from '../../_util/theme';

interface TableToken extends FullToken<'Table'> {
  tableFontSize: number;
  tableBg: CSSObject['background'];
  tableRadius: CSSObject['border-radius'];
  tablePaddingHorizontal: number;
  tablePaddingVertical: number;
  tableFooterTextColor: CSSObject['color'];
  tableFooterBg: CSSObject['background'];
}

const genTableStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      clear: 'both',
      maxWidth: '100%',
      ...clearFix(),

      [componentCls]: {
        ...resetComponent(token),

        fontSize: token.tableFontSize,
        background: token.tableBg,
        borderRadius: token.tableRadius,

        // https://github.com/ant-design/ant-design/issues/17611
        table: {
          width: '100%',
          textAlign: 'left',
          borderRadius: `${token.tableRadius}px ${token.tableRadius}px 0 0`,
          borderCollapse: 'separate',
          borderSpacing: 0,
        },

        // ============================= Cell =============================
        [`${componentCls}-thead > tr > th,
  ${componentCls}-tbody > tr > td,
  tfoot > tr > th,
  tfoot > tr > td`]: {
          position: 'relative',
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
          overflowWrap: 'break-word',
        },

        // ============================ Title =============================
        [`${componentCls}-title`]: {
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
        },

        // ============================ Footer ============================
        [`${componentCls}-footer`]: {
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
          color: token.tableFooterTextColor,
          background: token.tableFooterBg,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Table', token => {
  const tableToken = mergeToken<TableToken>(token, {
    // FIXME: missing token
    tableFontSize: token.fontSizeBase,
    tableBg: token.colorBgComponent,
    tableRadius: token.radiusBase,
    tablePaddingHorizontal: token.padding,
    tablePaddingVertical: token.padding,
    tableFooterTextColor: token.colorTextHeading,
    tableFooterBg: token.colorBgComponentSecondary,
  });

  return [genTableStyle(tableToken)];
});
