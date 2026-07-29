import type { BuildInPlacements } from '@rc-component/trigger';

import mergedBuiltinPlacements from '../mergedBuiltinPlacements';

describe('mergedBuiltinPlacements', () => {
  it('enables overflow adjustment by default', () => {
    const placements = mergedBuiltinPlacements({});

    expect(placements.bottomLeft.overflow).toEqual({
      adjustX: true,
      adjustY: true,
      shiftY: true,
    });
  });

  it('disables overflow adjustment', () => {
    const placements = mergedBuiltinPlacements({ autoAdjustOverflow: false });

    expect(placements.bottomLeft.overflow).toEqual({
      adjustX: false,
      adjustY: false,
    });
  });

  it('supports custom overflow adjustment', () => {
    const placements = mergedBuiltinPlacements({
      autoAdjustOverflow: { adjustX: 0, adjustY: 1 },
    });

    expect(placements.bottomLeft.overflow).toEqual({
      adjustX: 0,
      adjustY: 1,
      shiftY: true,
    });
  });

  it('keeps custom builtin placements', () => {
    const builtinPlacements: BuildInPlacements = {
      bottomLeft: {
        points: ['tl', 'bl'],
      },
    };

    expect(
      mergedBuiltinPlacements({
        builtinPlacements,
        autoAdjustOverflow: false,
      }),
    ).toBe(builtinPlacements);
  });

  it('supports scroll popup overflow', () => {
    const placements = mergedBuiltinPlacements({ popupOverflow: 'scroll' });

    expect(placements.bottomLeft.htmlRegion).toBe('scroll');
  });
});
