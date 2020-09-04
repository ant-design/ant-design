import * as React from 'react';
import Slider from '..';

describe('Slider.typescript', () => {
  it('single value', () => {
    const value = 0;
    function onChange(v: number) {
      return v;
    }
    const result = (
      <Slider defaultValue={value} value={value} onChange={onChange} onAfterChange={onChange} />
    );
    expect(result).toBeTruthy();
  });

  it('range value', () => {
    const value: [number, number] = [0, 1];
    function onChange(v: [number, number]) {
      return v;
    }
    const result = (
      <Slider
        range
        defaultValue={value}
        value={value}
        onChange={onChange}
        onAfterChange={onChange}
      />
    );
    expect(result).toBeTruthy();
  });
});
