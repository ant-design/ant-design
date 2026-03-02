import * as React from 'react';
import { useEvent } from '@rc-component/util';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../../_util/hooks';
import { getMergedStatus } from '../../_util/statusUtils';
import type { InputStatus } from '../../_util/statusUtils';
import { devUseWarning } from '../../_util/warning';
import type { Variant } from '../../config-provider';
import { useComponentConfig } from '../../config-provider/context';
import useSize from '../../config-provider/hooks/useSize';
import type { SizeType } from '../../config-provider/SizeContext';
import { FormItemInputContext } from '../../form/context';
import type { FormItemStatusContextProps } from '../../form/context';
import type { InputRef } from '../Input';
import useStyle from '../style/otp';
import OTPInput from './OTPInput';
import type { OTPInputProps } from './OTPInput';

export type OTPSemanticClassNames = {
  root?: string;
  input?: string;
  separator?: string;
};

export type OTPSemanticStyles = {
  root?: React.CSSProperties;
  input?: React.CSSProperties;
  separator?: React.CSSProperties;
};

export type OTPClassNamesType = SemanticClassNamesType<OTPProps, OTPSemanticClassNames>;

export type OTPStylesType = SemanticStylesType<OTPProps, OTPSemanticStyles>;

export interface OTPRef {
  focus: VoidFunction;
  blur: VoidFunction;
  nativeElement: HTMLDivElement;
}

export interface OTPProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onInput'> {
  prefixCls?: string;
  length?: number;

  // Style
  variant?: Variant;
  rootClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType;

  // Values
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  formatter?: (value: string) => string;
  separator?: ((index: number) => React.ReactNode) | React.ReactNode;

  // Status
  disabled?: boolean;
  status?: InputStatus;

  mask?: boolean | string;

  type?: React.HTMLInputTypeAttribute;

  autoComplete?: string;

  onInput?: (value: string[]) => void;

  classNames?: OTPClassNamesType;
  styles?: OTPStylesType;
}

function strToArr(str: string) {
  return (str || '').split('');
}

interface SeparatorProps {
  index: number;
  prefixCls: string;
  separator: OTPProps['separator'];
  className?: string;
  style?: React.CSSProperties;
}

const Separator: React.FC<Readonly<SeparatorProps>> = (props) => {
  const { index, prefixCls, separator, className: semanticClassName, style: semanticStyle } = props;
  const separatorNode = typeof separator === 'function' ? separator(index) : separator;
  if (!separatorNode) {
    return null;
  }
  return (
    <span className={clsx(`${prefixCls}-separator`, semanticClassName)} style={semanticStyle}>
      {separatorNode}
    </span>
  );
};

