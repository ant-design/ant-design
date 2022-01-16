import * as React from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';

import { ConfigContext } from '../config-provider';

type RawOption = string | number;

interface LabeledOption {
  className?: string;
  disabled?: boolean;
  title: string;
  value: RawOption;
}

type Options = Array<RawOption | LabeledOption>;

export interface SegmentedProps extends React.HTMLProps<HTMLDivElement> {
  options: Options;
  defaultValue?: RawOption;
  disabled?: boolean;
  prefixCls?: string;
}

function isLabledOption(option: RawOption | LabeledOption): option is LabeledOption {
  return option === Object(option);
}

function getDefaultValue(options: Options) {
  const option0 = options[0];
  return isLabledOption(option0) ? option0.value : option0;
}

function normalizeOptions(options: Options): LabeledOption[] {
  return options.map(option => {
    if (isLabledOption(option)) {
      return option;
    }
    return {
      title: String(option),
      value: option,
    };
  });
}

const calcThumbStyle = (targetElement: HTMLElement) => ({
  transform: `translateX(${targetElement.offsetLeft}px)`,
  width: targetElement.clientWidth,
});

const Segmented: React.FC<SegmentedProps> = props => {
  const {
    options,
    disabled,
    onClick,
    prefixCls: customizePrefixCls,
    className = '',
    ...restProps
  } = props;

  // TODO: 参数格式校验
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const targetThumbStyle = React.useRef<React.CSSProperties | null>(null);

  const [selected, setSelected] = useMergedState(props.defaultValue || getDefaultValue(options));
  const [visualSelected, setVisualSelected] = React.useState<RawOption | undefined>(selected);

  const [thumbShow, setThumbShow] = React.useState(false);

  const segmentedOptions = normalizeOptions(options);

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const handleItemClick = (
    segmentedOption: LabeledOption,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (disabled || segmentedOption.disabled) {
      return;
    }

    const targetElement = (event.target as HTMLElement).closest(`.${prefixCls}-item`);
    if (targetElement) {
      targetThumbStyle.current = calcThumbStyle(targetElement as HTMLElement);
      setThumbShow(true);
    }

    setSelected(segmentedOption.value);

    onClick?.(event);
  };

  // --- motion event handlers for thumb move
  const handleThumbEnterStart = () => {
    const currentSelectedElement = containerRef.current?.querySelector(
      `.${prefixCls}-item-selected`,
    );
    if (currentSelectedElement) {
      setVisualSelected(undefined);

      const style = calcThumbStyle(currentSelectedElement as HTMLElement);
      return style;
    }
  };

  const handleThumbEnterActive = () => {
    if (targetThumbStyle.current) {
      return targetThumbStyle.current;
    }
  };

  const handleThumbEnterEnd = React.useCallback(() => {
    setThumbShow(false);
    setVisualSelected(selected);

    if (targetThumbStyle.current) {
      targetThumbStyle.current = null;
    }
  }, [selected]);

  const divProps = omit(restProps, ['children']);

  return (
    <div {...divProps} className={classString} ref={containerRef}>
      <CSSMotion
        visible={thumbShow}
        motionName={`${prefixCls}-thumb-motion`}
        motionDeadline={300}
        onEnterStart={handleThumbEnterStart}
        onEnterActive={handleThumbEnterActive}
        onEnterEnd={handleThumbEnterEnd}
      >
        {({ className: motionClassName, style: motionStyle, ref }) => {
          console.log(motionStyle, 'motionStyle');
          return (
            <div
              ref={ref}
              className={classNames(`${prefixCls}-thumb`, motionClassName)}
              style={motionStyle}
            />
          );
        }}
      </CSSMotion>
      {segmentedOptions.map(segmentedOption => (
        <div
          key={segmentedOption.value}
          className={classNames(`${prefixCls}-item`, {
            [`${prefixCls}-item-selected`]: segmentedOption.value === visualSelected,
            [`${prefixCls}-item-disabled`]: !!segmentedOption.disabled,
          })}
          onClick={e => handleItemClick(segmentedOption, e)}
        >
          <span className={`${prefixCls}-item-label`}>{segmentedOption.title}</span>
        </div>
      ))}
    </div>
  );
};

Segmented.defaultProps = {};

export default Segmented;
