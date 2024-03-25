import * as React from 'react';
import classNames from 'classnames';
import { useEvent, useMergedState } from 'rc-util';

import { ConfigContext } from '../../config-provider';
import useCSSVarCls from '../../config-provider/hooks/useCSSVarCls';
import useSize from '../../config-provider/hooks/useSize';
import { type SizeType } from '../../config-provider/SizeContext';
import { type InputRef } from '../Input';
import useStyle from '../style/otp';
import OTPInput, { type OTPInputProps } from './OTPInput';

export interface OTPProps {
  prefixCls?: string;
  length?: number;
  rootClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType;

  // Values
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * 需求：
 * - 输入框长度
 * - 验证颜色
 * - 格式化输入（大小写）
 */

const OTP = (props: OTPProps) => {
  const {
    prefixCls: customizePrefixCls,
    length = 6,
    size: customSize,
    defaultValue,
    value,
    onChange,
  } = props;

  const { getPrefixCls, direction, input } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('otp', customizePrefixCls);

  // ========================= Root =========================
  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // ========================= Size =========================
  const mergedSize = useSize((ctx) => customSize ?? ctx);

  // ========================= Refs =========================
  const refs = React.useRef<Record<number, InputRef | null>>({});

  // ======================== Values ========================
  const [valueCells, setValueCells] = React.useState<string[]>([]);
  const valueCellsStr = valueCells.join('');

  const patchValue = useEvent((index: number, txt: string) => {
    let nextCells = [...valueCells];

    if (txt.length <= 1) {
      nextCells[index] = txt;
    } else {
      nextCells = nextCells.slice(0, index).concat(txt.split(''));
    }

    return nextCells.slice(0, length).filter((cell) => cell);
  });

  React.useEffect(() => {
    if (value) {
      setValueCells(value.split(''));
    }
  }, [value]);

  // ======================== Change ========================
  const onInputChange: OTPInputProps['onChange'] = (index, txt) => {
    const nextCells = patchValue(index, txt);
    console.log('>>>', nextCells);

    // let nextValue = `${mergedValue.slice(0, index)}${txt}`;

    // nextValue = nextValue.slice(0, length);

    // const nextIndex = Math.min(index + txt.length, length - 1);

    // if (nextIndex !== index) {
    //   refs.current[nextIndex]?.focus();
    // }

    // setMergedValue(nextValue);

    // Auto offset if input is not empty
    if (txt) {
      const nextIndex = Math.min(nextCells.length, length - 1);
      refs.current[nextIndex]?.focus();
    }

    setValueCells(nextCells);
  };

  const onInputBack: OTPInputProps['onBack'] = (index) => {
    const nextIndex = index - 1;
    refs.current[nextIndex]?.focus();
  };

  // ======================== Render ========================
  return (
    <div
      className={classNames(
        prefixCls,
        {
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        cssVarCls,
        hashId,
      )}
    >
      {new Array(length).fill(0).map((_, index) => {
        const key = `otp-${index}`;
        const singleValue = valueCells[index] || '';

        return (
          <OTPInput
            ref={(inputEle) => {
              refs.current[index] = inputEle;
            }}
            key={key}
            index={index}
            size={mergedSize}
            htmlSize={1}
            className={`${prefixCls}-input`}
            onChange={onInputChange}
            value={singleValue}
            onBack={onInputBack}
          />
        );
      })}
    </div>
  );
};

export default OTP;
