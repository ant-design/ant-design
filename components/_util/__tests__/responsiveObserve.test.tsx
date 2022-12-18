import React from 'react';
import { render } from '../../../tests/utils';
import useResponsiveObserve from '../responsiveObserve';

describe('Test ResponsiveObserve', () => {
  it('test ResponsiveObserve subscribe and unsubscribe', () => {
    let responsiveObserveRef: any;
    const Demo = () => {
      const responsiveObserve = useResponsiveObserve();
      responsiveObserveRef = responsiveObserve;
      return null;
    };
    render(<Demo />);
    const subscribeFunc = jest.fn();
    const token = responsiveObserveRef.subscribe(subscribeFunc);
    expect(
      responsiveObserveRef.matchHandlers[responsiveObserveRef.responsiveMap.xs].mql.matches,
    ).toBeTruthy();
    expect(subscribeFunc).toHaveBeenCalledTimes(1);

    responsiveObserveRef.unsubscribe(token);
    expect(
      responsiveObserveRef.matchHandlers[responsiveObserveRef.responsiveMap.xs].mql.removeListener,
    ).toHaveBeenCalled();
  });
});
