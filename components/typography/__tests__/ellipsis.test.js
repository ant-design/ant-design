import React from 'react';
import { mount } from 'enzyme';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import Base from '../Base';
import Typography from '../Typography';
import { sleep } from '../../../tests/utils';
// eslint-disable-next-line no-unused-vars
import * as styleChecker from '../../_util/styleChecker';

jest.mock('copy-to-clipboard');

jest.mock('../../_util/styleChecker', () => ({
  isStyleSupport: () => true,
}));

describe('Typography.Ellipsis', () => {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let mockRectSpy;

  beforeAll(() => {
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      offsetHeight: {
        get() {
          let html = this.innerHTML;
          html = html.replace(/<[^>]*>/g, '');
          const lines = Math.ceil(html.length / LINE_STR_COUNT);
          return lines * 16;
        },
      },
      offsetWidth: {
        get: () => 100,
      },
      getBoundingClientRect() {
        let html = this.innerHTML;
        html = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(html.length / LINE_STR_COUNT);
        return { height: lines * 16 };
      },
    });
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    mockRectSpy.mockRestore();
  });

  const fullStr =
    'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

  it('should trigger update', async () => {
    const onEllipsis = jest.fn();
    const wrapper = mount(
      <Base ellipsis={{ onEllipsis }} component="p" editable>
        {fullStr}
      </Base>,
    );

    // First resize
    wrapper.triggerResize();
    await sleep(20);
    wrapper.update();
    expect(wrapper.text()).toEqual('Bamboo is Little ...');
    expect(onEllipsis).toHaveBeenCalledWith(true);
    onEllipsis.mockReset();

    // Second resize
    wrapper.setProps({ ellipsis: { rows: 2, onEllipsis } });
    await sleep(20);
    wrapper.update();
    expect(wrapper.text()).toEqual('Bamboo is Little Light Bamboo is Litt...');
    expect(onEllipsis).not.toHaveBeenCalled();

    // Third resize
    wrapper.setProps({ ellipsis: { rows: 99, onEllipsis } });
    await sleep(20);
    wrapper.update();
    expect(wrapper.find('p').text()).toEqual(fullStr);
    expect(onEllipsis).toHaveBeenCalledWith(false);

    wrapper.unmount();
  });

  it('support css multiple lines', async () => {
    const wrapper = mount(
      <Base ellipsis={{ rows: 2 }} component="p">
        {fullStr}
      </Base>,
    );

    expect(wrapper.exists('.ant-typography-ellipsis-multiple-line')).toBeTruthy();
    expect(wrapper.find(Typography).prop('style').WebkitLineClamp).toEqual(2);
  });

  it('string with parentheses', async () => {
    const parenthesesStr = `Ant Design, a design language (for background applications, is refined by
        Ant UED Team. Ant Design, a design language for background applications,
        is refined by Ant UED Team. Ant Design, a design language for background
        applications, is refined by Ant UED Team. Ant Design, a design language
        for background applications, is refined by Ant UED Team. Ant Design, a
        design language for background applications, is refined by Ant UED Team.
        Ant Design, a design language for background applications, is refined by
        Ant UED Team.`;
    const onEllipsis = jest.fn();
    const wrapper = mount(
      <Base ellipsis={{ onEllipsis }} component="p" editable>
        {parenthesesStr}
      </Base>,
    );

    wrapper.triggerResize();
    await sleep(20);
    wrapper.update();
    expect(wrapper.text()).toEqual('Ant Design, a des...');
    const ellipsisSpan = wrapper.find('span[aria-hidden]').last();
    expect(ellipsisSpan.text()).toEqual('...');
    onEllipsis.mockReset();

    wrapper.unmount();
  });

  it('should middle ellipsis', async () => {
    const suffix = '--suffix';
    const wrapper = mount(
      <Base ellipsis={{ rows: 1, suffix }} component="p">
        {fullStr}
      </Base>,
    );

    wrapper.triggerResize();
    await sleep(20);
    wrapper.update();
    expect(wrapper.find('p').text()).toEqual('Bamboo is...--suffix');
    wrapper.unmount();
  });

  it('should front or middle ellipsis', async () => {
    const suffix = '--The information is very important';
    const wrapper = mount(
      <Base ellipsis={{ rows: 1, suffix }} component="p">
        {fullStr}
      </Base>,
    );

    wrapper.triggerResize();
    await sleep(20);
    wrapper.update();
    expect(wrapper.find('p').text()).toEqual('...--The information is very important');

    wrapper.setProps({ ellipsis: { rows: 2, suffix } });
    await sleep(20);
    wrapper.update();
    expect(wrapper.find('p').text()).toEqual('Ba...--The information is very important');

    wrapper.setProps({ ellipsis: { rows: 99, suffix } });
    await sleep(20);
    wrapper.update();
    expect(wrapper.find('p').text()).toEqual(fullStr + suffix);

    wrapper.unmount();
  });

  it('connect children', async () => {
    const bamboo = 'Bamboo';
    const is = ' is ';

    const wrapper = mount(
      <Base ellipsis component="p" editable>
        {bamboo}
        {is}
        <code>Little</code>
        <code>Light</code>
      </Base>,
    );

    wrapper.triggerResize();
    await sleep(20);
    wrapper.update();

    expect(wrapper.text()).toEqual('Bamboo is Little...');
  });

  it('should expandable work', async () => {
    const onExpand = jest.fn();
    const wrapper = mount(
      <Base ellipsis={{ expandable: true, onExpand }} component="p" copyable editable>
        {fullStr}
      </Base>,
    );

    await sleep(20);
    wrapper.update();

    wrapper.find('.ant-typography-expand').simulate('click');
    expect(onExpand).toHaveBeenCalled();
    await sleep(20);
    wrapper.update();

    expect(wrapper.find('p').text()).toEqual(fullStr);
  });

  it('should have custom expand style', async () => {
    const symbol = 'more';
    const wrapper = mount(
      <Base ellipsis={{ expandable: true, symbol }} component="p">
        {fullStr}
      </Base>,
    );
    await sleep(20);
    wrapper.update();
    expect(wrapper.find('.ant-typography-expand').text()).toEqual('more');
  });

  it('can use css ellipsis', () => {
    const wrapper = mount(<Base ellipsis component="p" />);
    expect(wrapper.find('.ant-typography-ellipsis-single-line').length).toBeTruthy();
  });

  it('should calculate padding', () => {
    const wrapper = mount(
      <Base ellipsis component="p" style={{ paddingTop: '12px', paddingBottom: '12px' }} />,
    );
    expect(wrapper.find('.ant-typography-ellipsis-single-line').length).toBeTruthy();
  });

  describe('should tooltip support', () => {
    let domSpy;

    beforeAll(() => {
      domSpy = spyElementPrototypes(HTMLElement, {
        offsetWidth: {
          get: () => 100,
        },
        scrollWidth: {
          get: () => 200,
        },
      });
    });

    afterAll(() => {
      domSpy.mockRestore();
    });

    function getWrapper(tooltip) {
      return mount(
        <Base ellipsis={{ tooltip }} component="p">
          {fullStr}
        </Base>,
      );
    }

    it('boolean', async () => {
      const wrapper = getWrapper(true);
      await sleep(20);
      wrapper.update();

      expect(wrapper.find('Tooltip').prop('title')).toEqual(fullStr);
    });

    it('customize', async () => {
      const wrapper = getWrapper('Bamboo is Light');
      await sleep(20);
      wrapper.update();

      expect(wrapper.find('Tooltip').prop('title')).toEqual('Bamboo is Light');
    });
  });

  it('js ellipsis should show aria-label', () => {
    const titleWrapper = mount(<Base title="bamboo" ellipsis={{ expandable: true }} />);
    expect(titleWrapper.find('.ant-typography').prop('aria-label')).toEqual('bamboo');

    const tooltipWrapper = mount(<Base ellipsis={{ expandable: true, tooltip: 'little' }} />);
    expect(tooltipWrapper.find('.ant-typography').prop('aria-label')).toEqual('little');
  });

  it('should display tooltip if line clamp', () => {
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      scrollHeight: {
        get() {
          let html = this.innerHTML;
          html = html.replace(/<[^>]*>/g, '');
          const lines = Math.ceil(html.length / LINE_STR_COUNT);
          return lines * 16;
        },
      },
      offsetHeight: {
        get: () => 32,
      },
      offsetWidth: {
        get: () => 100,
      },
      scrollWidth: {
        get: () => 100,
      },
    });

    const wrapper = mount(
      <Base ellipsis={{ tooltip: 'This is tooltip', rows: 2 }}>
        Ant Design, a design language for background applications, is refined by Ant UED Team.
      </Base>,
    );
    expect(wrapper.find('EllipsisTooltip').prop('isEllipsis')).toBeTruthy();
    mockRectSpy.mockRestore();
  });
});
