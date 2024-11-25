import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import type { CSSMotionProps } from 'rc-motion';
import CSSMotion, { CSSMotionList } from 'rc-motion';

import initCollapseMotion from '../_util/motion';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { FormItemPrefixContext } from './context';
import type { ValidateStatus } from './FormItem';
import useDebounce from './hooks/useDebounce';
import useStyle from './style';

const EMPTY_LIST: React.ReactNode[] = [];

interface ErrorEntity {
  error: React.ReactNode;
  errorStatus?: ValidateStatus;
  key: string;
}

function toErrorEntity(
  error: React.ReactNode,
  prefix: string,
  errorStatus?: ValidateStatus,
  index = 0,
): ErrorEntity {
  return {
    key: typeof error === 'string' ? error : `${prefix}-${index}`,
    error,
    errorStatus,
  };
}

export interface ErrorListProps {
  fieldId?: string;
  help?: React.ReactNode;
  helpStatus?: ValidateStatus;
  errors?: React.ReactNode[];
  warnings?: React.ReactNode[];
  className?: string;
  onVisibleChanged?: (visible: boolean) => void;
}

const ErrorList: React.FC<ErrorListProps> = ({
  help,
  helpStatus,
  errors = EMPTY_LIST,
  warnings = EMPTY_LIST,
  className: rootClassName,
  fieldId,
  onVisibleChanged,
}) => {
  const { prefixCls } = React.useContext(FormItemPrefixContext);

  const baseClassName = `${prefixCls}-item-explain`;

  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const collapseMotion: CSSMotionProps = useMemo(() => initCollapseMotion(prefixCls), [prefixCls]);

  // We have to debounce here again since somewhere use ErrorList directly still need no shaking
  // ref: https://github.com/ant-design/ant-design/issues/36336
  const debounceErrors = useDebounce(errors);
  const debounceWarnings = useDebounce(warnings);

  const fullKeyList = React.useMemo<ErrorEntity[]>(() => {
    if (help !== undefined && help !== null) {
      return [toErrorEntity(help, 'help', helpStatus)];
    }

    return [
      ...debounceErrors.map((error, index) => toErrorEntity(error, 'error', 'error', index)),
      ...debounceWarnings.map((warning, index) =>
        toErrorEntity(warning, 'warning', 'warning', index),
      ),
    ];
  }, [help, helpStatus, debounceErrors, debounceWarnings]);

  const filledKeyFullKeyList = React.useMemo<ErrorEntity[]>(() => {
    const keysCount: Record<string, number> = {};
    fullKeyList.forEach(({ key }) => {
      keysCount[key] = (keysCount[key] || 0) + 1;
    });
    return fullKeyList.map((entity, index) => ({
      ...entity,
      key: keysCount[entity.key] > 1 ? `${entity.key}-fallback-${index}` : entity.key,
    }));
  }, [fullKeyList]);

  const helpProps: { id?: string } = {};

  if (fieldId) {
    helpProps.id = `${fieldId}_help`;
  }

  return wrapCSSVar(
    <CSSMotion
      motionDeadline={collapseMotion.motionDeadline}
      motionName={`${prefixCls}-show-help`}
      visible={!!filledKeyFullKeyList.length}
      onVisibleChanged={onVisibleChanged}
    >
      {(holderProps) => {
        const { className: holderClassName, style: holderStyle } = holderProps;

        return (
          <div
            {...helpProps}
            className={classNames(
              baseClassName,
              holderClassName,
              cssVarCls,
              rootCls,
              rootClassName,
              hashId,
            )}
            style={holderStyle}
            role="alert"
          >
            <CSSMotionList
              keys={filledKeyFullKeyList}
              {...initCollapseMotion(prefixCls)}
              motionName={`${prefixCls}-show-help-item`}
              component={false}
            >
              {(itemProps) => {
                const {
                  key,
                  error,
                  errorStatus,
                  className: itemClassName,
                  style: itemStyle,
                } = itemProps;

                return (
                  <div
                    key={key}
                    className={classNames(itemClassName, {
                      [`${baseClassName}-${errorStatus}`]: errorStatus,
                    })}
                    style={itemStyle}
                  >
                    {error}
                  </div>
                );
              }}
            </CSSMotionList>
          </div>
        );
      }}
    </CSSMotion>,
  );
};

export default ErrorList;
