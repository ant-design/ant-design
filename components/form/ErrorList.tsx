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

const EMPTY_LIST: React.ReactNode[] = [];

const IconMap: Partial<Record<ValidateStatus, React.ComponentType>> = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

function getStatusIcon(prefixCls: string, status?: ValidateStatus) {
  const Component = IconMap[status!];
  return Component ? (
    <span className={`${prefixCls}-icon`}>
      <Component />
    </span>
  ) : null;
}

export interface ErrorListProps {
  errors?: React.ReactNode[];
  /** @private Internal usage. Do not use in your production */
  help?: React.ReactNode;
  /** @private Internal usage. Do not use in your production */
  onDomErrorVisibleChange?: (visible: boolean) => void;
}

export default function ErrorList({
  errors = EMPTY_LIST,
  help,
  onDomErrorVisibleChange,
}: ErrorListProps) {
  const forceUpdate = useForceUpdate();
  const { prefixCls, validateStatus } = React.useContext(FormItemPrefixContext);

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
    !!help,
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
              const icon = getStatusIcon(baseClassName, validateStatus);

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
