import { useStyleRegister } from '@ant-design/cssinjs';
import type {
  AliasToken,
  GenerateStyle,
  PresetColorKey,
  PresetColorType,
  SeedToken,
  UseComponentStyleResult,
} from './interface';
import { PresetColors } from './interface';
import useToken from './useToken';
import type { FullToken } from './util/genComponentStyleHook';
import genComponentStyleHook from './util/genComponentStyleHook';
import genPresetColor from './util/genPresetColor';
import statisticToken, { merge as mergeToken } from './util/statistic';

export { DesignTokenContext, defaultConfig } from './context';
export {
  PresetColors,
  genComponentStyleHook,
  genPresetColor,
  mergeToken,
  statisticToken,
  // hooks
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
};
