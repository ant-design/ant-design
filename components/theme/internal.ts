import { genCalc as calc, useStyleRegister } from '@ant-design/cssinjs';

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
} from './interface';
import { PresetColors } from './interface';
import { getLineHeight } from './themes/shared/genFontSizes';
import useToken from './useToken';
import genComponentStyleHook, {
  genStyleHooks,
  genSubStyleComponent,
} from './util/genComponentStyleHook';
import genPresetColor from './util/genPresetColor';
import statisticToken, { merge as mergeToken } from './util/statistic';
import useResetIconStyle from './util/useResetIconStyle';

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
};
