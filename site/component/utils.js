import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import toReactComponent from 'jsonml-to-react-component';

function isHeading(type) {
  return /h[1-6]/i.test(type);
}

export function jsonmlToComponent(pathname, jsonml) {
  return toReactComponent([
    [(node) => React.isValidElement(node), (node, index) => {
      return React.cloneElement(node, { key: index });
    }],
    [(node) => typeof node === 'function', (node, index) => {
      return React.cloneElement(node(React, ReactDOM), { key: index });
    }],
    [(node) => isHeading(node[0]), (node, index) => {
      return React.createElement(node[0], {
        key: index,
        id: node[1],
      }, [
        <span key="title" dangerouslySetInnerHTML={{ __html: node[1] }} />,
        <Link to={{ pathname, query: { scrollTo: node[1] } }} className="anchor" key="anchor">#</Link>,
      ]);
    }],
  ], jsonml);
}

export function setTitle(title) {
  document.title = title;
}
