import glob from 'glob'
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

const files = glob.sync('./components/**/demo/*.md');

files.forEach(file => {
  test(`renders ${file} correctly`, () => {
    const demo = require('.' + file);
    const wrapper = render(demo);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
