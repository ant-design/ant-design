import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import WarningFilled from '@ant-design/icons/WarningFilled';
import classNames from 'classnames';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

import noFound from './noFound';
import serverError from './serverError';
import unauthorized from './unauthorized';

import useStyle from './style';

export const IconMap = {
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  info: ExclamationCircleFilled,
  warning: WarningFilled,
};

export const ExceptionMap = {
  '404': noFound,
  '500': serverError,
  '403': unauthorized,
};

export type ExceptionStatusType = 403 | 404 | 500 | '403' | '404' | '500';
export type ResultStatusType = ExceptionStatusType | keyof typeof IconMap;

export interface ResultProps {
  icon?: React.ReactNode;
  status?: ResultStatusType;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ExceptionImageMap keys
const ExceptionStatus = Object.keys(ExceptionMap);

/**
 * Render icon if ExceptionStatus includes ,render svg image else render iconNode
 *
 * @param prefixCls
 * @param {status, icon}
 */

interface IconProps {
  prefixCls: string;
  icon: React.ReactNode;
  status: ResultStatusType;
}

const Icon: React.FC<IconProps> = ({ prefixCls, icon, status }) => {
  const className = classNames(`${prefixCls}-icon`);

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Result',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
  );

  if (ExceptionStatus.includes(`${status}`)) {
    const SVGComponent = ExceptionMap[status as ExceptionStatusType];
    return (
      <div className={`${className} ${prefixCls}-image`}>
        <SVGComponent />
      </div>
    );
  }

  const iconNode = React.createElement(
    IconMap[status as Exclude<ResultStatusType, ExceptionStatusType>],
  );

  if (icon === null || icon === false) {
    return null;
  }

  return <div className={className}>{icon || iconNode}</div>;
};

interface ExtraProps {
  prefixCls: string;
  extra: React.ReactNode;
}

const Extra: React.FC<ExtraProps> = ({ prefixCls, extra }) => {
  if (!extra) {
    return null;
  }
  return <div className={`${prefixCls}-extra`}>{extra}</div>;
};

export interface ResultType extends React.FC<ResultProps> {
  PRESENTED_IMAGE_404: React.FC;
  PRESENTED_IMAGE_403: React.FC;
  PRESENTED_IMAGE_500: React.FC;
}

const Result: ResultType = ({
  prefixCls: customizePrefixCls,
  className: customizeClassName,
  rootClassName,
  subTitle,
  title,
  style,
  children,
  status = 'info',
  icon,
  extra,
}) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('result', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const className = classNames(
    prefixCls,
    `${prefixCls}-${status}`,
    customizeClassName,
    rootClassName,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
    hashId,
  );

  return wrapSSR(
    <div className={className} style={style}>
      <Icon prefixCls={prefixCls} status={status} icon={icon} />
      <div className={`${prefixCls}-title`}>{title}</div>
      {subTitle && <div className={`${prefixCls}-subtitle`}>{subTitle}</div>}
      <Extra prefixCls={prefixCls} extra={extra} />
      {children && <div className={`${prefixCls}-content`}>{children}</div>}
    </div>,
  );
};

Result.PRESENTED_IMAGE_403 = ExceptionMap['403'];
Result.PRESENTED_IMAGE_404 = ExceptionMap['404'];
Result.PRESENTED_IMAGE_500 = ExceptionMap['500'];

if (process.env.NODE_ENV !== 'production') {
  Result.displayName = 'Result';
}

export default Result;
