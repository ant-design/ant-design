import * as React from 'react';
import { cloneElement } from 'react';
import warning from 'warning';
import BreadcrumbItem from './BreadcrumbItem';

export interface BreadcrumbProps {
  prefixCls?: string;
  routes?: Array<any>;
  params?: Object;
  separator?: string | React.ReactNode;
  itemRender?: (route, params, routes, paths) => React.ReactNode;
  style?: React.CSSProperties;
};

function getBreadcrumbName(route, params, routes) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement
  );
  return name;
}

export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  static Item: any;

  static defaultProps = {
    prefixCls: 'ant-breadcrumb',
    separator: '/',
    itemRender: (route, params, routes, paths) => {
      const isLastItem = routes.indexOf(route) === routes.length - 1;
      const name = getBreadcrumbName(route, params, routes);
      return isLastItem
        ? <span>{name}</span>
        : <a href={`#/${paths.join('/')}`}>{name}</a>;
    },
  };

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
  };

  constructor(props) {
    super();

    warning(
      !('linkRender' in props || 'nameRender' in props),
      '`linkRender` and `nameRender` is removed, please use `itemRender` instead.'
    );
  }

  render() {
    let crumbs;
    const { separator, prefixCls, routes, params, children, itemRender } = this.props;
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
        if (route.breadcrumbName) {
          return (
            <BreadcrumbItem separator={separator} key={route.breadcrumbName}>
              {itemRender(route, params, routes, paths)}
            </BreadcrumbItem>
          );
        }
        return null;
      });
    } else {
      crumbs = React.Children.map(children, (element: any, index) => {
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
