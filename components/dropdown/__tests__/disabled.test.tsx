import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Dropdown from '..';

describe('Dropdown disabled menu', () => {
  it('blocks option selection when an open dropdown becomes disabled', () => {
    const onSelect = jest.fn();
    const menu = { items: [{ key: 'orange', label: 'Orange' }], selectable: true, onSelect };
    const dropdown = (disabled = false) => (
      <Dropdown menu={menu} open disabled={disabled}>
        <button type="button">Fruit</button>
      </Dropdown>
    );
    const { rerender } = render(dropdown());

    expect(screen.getByRole('menuitem', { name: 'Orange' })).toBeInTheDocument();
    rerender(dropdown(true));

    fireEvent.click(screen.getByRole('menuitem', { name: 'Orange' }));
    expect(onSelect).not.toHaveBeenCalled();

    rerender(dropdown());
    fireEvent.click(screen.getByRole('menuitem', { name: 'Orange' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
