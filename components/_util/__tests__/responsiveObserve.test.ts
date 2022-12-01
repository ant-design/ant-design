import ResponsiveObserve, { useResponsiveMap } from '../responsiveObserve';

describe('Test ResponsiveObserve', () => {
  it('test ResponsiveObserve subscribe and unsubscribe', () => {
    const { xs } = useResponsiveMap();
    const subscribeFunc = jest.fn();
    const token = ResponsiveObserve.subscribe(subscribeFunc);
    expect(ResponsiveObserve.matchHandlers[xs].mql.matches).toBeTruthy();
    expect(subscribeFunc).toHaveBeenCalledTimes(1);

    ResponsiveObserve.unsubscribe(token);
    expect(ResponsiveObserve.matchHandlers[xs].mql.removeListener).toHaveBeenCalled();
  });
});
