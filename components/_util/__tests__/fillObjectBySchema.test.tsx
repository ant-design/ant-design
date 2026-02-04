import { classNameFillObjectBySchema, styleFillObjectBySchema } from '../fillObjectBySchema';

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
  it('styleFillObjectBySchema', () => {
    const schema1 = { dragger: { _default: 'default', _remove: ['active'] } };

    const result1 = {
      root: { color: 'red' },
      dragger: { default: { background: 'blue' } },
    };
    const list: NonNullable<DemoSemanticType['styles']>[] = [
      // need fill
      { root: { color: 'red' }, dragger: { background: 'blue' } },
      // no need fill
      { root: { color: 'red' }, dragger: { default: { background: 'blue' } } },
      // remove active
      { root: { color: 'red' }, dragger: { width: 1, active: { background: 'blue' } } },
    ];
    expect(styleFillObjectBySchema(list[0], schema1)).toEqual(result1);
    expect(styleFillObjectBySchema(list[1], schema1)).toEqual(result1);
    expect(styleFillObjectBySchema(list[2], schema1)).toEqual({
      root: { color: 'red' },
      dragger: { default: { width: 1 }, active: { background: 'blue' } },
    });
  });
});
