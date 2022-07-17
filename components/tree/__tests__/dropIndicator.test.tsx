import { mount } from 'enzyme';
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
    const wrapper = mount(indicator);
    expect(wrapper.props().style.bottom).toEqual(-3);
  });
  it('work with dropPosition inner (-0)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: 0,
      dropLevelOffset: 0,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.props().style.bottom).toEqual(-3);
    expect(wrapper.props().style.left).toEqual(24 + offset);
  });
  it('work with dropPosition after (-1)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 0,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.props().style.top).toEqual(-3);
  });
  it('work with drop level', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 2,
      indent: 24,
      prefixCls: 'ant',
      direction: 'ltr',
    });
    const wrapper = mount(indicator);
    expect(wrapper.props().style.left).toEqual(-2 * 24 + offset);
  });
  it('work with drop level (rtl)', () => {
    const indicator = dropIndicatorRender({
      dropPosition: -1,
      dropLevelOffset: 2,
      indent: 24,
      prefixCls: 'ant',
      direction: 'rtl',
    });
    const wrapper = mount(indicator);
    expect(wrapper.props().style.right).toEqual(-2 * 24 + offset);
  });
});
