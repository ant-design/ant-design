import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import { Notice } from 'rc-notification';
import type { NoticeProps } from 'rc-notification/lib/Notice';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { NoticeType } from './interface';
import useStyle from './style';

export const TypeIcon = {
  info: <InfoCircleFilled />,
  success: <CheckCircleFilled />,
  error: <CloseCircleFilled />,
  warning: <ExclamationCircleFilled />,
  loading: <LoadingOutlined />,
};

export interface PureContentProps {
  prefixCls: string;
  type?: NoticeType;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const PureContent: React.FC<PureContentProps> = ({ prefixCls, type, icon, children }) => (
  <div className={classNames(`${prefixCls}-custom-content`, `${prefixCls}-${type}`)}>
    {icon || TypeIcon[type!]}
    <span>{children}</span>
  </div>
);

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
    Omit<PureContentProps, 'prefixCls' | 'children'> {
  prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
  const { prefixCls: staticPrefixCls, className, type, icon, content, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('message');

  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  return wrapCSSVar(
    <Notice
      {...restProps}
      prefixCls={prefixCls}
      className={classNames(
        className,
        hashId,
        `${prefixCls}-notice-pure-panel`,
        cssVarCls,
        rootCls,
      )}
      eventKey="pure"
      duration={null}
      content={
        <PureContent prefixCls={prefixCls} type={type} icon={icon}>
          {content}
        </PureContent>
      }
    />,
  );
};

export default PurePanel;
