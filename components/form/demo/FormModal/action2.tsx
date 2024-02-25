import React, { createContext, useEffect, useMemo, useState } from 'react';

export type onCancel = (e?: React.MouseEvent<HTMLElement>) => void;

export interface ActionProps {
  open?: boolean;
  children?: React.ReactNode;
  onCancel?: onCancel;
}

export interface ActionContextProps {
  open?: boolean;
  onCancel: onCancel;
  onDestroy: () => void;
}
export const Context = createContext<ActionContextProps>({
  onCancel: () => undefined,
  onDestroy: () => undefined,
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

  const context = useMemo<ActionContextProps>(
    () => ({
      open,
      onCancel: (e?: React.MouseEvent<HTMLElement>) => {
        onCancel?.(e);
        setOpen(false);
      },
      onDestroy: () => setLoad(undefined),
    }),
    [open],
  );

  return <Context.Provider value={context}>{(load || propsOpen) && children}</Context.Provider>;
};

export const ContextReset = ({ children }: { children: React.ReactNode }) => {
  const context = useMemo<ActionContextProps>(
    () => ({ onCancel: () => undefined, onDestroy: () => undefined }),
    [],
  );
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Action;
