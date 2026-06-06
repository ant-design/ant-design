import React from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import { isReactRenderable } from '../_util/is';
import type { CellSemanticType } from './DescriptionsContext';
import DescriptionsContext from './DescriptionsContext';

export interface CellProps {
  itemPrefixCls: string;
  span: number;
  className?: string;
  component: string;
  style?: React.CSSProperties;
  /** @deprecated Please use `styles.label` instead */
  labelStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.content` instead */
  contentStyle?: React.CSSProperties;
  classNames?: CellSemanticType['classNames'];
  styles?: CellSemanticType['styles'];
  bordered?: boolean;
  label?: React.ReactNode;
  content?: React.ReactNode;
  colon?: boolean;
  type?: 'label' | 'content' | 'item';
}

const Cell: React.FC<CellProps> = (props) => {
  const {
    itemPrefixCls,
    component,
    span,
    className,
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon,
    type,
    styles,
    classNames,
  } = props;

  const Component = component as keyof React.JSX.IntrinsicElements;

  const { classNames: contextClassNames, styles: contextStyles } =
    React.useContext(DescriptionsContext);

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props,
    },
  );

  const mergedLabelStyle: React.CSSProperties = { ...labelStyle, ...mergedStyles.label };
  const mergedContentStyle: React.CSSProperties = { ...contentStyle, ...mergedStyles.content };

  if (bordered) {
    // The cell element (<th>/<td>) carries the `ant-descriptions-item-label`
    // or `ant-descriptions-item-content` class, so the user-facing
    // `labelStyle` / `contentStyle` (and the semantic `styles.label` /
    // `styles.content`) must be applied to that cell rather than to the
    // inner <span> wrapper. The non-bordered branch already applies the
    // styles to the element carrying the class.
    const typeStyle =
      type === 'label' ? mergedLabelStyle : type === 'content' ? mergedContentStyle : undefined;
    // typeStyle (merged label/content style) wins over the caller-provided
    // item `style` so that the merge order matches the horizontal-bordered
    // path established in Row.tsx, where styles.label / labelStyle override
    // a generic item.style on conflict.
    const mergedCellStyle: React.CSSProperties | undefined = typeStyle
      ? { ...style, ...typeStyle }
      : style;

    return (
      <Component
        colSpan={span}
        style={mergedCellStyle}
        className={clsx(className, {
          [`${itemPrefixCls}-item-${type}`]: type === 'label' || type === 'content',
          [mergedClassNames.label!]: mergedClassNames.label && type === 'label',
          [mergedClassNames.content!]: mergedClassNames.content && type === 'content',
        })}
      >
        {isReactRenderable(label) && <span>{label}</span>}
        {isReactRenderable(content) && <span>{content}</span>}
      </Component>
    );
  }

  return (
    <Component className={clsx(`${itemPrefixCls}-item`, className)} style={style} colSpan={span}>
      <div className={`${itemPrefixCls}-item-container`}>
        {isReactRenderable(label) && (
          <span
            style={mergedLabelStyle}
            className={clsx(`${itemPrefixCls}-item-label`, mergedClassNames.label, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
          >
            {label}
          </span>
        )}
        {isReactRenderable(content) && (
          <span
            style={mergedContentStyle}
            className={clsx(`${itemPrefixCls}-item-content`, mergedClassNames.content)}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
