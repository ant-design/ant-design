import React from 'react';

import BorderBeam from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, render, waitFor } from '../../../tests/utils';
import ConfigProvider, { defaultPrefixCls } from '../../config-provider';
import { genCssVar } from '../../theme/util/genStyleUtils';

describe('BorderBeam', () => {
  mountTest(() => <BorderBeam>content</BorderBeam>);
  rtlTest(() => <BorderBeam>content</BorderBeam>);

  const [varName] = genCssVar(defaultPrefixCls, 'border-beam');
  const getRootElement = (container: HTMLElement) =>
    container.querySelector<HTMLElement>('.ant-border-beam')!;
  const getBeamElement = (container: HTMLElement) =>
    container.querySelector<HTMLElement>('.ant-border-beam-beam')!;

  it('should inject into child when the host already provides a containing block', () => {
    const { container } = render(
      <BorderBeam className="beam-root">
        <div className="beam-child" style={{ position: 'relative' }}>
          content
        </div>
      </BorderBeam>,
    );

    const rootElement = getRootElement(container);
    const childElement = container.querySelector<HTMLElement>('.beam-child');
    const beamElement = getBeamElement(container);

    expect(rootElement).toHaveClass('beam-root');
    expect(rootElement).toBe(childElement);
    expect(beamElement.closest('.ant-border-beam')).toBe(rootElement);
    expect(beamElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('should fall back to wrapper when the child host is statically positioned', async () => {
    const { container } = render(
      <BorderBeam className="beam-root">
        <div className="beam-child">content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      const rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('.beam-child');

      expect(rootElement).not.toBe(childElement);
      expect(rootElement).toHaveClass('ant-border-beam-wrapper');
    });
  });

  it('should render wrapper mode for plain text children', () => {
    const { container } = render(<BorderBeam>content</BorderBeam>);

    const rootElement = getRootElement(container);
    const beamElement = getBeamElement(container);

    expect(rootElement.tagName).toBe('DIV');
    expect(rootElement).toHaveTextContent('content');
    expect(beamElement.parentElement).toBe(rootElement);
  });

  it('should support ConfigProvider common className and style', () => {
    const { container } = render(
      <ConfigProvider borderBeam={{ className: 'context-root', style: { padding: 6 } }}>
        <BorderBeam>
          <div>content</div>
        </BorderBeam>
      </ConfigProvider>,
    );

    const rootElement = getRootElement(container);

    expect(rootElement).toHaveClass('context-root');
    expect(rootElement).toHaveStyle({ padding: '6px' });
  });

  it('should decide wrapper fallback once when the child ref never resolves', async () => {
    jest.useFakeTimers();

    const DeferredChild = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement> & { ready: boolean }
    >(({ ready, ...restProps }, ref) => <div ref={ready ? ref : undefined} {...restProps} />);

    try {
      const { container, rerender } = render(
        <BorderBeam>
          <DeferredChild ready={false} className="beam-child" />
        </BorderBeam>,
      );

      act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        const rootElement = getRootElement(container);
        const childElement = container.querySelector<HTMLElement>('.beam-child')!;

        expect(rootElement).not.toBe(childElement);
        expect(getBeamElement(container).parentElement).toBe(rootElement);
      });

      rerender(
        <BorderBeam>
          <DeferredChild ready className="beam-child" />
        </BorderBeam>,
      );

      await waitFor(() => {
        const rootElement = getRootElement(container);
        const childElement = container.querySelector<HTMLElement>('.beam-child')!;

        expect(rootElement).not.toBe(childElement);
        expect(getBeamElement(container).parentElement).toBe(rootElement);
      });
    } finally {
      jest.useRealTimers();
    }
  });

  it('should fall back to wrapper when a custom child renders an unsupported host', async () => {
    const InputChild = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
      (props, ref) => <input ref={ref} data-testid="beam-input" {...props} />,
    );

    const { container } = render(
      <BorderBeam>
        <InputChild className="beam-input" aria-label="name" />
      </BorderBeam>,
    );

    await waitFor(() => {
      const rootElement = getRootElement(container);
      const inputElement = container.querySelector<HTMLElement>('[data-testid="beam-input"]')!;

      expect(rootElement).not.toBe(inputElement);
      expect(rootElement.contains(inputElement)).toBe(true);
      expect(inputElement.querySelector('.ant-border-beam-holder')).toBeNull();
    });
  });

  it('should fall back to wrapper when the child drops injected styles and infer radius once', async () => {
    const RadiusChild = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ className }, ref) => (
        <div
          ref={ref}
          className={className}
          data-testid="beam-child"
          style={{ position: 'relative', borderRadius: 12 }}
        >
          content
        </div>
      ),
    );

    const { container } = render(
      <BorderBeam>
        <RadiusChild />
      </BorderBeam>,
    );

    await waitFor(() => {
      const rootElement = getRootElement(container);
      const childElement = container.querySelector<HTMLElement>('[data-testid="beam-child"]')!;

      expect(rootElement).not.toBe(childElement);
      expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
      expect(childElement.style.getPropertyValue(varName('beam-size'))).toBe('');
    });
  });

  it('should prefer explicit wrapper radius once wrapper mode is chosen', async () => {
    const RadiusChild = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ className }, ref) => (
        <div
          ref={ref}
          className={className}
          data-testid="beam-child"
          style={{ borderRadius: 12 }}
        >
          content
        </div>
      ),
    );

    const { container } = render(
      <BorderBeam style={{ borderRadius: 18 }}>
        <RadiusChild />
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(getRootElement(container).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
        '18px',
      );
    });

    const { container: cssVarContainer } = render(
      <BorderBeam style={{ borderRadius: 'var(--beam-radius)' }}>
        <RadiusChild />
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(
        getRootElement(cssVarContainer).style.getPropertyValue(varName('beam-clip-radius')),
      ).toBe('var(--beam-radius)');
    });
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
    const { container: singleContainer } = render(
      <BorderBeam style={{ borderRadius: ' 18px ' }}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = getRootElement(singleContainer);

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');

    const { container: dualContainer } = render(
      <BorderBeam style={{ borderRadius: '8px 16px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(getRootElement(dualContainer).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
      '8px 16px',
    );

    const { container: tripleContainer } = render(
      <BorderBeam style={{ borderRadius: '8px 16px 24px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(
      getRootElement(tripleContainer).style.getPropertyValue(varName('beam-clip-radius')),
    ).toBe('8px 16px 24px');

    const { container: ellipticalContainer } = render(
      <BorderBeam style={{ borderRadius: '8px 16px / 20px 24px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(getRootElement(ellipticalContainer).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
      '8px 16px / 20px 24px',
    );

    const { container: blankContainer } = render(
      <BorderBeam style={{ borderRadius: '   ' }}>
        <div>content</div>
      </BorderBeam>,
    );
    expect(getRootElement(blankContainer).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
      '0px',
    );

    const { container: numericContainer } = render(
      <BorderBeam style={{ borderRadius: 18 }}>
        <div>content</div>
      </BorderBeam>,
    );
    const numericElement = getRootElement(numericContainer);

    expect(numericElement.style.borderRadius).toBe('18px');
    expect(numericElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');
    expect(numericElement.style.getPropertyValue(varName('beam-path-radius'))).not.toBe('');
    expect(numericElement.style.getPropertyValue(varName('beam-path-radius'))).not.toBe(
      numericElement.style.getPropertyValue(varName('beam-clip-radius')),
    );

    const { container: invalidSlashContainer } = render(
      <BorderBeam style={{ borderRadius: '12px / 24px / 36px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    const invalidSlashElement = getRootElement(invalidSlashContainer);
    expect(invalidSlashElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');
    expect(invalidSlashElement.style.getPropertyValue(varName('beam-path-radius'))).not.toBe('');

    const { container: overflowContainer } = render(
      <BorderBeam style={{ borderRadius: '8px 16px 24px 32px 40px' }}>
        <div>content</div>
      </BorderBeam>,
    );
    const overflowElement = getRootElement(overflowContainer);
    expect(overflowElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('0px');
    expect(overflowElement.style.getPropertyValue(varName('beam-path-radius'))).not.toBe('');

    const { container: cssVarContainer } = render(
      <BorderBeam style={{ borderRadius: 'var(--beam-radius)' }}>
        <div>content</div>
      </BorderBeam>,
    );
    const cssVarElement = getRootElement(cssVarContainer);
    expect(cssVarElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe(
      'var(--beam-radius)',
    );
    expect(cssVarElement.style.getPropertyValue(varName('beam-path-radius'))).toBe(
      'var(--beam-radius)',
    );
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
      const { container } = render(
        <BorderBeam>
          <div style={{ borderRadius: 12 }}>content</div>
        </BorderBeam>,
      );

      const element = getRootElement(container);

      expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');

      const { container: twoTokenContainer } = render(
        <BorderBeam>
          <div className="beam-radius-2">content</div>
        </BorderBeam>,
      );

      await waitFor(() => {
        expect(getRootElement(twoTokenContainer).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
          '8px 16px',
        );
      });

      const { container: threeTokenContainer } = render(
        <BorderBeam>
          <div className="beam-radius-3">content</div>
        </BorderBeam>,
      );

      await waitFor(() => {
        expect(
          getRootElement(threeTokenContainer).style.getPropertyValue(varName('beam-clip-radius')),
        ).toBe('8px 16px 24px');
      });

      const { container: ellipseContainer } = render(
        <BorderBeam>
          <div className="beam-radius-ellipse">content</div>
        </BorderBeam>,
      );

      await waitFor(() => {
        expect(getRootElement(ellipseContainer).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
          '8px 16px / 12px 20px',
        );
      });

      const { container: fourTokenContainer } = render(
        <BorderBeam>
          <div style={{ borderRadius: '20px 18px 12px 6px' }}>content</div>
        </BorderBeam>,
      );

      await waitFor(() => {
        expect(getRootElement(fourTokenContainer).style.getPropertyValue(varName('beam-clip-radius'))).toBe(
          '20px 18px 12px 6px',
        );
      });
    } finally {
      window.getComputedStyle = originGetComputedStyle;
    }
  });

  it('should delay beam display until radius becomes measurable on the next frame', async () => {
    jest.useFakeTimers();

    const originGetComputedStyle = window.getComputedStyle;
    let measureCount = 0;

    window.getComputedStyle = ((element: Element, pseudoElt?: string | null) => {
      const style = originGetComputedStyle.call(window, element, pseudoElt);

      if ((element as HTMLElement).classList.contains('beam-child')) {
        if (measureCount < 2) {
          measureCount += 1;

          return {
            ...style,
            position: 'relative',
            borderRadius: '',
            borderTopLeftRadius: '',
            borderTopRightRadius: '',
            borderBottomRightRadius: '',
            borderBottomLeftRadius: '',
          } as CSSStyleDeclaration;
        }

        return {
          ...style,
          position: 'relative',
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
          <div className="beam-child" style={{ position: 'relative' }}>
            content
          </div>
        </BorderBeam>,
      );

      const rootElement = getRootElement(container);
      const beamElement = getBeamElement(container);

      act(() => {
        jest.runAllTimers();
      });

      await waitFor(() => {
        expect(beamElement.style.display).toBe('');
        expect(rootElement.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
      });
    } finally {
      window.getComputedStyle = originGetComputedStyle;
      jest.useRealTimers();
    }
  });

  it('should hide the beam when the border width token is zero', async () => {
    const { container } = render(
      <ConfigProvider theme={{ components: { BorderBeam: { borderBeamWidth: 0 } } }}>
        <BorderBeam>
          <div style={{ borderRadius: 12 }}>content</div>
        </BorderBeam>
      </ConfigProvider>,
    );

    await waitFor(() => {
      expect(getBeamElement(container).style.display).toBe('none');
    });
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
