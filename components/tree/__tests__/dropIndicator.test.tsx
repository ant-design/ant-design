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
    expect(container.querySelector<HTMLDivElement>('div')).toHaveStyle({ bottom: '-3px' });
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
    expect(container.querySelector<HTMLDivElement>('div')).toHaveStyle({
      bottom: '-3px',
      left: `${24 + offset}px`,
    });
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
    expect(container.querySelector<HTMLDivElement>('div')).toHaveStyle({ top: '-3px' });
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
    expect(container.querySelector<HTMLDivElement>('div')).toHaveStyle({
      left: `${-2 * 24 + offset}px`,
    });
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
    expect(container.querySelector<HTMLDivElement>('div')).toHaveStyle({
      right: `${-2 * 24 + offset}px`,
    });
  });
});
