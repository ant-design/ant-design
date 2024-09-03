import type { CSSInterpolation, DerivativeFunc } from '@ant-design/cssinjs';

import type { AnyObject } from '../../_util/type';
import type { AliasToken } from './alias';
import type { MapToken } from './maps';
import type { SeedToken } from './seeds';

export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;

export type {
  GlobalToken,
  OverrideToken,
  FullToken,
  OverrideComponent,
  GetDefaultToken,
  GenStyleFn,
} from './cssinjs-utils';

export type { AliasToken } from './alias';
export type { ComponentTokenMap } from './components';
export type {
  ColorMapToken,
  ColorNeutralMapToken,
  CommonMapToken,
  FontMapToken,
  HeightMapToken,
  MapToken,
  SizeMapToken,
  StyleMapToken,
} from './maps';
export { PresetColors } from './presetColors';
export type {
  LegacyColorPalettes,
  ColorPalettes,
  PresetColorKey,
  PresetColorType,
} from './presetColors';
export type { SeedToken } from './seeds';

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

export type GenerateStyle<
  ComponentToken extends AnyObject = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;
