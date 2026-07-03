import type { AliasToken } from '../../theme/internal';
import { genScrollFadeStyle } from '..';

describe('components/style', () => {
  describe('genScrollFadeStyle', () => {
    it('generates gradient edge fades for scrollable popup content', () => {
      const token = {
        colorBgElevated: '#fff',
        colorSplit: '#f0f0f0',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(genScrollFadeStyle(token)).toMatchObject({
        position: 'relative',
        '&::before, &::after': {
          position: 'sticky',
          zIndex: 1,
          display: 'block',
          height: '24px',
          pointerEvents: 'none',
          content: '""',
        },
        '&::before': {
          top: 0,
          marginBottom: 'calc(24px * -1)',
          backgroundImage: 'linear-gradient(to bottom, #fff, transparent)',
        },
        '&::after': {
          bottom: 0,
          marginTop: 'calc(24px * -1)',
          backgroundImage: 'linear-gradient(to bottom, transparent, #fff)',
        },
      });

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
      const beforeStyle = style['&::before'] as { backgroundImage: string; marginBottom: string };
      const afterStyle = style['&::after'] as { backgroundImage: string; marginTop: string };

      expect(beforeStyle.backgroundImage).toBe(
        'linear-gradient(to bottom, var(--ant-color-bg-elevated), transparent)',
      );
      expect(afterStyle.backgroundImage).toBe(
        'linear-gradient(to bottom, transparent, var(--ant-color-bg-elevated))',
      );
      expect(beforeStyle.marginBottom).toBe('calc(var(--ant-padding-lg) * -1)');
      expect(afterStyle.marginTop).toBe('calc(var(--ant-padding-lg) * -1)');
    });

    it('allows overriding the fade background color', () => {
      const token = {
        colorBgElevated: '#fff',
        colorSplit: '#f0f0f0',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(genScrollFadeStyle(token, { backgroundColor: '#001529' })).toMatchObject({
        '&::before': {
          backgroundImage: 'linear-gradient(to bottom, #001529, transparent)',
        },
        '&::after': {
          backgroundImage: 'linear-gradient(to bottom, transparent, #001529)',
        },
      });
    });
  });
});
