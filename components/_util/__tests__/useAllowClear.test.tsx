import React from 'react';
import dayjs from 'dayjs';
import { renderHook } from '@testing-library/react';

import { render } from '../../../tests/utils';
import DatePicker from '../../date-picker';
import type { AllowClear } from '../hooks/useAllowClear';
import { useAllowClear } from '../hooks/useAllowClear';

it('preserves false for callers that check whether clearing is enabled', () => {
  const { result, rerender } = renderHook(
    ({ allowClear }: { allowClear?: AllowClear }) =>
      useAllowClear({ allowClear, componentName: 'Input' }),
    { initialProps: { allowClear: undefined as AllowClear } },
  );
  expect(result.current).toBe(false);
  rerender({ allowClear: false });
  expect(result.current).toBe(false);

  const { container } = render(
    <DatePicker defaultValue={dayjs('2026-10-14')} allowClear={false} />,
  );
  expect(container.querySelector('.ant-picker-clear')).not.toBeInTheDocument();
});

it('inherits omitted fields and preserves explicit false, zero and empty labels', () => {
  const contextAllowClear = {
    clearIcon: 'Global icon',
    disabled: true,
    tabIndex: -1,
    label: 'Global clear',
  };
  const { result, rerender } = renderHook(
    ({ allowClear }: { allowClear: AllowClear }) =>
      useAllowClear({ allowClear, contextAllowClear, componentName: 'Input' }),
    { initialProps: { allowClear: true as AllowClear } },
  );
  expect(result.current).toEqual(contextAllowClear);
  rerender({ allowClear: { disabled: false, tabIndex: 0, label: '' } });
  expect(result.current).toEqual({
    clearIcon: 'Global icon',
    disabled: false,
    tabIndex: 0,
    label: '',
  });
  rerender({ allowClear: false });
  expect(result.current).toBe(false);
});

it('uses default labels only when component and global labels are absent', () => {
  const { result, rerender } = renderHook(
    ({
      allowClear,
      contextAllowClear,
    }: {
      allowClear: AllowClear;
      contextAllowClear?: AllowClear;
    }) =>
      useAllowClear({
        allowClear,
        contextAllowClear,
        defaultLabel: 'Clear',
        componentName: 'Input',
      }),
    {
      initialProps: { allowClear: true as AllowClear, contextAllowClear: undefined as AllowClear },
    },
  );
  expect(result.current).toMatchObject({ label: 'Clear' });
  rerender({ allowClear: true, contextAllowClear: { label: 'Global clear' } });
  expect(result.current).toMatchObject({ label: 'Global clear' });
  rerender({ allowClear: { label: 'Local clear' }, contextAllowClear: { label: 'Global clear' } });
  expect(result.current).toMatchObject({ label: 'Local clear' });
});

it('preserves an explicit null clear icon', () => {
  const { result } = renderHook(() =>
    useAllowClear({
      allowClear: { clearIcon: null },
      contextAllowClear: { clearIcon: 'Global icon' },
      componentName: 'Input',
    }),
  );
  expect(result.current).toMatchObject({ clearIcon: null });
});
