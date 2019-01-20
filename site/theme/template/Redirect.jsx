import React from 'react';

const redirect = {
  '/docs/resource/download': '/docs/spec/download',
  '/docs/resource/download-cn': '/docs/spec/download-cn',
  '/docs/resource/reference': '/docs/spec/reference',
  '/docs/resource/reference-cn': '/docs/spec/reference-cn',
  '/docs/spec/feature': '/docs/spec/values',
  '/docs/spec/feature-cn': '/docs/spec/values-cn',
  '/docs/pattern/advanced-search': '/docs/spec/overview',
  '/docs/pattern/advanced-search-cn': '/docs/spec/overview-cn',
  '/docs/pattern/complex-table': '/docs/spec/overview',
  '/docs/pattern/complex-table-cn': '/docs/spec/overview-cn',
  '/docs/pattern/form': '/docs/spec/overview',
  '/docs/pattern/form-cn': '/docs/spec/overview-cn',
  '/docs/pattern/list': '/docs/spec/overview',
  '/docs/pattern/list-cn': '/docs/spec/overview-cn',
  '/docs/pattern/navigation': '/docs/spec/navigation',
  '/docs/pattern/navigation-cn': '/docs/spec/navigation-cn',
  '/docs/pattern/table': '/docs/spec/overview',
  '/docs/pattern/table-cn': '/docs/spec/overview-cn',
};

export default class Redirect extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const pathname = `/${location.pathname}`;
    Object.keys(redirect).forEach(from => {
      if (pathname.indexOf(from) === 0) {
        window.location.href = redirect[from];
      }
    });
  }

  render() {
    return <div />;
  }
}
