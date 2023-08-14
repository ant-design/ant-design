import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import Button from 'antd/es/button';
import ConfigProvider from '..';
import { render } from '../../../tests/utils';

describe('ConfigProvider.button', () => {
  beforeEach(() => {
    (global as any).triggerProps = null;
  });

  it('ConfigProvider button style', () => {
    const { container } = render(
      <ConfigProvider>
        <Button style={{ fontSize: '14px' }} />
      </ConfigProvider>,
    );

    const item = container.querySelector('button') as HTMLElement;
    expect(getComputedStyle(item)?.fontSize).toBe('14px');
  });

  it('ConfigProvider button className', () => {
    const { container } = render(
      <ConfigProvider>
        <Button className="custom-class" />
      </ConfigProvider>,
    );

    expect(container.querySelector('button')?.className.includes('custom-class')).toBe(true);
  });

  it('ConfigProvider button styles', () => {
    const { container } = render(
      <ConfigProvider button={{ styles: { icon: { color: '#333' } } }}>
        <Button icon={<SearchOutlined />} />
      </ConfigProvider>,
    );

    const item = container.querySelector('.ant-btn-icon') as HTMLElement;
    expect(getComputedStyle(item)?.fontSize).toBe('14px');
  });

  it('ConfigProvider button classNames', () => {
    const { container } = render(
      <ConfigProvider button={{ classNames: { icon: 'icon-custom-class' } }}>
        <Button icon={<SearchOutlined />} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-btn-icon')?.className.includes('custom-class')).toBe(true);
  });
});
