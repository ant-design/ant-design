import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

/**
 * Ref: https://github.com/ant-design/ant-design/issues/17125
 */
const App: React.FC = () => (
  <Typography>
    <Title level={4}>Typography with Table</Title>

    <table>
      <thead>
        <tr>
          <th>Plan</th>
          <th>Price</th>
          <th>Features</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Basic</td>
          <td>Free</td>
          <td>1GB Storage, Basic Support</td>
        </tr>
        <tr>
          <td>Pro</td>
          <td>$9.99/month</td>
          <td>100GB Storage, Priority Support</td>
        </tr>
        <tr>
          <td>Enterprise</td>
          <td>Contact us</td>
          <td>Unlimited Storage, 24/7 Support</td>
        </tr>
      </tbody>
    </table>
  </Typography>
);

export default App;
