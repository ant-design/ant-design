import React from 'react';

import BorderBeam from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFor } from '../../../tests/utils';
import ConfigProvider, { defaultPrefixCls } from '../../config-provider';
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

    expect(container.querySelector('.beam-root')).toHaveClass('ant-border-beam');
    expect(container.querySelector('.ant-border-beam .beam-child')).toBeTruthy();
    expect(container.querySelector('.ant-border-beam-beam')).toHaveAttribute('aria-hidden', 'true');
  });

  it('should support color shortcut and numeric props', () => {
    const { container } = render(
      <BorderBeam color="#ff4d4f" borderWidth={2} duration={4} delay={1.5} size={72}>
        content
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-color-from'))).toBe('#ff4d4f');
    expect(element.style.getPropertyValue(varName('beam-color-to'))).toBe('#ff4d4f');
    expect(element.style.getPropertyValue(varName('border-width'))).toBe('2px');
    expect(element.style.getPropertyValue(varName('beam-duration'))).toBe('4s');
    expect(element.style.getPropertyValue(varName('beam-delay'))).toBe('1.5s');
    expect(element.style.getPropertyValue(varName('beam-size'))).toBe('72px');
  });

  it('should support component tokens as default beam values', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          components: {
            BorderBeam: {
              beamColorFrom: '#135200',
              beamColorTo: '#36cfc9',
              borderBeamWidth: 3,
            },
          },
        }}
      >
        <BorderBeam>content</BorderBeam>
      </ConfigProvider>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-color-from'))).toBe('#135200');
    expect(element.style.getPropertyValue(varName('beam-color-to'))).toBe('#36cfc9');
    expect(element.style.getPropertyValue(varName('border-width'))).toBe('3px');
  });

  it('should reverse beam direction when reverse is enabled', () => {
    const { container, rerender } = render(
      <BorderBeam offset={25}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;
    const getOffsets = () => ({
      end: Number.parseFloat(element.style.getPropertyValue(varName('beam-offset-end'))),
      start: Number.parseFloat(element.style.getPropertyValue(varName('beam-offset-start'))),
    });

    expect(getOffsets().start).toBeLessThan(getOffsets().end);

    rerender(
      <BorderBeam offset={25} reverse>
        <div>content</div>
      </BorderBeam>,
    );

    expect(getOffsets().start).toBeGreaterThan(getOffsets().end);
  });

  it('should prefer pathRadius over inferred child radius', () => {
    const { container } = render(
      <BorderBeam pathRadius={24} size={10}>
        <div style={{ borderRadius: 12 }}>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.borderRadius).toBe('');
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe('24px');
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('24px');
  });

  it('should treat style borderRadius as track configuration without applying it to root', () => {
    const { container } = render(
      <BorderBeam size={10} style={{ borderRadius: 18 }}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.borderRadius).toBe('');
    expect(element.style.getPropertyValue(varName('beam-path-radius'))).toBe('18px');
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');
  });

  it('should infer radius from the first child when pathRadius is not provided', () => {
    const { container } = render(
      <BorderBeam>
        <div style={{ borderRadius: 12 }}>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe('12px');
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

  it('should support non-uniform pathRadius values', () => {
    const radius = '20px 20px 0px 0px';
    const { container } = render(
      <BorderBeam pathRadius={radius}>
        <div>content</div>
      </BorderBeam>,
    );

    const element = container.querySelector<HTMLElement>('.ant-border-beam')!;

    expect(element.style.borderRadius).toBe('');
    expect(element.style.getPropertyValue(varName('beam-clip-radius'))).toBe(radius);
  });
});
