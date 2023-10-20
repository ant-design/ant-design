import React from 'react';
import Popover from '..';
import mountTest from '../../../tests/shared/mountTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { Select } from 'antd';

describe('Popover', () => {
  mountTest(Popover);

  it('should show overlay when trigger is clicked', () => {
    const ref = React.createRef<any>();

    const popover = render(
      <Popover ref={ref} content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(popover.container.querySelector('.ant-popover-inner-content')).toBeFalsy();
    fireEvent.click(popover.container.querySelector('span')!);
    expect(popover.container.querySelector('.ant-popover-inner-content')).toBeTruthy();
  });

  it('shows content for render functions', () => {
    const renderTitle = () => 'some-title';
    const renderContent = () => 'some-content';
    const ref = React.createRef<any>();

    const popover = render(
      <Popover ref={ref} content={renderContent} title={renderTitle} trigger="click">
        <span>show me your code </span>
      </Popover>,
    );

    fireEvent.click(popover.container.querySelector('span')!);

    const popup = document.querySelector('.ant-popover')!;
    expect(popup).not.toBe(null);
    expect(popup.innerHTML).toContain('some-title');
    expect(popup.innerHTML).toContain('some-content');
    expect(popup.innerHTML).toMatchSnapshot();
  });

  it('handles empty title/content props safely', () => {
    const { container } = render(
      <Popover trigger="click">
        <span>show me your code</span>
      </Popover>,
    );
    fireEvent.click(container.querySelector('span')!);

    const popup = document.querySelector('.ant-popover');
    expect(popup).toBe(null);
  });

  it('should not render popover when the title & content props is empty', () => {
    const { container } = render(
      <Popover trigger="click">
        <span>show me your code</span>
      </Popover>,
    );
    fireEvent.click(container.querySelector('span')!);

    const popup = document.querySelector('.ant-popover');
    expect(popup).toBe(null);
  });

  it('props#overlay do not warn anymore', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const overlay = jest.fn();
    render(
      <Popover content="console.log('hello world')" title="code" trigger="click">
        <span>show me your code</span>
      </Popover>,
    );

    expect(errorSpy).not.toHaveBeenCalled();
    expect(overlay).not.toHaveBeenCalled();
  });

  it(`should be rendered correctly in RTL direction`, () => {
    const wrapper = render(
      <ConfigProvider direction="rtl">
        <Popover title="RTL" open>
          <span>show me your Rtl demo</span>
        </Popover>
      </ConfigProvider>,
    );
    expect(Array.from(wrapper.container.children)).toMatchSnapshot();
  });
  it('z-index should be accumulated in nested Popover', () => {
    const options = [
      {
        label: 'Option 1',
        value: '1',
      },
      {
        label: 'Option 2',
        value: '2',
      },
    ];
    render(
      <>
        <Select open options={options} popupClassName="select0" />
        <Popover open content="test1" rootClassName="test1">
          <Select open options={options} popupClassName="select1" />
          <Popover open content="test2" rootClassName="test2">
            <Select open options={options} popupClassName="select2" />
          </Popover>
        </Popover>
      </>,
    );
    expect((document.querySelector('.test1') as HTMLDivElement)!.style.zIndex).toBeFalsy();
    expect((document.querySelector('.test2') as HTMLDivElement)!.style.zIndex).toBe('2060');
    expect((document.querySelector('.select0') as HTMLDivElement)!.style.zIndex).toBeFalsy();
    expect((document.querySelector('.select1') as HTMLDivElement)!.style.zIndex).toBe('1080');
    expect((document.querySelector('.select2') as HTMLDivElement)!.style.zIndex).toBe('2110');
  });
});
