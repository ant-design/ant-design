import React from 'react';
import { render } from '../../../tests/utils';
import Menu from '../index';

describe('Menu.sorted', () => {
  it('should not sort items by default', () => {
    const { container } = render(
      <Menu
        items={[
          { key: 'z', label: 'Zebra' },
          { key: 'a', label: 'Apple' },
          { key: 'm', label: 'Mango' },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items[0].textContent).toBe('Zebra');
    expect(items[1].textContent).toBe('Apple');
    expect(items[2].textContent).toBe('Mango');
  });

  it('should sort items alphabetically when sorted=true', () => {
    const { container } = render(
      <Menu
        sorted
        items={[
          { key: 'z', label: 'Zebra' },
          { key: 'a', label: 'Apple' },
          { key: 'm', label: 'Mango' },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items[0].textContent).toBe('Apple');
    expect(items[1].textContent).toBe('Mango');
    expect(items[2].textContent).toBe('Zebra');
  });

  it('should handle case-insensitive sorting', () => {
    const { container } = render(
      <Menu
        sorted
        items={[
          { key: '1', label: 'zebra' },
          { key: '2', label: 'Apple' },
          { key: '3', label: 'MANGO' },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items[0].textContent).toBe('Apple');
    expect(items[1].textContent).toBe('MANGO');
    expect(items[2].textContent).toBe('zebra');
  });

  it('should sort submenu children recursively', () => {
    const { container } = render(
      <Menu
        mode="inline"
        sorted
        defaultOpenKeys={['sub']}
        items={[
          {
            key: 'sub',
            label: 'Submenu',
            children: [
              { key: 'z', label: 'Zebra' },
              { key: 'a', label: 'Apple' },
              { key: 'm', label: 'Mango' },
            ],
          },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items[0].textContent).toBe('Apple');
    expect(items[1].textContent).toBe('Mango');
    expect(items[2].textContent).toBe('Zebra');
  });

  it('should sort deeply nested submenus', () => {
    const { container } = render(
      <Menu
        mode="inline"
        sorted
        defaultOpenKeys={['sub1', 'sub2']}
        items={[
          {
            key: 'sub1',
            label: 'Level 1',
            children: [
              {
                key: 'sub2',
                label: 'Level 2',
                children: [
                  { key: 'z', label: 'Zebra' },
                  { key: 'a', label: 'Apple' },
                ],
              },
            ],
          },
        ]}
      />,
    );

    const nested = container.querySelectorAll('.ant-menu-sub .ant-menu-sub .ant-menu-item');
    expect(nested[0].textContent).toBe('Apple');
    expect(nested[1].textContent).toBe('Zebra');
  });

  it('should preserve item properties', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Menu
        sorted
        items={[
          { key: 'z', label: 'Zebra', disabled: true },
          { key: 'a', label: 'Apple', onClick, danger: true },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items[0].textContent).toBe('Apple');
    expect(items[0]).toHaveClass('ant-menu-item-danger');
    expect(items[1].textContent).toBe('Zebra');
    expect(items[1]).toHaveClass('ant-menu-item-disabled');
  });

  it('should handle non-string labels', () => {
    const { container } = render(
      <Menu
        sorted
        items={[
          { key: '1', label: <span>Custom</span> },
          { key: '2', label: 'Apple' },
          { key: '3', label: 123 },
        ]}
      />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items).toHaveLength(3);
    expect(items[0].textContent).toBe('Custom');
    expect(items[1].textContent).toBe('123');
    expect(items[2].textContent).toBe('Apple');
  });

  it('should handle empty and null items', () => {
    const { container } = render(
      <Menu sorted items={[{ key: 'a', label: 'Apple' }, null, { key: 'z', label: 'Zebra' }]} />,
    );

    const items = container.querySelectorAll('.ant-menu-item');
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toBe('Apple');
    expect(items[1].textContent).toBe('Zebra');
  });
});
