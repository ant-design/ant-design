import type { Component, ComponentClass, ForwardedRef } from 'react';
import type { PickerProps, RangePickerProps } from '.';

export interface CommonPickerMethods {
  focus: () => void;
  blur: () => void;
}

export interface PickerComponentClass<P = {}, S = unknown> extends ComponentClass<P, S> {
  new (...args: ConstructorParameters<ComponentClass<P, S>>): InstanceType<ComponentClass<P, S>> &
    CommonPickerMethods;
}

export type PickerRef<P> = ForwardedRef<Component<P> & CommonPickerMethods>;

export type DatePickRef<DateType> = PickerRef<PickerProps<DateType>>;

export type RangePickerRef<DateType> = PickerRef<RangePickerProps<DateType>>;
