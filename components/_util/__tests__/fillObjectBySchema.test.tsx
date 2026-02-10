import { classNameFillObjectBySchema } from '../hooks/useMergeSemanticNew/utils';

type DemoSemanticType = {
  classNames?: {
    root?: string;
    dragger?: string | { default?: string };
  };
  styles?: {
    root?: React.CSSProperties;
    dragger?: React.CSSProperties | { default?: React.CSSProperties; active?: React.CSSProperties };
  };
};

describe('fillObjectBySchema,', () => {
  it('classNameFillObjectBySchema', () => {
    const schema1 = { dragger: { _default: 'default' } };

    const result1 = { root: 'root-class', dragger: { default: 'dragger-class' } };
    const list: NonNullable<DemoSemanticType['classNames']>[] = [
      // need fill
      { root: 'root-class', dragger: 'dragger-class' },
      // no need fill
      { root: 'root-class', dragger: { default: 'dragger-class' } },
    ];
    expect(classNameFillObjectBySchema(list[0], schema1)).toEqual(result1);
    expect(classNameFillObjectBySchema(list[1], schema1)).toEqual(result1);
  });
});
