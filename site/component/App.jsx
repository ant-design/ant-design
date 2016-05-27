import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function App(props) {
  return (
    <div className="page-wrapper">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
}
