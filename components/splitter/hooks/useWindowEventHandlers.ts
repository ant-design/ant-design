const useWindowEventHandlers = (
  handlers: Partial<{ [K in keyof WindowEventMap]: (evt: any) => void }>,
) => {
  React.useEffect(() => {
    for (const [event, handler] of Object.entries<EventListener>(handlers)) {
      window.addEventListener(event, handler);
    }
    return () => {
      for (const [event, handler] of Object.entries<EventListener>(handlers)) {
        window.removeEventListener(event, handler);
      }
    };
  }, [handlers]);
};

export default useWindowEventHandlers;
