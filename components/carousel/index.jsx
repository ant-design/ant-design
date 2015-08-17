import Carousel from 'react-slick';
import React from 'react';
import assign from 'object-assign';

var AntCarousel = React.createClass({

  getDefaultProps() {
    return {
      dots: true,
      arrows: false
    };
  },

  render() {
    var props = assign({}, this.props);

    if (props.effect === 'fade') {
      props.fade = true;
    }

    var className = 'ant-carousel';
    if (props.vertical) {
      className = className + ' ant-carousel-vertical';
    }

    return (
      <div className={className}>
        <Carousel {...props} />
      </div>
    );
  }
});

export default AntCarousel;
