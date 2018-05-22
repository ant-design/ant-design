import demoTest from '../../../tests/shared/demoTest';

jest.mock('draft-js/lib/generateRandomKey', () => () => '123');

if (process.env.LIB_DIR !== 'dist') {
  demoTest('mention');
}
