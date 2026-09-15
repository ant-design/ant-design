import React from 'react';

import Steps from '..';
import type { StepsProps } from '..';
import type { GetProp } from '../../_util/type';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import zhTW from '../../locale/zh_TW';

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

  it('should hide decorative panel arrows from assistive technology', () => {
    const { container } = render(
      <Steps
        type="panel"
        items={[{ title: 'Account' }, { title: 'Verification' }, { title: 'Done' }]}
      />,
    );
    const arrows = container.querySelectorAll('.ant-steps-panel-arrow');

    expect(arrows).toHaveLength(3);
    arrows.forEach((arrow) => {
      expect(arrow).not.toHaveAccessibleName();
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('should expose the progress icon as a progressbar', () => {
    const { container } = render(
      <Steps
        current={1}
        percent={60}
        items={[{ title: 'Finished' }, { title: 'In Progress' }, { title: 'Waiting' }]}
      />,
    );
    const svg = container.querySelector<SVGSVGElement>('.ant-steps-item-progress-icon-svg')!;
    expect(svg).toBeTruthy();
    // `aria-valuenow` and friends are only allowed on a widget role.
    expect(svg.getAttribute('role')).toBe('progressbar');
    expect(svg.getAttribute('aria-valuenow')).toBe('60');
  });

  it('should not give the progressbar a hardcoded English name', () => {
    const { container } = render(
      <ConfigProvider locale={zhTW}>
        <Steps
          current={1}
          percent={60}
          items={[{ title: '已完成' }, { title: '進行中' }, { title: '待處理' }]}
        />
      </ConfigProvider>,
    );
    const svg = container.querySelector<SVGSVGElement>('.ant-steps-item-progress-icon-svg')!;
    expect(svg.getAttribute('role')).toBe('progressbar');
    // The circle is decorative: no untranslatable string may become its accessible name.
    expect(svg.querySelector('title')).toBeNull();
    expect(svg).not.toHaveAccessibleName();
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
});
