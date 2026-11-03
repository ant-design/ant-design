import React from 'react';

import { render } from '../../../tests/utils';
import useResponsiveObserver from '../responsiveObserver';

describe('Test ResponsiveObserve', () => {
  it('test ResponsiveObserve subscribe and unsubscribe', () => {
    const responsiveRef = React.createRef<ReturnType<typeof useResponsiveObserver>>();
    const Demo: React.FC = () => {
      const responsiveObserver = useResponsiveObserver();
      responsiveRef.current = responsiveObserver;
      return null;
    };
    render(<Demo />);
    const subscribeFunc = jest.fn();
    const instance = responsiveRef.current;
    const token = instance?.subscribe(subscribeFunc);
    expect(instance?.matchHandlers[instance?.responsiveMap.xs].mql.matches).toBeTruthy();
    expect(subscribeFunc).toHaveBeenCalledTimes(1);
    if (token !== undefined) {
      instance?.unsubscribe(token);
    }
    expect(
      instance?.matchHandlers[instance?.responsiveMap.xs].mql?.removeEventListener,
    ).toHaveBeenCalled();
  });

  it('should notify subscribers when dispatch is called', () => {
    const responsiveRef = React.createRef<ReturnType<typeof useResponsiveObserver>>();
    const Demo: React.FC = () => {
      const responsiveObserver = useResponsiveObserver();
      responsiveRef.current = responsiveObserver;
      return null;
    };
    render(<Demo />);

    const subscribeFunc = jest.fn();
    const instance = responsiveRef.current;
    const token = instance?.subscribe(subscribeFunc);

    instance?.dispatch({ xs: true });

    // `subscribe` calls once immediately with current screens, then `dispatch` notifies again.
    expect(subscribeFunc).toHaveBeenCalledTimes(2);
    expect(subscribeFunc).toHaveBeenLastCalledWith({ xs: true });

    if (token !== undefined) {
      instance?.unsubscribe(token);
    }
  });

  it('keeps the observer and unchanged snapshots stable', () => {
    const responsiveRef = React.createRef<ReturnType<typeof useResponsiveObserver>>();
    const Demo = () => {
      responsiveRef.current = useResponsiveObserver();
      return null;
    };
    const { rerender } = render(<Demo />);
    const instance = responsiveRef.current!;
    const getSnapshot = instance.getSnapshot!;
    const getServerSnapshot = instance.getServerSnapshot!;
    expect(getSnapshot()).toBeUndefined();
    expect(getServerSnapshot()).toBeUndefined();

    const subscriber = jest.fn();
    const token = instance.subscribe(subscriber);
    const snapshot = getSnapshot()!;

    rerender(<Demo />);
    expect(responsiveRef.current).toBe(instance);
    expect(getSnapshot()).toBe(snapshot);

    instance.dispatch({ ...snapshot });
    expect(getSnapshot()).toBe(snapshot);
    expect(subscriber).toHaveBeenCalledTimes(1);

    instance.dispatch({ ...snapshot, xs: !snapshot.xs });
    expect(getSnapshot()).not.toBe(snapshot);
    expect(getSnapshot()?.xs).toBe(!snapshot.xs);
    expect(getServerSnapshot()).toBeUndefined();
    expect(snapshot.xs).toBe(true);
    expect(subscriber).toHaveBeenCalledTimes(2);

    instance.unsubscribe(token);
  });
});
