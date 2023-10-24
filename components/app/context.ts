import React from 'react';
import type { MessageInstance, ConfigOptions as MessageConfig } from '../message/interface';
import type { NotificationInstance, NotificationConfig } from '../notification/interface';
import type { HookAPI as ModalHookAPI } from '../modal/useModal';

export type AppConfig = {
  message?: MessageConfig;
  notification?: NotificationConfig;
};

export const AppConfigContext = React.createContext<AppConfig>({});

export interface useAppProps {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: ModalHookAPI;
}

const AppContext = React.createContext<useAppProps>({
  message: {},
  notification: {},
  modal: {},
} as useAppProps);

export default AppContext;
