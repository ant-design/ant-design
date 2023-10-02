import classNames from 'classnames';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';

export interface CardMetaProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const Meta: React.FC<CardMetaProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, avatar, title, description, ...others } = props;

  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('card', customizePrefixCls);

  const classString = classNames(`${prefixCls}-meta`, className);

  const avatarDom: React.ReactNode = avatar ? (
    <div className={`${prefixCls}-meta-avatar`}>{avatar}</div>
  ) : null;

  const titleDom: React.ReactNode = title ? (
    <div className={`${prefixCls}-meta-title`}>{title}</div>
  ) : null;

  const descriptionDom: React.ReactNode = description ? (
    <div className={`${prefixCls}-meta-description`}>{description}</div>
  ) : null;

  const MetaDetail: React.ReactNode =
    titleDom || descriptionDom ? (
      <div className={`${prefixCls}-meta-detail`}>
        {titleDom}
        {descriptionDom}
      </div>
    ) : null;

  return (
    <div {...others} className={classString}>
      {avatarDom}
      {MetaDetail}
    </div>
  );
};

export default Meta;
