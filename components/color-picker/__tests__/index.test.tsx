import { render } from '@testing-library/react';
import React from 'react';
import ColorPicker from '../ColorPicker';

describe('ColorPicker', () => {
  it('Should component render correct', () => {
    const { container } = render(<ColorPicker />);
    expect(container.querySelector('.ant-color-picker-placeholder')).toBeTruthy();
  });
});
