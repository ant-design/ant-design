import React from 'react';
import type { ConfigOptions as MessageConfig, MessageInstance } from '../message/interface';
import type { ModalStaticFunctions } from '../modal/confirm';
import type { NotificationConfig, NotificationInstance } from '../notification/interface';

export type AppConfig = {
  message?: MessageConfig;
  notification?: NotificationConfig;
};

export const AppConfigContext = React.createContext<AppConfig>({});

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
