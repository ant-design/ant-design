const React = require('react');
const ReactDOM = require('react-dom');
import { QueueAnim, Icon, Button } from '../index';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import scrollScreen from 'rc-scroll-anim/lib/ScrollScreen';
import ScrollEvent from 'rc-scroll-anim/lib/EventDispatcher';
import mapped from 'rc-scroll-anim/lib/Mapped';
import TweenOne from 'rc-tween-one';

module.exports = function () {
  InstantClickChangeFns.push(function () {
    if (!document.getElementById('banner')) {
      // componentWillUnmount 不会触发, 手动删掉事件;
      ScrollEvent._listeners = {};
      mapped.unMount();
      return;
    }
    // 导航处理
    function scrollNavEvent() {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop >= clientHeight) {
        header.className = header.className.indexOf('home-nav-bottom') >= 0 ? header.className : header.className + ' home-nav-bottom';
      } else {
        header.className = header.className.replace(/home-nav-bottom/ig, '');
      }
    }

    $(window).off('scroll.scrollNavEvent');
    $(window).on('scroll.scrollNavEvent', scrollNavEvent);
    // 整屏滚动;
    scrollScreen({docHeight: 4746});
    // list point
    ReactDOM.render((
      <div>
        <ScrollLink className="list-point" location="banner"/>
        <ScrollLink className="list-point" location="page1"/>
        <ScrollLink className="list-point" location="page2"/>
        <ScrollLink className="list-point" location="page3"/>
        <ScrollLink className="list-point" location="page4"/>
      </div>
    ), document.getElementById('list'));

    // banner

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

      componentWillUnmount() {
        console.log(122112)
      }

      render() {
        return (
          <ScrollElement scrollName="banner" style={{height: '100%'}}>
            <QueueAnim className="banner-text-wrapper" type={this.typeFunc} delay={300}>
              <h2 key="h2">ANT <p>DESIGN</p></h2>
              <p key="content">一个 UI 设计语言</p>
              <span className="line" key="line"/>
              <a key="button" href="/docs/spec/introduce"><Icon type="smile-circle"/>开始探索</a>
            </QueueAnim>
            <TweenOne className='down' vars={[{opacity: 1},{y: 10, duration: 800, yoyo: true, repeat: -1}]}>
              <Icon type="down"/>
            </TweenOne>
          </ScrollElement>
        )
      }
    }

    ReactDOM.render(<Banner />, document.getElementById('banner'));

    // page1
    ReactDOM.render((
      <ScrollOverPack scrollName="page1" className="content-wrapper" playScale={0.4}>
        <TweenOne key="image" className="image1 image-wrapper" vars={{x: 0, opacity: 1, duration: 550}}
                  style={{transform: 'translateX(-100px)', opacity: 0}} scrollHideProps={{type: 'reverse'}}/>
        <QueueAnim className="text-wrapper" delay={300} key="text" duration={550} leaveReverse
                   scrollHideProps={{child: null}}>
          <h2 key="h2">最佳实践</h2>
          <p key="p" style={{maxWidth: 310}}>近一年的中后台设计实践，积累了大量的优秀案例。</p>
          <div key="button"><Button type="primary" size="large"
                                    onClick={()=>{window.location.href='/docs/practice/cases'}}>了解更多<Icon
            type="right"/></Button></div>
        </QueueAnim>
      </ScrollOverPack>
    ), document.getElementById('page1'));

    //page2
    ReactDOM.render((
      <ScrollOverPack scrollName="page2" className="content-wrapper" playScale={0.4}>
        <QueueAnim className="text-wrapper left-text" delay={300} key="text" duration={550} type='bottom' leaveReverse
                   scrollHideProps={{child: null}}>
          <h2 key="h2">设计模式</h2>
          <p key="p" style={{maxWidth: 260}}>总结中后台设计中反复出现的问题，并提供相应的解决方案。</p>
          <div key="button"><Button type="primary" size="large"
                                    onClick={()=>{window.location.href='/docs/pattern/navigation'}}>了解更多<Icon
            type="right"/></Button>
          </div>
        </QueueAnim>
        <TweenOne key="image" className="image2 image-wrapper" vars={{x: 0, opacity: 1, delay: 300, duration: 550}}
                  style={{transform: 'translateX(100px)', opacity: 0}} scrollHideProps={{type: 'reverse'}}/>
      </ScrollOverPack>
    ), document.getElementById('page2'));

    // page3
    ReactDOM.render((
      <ScrollOverPack scrollName="page3" className="content-wrapper" playScale={0.4}>
        <TweenOne key="image" className="image3 image-wrapper" vars={{x: 0, opacity: 1, duration: 550}}
                  style={{transform: 'translateX(-100px)', opacity: 0}} scrollHideProps={{type: 'reverse'}}/>
        <QueueAnim className="text-wrapper" delay={300} key="text" duration={550} leaveReverse style={{top: '40%'}}
                   scrollHideProps={{child: null}}>
          <h2 key="h2">丰富的基础组件</h2>
          <p key="p" style={{maxWidth: 280}}>丰富、灵活、实用的基础组件，为业务产品提供强有力的设计支持。</p>
          <div key="button"><Button type="primary" size="large"
                                    onClick={()=>{window.location.href='/docs/react/introduce'}}>了解更多<Icon
            type="right"/></Button></div>
        </QueueAnim>
      </ScrollOverPack>
    ), document.getElementById('page3'));

    // page4
    ReactDOM.render((
      <ScrollOverPack scrollName="page4" className="content-wrapper" playScale={0.4}>
        <QueueAnim className="text-wrapper-bottom" delay={300} key="text" duration={550} leaveReverse type="bottom"
                   scrollHideProps={{child: null}}>
          <h2 key="h2">微小·确定·幸福</h2>
          <p key="p">这是一套致力于提升『用户』和『设计者』使用体验的中后台设计语言。</p>
        </QueueAnim>
        <TweenOne key="image" className="image4 bottom-wrapper" vars={{y: 0, opacity: 1, duration: 550, delay: 550}}
                  style={{transform: 'translateY(50px)', opacity: 0}} scrollHideProps={{type: 'reverse'}}/>
      </ScrollOverPack>
    ), document.getElementById('page4'));
  });
}
