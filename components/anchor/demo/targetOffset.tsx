import React, { useEffect, useState } from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;

const App: React.FC = () => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTargetOffset(window.innerHeight / 2);
  }, []);

  return (
    <Anchor targetOffset={targetOffset}>
      <Link href="#components-anchor-demo-basic" title="Basic demo" />
      <Link href="#components-anchor-demo-static" title="Static demo" />
      <Link href="#api" title="API">
        <Link href="#anchor-props" title="Anchor Props" />
        <Link href="#link-props" title="Link Props" />
      </Link>
    </Anchor>
  );
};

export default App;
