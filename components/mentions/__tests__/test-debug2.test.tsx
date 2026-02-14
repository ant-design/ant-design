import React from 'react';
import type { GetProp, MentionProps } from 'antd';
import Mentions from '../index';
import { fireEvent, render, act } from '../../../tests/utils';

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

describe('Mentions Debug 2', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('debug enter key', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
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

    const wrapper = render(
      <Mentions 
        options={options} 
        onSelect={onSelect} 
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );

    const textarea = wrapper.container.querySelector('textarea')!;
    
    // Simulate typing @
    const lastChar = '@';
    const text = '@';
    const myKeyEvent = {
      which: lastChar.charCodeAt(0),
      key: lastChar,
      target: {
        value: text,
        selectionStart: text.length,
      },
    };

    fireEvent.keyDown(textarea, myKeyEvent);
    textarea.value = text;
    textarea.selectionStart = text.length;
    textarea.selectionEnd = text.length;
    fireEvent.change(textarea, { target: { value: text } });
    fireEvent.keyUp(textarea, myKeyEvent);

    act(() => {
      jest.runAllTimers();
    });

    console.log('After @ - Dropdown visible:', !!wrapper.container.querySelector('.ant-mentions-dropdown'));
    console.log('After @ - Dropdown items:', wrapper.container.querySelectorAll('.ant-mentions-dropdown-menu-item').length);
    console.log('After @ - Textarea value:', textarea.value);

    // Press Enter
    const enterEvent = { which: 13, key: 'Enter' };
    fireEvent.keyDown(textarea, enterEvent);

    console.log('After Enter keyDown - onKeyDown calls:', onKeyDown.mock.calls.length);
    console.log('After Enter keyDown - onSelect calls:', onSelect.mock.calls.length);

    act(() => {
      jest.runAllTimers();
    });

    console.log('After timers - onSelect calls:', onSelect.mock.calls.length);
    console.log('After timers - onChange calls:', onChange.mock.calls.length);
    console.log('After timers - Textarea value:', textarea.value);
    console.log('After timers - Dropdown visible:', !!wrapper.container.querySelector('.ant-mentions-dropdown'));
  });
});
