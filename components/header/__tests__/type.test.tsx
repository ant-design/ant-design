/* eslint-disable no-unused-expressions */

import * as React from 'react';
import Header from '..';

const { HeaderColumns, HeaderTitle } = Header;

describe('Header.typescript', () => {
  it.skip('Header Basic', () => { // TODO: repace test once we get styled-components to run in tests
    const header = (
      <Header>
        <HeaderColumns gridTemplateColumns="auto 1fr">
          <HeaderTitle>Title</HeaderTitle>
        </HeaderColumns>
      </Header>
    );

    expect(header).toBeTruthy();
  });
});

/* eslint-enable */
