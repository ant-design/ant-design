import type { AliasToken } from '../../theme/internal';
import { genScrollFadeStyle } from '..';

describe('components/style', () => {
  describe('genScrollFadeStyle', () => {
    it('generates scroll-boundary-aware gradient edge fades', () => {
      const token = {
        colorBgElevated: '#fff',
        colorSplit: '#f0f0f0',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(genScrollFadeStyle(token)).toMatchObject({
        backgroundImage: [
          'linear-gradient(#fff 30%, transparent)',
          'linear-gradient(transparent, #fff 70%)',
          'linear-gradient(to bottom, #f0f0f0, transparent)',
          'linear-gradient(to top, #f0f0f0, transparent)',
        ].join(', '),
        backgroundPosition: '0 0, 0 100%, 0 0, 0 100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 24px, 100% 24px, 100% 24px, 100% 24px',
        backgroundAttachment: 'local, local, scroll, scroll',
      });

      expect(genScrollFadeStyle(token)).not.toHaveProperty('&::before');
      expect(genScrollFadeStyle(token)).not.toHaveProperty('&::after');
      expect(genScrollFadeStyle(token)).not.toHaveProperty(
        '@supports (animation-timeline: scroll(nearest block))',
      );
    });

    it('keeps css variable fade backgrounds without color parsing', () => {
      const token = {
        colorBgElevated: 'var(--ant-color-bg-elevated)',
        colorSplit: 'var(--ant-color-split)',
        colorTextQuaternary: 'var(--ant-color-text-quaternary)',
        paddingLG: 'var(--ant-padding-lg)',
        paddingSM: 'var(--ant-padding-sm)',
      } as unknown as AliasToken;

      const style = genScrollFadeStyle(token);

      expect(style.backgroundImage).toBe(
        [
          'linear-gradient(var(--ant-color-bg-elevated) 30%, transparent)',
          'linear-gradient(transparent, var(--ant-color-bg-elevated) 70%)',
          'linear-gradient(to bottom, var(--ant-color-split), transparent)',
          'linear-gradient(to top, var(--ant-color-split), transparent)',
        ].join(', '),
      );
      expect(style.backgroundSize).toBe(
        [
          '100% var(--ant-padding-lg)',
          '100% var(--ant-padding-lg)',
          '100% var(--ant-padding-lg)',
          '100% var(--ant-padding-lg)',
        ].join(', '),
      );
      expect(style.backgroundAttachment).toBe('local, local, scroll, scroll');
    });

    it('allows overriding the fade background and shadow colors', () => {
      const token = {
        colorBgElevated: '#fff',
        colorSplit: '#f0f0f0',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(
        genScrollFadeStyle(token, { backgroundColor: '#001529', shadowColor: 'rgba(255, 255, 255, 0.12)' }),
      ).toMatchObject({
        backgroundImage: [
          'linear-gradient(#001529 30%, transparent)',
          'linear-gradient(transparent, #001529 70%)',
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), transparent)',
          'linear-gradient(to top, rgba(255, 255, 255, 0.12), transparent)',
        ].join(', '),
      });
    });
  });
});
