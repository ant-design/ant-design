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

  const context = useMemo<ActionContextProps>(
    () => ({
      open,
      onCancel: (e?: React.MouseEvent<HTMLElement>) => {
        onCancel?.(e);
        setOpen(false);
      },
      destroyCallback: () => setLoad(undefined),
    }),
    [open],
  );

  return <Context.Provider value={context}>{(load || propsOpen) && children}</Context.Provider>;
};

const ContextReset = ({ children }: { children: React.ReactNode }) => {
  const context = useMemo<ActionContextProps>(
    () => ({ onCancel: () => undefined, destroyCallback: () => undefined }),
    [],
  );
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

Action.Context = Context;
Action.ContextReset = ContextReset;

export default Action;
