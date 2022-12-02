import useResponsiveObserve from '../responsiveObserve';

describe('Test ResponsiveObserve', () => {
  it('test ResponsiveObserve subscribe and unsubscribe', () => {
    const responsiveObserve = useResponsiveObserve();
    const { xs } = responsiveObserve.responsiveMap;
    const subscribeFunc = jest.fn();
    const token = responsiveObserve.subscribe(subscribeFunc);
    expect(responsiveObserve.matchHandlers[xs].mql.matches).toBeTruthy();
    expect(subscribeFunc).toHaveBeenCalledTimes(1);

    responsiveObserve.unsubscribe(token);
    expect(responsiveObserve.matchHandlers[xs].mql.removeListener).toHaveBeenCalled();
  });
});
