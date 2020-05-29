import React from 'react';
import { render } from 'enzyme';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

import Footer from '..';
import Layout from '../../layout';
import Theming from '../../varnish';

const { ThemeProvider } = Theming;
const { DefaultAppLayoutProvider } = Layout;

describe('Footer', () => {
  mountTest(Footer);
  rtlTest(Footer);

  describe('variants', () => {
    it.skip('default', () => { // TODO: repace test once we get styled-components to run in tests
      const wrapper = render(
        <ThemeProvider>
          <DefaultAppLayoutProvider layoutVariant="app">
            <Footer />
          </DefaultAppLayoutProvider>
        </ThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it.skip('dark', () => { // TODO: repace test once we get styled-components to run in tests
      const wrapper = render(
        <ThemeProvider>
          <Footer variant="dark" />
        </ThemeProvider>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
