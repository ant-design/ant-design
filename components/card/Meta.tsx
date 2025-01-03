import * as React from 'react';
import classNames from 'classnames';

import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';

export type SemanticName = 'root' | 'detail' | 'avatar' | 'title' | 'description';
export interface CardMetaProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

const Meta: React.FC<CardMetaProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    avatar,
    title,
    description,
    style,
    classNames: cardMetaClassNames,
    styles,
    ...restProps
  } = props;

  const { getPrefixCls, cardMeta } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const metaPrefixCls = `${prefixCls}-meta`;

  const rootClassNames = classNames(
    metaPrefixCls,
    className,
    cardMeta?.className,
    cardMeta?.classNames?.root,
    cardMetaClassNames?.root,
  );

  const rootStyles = {
    ...cardMeta?.styles?.root,
    ...cardMeta?.style,
    ...styles?.root,
    ...style,
  };

  const avatarClassNames = classNames(
    `${metaPrefixCls}-avatar`,
    cardMeta?.classNames?.avatar,
    cardMetaClassNames?.avatar,
  );

  const avatarStyles = {
    ...cardMeta?.styles?.avatar,
    ...styles?.avatar,
  };

  const titleClassNames = classNames(
    `${metaPrefixCls}-title`,
    cardMeta?.classNames?.title,
    cardMetaClassNames?.title,
  );

  const titleStyles = {
    ...cardMeta?.styles?.title,
    ...styles?.title,
  };

  const descriptionClassNames = classNames(
    `${metaPrefixCls}-description`,
    cardMeta?.classNames?.description,
    cardMetaClassNames?.description,
  );

  const descriptionStyles = {
    ...cardMeta?.styles?.description,
    ...styles?.description,
  };

  const detailClassNames = classNames(
    `${metaPrefixCls}-detail`,
    cardMeta?.classNames?.detail,
    cardMetaClassNames?.detail,
  );

  const detailStyles = {
    ...cardMeta?.styles?.detail,
    ...styles?.detail,
  };

  const avatarDom: React.ReactNode = avatar ? (
    <div className={avatarClassNames} style={avatarStyles}>
      {avatar}
    </div>
  ) : null;

  const titleDom: React.ReactNode = title ? (
    <div className={titleClassNames} style={titleStyles}>
      {title}
    </div>
  ) : null;

  const descriptionDom: React.ReactNode = description ? (
    <div className={descriptionClassNames} style={descriptionStyles}>
      {description}
    </div>
  ) : null;

  const MetaDetail: React.ReactNode =
    titleDom || descriptionDom ? (
      <div className={detailClassNames} style={detailStyles}>
        {titleDom}
        {descriptionDom}
      </div>
    ) : null;

  return (
    <div {...restProps} className={rootClassNames} style={rootStyles}>
      {avatarDom}
      {MetaDetail}
    </div>
  );
};

export default Meta;
