import * as React from 'react';
import { render } from '../../tests/utils';

describe('SetUp.Test', () => {
  it('diff of React 18 & React 17', () => {
    const { container } = render(
      <>
        <div>{['bamboo', '', 'little']}</div>
        <div>{['', '']}</div>
      </>,
    );
    expect(container.childNodes).toMatchSnapshot();
  });
});
