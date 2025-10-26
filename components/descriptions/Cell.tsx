import * as React from 'react';
import type { JSX } from 'react';
import { clsx } from 'clsx';

import type { DescriptionsClassNamesType, DescriptionsStylesType } from '.';
import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNames, SemanticStyles } from '../_util/hooks';
import isNonNullable from '../_util/isValidNode';
import DescriptionsContext from './DescriptionsContext';
import type { SemanticName } from './DescriptionsContext';

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
  classNames?: SemanticClassNames<SemanticName>;
  styles?: SemanticStyles<SemanticName>;
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

  const Component = component as keyof JSX.IntrinsicElements;
  const descContext = React.useContext(DescriptionsContext);
  const { classNames: contextClassNames, styles: contextStyles } = descContext;

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DescriptionsClassNamesType,
    DescriptionsStylesType,
    CellProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props,
  });

  if (bordered) {
    return (
      <Component
        className={clsx(
          {
            [`${itemPrefixCls}-item-label`]: type === 'label',
            [`${itemPrefixCls}-item-content`]: type === 'content',
          },
          type === 'label' && mergedClassNames.label,
          type === 'content' && mergedClassNames.content,
          className,
        )}
        style={style}
        colSpan={span}
      >
        {isNonNullable(label) && (
          <span style={{ ...labelStyle, ...mergedStyles.label }}>{label}</span>
        )}
        {isNonNullable(content) && (
          <span style={{ ...contentStyle, ...mergedStyles.content }}>{content}</span>
        )}
      </Component>
    );
  }

  return (
    <Component className={clsx(`${itemPrefixCls}-item`, className)} style={style} colSpan={span}>
      <div className={`${itemPrefixCls}-item-container`}>
        {(label || label === 0) && (
          <span
            className={clsx(`${itemPrefixCls}-item-label`, mergedClassNames.label, {
              [`${itemPrefixCls}-item-no-colon`]: !colon,
            })}
            style={{ ...labelStyle, ...mergedStyles.label }}
          >
            {label}
          </span>
        )}
        {(content || content === 0) && (
          <span
            className={clsx(`${itemPrefixCls}-item-content`, mergedClassNames.content)}
            style={{ ...contentStyle, ...mergedStyles.content }}
          >
            {content}
          </span>
        )}
      </div>
    </Component>
  );
};

export default Cell;
