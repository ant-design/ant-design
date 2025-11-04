import type { PickerLocale } from '../generatePicker';
import { getPlaceholder, getRangePlaceholder } from '../util';

describe('DatePicker util', () => {
  const mockLocale: PickerLocale = {
    lang: {
      locale: 'en_US',
      placeholder: 'Select date',
      yearPlaceholder: 'Select year',
      quarterPlaceholder: 'Select quarter',
      monthPlaceholder: 'Select month',
      weekPlaceholder: 'Select week',
      rangePlaceholder: ['Start date', 'End date'],
      rangeYearPlaceholder: ['Start year', 'End year'],
      rangeQuarterPlaceholder: ['Start quarter', 'End quarter'],
      rangeMonthPlaceholder: ['Start month', 'End month'],
      rangeWeekPlaceholder: ['Start week', 'End week'],
      shortWeekDays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    timePickerLocale: {
      placeholder: 'Select time',
      rangePlaceholder: ['Start time', 'End time'],
    },
  };

  describe('getPlaceholder', () => {
    it('should return custom placeholder when provided', () => {
      expect(getPlaceholder(mockLocale, 'date', 'Custom')).toBe('Custom');
    });

    it('should return year placeholder for year picker', () => {
      expect(getPlaceholder(mockLocale, 'year')).toBe('Select year');
    });

    it('should return quarter placeholder for quarter picker', () => {
      expect(getPlaceholder(mockLocale, 'quarter')).toBe('Select quarter');
    });

    it('should return month placeholder for month picker', () => {
      expect(getPlaceholder(mockLocale, 'month')).toBe('Select month');
    });

    it('should return week placeholder for week picker', () => {
      expect(getPlaceholder(mockLocale, 'week')).toBe('Select week');
    });

    it('should return time placeholder for time picker', () => {
      expect(getPlaceholder(mockLocale, 'time')).toBe('Select time');
    });

    it('should return default placeholder for date picker', () => {
      expect(getPlaceholder(mockLocale, 'date')).toBe('Select date');
    });

    it('should return default placeholder when picker is undefined', () => {
      expect(getPlaceholder(mockLocale)).toBe('Select date');
    });
  });

  describe('getRangePlaceholder', () => {
    it('should return custom placeholder when provided', () => {
      expect(getRangePlaceholder(mockLocale, 'date', ['From', 'To'])).toEqual(['From', 'To']);
    });

    it('should return year range placeholder for year picker', () => {
      expect(getRangePlaceholder(mockLocale, 'year')).toEqual(['Start year', 'End year']);
    });

    it('should return quarter range placeholder for quarter picker', () => {
      expect(getRangePlaceholder(mockLocale, 'quarter')).toEqual([
        'Start quarter',
        'End quarter',
      ]);
    });

    it('should return month range placeholder for month picker', () => {
      expect(getRangePlaceholder(mockLocale, 'month')).toEqual(['Start month', 'End month']);
    });

    it('should return week range placeholder for week picker', () => {
      expect(getRangePlaceholder(mockLocale, 'week')).toEqual(['Start week', 'End week']);
    });

    it('should return time range placeholder for time picker', () => {
      expect(getRangePlaceholder(mockLocale, 'time')).toEqual(['Start time', 'End time']);
    });

    it('should return default range placeholder for date picker', () => {
      expect(getRangePlaceholder(mockLocale, 'date')).toEqual(['Start date', 'End date']);
    });

    it('should return default range placeholder when picker is undefined', () => {
      expect(getRangePlaceholder(mockLocale)).toEqual(['Start date', 'End date']);
    });
  });
});
