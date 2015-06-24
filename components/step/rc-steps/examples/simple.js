'use strict';

var React = require('react');
var Steps = require('rc-steps');


var container = document.getElementById('__react-content');
//var eles = [];
//for (var i=0;i<10;i++) {
//  eles.push(document.createElement('div'));
//  container.appendChild(eles[i]);
//}

React.render(
  <Steps>
  <Steps.Step status="finish" title="己完成"></Steps.Step>
  <Steps.Step status="process" title="正在进行"></Steps.Step>
  <Steps.Step status="waiting" title="待完成"></Steps.Step>
  <Steps.Step status="waiting" title="待完成"></Steps.Step>
</Steps>, container);