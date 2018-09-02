import React from 'react';
import { render } from 'enzyme';
import Icon from '..';
import ReactIcon from '@ant-design/icons-react';
import { getThemeFromTypeName, withThemeSuffix } from '../utils';

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
      <Icon type="check-circle" theme="twoTone" twoToneColor="#f5222d" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support config global two-tone primary color', () => {
    const colors = ReactIcon.getTwoToneColors();
    Icon.setTwoToneColor('#1890ff');
    const wrapper = render(
      <Icon type="check-circle" theme="twoTone" />
    );
    expect(wrapper).toMatchSnapshot();
    ReactIcon.setTwoToneColors(colors);
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

describe('utils', () => {
  it('getThemeFromTypeName() should work', () => {
    const testCases = ['check-circle', 'check-circle-o', 'check-circle-fill', 'check-circle-twotone'];
    const result = testCases.map(type => getThemeFromTypeName(type));
    expect(result).toEqual(
      [null, 'outlined', 'filled', 'twoTone']
    );
  });

  it('withThemeSuffix() should work', () => {
    const testCases = [
      { type: 'home', theme: 'filled' },
      { type: 'home', theme: 'outlined' },
      { type: 'home', theme: 'twoTone' },
      { type: 'home', theme: 'This-is-the-secret' },
      { type: 'home-o', theme: 'filled' },
      { type: 'home-fill', theme: 'outlined' },
      { type: 'home-o', theme: 'twoTone' },
      { type: 'home-o', theme: 'This-is-the-secret' },
    ];
    const result = testCases.map(({ type, theme }) => withThemeSuffix(type, theme));
    expect(result).toEqual(
      ['home-fill', 'home-o', 'home-twotone',
        'home', 'home-o', 'home-fill', 'home-o', 'home-o']
    );
  });
});
