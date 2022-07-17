import React from 'react';
import { act } from 'react-dom/test-utils';
import OmitText from '..';
import accessibilityTest from '../../../tests/shared/accessibilityTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';

describe('OmitText', () => {
  rtlTest(OmitText);
  accessibilityTest(OmitText);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('could be closed', () => {
    const { container } = render(
      <OmitText>Warning Text Warning Text Warning TextWarning Text Warning Text Warning TextWarning Text</OmitText>,
    );

    act(() => {
      jest.useFakeTimers();
      fireEvent.click(container);
      jest.runAllTimers();
      jest.useRealTimers();
    });
  });
});
