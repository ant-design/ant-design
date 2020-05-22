import * as React from 'react';
import Footer from '../../../../components/footer';
import Layout from '../../../../components/layout';

export default function Home() {
  return (
    <Layout>
      <Layout.Content>
        <h2> Welcome </h2>
        <br />
        <p>
          This is a demonstration of <a href="https://github.com/allenai/varnish">Varnish</a>, a
          custom theme provider for both <a href="https://ant.design">Ant Design</a> and{' '}
          <a href="https://www.styled-components.com/">Styled-Components</a>.
        </p>
        <p>Varnish provides common AI2 Styled-Components, components, and utilities.</p>
        <p>
          Varnish is derived from the{' '}
          <a href="https://github.com/allenai/skiff-template">Skiff Template</a>. Skiff provides a{' '}
          <a href="https://www.python.org/">Python</a> based API and a UI constructed with{' '}
          <a href="https://www.typescriptlang.org/">TypeScript</a>,{' '}
          <a href="https://reactjs.org/">ReactJS</a>, and{' '}
          <a href="https://ant.design/">Ant Design</a>.
        </p>
        <p>
          It is deployed to a Google managed Kubernetes cluster and provides DNS, log aggregation,
          TLS and other capabilties out of the box, thanks to the{' '}
          <a href="https://github.com/allenai/skiff">Skiff</a> project.
        </p>
        <p>
          If you have any questions, concerns or feedback please don&apos;t hesitate to reach out.
          You can open a{' '}
          <a href="https://github.com/allenai/skiff-template/issues/new">Github Issue</a> or contact
          us at <a href="mailto:reviz@allenai.org">reviz@allenai.org</a>.
        </p>
      </Layout.Content>
      <Footer />
    </Layout>
  );
}
