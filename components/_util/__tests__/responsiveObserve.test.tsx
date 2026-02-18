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
    const token = responsiveRef.current?.subscribe(subscribeFunc);
    expect(
      responsiveRef.current?.matchHandlers[responsiveRef.current.responsiveMap.xs].mql.matches,
    ).toBeTruthy();
    expect(subscribeFunc).toHaveBeenCalledTimes(1);
    if (token !== undefined) {
      responsiveRef.current?.unsubscribe(token);
    }
    expect(
      responsiveRef.current?.matchHandlers[responsiveRef.current.responsiveMap.xs].mql
        ?.removeEventListener,
    ).toHaveBeenCalled();
  });
});
