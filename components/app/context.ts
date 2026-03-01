import React from 'react';

import type { BreadcrumbItemType } from '../breadcrumb/Breadcrumb';
import type { ConfigOptions as MessageConfig, MessageInstance } from '../message/interface';
import type { HookAPI as ModalHookAPI } from '../modal/useModal';
import type { NotificationConfig, NotificationInstance } from '../notification/interface';

export interface AppConfig {
  message?: MessageConfig;
  notification?: NotificationConfig;
  breadcrumb?: { items?: BreadcrumbItemType[]; root?: boolean };
}

export const AppConfigContext = React.createContext<AppConfig>({});

export interface useAppProps {
  message: MessageInstance;
  notification: NotificationInstance;
  modal: ModalHookAPI;
  breadcrumb: { items: BreadcrumbItemType[] };
}

const AppContext = React.createContext<useAppProps>({
  message: {},
  notification: {},
  modal: {},
  breadcrumb: { items: [] as BreadcrumbItemType[] },
} as useAppProps);

export default AppContext;
