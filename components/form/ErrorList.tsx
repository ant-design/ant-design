import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CSSMotion from 'rc-motion';
import { FormItemPrefixContext } from './context';
import { ValidateStatus } from './FormItem';
import useStatusFeedback from './hooks/useStatusFeedback';
import useIsomorphicEffect from '../_util/hooks/useIsomorphicEffect';

export type FeedbackIconType = React.ReactNode | ((status: ValidateStatus) => React.ReactNode);

const EMPTY_LIST: React.ReactNode[] = [];

const IconMap: Partial<Record<ValidateStatus, React.ComponentType>> = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

export function getStatusIcon(
  className: string,
  status: ValidateStatus | undefined,
  feedbackIcon?: FeedbackIconType,
) {
  let iconNode: React.ReactNode;
  if (typeof feedbackIcon === 'function') {
    iconNode = feedbackIcon(status!);
  } else if (feedbackIcon) {
    iconNode = feedbackIcon;
  } else {
    const Component = IconMap[status!];
    iconNode = Component ? <Component /> : null;
  }

  return iconNode && <span className={className}>{iconNode}</span>;
}

export interface ErrorListProps {
  errors?: React.ReactNode[];
  /** @private Internal usage. Do not use in your production */
  feedback?: React.ReactNode;
  feedbackIcon?: FeedbackIconType;
  /** @private Internal usage. Do not use in your production */
  onDomErrorVisibleChange?: (visible: boolean) => void;
}

export default function ErrorList({
  errors = EMPTY_LIST,
  // feedback,
  feedbackIcon,
  onDomErrorVisibleChange,
}: ErrorListProps) {
  // const forceUpdate = useForceUpdate();
  const {
    prefixCls,
    validateStatus,
    feedbackIcon: contextFeedbackIcon,
    compatibleIconType,
  } = React.useContext(FormItemPrefixContext);

  const mergedFeedbackIcon = feedbackIcon || contextFeedbackIcon;

  const [feedbackVisible, feedbackList, feedbackStatus] = useStatusFeedback(errors, validateStatus);

  useIsomorphicEffect(() => {
    if (feedbackVisible) {
      onDomErrorVisibleChange?.(true);
    }
  }, [feedbackVisible]);

  const baseClassName = `${prefixCls}-item-explain`;

  return (
    <CSSMotion
      motionDeadline={500}
      visible={feedbackVisible}
      motionName="show-help"
      onLeaveEnd={() => {
        if (!feedbackVisible) {
          onDomErrorVisibleChange?.(false);
        }
      }}
      motionAppear
      removeOnLeave
    >
      {({ className: motionClassName }: { className: string }) => {
        return (
          <div
            className={classNames(
              baseClassName,
              {
                [`${baseClassName}-${feedbackStatus}`]: feedbackStatus,
              },
              motionClassName,
            )}
            key="help"
          >
            {feedbackList.map((error, index) => {
              const icon =
                compatibleIconType === true &&
                getStatusIcon(`${baseClassName}-icon`, feedbackStatus, mergedFeedbackIcon);

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} role="alert">
                  {icon}
                  {error}
                </div>
              );
            })}
          </div>
        );
      }}
    </CSSMotion>
  );
}
