import * as React from 'react';
import classNames from 'classnames';
import { DescriptionsItemProps } from './Item';
import Cell from './Cell';
import { DescriptionsContext, DescriptionsContextProps } from '.';

interface CellConfig {
  component: string | [string, string];
  type: string;
  showLabel?: boolean;
  showContent?: boolean;
  hashId?: string;
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
    hashId,
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
            hashId={hashId}
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
          hashId={hashId}
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
          hashId={hashId}
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
  hashId?: string;
}

const Row: React.FC<RowProps> = props => {
  const descContext = React.useContext(DescriptionsContext);

  const { prefixCls, vertical, row, index, bordered, hashId } = props;

  if (vertical) {
    return (
      <>
        <tr key={`label-${index}`} className={classNames(`${prefixCls}-row`, hashId)}>
          {renderCells(row, props, {
            component: 'th',
            type: 'label',
            showLabel: true,
            ...descContext,
            hashId,
          })}
        </tr>
        <tr key={`content-${index}`} className={classNames(`${prefixCls}-row`, hashId)}>
          {renderCells(row, props, {
            component: 'td',
            type: 'content',
            showContent: true,
            ...descContext,
            hashId,
          })}
        </tr>
      </>
    );
  }

  return (
    <tr key={index} className={classNames(`${prefixCls}-row`, hashId)}>
      {renderCells(row, props, {
        component: bordered ? ['th', 'td'] : 'td',
        type: 'item',
        showLabel: true,
        showContent: true,
        ...descContext,
        hashId,
      })}
    </tr>
  );
};

export default Row;
