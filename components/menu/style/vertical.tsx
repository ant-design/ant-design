import type { CSSObject } from '@ant-design/cssinjs';
import type { MenuThemeToken } from '.';
import type { GenerateStyle } from '../../_util/theme';

const getVerticalInlineStyle: GenerateStyle<MenuThemeToken, CSSObject> = token => {
  const {
    componentCls,
    lineWidthBold,
    themeColorTextHighlight,
    motionDurationFast,
    motionEaseOut,
    menuItemHeight,
    marginXS,
    padding,
    marginSM,
    menuArrowSize,
    fontSize,
  } = token;

  const paddingWithArrow = menuArrowSize + fontSize;

  return {
    [`${componentCls}-item`]: {
      position: 'relative',

      '&::after': {
        position: 'absolute',
        insetBlock: 0,
        insetInlineEnd: 0,
        borderInlineEnd: `${lineWidthBold}px solid ${themeColorTextHighlight}`,
        transform: 'scaleY(0.0001)',
        opacity: 0,
        transition: [
          `transform ${motionDurationFast} ${motionEaseOut}`,
          `opacity ${motionDurationFast} ${motionEaseOut}`,
        ].join(','),
        content: '""',
      },
    },

    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`,
      marginBlock: marginXS,
      paddingInline: padding,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    // disable margin collapsed
    [`${componentCls}-submenu`]: {
      paddingBottom: 0.00000001,
    },

    [`${componentCls}-item:not(:last-child)`]: {
      marginBottom: marginSM,
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

const getVerticalStyle: GenerateStyle<MenuThemeToken> = token => {
  const {
    componentCls,
    iconCls,
    lineWidth,
    lineType,
    colorBorderSecondary,
    menuItemHeight,
    colorTextLightSolid,
    colorBgComponentSecondary,
    dropdownWidth,
    controlHeightLG,
    motionDurationFast,
    motionEaseInOut,
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
            borderInlineEnd: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
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
      [`${componentCls}-vertical`]: {
        [`${componentCls}-sub`]: {
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

          // [`${componentCls}-item`]: {
          //      left: 0;
          //      margin-left: 0;
          //      border-right: 0;
          //
          //      &::after {
          //        border-right: 0;
          //      }
          // },

          //    > ${componentCls}-item,
          //    > ${componentCls}-submenu {
          //      transform-origin: 0 0;
          //    }

          //  &-vertical &-submenu-selected,
          //  &-vertical-left &-submenu-selected,
          //  &-vertical-right &-submenu-selected {
          //    color: @menu-highlight-color;
          //  }
        },
      },
    },

    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: '100%',

        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          '&::after': {
            transform: 'scaleY(1)',
            opacity: 1,
            transition: [
              `transform ${motionDurationFast} ${motionEaseInOut}`,
              `opacity ${motionDurationFast} ${motionEaseInOut}`,
            ].join(','),
          },
        },

        [`${componentCls}-item, ${componentCls}-submenu-title`]: {
          width: `calc(100% + ${lineWidth}px)`,
        },

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
          background: colorBgComponentSecondary,
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
            paddingLeft: paddingXL,
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
          padding: `0 'calc(50% - ${fontSizeLG / 2}px)'`,
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
