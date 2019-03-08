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

  const classRect = {
    container: {
      top: 0,
      bottom: 100,
    },
  };

  const originGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
  HTMLElement.prototype.getBoundingClientRect = function() {
    return (
      classRect[this.className] || {
        top: 0,
        bottom: 0,
      }
    );
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    HTMLElement.prototype.getBoundingClientRect = originGetBoundingClientRect;
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
});
