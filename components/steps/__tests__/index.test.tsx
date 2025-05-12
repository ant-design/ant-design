import React from 'react';

import Steps from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Steps', () => {
  mountTest(Steps);
  rtlTest(Steps);

  beforeEach(() => {
    resetWarned();
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
            console.log('Change:', val);
            setCurrent(val);
          }}
          items={items}
        />
      );
    };
    const { container } = render(<ControlSteps />);
    expect(
      container.querySelectorAll('.ant-steps-item')[1].classList.contains('ant-steps-item-process'),
    ).toBe(false);
    fireEvent.click(screen.getByText(/进行中/));
    expect(
      container.querySelectorAll('.ant-steps-item')[1].classList.contains('ant-steps-item-process'),
    ).toBe(true);
  });

  it('deprecated warning', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <Steps
        direction="vertical"
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
});
