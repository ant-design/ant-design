import React from 'react';
import { renderHook } from '@testing-library/react';

import DisabledContext from '../../config-provider/DisabledContext';
import { FormItemInputContext } from '../../form/context';
import usePickerCommonState from '../hooks/usePickerCommonState';
import usePickerDeprecatedWarnings from '../hooks/usePickerDeprecatedWarnings';

describe('DatePicker Hooks', () => {
  describe('usePickerDeprecatedWarnings', () => {
    it('should not throw when called in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      expect(() => {
        renderHook(() =>
          usePickerDeprecatedWarnings('DatePicker', { dropdownClassName: 'test' }),
        );
      }).not.toThrow();

      process.env.NODE_ENV = originalEnv;
    });

    it('should handle component name correctly', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      expect(() => {
        renderHook(() => usePickerDeprecatedWarnings('DatePicker.RangePicker', {}));
      }).not.toThrow();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('usePickerCommonState', () => {
    it('should return correct merged size', () => {
      const { result } = renderHook(() =>
        usePickerCommonState({
          customizeSize: 'small',
          compactSize: undefined,
          customDisabled: false,
        }),
      );

      expect(result.current.mergedSize).toBe('small');
      expect(result.current.mergedDisabled).toBe(false);
    });

    it('should use disabled from context when customDisabled is not provided', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DisabledContext.Provider value={true}>{children}</DisabledContext.Provider>
      );

      const { result } = renderHook(
        () =>
          usePickerCommonState({
            customizeSize: undefined,
            compactSize: undefined,
            customDisabled: undefined,
          }),
        { wrapper },
      );

      expect(result.current.mergedDisabled).toBe(true);
    });

    it('should prioritize customDisabled over context', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <DisabledContext.Provider value={true}>{children}</DisabledContext.Provider>
      );

      const { result } = renderHook(
        () =>
          usePickerCommonState({
            customizeSize: undefined,
            compactSize: undefined,
            customDisabled: false,
          }),
        { wrapper },
      );

      expect(result.current.mergedDisabled).toBe(false);
    });

    it('should return form item context', () => {
      const mockFormContext = {
        name: 'test',
        hasFeedback: true,
        status: 'error' as const,
        feedbackIcon: null,
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <FormItemInputContext.Provider value={mockFormContext}>
          {children}
        </FormItemInputContext.Provider>
      );

      const { result } = renderHook(
        () =>
          usePickerCommonState({
            customizeSize: undefined,
            compactSize: undefined,
            customDisabled: undefined,
          }),
        { wrapper },
      );

      expect(result.current.formItemContext).toBeDefined();
      expect(result.current.formItemContext.hasFeedback).toBe(true);
      expect(result.current.formItemContext.status).toBe('error');
    });
  });
});
