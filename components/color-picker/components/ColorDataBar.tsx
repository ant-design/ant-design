import type { HSB, RGB } from '@rc-component/color-picker';
import { getRoundNumber } from '@rc-component/color-picker/lib/util';
import type { FC } from 'react';
import React, { useState } from 'react';
import Select from '../../select';
import { ColorFormatEnum } from '../enum';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor, getAlphaColor } from '../util';

import ColorHexInput from './ColorHexInput';
import ColorSteppers from './ColorSteppers';

interface ColorDataBarProps extends ColorPickerBaseProps {
  onChange?: () => void;
}

const ColorDataBar: FC<ColorDataBarProps> = ({
  color,
  prefixCls,
  format = 'hex',
  onFormatChange,
  updateColor,
}) => {
  const [colorFormat, setColorFormat] = useState(ColorFormatEnum[format]);

  const ColorDataBarPrefixCls = `${prefixCls}-databar`;

  const formatChangeHandle = (value: ColorFormatEnum) => {
    setColorFormat(value);
    onFormatChange?.(value);
  };

  const hexChangeHandle = (hex: string) => {
    updateColor?.(generateColor(hex));
  };

  const hsbChangeHandle = (step: number, type: keyof HSB) => {
    const hsb = color.toHsb();
    hsb[type] = type === 'h' ? step : (step || 0) / 100;
    updateColor?.(generateColor(hsb));
  };

  const rgbChangeHandle = (step: number | null, type: keyof RGB) => {
    const rgb = color.toRgb();
    rgb[type] = step || 0;
    updateColor?.(generateColor(rgb));
  };

  const alphaChangeHandle = (step: number) => {
    const hsba = color.toHsb();
    hsba.a = (step || 0) / 100;
    updateColor?.(generateColor(hsba));
  };

  const steppersRender = () => {
    switch (colorFormat) {
      case ColorFormatEnum.hex:
        return (
          <ColorHexInput
            prefixCls={ColorDataBarPrefixCls}
            value={color.toHexString()}
            onChange={(value) => hexChangeHandle(value)}
          />
        );
      case ColorFormatEnum.hsb:
        return (
          <>
            <ColorSteppers
              max={360}
              min={0}
              value={Number(color.toHsb().h)}
              prefixCls={ColorDataBarPrefixCls}
              formatter={(value) => getRoundNumber(value || 0).toString()}
              onChange={(step) => hsbChangeHandle(Number(step), 'h')}
            />
            <ColorSteppers
              max={100}
              min={0}
              value={Number(color.toHsb().s) * 100}
              prefixCls={ColorDataBarPrefixCls}
              formatter={(value) => `${getRoundNumber(value || 0)}%`}
              onChange={(step) => hsbChangeHandle(Number(step), 's')}
            />
            <ColorSteppers
              max={100}
              min={0}
              value={Number(color.toHsb().b) * 100}
              prefixCls={ColorDataBarPrefixCls}
              formatter={(value) => `${getRoundNumber(value || 0)}%`}
              onChange={(step) => hsbChangeHandle(Number(step), 'b')}
            />
          </>
        );
      case ColorFormatEnum.rgb:
        return (
          <>
            <ColorSteppers
              max={255}
              min={0}
              value={Number(color.toRgb().r)}
              prefixCls={ColorDataBarPrefixCls}
              onChange={(step) => rgbChangeHandle(Number(step), 'r')}
            />
            <ColorSteppers
              max={255}
              min={0}
              value={Number(color.toRgb().g)}
              prefixCls={ColorDataBarPrefixCls}
              onChange={(step) => rgbChangeHandle(Number(step), 'g')}
            />
            <ColorSteppers
              max={255}
              min={0}
              value={Number(color.toRgb().b)}
              prefixCls={ColorDataBarPrefixCls}
              onChange={(step) => rgbChangeHandle(Number(step), 'b')}
            />
          </>
        );
      default:
        return (
          <ColorHexInput
            prefixCls={ColorDataBarPrefixCls}
            value={color.toHexString()}
            onChange={(value) => hexChangeHandle(value)}
          />
        );
    }
  };

  const steppersPrefixRender = (cls: string) => (
    <div className={`${cls}-prefix`}>
      <div className={`${cls}-display`} />
      <div
        className={`${cls}-layer`}
        style={{
          backgroundColor: color.toRgbString(),
        }}
      />
    </div>
  );

  return (
    <div className={ColorDataBarPrefixCls}>
      <div className={`${ColorDataBarPrefixCls}-container`}>
        <div className={`${ColorDataBarPrefixCls}-select`}>
          <Select
            value={colorFormat}
            bordered={false}
            getPopupContainer={(currentEle) => currentEle}
            dropdownMatchSelectWidth={68}
            placement="bottomRight"
            onChange={formatChangeHandle}
          >
            <Select.Option value={ColorFormatEnum.hex}>
              {ColorFormatEnum.hex.toLocaleUpperCase()}
            </Select.Option>
            <Select.Option value={ColorFormatEnum.hsb}>
              {ColorFormatEnum.hsb.toLocaleUpperCase()}
            </Select.Option>
            <Select.Option value={ColorFormatEnum.rgb}>
              {ColorFormatEnum.rgb.toLocaleUpperCase()}
            </Select.Option>
          </Select>
        </div>
        <div className={`${ColorDataBarPrefixCls}-picker`}>
          {steppersRender()}
          <ColorSteppers
            value={getAlphaColor(color)}
            prefixCls={ColorDataBarPrefixCls}
            formatter={(value) => `${value}%`}
            prefix={steppersPrefixRender}
            onChange={alphaChangeHandle}
          />
        </div>
      </div>
    </div>
  );
};
export default ColorDataBar;
