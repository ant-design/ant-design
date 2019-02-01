---
order: 5
title:
  zh-CN: 动效
  en-US: Motion
---

> [Ant Motion](https://motion.ant.design/) Yes Ant Design The dynamic language extracted from the middle. This is not only a dynamic language, but also a React framework Motion solution that helps developers make it easier to use dynamics in their projects. We offer single items, combined animations, and a complete solution.

Interface dynamics enhance user awareness and increase vitality.

## Motivating value

- **Increase experience comfort:** Make the user's cognitive process more natural.
- **Increase interface vigor:** The first time to attract attention and highlight the key points.
- **Describe hierarchical relationships:** Reflect the hierarchical and spatial relationship between elements.
- **Provide feedback and clear intention:** Assist interactive experience.

## Measuring the significance of dynamism

To measure whether a dynamic effect makes sense, we can assess it by the following criteria:

- **Is the existence of a dynamic effect reasonable?** Whether it has a clear purpose, to help the interactive experience, there is no superfluous effect.
- **Mobility and performance:** There can be no large fluctuations in frame dropping or stuttering, and the experience of dynamic effects must be smooth and does not affect the performance of the product.

## Principle

In the product design of enterprise applications, the use of dynamic effects and front-end products are very different. It is especially important to help the effectiveness of interactive behavior and information cognition. Based on the design values of Ant Design, we derive the dynamics. 
Three principles of efficiency design：


```__react

import { Col, Row } from 'antd';

const text = [
  { title: 'Natural', img: 'https://gw.alipayobjects.com/zos/rmsportal/LyTPSGknLUlxiVdwMWyu.gif', content: 'The law of natural movement guarantees the visual habit of letting the user perceive that the action is established.' },
  { title: 'Efficient', img: 'https://gw.alipayobjects.com/zos/rmsportal/SQOZVQVIossbXpzDmihu.gif', content: 'Try to save time in transition and quickly complete the transition animation' },
  { title: 'Restraint', img: 'https://gw.alipayobjects.com/zos/rmsportal/OkIXkscKxywYLSrilPIf.gif', content: 'Do meaningful motivation, don't do too much modification and interfere with users' },
];

function Principle() {
  const childrenToRender = text.map(item => (
    <Col key={item.title} sm={24} md={8} >
      <div className="principle">
        <div><img src={item.img} width="80%" alt="Image" /></div>
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

Behind the natural dynamics is the law of natural movement. This requires the dynamic effect to ensure the visual inertia during the transition, so that the user perceives that the action is established and can resonate.

<video class="motion-video-min" src="https://gw.alipayobjects.com/os/rmsportal/NTMlQdLIkPjOACXsdRrq.mp4" loop="true" />

Take button For example, the designer design imagines that the leaves float on the surface of the water. When you touch it, the leaves will float and bounce, and then the ripple effect will appear.

### Efficient

The enterprise-level application pursues an efficient user experience, and the corresponding dynamic design should also be such that the transition time is saved as much as possible, and the transition animation effect is quickly completed.

<video class="motion-video-min" src="https://gw.alipayobjects.com/os/rmsportal/wMKeLGnpDxhwfCsBqKNN.mp4" loop="true" />

For example, in the dynamics of appearance and entry, the appearance does not need to be fanfare to attract the attention of the user, but to be simple and clear. Therefore, our playing time uses a faster speed, and does not set the queue to appear in the form of a sequence, only need to disappear directly.

### Restraint

Try to avoid exaggerated effects, do meaningful things, and not do too much modification to interfere with users.

<video src="https://gw.alipayobjects.com/os/rmsportal/FeUCANmoDRwCSmIcnPNF.mp4" loop="true" class="motion-video-min" />

Like ours Menu，When unfolding, more attention is paid to the content of the menu, and the icon switching on the right side is not the main element, and there is no need to over-emphasize to distract the user's attention. Simply switch between inadvertently and clearly indicate the change.

<br />

> For more details please go to [Ant Motion Motivation principle](https://motion.ant.design/language/basic).
