---
order: 5
title: Motion
---

> [Ant Motion](https://motion.ant.design/) is an animation library based on Ant Design's principles. It is more than just a single library, but also an entire React based solution for modern applications. The goal is to help developers to apply animations in their projects with minimal efforts. Ant Motion provides animations with all levels of granularity - from single action to combination of moves.

Animations bring vividness to interfaces and reinforce user experiences.

## Values of Animations

- **Smooth interactions** - Animations can make user interactions more natural.
- **Bring vividness** - Animations can attract users' attention and increase users' motivation to interact by bring more vividness.
- **Define hierarchies** - Animations can define elements' hierarchies and logical relationships in the most intuitive way.
- **Provide feedbacks** - Animations can reinforce user experiences by providing motional feedbacks.

## Effectiveness of Animations

We can determine if an animation is effective or not from the following two aspects：

- **Justified** - Is this animation necessary? Does this animation help its users to digest the information? An effective animation should not be redundant.
- **Performant** - Is there any frame loss or lag? An effective animation must be smooth, and must not hurt the overall performance of the product.

## Principles

Different from animations usage in typical front-office applications, animations in enterprise level applications spend a great amount of efforts on reinforcing user interactions and the effectiveness of those interactions. Therefore, we derived three animation design principles from Ant Design's core design language:

```__react

import { Col, Row } from 'antd';

const text = [
  { title: 'Natural', img: 'https://gw.alipayobjects.com/zos/rmsportal/LyTPSGknLUlxiVdwMWyu.gif', content: 'The animation should based on law of nature. This assures the animation is smooth by its nature and intuitive to its users.' },
  { title: 'Performant', img: 'https://gw.alipayobjects.com/zos/rmsportal/SQOZVQVIossbXpzDmihu.gif', content: 'The animation should have a transition time as minimal as possible so that it serves its purpose in the most effective way.' },
  { title: 'Concise', img: 'https://gw.alipayobjects.com/zos/rmsportal/OkIXkscKxywYLSrilPIf.gif', content: 'The animation should be meaningful and justified. An over fancy animation will frustrate its users, and therefore should always be avoided.' },
];

function Principle() {
  const childrenToRender = text.map(item => (
    <Col key={item.title} sm={24} md={8} >
      <div className="principle">
        <div><img src={item.img} width="80%" /></div>
        <h4>{item.title}</h4>
        <p>{item.content}</p>
      </div>
    </Col>
  ));
  return (
    <div className="motion-principle-wrapper">
      <Row gutter={{ md: 32, sm: 0 }} className="principle-wrapper">
        {childrenToRender}
      </Row>
    </div>
  );
}

ReactDOM.render(<Principle />, mountNode);
```

### Natural

Intuitive animations usually are backed by law of nature. This requires the animations to be smooth so that their users can feel the animations' motion being justified. A natural animation triggers its users with positive user experiences.

<video class="motion-video-min" src="https://gw.alipayobjects.com/os/rmsportal/NTMlQdLIkPjOACXsdRrq.mp4" loop="true" />

Take button animation as an example, designers image the button as foliage on water - when you press it and release, the leave will slightly go into the water, and then pop back up, creating ripples around itself.

### Performant

Enterprise level applications require highly effective user interactions. So is their animation design - with a transition time as minimal as possible.

<video class="motion-video-min" src="https://gw.alipayobjects.com/os/rmsportal/wMKeLGnpDxhwfCsBqKNN.mp4" loop="true" />

For example, compared to appearing animations, disappearing animations should not attract too much attention from their users. They just need to be concise and clear. Therefore, disappearing animations are configured to swing out with faster velocity and no disappearing delay between each list items - they disappear all at the same time as one unit.

### Concise

Avoid dramatic and complicated animations. A good animation will get the job done instead of frustrating its users.

<video src="https://gw.alipayobjects.com/os/rmsportal/FeUCANmoDRwCSmIcnPNF.mp4" loop="true" class="motion-video-min" />

For example, when a user expands a menu, his main focus is on the menu content, not the direction change of the arrow icon on the right. Therefore, the animation doesn't need to be very complicated and distracting; it changes just enough to indicate the transition.

<br />

> For more details, please go to [Ant Motion Animation Principles](https://motion.ant.design/language/basic).
