import type { AliasToken } from '../../theme/internal';
import { genScrollFadeStyle } from '..';

describe('components/style', () => {
  describe('genScrollFadeStyle', () => {
    it('generates subtle static edge shadows for scrollable popup content', () => {
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
          height: '12px',
          pointerEvents: 'none',
          content: '""',
        },
        '&::before': {
          top: 0,
          marginBottom: 'calc(12px * -1)',
          boxShadow: 'inset 0 8px 12px -12px #f0f0f0',
        },
        '&::after': {
          bottom: 0,
          marginTop: 'calc(12px * -1)',
          boxShadow: 'inset 0 -8px 12px -12px #f0f0f0',
        },
      });

      expect(genScrollFadeStyle(token)).not.toHaveProperty(
        '@supports (animation-timeline: scroll(nearest block))',
      );
    });

    it('keeps css variable shadow colors without color parsing', () => {
      const token = {
        colorBgElevated: 'var(--ant-color-bg-elevated)',
        colorSplit: 'var(--ant-color-split)',
        colorTextQuaternary: 'var(--ant-color-text-quaternary)',
        paddingLG: 'var(--ant-padding-lg)',
        paddingSM: 'var(--ant-padding-sm)',
      } as unknown as AliasToken;

      const style = genScrollFadeStyle(token);
      const beforeStyle = style['&::before'] as { boxShadow: string; marginBottom: string };
      const afterStyle = style['&::after'] as { boxShadow: string; marginTop: string };

      expect(beforeStyle.boxShadow).toBe('inset 0 8px 12px -12px var(--ant-color-split)');
      expect(afterStyle.boxShadow).toBe('inset 0 -8px 12px -12px var(--ant-color-split)');
      expect(beforeStyle.marginBottom).toBe('calc(var(--ant-padding-sm) * -1)');
      expect(afterStyle.marginTop).toBe('calc(var(--ant-padding-sm) * -1)');
    });

    it('allows overriding the shadow color', () => {
      const token = {
        colorBgElevated: '#fff',
        colorSplit: '#f0f0f0',
        colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        paddingLG: 24,
        paddingSM: 12,
      } as AliasToken;

      expect(genScrollFadeStyle(token, { shadowColor: 'rgba(255, 0, 0, 0.2)' })).toMatchObject({
        '&::before': {
          boxShadow: 'inset 0 8px 12px -12px rgba(255, 0, 0, 0.2)',
        },
        '&::after': {
          boxShadow: 'inset 0 -8px 12px -12px rgba(255, 0, 0, 0.2)',
        },
      });
    });
  });
});
