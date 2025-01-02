import * as React from 'react';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import { useLocale } from '../locale';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
import useStyle from './style';

const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;

export interface TransferLocale {
  description: string;
}

export type SemanticName = 'root' | 'icon' | 'description' | 'footer';
export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  /** @deprecated Please use `styles={{ icon: {} }}` instead */
  imageStyle?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
}

type CompoundedComponent = React.FC<EmptyProps> & {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
};

const Empty: CompoundedComponent = (props) => {
  const {
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    image = defaultEmptyImg,
    description,
    children,
    imageStyle,
    style,
    classNames: emptyClassNames,
    styles,
    ...restProps
  } = props;
  const { getPrefixCls, direction, empty } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('empty', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const [locale] = useLocale('Empty');

  const des = typeof description !== 'undefined' ? description : locale?.description;
  const alt = typeof des === 'string' ? des : 'empty';

  let imageNode: React.ReactNode = null;

  if (typeof image === 'string') {
    imageNode = <img alt={alt} src={image} />;
  } else {
    imageNode = image;
  }

  // ============================= Warning ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Empty');

    [['imageStyle', 'styles: { icon: {} }']].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  return wrapCSSVar(
    <div
      className={classNames(
        hashId,
        cssVarCls,
        prefixCls,
        empty?.className,
        {
          [`${prefixCls}-normal`]: image === simpleEmptyImg,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
        rootClassName,
        empty?.classNames?.root,
        emptyClassNames?.root,
      )}
      style={{ ...empty?.styles?.root, ...empty?.style, ...styles?.root, ...style }}
      {...restProps}
    >
      <div
        className={classNames(`${prefixCls}-icon`, empty?.classNames?.icon, emptyClassNames?.icon)}
        style={{ ...imageStyle, ...empty?.styles?.icon, ...styles?.icon }}
      >
        {imageNode}
      </div>
      {des && (
        <div
          className={classNames(
            `${prefixCls}-description`,
            empty?.classNames?.description,
            emptyClassNames?.description,
          )}
          style={{ ...empty?.styles?.description, ...styles?.description }}
        >
          {des}
        </div>
      )}
      {children && (
        <div
          className={classNames(
            `${prefixCls}-footer`,
            empty?.classNames?.footer,
            emptyClassNames?.footer,
          )}
          style={{
            ...empty?.styles?.footer,
            ...styles?.footer,
          }}
        >
          {children}
        </div>
      )}
    </div>,
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

if (process.env.NODE_ENV !== 'production') {
  Empty.displayName = 'Empty';
}

export default Empty;
