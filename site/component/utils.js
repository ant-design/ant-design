import React from 'react';
import hljs from 'highlight.js';
import antd, { Menu } from '../../';

function isHeading(type) {
  return /h[1-6]/i.test(type);
}

export function objectToComponent(object, index) {
  if (object === null) return;

  if (React.isValidElement(object)) {
    return React.cloneElement(object, { key: index });
  }

  if (typeof object === 'function') {
    return object(React, antd);
  }

  if (typeof object === 'string') {
    return <span key={index}>{ object }</span>;
  }

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

  if (isHeading(object.type)) {
    return React.createElement(object.type, {
      key: index,
    }, [
      object.children,
      <a className="anchor" key="anchor">#</a>,
    ]);
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

export function flattenMenu(menu) {
  if (menu.type === Menu.Item) {
    return menu;
  }

  if (Array.isArray(menu)) {
    return menu.reduce((acc, item) => {
      return acc.concat(flattenMenu(item));
    }, []);
  }

  return flattenMenu(menu.props.children);
}

export function getActiveMenuItem(props, index) {
  const routes = props.routes;
  return routes[routes.length - 1].path || index;
}

export function getFooterNav(menuItems, activeMenuItem) {
  const menuItemsList = flattenMenu(menuItems);
  const activeMenuItemIndex = menuItemsList.findIndex((menuItem) => {
    return menuItem.key === activeMenuItem;
  });
  const prev = menuItemsList[activeMenuItemIndex - 1];
  const next = menuItemsList[activeMenuItemIndex + 1];
  return { prev, next };
}
