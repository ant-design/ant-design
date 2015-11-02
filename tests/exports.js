jest.dontMock('../index');
var antd = require('../index');

describe('antd', function() {
  it('antd should be existd', function() {
     expect(antd).toBeTruthy();
  });
});
