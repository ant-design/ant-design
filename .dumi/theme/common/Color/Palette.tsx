import React, { useEffect } from 'react';
import { presetDarkPalettes } from '@ant-design/colors';
import { App } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

import useLocale from '../../../hooks/useLocale';

const rgbToHex = (rgbString: string): string => {
  const rgb = rgbString.match(/\d+/g);
  if (!rgb) {
    return '';
  }
  let r = Number.parseInt(rgb[0], 10).toString(16);
  let g = Number.parseInt(rgb[1], 10).toString(16);
  let b = Number.parseInt(rgb[2], 10).toString(16);
  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;
  return `#${r}${g}${b}`;
};

interface PaletteProps {
  showTitle?: boolean;
  direction?: 'horizontal' | 'vertical';
  dark?: boolean;
  color?: {
    name: string;
    count?: number;
    english?: string;
    chinese?: string;
    englishDescription?: string;
    chineseDescription?: string;
  };
}

const Palette: React.FC<PaletteProps> = (props) => {
  const {
    showTitle,
    direction,
    dark,
    color: { name, count = 10, englishDescription, chineseDescription, english, chinese } = {
      name: 'gray',
      count: 13,
    },
  } = props;

  const [, localeType] = useLocale();

  const [hexColors, setHexColors] = React.useState<Record<PropertyKey, string>>({});
  const colorNodesRef = React.useRef<Record<PropertyKey, HTMLDivElement>>({});
  const { message } = App.useApp();

  useEffect(() => {
    const colors: Record<string, string> = {};
    Object.keys(colorNodesRef.current || {}).forEach((key) => {
      const { backgroundColor } = getComputedStyle(colorNodesRef.current[key]);
      if (backgroundColor.includes('rgba')) {
        colors[key] = backgroundColor;
      } else {
        colors[key] = rgbToHex(backgroundColor);
      }
    });
    setHexColors(colors);
  }, []);

  const className = direction === 'horizontal' ? 'color-palette-horizontal' : 'color-palette';
  const colors: React.ReactNode[] = [];
  const colorName = localeType === 'en' ? english : `${english} / ${chinese}`;
  const colorPaletteMap = {
    dark: ['#fff', 'unset'],
    default: ['rgba(0, 0, 0, 0.85)', '#fff'],
  };
  const [lastColor, firstColor] = dark ? colorPaletteMap.dark : colorPaletteMap.default;
  for (let i = 1; i <= count; i += 1) {
    const colorText = `${name}-${i}`;
    const defaultBgStyle = dark ? presetDarkPalettes[name][i - 1] : '';
    colors.push(
      <CopyToClipboard
        text={hexColors[colorText]}
        onCopy={() => message.success(`@${colorText} copied: ${hexColors[colorText]}`)}
        key={colorText}
      >
        <div
          key={i}
          ref={(node) => {
            if (node) {
              colorNodesRef.current[`${name}-${i}`] = node;
            }
          }}
          className={`main-color-item palette-${name}-${i}`}
          style={{
            color: (name === 'yellow' ? i > 6 : i > 5) ? firstColor : lastColor,
            fontWeight: i === 6 ? 'bold' : 'normal',
            backgroundColor: defaultBgStyle,
          }}
          title="click to copy color"
        >
          <span className="main-color-text">{colorText}</span>
          <span className="main-color-value">{hexColors[colorText]}</span>
        </div>
      </CopyToClipboard>,
    );
  }
  return (
    <div className={className}>
      {showTitle && (
        <div className="color-title">
          {colorName}
          <span className="color-description">
            {localeType === 'en' ? englishDescription : chineseDescription}
          </span>
        </div>
      )}
      <div className="main-color">{colors}</div>
    </div>
  );
};

export default Palette;
