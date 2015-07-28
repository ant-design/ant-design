# 主标签控制动画

- order: 1

主标签上控制进场;`EnterAnimation`里延时1秒;递增`interval`为0.2;

---

````jsx

var EnterAnimation = antd.EnterAnimation;
var Test = React.createClass({
  render() {
    return (
    <EnterAnimation className="demo-startAnim" delay={1} interval={.2}>
        <div className="demo-header">
            <div className="logo">
                <img width="30" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                <span>logo</span>
            </div>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div className="demo-content">
            <div className="demo-title">我是标题</div>
            <div className="demo-kp">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="demo-title">我是标题</div>
            <div className="demo-listBox">
                <ul>
                    <li>
                        <div className="demo-list">
                            <div className="title"></div>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="demo-list">
                            <div className="title"></div>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="demo-footer" style={{"width": "100%", "display": "table", "float": "left"}}></div>
    </EnterAnimation>)
  }
});
React.render(<Test/> , document.getElementById('components-enter-animation-demo-label'));

````
<style>
.demo-startAnim {
  width: 400px;
  text-align: center;
  overflow: hidden;
  margin: 20px auto;
}
.demo-startAnim .demo-header {
  width: 100%;
  background: #ebedee;
  height: 30px;
}
.demo-startAnim .demo-header ul {
  float: right;
  margin-right: 10px;
}
.demo-startAnim .demo-header ul li {
  width: 30px;
  height: 30px;
  float: left;
  background: #e4e4e4;
  margin-left: 2px;
}
.demo-startAnim .demo-header ul li:before {
  margin: 10px auto;
  width: 10px;
  height: 10px;
  background: #ebeded;
}
.demo-startAnim .demo-header .logo {
  float: left;
  margin: 0px auto 0 10px;
  line-height: 32px;
}
.demo-startAnim .demo-header .logo img{
margin:auto
}
.demo-startAnim .demo-header .logo span {
  display: block;
  float: right;
}
.demo-startAnim .demo-content {
  width: 80%;
  margin: 10px auto;
}
.demo-startAnim .demo-content .demo-title {
  background: #a4a4a4;
  width: 40%;
  height: 20px;
  line-height: 20px;
  color: #ebeded;
}
.demo-startAnim .demo-content .demo-listBox {
  margin-top: 10px;
}
.demo-startAnim .demo-content .demo-listBox > ul > li {
  float: left;
  width: 47.5%;
  overflow: hidden;
}
.demo-startAnim .demo-content .demo-listBox > ul > li:last-child {
  margin-left: 5%;
}
.demo-startAnim .demo-content .demo-listBox .demo-list .title {
  height: 25px;
  background: #cacaca;
  overflow: hidden;
}
.demo-startAnim .demo-content .demo-listBox .demo-list .title:before {
  width: 50%;
  height: 5px;
  background: #ebeded;
  margin: 10px auto;
}
.demo-startAnim .demo-content .demo-listBox .demo-list ul li {
  height: 20px;
  background: #ebeded;
  border-bottom: 1px solid #cacaca;
  overflow: hidden;
  padding: 5px 15px;
}
.demo-startAnim .demo-content .demo-listBox .demo-list ul li:before {
  width: 20px;
  height: 10px;
  background: #cacaca;
  float: left;
}
.demo-startAnim .demo-content .demo-listBox .demo-list ul li:after {
  width: 60%;
  height: 5px;
  background: #cacaca;
  float: left;
  margin-left: 10px;
  margin-top: 2px;
}
.demo-startAnim .demo-content .demo-kp {
  margin: 10px auto;
}
.demo-startAnim .demo-content .demo-kp ul li {
  display: inline-block;
  width: 30%;
  height: 30px;
  background: #cacaca;
  color: #ebeded;
  text-align: left;
  padding: 10px;
  margin-right: calc(1%);
}
.demo-startAnim .demo-content .demo-kp ul li:last-child {
  margin-right: 0%;
}
.demo-startAnim .demo-content .demo-kp ul li:after {
  width: 60%;
  height: 5px;
  background: #ebeded;
  float: left;
  margin-top: 2px;
}
.demo-startAnim .demo-content .demo-kp ul li:before {
  background: #ebeded;
  float: left;
  width: 10px;
  height: 10px;
  margin-right: 10%;
}
.demo-startAnim .demo-footer {
  margin-top: 10px;
  background: #cacaca;
  height: 30px;
  float: left;
  width: 100%;
}
.demo-startAnim .demo-footer:before {
  width: 60%;
  height: 5px;
  background: #ededed;
  margin: 5px auto 0;
}
.demo-startAnim .demo-footer:after {
  width: 30%;
  height: 5px;
  background: #ededed;
  margin: 5px auto;
}
.demo-startAnim .demo-header ul li:before,
.demo-startAnim .demo-content .demo-kp ul li:before,
.demo-startAnim .demo-content .demo-kp ul li:after,
.demo-startAnim .demo-content .demo-listBox .demo-list .title:before,
.demo-startAnim .demo-content .demo-listBox .demo-list ul li:before,
.demo-startAnim .demo-content .demo-listBox .demo-list ul li:after,
.demo-startAnim .demo-footer:before,
.demo-startAnim .demo-footer:after {
  display: block;
  content: "";
}
a.logo {
  float: left;
  height: 46px;
  line-height: 46px;
  margin: 17px 45px;
  transition: margin 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), height 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  text-transform: uppercase;
  font-size: 18px;
  font-family: "Raleway", "Helvetica Neue", Helvetica, "Lantinghei SC", "Microsoft YaHei", "微软雅黑", "Hiragino Sans GB", SimSun, sans-serif;
  font-weight: 500;
  color: #6EB4E0;
}
a.logo img {
  float: left;
  -webkit-animation: rotateCircleBack 0.6s 1 ease-in-out;
  animation: rotateCircleBack 0.6s 1 ease-in-out;
}
.test {
  opacity: 0;
  -webkit-animation: TTest 0.5s ease-out;
          animation: TTest 0.5s ease-out;
}
@-webkit-keyframes TTest {
  0% {
    opacity: 0;
  }
  0%,
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
  }
  20%,
  60% {
    opacity: 1;
    -webkit-transform: translateX(30px);
            transform: translateX(30px);
  }
  40%,
  80% {
    -webkit-transform: translateX(-30px);
            transform: translateX(-30px);
  }
}
@keyframes TTest {
  0% {
    opacity: 0;
  }
  0%,
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
  }
  20%,
  60% {
    opacity: 1;
    -webkit-transform: translateX(30px);
            transform: translateX(30px);
  }
  40%,
  80% {
    -webkit-transform: translateX(-30px);
            transform: translateX(-30px);
  }
}

</style>
