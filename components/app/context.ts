import React from 'react';
import type { MessageInstance, ConfigOptions as MessageConfig } from '../message/interface';
import type { NotificationInstance, NotificationConfig } from '../notification/interface';
import type { ModalStaticFunctions } from '../modal/confirm';

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
