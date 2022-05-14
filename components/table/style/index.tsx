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
  tableBorderColor: CSSObject['border-color'];
  tableHeaderTextColor: CSSObject['color'];
  tableHeaderBg: CSSObject['background'];
  tableFooterTextColor: CSSObject['color'];
  tableFooterBg: CSSObject['background'];
  tableHeaderCellSplitColor: CSSObject['border-color'];
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
        [`
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td,
        `]: {
          position: 'relative',
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
          overflowWrap: 'break-word',
        },

        // ============================ Title =============================
        [`${componentCls}-title`]: {
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
        },

        // ============================ Header ============================
        [`${componentCls}-thead`]: {
          '> tr > th': {
            position: 'relative',
            color: token.tableHeaderTextColor,
            fontWeight: 500,
            textAlign: 'left',
            background: token.tableHeaderBg,
            borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`,
            transition: `background ${token.motionDurationSlow} ease`,

            "&[colspan]:not([colspan='1'])": {
              textAlign: 'center',
            },

            [`&:not(:last-child):not(${componentCls}-selection-column):not(${componentCls}-row-expand-icon-cell):not([colspan])::before`]:
              {
                position: 'absolute',
                top: '50%',
                right: 0,
                width: 1,
                height: '1.6em',
                backgroundColor: token.tableHeaderCellSplitColor,
                transform: 'translateY(-50%)',
                transition: `background-color ${token.motionDurationSlow}`,
                content: '""',
              },
          },

          '> tr:not(:last-child) > th[colspan]': {
            borderBottom: 0,
          },
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
  // FIXME: missing token
  const tableToken = mergeToken<TableToken>(token, {
    tableFontSize: token.fontSizeBase,
    tableBg: token.colorBgComponent,
    tableRadius: token.radiusBase,
    tablePaddingHorizontal: token.padding,
    tablePaddingVertical: token.padding,
    tableBorderColor: token.colorBorderSecondary,
    tableHeaderTextColor: token.colorTextHeading,
    tableHeaderBg: token.colorBgComponentSecondary,
    tableFooterTextColor: token.colorTextHeading,
    tableFooterBg: token.colorBgComponentSecondary,
    // FIXME: missing token
    tableHeaderCellSplitColor: 'rgba(0, 0, 0, 0.06)',
  });

  return [genTableStyle(tableToken)];
});
