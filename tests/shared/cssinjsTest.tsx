/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import glob from 'glob';
import { render } from 'enzyme';
import MockDate from 'mockdate';
import moment from 'moment';
import { StyleProvider, createCache } from '@ant-design/cssinjs';

function styleTest(component: string, demoName: string) {
  const files = glob.sync(`./components/${component}/demo/${demoName}.md`);

  files.forEach(file => {
    test('cssinjs should not warn', () => {
      const errSpy = jest.spyOn(console, 'error');

      MockDate.set(moment('2016-11-22').valueOf());
      let Demo = require(`../.${file}`).default; // eslint-disable-line global-require, import/no-dynamic-require
      // Inject Trigger status unless skipped
      Demo = typeof Demo === 'function' ? <Demo /> : Demo;

      // Inject cssinjs cache to avoid create <style /> element
      Demo = <StyleProvider cache={createCache()}>{Demo}</StyleProvider>;

      render(Demo);

      expect(errSpy).not.toHaveBeenCalledWith(expect.stringContaining('You seem to be using'));
      MockDate.reset();

      errSpy.mockRestore();
    });
  });
}

// eslint-disable-next-line jest/no-export
export default function cssinjsTest(component: string, demoName: string = 'basic') {
  styleTest(component, demoName);
}
