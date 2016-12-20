import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import demoTest from '../../../tests/shared/demoTest';
import routerDemo from '../demo/router.md';

demoTest('breadcrumb', { skip: ['router.md'] });

const testMethod = typeof window !== 'undefined' ? test : test.skip;
testMethod('renders ./components/breadcrumb/demo/router.md correctly', () => {
  const wrapper = render(routerDemo);
  expect(renderToJson(wrapper)).toMatchSnapshot();
});
