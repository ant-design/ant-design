import { mergeClassNames } from '../hooks/useMergeSemantic';

describe('useMergeSemantic', () => {
  it('mergeClassNames', () => {
    const result = mergeClassNames(
      {
        dragger: {
          _default: 'default',
        },
      },
      {
        root: 'root-a',
        dragger: 'dragger-a',
      },
      {
        root: 'root-b',
        dragger: {
          default: 'dragger-b-default',
          active: 'dragger-b-active',
        },
      },
      {
        dragger: 'dragger-c',
      },
    );

    expect(result).toEqual({
      root: 'root-a root-b',
      dragger: {
        default: 'dragger-a dragger-b-default dragger-c',
        active: 'dragger-b-active',
      },
    });
  });
});
