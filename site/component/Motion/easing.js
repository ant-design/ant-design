/* eslint no-new: 0 */
import Motion from './motion';

module.exports = function () {
  new Motion('#J-Linear', {
    lineData: [{ stroke: '#f2666c' }, {
      stroke: '#71B5DE',
      openEaseName: 'easeInOutQuad',
      endEaseName: 'easeInOutQuad'
    }], mask: false
  });
  new Motion('#J-Symmetric', {
    lineData: [
      { openEaseName: 'easeInOutQuad', endEaseName: 'null', stroke: '#f2666c' },
      { stroke: '#71B5DE', openEaseName: 'easeInOutCubic', endEaseName: 'easeInOutCubic' }],
    mask: false, exposure: 'top'
  });
  new Motion('#J-Entry', {
    lineData: [
      { openEaseName: 'easeOutQuad', endEaseName: 'easeOutQuad', stroke: '#f2666c' },
      { stroke: '#71B5DE', openEaseName: 'easeOutCubic', endEaseName: 'easeInCubic' }],
    mask: true, exposure: 'bottom'
  });
  new Motion('#J-Back', {
    lineData: [
      { openEaseName: 'easeOutBounce', endEaseName: 'easeOutElastic', stroke: '#70f266' },
      { stroke: '#71B5DE', openEaseName: 'easeOutBack', endEaseName: 'easeInOutBack' }],
    mask: false, exposure: 'top'
  });
};
