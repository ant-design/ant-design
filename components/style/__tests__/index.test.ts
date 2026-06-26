import type { AliasToken } from '../../theme/internal';
import { genScrollFadeStyle } from '..';

describe('components/style', () => {
  describe('genScrollFadeStyle', () => {
    it('generates fallback edge shadows for scrollable popup content', () => {
      const token = {
        colorBgElevated: '#fff',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,
        paddingXXS: 4,
      } as AliasToken;

      expect(genScrollFadeStyle(token)).toMatchObject({
        backgroundImage: [
          'linear-gradient(#fff 30%, transparent)',
          'linear-gradient(transparent, #fff 70%)',
          'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)',
          'linear-gradient(to top, rgba(0,0,0,0.05), transparent)',
        ].join(', '),
        backgroundPosition: '0 0, 0 100%, 0 0, 0 100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 24px, 100% 24px, 100% 12px, 100% 12px',
        backgroundAttachment: 'local, local, scroll, scroll',
      });
    });

    it('uses scroll-driven overlays when supported', () => {
      const token = {
        colorBgElevated: '#fff',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(genScrollFadeStyle(token)).toMatchObject({
        '@supports (animation-timeline: scroll(nearest block))': {
          position: 'relative',
          backgroundImage: 'none',
          '&::before, &::after': {
            position: 'sticky',
            zIndex: 1,
            display: 'block',
            pointerEvents: 'none',
            opacity: 0,
            content: '""',
            animationDuration: 'auto',
            animationTimingFunction: 'linear',
            animationFillMode: 'both',
            animationTimeline: 'scroll(nearest block)',
          },
          '&::before': expect.objectContaining({
            top: 0,
            marginBottom: 'calc(24px * -1)',
            backgroundImage: 'linear-gradient(to bottom, #fff, transparent)',
          }),
          '&::after': expect.objectContaining({
            bottom: 0,
            marginTop: 'calc(24px * -1)',
            backgroundImage: 'linear-gradient(to top, #fff, transparent)',
          }),
        },
      });
    });

    it('keeps scroll overlay offsets valid with css variable tokens', () => {
      const token = {
        colorBgElevated: 'var(--ant-color-bg-elevated)',
        colorTextQuaternary: 'var(--ant-color-text-quaternary)',
        paddingLG: 'var(--ant-padding-lg)',
        paddingSM: 'var(--ant-padding-sm)',
      } as unknown as AliasToken;

      const style = genScrollFadeStyle(token);
      const supportedStyle = style['@supports (animation-timeline: scroll(nearest block))'] as {
        '&::before': { marginBottom: string };
        '&::after': { marginTop: string };
      };

      expect(supportedStyle['&::before'].marginBottom).toBe('calc(var(--ant-padding-lg) * -1)');
      expect(supportedStyle['&::after'].marginTop).toBe('calc(var(--ant-padding-lg) * -1)');
    });

    it('allows overriding the shadow color', () => {
      const token = {
        colorBgElevated: '#fff',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(genScrollFadeStyle(token, { shadowColor: 'rgba(255, 0, 0, 0.2)' })).toMatchObject({
        backgroundImage: expect.stringContaining('rgba(255, 0, 0, 0.2)'),
      });
    });
  });
});
