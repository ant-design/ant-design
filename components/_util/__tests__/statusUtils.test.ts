import { getMergedStatus } from '../statusUtils';

describe('getMergedStatus', () => {
  it('explicit empty status should override context status', () => {
    expect(getMergedStatus('error', '')).toBe('');
  });
});
