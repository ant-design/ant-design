import glob from 'glob'
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

export default function demoTest(component, options = {}) {
  const testMethod = options.skip ? test.skip : test;
  const files = glob.sync(`./components/${component}/demo/*.md`);

  files.forEach(file => {
    testMethod(`renders ${file} correctly`, () => {
      const demo = require('../.' + file);
      const wrapper = render(demo);
      expect(renderToJson(wrapper)).toMatchSnapshot();
    });
  });
}
