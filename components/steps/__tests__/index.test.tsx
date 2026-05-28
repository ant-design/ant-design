import React from 'react';

import Steps from '..';
import type { StepsProps } from '..';
import type { GetProp } from '../../_util/type';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Steps', () => {
  mountTest(Steps);
  rtlTest(Steps);

  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  const description = 'This is a description.';
  it('should render correct', () => {
    const { container } = render(
      <Steps
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description,
            subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('items out of render function', () => {
    const items = [
      {
        title: '已完成',
      },
      {
        title: '进行中',
      },
      {
        title: '待运行',
        description: 'Hello World!',
      },
      {
        title: '待运行',
      },
    ];
    const ControlSteps = () => {
      const [current, setCurrent] = React.useState(0);
      return (
        <Steps
          current={current}
          onChange={(val: number) => {
            setCurrent(val);
          }}
          items={items}
        />
      );
    };
    const { container } = render(<ControlSteps />);
    const ele = container.querySelectorAll<HTMLElement>('.ant-steps-item')[1];
    expect(ele).not.toHaveClass('ant-steps-item-process');
    fireEvent.click(screen.getByText(/进行中/));
    expect(ele).toHaveClass('ant-steps-item-process');
  });

  it('deprecated warning', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <Steps
        progressDot
        direction="vertical"
        labelPlacement="horizontal"
        items={[
          {
            title: 'In Progress',
            description,
          },
        ]}
      />,
    );

    expect(container.querySelectorAll('.ant-steps-item')).toHaveLength(1);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Steps] `direction` is deprecated. Please use `orientation` instead.',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Steps] `items.description` is deprecated. Please use `items.content` instead.',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Steps] `progressDot` is deprecated. Please use `type="dot"` instead.',
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Steps] `labelPlacement` is deprecated. Please use `titlePlacement` instead.',
    );
    errorSpy.mockRestore();
  });

  it('Steps should inherit the size from ConfigProvider if the componentSize is set ', () => {
    const { container } = render(
      <ConfigProvider componentSize="small">
        <Steps items={[{ title: 'In Progress' }, { title: 'Finished' }]} />
      </ConfigProvider>,
    );
    expect(container.querySelectorAll('.ant-steps-small')).toHaveLength(1);
  });

  it('no tooltip if inline item not have content', async () => {
    const { container } = render(
      <Steps
        type="inline"
        items={[
          {
            title: 'Step1',
          },
          {
            title: 'Step2',
            content: 'has',
          },
        ]}
      />,
    );

    // First
    fireEvent.mouseEnter(container.querySelectorAll('.ant-steps-item')[0]);
    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip')).toBeFalsy();

    // Second
    fireEvent.mouseEnter(container.querySelectorAll('.ant-steps-item')[1]);
    await waitFakeTimer();
    expect(document.querySelector('.ant-tooltip')).toBeTruthy();
  });

  it('iconRender', () => {
    let renderInfo: Parameters<GetProp<StepsProps, 'iconRender'>>[1];

    const iconRender = jest.fn((node, info) => {
      renderInfo = info;
      return <div className="bamboo">{node}</div>;
    });

    const item = {
      title: 'bamboo',
      subTitle: 'little',
      description: 'light',
    };

    const { container } = render(<Steps iconRender={iconRender} items={[item]} />);

    expect(container.querySelector('.bamboo')).toBeTruthy();
    expect(container.querySelector('.ant-steps-item-icon')).toBeTruthy();

    expect(renderInfo!).toEqual({
      index: 0,
      active: true,
      item: {
        ...item,
        content: 'light',
        status: 'process',
      },
      components: {
        Icon: expect.anything(),
      },
    });
  });

  it('collapses hidden ranges into ellipsis steps when maxCount is set', () => {
    const { container } = render(
      <Steps
        current={3}
        maxCount={5}
        items={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Step 4' },
          { title: 'Step 5' },
          { title: 'Step 6' },
          { title: 'Step 7' },
        ]}
      />,
    );

    expect(container.querySelectorAll('.ant-steps-item')).toHaveLength(5);
    expect(container.querySelectorAll('.ant-steps-item-ellipsis')).toHaveLength(2);
    expect(
      container.querySelector('.ant-steps-item-active .ant-steps-item-title')?.textContent,
    ).toBe('Step 4');
  });

  it('maps onChange to original item index when maxCount is set', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Steps
        current={3}
        maxCount={5}
        onChange={onChange}
        items={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Step 4' },
          { title: 'Step 5' },
          { title: 'Step 6' },
          { title: 'Step 7' },
        ]}
      />,
    );

    const target = Array.from(container.querySelectorAll('.ant-steps-item-title')).find(
      (node) => node.textContent === 'Step 7',
    );
    expect(target).toBeTruthy();
    fireEvent.click(target!);
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('keeps initial offset when maxCount is set', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Steps
        initial={2}
        current={5}
        maxCount={5}
        onChange={onChange}
        items={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Step 4' },
          { title: 'Step 5' },
          { title: 'Step 6' },
          { title: 'Step 7' },
        ]}
      />,
    );

    const target = Array.from(container.querySelectorAll('.ant-steps-item-title')).find(
      (node) => node.textContent === 'Step 7',
    );
    expect(target).toBeTruthy();
    fireEvent.click(target!);
    expect(onChange).toHaveBeenCalledWith(8);
  });

  it('shows first/current/last when maxCount is 3', () => {
    const { container } = render(
      <Steps
        current={3}
        maxCount={3}
        items={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Step 4' },
          { title: 'Step 5' },
          { title: 'Step 6' },
          { title: 'Step 7' },
        ]}
      />,
    );

    expect(container.querySelectorAll('.ant-steps-item')).toHaveLength(3);
    expect(container.querySelectorAll('.ant-steps-item-title')).toHaveLength(3);
    expect(
      Array.from(container.querySelectorAll('.ant-steps-item-title')).map(
        (node) => node.textContent,
      ),
    ).toEqual(['Step 1', 'Step 4', 'Step 7']);
  });

  it('shows boundary ellipsis when maxCount is 3 and current is at start', () => {
    const { container } = render(
      <Steps
        current={0}
        maxCount={3}
        items={[
          { title: 'Step 1' },
          { title: 'Step 2' },
          { title: 'Step 3' },
          { title: 'Step 4' },
          { title: 'Step 5' },
          { title: 'Step 6' },
          { title: 'Step 7' },
        ]}
      />,
    );

    expect(container.querySelectorAll('.ant-steps-item')).toHaveLength(3);
    expect(container.querySelectorAll('.ant-steps-item-ellipsis')).toHaveLength(1);
    expect(
      Array.from(container.querySelectorAll('.ant-steps-item-title')).map(
        (node) => node.textContent,
      ),
    ).toEqual(['Step 1', '...', 'Step 7']);
  });

  it('warns when maxCount is less than 3', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Steps
        maxCount={2}
        items={[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]}
      />,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Steps] `maxCount` should be greater than or equal to 3.',
    );

    errorSpy.mockRestore();
  });
});
