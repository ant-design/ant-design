import React, { ReactNode, type FC } from 'react';
import { useRouteMeta } from 'dumi';
import Footer from 'dumi/theme/slots/Footer';

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: implement content
  // from: https://github.com/ant-design/ant-design/blob/2a754bd5cad7fd4892a065a8e044fb402f51f426/site/theme/template/Content/MainContent.jsx
  //  1. Title & edit link
  //  2. TOC
  //  3. Contributors list
  //  4. Prev & next page

  console.log('route meta', useRouteMeta());

  return (
    <section style={{ flex: '1', padding: 24 }}>
      {children}
      <Footer />
    </section>
  );
};

export default Content;
