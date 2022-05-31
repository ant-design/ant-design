import React from 'react';
import Moment from 'moment';
import MockDate from 'mockdate';
import { render } from '../utils';
import ConfigProvider from '../../components/config-provider';

// eslint-disable-next-line jest/no-export
export default function rtlTest(Component: React.ComponentType, mockDate?: boolean) {
  describe(`rtl render`, () => {
    it(`component should be rendered correctly in RTL direction`, () => {
      if (mockDate) {
        MockDate.set(Moment('2000-09-28').valueOf());
      }
      const { asFragment } = render(
        <ConfigProvider direction="rtl">
          <Component />
        </ConfigProvider>,
      );
      const childNodes = Array.from(asFragment().childNodes);
      if (childNodes.length === 1) {
        expect(childNodes[0]).toMatchSnapshot();
      } else {
        expect(childNodes).toMatchSnapshot();
      }
      if (mockDate) {
        MockDate.reset();
      }
    });
  });
}
