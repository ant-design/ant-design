import type { AliasToken } from '../../theme/internal';
import { genScrollFadeStyle } from '..';

describe('components/style', () => {
  describe('genScrollFadeStyle', () => {
    it('generates broad edge shadows for scrollable popup content', () => {
      const token = {
        colorBgElevated: '#fff',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.05)',
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,
        paddingXXS: 4,
      } as AliasToken;

      expect(genScrollFadeStyle(token)).toEqual({
        backgroundImage: [
          'linear-gradient(#fff 30%, transparent)',
          'linear-gradient(transparent, #fff 70%)',
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.05), transparent)',
          'linear-gradient(to top, rgba(0, 0, 0, 0.05), transparent)',
        ].join(', '),
        backgroundPosition: '0 0, 0 100%, 0 0, 0 100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 24px, 100% 24px, 100% 12px, 100% 12px',
        backgroundAttachment: 'local, local, scroll, scroll',
      });
    });
  });
});
