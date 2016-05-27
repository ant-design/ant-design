import React from 'react';
import Layout from '../Layout';
import MainContent from './MainContent';

export default (props) => {
  return (
    <Layout {...props}>
      <MainContent {...props} />
    </Layout>
  );
};
