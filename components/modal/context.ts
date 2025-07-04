import React from 'react';

import type { ConfirmCancelBtnProps } from './components/ConfirmCancelBtn';
import type { ConfirmOkBtnProps } from './components/ConfirmOkBtn';
import type { NormalCancelBtnProps } from './components/NormalCancelBtn';
import type { NormalOkBtnProps } from './components/NormalOkBtn';

export type ModalContextProps = NormalCancelBtnProps &
  NormalOkBtnProps &
  ConfirmOkBtnProps &
  ConfirmCancelBtnProps;

export const ModalContext = React.createContext<ModalContextProps>({} as ModalContextProps);

export const { Provider: ModalContextProvider } = ModalContext;
