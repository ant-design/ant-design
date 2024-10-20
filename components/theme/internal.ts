import { useStyleRegister } from '@ant-design/cssinjs';
import { genCalc as calc, mergeToken, statisticToken, statistic } from '@ant-design/cssinjs-utils';

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
import { genComponentStyleHook, genStyleHooks, genSubStyleComponent } from './util/genStyleUtils';
import genPresetColor from './util/genPresetColor';
import useResetIconStyle from './util/useResetIconStyle';

export type { CSSUtil, TokenWithCommonCls } from '@ant-design/cssinjs-utils';

export { DesignTokenContext, defaultConfig } from './context';
export {
  // generators
  genComponentStyleHook,
  genSubStyleComponent,
  genPresetColor,
  genStyleHooks,
  // utils
  mergeToken,
  statisticToken,
  calc,
  getLineHeight,
  // hooks
  useResetIconStyle,
  useStyleRegister,
  useToken,
  // constant
  PresetColors,
  statistic,
};
export type {
  AliasToken,
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
