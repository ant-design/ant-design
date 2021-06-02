import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMemo from 'rc-util/lib/hooks/useMemo';
import useCacheErrors from './hooks/useCacheErrors';
import useForceUpdate from '../_util/hooks/useForceUpdate';
import { FormItemPrefixContext } from './context';
import { ConfigContext } from '../config-provider';
import { ValidateStatus } from './FormItem';
import collapseMotion from '../_util/motion';

const EMPTY_LIST: React.ReactNode[] = [];

// ============================================================
// =                       Error Group                        =
// ============================================================
interface ErrorGroupProps {
  prefixCls: string;
  rootPrefixCls: string;
  errors?: React.ReactNode[];
  status: ValidateStatus;
}

function ErrorGroup({ errors = EMPTY_LIST, rootPrefixCls, prefixCls, status }: ErrorGroupProps) {
  const cacheErrorsRef = React.useRef(errors);
  if (errors.length) {
    cacheErrorsRef.current = errors;
  }

  return (
    <CSSMotion
      visible={!!errors.length}
      {...collapseMotion}
      motionName={`${rootPrefixCls}-show-help`}
      removeOnLeave
    >
      {({ className: motionClassName, style }, ref) => (
        <div
          ref={ref}
          className={classNames(
            prefixCls,
            {
              [`${prefixCls}-${status}`]: status,
            },
            motionClassName,
          )}
          style={style}
          key="help"
        >
          {cacheErrorsRef.current.map((error, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} role="alert">
              {error}
            </div>
          ))}
        </div>
      )}
    </CSSMotion>
  );
}

// ============================================================
// =                        Error List                        =
// ============================================================
export interface ErrorListProps {
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
}

export default function ErrorList({ errors, warnings }: ErrorListProps) {
  const { prefixCls } = React.useContext(FormItemPrefixContext);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const baseClassName = `${prefixCls}-item-explain`;
  const rootPrefixCls = getPrefixCls();

  return (
    <div className={`${baseClassName}-holder`}>
      <ErrorGroup
        prefixCls={baseClassName}
        rootPrefixCls={rootPrefixCls}
        errors={errors}
        status="error"
      />
      <ErrorGroup
        prefixCls={baseClassName}
        rootPrefixCls={rootPrefixCls}
        errors={warnings}
        status="warning"
      />
    </div>
  );
}
