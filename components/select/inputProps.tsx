import * as React from 'react';
import type { SelectProps as RcSelectProps } from '@rc-component/select';
import { composeRef, getNodeRef } from '@rc-component/util';
import { clsx } from 'clsx';

type SelectComponents = NonNullable<RcSelectProps['components']>;
export type SelectInputComponent = SelectComponents['input'];
type InputComponentProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputComponentElementProps = InputComponentProps & React.RefAttributes<HTMLInputElement>;
type InputEventHandler = (...args: unknown[]) => void;
type InputPropsInputComponent = React.ForwardRefExoticComponent<
  InputComponentProps & React.RefAttributes<HTMLInputElement>
>;
export type SelectInputComponentRef = React.MutableRefObject<SelectInputComponent>;
export type InputPropsRef = React.MutableRefObject<InputComponentProps | undefined>;
const INPUT_CONTROL_PROPS = ['value', 'defaultValue', 'disabled', 'readOnly'] as const;
const INPUT_OVERRIDE_PROPS = ['autoComplete'] as const;
type InputControlProp = (typeof INPUT_CONTROL_PROPS)[number];
type InputOverrideProp = (typeof INPUT_OVERRIDE_PROPS)[number];

const isEventHandlerProp = (propName: string) => /^on[A-Z]/.test(propName);

const isInputControlProp = (propName: string): propName is InputControlProp =>
  (INPUT_CONTROL_PROPS as readonly string[]).includes(propName);

const isInputOverrideProp = (propName: string): propName is InputOverrideProp =>
  (INPUT_OVERRIDE_PROPS as readonly string[]).includes(propName);

const isMergedInputProp = (propName: string) =>
  propName === 'className' ||
  propName === 'style' ||
  isInputControlProp(propName) ||
  isEventHandlerProp(propName);

const mergeInputRestProps = (
  mergedProps: InputComponentProps,
  props: InputComponentProps,
  ...sources: InputComponentProps[]
) => {
  const mergedRecord = mergedProps as Record<string, unknown>;
  const propsRecord = props as Record<string, unknown>;

  sources.forEach((sourceProps) => {
    const sourceRecord = sourceProps as Record<string, unknown>;

    Object.keys(sourceProps).forEach((propName) => {
      if (isMergedInputProp(propName)) {
        return;
      }

      if (isInputOverrideProp(propName) || propsRecord[propName] === undefined) {
        mergedRecord[propName] = sourceRecord[propName];
      }
    });
  });
};

const composeInputHandlers = (...handlers: unknown[]) => {
  const mergedHandlers = handlers.filter(
    (handler, index): handler is InputEventHandler =>
      typeof handler === 'function' && handlers.indexOf(handler) === index,
  );

  if (!mergedHandlers.length) {
    return undefined;
  }

  return (...args: unknown[]) => {
    mergedHandlers.forEach((handler) => {
      handler(...args);
    });
  };
};

const mergeInputProps = (
  props: InputComponentProps,
  inputProps: InputComponentProps = {},
  originProps: InputComponentProps = {},
): InputComponentProps => {
  const { className, style, ...restProps } = props;
  const { className: originClassName, style: originStyle, ...restOriginProps } = originProps;
  const { className: inputClassName, style: inputStyle, ...restInputProps } = inputProps;
  const disabledValues = [props.disabled, originProps.disabled, inputProps.disabled];
  const readOnlyValues = [props.readOnly, originProps.readOnly, inputProps.readOnly];

  const mergedProps: InputComponentProps = {
    ...restProps,
    className: clsx(className, originClassName, inputClassName),
    style: {
      ...style,
      ...originStyle,
      ...inputStyle,
    },
  };
  mergeInputRestProps(mergedProps, props, restOriginProps, restInputProps);

  if (disabledValues.some((disabled) => disabled !== undefined)) {
    mergedProps.disabled = disabledValues.some((disabled) => disabled);
  }

  if (readOnlyValues.some((readOnly) => readOnly !== undefined)) {
    mergedProps.readOnly = readOnlyValues.some((readOnly) => readOnly);
  }

  const mergedRecord = mergedProps as Record<string, unknown>;
  const propsRecord = props as Record<string, unknown>;
  const originRecord = originProps as Record<string, unknown>;
  const inputRecord = inputProps as Record<string, unknown>;

  [...new Set([...Object.keys(originProps), ...Object.keys(inputProps)])].forEach((propName) => {
    if (!isEventHandlerProp(propName)) {
      return;
    }

    const handler = composeInputHandlers(
      propsRecord[propName],
      originRecord[propName],
      inputRecord[propName],
    );

    if (handler) {
      mergedRecord[propName] = handler;
    }
  });

  return mergedProps;
};

export const getInputPropsInput = (
  inputComponentRef: SelectInputComponentRef,
  inputPropsRef: InputPropsRef,
): InputPropsInputComponent => {
  const Input = React.forwardRef<HTMLInputElement, InputComponentProps>((props, ref) => {
    const inputComponent = inputComponentRef.current;
    const inputProps = inputPropsRef.current;

    if (React.isValidElement(inputComponent)) {
      const originInput = inputComponent as React.ReactElement<InputComponentElementProps>;
      const mergedProps = mergeInputProps(props, inputProps, originInput.props);
      const mergedRef = composeRef(getNodeRef<HTMLInputElement>(originInput), ref);

      return React.cloneElement(originInput, {
        ...mergedProps,
        ref: mergedRef,
      });
    }

    const Component = (inputComponent || 'input') as React.ElementType;
    const mergedProps = mergeInputProps(props, inputProps);

    return <Component {...mergedProps} ref={ref} />;
  });

  Input.displayName = 'SelectInput';

  return Input;
};
