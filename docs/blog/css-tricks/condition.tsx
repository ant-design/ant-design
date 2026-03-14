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

const Block: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = (props) => (
  <div className="blog-css-tricks" style={props.style}>
    <p>{props.children}</p>
  </div>
);

const ConditionExample: React.FC = () => (
  <Flex vertical gap="middle">
    <style>{styleTxt}</style>
    <Block>Without CSS Var</Block>
    <Block style={{ '--custom-var': '0px' }}>With CSS Var</Block>
  </Flex>
);

export default ConditionExample;
