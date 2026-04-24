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

  it('should retry injecting into the same child component when it exposes a DOM ref later', async () => {
    jest.useFakeTimers();

    const DeferredChild = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement> & { ready: boolean }
    >(({ ready, ...restProps }, ref) => {
      return (
        <div ref={ready ? ref : undefined} {...restProps}>
          content
        </div>
      );
    });

    try {
      const { container, rerender } = render(
        <BorderBeam>
          <DeferredChild ready={false} className="beam-child" />
        </BorderBeam>,
      );

      act(() => {
        jest.runAllTimers();
      });

      let rootElement = getRootElement(container);

      expect(rootElement).not.toHaveClass('beam-child');
      expect(rootElement.querySelector('.beam-child')).toBeTruthy();
      expect(rootElement).not.toBe(container.querySelector('.beam-child'));

      rerender(
        <BorderBeam>
          <DeferredChild ready className="beam-child" />
        </BorderBeam>,
      );

      await waitFor(() => {
        rootElement = getRootElement(container);
        expect(rootElement).toHaveClass('beam-child');
        expect(rootElement).toBe(container.querySelector('.beam-child'));
        expect(getBeamElement(container).closest('.ant-border-beam')).toBe(rootElement);
      });
    } finally {
      jest.useRealTimers();
    }
  });

  it('should keep wrapper fallback stable when the same child never exposes a DOM ref', async () => {
    jest.useFakeTimers();

    const WrappedChild = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement> & { label: string }
    >(({ label, ...restProps }, _ref) => <div {...restProps}>{label}</div>);

    try {
      const { container, rerender } = render(
        <BorderBeam>
          <WrappedChild className="beam-child" label="first" />
        </BorderBeam>,
      );

      act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        const rootElement = getRootElement(container);

        expect(rootElement).not.toHaveClass('beam-child');
        expect(rootElement.querySelector('.beam-child')).toBeTruthy();
        expect(rootElement).not.toBe(container.querySelector('.beam-child'));
      });

      rerender(
        <BorderBeam>
          <WrappedChild className="beam-child" label="second" />
        </BorderBeam>,
      );

      let rootElement = getRootElement(container);

      expect(rootElement).not.toHaveClass('beam-child');
      expect(rootElement.querySelector('.beam-child')).toBeTruthy();
      expect(rootElement).not.toBe(container.querySelector('.beam-child'));

      act(() => {
        jest.runOnlyPendingTimers();
      });

      await waitFor(() => {
        rootElement = getRootElement(container);
        expect(rootElement).not.toHaveClass('beam-child');
        expect(rootElement.querySelector('.beam-child')).toBeTruthy();
        expect(rootElement).not.toBe(container.querySelector('.beam-child'));
      });
    } finally {
      jest.useRealTimers();
    }
  });

  it('should fall back to wrapper when the child forwards ref and className but drops injected style', async () => {
    const ClassOnlyChild = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ className }, ref) => (
        <div ref={ref} className={className} data-testid="beam-child">
          content
        </div>
      ),
    );

    const { container, rerender } = render(
      <BorderBeam>
        <ClassOnlyChild />
      </BorderBeam>,
    );

    const assertWrapperFallback = () => {
      const rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('[data-testid="beam-child"]')!;

      expect(rootElement).not.toBe(childElement);
      expect(rootElement.contains(childElement)).toBe(true);
      expect(rootElement.style.getPropertyValue(varName('beam-size'))).not.toBe('');
      expect(childElement.style.getPropertyValue(varName('beam-size'))).toBe('');
    };

    await waitFor(assertWrapperFallback);

    rerender(
      <BorderBeam>
        <ClassOnlyChild />
      </BorderBeam>,
    );

    await waitFor(assertWrapperFallback);
  });

  it.each([
    ['input', <input key="input" className="beam-native" aria-label="name" />],
    ['canvas', <canvas key="canvas" className="beam-native" />],
    [
      'video',
      <video key="video" className="beam-native">
        <track kind="captions" />
      </video>,
    ],
  ])('should fall back to wrapper for native %s that cannot host the beam holder', (_, child) => {
    const { container } = render(<BorderBeam>{child}</BorderBeam>);

    const rootElement = getRootElement(container);
    const nativeElement = container.querySelector<HTMLElement>('.beam-native')!;

    expect(rootElement).not.toBe(nativeElement);
    expect(rootElement.contains(nativeElement)).toBe(true);
    expect(nativeElement.querySelector('.ant-border-beam-holder')).toBeNull();
    expect(getBeamElement(container).parentElement).toBe(rootElement);
  });

  it('should recover direct injection when a polymorphic child changes to an insertable host', async () => {
    const PolymorphicChild = React.forwardRef<
      HTMLElement,
      { asInput: boolean; className?: string; style?: React.CSSProperties }
    >(({ asInput, ...restProps }, ref) =>
      asInput ? (
        <input ref={ref as React.Ref<HTMLInputElement>} data-testid="beam-child" {...restProps} />
      ) : (
        <div ref={ref as React.Ref<HTMLDivElement>} data-testid="beam-child" {...restProps}>
          content
        </div>
      ),
    );

    const { container, rerender } = render(
      <BorderBeam>
        <PolymorphicChild asInput className="beam-child" />
      </BorderBeam>,
    );

    await waitFor(() => {
      const rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('[data-testid="beam-child"]')!;

      expect(rootElement).not.toBe(childElement);
      expect(rootElement.contains(childElement)).toBe(true);
    });

    rerender(
      <BorderBeam>
        <PolymorphicChild asInput={false} className="beam-child" />
      </BorderBeam>,
    );

    await waitFor(() => {
      const rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('[data-testid="beam-child"]')!;

      expect(rootElement).toBe(childElement);
      expect(getBeamElement(container).closest('.ant-border-beam')).toBe(rootElement);
    });
  });

  it('should prefer configured wrapper radius when fallback child cannot receive injected styles', async () => {
    const ClassOnlyChild = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ className }, ref) => (
        <div ref={ref} className={className} data-testid="beam-child">
          content
        </div>
      ),
    );

    const { container } = render(
      <BorderBeam style={{ borderRadius: 18 }}>
        <ClassOnlyChild />
      </BorderBeam>,
    );

    await waitFor(() => {
      const rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('[data-testid="beam-child"]')!;

      expect(rootElement).not.toBe(childElement);
      expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');
    });
  });

  it('should observe wrapper resize when wrapper radius wins in fallback mode', async () => {
    const originResizeObserver = global.ResizeObserver;
    let observedElements: HTMLElement[] = [];

    global.ResizeObserver = class ResizeObserver {
      observe(target: HTMLElement) {
        observedElements.push(target);
      }

      unobserve() {}

      disconnect() {
        observedElements = [];
      }
    };

    const ClassOnlyChild = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ className }, ref) => (
        <div ref={ref} className={className} data-testid="beam-child">
          content
        </div>
      ),
    );

    try {
      const { container } = render(
        <BorderBeam style={{ borderRadius: '50%' }}>
          <ClassOnlyChild />
        </BorderBeam>,
      );

      await waitFor(() => {
        const rootElement = getRootElement(container);
        const childElement = container.querySelector<HTMLElement>('[data-testid="beam-child"]')!;

        expect(rootElement).not.toBe(childElement);
        expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('50%');
        expect(observedElements).toContain(rootElement);
        expect(observedElements).toContain(childElement);
      });
    } finally {
      global.ResizeObserver = originResizeObserver;
    }
  });

  it('should resolve solid, fallback, and gradient colors', () => {
    const { container, rerender } = render(
      <BorderBeam color="#36cfc9">
        <div>content</div>
      </BorderBeam>,
    );

    let element = getRootElement(container);
    let beamGradient = element.style.getPropertyValue(varName('beam-gradient'));

    expect(beamGradient).toContain('#36cfc9');
    expect(beamGradient).toContain('transparent');

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

    beamGradient = element.style.getPropertyValue(varName('beam-gradient'));

    expect(beamGradient).toContain('#1677ff');
    expect(beamGradient).toContain('#36cfc9');
    expect(beamGradient).toContain('#95de64');
    expect(beamGradient).toContain('transparent');
    expect(beamGradient.indexOf('#1677ff')).toBeLessThan(beamGradient.indexOf('#36cfc9'));
    expect(beamGradient.indexOf('#36cfc9')).toBeLessThan(beamGradient.indexOf('#95de64'));

    const stopPercents = Array.from(beamGradient.matchAll(/(\d+(?:\.\d+)?)%/g)).map((match) =>
      Number(match[1]),
    );

    expect(stopPercents).toHaveLength(3);
    expect(stopPercents[0]).toBeGreaterThanOrEqual(0);
    expect(stopPercents[1]).toBeGreaterThan(stopPercents[0]);
    expect(stopPercents[2]).toBeGreaterThan(stopPercents[1]);
    expect(stopPercents[2]).toBeLessThan(100);
  });

  it('should normalize configured border radius values without locking path smoothing details', () => {
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
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).not.toBe('');
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).not.toBe(
      element.style.getPropertyValue(varName('beam-clip-radius')),
    );

    rerender(
      <BorderBeam style={{ borderRadius: '12px / 24px / 36px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).not.toBe('');

    rerender(
      <BorderBeam style={{ borderRadius: '8px 16px 24px 32px 40px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).not.toBe('');

    rerender(
      <BorderBeam style={{ borderRadius: 'var(--beam-radius)' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('var(--beam-radius)');
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe('var(--beam-radius)');
  });

  it('should hide inferred beam until radius inference resolves and reset when falling back again', async () => {
    jest.useFakeTimers();

    const originGetComputedStyle = window.getComputedStyle;
    let resolveRadius = false;
    let currentRadius = '12px';

    window.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
      const style = originGetComputedStyle.call(window, element, pseudoElt);

      if ((element as HTMLElement).classList.contains('beam-child') && resolveRadius) {
        return {
          ...style,
          borderRadius: currentRadius,
          borderTopLeftRadius: currentRadius,
          borderTopRightRadius: currentRadius,
          borderBottomRightRadius: currentRadius,
          borderBottomLeftRadius: currentRadius,
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

      resolveRadius = false;

      rerender(
        <BorderBeam>
          <div className="beam-child">content</div>
        </BorderBeam>,
      );

      expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');
      expect(beamElement.style.display).toBe('none');

      resolveRadius = true;
      currentRadius = '18px';

      act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');
        expect(beamElement.style.display).toBe('');
      });
    } finally {
      window.getComputedStyle = originGetComputedStyle;
      jest.useRealTimers();
    }
  });

  it('should infer child radius from inline styles and longhand computed corners', async () => {
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

      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('8px 16px');
      });

      rerender(
        <BorderBeam>
          <div className="beam-radius-3">content</div>
        </BorderBeam>,
      );

      element = getRootElement(container);
      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('8px 16px 24px');
      });

      rerender(
        <BorderBeam>
          <div className="beam-radius-ellipse">content</div>
        </BorderBeam>,
      );

      element = getRootElement(container);
      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe(
          '8px 16px / 12px 20px',
        );
      });

      rerender(
        <BorderBeam>
          <div style={{ borderRadius: '20px 20px 0px 0px' }}>content</div>
        </BorderBeam>,
      );

      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe(
          '20px 20px 0px 0px',
        );
      });
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

  it('should re-measure inferred radius when ancestor variables change without rerendering BorderBeam', async () => {
    const originGetComputedStyle = window.getComputedStyle;

    window.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
      const style = originGetComputedStyle.call(window, element, pseudoElt);

      if ((element as HTMLElement).classList.contains('beam-child')) {
        const radius = (element as HTMLElement).closest('.radius-large') ? '24px' : '12px';

        return {
          ...style,
          borderRadius: radius,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius,
          borderBottomLeftRadius: radius,
        } as CSSStyleDeclaration;
      }

      return style;
    }) as typeof window.getComputedStyle;

    const StaticBorderBeam = React.memo(() => (
      <BorderBeam>
        <div className="beam-child">content</div>
      </BorderBeam>
    ));

    const Demo = () => {
      const [radiusClassName, setRadiusClassName] = React.useState('radius-small');

      return (
        <>
          <style>
            {`
              .radius-small {
                --beam-radius: 12px;
              }

              .radius-large {
                --beam-radius: 24px;
              }
            `}
          </style>
          <div className={radiusClassName}>
            <StaticBorderBeam />
          </div>
          <button type="button" onClick={() => setRadiusClassName('radius-large')}>
            update
          </button>
        </>
      );
    };

    try {
      const { container, getByRole } = render(<Demo />);
      const element = getRootElement(container);

      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
      });

      fireEvent.click(getByRole('button', { name: 'update' }));

      await waitFor(() => {
        expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('24px');
      });
    } finally {
      window.getComputedStyle = originGetComputedStyle;
    }
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
