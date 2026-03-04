import React, { useEffect, useRef } from 'react';

import Affix from '..';
import { accessibilityTest } from '../../../tests/shared/accessibilityTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, triggerResize, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import ConfigProvider from '../../config-provider';

const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};

interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  style?: React.CSSProperties;
  onChange?: () => void;
  onTestUpdatePosition?: () => void;
}

const AffixMounter: React.FC<AffixProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener = jest
        .fn()
        .mockImplementation((event: keyof HTMLElementEventMap, cb: (ev: Event) => void) => {
          (events as any)[event] = cb;
        });
    }
  }, []);
  return (
    <div ref={containerRef} className="container">
      <Affix className="placeholder" target={() => containerRef.current} {...props}>
        <Button type="primary">Fixed at the top of container</Button>
      </Affix>
    </div>
  );
};

describe('Affix Render', () => {
  mountTest(() => <Affix>test</Affix>);
  rtlTest(() => <Affix>test</Affix>);
  accessibilityTest(() => <Affix>test</Affix>);

  const domMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

  const classRect: Record<string, DOMRect> = { container: { top: 0, bottom: 100 } as DOMRect };

  beforeAll(() => {
    domMock.mockImplementation(function fn(this: HTMLElement) {
      return classRect[this.className] || { top: 0, bottom: 0 };
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  afterAll(() => {
    domMock.mockRestore();
  });

  const movePlaceholder = async (top: number) => {
    classRect.placeholder = { top, bottom: top } as DOMRect;
    if (events.scroll == null) {
      throw new Error('scroll should be set');
    }
    events.scroll({ type: 'scroll' });
    await waitFakeTimer();
  };

  it('Anchor render perfectly', async () => {
    const { container } = render(<AffixMounter />);
    await waitFakeTimer();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();

    await movePlaceholder(-100);
    expect(container.querySelector('.ant-affix')).toBeTruthy();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();
  });

  it('Anchor correct render when target is null', async () => {
    render(<Affix target={() => null}>test</Affix>);
    await waitFakeTimer();
  });

  it('support offsetBottom', async () => {
    const { container } = render(<AffixMounter offsetBottom={0} />);

    await waitFakeTimer();

    await movePlaceholder(300);
    expect(container.querySelector('.ant-affix')).toBeTruthy();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();

    await movePlaceholder(300);
    expect(container.querySelector('.ant-affix')).toBeTruthy();
  });

  it('updatePosition when offsetTop changed', async () => {
    const onChange = jest.fn();

    const { container, rerender } = render(<AffixMounter offsetTop={0} onChange={onChange} />);
    await waitFakeTimer();

    await movePlaceholder(-100);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: 0 });

    await movePlaceholder(100);
    expect(onChange).toHaveBeenLastCalledWith(false);

    await movePlaceholder(-100);
    expect(onChange).toHaveBeenLastCalledWith(true);

    rerender(<AffixMounter offsetTop={10} onChange={onChange} />);
    await waitFakeTimer();
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: `10px` });
  });

  describe('updatePosition when target changed', () => {
    it('function change', () => {
      document.body.innerHTML = `<div id="mounter" />`;
      const target = document.getElementById('mounter');
      const getTarget = () => target;
      const { container, rerender } = render(<Affix target={getTarget}>{null}</Affix>);
      rerender(<Affix target={() => null}>{null}</Affix>);
      expect(container.querySelector(`div[aria-hidden="true"]`)).toBeNull();
      expect(container.querySelector('.ant-affix')?.getAttribute('style')).toBeUndefined();
    });

    it('check position change before measure', async () => {
      const { container } = render(
        <>
          <Affix offsetTop={10}>
            <Button>top</Button>
          </Affix>
          <Affix offsetBottom={10}>
            <Button>bottom</Button>
          </Affix>
        </>,
      );
      await waitFakeTimer();
      await movePlaceholder(1000);
      expect(container.querySelector<HTMLDivElement>('.ant-affix')).toBeTruthy();
    });

    it('do not measure when hidden', async () => {
      const { container, rerender } = render(<AffixMounter offsetBottom={0} />);
      await waitFakeTimer();
      const affixStyleEle = container.querySelector('.ant-affix');
      const firstAffixStyle = affixStyleEle ? affixStyleEle.getAttribute('style') : null;

      rerender(<AffixMounter offsetBottom={0} style={{ display: 'none' }} />);
      await waitFakeTimer();
      const secondAffixStyle = affixStyleEle ? affixStyleEle.getAttribute('style') : null;

      expect(firstAffixStyle).toEqual(secondAffixStyle);
    });
  });

  describe('updatePosition when size changed', () => {
    it('add class automatically', async () => {
      document.body.innerHTML = '<div id="mounter" />';

      const { container } = render(<AffixMounter offsetBottom={0} />, {
        container: document.getElementById('mounter')!,
      });

      await waitFakeTimer();
      await movePlaceholder(300);
      expect(container.querySelector(`div[aria-hidden="true"]`)).toBeTruthy();
      expect(container.querySelector('.ant-affix')?.getAttribute('style')).toBeTruthy();
    });

    // Trigger inner and outer element for the two <ResizeObserver>s.
    ['.ant-btn', '.placeholder'].forEach((selector) => {
      it(`trigger listener when size change: ${selector}`, async () => {
        const updateCalled = jest.fn();
        const { container } = render(
          <AffixMounter offsetBottom={0} onTestUpdatePosition={updateCalled} />,
          { container: document.getElementById('mounter')! },
        );

        updateCalled.mockReset();
        triggerResize(container.querySelector(selector)!);

        await waitFakeTimer();

        expect(updateCalled).toHaveBeenCalled();
      });
    });
  });
  it('should apply custom style to Affix', () => {
    const { container } = render(
      <ConfigProvider
        affix={{ className: 'custom-config-affix', style: { color: 'rgb(255, 0, 0)' } }}
      >
        <Affix className="custom-affix" offsetTop={10}>
          <Button>top</Button>
        </Affix>
      </ConfigProvider>,
    );
    const affixElement = container.querySelector<HTMLElement>('.custom-affix');
    expect(affixElement).toHaveClass('custom-config-affix');
    expect(affixElement).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});
