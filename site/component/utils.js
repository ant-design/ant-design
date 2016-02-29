import React from 'react';

export function objectToComponent(object, index) {
  if (object === null) return; // TODO: mark-twain support table

  const children = object.children;

  if (object.type === 'html') {
    return React.createElement('div', {
      key: index,
      dangerouslySetInnerHTML: { __html: children }
    });
  }

  if (typeof children === 'string') {
    return React.createElement(object.type, {
      key: index,
      dangerouslySetInnerHTML: { __html: children }
    });
  }
  return React.createElement(
    object.type, { key: Math.random() },
    children && children.map(objectToComponent) // `hr` has no children
  );
}
