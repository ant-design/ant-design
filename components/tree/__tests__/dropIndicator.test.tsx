import { render } from '../../../tests/utils';
import dropIndicatorRender, { offset } from '../utils/dropIndicator';

describe('dropIndicatorRender', () => {
  it('work with dropPosition before (1)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: 1,
      dropLevelOffset: 0,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const { container } = render(indicator);
    expect(container.querySelector('div')?.style.bottom).toEqual('-3px');
  });
  it('work with dropPosition inner (-0)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: 0,
      dropLevelOffset: 0,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const { container } = render(indicator);
    expect(container.querySelector('div')?.style.bottom).toEqual('-3px');
    expect(container.querySelector('div')?.style.left).toEqual(`${24 + offset}px`);
  });
  it('work with dropPosition after (-1)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 0,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const { container } = render(indicator);
    expect(container.querySelector('div')?.style.top).toEqual('-3px');
  });
  it('work with drop level', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 2,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const { container } = render(indicator);
    expect(container.querySelector('div')?.style.left).toEqual(`${-2 * 24 + offset}px`);
  });
  it('work with drop level (rtl)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 2,
      indent: 24,
      prefixCls: 'ant',
      direction: 'rtl',
    });
    const { container } = render(indicator);
    expect(container.querySelector('div')?.style.right).toEqual(`${-2 * 24 + offset}px`);
  });
});
