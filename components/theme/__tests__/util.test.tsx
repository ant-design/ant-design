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
      expect(calc(2).mul(calc(2).add(3)).equal()).toBe(10);
      expect(calc(calc(1).add(2)).mul(3).equal()).toBe(9);
      expect(calc(1).add(calc(2).sub(1)).equal()).toBe(2);
      expect(calc(5).sub(calc(2).sub(1)).equal()).toBe(4);
    });
    it('CSSCalculator', () => {
      const calc = genCalc('css');
      expect(calc(1).add(1).equal()).toBe('calc(1px + 1px)');
      expect(calc(1).add(1).mul(4).equal()).toBe('calc(1px + 1px * 4)');
      expect(calc(1).add(4).div(4).sub(2).equal()).toBe('calc(1px + 4px / 4 - 2px)');
      expect(calc(1).add(4).div(calc(3).sub(2)).sub(2).equal()).toBe(
        'calc(1px + 4px / (3px - 2px) - 2px)',
      );
      expect(calc(2).mul(calc(2).add(3)).equal()).toBe('calc(2px * (2px + 3px))');
      expect(calc(calc(1).add(2)).mul(3).equal()).toBe('calc((1px + 2px) * 3)');
      expect(calc(1).add(calc(2).sub(1)).equal()).toBe('calc(1px + (2px - 1px))');
      expect(calc(5).sub(calc(2).sub(1)).equal()).toBe('calc(5px - (2px - 1px))');
    });
  });
});
