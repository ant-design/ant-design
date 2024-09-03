import type React from 'react';

/** https://github.com/Microsoft/TypeScript/issues/29729 */
export type LiteralUnion<T extends string> = T | (string & {});

export type AnyObject = Record<PropertyKey, any>;

export type CustomComponent<P = AnyObject> = React.ComponentType<P> | string;

/**
 * Get component props
 * @example
 * ```ts
 * import { Checkbox } from 'antd'
 * import type { GetProps } from 'antd';
 *
 * type CheckboxGroupProps = GetProps<typeof Checkbox.Group>
 * ```
 * @since 5.13.0
 */
export type GetProps<T extends React.ComponentType<any> | object> =
  T extends React.ComponentType<infer P> ? P : T extends object ? T : never;

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

// https://github.com/ant-design/ant-design/issues/50682
export type { ElementRef as GetRef } from 'react';

export type GetContextProps<T> = T extends React.Context<infer P> ? P : never;

export type GetContextProp<
  T extends React.Context<any>,
  PropName extends keyof GetContextProps<T>,
> = NonNullable<GetContextProps<T>[PropName]>;
