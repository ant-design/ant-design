jest.dontMock('../index');
import antd, {
  Button,
} from '../index';

describe('antd', function() {
  it('antd and components should be existd', function() {
    expect(antd).toBeTruthy();
    expect(Button).toBeTruthy();
  });
});
