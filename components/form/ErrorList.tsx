import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CSSMotion from 'rc-motion';
import useMemo from 'rc-util/lib/hooks/useMemo';
import useCacheErrors from './hooks/useCacheErrors';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { FormItemPrefixContext } from './context';
import { ValidateStatus } from './FormItem';

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
  feedback,
  feedbackIcon,
  onDomErrorVisibleChange,
}: ErrorListProps) {
  const forceUpdate = useForceUpdate();
  const {
    prefixCls,
    validateStatus,
    feedbackIcon: contextFeedbackIcon,
    compatibleIconType,
  } = React.useContext(FormItemPrefixContext);

  const mergedFeedbackIcon = feedbackIcon || contextFeedbackIcon;

  const [visible, cacheErrors] = useCacheErrors(
    errors,
    changedVisible => {
      if (changedVisible) {
        /**
         * We trigger in sync to avoid dom shaking but this get warning in react 16.13.
         * So use Promise to keep in micro async to handle this.
         * https://github.com/ant-design/ant-design/issues/21698#issuecomment-593743485
         */
        Promise.resolve().then(() => {
          onDomErrorVisibleChange?.(true);
        });
      }
      forceUpdate();
    },
    !!feedback,
  );

  const memoErrors = useMemo(
    () => cacheErrors,
    visible,
    (_, nextVisible) => nextVisible,
  );

  // Memo validateStatus in same visible
  const [innerStatus, setInnerStatus] = React.useState(validateStatus);
  React.useEffect(() => {
    if (visible && validateStatus) {
      setInnerStatus(validateStatus);
    }
  }, [visible, validateStatus]);

  const baseClassName = `${prefixCls}-item-explain`;

  return (
    <CSSMotion
      motionDeadline={500}
      visible={visible}
      motionName="show-help"
      onLeaveEnd={() => {
        onDomErrorVisibleChange?.(false);
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
                [`${baseClassName}-${innerStatus}`]: innerStatus,
              },
              motionClassName,
            )}
            key="help"
          >
            {memoErrors.map((error, index) => {
              const icon =
                compatibleIconType === true &&
                getStatusIcon(`${baseClassName}-icon`, validateStatus, mergedFeedbackIcon);

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
