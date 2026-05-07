import { getTargetWaveColor, isValidWaveColor } from '../wave/util';

describe('wave util', () => {
  describe('isValidWaveColor', () => {
    it('should return false for transparent colors', () => {
      expect(isValidWaveColor('transparent')).toBe(false);
      expect(isValidWaveColor('rgba(0, 0, 0, 0)')).toBe(false);
      expect(isValidWaveColor('rgba(255, 255, 255, 0)')).toBe(false);
      expect(isValidWaveColor('rgba(123, 456, 789, 0)')).toBe(false);
      expect(isValidWaveColor('')).toBe(false);
      expect(isValidWaveColor('#0000')).toBe(false);
      expect(isValidWaveColor('#fff0')).toBe(false);
      expect(isValidWaveColor('#FFF0')).toBe(false);
      expect(isValidWaveColor('#00000000')).toBe(false);
      expect(isValidWaveColor('#ffffff00')).toBe(false);
    });

    it('should return true for valid colors', () => {
      expect(isValidWaveColor('red')).toBe(true);
      expect(isValidWaveColor('#000')).toBe(true);
      expect(isValidWaveColor('#123456')).toBe(true);
      expect(isValidWaveColor('#000f')).toBe(true);
      expect(isValidWaveColor('#000000ff')).toBe(true);
      expect(isValidWaveColor('#00000080')).toBe(true);
      expect(isValidWaveColor('rgb(0, 0, 0)')).toBe(true);
      expect(isValidWaveColor('rgba(0, 0, 0, 0.5)')).toBe(true);
      expect(isValidWaveColor('hsl(0, 0%, 0%)')).toBe(true);
      expect(isValidWaveColor('blue')).toBe(true);
    });
  });

  describe('getTargetWaveColor', () => {
    let mockElement: HTMLElement;

    const mockComputedStyle = (style: Partial<CSSStyleDeclaration>) => {
      jest.spyOn(globalThis, 'getComputedStyle').mockReturnValue(style as CSSStyleDeclaration);
    };

    beforeEach(() => {
      mockElement = document.createElement('div');
      document.body.appendChild(mockElement);
    });

    afterEach(() => {
      jest.restoreAllMocks();
      document.body.removeChild(mockElement);
    });

    afterAll(() => {
      mockElement?.remove();
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

    it('should read colors by border top, border, and background order', () => {
      mockComputedStyle({
        borderTopColor: '#1677ff',
        borderColor: '#52c41a',
        backgroundColor: '#faad14',
      });

      expect(getTargetWaveColor(mockElement)).toBe('#1677ff');

      mockComputedStyle({
        borderTopColor: 'transparent',
        borderColor: '#52c41a',
        backgroundColor: '#faad14',
      });

      expect(getTargetWaveColor(mockElement)).toBe('#52c41a');

      mockComputedStyle({
        borderTopColor: 'transparent',
        borderColor: '#fff',
        backgroundColor: '#faad14',
      });

      expect(getTargetWaveColor(mockElement)).toBe('#faad14');
    });

    it('should use colorSource first when it is valid', () => {
      mockComputedStyle({
        borderTopColor: '#1677ff',
        borderColor: '#52c41a',
        backgroundColor: '#faad14',
      });

      expect(getTargetWaveColor(mockElement, 'backgroundColor')).toBe('#faad14');
    });

    it('should fall back to target colors when colorSource is invalid', () => {
      mockComputedStyle({
        color: '#0000',
        borderTopColor: '#1677ff',
        borderColor: '#52c41a',
        backgroundColor: '#faad14',
      });

      expect(getTargetWaveColor(mockElement, 'color')).toBe('#1677ff');
    });

    it('should skip transparent hex colors', () => {
      mockComputedStyle({
        borderTopColor: '#0000',
        borderColor: '#ffffff00',
        backgroundColor: '#faad14',
      });

      expect(getTargetWaveColor(mockElement)).toBe('#faad14');
    });

    it('should return null when all target colors are transparent hex colors', () => {
      mockComputedStyle({
        borderTopColor: '#0000',
        borderColor: '#ffffff00',
        backgroundColor: '#00000000',
      });
      expect(getTargetWaveColor(mockElement)).toBe(null);
    });
  });
});
