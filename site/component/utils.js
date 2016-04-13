import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { getTagName, getAttributes, getChildren } from 'jsonml.js/lib/utils';
import toReactComponent from 'jsonml-to-react-component';

function isHeading(type) {
  return /h[1-6]/i.test(type);
}

export function jsonmlToComponent(pathname, jsonml) {
  return toReactComponent(jsonml, [
    [(node) => React.isValidElement(node), (node, index) => {
      return React.cloneElement(node, { key: index });
    }],
    [(node) => typeof node === 'function', (node, index) => {
      return React.cloneElement(node(React, ReactDOM), { key: index });
    }],
    [(node) => isHeading(getTagName(node)), (node, index) => {
      const children = getChildren(node);
      return React.createElement(getTagName(node), {
        key: index,
        id: children,
        ...getAttributes(node),
      }, [
        <span key="title">{ children.map((child) => toReactComponent(child)) }</span>,
        <Link to={{ pathname, query: { scrollTo: children } }} className="anchor" key="anchor">#</Link>,
      ]);
    }],
    [(node) => getTagName(node) === 'pre' && getAttributes(node).highlighted, (node, index) => {
      return React.createElement('pre', { key: index, lang: getAttributes(node).lang }, React.createElement(
        'code',
        { dangerouslySetInnerHTML: { __html: getChildren(getChildren(node)[0])[0] } }
      ));
    }],
  ]);
}

export function setTitle(title) {
  document.title = title;
}
