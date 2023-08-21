import React from 'react';

import type { NormalCancelBtnProps } from './components/NormalCancelBtn';
import type { NormalOkBtnProps } from './components/NormalOkBtn';
import type { ConfirmCancelBtnProps } from './components/ConfirmCancelBtn';
import type { ConfirmOkBtnProps } from './components/ConfirmOkBtn';

export const NormalCancelBtnContext = React.createContext<NormalCancelBtnProps>(
  {} as NormalCancelBtnProps,
);
export const NormalOkBtnContext = React.createContext<NormalOkBtnProps>({} as NormalOkBtnProps);
export const ConfirmCancelBtnContext = React.createContext<ConfirmCancelBtnProps>(
  {} as ConfirmCancelBtnProps,
);
export const ConfirmOkBtnContext = React.createContext<ConfirmOkBtnProps>({} as ConfirmOkBtnProps);

export const { Provider: NormalCancelBtnContextProvider } = NormalCancelBtnContext;
export const { Provider: NormalOkBtnContextProvider } = NormalOkBtnContext;
export const { Provider: ConfirmCancelBtnContextProvider } = ConfirmCancelBtnContext;
export const { Provider: ConfirmOkBtnProvider } = ConfirmOkBtnContext;
