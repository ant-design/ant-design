import React from 'react';
import Moment from 'moment';
import MockDate from 'mockdate';
import { render } from '../utils';
import ConfigProvider from '../../components/config-provider';

interface TestOptions {
  mockDate?: boolean;
  componentName?: string;
}

function rtlTest(Component: React.ComponentType, { mockDate, componentName }: TestOptions = {}) {
  describe(`rtl render`, () => {
    it(`component should be rendered correctly in RTL direction`, () => {
      const isArray = componentName && ['menu'].includes(componentName);
      if (mockDate) {
        MockDate.set(Moment('2000-09-28').valueOf());
      }
      const { container } = render(
        <ConfigProvider direction="rtl">
          <Component />
        </ConfigProvider>,
      );
      expect(isArray ? container.children : container.firstChild).toMatchSnapshot();
      if (mockDate) {
        MockDate.reset();
      }
    });
  });
}

// eslint-disable-next-line jest/no-export
export default rtlTest;
