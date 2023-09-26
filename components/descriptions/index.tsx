/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import classNames from 'classnames';

import type { Breakpoint } from '../_util/responsiveObserver';
import { matchScreen } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
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
}

export interface DescriptionsItemType extends Omit<InternalDescriptionsItemType, 'span'> {
  span?: number | { [key in Breakpoint]?: number };
}

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
  items?: DescriptionsItemType[];
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
    items,
    ...restProps
  } = props;
  const { getPrefixCls, direction, descriptions } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);
  const screens = useBreakpoint();

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

  const [wrapSSR, hashId] = useStyle(prefixCls);

  // ======================== Render ========================
  const contextValue = React.useMemo(
    () => ({ labelStyle, contentStyle }),
    [labelStyle, contentStyle],
  );

  return wrapSSR(
    <DescriptionsContext.Provider value={contextValue}>
      <div
        className={classNames(
          prefixCls,
          descriptions?.className,
          {
            [`${prefixCls}-${mergedSize}`]: mergedSize && mergedSize !== 'default',
            [`${prefixCls}-bordered`]: !!bordered,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className,
          rootClassName,
          hashId,
        )}
        style={{ ...descriptions?.style, ...style }}
        {...restProps}
      >
        {(title || extra) && (
          <div className={`${prefixCls}-header`}>
            {title && <div className={`${prefixCls}-title`}>{title}</div>}
            {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
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
