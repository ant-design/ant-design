import React, { type FC } from 'react';
import { useOutlet } from 'dumi';
import '../../static/style';

const DocLayout: FC = () => {
  const outlet = useOutlet();
  // TODO: place doc layout here, apply for all docs route paths
  // migrate from: https://github.com/ant-design/ant-design/blob/eb9179464b9c4a93c856e1e70ddbdbaaf3f3371f/site/theme/template/Layout/index.tsx

  return (
    <div>
      <header
        style={{
          borderBottom: '1px solid #eee',
          padding: 22,
        }}
      >
        Header area
      </header>
      <main style={{ display: 'flex' }}>
        <section style={{ width: 240, padding: 22, borderRight: '1px solid #eee' }}>
          Side Bar Area
        </section>
        <section style={{ flex: '1', padding: 24 }}>{outlet}</section>
      </main>
    </div>
  );
};

export default DocLayout;
