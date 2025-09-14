import React from 'react';

import Empty from '..';
import type { EmptyProps } from '..';
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
      image: 'custom-image',
    };

    const customStyles = {
      root: { color: 'red' },
      description: { color: 'green' },
      footer: { color: 'yellow' },
      image: { backgroundColor: 'black' },
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

    const emptyElement = container.querySelector('.ant-empty') as HTMLElement;
    const emptyFooterElement = container.querySelector('.ant-empty-footer') as HTMLElement;
    const emptyDescriptionElement = container.querySelector(
      '.ant-empty-description',
    ) as HTMLElement;
    const emptyImageElement = container.querySelector('.ant-empty-image') as HTMLElement;

    // check classNames
    expect(emptyElement.classList).toContain('custom-root');
    expect(emptyFooterElement.classList).toContain('custom-footer');
    expect(emptyDescriptionElement.classList).toContain('custom-description');
    expect(emptyImageElement.classList).toContain('custom-image');

    // check styles
    expect(emptyElement.style.color).toBe('red');
    expect(emptyDescriptionElement.style.color).toBe('green');
    expect(emptyFooterElement.style.color).toBe('yellow');
    expect(emptyImageElement.style.backgroundColor).toBe('black');
  });

  it('support ConfigProvider image', () => {
    const { container } = render(
      <ConfigProvider empty={{ image: 'https://example.com/foobar.jpg' }}>
        <Empty />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLImageElement>('img')?.src).toBe(
      'https://example.com/foobar.jpg',
    );
  });

  describe('semantic classNames/styles', () => {
    it('should apply dynamic classNames and styles from props function', () => {
      const classNames: EmptyProps['classNames'] = (info) => {
        if (info.props.description) return { root: 'empty-with-desc' };
        return { root: 'empty-no-desc' };
      };
      const styles: EmptyProps['styles'] = (info) => {
        if (info.props.description) return { root: { background: 'red' } };
        return { root: { background: 'blue' } };
      };

      const { rerender, container } = render(
        <Empty description="Test description" classNames={classNames} styles={styles}>
          <div>Footer content</div>
        </Empty>,
      );

      expect(container.querySelector('.empty-with-desc')).toBeTruthy();
      expect(container.querySelector('.ant-empty')).toHaveStyle({ background: 'red' });

      rerender(
        <Empty classNames={classNames} styles={styles}>
          <div>Footer content</div>
        </Empty>,
      );
      expect(container.querySelector('.empty-no-desc')).toBeTruthy();
      expect(container.querySelector('.ant-empty')).toHaveStyle({ background: 'blue' });
    });

    it('should apply object classNames and styles', () => {
      const classNames = { root: 'empty-custom', image: 'empty-image-custom' };
      const styles = { root: { border: '1px solid red' }, image: { opacity: 0.5 } };

      const { container } = render(
        <Empty classNames={classNames} styles={styles} description="Test">
          <div>Footer content</div>
        </Empty>,
      );
      expect(container.querySelector('.empty-custom')).toBeTruthy();
      expect(container.querySelector('.empty-image-custom')).toBeTruthy();
    });
  });
});
