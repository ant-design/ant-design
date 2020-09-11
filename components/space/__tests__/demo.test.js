import { useMediaQuery } from 'react-responsive';
import demoTest from '../../../tests/shared/demoTest';

jest.mock('react-responsive');

beforeEach(() => {
  useMediaQuery.mockImplementation(() => true);
});

demoTest('space');
