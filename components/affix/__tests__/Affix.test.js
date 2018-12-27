import React from 'react';
import { mount } from 'enzyme';
import Affix from '..';
import Button from '../../button';

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
        style={{
          height: 100,
          overflowY: 'scroll',
        }}
        ref={node => {
          this.container = node;
        }}
      >
        <div
          className="background"
          style={{
            paddingTop: 60,
            height: 300,
          }}
        >
          <Affix
            target={() => this.container}
            ref={ele => {
              this.affix = ele;
            }}
            {...this.props}
          >
            <Button type="primary">Fixed at the top of container</Button>
          </Affix>
        </div>
      </div>
    );
  }
}

describe('Affix Render', () => {
  let wrapper;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const scrollTo = top => {
    wrapper.instance().affix.fixedNode.parentNode.getBoundingClientRect = jest.fn(() => ({
      bottom: 100,
      height: 28,
      left: 0,
      right: 0,
      top: 50 - top,
      width: 195,
    }));
    wrapper.instance().container.scrollTop = top;
    events.scroll({
      type: 'scroll',
    });
    jest.runAllTimers();
  };

  it('Anchor render perfectly', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter />, { attachTo: document.getElementById('mounter') });
    jest.runAllTimers();

    scrollTo(0);
    expect(wrapper.instance().affix.state.affixStyle).toBe(null);

    scrollTo(100);
    expect(wrapper.instance().affix.state.affixStyle).not.toBe(null);

    scrollTo(0);
    expect(wrapper.instance().affix.state.affixStyle).toBe(null);
  });

  it('support offsetBottom', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter offsetBottom={0} />, {
      attachTo: document.getElementById('mounter'),
    });
    jest.runAllTimers();

    scrollTo(0);
    expect(wrapper.instance().affix.state.affixStyle).not.toBe(null);

    scrollTo(100);
    expect(wrapper.instance().affix.state.affixStyle).toBe(null);

    scrollTo(0);
    expect(wrapper.instance().affix.state.affixStyle).not.toBe(null);
  });

  it('updatePosition when offsetTop changed', () => {
    document.body.innerHTML = '<div id="mounter" />';

    wrapper = mount(<AffixMounter offsetTop={0} />, {
      attachTo: document.getElementById('mounter'),
    });
    jest.runAllTimers();

    scrollTo(100);
    expect(wrapper.instance().affix.state.affixStyle.top).toBe(0);
    wrapper.setProps({
      offsetTop: 10,
    });
    jest.runAllTimers();
    expect(wrapper.instance().affix.state.affixStyle.top).toBe(10);
  });
});
