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
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const carouselToken: CarouselToken = {
    ...token,
    carouselPrefixCls: `${prefixCls}-carousel`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genCarouselStyle(carouselToken),
    ]),
    hashId,
  ];
}
