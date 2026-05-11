import React from 'react';

import BorderBeam from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFor } from '../../../tests/utils';
import ConfigProvider, { defaultPrefixCls } from '../../config-provider';
import { genCssVar } from '../../theme/util/genStyleUtils';

describe('BorderBeam', () => {
  mountTest(() => <BorderBeam>content</BorderBeam>);
  rtlTest(() => <BorderBeam>content</BorderBeam>);

  const [varName] = genCssVar(defaultPrefixCls, 'border-beam');
  const getBeamElement = (container: HTMLElement) =>
    container.querySelector<HTMLElement>('.ant-border-beam')!;

  it('should inject the beam effect into the child host', async () => {
    const { container } = render(
      <BorderBeam className="beam-root">
        <div className="beam-child" style={{ position: 'relative' }}>
          content
        </div>
      </BorderBeam>,
    );

    await waitFor(() => {
      const beamElement = getBeamElement(container);
      const childElement = container.querySelector<HTMLElement>('.beam-child')!;

      expect(beamElement).toHaveClass('beam-root');
      expect(beamElement.parentElement).toBe(childElement);
      expect(childElement).not.toHaveClass('ant-border-beam');
      expect(beamElement).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should still inject into child when the child host is statically positioned', async () => {
    const { container } = render(
      <BorderBeam className="beam-root">
        <div className="beam-child">content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      const beamElement = getBeamElement(container);
      const childElement = container.querySelector<HTMLElement>('.beam-child')!;

      expect(beamElement).toHaveClass('ant-border-beam');
      expect(beamElement.parentElement).toBe(childElement);
    });
  });

  it('should skip decoration for plain text children', () => {
    const { container } = render(<BorderBeam>content</BorderBeam>);

    expect(container).toHaveTextContent('content');
    expect(container.querySelector('.ant-border-beam')).toBeFalsy();
  });

  it('should skip decoration when the child cannot hold a DOM ref', () => {
    const FunctionChild = () => <div className="beam-child">content</div>;

    const { container } = render(
      <BorderBeam>
        <FunctionChild />
      </BorderBeam>,
    );

    expect(container.querySelector('.beam-child')).toBeTruthy();
    expect(container.querySelector('.ant-border-beam')).toBeFalsy();
  });

  it('should skip decoration when the resolved host is not HTMLElement', async () => {
    const { container } = render(
      <BorderBeam>
        <svg data-testid="beam-svg" />
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(container.querySelector('[data-testid="beam-svg"]')).toBeTruthy();
      expect(container.querySelector('.ant-border-beam')).toBeFalsy();
    });
  });

  it('should support component and ConfigProvider common className and style', async () => {
    const { container } = render(
      <ConfigProvider
        borderBeam={{
          className: 'context-root',
          style: { opacity: 0.5, padding: 6 },
        }}
      >
        <BorderBeam className="beam-root" style={{ opacity: 0.8 }}>
          <div>
            <span>content</span>
          </div>
        </BorderBeam>
      </ConfigProvider>,
    );

    await waitFor(() => {
      const beamElement = getBeamElement(container);

      expect(beamElement).toHaveClass('context-root');
      expect(beamElement).toHaveClass('beam-root');
      expect(beamElement).toHaveStyle({ opacity: '0.8', padding: '6px' });
    });
  });

  it('should infer border width and support customizing the inset offset', async () => {
    const { container, rerender } = render(
      <BorderBeam>
        <div style={{ border: '2px solid red' }}>content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(getBeamElement(container).style.getPropertyValue(varName('inset-offset'))).toBe(
        '-2px -2px -2px -2px',
      );
    });

    rerender(
      <BorderBeam outset={4}>
        <div style={{ border: '2px solid red' }}>content</div>
      </BorderBeam>,
    );

    expect(getBeamElement(container).style.getPropertyValue(varName('inset-offset'))).toBe('-4px');

    rerender(
      <BorderBeam outset="2em">
        <div style={{ border: '2px solid red' }}>content</div>
      </BorderBeam>,
    );

    expect(getBeamElement(container).style.getPropertyValue(varName('inset-offset'))).toBe(
      'calc(-1 * 2em)',
    );
  });

  it('should infer child border radius from computed style', async () => {
    const { container } = render(
      <BorderBeam>
        <div style={{ borderRadius: 12 }}>content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(getBeamElement(container).style.getPropertyValue(varName('border-radius'))).toBe(
        '12px',
      );
    });

    const { container: cssVarContainer } = render(
      <BorderBeam>
        <div style={{ borderRadius: 'var(--beam-radius)' }}>content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(getBeamElement(cssVarContainer).style.getPropertyValue(varName('border-radius'))).toBe(
        'var(--beam-radius)',
      );
    });
  });

  it('should resolve solid and gradient colors', async () => {
    const { container, rerender } = render(
      <BorderBeam color="#36cfc9">
        <div>content</div>
      </BorderBeam>,
    );

    await waitFor(() => {
      expect(getBeamElement(container).style.getPropertyValue(varName('beam-gradient'))).toBe(
        'linear-gradient(to left, #36cfc9 0%, #36cfc9 70%, transparent)',
      );
    });

    rerender(
      <BorderBeam>
        <div>content</div>
      </BorderBeam>,
    );

    expect(getBeamElement(container).style.getPropertyValue(varName('beam-gradient'))).toBe('');

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

    const beamGradient = getBeamElement(container).style.getPropertyValue(varName('beam-gradient'));

    expect(beamGradient).toBe(
      'linear-gradient(to left, #1677ff 0%, #36cfc9 38.5%, #95de64 70%, transparent)',
    );
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
