import React from 'react';
import Header from './Header';
import Footer from './Footer';

import './app.less';
export default function App({ children }) {
  return (<div>
    <Header />
    { children }
    <Footer />
  </div>);
}
