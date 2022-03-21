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
    ]),
    hashId,
  ];
}
