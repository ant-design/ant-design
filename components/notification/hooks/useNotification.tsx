import useRCNotification from 'rc-notification/lib/useNotification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification';
import { NotificationInstance, ArgsProps } from '..';

export default function createUseNotification(
  getNotificationInstance: (
    args: ArgsProps,
  ) => Promise<{
    prefixCls: string;
    instance: RCNotificationInstance;
  }>,
  getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent,
) {
  const useNotification = (): [NotificationInstance, React.ReactElement] => {
    // We create a proxy to handle delay created instance
    let innerInstance: RCNotificationInstance | null = null;
    const proxy = {
      add: (noticeProps: RCNoticeContent, holderCallback?: RCHolderReadyCallback) => {
        if (innerInstance) {
          innerInstance.component.add(noticeProps, holderCallback);
        }
      },
    } as any;

    const [hookNotify, holder] = useRCNotification(proxy);

    function notify(args: ArgsProps) {
      getNotificationInstance(args).then(({ prefixCls, instance }) => {
        innerInstance = instance;
        hookNotify(getRCNoticeProps(args, prefixCls));
      });
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

    return [hookAPI, holder];
  };

  return useNotification;
}
