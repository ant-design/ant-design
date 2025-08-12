import { renderHook } from '@testing-library/react';
import useMergeCondition, {
  useMergeConditionalStyles,
  useMergeConditionalClassNames,
} from '../hooks/useMergeCondition';

describe('useMergeConditionalClassNames', () => {
  const conditions = [
    { props: { variant: 'outlined' }, classNames: { root: 'btn-outlined' } },
    {
      props: { variant: 'outlined', size: 'large' },
      classNames: { root: 'bg-gray-100 bg-large bg-hover' },
    },
    { props: { variant: 'outlined' }, classNames: { root: 'opacity-50', icon: 'opacity-50' } },
  ];

  it('merges all matching classNames', () => {
    const props = { variant: 'outlined', size: 'large' };
    const { result } = renderHook(() => useMergeConditionalClassNames(props, conditions));

    expect(result.current).toEqual({
      root: 'btn-outlined bg-gray-100 bg-large bg-hover opacity-50',
      icon: 'opacity-50',
    });
  });

  it('returns empty when no match', () => {
    const props = { variant: 'filled' };
    const { result } = renderHook(() => useMergeConditionalClassNames(props, conditions));

    expect(result.current).toEqual({});
  });

  it('merges only partial matches', () => {
    const props = { variant: 'outlined', size: 'large' };
    const { result } = renderHook(() => useMergeConditionalClassNames(props, conditions));

    expect(result.current).toEqual({
      root: 'btn-outlined bg-gray-100 bg-large bg-hover opacity-50',
      icon: 'opacity-50',
    });
  });
});

describe('useMergeConditionalStyles', () => {
  const conditions = [
    { props: { variant: 'outlined' }, styles: { root: { border: '1px solid red' } } },
    { props: { variant: 'outlined', size: 'large' }, styles: { root: { padding: '16px' } } },
    { props: { variant: 'outlined' }, styles: { root: { opacity: 0.5 }, icon: { opacity: 0.5 } } },
  ];

  it('merges all matching styles', () => {
    const props = { variant: 'outlined', size: 'large' };
    const { result } = renderHook(() => useMergeConditionalStyles(props, conditions));

    expect(result.current).toEqual({
      root: { border: '1px solid red', padding: '16px', opacity: 0.5 },
      icon: { opacity: 0.5 },
    });
  });

  it('returns empty when no match', () => {
    const props = { variant: 'filled' };
    const { result } = renderHook(() => useMergeConditionalStyles(props, conditions));

    expect(result.current).toEqual({});
  });
});

describe('useMergeCondition', () => {
  const conditions = [
    {
      props: { variant: 'outlined' },
      classNames: { root: 'btn-outlined' },
      styles: { root: { border: '1px solid red' } },
    },
    {
      props: { variant: 'outlined', size: 'large' },
      classNames: { root: 'bg-gray-100' },
      styles: { root: { padding: '16px' } },
    },
    {
      props: { variant: 'outlined' },
      classNames: { root: 'opacity-50', icon: 'opacity-50' },
      styles: { root: { opacity: 0.5 } },
    },
  ];

  it('returns merged classNames and styles', () => {
    const props = { variant: 'outlined', size: 'large' };
    const { result } = renderHook(() => useMergeCondition(props, conditions));

    const [classNames, styles] = result.current;

    expect(classNames).toEqual({
      root: 'btn-outlined bg-gray-100 opacity-50',
      icon: 'opacity-50',
    });
    expect(styles).toEqual({
      root: { border: '1px solid red', padding: '16px', opacity: 0.5 },
    });
  });
});
