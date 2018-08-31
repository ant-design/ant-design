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

  it('should support basic usage', () => {
    const wrapper = render(
      <div>
        <Icon type="home" />
        <Icon type="setting" theme="filled" />
        <Icon type="smile" theme="outlined" />
        <Icon type="sync" spin />
        <Icon type="loading" />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support older usage', () => {
    const wrapper = render(
      <div>
        <Icon type="home-o" />
        <Icon type="setting-fill" />
        <Icon type="smile-o" />
        <Icon type="check-circle-twotone" />
      </div>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support two-tone icon', () => {
    const wrapper = render(
      <Icon type="check-circle" theme="twoTone" primaryColor="#f5222d" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support config global two-tone primary color', () => {
    const colors = Icon.getTwoToneColors();
    Icon.setTwoToneColors({
      primaryColor: '#1890ff',
    });
    const wrapper = render(
      <Icon type="check-circle" theme="twoTone" />
    );
    expect(wrapper).toMatchSnapshot();
    Icon.setTwoToneColors(colors);
  });

  it('should give a warning when there is no primaryColor but secondaryColor', () => {
    const wrapper = render(
      <Icon type="check-circle" theme="twoTone" secondaryColor="#f5222d" />
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
