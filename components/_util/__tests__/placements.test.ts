import { getOverflowOptions } from '../placements';

describe('getOverflowOptions', () => {
  const arrowOffset = { arrowOffsetHorizontal: 12, arrowOffsetVertical: 8 };

  it('preserves an explicitly disabled adjustX on non-cardinal placements', () => {
    expect(getOverflowOptions('topLeft', arrowOffset, 4, { adjustX: 0 })).toEqual(
      expect.objectContaining({ adjustX: 0 }),
    );
  });

  it('preserves an explicitly disabled adjustY on non-cardinal placements', () => {
    expect(getOverflowOptions('topLeft', arrowOffset, 4, { adjustY: 0 })).toEqual(
      expect.objectContaining({ adjustY: 0 }),
    );
  });

  it('enables both adjustments by default on non-cardinal placements', () => {
    expect(getOverflowOptions('topLeft', arrowOffset, 4)).toEqual(
      expect.objectContaining({ adjustX: true, adjustY: true }),
    );
  });
});
