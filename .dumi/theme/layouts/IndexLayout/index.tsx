import { Helmet } from 'dumi';
import type { PropsWithChildren } from 'react';
import React from 'react';
import Footer from '../../slots/Footer';

const IndexLayout: React.FC<PropsWithChildren<{ title: string; desc: string }>> = ({
  children,
  ...restProps
}) => (
  <>
    <Helmet>
      <title>{restProps.title}</title>
      <meta property="og:title" content={restProps.title} />
      {restProps.desc && <meta name="description" content={restProps.desc} />}
    </Helmet>
    <div style={{ minHeight: '100vh' }}>{children}</div>
    <Footer />
  </>
);

export default IndexLayout;
