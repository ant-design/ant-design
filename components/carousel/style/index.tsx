// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { globalConfig } from '../../config-provider';
import {
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  GenerateStyle,
} from '../../_util/theme';

interface CarouselToken extends DerivativeToken {
  carouselPrefixCls: string;
  carouselDotWidth: CSSObject['width'];
  carouselDotHeight: CSSObject['height'];
  carouselDotActiveWidth: CSSObject['width'];
}

const genCarouselStyle: GenerateStyle<CarouselToken, CSSObject> = token => {
  const { carouselPrefixCls } = token;
  const rootPrefixCls = globalConfig().getRootPrefixCls();

  return {
    [`.${carouselPrefixCls}`]: {
      ...resetComponent(token),

      '.slick-slider': {
        position: 'relative',
        display: 'block',
        boxSizing: 'border-box',
        touchAction: 'pan-y',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',

        '.slick-track, .slick-list': {
          transform: 'translate3d(0, 0, 0)',
          touchAction: 'pan-y',
        },
      },

      '.slick-list': {
        position: 'relative',
        display: 'block',
        margin: 0,
        padding: 0,
        overflow: 'hidden',

        '&:focus': {
          outline: 'none',
        },

        '&.dragging': {
          cursor: 'pointer',
        },

        '.slick-slide': {
          pointerEvents: 'none',

          // https://github.com/ant-design/ant-design/issues/23294
          [`input.${rootPrefixCls}-radio-input, input.${rootPrefixCls}-checkbox-input`]: {
            visibility: 'hidden',
          },

          '&.slick-active': {
            pointerEvents: 'auto',

            [`input.${rootPrefixCls}-radio-input, input.${rootPrefixCls}-checkbox-input`]: {
              visibility: 'visible',
            },
          },

          // fix Carousel content height not match parent node
          // when children is empty node
          // https://github.com/ant-design/ant-design/issues/25878
          '> div > div': {
            verticalAlign: 'bottom',
          },
        },
      },

      '.slick-track': {
        position: 'relative',
        top: 0,
        insetInlineStart: 0,
        display: 'block',

        '&::before, &::after': {
          display: 'table',
          content: '',
        },

        '&::after': {
          clear: 'both',
        },

        '.slick-loading &': {
          visibility: 'hidden',
        },
      },

      '.slick-slide': {
        display: 'none',
        float: 'left',
        height: '100%',
        minHeight: '1px',

        img: {
          display: 'block',
        },

        '&.slick-loading img': {
          display: 'none',
        },

        '&.dragging img': {
          pointerEvents: 'none',
        },
      },

      '.slick-initialized .slick-slide': {
        display: 'block',
      },

      '.slick-loading .slick-slide': {
        visibility: 'hidden',
      },

      '.slick-vertical .slick-slide': {
        display: 'block',
        height: 'auto',
      },

      '.slick-arrow.slick-hidden': {
        display: 'none',
      },

      // Arrows
      '.slick-prev, .slick-next': {
        position: 'absolute',
        top: '50%',
        display: 'block',
        width: '20px',
        height: '20px',
        marginTop: '-10px',
        padding: 0,
        color: 'transparent',
        fontSize: 0,
        lineHeight: 0,
        background: 'transparent',
        border: 0,
        outline: 'none',
        cursor: 'pointer',

        '&:hover, &:focus': {
          color: 'transparent',
          background: 'transparent',
          outline: 'none',

          '&::before': {
            opacity: 1,
          },
        },

        '&.slick-disabled::before': {
          opacity: 0.25,
        },
      },

      '.slick-prev': {
        insetInlineStart: '-25px',

        '&::before': {
          content: '←',
        },
      },

      '.slick-next': {
        insetInlineEnd: '-25px',

        '&::before': {
          content: '→',
        },
      },

      // Dots
      '.slick-dots': {
        position: 'absolute',
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 15,
        display: 'flex !important',
        justifyContent: 'center',
        marginInlineEnd: '15%',
        marginInlineStart: '15%',
        paddingInlineStart: 0,
        listStyle: 'none',

        '&-bottom': {
          bottom: '12px',
        },

        '&-top': {
          top: '12px',
          bottom: 'auto',
        },

        li: {
          position: 'relative',
          display: 'inline-block',
          flex: '0 1 auto',
          boxSizing: 'content-box',
          width: token.carouselDotWidth,
          height: token.carouselDotHeight,
          margin: '0 2px',
          marginInlineEnd: '3px',
          marginInlineStart: '3px',
          padding: 0,
          textAlign: 'center',
          textIndent: '-999px',
          verticalAlign: 'top',
          transition: 'all 0.5s',

          button: {
            display: 'block',
            width: '100%',
            height: token.carouselDotHeight,
            padding: 0,
            color: 'transparent',
            fontSize: 0,
            background: token.colorBgComponent,
            border: 0,
            borderRadius: '1px',
            outline: 'none',
            cursor: 'pointer',
            opacity: 0.3,
            transition: 'all 0.5s',

            '&: hover, &:focus': {
              opacity: 0.75,
            },
          },

          '&.slick-active': {
            width: token.carouselDotActiveWidth,

            '& button': {
              background: token.colorBgComponent,
              opacity: 1,
            },

            '&: hover, &:focus': {
              opacity: 1,
            },
          },
        },
      },
    },
  };
};

const genCarouselVerticalStyle: GenerateStyle<CarouselToken, CSSObject> = token => {
  const { carouselPrefixCls } = token;

  return {
    [`.${carouselPrefixCls}-vertical`]: {
      '.slick-dots': {
        top: '50%',
        bottom: 'auto',
        flexDirection: 'column',
        width: token.carouselDotHeight,
        height: 'auto',
        margin: 0,
        transform: 'translateY(-50%)',

        '&-left': {
          insetInlineEnd: 'auto',
          insetInlineStart: '12px',
        },

        '&-right': {
          insetInlineEnd: '12px',
          insetInlineStart: 'auto',
        },

        li: {
          // reverse width and height in vertical situation
          width: token.carouselDotHeight,
          height: token.carouselDotWidth,
          margin: '4px 2px',
          verticalAlign: 'baseline',

          button: {
            width: token.carouselDotHeight,
            height: token.carouselDotWidth,
          },

          '&.slick-active': {
            width: token.carouselDotHeight,
            height: token.carouselDotActiveWidth,

            button: {
              width: token.carouselDotHeight,
              height: token.carouselDotActiveWidth,
            },
          },
        },
      },
    },
  };
};

const genCarouselRtlStyle: GenerateStyle<CarouselToken> = token => {
  const { carouselPrefixCls } = token;

  return [
    {
      [`.${carouselPrefixCls}-rtl`]: {
        direction: 'rtl',

        // Dots
        '.slick-dots': {
          [`.${carouselPrefixCls}-rtl&`]: {
            flexDirection: 'row-reverse',
          },
        },
      },
    },
    {
      [`.${carouselPrefixCls}-vertical`]: {
        '.slick-dots': {
          [`.${carouselPrefixCls}-rtl&`]: {
            flexDirection: 'column',
          },
        },
      },
    },
  ];
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const carouselToken: CarouselToken = {
    ...token,
    carouselPrefixCls: prefixCls,

    // FIXME
    carouselDotWidth: 16,
    carouselDotHeight: 3,
    carouselDotActiveWidth: 24,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genCarouselStyle(carouselToken),
      genCarouselVerticalStyle(carouselToken),
      genCarouselRtlStyle(carouselToken),
    ]),
    hashId,
  ];
}
