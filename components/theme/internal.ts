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
  statisticToken,
  mergeToken,
  // hooks
  useStyleRegister,
  useToken,
  genComponentStyleHook,
  genPresetColor,
};
export type {
  SeedToken,
  AliasToken,
  PresetColorType,
  PresetColorKey,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
  FullToken,
  UseComponentStyleResult,
  GenerateStyle,
};
