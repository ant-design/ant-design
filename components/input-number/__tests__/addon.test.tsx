import React from 'react';
import InputNumber from '..';
import { render } from '../../../tests/utils';

describe('addon', () => {
  ['disabled', 'readOnly'].forEach((prop) => {
    it(`input should be disabled when it is ${prop}`, () => {
      const { container } = render(<InputNumber defaultValue={100} {...{ [prop]: true }} />);
      expect(container.querySelector('.ant-input-number-input')).toBeDisabled();
    });
  });

  it('disabled when prefix is active', () => {
    const { container } = render(<InputNumber prefix="¥" defaultValue={100} disabled controls />);
    expect(container.querySelector('.ant-input-number-affix-wrapper-disabled')).toBeInTheDocument();
  });

  it('disabled when addon is active', () => {
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

  it('disabled when prefix and addon is active', () => {
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
    expect(container.querySelector('.ant-input-number-affix-wrapper-disabled')).toBeNull();
  });
});
