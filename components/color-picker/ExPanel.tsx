import type { FC } from 'react';
import React from 'react';
import ColorClear from './components/ColorClear';
import ColorDataBar from './components/ColorDataBar';
import type { ColorPickerBaseProps } from './interface';

interface ExPanelProps extends ColorPickerBaseProps {
  children?: React.ReactElement;
}

const ExPanel: FC<ExPanelProps> = (props) => {
  const { prefixCls, children, allowClear, ...injectProps } = props;
  const ExPanelPrefixCls = `${prefixCls}-expanel`;

  return (
    <div className={ExPanelPrefixCls}>
      {allowClear ? (
        <div className={`${ExPanelPrefixCls}-clear`}>
          <ColorClear prefixCls={prefixCls} {...injectProps} />
        </div>
      ) : null}
      {children}
      <ColorDataBar prefixCls={prefixCls} {...injectProps} />
    </div>
  );
};
export default ExPanel;
