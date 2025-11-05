import React from 'react';
import { Tooltip } from 'antd';

interface ComponentProps extends React.DOMAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
}

const ComponentWithEvents: React.FC<ComponentProps> = (props) => {
  const { ref, ...rest } = props;
  return (
    <span ref={ref} {...rest}>
      This text is inside a component with the necessary events exposed.
    </span>
  );
};

const App: React.FC = () => (
  <Tooltip title="prompt text">
    <ComponentWithEvents />
  </Tooltip>
);

export default App;
