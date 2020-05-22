import React from 'react';
import { render } from 'enzyme';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

import Footer from '..';
import { DefaultAppLayoutProvider } from '../../layout';
import Theming from '../../varnish';

const { ThemeProvider } = Theming;

describe('Footer', () => {
  mountTest(Footer);
  rtlTest(Footer);

  describe('variants', () => {
    it('default', () => {
      const wrapper = render(
        <ThemeProvider>
          <DefaultAppLayoutProvider layoutVariant="app">
            <Footer />
          </DefaultAppLayoutProvider>
        </ThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('dark', () => {
      const wrapper = render(
        <ThemeProvider>
          <Footer variant="dark" />
        </ThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
