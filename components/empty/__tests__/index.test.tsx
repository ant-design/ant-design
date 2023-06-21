import React from 'react';
import Empty from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import theme from '../../theme';

describe('Empty', () => {
  mountTest(Empty);
  rtlTest(Empty);

  it('image size should change', () => {
    const { container } = render(<Empty imageStyle={{ height: 20 }} />);
    expect(container.querySelector<HTMLDivElement>('.ant-empty-image')?.style.height).toBe('20px');
  });

  it('description can be false', () => {
    const { container } = render(<Empty description={false} />);
    expect(container.querySelector('.ant-empty-description')).toBeFalsy();
  });

  it('should render in RTL direction', () => {
    const { asFragment } = render(
      <ConfigProvider direction="rtl">
        <Empty />
      </ConfigProvider>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('dark mode compatible', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Empty />
      </ConfigProvider>,
    );

    expect(container.querySelector('svg')).toHaveStyle({
      opacity: 0.65,
    });
  });
});
