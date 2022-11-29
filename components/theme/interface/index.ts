import type { ComponentTokenMap } from './components';
import type { AliasToken } from './alias';

export type OverrideToken = {
  [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};

/** Final token which contains the components level override */
export type GlobalToken = AliasToken & ComponentTokenMap;

export * from './presetColors';
export * from './seeds';
export * from './maps';
export * from './alias';
export * from './components';
