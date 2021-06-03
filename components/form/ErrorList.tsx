import * as React from 'react';
import classNames from 'classnames';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import useMemo from 'rc-util/lib/hooks/useMemo';
import useCacheErrors from './hooks/useCacheErrors';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { FormItemPrefixContext } from './context';
import { ConfigContext } from '../config-provider';
import { ValidateStatus } from './FormItem';
import collapseMotion from '../_util/motion';

const EMPTY_LIST: React.ReactNode[] = [];

interface ErrorEntity {
  error: React.ReactNode;
  errorStatus?: ValidateStatus;
  key: string;
}

function toErrorEntity(
  error: React.ReactNode,
  errorStatus: ValidateStatus | undefined,
  prefix: string,
  index: number = 0,
): ErrorEntity {
  return {
    key: typeof error === 'string' ? error : `${prefix}-${index}`,
    error,
    errorStatus,
  };
}

export interface ErrorListProps {
  help?: React.ReactNode;
  helpStatus?: ValidateStatus;
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
}

export default function ErrorList({
  help,
  helpStatus,
  errors = EMPTY_LIST,
  warnings = EMPTY_LIST,
}: ErrorListProps) {
  const { prefixCls } = React.useContext(FormItemPrefixContext);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const baseClassName = `${prefixCls}-item-explain`;
  const rootPrefixCls = getPrefixCls();

  const fullKeyList = React.useMemo(() => {
    if (help) {
      return [toErrorEntity(help, helpStatus, 'help')];
    }

    return [
      ...errors.map((error, index) => toErrorEntity(error, 'error', 'error', index)),
      ...warnings.map((warning, index) => toErrorEntity(warning, 'warning', 'warning', index)),
    ];
  }, [help, helpStatus, errors, warnings]);

  return (
    <CSSMotionList
      keys={fullKeyList}
      visible={!!fullKeyList.length}
      {...collapseMotion}
      motionName={`${rootPrefixCls}-show-help`}
      className={baseClassName}
      removeOnLeave
    >
      {itemProps => {
        const { key, error, errorStatus, className, style } = itemProps;

        return (
          <div
            key={key}
            role="alert"
            className={classNames(className, {
              [`${baseClassName}-${errorStatus}`]: errorStatus,
            })}
            style={style}
          >
            {error}
          </div>
        );
      }}
    </CSSMotionList>
  );
}
