import React from 'react';

import BorderBeam from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFor } from '../../../tests/utils';
import { defaultPrefixCls } from '../../config-provider';
import { genCssVar } from '../../theme/util/genStyleUtils';

describe('BorderBeam', () => {
  mountTest(() => <BorderBeam>content</BorderBeam>);
  rtlTest(() => <BorderBeam>content</BorderBeam>);

  const [varName] = genCssVar(defaultPrefixCls, 'border-beam');
  const getRootElement = (container: HTMLElement) =>
    container.querySelector<HTMLElement>('.ant-border-beam')!;
  const getBeamElement = (container: HTMLElement) =>
    container.querySelector<HTMLElement>('.ant-border-beam-beam')!;

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
    expect(rootElement).toBe(childElement);
    expect(beamElement?.closest('.ant-border-beam')).toBe(rootElement);
    expect(beamElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('should update injected child positioning according to computed root position', async () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .beam-static { position: static; }
      .beam-absolute { position: absolute; }
    `;
    document.head.appendChild(styleElement);

    try {
      const child = (className: string) => <div className={`beam-child ${className}`}>content</div>;
      const { container, rerender } = render(<BorderBeam>{child('beam-absolute')}</BorderBeam>);

      let rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('.beam-child')!;

      expect(rootElement).toBe(childElement);
      expect(rootElement.style.position).toBe('');
      expect(window.getComputedStyle(rootElement).position).toBe('absolute');

      rerender(<BorderBeam>{child('beam-static')}</BorderBeam>);

      rootElement = getRootElement(container);
      expect(rootElement.style.position).toBe('relative');
      expect(window.getComputedStyle(rootElement).position).toBe('relative');
      expect(getBeamElement(container).closest('.ant-border-beam')).toBe(rootElement);

      rerender(<BorderBeam style={{ position: 'absolute' }}>{child('beam-static')}</BorderBeam>);

      rootElement = getRootElement(container);
      expect(rootElement.style.position).toBe('absolute');
      expect(window.getComputedStyle(rootElement).position).toBe('absolute');

      rerender(<BorderBeam>{child('beam-absolute')}</BorderBeam>);

      await waitFor(() => {
        rootElement = getRootElement(container);
        expect(rootElement.style.position).toBe('');
        expect(window.getComputedStyle(rootElement).position).toBe('absolute');
      });
    } finally {
      styleElement.remove();
    }
  });

  it('should update wrapper positioning according to computed root position', () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = '.beam-wrapper-absolute { position: absolute; }';
    document.head.appendChild(styleElement);

    try {
      const { container, rerender } = render(
        <BorderBeam className="beam-wrapper-absolute">content</BorderBeam>,
      );

      let rootElement = getRootElement(container);

      expect(rootElement.style.position).toBe('');
      expect(window.getComputedStyle(rootElement).position).toBe('absolute');

      rerender(<BorderBeam style={{ position: 'static' }}>content</BorderBeam>);

      rootElement = getRootElement(container);
      expect(rootElement.style.position).toBe('relative');
      expect(window.getComputedStyle(rootElement).position).toBe('relative');
    } finally {
      styleElement.remove();
    }
  });

  it('should resolve solid, fallback, and gradient colors', () => {
    const { container, rerender } = render(
      <BorderBeam color="#36cfc9">
        <div>content</div>
      </BorderBeam>,
    );

    let element = getRootElement(container);

    expect(element.style.getPropertyValue(varName('beam-gradient'))).toBe(
      'linear-gradient(to left, #36cfc9, #36cfc9, transparent)',
    );

    rerender(
      <BorderBeam color="   ">
        <div>content</div>
      </BorderBeam>,
    );

    expect(element.style.getPropertyValue(varName('beam-gradient'))).toBe(
      'linear-gradient(to left, #1677ff, #4096ff, transparent)',
    );

    rerender(
      <BorderBeam color={[{ color: '   ', percent: 20 }]}>
        <div>content</div>
      </BorderBeam>,
    );

    element = getRootElement(container);

    expect(element.style.getPropertyValue(varName('beam-gradient'))).toBe(
      'linear-gradient(to left, #1677ff, #4096ff, transparent)',
    );

    rerender(
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

    expect(element.style.getPropertyValue(varName('beam-gradient'))).toBe(
      'linear-gradient(to left, #1677ff 0%, #36cfc9 38.5%, #95de64 70%, transparent)',
    );
  });

  it('should normalize configured border radius values and motion path radius', () => {
    const { container, rerender } = render(
      <BorderBeam style={{ borderRadius: ' 18px ' }}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = getRootElement(container);

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');

    rerender(
      <BorderBeam style={{ borderRadius: '8px 16px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('8px 16px');

    rerender(
      <BorderBeam style={{ borderRadius: '8px 16px 24px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('8px 16px 24px');

    rerender(
      <BorderBeam style={{ borderRadius: '8px 16px / 20px 24px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe(
      '8px 16px / 20px 24px',
    );

    rerender(
      <BorderBeam style={{ borderRadius: '   ' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');

    rerender(
      <BorderBeam style={{ borderRadius: 18 }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.borderRadius).toBe('18px');
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');

    rerender(
      <BorderBeam style={{ borderRadius: '12px / ' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe('12px /');

    rerender(
      <BorderBeam style={{ borderRadius: '8px 16px 24px 32px 40px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe(
      '8px 16px 24px 32px 40px',
    );

    rerender(
      <BorderBeam style={{ borderRadius: 'not-a-numberpx' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe('not-a-numberpx');
  });

  it('should hide inferred beam until radius inference resolves and reset when falling back again', async () => {
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
      const { container, rerender } = render(
        <BorderBeam>
          <div className="beam-child">content</div>
        </BorderBeam>,
      );

      const rootElement = getRootElement(container);
      const beamElement = getBeamElement(container);

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

      rerender(
        <BorderBeam style={{ borderRadius: 18 }}>
          <div className="beam-child">content</div>
        </BorderBeam>,
      );

      expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');
      expect(beamElement.style.display).toBe('');

      resolveRadius = false;

      rerender(
        <BorderBeam>
          <div className="beam-child">content</div>
        </BorderBeam>,
      );

      expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');
      expect(beamElement.style.display).toBe('none');

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

  it('should infer child radius from inline styles and longhand computed corners', () => {
    const originGetComputedStyle = window.getComputedStyle;

    window.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
      const style = originGetComputedStyle.call(window, element, pseudoElt);

      if ((element as HTMLElement).classList.contains('beam-radius-2')) {
        return {
          ...style,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '16px',
          borderRadius: '',
        } as CSSStyleDeclaration;
      }

      if ((element as HTMLElement).classList.contains('beam-radius-3')) {
        return {
          ...style,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '24px',
          borderBottomLeftRadius: '16px',
          borderRadius: '',
        } as CSSStyleDeclaration;
      }

      if ((element as HTMLElement).classList.contains('beam-radius-ellipse')) {
        return {
          ...style,
          borderTopLeftRadius: '8px 12px',
          borderTopRightRadius: '16px 20px',
          borderBottomRightRadius: '8px 12px',
          borderBottomLeftRadius: '16px 20px',
          borderRadius: '',
        } as CSSStyleDeclaration;
      }

      return style;
    }) as typeof window.getComputedStyle;

    try {
      const { container, rerender } = render(
        <BorderBeam>
          <div style={{ borderRadius: 12 }}>content</div>
        </BorderBeam>,
      );

      let element = getRootElement(container);

      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');

      rerender(
        <BorderBeam>
          <div className="beam-radius-2">content</div>
        </BorderBeam>,
      );

      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('8px 16px');

      rerender(
        <BorderBeam>
          <div className="beam-radius-3">content</div>
        </BorderBeam>,
      );

      element = getRootElement(container);
      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('8px 16px 24px');

      rerender(
        <BorderBeam>
          <div className="beam-radius-ellipse">content</div>
        </BorderBeam>,
      );

      element = getRootElement(container);
      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe(
        '8px 16px / 12px 20px',
      );

      rerender(
        <BorderBeam>
          <div style={{ borderRadius: '20px 20px 0px 0px' }}>content</div>
        </BorderBeam>,
      );

      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('20px 20px 0px 0px');
    } finally {
      window.getComputedStyle = originGetComputedStyle;
    }
  });

  it('should keep inferred child radius in sync across mount and child state updates', async () => {
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

    const { container, rerender, getByRole } = render(<BorderBeam>{null}</BorderBeam>);

    expect(getRootElement(container).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
      '0px',
    );

    rerender(
      <BorderBeam>
        <Child />
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(getRootElement(container).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
        '12px',
      );
    });

    fireEvent.click(getByRole('button', { name: 'update' }));

    await waitFor(() => {
      expect(getRootElement(container).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
        '24px',
      );
    });
  });

  it('should re-measure inferred radius when root class driven styles change', async () => {
    const { container, rerender } = render(
      <>
        <style>
          {`
            .radius-small.beam-child {
              border-radius: 12px;
            }

            .radius-large.beam-child {
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
            .radius-small.beam-child {
              border-radius: 12px;
            }

            .radius-large.beam-child {
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

  it('should update inferred radius when root computed radius changes after resize', async () => {
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

  it('should expose the entry export and keep production bundles without displayName', async () => {
    const entry = await import('../index');
    const originNodeEnv = process.env.NODE_ENV;

    expect(entry.default).toBeDefined();
    expect(entry.default.displayName).toBe(BorderBeam.displayName);

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
