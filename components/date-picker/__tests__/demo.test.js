import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import MockDate from 'mockdate';
import demoTest from '../../../tests/shared/demoTest';

demoTest('date-picker', { skip: ['locale.md'] });

test('renders ./components/date-picker/demo/locale.md correctly', () => {
  MockDate.set(new Date('2016-11-22').getTime());
  const LocaleDemo = require('../demo/locale'); // eslint-disable-line global-require
  const wrapper = render(LocaleDemo);
  expect(renderToJson(wrapper)).toMatchSnapshot();
  MockDate.reset();
});
