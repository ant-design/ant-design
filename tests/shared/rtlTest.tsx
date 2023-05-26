import dayjs from 'dayjs';
import MockDate from 'mockdate';
import React from 'react';
import ConfigProvider from '../../components/config-provider';
import { render } from '../utils';

const rtlTest = (Component: React.ComponentType, mockDate = false) => {
  describe('rtl render', () => {
    it('component should be rendered correctly in RTL direction', () => {
      if (mockDate) {
        MockDate.set(dayjs('2000-09-28').valueOf());
      }
      const { container } = render(
        <ConfigProvider direction="rtl">
          <Component />
        </ConfigProvider>,
      );
      expect(container.firstChild).toMatchSnapshot();
      if (mockDate) {
        MockDate.reset();
      }
    });
  });
};

// eslint-disable-next-line jest/no-export
export default rtlTest;
