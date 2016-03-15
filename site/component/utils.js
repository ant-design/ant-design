import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import hljs from 'highlight.js';
import antd from '../../';

function isHeading(type) {
  return /h[1-6]/i.test(type);
}

function mdLangToHljsLang(lang) {
  return lang.toLowerCase() === 'jsx' ?
    'javascript' :
    lang;
}

export function objectToComponent(pathname, object, index) {
  if (object === null) return;

  if (React.isValidElement(object)) {
    return React.cloneElement(object, { key: index });
  }

  if (typeof object === 'function') {
    return object(React, ReactDOM, antd, antd);
  }

  if (typeof object === 'string') {
    return <span key={index}>{ object }</span>;
  }

  const children = object.children;

  if (object.type === 'html') {
    return React.createElement('div', {
      className: 'markdown',
      key: index,
      dangerouslySetInnerHTML: { __html: children }
    });
  }

  if (isHeading(object.type)) {
    return React.createElement(object.type, {
      key: index,
      id: children,
    }, [
      <span dangerouslySetInnerHTML={{ __html: object.children }} />,
      <Link to={{ pathname, query: { scrollTo: object.children } }} className="anchor" key="anchor">#</Link>,
    ]);
  }

  if (object.type === 'code') {
    const highlightedCode = hljs.highlight(
      mdLangToHljsLang(object.props.lang),
      children
    ).value;
    return (
      <div className="highlight" key={index}>
        <pre>
          <code className={object.props.lang}
            dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>
    );
  }

  if (typeof children === 'string') {
    return React.createElement(object.type, {
      key: index,
      dangerouslySetInnerHTML: { __html: children }
    });
  }

  return React.createElement(
    object.type, { key: index },
    children && children.map(objectToComponent.bind(null, pathname)) // `hr` has no children
  );
}
