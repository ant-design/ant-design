import dayjs from 'dayjs';
import demoTest from '../../../tests/shared/demoTest';

demoTest('calendar', {
  testRootProps: {
    value: dayjs(),
  },
  skip: ['lunar.tsx'],
});
