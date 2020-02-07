import * as React from 'react';
import { NotificationApi } from '..';
import usePatchElement from '../../_util/usePatchElement';

// "open", "close", "config", "destroy", "success", "info", "warning", "error"

// export default function useNotification(): [Omit<NotificationApi, 'warn'>, React.ReactElement] {
//   const [elements, patchElement] = usePatchElement();
//   return [{}, <>{elements}</>];
// }

export function getUseNotification() {}
