import glob from 'glob'
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import MockDate from 'mockdate';

export default function demoTest(component, options = {}) {
  const testMethod = options.skip ? test.skip : test;
  const files = glob.sync(`./components/${component}/demo/*.md`);

  files.forEach(file => {
    testMethod(`renders ${file} correctly`, () => {
      MockDate.set(1479772800000, new Date().getTimezoneOffset()); // 2016-11-22
      const demo = require('../.' + file);
      const wrapper = render(demo);
      expect(renderToJson(wrapper)).toMatchSnapshot();
      MockDate.reset();
    });
  });
}
