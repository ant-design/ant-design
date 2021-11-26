import UnreachableException from '../unreachableException';

describe('UnreachableException', () => {
  it('error thrown matches snapshot', () => {
    const exception = new UnreachableException('some value');
    expect(exception.error.message).toMatchInlineSnapshot(`"unreachable case: \\"some value\\""`);
  });
});
