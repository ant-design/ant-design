import UnreachableException from '../unreachableException';

describe('UnreachableException', () => {
  it('error thrown matches snapshot', () => {
    const exception = new UnreachableException('some value');
    expect(exception.message).toMatchInlineSnapshot(`"unreachable case: \\"some value\\""`);
  });
});
