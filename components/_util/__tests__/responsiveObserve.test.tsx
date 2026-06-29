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
});
