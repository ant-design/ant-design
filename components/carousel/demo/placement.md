---
order: 4
title:
  zh-CN: 位置
  en-US: Placement
---

## zh-CN

位置有 4 个方向。

## en-US

There are 12 placement options available.

````jsx
import { Carousel, Radio } from 'antd';

class PlacementCarouselDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotsPlacement: 'top',
      vertical: false,
    };
  }

  handlePlacementChange = (e) => {
    const dotsPlacement = e.target.value;
    const vertical = dotsPlacement === 'left' || dotsPlacement === 'right';
    this.setState({ dotsPlacement, vertical });
  }

  render() {
    const { dotsPlacement, vertical } = this.state;
    return (
      <div>
        <Radio.Group onChange={this.handlePlacementChange} value={dotsPlacement} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Top</Radio.Button>
          <Radio.Button value="bottom">Bottom</Radio.Button>
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group>
        <Carousel vertical={vertical} dotsPlacement={dotsPlacement}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
      </div>
    );
  }
}

ReactDOM.render(<PlacementCarouselDemo />, mountNode);
````

````css
/* For demo */
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
````
