import React from 'react';
import { FloatButton, theme } from 'antd';
import { DarkTheme, Light, CompactTheme } from 'antd-token-previewer/es/icons';
import ThemeIcon from './ThemeIcon';

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

export type ThemeSwitchProps = {
  value: typeof defaultAlgorithm[];
  onChange: (value: typeof defaultAlgorithm[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ value, onChange }) => {
  const handleLightSwitch = () => {
    let newValue = [...value];
    if (value.includes(darkAlgorithm)) {
      newValue = newValue.filter((item) => item !== darkAlgorithm);
    }
    if (!value.includes(defaultAlgorithm)) {
      newValue.unshift(defaultAlgorithm);
    }
    onChange(newValue);
  };

  const handleDarkSwitch = () => {
    let newValue = [...value];
    if (value.includes(defaultAlgorithm)) {
      newValue = newValue.filter((item) => item !== defaultAlgorithm);
    }
    if (!value.includes(darkAlgorithm)) {
      newValue.push(darkAlgorithm);
    }
    onChange(newValue);
  };

  const handleCompactSwitch = () => {
    if (value.includes(compactAlgorithm)) {
      onChange(value.filter((item) => item !== compactAlgorithm));
    } else {
      onChange([...value, compactAlgorithm]);
    }
  };

  return (
    <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
      <FloatButton
        icon={<Light />}
        type={value.includes(defaultAlgorithm) ? 'primary' : 'default'}
        onClick={handleLightSwitch}
        tooltip="Light"
      />
      <FloatButton
        icon={<DarkTheme />}
        type={value.includes(darkAlgorithm) ? 'primary' : 'default'}
        onClick={handleDarkSwitch}
        tooltip="Dark"
      />
      <FloatButton
        icon={<CompactTheme />}
        type={value.includes(compactAlgorithm) ? 'primary' : 'default'}
        onClick={handleCompactSwitch}
        tooltip="Compact"
      />
    </FloatButton.Group>
  );
};

export default ThemeSwitch;
