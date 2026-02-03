import * as React from 'react';
import { clsx } from 'clsx';

import type { SemanticType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import { useComponentConfig } from '../config-provider/context';

export type CardMetaSemanticType = {
  classNames?: {
    root?: string;
    section?: string;
    avatar?: string;
    title?: string;
    description?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    section?: React.CSSProperties;
    avatar?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
  };
};

export type CardMetaClassNamesType = SemanticType<
  CardMetaProps,
  CardMetaSemanticType['classNames']
>;

export type CardMetaStylesType = SemanticType<CardMetaProps, CardMetaSemanticType['styles']>;

export interface CardMetaProps {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  avatar?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  classNames?: CardMetaClassNamesType;
  styles?: CardMetaStylesType;
}

const CardMeta: React.FC<CardMetaProps> = (props) => {
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

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('cardMeta');

  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const metaPrefixCls = `${prefixCls}-meta`;

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, cardMetaClassNames],
    [contextStyles, styles],
    {
      props,
    },
  );

  const rootClassNames = clsx(metaPrefixCls, className, contextClassName, mergedClassNames.root);

  const rootStyles: React.CSSProperties = {
    ...contextStyle,
    ...mergedStyles.root,
    ...style,
  };

  const avatarClassNames = clsx(`${metaPrefixCls}-avatar`, mergedClassNames.avatar);

  const titleClassNames = clsx(`${metaPrefixCls}-title`, mergedClassNames.title);

  const descriptionClassNames = clsx(`${metaPrefixCls}-description`, mergedClassNames.description);

  const sectionClassNames = clsx(`${metaPrefixCls}-section`, mergedClassNames.section);

  const avatarDom: React.ReactNode = avatar ? (
    <div className={avatarClassNames} style={mergedStyles.avatar}>
      {avatar}
    </div>
  ) : null;

  const titleDom: React.ReactNode = title ? (
    <div className={titleClassNames} style={mergedStyles.title}>
      {title}
    </div>
  ) : null;

  const descriptionDom: React.ReactNode = description ? (
    <div className={descriptionClassNames} style={mergedStyles.description}>
      {description}
    </div>
  ) : null;

  const MetaDetail: React.ReactNode =
    titleDom || descriptionDom ? (
      <div className={sectionClassNames} style={mergedStyles.section}>
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

if (process.env.NODE_ENV !== 'production') {
  CardMeta.displayName = 'CardMeta';
}

export default CardMeta;
