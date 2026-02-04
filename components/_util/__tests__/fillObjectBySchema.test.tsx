import { classNameFillObjectBySchema } from '../fillObjectBySchema';

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
    const data1: DemoSemanticType['classNames'] = {
      root: 'root-class',
      dragger: 'dragger-class',
    };
    const schema1 = { body: { _default: 'wrapper' } };
    const result1 = { root: 'root-class', dragger: { default: 'dragger-class' } };
    // need fill
    expect(classNameFillObjectBySchema(data1, schema1)).toEqual(result1);
    const data2: DemoSemanticType['classNames'] = {
      root: 'root-class',
      dragger: { default: 'dragger-class' },
    };
    // no need fill
    expect(classNameFillObjectBySchema(data2, schema1)).toEqual(result1);
  });
  it('styleFillObjectBySchema', () => {
    const data1: DemoSemanticType['styles'] = {
      root: { color: 'red' },
      dragger: { background: 'blue' },
    };
    const schema1 = { body: { _default: 'wrapper', _remove: ['active'] } };
    const result1 = {
      root: { color: 'red' },
      dragger: { default: { background: 'blue' } },
    };
    // need fill
    expect(classNameFillObjectBySchema(data1, schema1)).toEqual(result1);
    const data2: DemoSemanticType['styles'] = {
      root: { color: 'red' },
      dragger: { default: { background: 'blue' } },
    };
    // no need fill
    expect(classNameFillObjectBySchema(data2, schema1)).toEqual(result1);
    const data3: DemoSemanticType['styles'] = {
      root: { color: 'red' },
      dragger: { width: 1, active: { background: 'blue' } },
    };
    // remove active
    expect(classNameFillObjectBySchema(data3, schema1)).toEqual({
      root: { color: 'red' },
      dragger: { width: 1, default: { width: 1 }, active: { background: 'blue' } },
    });
  });
});
