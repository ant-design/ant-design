import getAlphaColor from '../util/getAlphaColor';
import genCalc from '../util/calc';

describe('util', () => {
  describe('getAlphaColor', () => {
    it('should not process color with alpha', () => {
      expect(getAlphaColor('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255)')).toBe('rgba(0, 0, 0, 0.5)');
    });
  });

  describe('calculator', () => {
    it('NumCalculator', () => {
      const calc = genCalc('js');
      expect(calc(1).add(1).equal()).toBe(2);
      expect(calc(1).add(1).mul(4).equal()).toBe(5);
      expect(calc(1).add(4).div(4).sub(2).equal()).toBe(0);
      expect(calc(1).add(4).div(calc(3).sub(2)).sub(2).equal()).toBe(3);
    });
    it('CSSCalculator', () => {
      const calc = genCalc('css');
      expect(calc(1).add(1).equal()).toBe('calc(1px + 1px)');
      expect(calc(1).add(1).mul(4).equal()).toBe('calc(1px + 1px * 4)');
      expect(calc(1).add(4).div(4).sub(2).equal()).toBe('calc(1px + 4px / 4 - 2px)');
      expect(calc(1).add(4).div(calc(3).sub(2)).sub(2).equal()).toBe(
        'calc(1px + 4px / (3px - 2px) - 2px)',
      );
    });
  });
});
