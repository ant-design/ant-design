import React from 'react';
import { BorderBeam, Card } from 'antd';

const App: React.FC = () => {
  const [active, setActive] = React.useState(false);

  return (
    <div style={{ width: 360 }}>
      <BorderBeam active={active}>
        <Card
          title="Hover to activate"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          Move the pointer over this card to show the border beam.
        </Card>
      </BorderBeam>
    </div>
  );
};

export default App;
