import demoTest from '../shared/demoTest';

// https://github.com/WickyNilliams/enquire.js/issues/82
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};

demoTest('carousel');
