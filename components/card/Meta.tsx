import * as React from 'react';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';

export type SemanticName = 'root' | 'section' | 'avatar' | 'title' | 'description';
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
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('cardMeta');

  const prefixCls = getPrefixCls('card', customizePrefixCls);
  const metaPrefixCls = `${prefixCls}-meta`;

  const rootClassNames = clsx(
    metaPrefixCls,
    className,
    contextClassName,
    contextClassNames.root,
    cardMetaClassNames?.root,
  );

  const rootStyles = {
    ...contextStyles.root,
    ...contextStyle,
    ...styles?.root,
    ...style,
  };

  const avatarClassNames = clsx(
    `${metaPrefixCls}-avatar`,
    contextClassNames.avatar,
    cardMetaClassNames?.avatar,
  );

  const avatarStyles = {
    ...contextStyles.avatar,
    ...styles?.avatar,
  };

  const titleClassNames = clsx(
    `${metaPrefixCls}-title`,
    contextClassNames.title,
    cardMetaClassNames?.title,
  );

  const titleStyles = {
    ...contextStyles.title,
    ...styles?.title,
  };

  const descriptionClassNames = clsx(
    `${metaPrefixCls}-description`,
    contextClassNames.description,
    cardMetaClassNames?.description,
  );

  const descriptionStyles = {
    ...contextStyles.description,
    ...styles?.description,
  };

  const sectionClassNames = clsx(
    `${metaPrefixCls}-section`,
    contextClassNames.section,
    cardMetaClassNames?.section,
  );

  const sectionStyles = {
    ...contextStyles.section,
    ...styles?.section,
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
      <div className={sectionClassNames} style={sectionStyles}>
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
