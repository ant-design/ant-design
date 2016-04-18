import React, { cloneElement } from 'react';
import BreadcrumbItem from './BreadcrumbItem';

export default class Breadcrumb extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
    linkRender: (href, name) => <a href={`#${href}`}>{name}</a>,
    nameRender: (name) => <span>{name}</span>,
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
      crumbs = routes.map((route, i) => {
        route.path = route.path || '';
        let path = route.path.replace(/^\//, '');
        Object.keys(params).forEach(key => {
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }

        if (!route.breadcrumbName) {
          return null;
        }
        const name = route.breadcrumbName.replace(/:(.*)/g, (replacement, key) => {
          return params[key] || replacement;
        });

        let link;
        if (i === routes.length - 1) {
          link = nameRender(name);
        } else {
          link = linkRender(`/${paths.join('/')}`, name);
        }
        return <BreadcrumbItem separator={separator} key={name}>{link}</BreadcrumbItem>;
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
