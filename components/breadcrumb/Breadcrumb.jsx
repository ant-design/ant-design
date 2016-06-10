import React, { cloneElement } from 'react';
import BreadcrumbItem from './BreadcrumbItem';

const defaultNameFormatter = (route, params) => {
  if (!route.breadcrumbName) {
    return null;
  }
  const name = route.breadcrumbName.replace(/:(.*)/g, (replacement, key) => {
    return params[key] || replacement;
  });

  return name;
};

export default class Breadcrumb extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
    linkRender: (paths, name) => <a href={`#/${paths.join('/')}`}>{name}</a>,
    nameRender: (name) => <span>{name}</span>,
    nameFormatter: defaultNameFormatter,
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
    nameFormatter: React.PropTypes.func,
  }

  render() {
    let crumbs;
    const { separator, prefixCls, routes, params, children, linkRender, nameRender, nameFormatter } = this.props;
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

        const name = nameFormatter(route, params);
        if (name) {
          const link = (i === lastPath) ? nameRender(name) : linkRender(paths, name);
          return <BreadcrumbItem separator={separator} key={name}>{link}</BreadcrumbItem>;
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
