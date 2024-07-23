import { useStyleRegister } from '@ant-design/cssinjs';
import { genCalc as calc, mergeToken } from '@ant-design/cssinjs-utils';

import type {
  AliasToken,
  GenerateStyle,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  GlobalToken,
  UseComponentStyleResult,
  FullToken,
  GetDefaultToken,
  OverrideComponent,
  GenStyleFn,
} from './interface';
import { PresetColors } from './interface';
import { getLineHeight } from './themes/shared/genFontSizes';
import useToken from './useToken';
import genComponentStyleHook, {
  genStyleHooks,
  genSubStyleComponent,
} from './util/genComponentStyleHook';
import genPresetColor from './util/genPresetColor';
import statisticToken from './util/statistic';
import useResetIconStyle from './util/useResetIconStyle';

export type { CSSUtil } from '@ant-design/cssinjs-utils';

export { DesignTokenContext, defaultConfig } from './context';
export {
  PresetColors,
  genComponentStyleHook,
  genSubStyleComponent,
  genPresetColor,
  genStyleHooks,
  mergeToken,
  statisticToken,
  calc,
  getLineHeight,
  // hooks
  useResetIconStyle,
  useStyleRegister,
  useToken,
};
export type {
  AliasToken,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
  FullToken,
  OverrideComponent,
  GenerateStyle,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
  GetDefaultToken,
  GlobalToken,
  GenStyleFn,
};
