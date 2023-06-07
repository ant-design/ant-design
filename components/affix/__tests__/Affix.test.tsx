import type { CSSProperties } from 'react';
import React, { useEffect, useRef } from 'react';
import Affix from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';

const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};

interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  style?: CSSProperties;
  onChange?: () => void;
}

const AffixMounter: React.FC<AffixProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (container.current) {
      container.current.addEventListener = vi
        .fn()
        .mockImplementation((event: keyof HTMLElementEventMap, cb: (ev: Event) => void) => {
          events[event] = cb;
        });
    }
  }, []);
  return (
    <div ref={container} className="container">
      <Affix className="fixed" target={() => container.current} {...props}>
        <Button>Fixed at the top of container</Button>
      </Affix>
    </div>
  );
};

describe('Affix Render', () => {
  rtlTest(Affix);
  accessibilityTest(Affix);

  const domMock = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

  const classRect: Record<string, DOMRect> = { container: { top: 0, bottom: 100 } as DOMRect };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  beforeAll(() => {
    domMock.mockImplementation(function fn(this: HTMLElement) {
      return classRect[this.className] || { top: 0, bottom: 0 };
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  afterAll(() => {
    domMock.mockRestore();
  });

  const movePlaceholder = async (top: number) => {
    classRect.fixed = { top, bottom: top } as DOMRect;
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
    render(
      <Affix target={() => null}>
        <span>test</span>
      </Affix>,
    );
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
    const onChange = vi.fn();

    const { container, rerender } = render(<AffixMounter offsetTop={0} onChange={onChange} />);
    await waitFakeTimer();

    await movePlaceholder(-100);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: 0 });

    rerender(<AffixMounter offsetTop={10} onChange={onChange} />);
    await waitFakeTimer();
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: `10px` });
  });

  describe('updatePosition when target changed', () => {
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
      expect(container.querySelector('.ant-affix')).toBeTruthy();
    });
  });
});
