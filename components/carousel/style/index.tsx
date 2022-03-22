// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
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
}

const genCarouselStyle: GenerateStyle<CarouselToken, CSSObject> = token => {
  const { carouselPrefixCls } = token;

  return {
    [carouselPrefixCls]: {
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
        margin: '0',
        padding: '0',
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
          'input.@{ant-prefix}-radio-input, input.@{ant-prefix}-checkbox-input': {
            visibility: 'hidden',
          },

          '&.slick-active': {
            pointerEvents: 'auto',

            'input.@{ant-prefix}-radio-input, input.@{ant-prefix}-checkbox-input': {
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
        top: '0',
        left: '0',
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
        padding: '0',
        color: 'transparent',
        fontSize: '0',
        lineHeight: '0',
        background: 'transparent',
        border: '0',
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
          opacity: '0.25',
        },
      },

      '.slick-prev': {
        left: '-25px',

        '&::before': {
          content: '←',
        },
      },

      '.slick-next': {
        right: '-25px',

        '&::before': {
          content: '→',
        },
      },

      // Dots
      '.slick-dots': {
        position: 'absolute',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '15',
        display: 'flex !important',
        justifyContent: 'center',
        marginRight: '15%',
        marginLeft: '15%',
        paddingLeft: '0',
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
          width: '@carousel-dot-width',
          height: '@carousel-dot-height',
          margin: '0 2px',
          marginRight: '3px',
          marginLeft: '3px',
          padding: '0',
          textAlign: 'center',
          textIndent: '-999px',
          verticalAlign: 'top',
          transition: 'all 0.5s',

          button: {
            display: 'block',
            width: '100%',
            height: '@carousel-dot-height',
            padding: '0',
            color: 'transparent',
            fontSize: '0',
            background: '@component-background',
            border: '0',
            borderRadius: '1px',
            outline: 'none',
            cursor: 'pointer',
            opacity: '0.3',
            transition: 'all 0.5s',

            '&: hover, &:focus': {
              opacity: '0.75',
            },
          },

          '&.slick-active': {
            width: '@carousel-dot-active-width',

            '& button': {
              background: '@component-background',
              opacity: '1',
            },

            '&: hover, &:focus': {
              opacity: '1',
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
    [`${carouselPrefixCls}-vertical`]: {
      '.slick-dots': {
        top: '50%',
        bottom: 'auto',
        flexDirection: 'column',
        width: '@carousel-dot-height',
        height: 'auto',
        margin: '0',
        transform: 'translateY(-50%)',

        '&-left': {
          right: 'auto',
          left: '12px',
        },

        '&-right': {
          right: '12px',
          left: 'auto',
        },

        li: {
          width: '@carousel-dot-height',
          height: '@carousel-dot-width',
          margin: '4px 2px',
          verticalAlign: 'baseline',

          button: {
            width: '@carousel-dot-height',
            height: '@carousel-dot-width',
          },

          '&.slick-active': {
            width: '@carousel-dot-height',
            height: '@carousel-dot-active-width',

            button: {
              width: '@carousel-dot-height',
              height: '@carousel-dot-active-width',
            },
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const carouselToken: CarouselToken = {
    ...token,
    carouselPrefixCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genCarouselStyle(carouselToken),
      genCarouselVerticalStyle(carouselToken),
    ]),
    hashId,
  ];
}
