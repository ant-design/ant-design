import React from 'react';

import type { ConfigOptions as MessageConfig, MessageInstance } from '../message/interface';
import type { HookAPI as ModalHookAPI } from '../modal/useModal';
import type { NotificationConfig, NotificationInstance } from '../notification/interface';

export interface AppConfig {
  message?: MessageConfig;
  notification?: NotificationConfig;
}

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
