import type { CSSObject } from '@ant-design/cssinjs';
import type { MenuToken } from '.';
import type { GenerateStyle } from '../../theme';

const getVerticalInlineStyle: GenerateStyle<MenuToken, CSSObject> = token => {
  const { componentCls, menuItemHeight, marginXS, padding, marginXXS, menuArrowSize, fontSize } =
    token;

  const paddingWithArrow = menuArrowSize + fontSize;

  return {
    [`${componentCls}-item`]: {
      position: 'relative',
    },

    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`,
      marginBlock: marginXXS,
      paddingInline: padding,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    // disable margin collapsed
    [`${componentCls}-submenu`]: {
      paddingBottom: 0.02,
    },

    [`${componentCls}-item:not(:last-child)`]: {
      marginBottom: marginXS,
    },

    [`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`,
    },

    [`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: {
      paddingInlineEnd: paddingWithArrow,
    },
  };
};

const getVerticalStyle: GenerateStyle<MenuToken> = token => {
  const {
    componentCls,
    iconCls,
    menuItemHeight,
    colorTextLightSolid,
    dropdownWidth,
    controlHeightLG,
    motionDurationFast,
    motionEaseOut,
    paddingXL,
    fontSizeLG,
    motionDurationSlow,
    paddingXS,
    boxShadow,
  } = token;

  return [
    {
      [componentCls]: {
        [`&-inline, &-vertical`]: {
          [`&${componentCls}-root`]: {
            boxShadow: 'none',
          },

          ...getVerticalInlineStyle(token),
        },
      },

      [`${componentCls}-submenu-popup`]: {
        [`${componentCls}-vertical`]: {
          ...getVerticalInlineStyle(token),
          boxShadow,
        },
      },
    },

    // Vertical only
    {
      [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
        minWidth: dropdownWidth,
        maxHeight: `calc(100vh - ${controlHeightLG * 2.5}px)`,
        padding: '0',
        overflow: 'hidden',
        borderInlineEnd: 0,

        // https://github.com/ant-design/ant-design/issues/22244
        // https://github.com/ant-design/ant-design/issues/26812
        "&:not([class*='-active'])": {
          overflowX: 'hidden',
          overflowY: 'auto',
        },
      },
    },

    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: '100%',

        // Motion enhance for first level
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu-title`]: {
            display: 'flex',
            alignItems: 'center',
            transition: [
              `border-color ${motionDurationSlow}`,
              `background ${motionDurationSlow}`,
              `padding ${motionDurationFast} ${motionEaseOut}`,
            ],

            [`> ${componentCls}-title-content`]: {
              flex: 'auto',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },

            '> *': {
              flex: 'none',
            },
          },
        },

        // >>>>> Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: 'none',

          [`& > ${componentCls}-item,
             & > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
            height: menuItemHeight,
            lineHeight: `${menuItemHeight}px`,
            listStylePosition: 'inside',
            listStyleType: 'disc',
          },

          [`& ${componentCls}-item-group-title`]: {
            paddingInlineStart: paddingXL,
          },
        },
      },
    },

    // Inline Collapse Only
    {
      [`${componentCls}-inline-collapsed`]: {
        width: menuItemHeight * 2,

        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: {
            [`> ${componentCls}-inline-collapsed-noicon`]: {
              fontSize: fontSizeLG,
              textAlign: 'center',
            },
          },
        },

        [`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - ${fontSizeLG / 2}px)`,
          textOverflow: 'clip',

          [`${componentCls}-submenu-arrow`]: {
            opacity: 0,
          },

          [`${componentCls}-item-icon, ${iconCls}`]: {
            margin: 0,
            fontSize: fontSizeLG,
            lineHeight: `${menuItemHeight}px`,

            '+ span': {
              display: 'inline-block',
              opacity: 0,
            },
          },
        },

        [`${componentCls}-item-icon, ${iconCls}`]: {
          display: 'inline-block',
        },

        '&-tooltip': {
          pointerEvents: 'none',

          [`${componentCls}-item-icon, ${iconCls}`]: {
            display: 'none',
          },

          'a, a:hover': {
            color: colorTextLightSolid,
          },
        },

        [`${componentCls}-item-group-title`]: {
          paddingInline: paddingXS,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },
    },
  ];
};

export default getVerticalStyle;
