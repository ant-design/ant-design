<p align="center">
  <a href="https://varnish.allenai.org">
    <img src="./varnish.png" width="200" title="Varnish" alt="Varnish">
  </a>
</p>
<h1 align="center">Varnish</h1>

An [AI2](http://allenai.org) branded [React](https://reactjs.org/) component library derived from [Ant Design](https://ant.design/).

## Getting Started

First, install the module:

```bash
yarn add @allenai/varnish
```

Then use it like so:

```tsx
import { Header, Button, Theming } from '@allenai/varnish';
import '@allenai/varnish/dist/varnish.css';
const { ThemeProvider } = Theming;

const App = () => (
  <ThemeProvider>
    <Header>
        <h1>My Application!</h1>
    </Header>
    <Button type="primary">Click Me!</Button>
  <ThemeProvider />
);
```

## Local Development

If you'd like to work on Varnish, you can start up a local environment like so:

```bash
git clone git@github.com:allenai/varnish
cd varnish
npm run shellac:build
npm run start
```

## Releasing New Versions

To release a new version, make sure you're in `master` without any pending changes. Then run:

```bash
npm version $MAJOR.$MINOR.$PATCH
./scripts/release.py
git push --tags origin master
```

You'll need to specify `$MAJOR`, `$MINOR` and `$PATH` as per [semantic versioning](https://semver.org/).

After the release is out the door you should add [release notes](https://github.com/allenai/varnish/releases) to the corresponding tag.
