import * as React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import { Notice } from 'rc-notification';
import classNames from 'classnames';
import type { NoticeProps } from 'rc-notification/lib/Notice';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import type { NoticeType } from './interface';

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

export function PureContent({ prefixCls, type, icon, children }: PureContentProps) {
  return (
    <div className={classNames(`${prefixCls}-custom-content`, `${prefixCls}-${type}`)}>
      {icon || TypeIcon[type!]}
      <span>{children}</span>
    </div>
  );
}

export interface PurePanelProps
  extends Omit<NoticeProps, 'prefixCls' | 'eventKey'>,
    Omit<PureContentProps, 'prefixCls' | 'children'> {
  prefixCls?: string;
}

/** @private Internal Component. Do not use in your production. */
export default function PurePanel(props: PurePanelProps) {
  const { prefixCls: staticPrefixCls, className, type, icon, content, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = staticPrefixCls || getPrefixCls('message');

  const [, hashId] = useStyle(prefixCls);

  return (
    <Notice
      {...restProps}
      prefixCls={prefixCls}
      className={classNames(className, hashId, `${prefixCls}-notice-pure-panel`)}
      eventKey="pure"
      duration={null}
      content={
        <PureContent prefixCls={prefixCls} type={type} icon={icon}>
          {content}
        </PureContent>
      }
    />
  );
}
