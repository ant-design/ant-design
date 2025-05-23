/* eslint-disable react-dom/no-dangerously-set-innerhtml */
import React from 'react';
import { Flex } from 'antd';

const styleTxt = `
.blog-css-tricks {
  border: 1px solid #0958d9;
  width: 200px;
  height: 50px;
}

.blog-css-tricks {
  @container style(--custom-var) {
    p {
      color: green;
    }
  }
}
`;

const Block = (props: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className="blog-css-tricks" style={props.style}>
    <p>{props.children}</p>
  </div>
);

export default () => (
  <Flex vertical gap="middle">
    <style>{styleTxt}</style>
    <Block>Without CSS Var</Block>
    <Block style={{ '--custom-var': '0px' }}>With CSS Var</Block>
  </Flex>
);
