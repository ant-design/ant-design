import * as React from 'react';
import useRCNotification from 'rc-notification/lib/useNotification';
import {
  NotificationInstance as RCNotificationInstance,
  NoticeContent as RCNoticeContent,
  HolderReadyCallback as RCHolderReadyCallback,
} from 'rc-notification/lib/Notification';
import { ConfigConsumer, ConfigConsumerProps } from '../../config-provider';
import {
  MessageInstance,
  ArgsProps,
  attachTypeApi,
  ThenableArgument,
  getKeyThenIncreaseKey,
} from '..';

export default function createUseMessage(
  getRcNotificationInstance: (
    args: ArgsProps,
    callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
  ) => void,
  getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent,
) {
  const useMessage = (): [MessageInstance, React.ReactElement] => {
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
      const mergedPrefixCls = getPrefixCls('message', customizePrefixCls);
      const rootPrefixCls = getPrefixCls();
      const target = args.key || getKeyThenIncreaseKey();
      const closePromise = new Promise(resolve => {
        const callback = () => {
          if (typeof args.onClose === 'function') {
            args.onClose();
          }
          return resolve(true);
        };
        getRcNotificationInstance(
          {
            ...args,
            prefixCls: mergedPrefixCls,
            rootPrefixCls,
          },
          ({ prefixCls, instance }) => {
            innerInstance = instance;
            hookNotify(getRCNoticeProps({ ...args, key: target, onClose: callback }, prefixCls));
          },
        );
      });
      const result: any = () => {
        if (innerInstance) {
          innerInstance.removeNotice(target);
        }
      };
      result.then = (filled: ThenableArgument, rejected: ThenableArgument) =>
        closePromise.then(filled, rejected);
      result.promise = closePromise;
      return result;
    }

    // Fill functions
    const hookApiRef = React.useRef<any>({});

    hookApiRef.current.open = notify;

    ['success', 'info', 'warning', 'error', 'loading'].forEach(type =>
      attachTypeApi(hookApiRef.current, type),
    );

    return [
      hookApiRef.current,
      <ConfigConsumer key="holder">
        {(context: ConfigConsumerProps) => {
          ({ getPrefixCls } = context);
          return holder;
        }}
      </ConfigConsumer>,
    ];
  };

  return useMessage;
}
