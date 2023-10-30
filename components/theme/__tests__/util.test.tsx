import getAlphaColor from '../util/getAlphaColor';
import calc from 'antd/es/theme/util/calc';

describe('util', () => {
  describe('getAlphaColor', () => {
    it('should not process color with alpha', () => {
      expect(getAlphaColor('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255)')).toBe('rgba(0, 0, 0, 0.5)');
    });
  });

  describe('calculator', () => {
    it('NumCalculator', () => {
      const calculator = calc('js');
      expect(calculator(1).add(1).equal()).toBe(2);
      expect(calculator(1).add(1).mul(4).equal()).toBe(8);
    });
    it('CSSCalculator', () => {
      const calculator = calc('css');
      expect(calculator(1).add(1).equal()).toBe('calc(1px + 1px)');
      expect(calculator(1).add(1).mul(4).equal()).toBe('calc(1px + 1px * 4)');
    });
  });
});
