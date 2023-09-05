/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import * as React from 'react';
import type { Breakpoint, ScreenMap } from '../_util/responsiveObserver';
import useResponsiveObserver, { responsiveArray } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import DescriptionsContext from './DescriptionsContext';
import type { DescriptionsItemProps } from './Item';
import DescriptionsItem from './Item';
import Row from './Row';
import useRow from './hooks/useRow';
import useStyle from './style';

const DEFAULT_COLUMN_MAP: Record<Breakpoint, number> = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};

function getColumn(column: DescriptionsProps['column'], screens: ScreenMap): number {
  if (typeof column === 'number') {
    return column;
  }

  if (typeof column === 'object') {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint: Breakpoint = responsiveArray[i];
      if (screens[breakpoint] && column[breakpoint] !== undefined) {
        return column[breakpoint] || DEFAULT_COLUMN_MAP[breakpoint];
      }
    }
  }

  return 3;
}

interface CompoundedComponent {
  Item: typeof DescriptionsItem;
}

export interface DescriptionsItemType extends DescriptionsItemProps {
  key?: React.Key;
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
    column = DEFAULT_COLUMN_MAP,
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
  const [screens, setScreens] = React.useState<ScreenMap>({});
  const mergedColumn = getColumn(column, screens);

  const mergedSize = useSize(customizeSize);
  const rows = useRow(mergedColumn, items, children);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const responsiveObserver = useResponsiveObserver();

  // Responsive
  React.useEffect(() => {
    const token = responsiveObserver.subscribe((newScreens) => {
      if (typeof column !== 'object') {
        return;
      }
      setScreens(newScreens);
    });

    return () => {
      responsiveObserver.unsubscribe(token);
    };
  }, []);

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
