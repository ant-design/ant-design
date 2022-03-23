import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Paragraph from '../Paragraph';

test('Callback on enter key is triggered', () => {
  const onEditStart = jest.fn();
  const onCopy = jest.fn();

  const wrapper = mount(
    <Paragraph
      copyable={{
        onCopy,
      }}
      editable={{
        onStart: onEditStart,
      }}
    >
      test
    </Paragraph>,
  );
  const timer: any = 9527;
  jest.spyOn(window, 'setTimeout').mockReturnValue(timer);
  jest.spyOn(window, 'clearTimeout');
  // must copy first, because editing button will hide copy button
  wrapper.find('.ant-typography-copy').at(0).simulate('keyup', { keyCode: KeyCode.ENTER });
  wrapper.find('.anticon-edit').at(0).simulate('keyup', { keyCode: KeyCode.ENTER });

  expect(onEditStart.mock.calls.length).toBe(1);
  expect(onCopy.mock.calls.length).toBe(1);
  jest.restoreAllMocks();
});
