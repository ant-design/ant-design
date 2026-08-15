import React from 'react';

import { render, screen } from '../../../tests/utils';
import ComplexFormControl from '../demo/complex-form-control';

describe('Form complex control demo', () => {
  it('associates the Username label with its nested control', () => {
    render(<ComplexFormControl />);

    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'username');
  });
});
