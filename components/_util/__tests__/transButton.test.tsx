import React from 'react';
import TransButton from '../transButton';
import { render } from '../../../tests/utils';

describe('transButton component', () => {
  it('disabled should update style', () => {
    const { container } = render(<TransButton disabled />);
    expect(container.querySelector('div')?.style.pointerEvents).toBe('none');
  });
});
