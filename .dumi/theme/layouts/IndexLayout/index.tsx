import type { PropsWithChildren } from 'react';
import React from 'react';

import Footer from '../../slots/Footer';

interface IndexLayoutProps {
  title?: string;
  desc?: string;
}

const IndexLayout: React.FC<PropsWithChildren<IndexLayoutProps>> = (props) => {
  const { children, title, desc } = props;
  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {desc && <meta name="description" content={desc} />}
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </>
  );
};

export default IndexLayout;
