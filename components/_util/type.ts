import type React from 'react';

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T, U extends Primitive = string> = T | (U & Record<never, never>);

export type AnyObject = Record<PropertyKey, any>;

export type EmptyObject = Record<never, never>;

export type CustomComponent<P = AnyObject> = React.ComponentType<P> | string;

/**
 * Get component props
 * @example
 * ```ts
 * import { Checkbox } from 'antd'
 * import type { GetProps } from 'antd';
 *
 * type CheckboxGroupProps = GetProps<typeof Checkbox.Group>
 *
 * const MyContext = React.createContext<{ sample?: boolean }>({});
 * type MyContextProps = GetProps<typeof MyContext>;
 *
 * ```
 * @since 5.13.0
 */
export type GetProps<T extends React.ComponentType<any> | object> = T extends React.Context<
  infer CP
>
  ? CP
  : T extends React.ComponentType<infer P>
    ? P
    : T extends object
      ? T
      : never;

/**
 * Get component props by component name
 * @example
 * ```ts
 * import { Select } from 'antd';
 * import type { GetProp, SelectProps } from 'antd';
 *
 * type SelectOption1 = GetProp<SelectProps, 'options'>[number];
 * // or
 * type SelectOption2 = GetProp<typeof Select, 'options'>[number];
 *
 * const onChange: GetProp<typeof Select, 'onChange'> = (value, option) => {
 *  // Do something
 * };
 * ```
 * @since 5.13.0
 */
export type GetProp<
  T extends React.ComponentType<any> | object,
  PropName extends keyof GetProps<T>,
> = NonNullable<GetProps<T>[PropName]>;

type ReactRefComponent<Props extends { ref?: React.Ref<any> | string }> = (
  props: Props,
) => React.ReactNode;

type ExtractRefAttributesRef<T> = T extends React.RefAttributes<infer P> ? P : never;

/**
 * Get component ref
 * @example
 * ```ts
 * import { Input } from 'antd';
 * import type { GetRef } from 'antd';
 *
 * type InputRef = GetRef<typeof Input>;
 * ```
 * @since 5.13.0
 */
export type GetRef<T extends ReactRefComponent<any> | React.Component<any>> =
  T extends React.Component<any>
    ? T
    : T extends React.ComponentType<infer P>
      ? ExtractRefAttributesRef<P>
      : never;

export type ValidChar =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
