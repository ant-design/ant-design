import { getOverflowOptions } from '../placements';

// arrowOffsetHorizontal / arrowOffsetVertical are intentionally DIFFERENT so
// that a regression which shares one offset for both axes changes the numeric
// result and breaks the assertion.
const arrowOffset = {
  arrowOffsetHorizontal: 4,
  arrowOffsetVertical: 7,
} as unknown as Parameters<typeof getOverflowOptions>[1];
const arrowWidth = 8;
const horizontalShift = 4 * 2 + 8; // = 16
const verticalShift = 7 * 2 + 8; // = 22

describe('getOverflowOptions angular placements', () => {
  it('top angle placements get a numeric shiftX (horizontal let-place)', () => {
    ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach((p) => {
      const r = getOverflowOptions(p, arrowOffset, arrowWidth, true);
      expect(r.adjustX).toBe(true);
      expect(r.adjustY).toBe(true);
      expect(r.shiftX).toBe(horizontalShift);
    });
  });

  it('left angle placements get a numeric shiftY (vertical let-place)', () => {
    ['leftTop', 'leftBottom', 'rightTop', 'rightBottom'].forEach((p) => {
      const r = getOverflowOptions(p, arrowOffset, arrowWidth, true);
      expect(r.adjustX).toBe(true);
      expect(r.adjustY).toBe(true);
      expect(r.shiftY).toBe(verticalShift);
    });
  });

  it('4 cardinal directions keep original behaviour', () => {
    const top = getOverflowOptions('top', arrowOffset, arrowWidth, true);
    expect(top.adjustY).toBe(true);
    expect(top.shiftX).toBe(horizontalShift);
    expect(top.shiftY).toBe(true);

    const left = getOverflowOptions('left', arrowOffset, arrowWidth, true);
    expect(left.adjustX).toBe(true);
    expect(left.shiftY).toBe(verticalShift);
    expect(left.shiftX).toBe(true);
  });

  it('autoAdjustOverflow false disables both axes', () => {
    const r = getOverflowOptions('topLeft', arrowOffset, arrowWidth, false);
    expect(r.adjustX).toBe(false);
    expect(r.adjustY).toBe(false);
  });
});
