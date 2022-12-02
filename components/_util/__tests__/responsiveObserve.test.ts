import useResponsiveObserve from '../responsiveObserve';

describe('Test ResponsiveObserve', () => {
  it('test ResponsiveObserve subscribe and unsubscribe', () => {
    const reponsiveObserve = useResponsiveObserve();
    const { xs } = reponsiveObserve.responsiveMap;
    const subscribeFunc = jest.fn();
    const token = reponsiveObserve.subscribe(subscribeFunc);
    expect(reponsiveObserve.matchHandlers[xs].mql.matches).toBeTruthy();
    expect(subscribeFunc).toHaveBeenCalledTimes(1);

    reponsiveObserve.unsubscribe(token);
    expect(reponsiveObserve.matchHandlers[xs].mql.removeListener).toHaveBeenCalled();
  });
});
