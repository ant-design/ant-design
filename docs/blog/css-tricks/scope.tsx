/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import React from 'react';
import { Flex } from 'antd';

const styleTxt = `
  @scope (.blog-css-tricks-a) to (span) {
    color: red;
  }

  .blog-css-tricks-b {
    color: blue;
  }
`;

export default () => (
  <Flex vertical gap="middle">
    <style>{styleTxt}</style>
    <div className="blog-css-tricks-a">
      <span>Should be red</span>
    </div>
    <div className="blog-css-tricks-a">
      <span>
        <div className="blog-css-tricks-b">
          <span>Should be blue</span>
        </div>
      </span>
    </div>
  </Flex>
);
