import type { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import React from 'react';
import type { AffixProps, AffixState, InternalAffixClass } from '..';
import Affix from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, sleep } from '../../../tests/utils';
import Button from '../../button';
import { getObserverEntities } from '../utils';

const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};

class AffixMounter extends React.Component<{
  offsetBottom?: number;
  offsetTop?: number;
  onTestUpdatePosition?(): void;
  onChange?: () => void;
}> {
  private container: HTMLDivElement;

  public affix: React.Component<AffixProps, AffixState>;

  componentDidMount() {
    this.container.addEventListener = jest
      .fn()
      .mockImplementation((event: keyof HTMLElementEventMap, cb: (ev: Partial<Event>) => void) => {
        events[event] = cb;
      });
  }

  getTarget = () => this.container;

  render() {
    return (
      <div
        ref={node => {
          this.container = node!;
        }}
        className="container"
      >
        <Affix
          className="fixed"
          target={this.getTarget}
          ref={ele => {
            this.affix = ele!;
          }}
          {...this.props}
        >
          <Button type="primary">Fixed at the top of container</Button>
        </Affix>
      </div>
    );
  }
}

describe('Affix Render', () => {
  rtlTest(Affix);
  accessibilityTest(Affix);

  const domMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
  let affixMounterWrapper: ReactWrapper<unknown, unknown, AffixMounter>;

  const classRect: Record<string, DOMRect> = {
    container: {
      top: 0,
      bottom: 100,
    } as DOMRect,
  };

  beforeAll(() => {
    domMock.mockImplementation(function fn(this: HTMLElement) {
      return (
        classRect[this.className] || {
          top: 0,
          bottom: 0,
        }
      );
    });
  });

  afterAll(() => {
    domMock.mockRestore();
  });

  const movePlaceholder = async (top: number) => {
    classRect.fixed = {
      top,
      bottom: top,
    } as DOMRect;
    if (events.scroll == null) {
      throw new Error('scroll should be set');
    }
    events.scroll({
      type: 'scroll',
    });
    await sleep(20);
  };

  it('Anchor render perfectly', async () => {
    const { container } = render(<AffixMounter />);
    await sleep(20);

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();

    await movePlaceholder(-100);
    expect(container.querySelector('.ant-affix')).toBeTruthy();

    await movePlaceholder(0);
    expect(container.querySelector('.ant-affix')).toBeFalsy();
  });

  it('support offsetBottom', async () => {
    const { container } = render(<AffixMounter offsetBottom={0} />);

    await sleep(20);

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
    await sleep(20);

    await movePlaceholder(-100);
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: 0 });

    rerender(<AffixMounter offsetTop={10} onChange={onChange} />);
    await sleep(20);
    expect(container.querySelector('.ant-affix')).toHaveStyle({ top: `10px` });
  });

  describe('updatePosition when target changed', () => {
    it('function change', async () => {
      document.body.innerHTML = '<div id="mounter" />';
      const container = document.querySelector('#id') as HTMLDivElement;
      const getTarget = () => container;
      let affixInstance: InternalAffixClass;
      const { rerender } = render(
        <Affix
          ref={node => {
            affixInstance = node as InternalAffixClass;
          }}
          target={getTarget}
        >
          {null}
        </Affix>,
      );
      rerender(
        <Affix
          ref={node => {
            affixInstance = node as InternalAffixClass;
          }}
          target={() => null}
        >
          {null}
        </Affix>,
      );
      expect(affixInstance!.state.status).toBe(0);
      expect(affixInstance!.state.affixStyle).toBe(undefined);
      expect(affixInstance!.state.placeholderStyle).toBe(undefined);
      await sleep(100);
    });

    it('instance change', async () => {
      const getObserverLength = () => Object.keys(getObserverEntities()).length;

      const container = document.createElement('div');
      document.body.appendChild(container);
      let target: HTMLDivElement | null = container;

      const originLength = getObserverLength();
      const getTarget = () => target;
      const { rerender } = render(<Affix target={getTarget}>{null}</Affix>);
      await sleep(100);

      expect(getObserverLength()).toBe(originLength + 1);
      target = null;
      rerender(<Affix>{null}</Affix>);
      await sleep(100);
      expect(getObserverLength()).toBe(originLength);
    });
  });

  describe('updatePosition when size changed', () => {
    it.each([
      { name: 'inner', index: 0 },
      { name: 'outer', index: 1 },
    ])('inner or outer', async ({ index }) => {
      document.body.innerHTML = '<div id="mounter" />';

      const updateCalled = jest.fn();
      affixMounterWrapper = mount(
        <AffixMounter offsetBottom={0} onTestUpdatePosition={updateCalled} />,
        {
          attachTo: document.getElementById('mounter'),
        },
      );

      await sleep(20);

      await movePlaceholder(300);
      expect(
        (affixMounterWrapper.find(AffixMounter).instance() as any).affix.state.affixStyle,
      ).toBeTruthy();
      await sleep(20);
      affixMounterWrapper.update();

      // Mock trigger resize
      updateCalled.mockReset();
      (affixMounterWrapper as any).triggerResize(index);
      await sleep(20);

      expect(updateCalled).toHaveBeenCalled();
    });
  });
});
