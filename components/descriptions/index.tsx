/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';

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

export interface InternalDescriptionsItemType extends DescriptionsItemProps {
  key?: React.Key;
  filled?: boolean;
}

export interface DescriptionsItemType
  extends Omit<InternalDescriptionsItemType, 'span' | 'filled'> {
  span?: number | 'filled' | { [key in Breakpoint]?: number };
}

type SemanticName = 'root' | 'header' | 'title' | 'extra' | 'label' | 'content';

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
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  classNames?: Partial<Record<SemanticName, string>>;
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
      ['labelStyle', 'styles={{ label: {} }}'],
      ['contentStyle', 'styles={{ content: {} }}'],
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

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  // ======================== Render ========================
  const contextValue = React.useMemo(
    () => ({
      labelStyle,
      contentStyle,
      styles: {
        content: { ...contextStyles.content, ...styles?.content },
        label: { ...contextStyles.label, ...styles?.label },
      },
      classNames: {
        label: classNames(contextClassNames.label, descriptionsClassNames?.label),
        content: classNames(contextClassNames.content, descriptionsClassNames?.content),
      },
    }),
    [labelStyle, contentStyle, styles, descriptionsClassNames, contextClassNames, contextStyles],
  );

  return wrapCSSVar(
    <DescriptionsContext.Provider value={contextValue}>
      <div
        className={classNames(
          prefixCls,
          contextClassName,
          contextClassNames.root,
          descriptionsClassNames?.root,
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
        style={{ ...contextStyle, ...contextStyles.root, ...styles?.root, ...style }}
        {...restProps}
      >
        {(title || extra) && (
          <div
            className={classNames(
              `${prefixCls}-header`,
              contextClassNames.header,
              descriptionsClassNames?.header,
            )}
            style={{ ...contextStyles.header, ...styles?.header }}
          >
            {title && (
              <div
                className={classNames(
                  `${prefixCls}-title`,
                  contextClassNames.title,
                  descriptionsClassNames?.title,
                )}
                style={{
                  ...contextStyles.title,
                  ...styles?.title,
                }}
              >
                {title}
              </div>
            )}
            {extra && (
              <div
                className={classNames(
                  `${prefixCls}-extra`,
                  contextClassNames.extra,
                  descriptionsClassNames?.extra,
                )}
                style={{ ...contextStyles.extra, ...styles?.extra }}
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
    </DescriptionsContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Descriptions.displayName = 'Descriptions';
}

export type { DescriptionsContextProps } from './DescriptionsContext';
export { DescriptionsContext };

Descriptions.Item = DescriptionsItem;

export default Descriptions;
