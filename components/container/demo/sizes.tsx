import React from 'react';
import { Container } from 'antd';

const App: React.FC = () => (
  <div>
    <Container maxWidth="xl" minWidth="md" style={{ marginBottom: 16 }}>
      <div style={{ backgroundColor: '#f0f2f5', padding: 24, textAlign: 'center' }}>
        Max: lg, Min: md
      </div>
    </Container>
    <Container maxWidth={800} minWidth={600}>
      <div style={{ backgroundColor: '#f0f2f5', padding: 24, textAlign: 'center' }}>
        Max: 800px, Min: 600px
      </div>
    </Container>
  </div>
);

export default App;
