import { isValidWaveColor, getTargetWaveColor } from '../wave/util';

describe('wave util', () => {
  describe('isValidWaveColor', () => {
    it('should return false for transparent colors', () => {
      expect(isValidWaveColor('transparent')).toBe(false);
      expect(isValidWaveColor('rgba(0, 0, 0, 0)')).toBe(false);
      expect(isValidWaveColor('rgba(255, 255, 255, 0)')).toBe(false);
      expect(isValidWaveColor('rgba(123, 456, 789, 0)')).toBe(false);
    });

    it('should return true for valid colors', () => {
      expect(isValidWaveColor('red')).toBe(true);
      expect(isValidWaveColor('#000')).toBe(true);
      expect(isValidWaveColor('#123456')).toBe(true);
      expect(isValidWaveColor('rgb(0, 0, 0)')).toBe(true);
      expect(isValidWaveColor('rgba(0, 0, 0, 0.5)')).toBe(true);
      expect(isValidWaveColor('hsl(0, 0%, 0%)')).toBe(true);
      expect(isValidWaveColor('blue')).toBe(true);
    });
  });

  describe('getTargetWaveColor', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = document.createElement('div');
      document.body.appendChild(mockElement);
    });

    afterEach(() => {
      document.body.removeChild(mockElement);
    });

    it('should return a valid color when available', () => {
      mockElement.style.backgroundColor = 'green';

      const result = getTargetWaveColor(mockElement);
      expect(result).toBe('rgb(0, 128, 0)');
    });

    it('should handle elements with no explicit styles', () => {
      const result = getTargetWaveColor(mockElement);
      expect(result).toBe(null);
    });

    it('should work with different color formats', () => {
      mockElement.style.backgroundColor = '#ff0000';
      const result1 = getTargetWaveColor(mockElement);
      expect(result1).toBe('rgb(255, 0, 0)');

      mockElement.style.backgroundColor = 'rgb(255, 0, 0)';
      const result2 = getTargetWaveColor(mockElement);
      expect(result2).toBe('rgb(255, 0, 0)');
    });

    it('should return null when all colors are white or transparent', () => {
      mockElement.style.borderTopColor = 'transparent';
      mockElement.style.borderColor = '#fff';
      mockElement.style.backgroundColor = 'rgba(255, 255, 255, 0)';

      const result = getTargetWaveColor(mockElement);
      expect(result).toBe(null);
    });
  });
});
