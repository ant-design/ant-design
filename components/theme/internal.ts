import { useStyleRegister } from '@ant-design/cssinjs';
import { genCalc as calc, mergeToken, statistic, statisticToken } from '@ant-design/cssinjs-utils';

import type {
  AliasToken,
  FullToken,
  GenerateStyle,
  GenStyleFn,
  GetDefaultToken,
  GlobalToken,
  OverrideComponent,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
} from './interface';
import { PresetColors } from './interface';
import { getLineHeight } from './themes/shared/genFontSizes';
import useToken from './useToken';
import genPresetColor from './util/genPresetColor';
import { genComponentStyleHook, genStyleHooks, genSubStyleComponent } from './util/genStyleUtils';
import useResetIconStyle from './util/useResetIconStyle';

export { defaultConfig, DesignTokenContext } from './context';
export type { CSSUtil, TokenWithCommonCls } from '@ant-design/cssinjs-utils';

export {
  calc,
  // generators
  genComponentStyleHook,
  genPresetColor,
  genStyleHooks,
  genSubStyleComponent,
  getLineHeight,
  // utils
  mergeToken,
  // constant
  PresetColors,
  statistic,
  statisticToken,
  // hooks
  useResetIconStyle,
  useStyleRegister,
  useToken,
};
export type {
  AliasToken,
  FullToken,
  GenerateStyle,
  GenStyleFn,
  GetDefaultToken,
  GlobalToken,
  OverrideComponent,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
};
