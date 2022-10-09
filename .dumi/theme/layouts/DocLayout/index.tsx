import React, { type FC } from 'react';
import { useOutlet } from 'dumi';
import Header from 'dumi/theme/slots/Header';
import Content from 'dumi/theme/slots/Content';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Footer from 'dumi/theme/slots/Footer';
import '../../static/style';
import useLocation from '../../../hooks/useLocation';

const DocLayout: FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();

  // TODO: place doc layout here, apply for all docs route paths
  // migrate from: https://github.com/ant-design/ant-design/blob/eb9179464b9c4a93c856e1e70ddbdbaaf3f3371f/site/theme/template/Layout/index.tsx

  const selfRender = ['/index', '/resource'].some(path => pathname.includes(path));

  return (
    <div>
      <Header />

      {selfRender ? (
        <>
          {outlet}
          <Footer />
        </>
      ) : (
        <main style={{ display: 'flex' }}>
          <Sidebar />
          <Content>{outlet}</Content>
        </main>
      )}
    </div>
  );
};

export default DocLayout;
