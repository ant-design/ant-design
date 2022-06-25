import KeyCode from 'rc-util/lib/KeyCode';
import React from 'react';
import { fireEvent, render } from '../../../tests/utils';
import Paragraph from '../Paragraph';

test('Callback on enter key is triggered', () => {
  const onEditStart = jest.fn();
  const onCopy = jest.fn();

  const { container: wrapper } = render(
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
  fireEvent.keyUp(wrapper.querySelectorAll('.ant-typography-copy')[0], { keyCode: KeyCode.ENTER });
  fireEvent.keyUp(wrapper.querySelectorAll('.anticon-edit')[0], { keyCode: KeyCode.ENTER });

  expect(onEditStart.mock.calls.length).toBe(1);
  expect(onCopy.mock.calls.length).toBe(1);
  jest.restoreAllMocks();
});
