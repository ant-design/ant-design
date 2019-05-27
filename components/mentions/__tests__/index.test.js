import React from 'react';
import { mount } from 'enzyme';
import Mentions from '..';

const { getMentions } = Mentions;

function simulateInput(wrapper, text = '', keyEvent) {
  const lastChar = text[text.length - 1];
  const myKeyEvent = keyEvent || {
    which: lastChar.charCodeAt(0),
    key: lastChar,
    target: {
      value: text,
      selectionStart: text.length,
    },
  };

  wrapper.find('textarea').simulate('keyDown', myKeyEvent);

  const textareaInstance = wrapper.find('textarea').instance();
  textareaInstance.value = text;
  textareaInstance.selectionStart = text.length;
  textareaInstance.selectionStart = text.length;

  if (!keyEvent) {
    wrapper.find('textarea').simulate('change', {
      target: { value: text },
    });
  }

  wrapper.find('textarea').simulate('keyUp', myKeyEvent);
  wrapper.update();
}

describe('Mentions', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('getMentions', () => {
    const mentions = getMentions('@light #bamboo cat', { prefix: ['@', '#'] });
    expect(mentions).toEqual([
      {
        prefix: '@',
        value: 'light',
      },
      {
        prefix: '#',
        value: 'bamboo',
      },
    ]);
  });

  it('focus', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const wrapper = mount(<Mentions onFocus={onFocus} onBlur={onBlur} />);
    wrapper.find('textarea').simulate('focus');
    expect(wrapper.find('.ant-mentions').hasClass('ant-mentions-focused')).toBeTruthy();
    expect(onFocus).toHaveBeenCalled();

    wrapper.find('textarea').simulate('blur');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-mentions').hasClass('ant-mentions-focused')).toBeFalsy();
    expect(onBlur).toHaveBeenCalled();
  });

  it('loading', () => {
    const wrapper = mount(<Mentions loading />);
    simulateInput(wrapper, '@');
    expect(wrapper.find('.ant-mentions-dropdown-menu-item').length).toBe(1);
    expect(wrapper.find('.ant-spin').length).toBeTruthy();
  });

  it('notFoundContent', () => {
    const wrapper = mount(<Mentions notFoundContent={<span className="bamboo-light" />} />);
    simulateInput(wrapper, '@');
    expect(wrapper.find('.ant-mentions-dropdown-menu-item').length).toBe(1);
    expect(wrapper.find('.bamboo-light').length).toBeTruthy();
  });
});
