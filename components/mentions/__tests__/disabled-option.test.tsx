import React from 'react';
import type { GetProp, MentionProps } from 'antd';
import Mentions from '..';
import { act, fireEvent, render } from '../../../tests/utils';

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

describe('Mentions Disabled Options', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const simulateInput = (wrapper: ReturnType<typeof render>, text: string, keyEvent?: any): void => {
    const lastChar = text[text.length - 1];
    const myKeyEvent = keyEvent || {
      which: lastChar.charCodeAt(0),
      key: lastChar,
      target: {
        value: text,
        selectionStart: text.length,
      },
    };

    fireEvent.keyDown(wrapper.container.querySelector('textarea')!, myKeyEvent);

    const textareaInstance = wrapper.container.querySelector('textarea');

    if (textareaInstance) {
      textareaInstance.value = text;
      textareaInstance.selectionStart = text.length;
      textareaInstance.selectionEnd = text.length;
    }

    if (!keyEvent) {
      fireEvent.change(wrapper.container.querySelector('textarea')!, { target: { value: text } });
    }
    fireEvent.keyUp(wrapper.container.querySelector('textarea')!, myKeyEvent);
  };

  it('should skip disabled first option when pressing Enter', () => {
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
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
    ];

    const wrapper = render(<Mentions options={options} onSelect={onSelect} />);

    // Type @ to trigger the mentions dropdown
    simulateInput(wrapper, '@');

    act(() => {
      jest.runAllTimers();
    });

    // Verify dropdown is open and active item is the first non-disabled option
    const dropdownItems = wrapper.container.querySelectorAll('.ant-mentions-dropdown-menu-item');
    expect(dropdownItems.length).toBe(3);
    
    const activeItem = wrapper.container.querySelector('.ant-mentions-dropdown-menu-item-active');
    expect(activeItem?.textContent).toBe('afc163');

    // Press Enter while measuring
    const textarea = wrapper.container.querySelector('textarea')!;
    fireEvent.keyDown(textarea, { which: 13, key: 'Enter' });

    act(() => {
      jest.runAllTimers();
    });

    // Should select the first non-disabled option (afc163), not the disabled one
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'afc163' }),
      '@',
    );
    expect(onSelect).not.toHaveBeenCalledWith(
      expect.objectContaining({ value: 'disabled-user' }),
      '@',
    );
  });

  it('should skip disabled options when navigating with arrow keys', () => {
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
      {
        value: 'disabled-user-2',
        label: 'Disabled User 2',
        disabled: true,
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
    ];

    const wrapper = render(<Mentions options={options} onSelect={onSelect} />);

    // Type @ to trigger the mentions dropdown
    simulateInput(wrapper, '@');

    act(() => {
      jest.runAllTimers();
    });

    const textarea = wrapper.container.querySelector('textarea')!;

    // Should start at first non-disabled option (afc163)
    let activeItem = wrapper.container.querySelector('.ant-mentions-dropdown-menu-item-active');
    expect(activeItem?.textContent).toBe('afc163');

    // Press Down arrow - should skip to zombieJ (skipping disabled-user-2)
    fireEvent.keyDown(textarea, { which: 40, key: 'ArrowDown' });

    act(() => {
      jest.runAllTimers();
    });

    activeItem = wrapper.container.querySelector('.ant-mentions-dropdown-menu-item-active');
    expect(activeItem?.textContent).toBe('zombieJ');

    // Press Enter - should select zombieJ
    fireEvent.keyDown(textarea, { which: 13, key: 'Enter' });

    act(() => {
      jest.runAllTimers();
    });

    // Should select zombieJ
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'zombieJ' }),
      '@',
    );
  });

  it('should handle all disabled options gracefully', () => {
    const onSelect = jest.fn();
    const options: MentionsOptionProps[] = [
      {
        value: 'disabled-user-1',
        label: 'Disabled User 1',
        disabled: true,
      },
      {
        value: 'disabled-user-2',
        label: 'Disabled User 2',
        disabled: true,
      },
    ];

    const wrapper = render(<Mentions options={options} onSelect={onSelect} />);

    // Type @ to trigger the mentions dropdown
    simulateInput(wrapper, '@');

    act(() => {
      jest.runAllTimers();
    });

    // Press Enter
    const textarea = wrapper.container.querySelector('textarea')!;
    fireEvent.keyDown(textarea, { which: 13, key: 'Enter' });

    act(() => {
      jest.runAllTimers();
    });

    // Should not call onSelect since all options are disabled
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should initially highlight first non-disabled option', () => {
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
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
    ];

    const wrapper = render(<Mentions options={options} />);

    // Type @ to trigger the mentions dropdown
    simulateInput(wrapper, '@');

    act(() => {
      jest.runAllTimers();
    });

    // Check that the first non-disabled option is active
    const activeItem = wrapper.container.querySelector('.ant-mentions-dropdown-menu-item-active');
    expect(activeItem?.textContent).toBe('afc163');
  });
});
