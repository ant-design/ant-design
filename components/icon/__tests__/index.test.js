import React from 'react';
import { render } from 'enzyme';
import Icon from '..';

describe('Icon', () => {
  it('should render to a <i class="xxx"><svg>...</svg></i>', () => {
    const wrapper = render(
      <Icon type="message" className="my-icon-classname" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with rotate, flip, viewBox props', () => {
    const wrapper = render(
      <Icon type="setting" rotate={127} flip="both" viewBox="0 0 24 24" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support pass svg paths as children', () => {
    const wrapper = render(
      <Icon viewBox="0 0 24 24">
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </Icon>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should give warning and render <i>{null}</i>', () => {
    const wrapper = render(
      <Icon viewBox="0 0 24 24" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('`component` prop', () => {
    it('can access to svg defs if has children', () => {
      const wrapper = render(
        <Icon
          className="my-home-icon"
          component={svgProps => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient">
                  <stop offset="20%" stopColor="#39F" />
                  <stop offset="90%" stopColor="#F3F" />
                </linearGradient>
              </defs>
              {
                React.Children.map(
                  svgProps.children,
                  child => React.cloneElement(
                    child,
                    child.type === 'path' ? { fill: 'scriptUrl(#gradient)' } : {}
                  )
                )
              }
            </svg>
          )}
        >
          <title>Cool Home</title>
          <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
        </Icon>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should support svg react component', () => {
    const SvgComponent = props => (
      <svg viewBox="0 0 24 24" {...props}>
        <title>Cool Home</title>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );

    const wrapper = render(
      <Icon
        className="my-home-icon"
        component={SvgComponent}
      >
        <title>Cool Home</title>
        <path d="'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'" />
      </Icon>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Icon.createFromIconfontCN()', () => {
  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

  it('should support iconfont.cn', () => {
    const wrapper = render(
      <div className="icons-list">
        <IconFont type="icon-tuichu" />
        <IconFont type="icon-facebook" />
        <IconFont type="icon-twitter" />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