const OTP = React.forwardRef<OTPRef, OTPProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    length = 6,
    size: customSize,
    defaultValue,
    value,
    onChange,
    formatter,
    separator,
    variant,
    disabled,
    status: customStatus,
    autoFocus,
    mask,
    type,
    autoComplete,
    onInput,
    onFocus,
    inputMode,
    classNames,
    styles,
    className,
    style,
    ...restProps
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Input.OTP');
    warning(
      !(typeof mask === 'string' && mask.length > 1),
      'usage',
      '`mask` prop should be a single character.',
    );
  }

  const {
    classNames: contextClassNames,
    styles: contextStyles,
    getPrefixCls,
    direction,
    style: contextStyle,
    className: contextClassName,
  } = useComponentConfig('otp');
  const prefixCls = getPrefixCls('otp', customizePrefixCls);

  const mergedProps: OTPProps = {
    ...props,
    length,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    OTPClassNamesType,
    OTPStylesType,
    OTPProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const domAttrs = pickAttrs(restProps, {
    aria: true,
    data: true,
    attr: true,
  });

  // ========================= Root =========================
  // Style
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ========================= Size =========================
  const mergedSize = useSize((ctx) => customSize ?? ctx);

  // ======================== Status ========================
  const formContext = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(formContext.status, customStatus);

  const proxyFormContext = React.useMemo<FormItemStatusContextProps>(
    () => ({
      ...formContext,
      status: mergedStatus,
      hasFeedback: false,
      feedbackIcon: null,
    }),
    [formContext, mergedStatus],
  );

  // ========================= Refs =========================
  const containerRef = React.useRef<HTMLDivElement>(null);

  const inputsRef = React.useRef<Record<number, InputRef | null>>({});

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputsRef.current[0]?.focus();
    },
    blur: () => {
      for (let i = 0; i < length; i += 1) {
        inputsRef.current[i]?.blur();
      }
    },
    nativeElement: containerRef.current!,
  }));

  // ======================= Formatter ======================
  const internalFormatter = (txt: string) => (formatter ? formatter(txt) : txt);

  // ======================== Values ========================
  const [valueCells, setValueCells] = React.useState<string[]>(() =>
    strToArr(internalFormatter(defaultValue || '')),
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setValueCells(strToArr(value));
    }
  }, [value]);

  const triggerValueCellsChange = useEvent((nextValueCells: string[]) => {
    setValueCells(nextValueCells);

    if (onInput) {
      onInput(nextValueCells);
    }

    // Trigger if all cells are filled
    if (
      onChange &&
      nextValueCells.length === length &&
      nextValueCells.every((c) => c) &&
      nextValueCells.some((c, index) => valueCells[index] !== c)
    ) {
      onChange(nextValueCells.join(''));
    }
  });

  const patchValue = useEvent((index: number, txt: string) => {
    let nextCells = [...valueCells];

    // Fill cells till index
    for (let i = 0; i < index; i += 1) {
      if (!nextCells[i]) {
        nextCells[i] = '';
      }
    }

    if (txt.length <= 1) {
      nextCells[index] = txt;
    } else {
      nextCells = nextCells.slice(0, index).concat(strToArr(txt));
    }
    nextCells = nextCells.slice(0, length);

    // Clean the last empty cell
    for (let i = nextCells.length - 1; i >= 0; i -= 1) {
      if (nextCells[i]) {
        break;
      }
      nextCells.pop();
    }

    // Format if needed
    const formattedValue = internalFormatter(nextCells.map((c) => c || ' ').join(''));
    nextCells = strToArr(formattedValue).map((c, i) => {
      if (c === ' ' && !nextCells[i]) {
        return nextCells[i];
      }
      return c;
    });

    return nextCells;
  });

  // ======================== Change ========================
  const onInputChange: OTPInputProps['onChange'] = (index, txt) => {
    const nextCells = patchValue(index, txt);

    const nextIndex = Math.min(index + txt.length, length - 1);
    if (nextIndex !== index && nextCells[index] !== undefined) {
      inputsRef.current[nextIndex]?.focus();
    }

    triggerValueCellsChange(nextCells);
  };

  const onInputActiveChange: OTPInputProps['onActiveChange'] = (nextIndex) => {
    inputsRef.current[nextIndex]?.focus();
  };

  // ======================== Focus ========================
  const onInputFocus = (event: React.FocusEvent<HTMLInputElement>, index: number) => {
    // keep focus on the first empty cell
    for (let i = 0; i < index; i += 1) {
      if (!inputsRef.current[i]?.input?.value) {
        inputsRef.current[i]?.focus();
        break;
      }
    }

    onFocus?.(event);
  };

  // ======================== Render ========================
  const inputSharedProps: Partial<OTPInputProps> = {
    variant,
    disabled,
    status: mergedStatus as InputStatus,
    mask,
    type,
    inputMode,
    autoComplete,
  };

  return (
    <div
      {...domAttrs}
      ref={containerRef}
      className={clsx(
        className,
        prefixCls,
        {
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-lg`]: mergedSize === 'large',
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        cssVarCls,
        hashId,
        contextClassName,
        mergedClassNames.root,
      )}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      role="group"
    >
      <FormItemInputContext.Provider value={proxyFormContext}>
        {Array.from({ length }).map((_, index) => {
          const key = `otp-${index}`;
          const singleValue = valueCells[index] || '';
          return (
            <React.Fragment key={key}>
              <OTPInput
                ref={(inputEle) => {
                  inputsRef.current[index] = inputEle;
                }}
                index={index}
                size={mergedSize}
                htmlSize={1}
                className={clsx(mergedClassNames.input, `${prefixCls}-input`)}
                style={mergedStyles.input}
                onChange={onInputChange}
                value={singleValue}
                onActiveChange={onInputActiveChange}
                autoFocus={index === 0 && autoFocus}
                onFocus={(event) => onInputFocus(event, index)}
                {...inputSharedProps}
              />
              {index < length - 1 && (
                <Separator
                  separator={separator}
                  index={index}
                  prefixCls={prefixCls}
                  className={clsx(mergedClassNames.separator)}
                  style={mergedStyles.separator}
                />
              )}
            </React.Fragment>
          );
        })}
      </FormItemInputContext.Provider>
    </div>
  );
});

export default OTP;
