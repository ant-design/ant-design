import React from 'react';

import { render } from '../../../tests/utils';
import TransButton from '../transButton';

describe('transButton component', () => {
  it('disabled should update style', () => {
    const { container } = render(<TransButton disabled />);
    expect(container.querySelector('div')?.style.pointerEvents).toBe('none');
  });
});
