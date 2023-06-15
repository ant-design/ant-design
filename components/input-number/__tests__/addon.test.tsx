import React from 'react';
import InputNumber from '..';
import { render } from '../../../tests/utils';

describe('addon', () => {
  it('disabled status when prefix is active', () => {
    const { container } = render(<InputNumber prefix="¥" defaultValue={100} disabled controls />);
    expect(container.querySelector('.ant-input-number-affix-wrapper-disabled')).toBeInTheDocument();
  });

  it('disabled status when addon is active', () => {
    const { container } = render(
      <InputNumber
        prefix="¥"
        addonBefore="Before"
        addonAfter="After"
        defaultValue={100}
        disabled
        controls
      />,
    );
    expect(container.querySelector('.ant-input-number-wrapper-disabled')).toBeInTheDocument();
  });

  it('disabled status when prefix and addon is active', () => {
    const { container } = render(
      <InputNumber
        prefix="¥"
        addonBefore="Before"
        addonAfter="After"
        defaultValue={100}
        disabled
        controls
      />,
    );
    expect(container.querySelector('.ant-input-number-wrapper-disabled')).toBeInTheDocument();
    expect(container.querySelector('.ant-input-number-affix-wrapper-disabled')).toBeInTheDocument();
  });
});
