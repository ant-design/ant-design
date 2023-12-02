import React from 'react';
import Layout from '..';
import { render } from '../../../tests/utils';

const { Sider, Footer, Header } = Layout;

describe('Layout.Warning', () => {
  (['Layout', 'Header', 'Footer', 'Sider'] as const).forEach((tag) => {
    const ComponentMap = { Layout, Header, Footer, Sider };

    // Since react will not throw warning for same message.
    // We create a new test suite here
    it(`not warning of non-element attr on ${tag}`, () => {
      /**
       * Should not call:
       * Warning: React does not recognize the `suffixCls` prop on a DOM element.
       * If you intentionally want it to appear in the DOM as a custom attribute,
       * spell it as lowercase `suffixcls` instead.
       * If you accidentally passed it from a parent component,
       * remove it from the DOM element.
       */
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const Component = ComponentMap[tag];
      render(<Component>{tag}</Component>);

      expect(errorSpy).not.toHaveBeenCalled();
      errorSpy.mockRestore();
    });
  });
});
