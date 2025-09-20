import React, { useMemo } from 'react';
import { App } from 'antd';
import copy from 'antd/es/_util/copy';

interface ColorBlockProps {
  color: string;
  index: number;
  dark?: boolean;
}

const ColorBlock: React.FC<ColorBlockProps> = (props) => {
  const { message } = App.useApp();
  const { color, index, dark } = props;
  const textStyle = useMemo<React.CSSProperties>(() => {
    const colorMap = { default: ['#fff', 'unset'], dark: ['#314659', '#fff'] };
    const [lastColor, firstColor] = dark ? colorMap.dark : colorMap.default;
    return {
      background: color,
      color: index > 5 ? lastColor : firstColor,
      fontWeight: index === 6 ? 'bold' : 'normal',
    };
  }, [color, dark, index]);

  const onCopy = async () => {
    await copy(color);
    message.success(`Copied: ${color}`);
  };

  return (
    <div className="main-color-item" style={{ ...textStyle, cursor: 'pointer' }} onClick={onCopy}>
      color-{index}
      <span className="main-color-value">{color.toLowerCase()}</span>
    </div>
  );
};

export default ColorBlock;
