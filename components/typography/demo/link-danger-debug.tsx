import React from 'react';
import { Button, Divider, Typography } from 'antd';

const { Text, Link } = Typography;

const App: React.FC = () => (
  <Typography>
    <Text>Typography.Link 的 type="danger" 颜色应为 error 文本色。</Text>
    <br />
    <Link href="https://ant.design" type="danger">
      Danger Link
    </Link>
    <Divider />
    <Text>Button 以 a 标签渲染时，不应被 Typography 链接样式影响。</Text>
    <br />
    <Button type="link" href="https://ant.design">
      Button Link
    </Button>
  </Typography>
);

export default App;
