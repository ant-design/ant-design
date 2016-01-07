const React = require('react');
const ReactDOM = require('react-dom');
import { QueueAnim, Icon, Button } from '../index';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import EventDispatcher from 'rc-scroll-anim/lib/EventDispatcher';
import TweenOne from 'rc-tween-one';

const DivId = ['page4', 'page3', 'page2', 'page1', 'banner'];
const header = document.getElementById('header');
DivId.forEach(id=> {
  const page = document.createElement('section');
  page.id = id;
  if (id.indexOf('page') >= 0) {
    page.className = 'page';
  }
  document.body.insertBefore(page, header.nextSibling);
});

// 导航处理；
function scrollNavEvent() {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop >= clientHeight) {
    header.className = header.className.indexOf('home-nav-bottom') >= 0 ? header.className : header.className + ' home-nav-bottom';
  } else {
    header.className = header.className.replace(/home-nav-bottom/ig, '');
  }
}

EventDispatcher.addEventListener('scroll.scrollNavEvent', scrollNavEvent);

class Banner extends React.Component {
  constructor() {
    super(...arguments);
  }

  typeFunc(a) {
    if (a.key === 'line') {
      return 'right';
    } else if (a.key === 'button') {
      return 'bottom';
    }
    return 'left';
  }

  render() {
    return (
      <QueueAnim className="banner-text-wrapper" type={this.typeFunc} delay={300}>
        <h1 key="h1">ANT DESIGN</h1>
        <p key="content">一套 UI 设计语言</p>
        <a key="button" href="/docs/spec/introduce"><Icon type="smile-circle"/>开始探索</a>
      </QueueAnim>)
  }
}

ReactDOM.render(<Banner />, banner);


// page1
ReactDOM.render((
  <ScrollOverPack className="content-wrapper">
    <TweenOne key="image" className="image1 image-wrapper" vars={{x: 0, opacity: 1, duration: 550}}
              style={{transform: 'translateX(-100px)', opacity: 0}}/>
    <QueueAnim className="text-wrapper" delay={300} key="text" duration={550} leaveReverse>
      <h1 key="h1">实例/优秀的设计实践</h1>
      <p key="p" style={{maxWidth: 310}}>近一年的蚂蚁中后台设计实践，积累了大量的优秀案例。</p>
      <div key="button"><Button type="primary" size="large" onClick={()=>{window.location.href='/docs/practice/cases'}}>了解更多<Icon type="right"/></Button></div>
    </QueueAnim>
  </ScrollOverPack>
), page1);

//page2
ReactDOM.render((
  <ScrollOverPack className="content-wrapper">
    <QueueAnim className="text-wrapper left-text" delay={300} key="text" duration={550} type='bottom' leaveReverse>
      <h1 key="h1">设计模式库</h1>
      <p key="p" style={{maxWidth: 260}}>为中后台设计中反复出现的问题提供一套相应的解决方案</p>
      <div key="button"><Button type="primary" size="large" onClick={()=>{window.location.href='/docs/pattern/navigation'}}>了解更多<Icon type="right"/></Button></div>
    </QueueAnim>
    <TweenOne key="image" className="image2 image-wrapper" vars={{x: 0, opacity: 1, delay: 300, duration: 550}}
              style={{transform: 'translateX(100px)', opacity: 0}}/>
  </ScrollOverPack>
), page2);

//page3
ReactDOM.render((
  <ScrollOverPack className="content-wrapper" >
    <TweenOne key="image" className="image3 image-wrapper" vars={{x: 0, opacity: 1, duration: 550}}
              style={{transform: 'translateX(-100px)', opacity: 0}}/>
    <QueueAnim className="text-wrapper" delay={300} key="text" duration={550} leaveReverse style={{top: '40%'}}>
      <h1 key="h1">数十个基础设计组件</h1>
      <p key="p" style={{maxWidth: 280}}>为中后台设计中反复出现的问题提供一套完整的解决方案</p>
      <div key="button"><Button type="primary" size="large" onClick={()=>{window.location.href='/docs/react/introduce'}}>了解更多<Icon type="right"/></Button></div>
    </QueueAnim>
  </ScrollOverPack>
), page3);

//page4
ReactDOM.render((
  <ScrollOverPack className="content-wrapper" >

    <QueueAnim className="text-wrapper-bottom" delay={300} key="text" duration={550} leaveReverse type="bottom">
      <h1 key="h1">微小·确定·幸福</h1>
      <p key="p">为中后台设计中反复出现的问题提供一套相应的解决方案</p>
    </QueueAnim>
    <TweenOne key="image" className="image4 bottom-wrapper" vars={{y: 0, opacity: 1, duration: 550, delay: 550}}
              style={{transform: 'translateY(50px)', opacity: 0}}/>
  </ScrollOverPack>
), page4);
