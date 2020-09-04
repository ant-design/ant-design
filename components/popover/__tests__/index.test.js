import React from 'react';
import { render, mount } from 'enzyme';
import Popover from '..';
import mountTest from '../../../tests/shared/mountTest';
import { sleep } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Popover', () => {
  mountTest(Popover);

  it('should show overlay when trigger is clicked', async () => {
    const ref = React.createRef();

    const popover = mount(
      <Popover ref={ref} content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(ref.current.getPopupDomNode()).toBe(null);

    popover.find('span').simulate('click');
    await sleep(100);

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.className).toContain('ant-popover-placement-top');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('shows content for render functions', () => {
    const renderTitle = () => 'some-title';
    const renderContent = () => 'some-content';
    const ref = React.createRef();

    const popover = mount(
      <Popover ref={ref} content={renderContent} title={renderTitle} trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    popover.find('span').simulate('click');

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toContain('some-title');
    expect(popup.innerHTML).toContain('some-content');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('handles empty title/content props safely', () => {
    const ref = React.createRef();

    const popover = mount(
      <Popover trigger="click" ref={ref}>
        <span>show me your code</span>
      </Popover>,
    );

    popover.find('span').simulate('click');

    const popup = ref.current.getPopupDomNode();
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('props#overlay do not warn anymore', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const overlay = jest.fn();
    mount(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(errorSpy.mock.calls.length).toBe(0);
    expect(overlay).not.toHaveBeenCalled();
  });

  it(`should be rendered correctly in RTL direction`, () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Popover title="RTL" visible>
          <span>show me your Rtl demo</span>
        </Popover>
      </ConfigProvider>,
    );
    expect(render(wrapper)).toMatchSnapshot();
  });
});
