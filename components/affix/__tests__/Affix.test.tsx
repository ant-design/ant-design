import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Affix, { AffixProps, AffixState } from '..';
import { getObserverEntities } from '../utils';
import Button from '../../button';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';

const events: any = {};

class AffixMounter extends React.Component<{
  offsetBottom?: number;
  offsetTop?: number;
  onTestUpdatePosition?(): void;
}> {
  private container: HTMLDivElement;

  public affix: Affix;

  componentDidMount() {
    this.container.addEventListener = jest.fn().mockImplementation((event, cb) => {
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

  const domMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
  let affixMounterWrapper: ReactWrapper<unknown, unknown, AffixMounter>;
  let affixWrapper: ReactWrapper<AffixProps, AffixState, Affix>;

  const classRect: any = {
    container: {
      top: 0,
      bottom: 100,
    },
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
    };
    events.scroll({
      type: 'scroll',
    });
    await sleep(20);
  };

  it('Anchor render perfectly', async () => {
    document.body.innerHTML = '<div id="mounter" />';

    affixMounterWrapper = mount(<AffixMounter />, { attachTo: document.getElementById('mounter') });
    await sleep(20);

    await movePlaceholder(0);
    expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeFalsy();

    await movePlaceholder(-100);
    expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeTruthy();

    await movePlaceholder(0);
    expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeFalsy();
  });

  it('support offsetBottom', async () => {
    document.body.innerHTML = '<div id="mounter" />';

    affixMounterWrapper = mount(<AffixMounter offsetBottom={0} />, {
      attachTo: document.getElementById('mounter'),
    });

    await sleep(20);

    await movePlaceholder(300);
    expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeTruthy();

    await movePlaceholder(0);
    expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeFalsy();

    await movePlaceholder(300);
    expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeTruthy();
  });

  it('updatePosition when offsetTop changed', async () => {
    document.body.innerHTML = '<div id="mounter" />';

    affixMounterWrapper = mount(<AffixMounter offsetTop={0} />, {
      attachTo: document.getElementById('mounter'),
    });
    await sleep(20);

    await movePlaceholder(-100);
    expect(affixMounterWrapper.instance().affix.state.affixStyle?.top).toBe(0);
    affixMounterWrapper.setProps({
      offsetTop: 10,
    });
    await sleep(20);
    expect(affixMounterWrapper.instance().affix.state.affixStyle?.top).toBe(10);
  });

  describe('updatePosition when target changed', () => {
    it('function change', () => {
      document.body.innerHTML = '<div id="mounter" />';
      const container = document.querySelector('#id') as HTMLDivElement;
      const getTarget = () => container;
      affixWrapper = mount(<Affix target={getTarget}>{null}</Affix>);
      affixWrapper.setProps({ target: () => null });
      expect(affixWrapper.instance().state.status).toBe(0);
      expect(affixWrapper.instance().state.affixStyle).toBe(undefined);
      expect(affixWrapper.instance().state.placeholderStyle).toBe(undefined);
    });

    it('instance change', async () => {
      const getObserverLength = () => Object.keys(getObserverEntities()).length;

      const container = document.createElement('div');
      document.body.appendChild(container);
      let target: HTMLDivElement | null = container;

      const originLength = getObserverLength();
      const getTarget = () => target;
      affixWrapper = mount(<Affix target={getTarget}>{null}</Affix>);
      await sleep(50);

      expect(getObserverLength()).toBe(originLength + 1);
      target = null;
      affixWrapper.setProps({});
      affixWrapper.update();
      await sleep(50);
      expect(getObserverLength()).toBe(originLength);
    });
  });

  describe('updatePosition when size changed', () => {
    function test(name: string, index: number) {
      it(name, async () => {
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
        expect(affixMounterWrapper.instance().affix.state.affixStyle).toBeTruthy();
        await sleep(20);
        affixMounterWrapper.update();

        // Mock trigger resize
        updateCalled.mockReset();
        (affixMounterWrapper.find('ResizeObserver').at(index).instance() as any).onResize([
          { target: { getBoundingClientRect: () => ({ width: 99, height: 99 }) } },
        ]);
        await sleep(20);

        expect(updateCalled).toHaveBeenCalled();
      });
    }

    test('inner', 0);
    test('outer', 1);
  });
});
