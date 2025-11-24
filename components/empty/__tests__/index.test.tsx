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
    const { container } = render(<Empty styles={{ image: { height: 20 } }} />);
    expect(container.querySelector<HTMLDivElement>('.ant-empty-image')).toHaveStyle({
      height: '20px',
    });
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
      image: 'custom-image',
    };

    const customStyles = {
      root: { padding: 10 },
      description: { padding: 20 },
      footer: { padding: 30 },
      image: { padding: 40 },
    };

    const { container } = render(
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        classNames={customClassNames}
        styles={customStyles}
        description={'Description'}
      >
        <div>Create Now</div>
      </Empty>,
    );

    const emptyElement = container.querySelector<HTMLElement>('.ant-empty');
    const emptyFooterElement = container.querySelector<HTMLElement>('.ant-empty-footer');
    const emptyDescriptionElement = container.querySelector<HTMLElement>('.ant-empty-description');
    const emptyImageElement = container.querySelector<HTMLElement>('.ant-empty-image');

    // check classNames
    expect(emptyElement).toHaveClass('custom-root');
    expect(emptyFooterElement).toHaveClass('custom-footer');
    expect(emptyDescriptionElement).toHaveClass('custom-description');
    expect(emptyImageElement).toHaveClass('custom-image');

    // check styles
    expect(emptyElement).toHaveStyle({ padding: '10px' });
    expect(emptyDescriptionElement).toHaveStyle({ padding: '20px' });
    expect(emptyFooterElement).toHaveStyle({ padding: '30px' });
    expect(emptyImageElement).toHaveStyle({ padding: '40px' });
  });

  it('support ConfigProvider image', () => {
    const { container } = render(
      <ConfigProvider empty={{ image: 'https://example.com/foobar.jpg' }}>
        <Empty />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLImageElement>('img')).toHaveAttribute(
      'src',
      'https://example.com/foobar.jpg',
    );
  });
});
