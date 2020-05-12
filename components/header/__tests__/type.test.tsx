/* eslint-disable no-unused-expressions */

import * as React from 'react';
import { Header, HeaderColumns, HeaderTitle } from '..';

describe('Header.typescript', () => {
  it('Header Basic', () => {
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
