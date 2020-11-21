import * as React from 'react';
import { DescriptionsItemProps } from './Item';
import Cell from './Cell';

interface CellConfig {
  component: string | [string, string];
  type: string;
  showLabel?: boolean;
  showContent?: boolean;
}

function renderCells(
  items: React.ReactElement<DescriptionsItemProps>[],
  { colon, prefixCls, bordered }: RowProps,
  { component, type, showLabel, showContent }: CellConfig,
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
            labelStyle={labelStyle}
            contentStyle={contentStyle}
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
          style={{ ...style, ...labelStyle }}
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
          style={{ ...style, ...contentStyle }}
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
}

const Row: React.FC<RowProps> = props => {
  const { prefixCls, vertical, row, index, bordered } = props;
  if (vertical) {
    return (
      <>
        <tr key={`label-${index}`} className={`${prefixCls}-row`}>
          {renderCells(row, props, { component: 'th', type: 'label', showLabel: true })}
        </tr>
        <tr key={`content-${index}`} className={`${prefixCls}-row`}>
          {renderCells(row, props, {
            component: 'td',
            type: 'content',
            showContent: true,
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
      })}
    </tr>
  );
};

export default Row;
