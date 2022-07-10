import EnterOutlined from '@ant-design/icons/EnterOutlined';
import classNames from 'classnames';
import type { AutoSizeType } from 'rc-textarea/lib/ResizableTextArea';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import type { DirectionType } from '../config-provider';
import TextArea from '../input/TextArea';
import { cloneElement } from '../_util/reactNode';

interface EditableProps {
  prefixCls?: string;
  value: string;
  ['aria-label']?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  onEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
  direction?: DirectionType;
  maxLength?: number;
  autoSize?: boolean | AutoSizeType;
  enterIcon?: React.ReactNode;
  component?: string;
  closeEdit: () => void;
}

const Editable: React.FC<EditableProps> = ({
  prefixCls,
  'aria-label': ariaLabel,
  className,
  style,
  direction,
  maxLength,
  autoSize = true,
  value,
  onSave,
  onCancel,
  onEnd,
  component,
  enterIcon = <EnterOutlined />,
  closeEdit,
}) => {
  const ref = React.useRef<any>();

  const inComposition = React.useRef(false);
  const lastKeyCode = React.useRef<number>();
  const originalValue = React.useRef<string>(value);

  const [current, setCurrent] = React.useState(value);

  React.useEffect(() => {
    setCurrent(value);
  }, [value]);

  React.useEffect(() => {
    if (ref.current && ref.current.resizableTextArea) {
      const { textArea } = ref.current.resizableTextArea;
      textArea.focus();
      const { length } = textArea.value;
      textArea.setSelectionRange(length, length);
    }
  }, []);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target }) => {
    setCurrent(target.value.replace(/[\n\r]/g, ''));
  };

  const onCompositionStart = () => {
    inComposition.current = true;
  };

  const onCompositionEnd = () => {
    inComposition.current = false;
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = ({ keyCode }) => {
    // We don't record keyCode when IME is using
    if (inComposition.current) return;

    lastKeyCode.current = keyCode;
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = ({
    keyCode,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  }) => {
    if (current !== value) {
      onSave(current);
    }

    // Check if it's a real key
    if (
      lastKeyCode.current === keyCode &&
      !inComposition.current &&
      !ctrlKey &&
      !altKey &&
      !metaKey &&
      !shiftKey
    ) {
      if (keyCode === KeyCode.ENTER) {
        onSave(current.trim());
        onEnd?.();
        closeEdit();
      } else if (keyCode === KeyCode.ESC) {
        onSave(originalValue.current);
        onCancel();
      }
    }
  };

  const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    onSave(current.trim());
    closeEdit();
  };

  const textClassName = component ? `${prefixCls}-${component}` : '';

  const textAreaClassName = classNames(
    prefixCls,
    `${prefixCls}-edit-content`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    textClassName,
  );

  return (
    <div className={textAreaClassName} style={style}>
      <TextArea
        ref={ref as any}
        maxLength={maxLength}
        value={current}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onBlur={onBlur}
        aria-label={ariaLabel}
        rows={1}
        autoSize={autoSize}
      />
      {enterIcon !== null
        ? cloneElement(enterIcon, { className: `${prefixCls}-edit-content-confirm` })
        : null}
    </div>
  );
};

export default Editable;
