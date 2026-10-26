import React from 'react';

import Footer from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('Footer', () => {
  mountTest(Footer);
  rtlTest(Footer);

  it('should render correctly', () => {
    const { container } = render(
      <Footer
        columns={[
          {
            title: 'Product',
            items: [
              { title: 'Ant Design', url: 'https://ant.design' },
            ],
          },
        ]}
        bottom="Copyright"
      />,
    );

    expect(container.querySelector('.ant-footer')).toBeTruthy();
    expect(container.querySelector('.ant-footer-columns')).toBeTruthy();
    expect(container.querySelector('.ant-footer-bottom')).toBeTruthy();
    expect(container.querySelector('.ant-footer-column h2')).toHaveTextContent('Product');
    expect(container.querySelector('.ant-footer-item a')).toHaveTextContent('Ant Design');
    expect(container.querySelector('.ant-footer-bottom')).toHaveTextContent('Copyright');
  });

  it('should render correctly with empty columns', () => {
    const { container } = render(<Footer columns={[]} />);

    expect(container.querySelector('.ant-footer')).toBeTruthy();
    expect(container.querySelector('.ant-footer-columns')).toBeFalsy();
  });

  it('should render icon correctly', () => {
    const { container } = render(
      <Footer
        columns={[
          {
            title: 'Community',
            icon: <span data-testid="column-icon" />,
            items: [
              {
                title: 'GitHub',
                url: 'https://github.com',
                icon: <span data-testid="item-icon" />,
              },
            ],
          },
        ]}
      />,
    );

    expect(container.querySelector('[data-testid="column-icon"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="item-icon"]')).toBeTruthy();
  });

  it('should support theme', () => {
    const { container, rerender } = render(
      <Footer theme="dark" columns={[]} />,
    );
    expect(container.querySelector('.ant-footer-dark')).toBeTruthy();

    rerender(<Footer theme="light" columns={[]} />);
    expect(container.querySelector('.ant-footer-light')).toBeTruthy();
  });

  it('should support className and style', () => {
    const { container } = render(
      <Footer
        className="custom-class"
        style={{ color: 'red' }}
        columns={[]}
      />,
    );

    expect(container.querySelector('.ant-footer')).toHaveClass('custom-class');
    expect(container.querySelector('.ant-footer')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should support maxColumnsPerRow', () => {
    const { container } = render(
      <Footer
        maxColumnsPerRow={2}
        columns={[
          { title: 'Column 1', items: [] },
          { title: 'Column 2', items: [] },
          { title: 'Column 3', items: [] },
        ]}
      />,
    );

    expect(container.querySelector('.ant-footer-columns')).toBeTruthy();
    expect(container.querySelectorAll('.ant-footer-column').length).toBe(3);
  });

  it('should support rtl', () => {
    const { container } = render(
      <ConfigProvider direction="rtl">
        <Footer columns={[{ title: 'Test', items: [] }]} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-footer-rtl')).toBeTruthy();
  });
});
