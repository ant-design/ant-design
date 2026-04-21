import React from 'react';

import BorderBeam from '..';
import useBorderBeamRadius from '../hooks/useBorderBeamRadius';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFor } from '../../../tests/utils';
import { defaultPrefixCls } from '../../config-provider';
import { genCssVar } from '../../theme/util/genStyleUtils';

describe('BorderBeam', () => {
  mountTest(() => <BorderBeam>content</BorderBeam>);
  rtlTest(() => <BorderBeam>content</BorderBeam>);

  const [varName] = genCssVar(defaultPrefixCls, 'border-beam');

  it('should render semantic structure', () => {
    const { container } = render(
      <BorderBeam className="beam-root">
        <div className="beam-child">content</div>
      </BorderBeam>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-border-beam');
    const childElement = container.querySelector<HTMLElement>('.beam-child');
    const beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam');

    expect(rootElement).toHaveClass('beam-root');
    expect(childElement?.parentElement).toBe(rootElement);
    expect(beamElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support color prop', () => {
    const { container } = render(
      <BorderBeam color="#36cfc9">
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-gradient'))).toBe(
      'linear-gradient(to left, #36cfc9, #36cfc9, transparent)',
    );
  });

  it('should support gradient color prop', () => {
    const { container } = render(
      <BorderBeam
        color={[
          { color: '#1677ff', percent: 0 },
          { color: '#36cfc9', percent: 55 },
          { color: '#95de64', percent: 100 },
        ]}
      >
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-gradient'))).toBe(
      'linear-gradient(to left, #1677ff 0%, #36cfc9 55%, #95de64 100%, transparent)',
    );
  });

  it('should apply style borderRadius to both the root and beam track', () => {
    const { container } = render(
      <BorderBeam style={{ borderRadius: 18 }}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.borderRadius).toBe('18px');
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');
  });

  it('should fall back to the track radius when motion path radius normalization fails', () => {
    const invalidRadius = '12px /' as React.CSSProperties['borderRadius'];
    const { container } = render(
      <BorderBeam style={{ borderRadius: invalidRadius }}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe(invalidRadius);
  });

  it('should handle inferred radius sync before the root ref is attached', () => {
    jest.useFakeTimers();

    const HookDemo = () => {
      const { beamVisible, trackRadius } = useBorderBeamRadius({
        prefixCls: 'ant-border-beam',
        configuredRadius: undefined,
        children: <div>content</div>,
      });

      return (
        <div data-track-radius={trackRadius} data-visible={String(beamVisible)}>
          content
        </div>
      );
    };

    try {
      const { container } = render(<HookDemo />);

      const element = container.firstElementChild as HTMLElement;

      expect(element.dataset.trackRadius).toBe('0px');
      expect(element.dataset.visible).toBe('false');

      act(() => {
        jest.runAllTimers();
      });

      expect(element.dataset.visible).toBe('true');
    } finally {
      jest.useRealTimers();
    }
  });

  it('should reset inferred beam visibility when switching from configured radius', () => {
    jest.useFakeTimers();

    const HookDemo = () => {
      const [configured, setConfigured] = React.useState(true);
      const { beamVisible, trackRadius } = useBorderBeamRadius({
        prefixCls: 'ant-border-beam',
        configuredRadius: configured ? 18 : undefined,
        children: <div>content</div>,
      });

      return (
        <>
          <button type="button" onClick={() => setConfigured(false)}>
            switch
          </button>
          <div data-track-radius={trackRadius} data-visible={String(beamVisible)}>
            content
          </div>
        </>
      );
    };

    try {
      const { container, getByRole } = render(<HookDemo />);

      const element = container.querySelector('[data-track-radius]') as HTMLElement;

      expect(element.dataset.trackRadius).toBe('18px');
      expect(element.dataset.visible).toBe('true');

      fireEvent.click(getByRole('button', { name: 'switch' }));

      expect(element.dataset.trackRadius).toBe('0px');
      expect(element.dataset.visible).toBe('false');

      act(() => {
        jest.runAllTimers();
      });

      expect(element.dataset.visible).toBe('true');
    } finally {
      jest.useRealTimers();
    }
  });

  it('should hide inferred beam until the first client radius sync resolves', async () => {
    jest.useFakeTimers();

    const originGetComputedStyle = window.getComputedStyle;
    let resolveRadius = false;

    window.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
      const style = originGetComputedStyle.call(window, element, pseudoElt);

      if ((element as HTMLElement).classList.contains('beam-child') && resolveRadius) {
        return {
          ...style,
          borderRadius: '12px',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          borderBottomRightRadius: '12px',
          borderBottomLeftRadius: '12px',
        } as CSSStyleDeclaration;
      }

      return style;
    }) as typeof window.getComputedStyle;

    try {
      const { container } = render(
        <BorderBeam>
          <div className="beam-child">content</div>
        </BorderBeam>,
      );

      const rootElement = container.querySelector<HTMLElement>('.ant-border-beam')!;
      const beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam')!;

      expect(beamElement.style.display).toBe('none');
      expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');

      resolveRadius = true;

      act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
        expect(beamElement.style.display).toBe('');
      });
    } finally {
      window.getComputedStyle = originGetComputedStyle;
      jest.useRealTimers();
    }
  });

  it('should infer radius from the first child when root radius is not configured', () => {
    const { container } = render(
      <BorderBeam>
        <div style={{ borderRadius: 12 }}>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
  });

  it('should re-measure inferred radius when the first child mounts later', async () => {
    const { container, rerender } = render(<BorderBeam>{null}</BorderBeam>);

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');

    rerender(
      <BorderBeam>
        <div style={{ borderRadius: 12 }}>content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
    });
  });

  it('should follow child radius updates when using inferred radius fallback', async () => {
    const Child = () => {
      const [radius, setRadius] = React.useState(12);

      return (
        <div style={{ borderRadius: radius }}>
          <button type="button" onClick={() => setRadius(24)}>
            update
          </button>
        </div>
      );
    };

    const { container, getByRole } = render(
      <BorderBeam>
        <Child />
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');

    fireEvent.click(getByRole('button', { name: 'update' }));

    await waitFor(() => {
      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('24px');
    });
  });

  it('should re-measure inferred radius when root class driven styles change', async () => {
    const { container, rerender } = render(
      <>
        <style>
          {`
            .radius-small .beam-child {
              border-radius: 12px;
            }

            .radius-large .beam-child {
              border-radius: 24px;
            }
          `}
        </style>
        <BorderBeam className="radius-small">
          <div className="beam-child">content</div>
        </BorderBeam>
      </>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    await waitFor(() => {
      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
    });

    rerender(
      <>
        <style>
          {`
            .radius-small .beam-child {
              border-radius: 12px;
            }

            .radius-large .beam-child {
              border-radius: 24px;
            }
          `}
        </style>
        <BorderBeam className="radius-large">
          <div className="beam-child">content</div>
        </BorderBeam>
      </>,
    );

    await waitFor(() => {
      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('24px');
    });
  });

  it('should update inferred radius when wrapper computed radius changes after resize', async () => {
    const originResizeObserver = global.ResizeObserver;
    const originGetComputedStyle = window.getComputedStyle;
    let resizeCallback: ResizeObserverCallback | undefined;
    let rootRadius = '20px';

    global.ResizeObserver = class ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
      }

      observe() {}

      unobserve() {}

      disconnect() {}
    };

    window.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
      const style = originGetComputedStyle.call(window, element, pseudoElt);

      if ((element as HTMLElement).classList.contains('beam-root-radius')) {
        return {
          ...style,
          borderRadius: rootRadius,
          borderTopLeftRadius: rootRadius,
          borderTopRightRadius: rootRadius,
          borderBottomRightRadius: rootRadius,
          borderBottomLeftRadius: rootRadius,
        } as CSSStyleDeclaration;
      }

      return style;
    }) as typeof window.getComputedStyle;

    try {
      const { container } = render(
        <BorderBeam className="beam-root-radius">
          <div>content</div>
        </BorderBeam>,
      );

      const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('20px');
      });

      rootRadius = '32px';

      act(() => {
        resizeCallback?.(
          [{ target: element } as unknown as ResizeObserverEntry],
          {} as ResizeObserver,
        );
      });

      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('32px');
      });
    } finally {
      global.ResizeObserver = originResizeObserver;
      window.getComputedStyle = originGetComputedStyle;
    }
  });

  it('should support non-uniform root style radius values', () => {
    const radius = '20px 20px 0px 0px';
    const { container } = render(
      <BorderBeam style={{ borderRadius: radius }}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.borderRadius).toBe(radius);
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe(radius);
  });

  it('should infer non-uniform radius from the first child', () => {
    const { container } = render(
      <BorderBeam>
        <div style={{ borderRadius: '20px 20px 0px 0px' }}>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('20px 20px 0px 0px');
  });

  it('should not set displayName in production bundles', async () => {
    const originNodeEnv = process.env.NODE_ENV;

    try {
      jest.resetModules();
      process.env.NODE_ENV = 'production';
      const ProductionBorderBeam = (await import('../BorderBeam')).default;

      expect(ProductionBorderBeam.displayName).toBeUndefined();
    } finally {
      process.env.NODE_ENV = originNodeEnv;
      jest.resetModules();
    }
  });
});
