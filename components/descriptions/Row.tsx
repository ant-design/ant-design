import * as React from 'react';
import type { DescriptionsContextProps } from '.';
import { DescriptionsContext } from '.';
import Cell from './Cell';
import type { DescriptionsItemProps } from './Item';

interface CellConfig {
  component: string | [string, string];
  type: string;
  showLabel?: boolean;
  showContent?: boolean;
}

function renderCells(
  items: React.ReactElement<DescriptionsItemProps>[],
  { colon, prefixCls, bordered }: RowProps,
  {
    component,
    type,
    showLabel,
    showContent,
    labelStyle: rootLabelStyle,
    contentStyle: rootContentStyle,
  }: CellConfig & DescriptionsContextProps,
) {
  return items.map(
    (
      {
        props: {
          label,
          children,
          prefixCls: itemPrefixCls = prefixCls,
          className,
          style,
          labelStyle,
          contentStyle,
          span = 1,
        },
        key,
      },
      index,
    ) => {
      if (typeof component === 'string') {
        return (
          <Cell
            key={`${type}-${key || index}`}
            className={className}
            style={style}
            labelStyle={{ ...rootLabelStyle, ...labelStyle }}
            contentStyle={{ ...rootContentStyle, ...contentStyle }}
            span={span}
            colon={colon}
            component={component}
            itemPrefixCls={itemPrefixCls}
            bordered={bordered}
            label={showLabel ? label : null}
            content={showContent ? children : null}
          />
        );
      }

      return [
        <Cell
          key={`label-${key || index}`}
          className={className}
          style={{ ...rootLabelStyle, ...style, ...labelStyle }}
          span={1}
          colon={colon}
          component={component[0]}
          itemPrefixCls={itemPrefixCls}
          bordered={bordered}
          label={label}
        />,
        <Cell
          key={`content-${key || index}`}
          className={className}
          style={{ ...rootContentStyle, ...style, ...contentStyle }}
          span={span * 2 - 1}
          component={component[1]}
          itemPrefixCls={itemPrefixCls}
          bordered={bordered}
          content={children}
        />,
      ];
    },
  );
}

export interface RowProps {
  prefixCls: string;
  vertical: boolean;
  row: React.ReactElement<DescriptionsItemProps>[];
  bordered?: boolean;
  colon: boolean;
  index: number;
  children?: React.ReactNode;
}

const Row: React.FC<RowProps> = (props) => {
  const descContext = React.useContext(DescriptionsContext);

  const { prefixCls, vertical, row, index, bordered } = props;
  if (vertical) {
    return (
      <>
        <tr key={`label-${index}`} className={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'th',
            type: 'label',
            showLabel: true,
            ...descContext,
          })}
        </tr>
        <tr key={`content-${index}`} className={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'td',
            type: 'content',
            showContent: true,
            ...descContext,
          })}
        </tr>
      </>
    );
  }

  return (
    <tr key={index} className={`${prefixCls}-row`}>
      {renderCells(row, props, {
        component: bordered ? ['th', 'td'] : 'td',
        type: 'item',
        showLabel: true,
        showContent: true,
        ...descContext,
      })}
    </tr>
  );
};

export default Row;
