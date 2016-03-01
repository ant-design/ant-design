import React from 'react';
import hljs from 'highlight.js';

export function objectToComponent(object, index) {
  if (object === null) return;

  const children = object.children;

  if (object.type === 'html') {
    return React.createElement('div', {
      key: index,
      dangerouslySetInnerHTML: { __html: children }
    });
  }

  if (object.type === 'code') {
    const highlightedCode = hljs.highlight('javascript', children).value;
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
    children && children.map(objectToComponent) // `hr` has no children
  );
}
