---
category: Components
group: Data Display
title: Carousel
description: A set of carousel areas.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bPMSSqbaTMkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a-58QpYnqOsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- When there is a group of content on the same level.
- When there is insufficient content space, it can be used to save space in the form of a revolving door.
- Commonly used for a group of pictures/cards.

## Examples

### Basic

Basic usage.

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default App;
```

### Position

There are 4 position options available.

```tsx
import React, { useState } from 'react';
import type { CarouselProps, RadioChangeEvent } from 'antd';
import { Carousel, Radio } from 'antd';

type DotPlacement = CarouselProps['dotPlacement'];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const [dotPlacement, setDotPlacement] = useState<DotPlacement>('top');

  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPlacement(value);
  };

  return (
    <>
      <Radio.Group onChange={handlePositionChange} value={dotPlacement} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="start">Start</Radio.Button>
        <Radio.Button value="end">End</Radio.Button>
      </Radio.Group>
      <Carousel dotPlacement={dotPlacement}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default App;
```

### Scroll automatically

Timing of scrolling to the next card/picture.

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
```

### Fade in

Slides use fade for transition.

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
```

### Arrows for switching

Show the arrows for switching.

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <>
    <Carousel arrows infinite={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
    <br />
    <Carousel arrows dotPlacement="start" infinite={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </>
);

export default App;
```

### Progress of dots

Show progress of dots.

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| arrows | Whether to show switch arrows | boolean | false | 5.17.0 |
| autoplay | Whether to scroll automatically, you can specify `autoplay={{ dotDuration: true }}` to display the progress bar | boolean \| { dotDuration?: boolean } | false | dotDuration: 5.24.0 |
| autoplaySpeed | Delay between each auto scroll (in milliseconds) | number | 3000 |  |
| adaptiveHeight | Adjust the slide's height automatically | boolean | false |  |
| dotPlacement | The position of the dots, which can be one of `top` `bottom` `start` `end` | string | `bottom` |  |
| ~~dotPosition~~ | The position of the dots, which can be one of `top` `bottom` `left` `right` `start` `end`, Please use `dotPlacement` instead | string | `bottom` |  |
| dots | Whether to show the dots at the bottom of the gallery, `object` for `dotsClass` | boolean \| { className?: string } | true |  |
| draggable | Enable scrollable via dragging on desktop | boolean | false |  |
| fade | Whether to use fade transition | boolean | false |  |
| infinite | Infinitely wrap around contents | boolean | true |  |
| speed | Animation speed in milliseconds | number | 500 |  |
| easing | Transition interpolation function name | string | `linear` |  |
| effect | Transition effect | `scrollx` \| `fade` | `scrollx` |  |
| afterChange | Callback function called after the current index changes | (current: number) => void | - |  |
| beforeChange | Callback function called before the current index changes | (current: number, next: number) => void | - |  |
| waitForAnimate | Whether to wait for the animation when switching | boolean | false |  |

Find more APIs in react-slick [documentation](https://react-slick.neostack.com/docs/api).

## Methods

| Name | Description |
| --- | --- |
| goTo(slideNumber, dontAnimate) | Go to slide index, if dontAnimate=true, it happens without animation |
| next() | Change current slide to next slide |
| prev() | Change current slide to previous slide |

## Design Token



## Component Token (Carousel)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| arrowOffset | arrows offset to Carousel edge | number | 8 |
| arrowSize | Size of arrows | number | 16 |
| dotActiveWidth | Width of active indicator | string \| number | 24 |
| dotGap | gap between indicator | number | 4 |
| dotHeight | Height of indicator | string \| number | 3 |
| dotOffset | dot offset to Carousel edge | number | 12 |
| dotWidth | Width of indicator | string \| number | 16 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |



## FAQ

### How to add custom arrows? {#faq-add-custom-arrows}

See [#12479](https://github.com/ant-design/ant-design/issues/12479).
