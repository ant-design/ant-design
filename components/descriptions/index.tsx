/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import type { Breakpoint } from '../_util/responsiveObserver';
import { matchScreen } from '../_util/responsiveObserver';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import DEFAULT_COLUMN_MAP from './constant';
import DescriptionsContext from './DescriptionsContext';
import useItems from './hooks/useItems';
import useRow from './hooks/useRow';
import type { DescriptionsItemProps } from './Item';
import DescriptionsItem from './Item';
import Row from './Row';
import useStyle from './style';

interface CompoundedComponent {
  Item: typeof DescriptionsItem;
}

export interface InternalDescriptionsItemType extends Omit<DescriptionsItemProps, 'span'> {
  key?: React.Key;
  filled?: boolean;
  span?: number;
}

export interface DescriptionsItemType extends Omit<DescriptionsItemProps, 'prefixCls'> {
  key?: React.Key;
}

type SemanticName = 'root' | 'header' | 'title' | 'extra' | 'label' | 'content';
export type DescriptionsClassNamesType = SemanticClassNamesType<DescriptionsProps, SemanticName>;
export type DescriptionsStylesType = SemanticStylesType<DescriptionsProps, SemanticName>;

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  size?: 'middle' | 'small' | 'default';
  /**
   * @deprecated use `items` instead
   */
  children?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  column?: number | Partial<Record<Breakpoint, number>>;
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  styles?: DescriptionsStylesType;
  classNames?: DescriptionsClassNamesType;
  items?: DescriptionsItemType[];
  id?: string;
}

const Descriptions: React.FC<DescriptionsProps> & CompoundedComponent = (props) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    extra,
    column,
    colon = true,
    bordered,
    layout,
    children,
    className,
    rootClassName,
    style,
    size: customizeSize,
    labelStyle,
    contentStyle,
    styles,
    items,
    classNames: descriptionsClassNames,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('descriptions');
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);
  const screens = useBreakpoint();

  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Descriptions');
    [
      ['labelStyle', 'styles.label'],
      ['contentStyle', 'styles.content'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }
  // Column count
  const mergedColumn = React.useMemo(() => {
    if (typeof column === 'number') {
      return column;
    }

    return (
      matchScreen(screens, {
        ...DEFAULT_COLUMN_MAP,
        ...column,
      }) ?? 3
    );
  }, [screens, column]);

  // Items with responsive
  const mergedItems = useItems(screens, items, children);

  const mergedSize = useSize(customizeSize);
  const rows = useRow(mergedColumn, mergedItems);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  // =========== Merged Props for Semantic ==========
  const mergedProps: DescriptionsProps = {
    ...props,
    column: mergedColumn,
    items: mergedItems,
    size: mergedSize,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DescriptionsClassNamesType,
    DescriptionsStylesType,
    DescriptionsProps
  >([contextClassNames, descriptionsClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  // ======================== Render ========================
  const contextValue = React.useMemo(
    () => ({
      labelStyle,
      contentStyle,
      styles: {
        content: mergedStyles.content,
        label: mergedStyles.label,
      },
      classNames: {
        label: classNames(mergedClassNames.label),
        content: classNames(mergedClassNames.content),
      },
    }),
    [labelStyle, contentStyle, mergedStyles, mergedClassNames],
  );

  return (
    <DescriptionsContext.Provider value={contextValue}>
      <div
        className={classNames(
          prefixCls,
          contextClassName,
          mergedClassNames.root,
          {
            [`${prefixCls}-${mergedSize}`]: mergedSize && mergedSize !== 'default',
            [`${prefixCls}-bordered`]: !!bordered,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className,
          rootClassName,
          hashId,
          cssVarCls,
        )}
        style={{ ...contextStyle, ...mergedStyles.root, ...style }}
        {...restProps}
      >
        {(title || extra) && (
          <div
            className={classNames(`${prefixCls}-header`, mergedClassNames.header)}
            style={mergedStyles.header}
          >
            {title && (
              <div
                className={classNames(`${prefixCls}-title`, mergedClassNames.title)}
                style={mergedStyles.title}
              >
                {title}
              </div>
            )}
            {extra && (
              <div
                className={classNames(`${prefixCls}-extra`, mergedClassNames.extra)}
                style={mergedStyles.extra}
              >
                {extra}
              </div>
            )}
          </div>
        )}

        <div className={`${prefixCls}-view`}>
          <table>
            <tbody>
              {rows.map((row, index) => (
                <Row
                  key={index}
                  index={index}
                  colon={colon}
                  prefixCls={prefixCls}
                  vertical={layout === 'vertical'}
                  bordered={bordered}
                  row={row}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DescriptionsContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Descriptions.displayName = 'Descriptions';
}

export type { DescriptionsContextProps } from './DescriptionsContext';
export { DescriptionsContext };

Descriptions.Item = DescriptionsItem;

export default Descriptions;
