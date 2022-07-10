import { mount } from 'enzyme';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Col, Row } from '..';
import { render, screen } from '../../../tests/utils';

jest.mock('../../_util/styleChecker', () => ({
  canUseDocElement: () => true,
  isStyleSupport: () => true,
  detectFlexGapSupported: () => true,
}));

describe('Grid.Gap', () => {
  it('should not have `row-gap: 0px` style', () => {
    render(
      <Row role="row">
        <Col />
      </Row>,
    );

    expect(screen.getByRole('row').style.rowGap).toBe('');
  });

  it('should use gap', () => {
    const wrapper = mount(
      <Row gutter={[16, 8]}>
        <Col />
      </Row>,
    );

    expect(wrapper.find('.ant-row').props().style).toEqual(
      expect.objectContaining({
        marginLeft: -8,
        rowGap: 8,
        marginRight: -8,
      }),
    );
  });

  it('not break ssr', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Demo = () => (
      <Row gutter={[16, 8]}>
        <Col />
      </Row>
    );

    const div = document.createElement('div');

    const ssrTxt = ReactDOMServer.renderToString(<Demo />);
    div.innerHTML = ssrTxt;

    const { unmount } = render(<Demo />, { container: div, hydrate: true });

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();

    unmount();
  });
});
