import React, { useRef, useEffect } from 'react';
import App from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, screen } from '../../../tests/utils';

describe('App', () => {
  mountTest(App);
  rtlTest(App);

  it('single', () => {
    const Dome: React.FC = () => {
      const { message } = App.useApp();
      const showMessage = () => {
        message.success('success!!');
      };
      return (
        <>
          <button disabled type="button" onClick={showMessage}>
            Cover
          </button>
          <App>
            <div>Hello World</div>
          </App>
        </>
      );
    };
    const { getByText, container } = render(<Dome />);
    expect(getByText('cover title')).toBeTruthy();
    expect(getByText('cover description.')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
