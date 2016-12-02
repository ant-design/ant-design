import React from 'react';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';

export default () => (
  <div id="list">
    <ScrollLink className="list-point" to="banner" toHash={false} />
    <ScrollLink className="list-point" to="page1" toHash={false} />
    <ScrollLink className="list-point" to="page2" toHash={false} />
    <ScrollLink className="list-point" to="page3" toHash={false} />
    <ScrollLink className="list-point" to="page4" toHash={false} />
  </div>
);
