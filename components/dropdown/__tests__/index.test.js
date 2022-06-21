import { mount } from 'enzyme';
import React from 'react';
import Dropdown from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, sleep } from '../../../tests/utils';
import Menu from '../../menu';

describe('Dropdown', () => {
  mountTest(() => (
    <Dropdown menu={<Menu />}>
      <span />
    </Dropdown>
  ));

  rtlTest(() => (
    <Dropdown menu={<Menu />}>
      <span />
    </Dropdown>
  ));

  it('overlay is function and has custom transitionName', () => {
    const wrapper = mount(
      <Dropdown overlay={() => <div>menu</div>} transitionName="move-up" visible>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('overlay is string', () => {
    const wrapper = mount(
      <Dropdown overlay="string" visible>
        <button type="button">button</button>
      </Dropdown>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('support Menu expandIcon', async () => {
    const props = {
      overlay: (
        <Menu expandIcon={<span id="customExpandIcon" />}>
          <Menu.Item key="1">foo</Menu.Item>
          <Menu.SubMenu title="SubMenu">
            <Menu.Item key="1">foo</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      ),
      visible: true,
      getPopupContainer: node => node,
    };

    const wrapper = mount(
      <Dropdown {...props}>
        <button type="button">button</button>
      </Dropdown>,
    );
    await sleep(500);
    expect(wrapper.find(Dropdown).find('#customExpandIcon').length).toBe(1);
  });

  it('should warn if use topCenter or bottomCenter', () => {
    const error = jest.spyOn(console, 'error');
    mount(
      <div>
        <Dropdown overlay="123" placement="bottomCenter">
          <button type="button">bottomCenter</button>
        </Dropdown>
        <Dropdown overlay="123" placement="topCenter">
          <button type="button">topCenter</button>
        </Dropdown>
      </div>,
    );
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("[antd: Dropdown] You are using 'bottomCenter'"),
    );
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("[antd: Dropdown] You are using 'topCenter'"),
    );
  });

  // zombieJ: when replaced with react test lib, it may be mock fully content
  it('dropdown should support auto adjust placement', () => {
    const wrapper = mount(
      <Dropdown overlay={<div>menu</div>} visible>
        <button type="button">button</button>
      </Dropdown>,
    );

    expect(wrapper.find('Trigger').prop('builtinPlacements')).toEqual(
      expect.objectContaining({
        bottomLeft: expect.objectContaining({
          overflow: {
            adjustX: 1,
            adjustY: 1,
          },
        }),
      }),
    );
  });

  it('menu item with group', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Dropdown
        trigger="click"
        overlay={
          <Menu
            items={[
              {
                label: 'grp',
                type: 'group',
                children: [
                  {
                    label: '1',
                    key: 1,
                  },
                ],
              },
            ]}
          />
        }
      >
        <a />
      </Dropdown>,
    );

    // Open
    fireEvent.click(container.querySelector('a'));
    act(() => {
      jest.runAllTimers();
    });

    // Close
    fireEvent.click(container.querySelector('.ant-dropdown-menu-item'));

    // Force Motion move on
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }

    // Motion End
    fireEvent.animationEnd(container.querySelector('.ant-slide-up-leave-active'));

    expect(container.querySelector('.ant-dropdown-hidden')).toBeTruthy();

    jest.useRealTimers();
  });
});
