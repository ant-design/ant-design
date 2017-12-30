import React from 'react';
import { mount } from 'enzyme';
import Affix from '..';
import Button from '../../button';

const events = {};

class AffixMounter extends React.Component {
  componentDidMount() {
    this.container.scrollTop = 100;
    this.container.addEventListener = jest.fn().mockImplementation((event, cb) => {
      events[event] = cb;
    });
  }
  getTarget = () => {
    return this.container;
  }
  render() {
    return (
      <div
        style={{
          height: 100,
          overflowY: 'scroll',
        }}
        ref={(node) => { this.container = node; }}
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
            ref={ele => this.affix = ele}
          >
            <Button type="primary" >
              Fixed at the top of container
            </Button>
          </Affix>
        </div>
      </div>
    );
  }
}

describe('Affix Render', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Anchor render perfectly', () => {
    document.body.innerHTML = '<div id="mounter" />';

    const wrapper = mount(<AffixMounter />, { attachTo: document.getElementById('mounter') });
    jest.runAllTimers();

    wrapper.instance().affix.fixedNode.parentNode.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 100, height: 28, left: 0, right: 0, top: -50, width: 195,
      };
    });

    events.scroll({
      type: 'scroll',
    });

    jest.runAllTimers();
    expect(wrapper.instance().affix.state.affixStyle).not.toBe(null);
  });
});
