---
category: Components
type: General
title: Link
cols: 2
cover: https://allenai.org/favicon.ico
---

Varnish has default styles for `a[href]` links and provides a base style `contrastLinkColorStyles`
for use on dark backgrounds.

## react-router

`Varnish` does not depend on `react-router`.  If you wish to use `react-router` in your app, you can include [`@allenai/varnish-react-router`](https://www.npmjs.com/package/@allenai/varnish-react-router) for access to styled router links and other `react-router` dependent components.

```jsx
import { HashRouter as Router, withRouter } from 'react-router-dom';
import { Link } from '@allenai/varnish-react-router';

const Home = withRouter(() => {
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a molestic metus.{' '}
      <Link to='/'>React Router Link</Link>{' '}
      lobortis varius. Cras vulputate felis et mauris tincidunt, elementum volutpat.
    </div>
  );
});

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  mountNode,
);
```
