import { useStyleRegister } from '@ant-design/cssinjs';

import {
  PresetColors,
  type AliasToken,
  type GenerateStyle,
  type PresetColorKey,
  type PresetColorType,
  type SeedToken,
  type UseComponentStyleResult,
} from './interface';
import { getLineHeight } from './themes/shared/genFontSizes';
import useToken from './useToken';
import calc from './util/calc';
import genComponentStyleHook, {
  genStyleHooks,
  genSubStyleComponent,
  type FullToken,
  type GetDefaultToken,
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
  GenerateStyle,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
  GetDefaultToken,
};
