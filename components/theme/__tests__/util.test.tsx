import getAlphaColor from '../util/getAlphaColor';

describe('util', () => {
  describe('getAlphaColor', () => {
    it('should not process color with alpha', () => {
      expect(getAlphaColor('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255)')).toBe('rgba(0, 0, 0, 0.5)');
    });
  });
});
