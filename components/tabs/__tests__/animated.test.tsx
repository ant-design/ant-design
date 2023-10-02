import { renderHook } from '../../../tests/utils';
import useAnimateConfig from '../hooks/useAnimateConfig';

describe('Tabs.Animated', () => {
  it('boolean: false', () => {
    const { result } = renderHook(() => useAnimateConfig('test', false));

    expect(result.current).toEqual({
      inkBar: false,
      tabPane: false,
    });
  });

  it('boolean: true', () => {
    const { result } = renderHook(() => useAnimateConfig('test', true));

    expect(result.current).toEqual(
      expect.objectContaining({
        inkBar: true,
        tabPane: true,
      }),
    );
  });

  it('config', () => {
    const { result } = renderHook(() => useAnimateConfig('test', { inkBar: false, tabPane: true }));

    expect(result.current).toEqual({
      inkBar: false,
      tabPane: true,
      tabPaneMotion: expect.objectContaining({
        motionName: 'test-switch',
      }),
    });
  });
});
