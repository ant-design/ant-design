import type { GenerateStyle, FullToken } from '../../_util/theme';

const genDraggerStyle: GenerateStyle<FullToken<'Upload'>> = token => {
  const { componentCls, iconCls } = token;

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-drag`]: {
        position: 'relative',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        background: token.colorBgComponentSecondary,
        border: `${token.controlLineWidth}px dashed ${token.colorBorder}`,
        borderRadius: token.radiusBase,
        cursor: 'pointer',
        transition: `border-color ${token.motionDurationSlow}`,

        [componentCls]: {
          padding: `${token.padding}px 0`,
        },

        [`${componentCls}${componentCls}-disabled`]: {
          cursor: 'not-allowed',
        },

        [`${componentCls}-btn`]: {
          display: 'table',
          width: '100%',
          height: '100%',
          outline: 'none',
        },

        [`${componentCls}-drag-container`]: {
          display: 'table-cell',
          verticalAlign: 'middle',
        },

        [`${componentCls}:not(${componentCls}-disabled):hover`]: {
          borderColor: token.colorPrimaryHover,
        },

        [`p${componentCls}-drag-icon`]: {
          // FIXME: upload token
          marginBottom: 20,

          [iconCls]: {
            color: token.colorPrimary,
            // FIXME: upload token
            fontSize: 48,
          },
        },

        [`p${componentCls}-text`]: {
          margin: `0 0 ${token.marginXXS}px`,
          color: token.colorTextHeading,
          fontSize: token.fontSizeLG,
        },

        [`p${componentCls}-hint`]: {
          color: token.colorTextSecondary,
          fontSize: token.fontSizeBase,
        },
      },
    },
  };
};

export default genDraggerStyle;
