import * as React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import EnterOutlined from '@ant-design/icons/EnterOutlined';
import { AutoSizeType } from 'rc-textarea/lib/ResizableTextArea';
import TextArea from '../input/TextArea';
import { DirectionType } from '../config-provider';

interface EditableProps {
  prefixCls?: string;
  value?: string;
  ['aria-label']?: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
  direction?: DirectionType;
  maxLength?: number;
  autoSize?: boolean | AutoSizeType;
}

const Editable: React.FC<EditableProps> = props => {
  const ref = React.useRef<any>();

  const inComposition = React.useRef(false);
  const lastKeyCode = React.useRef<number>();
  const prevValue = React.useRef(props.value);

  const [current, setCurrent] = React.useState(props.value || '');

  React.useEffect(() => {
    if (prevValue.current !== props.value && props.value !== undefined) {
      setCurrent(props.value);
      prevValue.current = props.value;
    }
  }, [props.value]);

  React.useEffect(() => {
    if (ref.current && ref.current.resizableTextArea) {
      const { textArea } = ref.current.resizableTextArea;
      textArea.focus();
      const { length } = textArea.value;
      textArea.setSelectionRange(length, length);
    }
  }, [ref.current]);

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({ target: { value } }) => {
    setCurrent(value.replace(/[\n\r]/g, ''));
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

  const confirmChange = () => {
    const { onSave } = props;

    onSave(current.trim());
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = ({
    keyCode,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  }) => {
    const { onCancel } = props;
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
        confirmChange();
      } else if (keyCode === KeyCode.ESC) {
        onCancel();
      }
    }
  };

  const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = () => {
    confirmChange();
  };

  const {
    prefixCls,
    'aria-label': ariaLabel,
    className,
    style,
    direction,
    maxLength,
    autoSize,
  } = props;
  const textAreaClassName = classNames(
    prefixCls,
    `${prefixCls}-edit-content`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
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
        autoSize={autoSize === undefined || autoSize}
      />
      <EnterOutlined className={`${prefixCls}-edit-content-confirm`} />
    </div>
  );
};

export default Editable;
