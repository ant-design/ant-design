/* eslint-disable no-unused-expressions */

import * as React from 'react';

import Footer from '..';
import Theming from '../../varnish';

const { ThemeProvider } = Theming;

describe('Footer.typescript', () => {
  it('Footer Basic', () => {
    const footer = (
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );

    expect(footer).toBeTruthy();
  });
});

/* eslint-enable */
