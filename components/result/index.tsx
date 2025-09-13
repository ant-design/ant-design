import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import WarningFilled from '@ant-design/icons/WarningFilled';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import noFound from './noFound';
import serverError from './serverError';
import useStyle from './style';
import unauthorized from './unauthorized';

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
  /** 图标区域的自定义类名 */
  iconClassName?: string;
  /** 图标区域的自定义样式 */
  iconStyle?: React.CSSProperties;
  /** 标题区域的自定义类名 */
  titleClassName?: string;
  /** 标题区域的自定义样式 */
  titleStyle?: React.CSSProperties;
  /** 副标题区域的自定义类名 */
  subTitleClassName?: string;
  /** 副标题区域的自定义样式 */
  subTitleStyle?: React.CSSProperties;
  /** 额外内容区域的自定义类名 */
  extraClassName?: string;
  /** 额外内容区域的自定义样式 */
  extraStyle?: React.CSSProperties;
  /** 内容区域的自定义类名 */
  contentClassName?: string;
  /** 内容区域的自定义样式 */
  contentStyle?: React.CSSProperties;
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
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ prefixCls, icon, status, iconClassName, iconStyle }) => {
  const className = classNames(`${prefixCls}-icon`, `${prefixCls}-icon-${status}`, iconClassName);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Result');

    warning(
      !(typeof icon === 'string' && icon.length > 2),
      'breaking',
      `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
    );
  }

  if (ExceptionStatus.includes(`${status}`)) {
    const SVGComponent = ExceptionMap[status as ExceptionStatusType];
    return (
      <div className={classNames(className, `${prefixCls}-image`)} style={iconStyle}>
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

  return (
    <div className={className} style={iconStyle}>
      {icon || iconNode}
    </div>
  );
};

interface ExtraProps {
  prefixCls: string;
  extra: React.ReactNode;
  extraClassName?: string;
  extraStyle?: React.CSSProperties;
}

const Extra: React.FC<ExtraProps> = ({ prefixCls, extra, extraClassName, extraStyle }) => {
  if (!extra) {
    return null;
  }
  const className = classNames(`${prefixCls}-extra`, extraClassName);
  return (
    <div className={className} style={extraStyle}>
      {extra}
    </div>
  );
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
  iconClassName,
  iconStyle,
  titleClassName,
  titleStyle,
  subTitleClassName,
  subTitleStyle,
  extraClassName,
  extraStyle,
  contentClassName,
  contentStyle,
}) => {
  const { getPrefixCls, direction, result } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('result', customizePrefixCls);

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const className = classNames(
    prefixCls,
    `${prefixCls}-${status}`,
    customizeClassName,
    result?.className,
    rootClassName,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...result?.style, ...style };

  return wrapCSSVar(
    <div className={className} style={mergedStyle}>
      <Icon
        prefixCls={prefixCls}
        status={status}
        icon={icon}
        iconClassName={iconClassName}
        iconStyle={iconStyle}
      />
      {title != null && (
        <div
          className={classNames(
            `${prefixCls}-title`,
            `${prefixCls}-title-${status}`,
            titleClassName,
          )}
          style={titleStyle}
        >
          {title}
        </div>
      )}
      {subTitle != null && (
        <div
          className={classNames(
            `${prefixCls}-subtitle`,
            `${prefixCls}-subtitle-${status}`,
            subTitleClassName,
          )}
          style={subTitleStyle}
        >
          {subTitle}
        </div>
      )}
      <Extra
        prefixCls={prefixCls}
        extra={extra}
        extraClassName={extraClassName}
        extraStyle={extraStyle}
      />
      {children && (
        <div
          className={classNames(
            `${prefixCls}-content`,
            `${prefixCls}-content-${status}`,
            contentClassName,
          )}
          style={contentStyle}
        >
          {children}
        </div>
      )}
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
