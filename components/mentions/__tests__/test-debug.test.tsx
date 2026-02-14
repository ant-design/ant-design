import React from 'react';
import type { GetProp, MentionProps } from 'antd';
import Mentions from '../index';
import { fireEvent, render, act } from '../../../tests/utils';

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

describe('Mentions Debug', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('debug test', () => {
    const onSelect = jest.fn();
    const options: MentionsOptionProps[] = [
      {
        value: 'disabled-user',
        label: 'Disabled User',
        disabled: true,
      },
      {
        value: 'afc163',
        label: 'afc163',
      },
    ];

    const wrapper = render(<Mentions options={options} onSelect={onSelect} />);

    const textarea = wrapper.container.querySelector('textarea')!;
    
    // Simulate typing @
    textarea.value = '@';
    fireEvent.change(textarea, { target: { value: '@' } });
    fireEvent.keyDown(textarea, { which: 64, key: '@' });
    fireEvent.keyUp(textarea, { which: 64, key: '@' });

    act(() => {
      jest.runAllTimers();
    });

    console.log('Dropdown items:', wrapper.container.querySelectorAll('.ant-mentions-dropdown-menu-item').length);
    console.log('Active item:', wrapper.container.querySelector('.ant-mentions-dropdown-menu-item-active')?.textContent);

    // Press Enter
    fireEvent.keyDown(textarea, { which: 13, key: 'Enter' });

    act(() => {
      jest.runAllTimers();
    });

    console.log('onSelect called:', onSelect.mock.calls);
    console.log('Textarea value:', textarea.value);
  });
});
