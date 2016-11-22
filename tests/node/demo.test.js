import glob from 'glob';
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

const files = glob.sync('./components/**/demo/*.md');

const skip = [
  'mention', // https://github.com/facebook/draft-js/issues/385
  'menu', // https://github.com/react-component/menu/issues/63
  'breadcrumb/demo/router', // https://github.com/ReactTraining/react-router/blob/master/docs/guides/ServerRendering.md#history-singletons,
];

files.forEach((file) => {
  let testMethod = test;
  if (skip.some(c => file.includes(c))) {
    testMethod = test.skip;
  }
  testMethod(`renders ${file} correctly`, () => {
    const demo = require(`../.${file}`); // eslint-disable-line
    const wrapper = render(demo);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
