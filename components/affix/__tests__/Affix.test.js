import React from 'react';
import { mount } from 'enzyme';
import Affix from '..';
import { getObserverEntities } from '../utils';
import Button from '../../button';
import { spyElementPrototype } from '../../__tests__/util/domHook';

const events = {};

class AffixMounter extends React.Component {
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
          this.container = node;
        }}
        className="container"
      >
        <Affix
          className="fixed"
          target={this.getTarget}
          ref={ele => {
            this.affix = ele;
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
  let wrapper;
  let domMock;

  const classRect = {
    container: {
      top: 0,
      bottom: 100,
    },
  };

  beforeAll(() => {
    jest.useFakeTimers();
    domMock = spyElementPrototype(HTMLElement, 'getBoundingClientRect', function mockBounding() {
      return (
        classRect[this.className] || {
          top: 0,
          bottom: 0,
        }
      );
    });
  });

  afterAll(() => {
    jest.useRealTimers();
    domMock.mockRestore();
  });
  const movePlaceholder = top => {
    classRect.fixed = {
      top,
      bottom: top,
    };
    events.scroll({
      type: 'scroll',
    });
    jest.runAllTimers();
  };

  it('Anchor render perfectly', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter />, { attachTo: document.getElementById('mounter') });
    jest.runAllTimers();

    movePlaceholder(0);
    expect(wrapper.instance().affix.state.affixStyle).toBeFalsy();

    movePlaceholder(-100);
    expect(wrapper.instance().affix.state.affixStyle).toBeTruthy();

    movePlaceholder(0);
    expect(wrapper.instance().affix.state.affixStyle).toBeFalsy();
  });

  it('support offsetBottom', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter offsetBottom={0} />, {
      attachTo: document.getElementById('mounter'),
    });

    jest.runAllTimers();

    movePlaceholder(300);
    expect(wrapper.instance().affix.state.affixStyle).toBeTruthy();

    movePlaceholder(0);
    expect(wrapper.instance().affix.state.affixStyle).toBeFalsy();

    movePlaceholder(300);
    expect(wrapper.instance().affix.state.affixStyle).toBeTruthy();
  });

  it('updatePosition when offsetTop changed', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter offsetTop={0} />, {
      attachTo: document.getElementById('mounter'),
    });
    jest.runAllTimers();

    movePlaceholder(-100);
    expect(wrapper.instance().affix.state.affixStyle.top).toBe(0);
    wrapper.setProps({
      offsetTop: 10,
    });
    jest.runAllTimers();
    expect(wrapper.instance().affix.state.affixStyle.top).toBe(10);
  });

  describe('updatePosition when target changed', () => {
    it('function change', () => {
      document.body.innerHTML = '<div id="mounter" />';
      const container = document.querySelector('#id');
      const getTarget = () => container;
      wrapper = mount(<Affix target={getTarget} />);
      wrapper.setProps({ target: null });
      expect(wrapper.instance().state.status).toBe(0);
      expect(wrapper.instance().state.affixStyle).toBe(undefined);
      expect(wrapper.instance().state.placeholderStyle).toBe(undefined);
    });

    it('instance change', () => {
      const getObserverLength = () => Object.keys(getObserverEntities()).length;

      const container = document.createElement('div');
      document.body.appendChild(container);
      let target = container;

      const originLength = getObserverLength();
      const getTarget = () => target;
      wrapper = mount(<Affix target={getTarget} />);
      jest.runAllTimers();

      expect(getObserverLength()).toBe(originLength + 1);
      target = null;
      wrapper.setProps({});
      wrapper.update();
      jest.runAllTimers();
      expect(getObserverLength()).toBe(originLength);
    });
  });

  describe('updatePosition when size changed', () => {
    function test(name, index) {
      it(name, () => {
        document.body.innerHTML = '<div id="mounter" />';

        const updateCalled = jest.fn();
        wrapper = mount(<AffixMounter offsetBottom={0} onTestUpdatePosition={updateCalled} />, {
          attachTo: document.getElementById('mounter'),
        });

        jest.runAllTimers();

        movePlaceholder(300);
        expect(wrapper.instance().affix.state.affixStyle).toBeTruthy();
        jest.runAllTimers();
        wrapper.update();

        // Mock trigger resize
        updateCalled.mockReset();
        wrapper
          .find('ReactResizeObserver')
          .at(index)
          .instance()
          .onResize([{ target: { getBoundingClientRect: () => ({ width: 99, height: 99 }) } }]);
        jest.runAllTimers();

        expect(updateCalled).toHaveBeenCalled();
      });
    }

    test('inner', 0);
    test('outer', 1);
  });
});
