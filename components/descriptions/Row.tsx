import * as React from 'react';

import type { InternalDescriptionsItemType } from '.';
import Cell from './Cell';
import type { DescriptionsContextProps } from './DescriptionsContext';
import DescriptionsContext from './DescriptionsContext';

interface CellConfig {
  component: string | [string, string];
  type: 'label' | 'content' | 'item';
  showLabel?: boolean;
  showContent?: boolean;
}

function renderCells(
  items: InternalDescriptionsItemType[],
  { colon, prefixCls, bordered }: RowProps,
  {
    component,
    type,
    showLabel,
    showContent,
    labelStyle: rootLabelStyle,
    contentStyle: rootContentStyle,
    styles: rootStyles,
  }: CellConfig & DescriptionsContextProps,
) {
  return items.map(
    (
      {
        label,
        children,
        prefixCls: itemPrefixCls = prefixCls,
        className,
        style,
        labelStyle,
        contentStyle,
        span = 1,
        key,
        styles,
      },
      index,
    ) => {
      if (typeof component === 'string') {
        return (
          <Cell
            key={`${type}-${key || index}`}
            className={className}
            style={style}
            styles={{
              label: {
                ...rootLabelStyle,
                ...rootStyles?.label,
                ...labelStyle,
                ...styles?.label,
              },
              content: {
                ...rootContentStyle,
                ...rootStyles?.content,
                ...contentStyle,
                ...styles?.content,
              },
            }}
            span={span}
            colon={colon}
            component={component}
            itemPrefixCls={itemPrefixCls}
            bordered={bordered}
            label={showLabel ? label : null}
            content={showContent ? children : null}
            type={type}
          />
        );
      }

      return [
        <Cell
          key={`label-${key || index}`}
          className={className}
          style={{
            ...rootLabelStyle,
            ...rootStyles?.label,
            ...style,
            ...labelStyle,
            ...styles?.label,
          }}
          span={1}
          colon={colon}
          component={component[0]}
          itemPrefixCls={itemPrefixCls}
          bordered={bordered}
          label={label}
          type="label"
        />,
        <Cell
          key={`content-${key || index}`}
          className={className}
          style={{
            ...rootContentStyle,
            ...rootStyles?.content,
            ...style,
            ...contentStyle,
            ...styles?.content,
          }}
          span={span * 2 - 1}
          component={component[1]}
          itemPrefixCls={itemPrefixCls}
          bordered={bordered}
          content={children}
          type="content"
        />,
      ];
    },
  );
}

export interface RowProps {
  prefixCls: string;
  vertical: boolean;
  row: InternalDescriptionsItemType[];
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
