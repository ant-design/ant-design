import React, { useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { message } from 'antd';

interface ColorBlockProps {
  color: string;
  index: number;
  dark?: boolean;
}

const ColorBlock: React.FC<ColorBlockProps> = (props) => {
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
  return (
    <CopyToClipboard text={color} onCopy={() => message.success(`Copied: ${color}`)}>
      <div className="main-color-item" style={textStyle}>
        color-{index}
        <span className="main-color-value">{color.toLowerCase()}</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBlock;
