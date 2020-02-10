import * as React from 'react';
import useRCNotification from 'rc-notification/lib/useNotification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification';
import { ConfigConsumer, ConfigConsumerProps } from '../../config-provider';
import { NotificationInstance, ArgsProps } from '..';

export default function createUseNotification(
  getNotificationInstance: (
    args: ArgsProps,
    callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
  ) => void,
  getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent,
) {
  const useNotification = (): [NotificationInstance, React.ReactElement] => {
    // We can only get content by render
    let getPrefixCls: ConfigConsumerProps['getPrefixCls'];

    // We create a proxy to handle delay created instance
    let innerInstance: RCNotificationInstance | null = null;
    const proxy = {
      add: (noticeProps: RCNoticeContent, holderCallback?: RCHolderReadyCallback) => {
        innerInstance?.component.add(noticeProps, holderCallback);
      },
    } as any;

    const [hookNotify, holder] = useRCNotification(proxy);

    function notify(args: ArgsProps) {
      const { prefixCls: customizePrefixCls } = args;
      const mergedPrefixCls = getPrefixCls('notification', customizePrefixCls);

      getNotificationInstance(
        {
          ...args,
          prefixCls: mergedPrefixCls,
        },
        ({ prefixCls, instance }) => {
          innerInstance = instance;
          hookNotify(getRCNoticeProps(args, prefixCls));
        },
      );
    }

    // Fill functions
    const hookAPI: any = {
      open: notify,
    };
    ['success', 'info', 'warning', 'error'].forEach(type => {
      hookAPI[type] = (args: ArgsProps) =>
        hookAPI.open({
          ...args,
          type,
        });
    });

    return [
      hookAPI,
      <ConfigConsumer key="holder">
        {(context: ConfigConsumerProps) => {
          ({ getPrefixCls } = context);
          return holder;
        }}
      </ConfigConsumer>,
    ];
  };

  return useNotification;
}
