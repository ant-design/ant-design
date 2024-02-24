/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';

export type onCancel = (e?: React.MouseEvent<HTMLElement>) => void;

export interface ActionProps {
  open?: boolean;
  children?: React.ReactNode;
  onCancel?: onCancel;
}

export interface ActionContextProps {
  open?: boolean;
  onCancel: onCancel;
  destroyCallback: () => void;
}
export const Context = createContext<ActionContextProps>({
  onCancel: () => undefined,
  destroyCallback: () => undefined,
});

const Action = (props: ActionProps) => {
  const { onCancel, children, open: propsOpen } = props;

  const [load, setLoad] = useState<Record<string, any>>();
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (propsOpen) {
      setLoad({});
    } else {
      setOpen(false);
    }
  }, [propsOpen]);

  useEffect(() => {
    setOpen(!!load);
  }, [load]);

  const handleOnCancel = (e?: React.MouseEvent<HTMLElement>) => {
    onCancel?.(e);
    setOpen(false);
  };

  return (
    <Context.Provider
      value={{ open, onCancel: handleOnCancel, destroyCallback: () => setLoad(undefined) }}
    >
      {(load || propsOpen) && children}
    </Context.Provider>
  );
};

const ContextReset = ({ children }: { children: React.ReactNode }) => (
  <Context.Provider value={{ onCancel: () => undefined, destroyCallback: () => undefined }}>
    {children}
  </Context.Provider>
);

Action.Context = Context;
Action.ContextReset = ContextReset;

export default Action;
