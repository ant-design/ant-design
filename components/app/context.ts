import React from 'react';
import type { MessageInstance } from '../message/interface';
import type { NotificationInstance } from '../notification/interface';
import type { ModalStaticFunctions } from '../modal/confirm';

type ModalType = Omit<ModalStaticFunctions, 'warn'>;
export interface useAppProps {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: ModalType;
}

const AppContext = React.createContext<useAppProps>({
  message: {},
  notification: {},
  modal: {},
} as useAppProps);

export default AppContext;
