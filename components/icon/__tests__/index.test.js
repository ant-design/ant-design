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

  it('should render correctly with rotate, flip, viewBox props.', () => {
    const wrapper = render(
      <Icon type="setting" rotate={127} flip="both" viewBox="0 0 24 24" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('CustomIcon', () => {
  const path = 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z';

  function HomeIcon(props) {
    return (
      <Icon.CustomIcon {...props} viewBox="0 0 24 24">
        <title>Cool Home</title>
        <path d={path} />
      </Icon.CustomIcon>
    );
  }

  it('should render custom icon correctly', () => {
    const wrapper = render(
      <HomeIcon className="my-home-icon" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support component prop', () => {
    const wrapper = render(
      <HomeIcon
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
                  child.type === 'path' ? { fill: 'url(#gradient)' } : {}
                )
              )
            }
          </svg>
        )}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
