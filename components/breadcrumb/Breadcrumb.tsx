import React, { cloneElement } from 'react';
import BreadcrumbItem from './BreadcrumbItem';

const defaultNameRender = (breadcrumbName, route, params) => {
  if (!breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement
  );
  return <span>{name}</span>;
};

export default class Breadcrumb extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
    linkRender: (href, name) => <a href={`#${href}`}>{name}</a>,
    nameRender: defaultNameRender,
  }

  static propTypes = {
    prefixCls: React.PropTypes.string,
    separator: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    routes: React.PropTypes.array,
    params: React.PropTypes.object,
    linkRender: React.PropTypes.func,
    nameRender: React.PropTypes.func,
  }

  render() {
    let crumbs;
    const { separator, prefixCls, routes, params, children, linkRender, nameRender } = this.props;
    if (routes && routes.length > 0) {
      const paths = [];
      const lastPath = routes.length - 1;
      crumbs = routes.map((route, i) => {
        route.path = route.path || '';
        let path = route.path.replace(/^\//, '');
        Object.keys(params).forEach(key => {
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }
        const name = nameRender(route.breadcrumbName, route, params);
        if (name) {
          const link = (i === lastPath) ? name : linkRender(`/${paths.join('/')}`, name, paths);
          return <BreadcrumbItem separator={separator} key={route.breadcrumbName || i}>{link}</BreadcrumbItem>;
        }
        return null;
      });
    } else {
      crumbs = React.Children.map(children, (element, index) => {
        return cloneElement(element, {
          separator,
          key: index,
        });
      });
    }
    return (
      <div className={prefixCls}>
        {crumbs}
      </div>
    );
  }
}
