/* eslint-disable no-unused-expressions */

import * as React from 'react';

import Footer from '..';
import ThemeProvider from '../../theme-provider';

describe('Footer.typescript', () => {
  it.skip('Footer Basic', () => { // TODO: repace test once we get styled-components to run in tests
    const footer = (
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );

    expect(footer).toBeTruthy();
  });
});

/* eslint-enable */
