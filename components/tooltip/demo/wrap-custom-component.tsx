import { Tooltip } from 'antd';
import React, { MouseEventHandler, PointerEventHandler, FocusEventHandler } from "react";

interface ComponentWithEventsProps {
    onMouseEnter?: MouseEventHandler | undefined;
    onMouseLeave?: MouseEventHandler | undefined;
    onPointerEnter?: PointerEventHandler | undefined;
    onPointerLeave?: PointerEventHandler | undefined;
    onFocus?: FocusEventHandler | undefined;
    onClick?: MouseEventHandler | undefined;
}

const ComponentWithEvents: React.FC = (props: ComponentWithEventsProps) => {
    return (
        <span {...props}>
            This text is inside a component with the necessary events exposed.
        </span>
    );
}

const App: React.FC = () => (
  <Tooltip title="prompt text">
    <ComponentWithEvents />
  </Tooltip>
);

export default App;