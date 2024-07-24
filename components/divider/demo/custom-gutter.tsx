import React from 'react';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider gutterMargin={8} />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider gutterMargin={16} />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider gutterMargin={24} />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider gutterMargin="2rem" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider />
    <div>
      Text
      <Divider type="vertical" gutterMargin={4} />
      <a href="#">Link</a>
      <Divider type="vertical" gutterMargin={8} />
      <a href="#">Link</a>
      <Divider type="vertical" gutterMargin={16} />
      <a href="#">Link</a>
      <Divider type="vertical" gutterMargin="2rem" />
      <a href="#">Link</a>
    </div>
  </>
);

export default App;
