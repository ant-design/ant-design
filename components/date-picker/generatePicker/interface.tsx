import { ComponentClass } from 'react';

export interface CommonPickerMethods {
  focus: () => void;
  blur: () => void;
}

export interface PickerComponentClass<P = {}, S = unknown> extends ComponentClass<P, S> {
  new (...args: ConstructorParameters<ComponentClass<P, S>>): InstanceType<ComponentClass<P, S>> &
    CommonPickerMethods;
}
