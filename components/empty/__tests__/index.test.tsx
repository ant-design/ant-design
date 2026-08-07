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
    const { asFragment } = render(
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Empty />
      </ConfigProvider>,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(asFragment().firstChild).not.toHaveStyle({ opacity: 0.65 });
  });

  it('CSS variables compatible', () => {
    const { container, rerender } = render(
      <ConfigProvider
        theme={{
          token: {
            colorFillSecondary: 'var(--test-color)' as any,
          },
        }}
      >
        <Empty />
      </ConfigProvider>,
    );

    expect(container.querySelector('ellipse')?.getAttribute('fill')).toBe('var(--test-color)');

    // background is a CSS variable
    rerender(
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'var(--bg-color)' as any,
            colorFillSecondary: '#f0f0f0',
          },
        }}
      >
        <Empty />
      </ConfigProvider>,
    );
    expect(container.querySelector('ellipse')?.getAttribute('fill')).toBe('#f0f0f0');
  });

  it('PRESENTED_IMAGE_SIMPLE CSS variables compatible', () => {
    const { container, rerender } = render(
      <ConfigProvider
        theme={{
          token: {
            colorFillTertiary: 'var(--test-color)' as any,
          },
        }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </ConfigProvider>,
    );

    expect(container.querySelector('ellipse')?.getAttribute('fill')).toBe('var(--test-color)');

    // background is a CSS variable
    rerender(
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: 'var(--bg-color)' as any,
            colorFill: '#f0f0f0',
          },
        }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </ConfigProvider>,
    );
    expect(container.querySelector('g[stroke]')?.getAttribute('stroke')).toBe('#f0f0f0');
  });

  it('PRESENTED_IMAGE_SIMPLE should render default description when locale description is empty', () => {
    const { container } = render(
      <ConfigProvider locale={{ locale: 'en', Empty: { description: '' } } as any}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </ConfigProvider>,
    );
    expect(container.querySelector('title')?.textContent).toBe('Empty');
  });

  it('PRESENTED_IMAGE_SIMPLE should render default description when locale is missing', () => {
    const { container } = render(
      <ConfigProvider locale={{ Empty: { description: undefined } } as any}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </ConfigProvider>,
    );
    expect(container.querySelector('title')?.textContent).toBe('Empty');
  });

  it('Default image should render default description when locale description is empty', () => {
    const { container } = render(
      <ConfigProvider locale={{ locale: 'en', Empty: { description: '' } } as any}>
        <Empty />
      </ConfigProvider>,
    );
    expect(container.querySelector('title')?.textContent).toBe('Empty');
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
