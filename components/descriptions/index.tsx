/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';
import { cloneElement } from '../_util/reactNode';
import type { Breakpoint, ScreenMap } from '../_util/responsiveObserver';
import useResponsiveObserver, { responsiveArray } from '../_util/responsiveObserver';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import DescriptionsItem from './Item';
import Row from './Row';
import useStyle from './style';

export interface DescriptionsContextProps {
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const DescriptionsContext = React.createContext<DescriptionsContextProps>({});

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

function getFilledItem(
  node: React.ReactElement,
  rowRestCol: number,
  span?: number,
): React.ReactElement {
  let clone = node;

  if (span === undefined || span > rowRestCol) {
    clone = cloneElement(node, {
      span: rowRestCol,
    });
    warning(
      span === undefined,
      'Descriptions',
      'Sum of column `span` in a line not match `column` of Descriptions.',
    );
  }

  return clone;
}

function getRows(children: React.ReactNode, column: number) {
  const childNodes = toArray(children).filter((n) => n);
  const rows: React.ReactElement[][] = [];

  let tmpRow: React.ReactElement[] = [];
  let rowRestCol = column;

  childNodes.forEach((node, index) => {
    const span: number = node.props?.span;
    const mergedSpan = span || 1;

    // Additional handle last one
    if (index === childNodes.length - 1) {
      tmpRow.push(getFilledItem(node, rowRestCol, span));
      rows.push(tmpRow);
      return;
    }

    if (mergedSpan < rowRestCol) {
      rowRestCol -= mergedSpan;
      tmpRow.push(node);
    } else {
      tmpRow.push(getFilledItem(node, rowRestCol, mergedSpan));
      rows.push(tmpRow);
      rowRestCol = column;
      tmpRow = [];
    }
  });

  return rows;
}

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  column?: number | Partial<Record<Breakpoint, number>>;
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

function Descriptions({
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
  ...restProps
}: DescriptionsProps) {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('descriptions', customizePrefixCls);
  const [screens, setScreens] = React.useState<ScreenMap>({});
  const mergedColumn = getColumn(column, screens);

  const mergedSize = useSize(customizeSize);

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

  // Children
  const rows = getRows(children, mergedColumn);
  const contextValue = React.useMemo(
    () => ({ labelStyle, contentStyle }),
    [labelStyle, contentStyle],
  );

  return wrapSSR(
    <DescriptionsContext.Provider value={contextValue}>
      <div
        className={classNames(
          prefixCls,
          {
            [`${prefixCls}-${mergedSize}`]: mergedSize && mergedSize !== 'default',
            [`${prefixCls}-bordered`]: !!bordered,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          },
          className,
          rootClassName,
          hashId,
        )}
        style={style}
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
}

if (process.env.NODE_ENV !== 'production') {
  Descriptions.displayName = 'Descriptions';
}

Descriptions.Item = DescriptionsItem;

export default Descriptions;
