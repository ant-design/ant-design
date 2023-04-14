import { describe, it, expect } from 'vitest';
import * as React from 'react';
import TimePicker from '..';

describe('TimePicker.typescript', () => {
  it('No need picker props', () => {
    const rangePicker = <TimePicker.RangePicker />;

    expect(rangePicker).toBeTruthy();
  });
});
