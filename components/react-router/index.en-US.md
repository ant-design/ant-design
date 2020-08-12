---
category: Components
type: Extensions
title: varnish-react-router
cols: 2
cover: https://allenai.org/favicon.ico
---

`Varnish` does not depend on `react-router`.  If you wish to use `react-router` in your app, you can include `@allenai/varnish-react-router` for access to styled router links and other `react-router` dependent components.

## Link

You can use `@allenai/varnish-react-router` to get a Varnish styled `react-router.Link`.

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

## ScrollToTopOnPageChange

When using `react-router` we can hook into the page change event and  `@allenai/varnish-react-router` to scroll the page to the top on load.

```jsx
import { HashRouter as Router, Route, withRouter } from 'react-router-dom';
import { ScrollToTopOnPageChange } from '@allenai/varnish-react-router';

const Home = withRouter(() => {
  return (
    <>
      <ScrollToTopOnPageChange />
      <Route path="/" component={() => <div>My App</div>} />
    </>
  );
});

ReactDOM.render(
  <Router>
    <Home />
  </Router>,
  mountNode,
);
```
