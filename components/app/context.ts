import React from 'react';
import type { MessageInstance } from '../message/interface';
import type { NotificationInstance } from '../notification/interface';
import type { ModalStaticFunctions } from '../modal/confirm';

export interface useAppProps {
  message: MessageInstance;
  notification: NotificationInstance;
  Modal: Omit<ModalStaticFunctions, 'warn'>;
}
const AppContext = React.createContext<useAppProps | undefined>(undefined);

export default AppContext;
