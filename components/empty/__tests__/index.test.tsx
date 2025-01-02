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

  it('should apply custom styles to Empty', () => {
    const customClassNames = {
      root: 'custom-root',
      description: 'custom-description',
      footer: 'custom-footer',
      icon: 'custom-icon',
    };

    const customStyles = {
      root: { color: 'red' },
      description: { color: 'green' },
      footer: { color: 'yellow' },
      icon: { backgroundColor: 'black' },
    };

    const { container } = render(
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        classNames={customClassNames}
        styles={customStyles}
        description={'Description'}
      >
        <div>Create Now</div>
      </Empty>,
    );

    const emptyElement = container.querySelector('.ant-empty') as HTMLElement;
    const emptyFooterElement = container.querySelector('.ant-empty-footer') as HTMLElement;
    const emptyDescriptionElement = container.querySelector(
      '.ant-empty-description',
    ) as HTMLElement;
    const emptyIconElement = container.querySelector('.ant-empty-image') as HTMLElement;

    // check classNames
    expect(emptyElement.classList).toContain('custom-root');
    expect(emptyFooterElement.classList).toContain('custom-footer');
    expect(emptyDescriptionElement.classList).toContain('custom-description');
    expect(emptyIconElement.classList).toContain('custom-icon');

    // check styles
    expect(emptyElement.style.color).toBe('red');
    expect(emptyDescriptionElement.style.color).toBe('green');
    expect(emptyFooterElement.style.color).toBe('yellow');
    expect(emptyIconElement.style.backgroundColor).toBe('black');
  });
});
