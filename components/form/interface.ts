import type { Options } from 'scroll-into-view-if-needed';

export type { InternalNamePath, NamePath, Store, StoreValue } from 'rc-field-form/lib/interface';
export type ScrollFocusOptions = Options & {
  focus?: boolean;
};
export type ScrollOptions = ScrollFocusOptions; // alias
export type FormLabelAlign = 'left' | 'right';
