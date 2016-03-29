// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import SlickCarousel from 'react-slick';
import React from 'react';

export default class Carousel extends React.Component {
  static defaultProps = {
    dots: true,
    arrows: false,
  }

  render() {
    let props = { ...this.props };

    if (props.effect === 'fade') {
      props.fade = true;
      props.draggable = false;
    }

    let className = 'ant-carousel';
    if (props.vertical) {
      className = `${className} ant-carousel-vertical`;
    }

    return (
      <div className={className}>
        <SlickCarousel {...props} />
      </div>
    );
  }
}
