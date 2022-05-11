# publish-to-git

Publish private npm packages to Git repositories with npm publish semantics (uses same files as `npm publish`)

Default behavior takes the version from package.json, runs `npm pack` and then pushes the contents to an orphan tag `v<VERSION>` (for example `v1.0.0`). It's similar to how `gh-pages` works.

Such tags can be easily referenced to in `package.json`. It provides proper versioning to private Git npm packages along with an easy publish path that's compatible with `npm`.

## Installation

```js
npm install --save-dev publish-to-git
```

Requirements: `node > 8.0.0` and `git` command being in the `PATH`.

## Consumption of private Git NPM packages

For Github

```json
"some-package": "reponame/repo#v1.0.0",
"some-package-with-semver": "reponame/repo#semver:^v1.0.0",
```

For Gitlab or BitBucket (use `bitbucket:`)

```json
"some-package": "gitlab:reponame/repo#v1.0.0",
"some-package-with-semver": "gitlab:reponame/repo#semver:^v1.0.0",
```

For some other Git repo:

```json
"some-package": "git+ssh://git@somehow.com:somerepo#v1.0.0",
"some-package-with-semver": "git+ssh://git@somehow.com:somerepo#semver:^v1.0.0",
```

Note: Installing from Github/Gitlab/Bitbucket seems to be more efficient due to the way [it conditionally turns on shallow clone](https://github.com/zkat/pacote/blob/ccc6e9094c2e872f09cc12ae966a0cbc1a570eed/lib/fetchers/git.js#L169).

## Usage

In package.json

```js
"scripts": {
  "publish": "publish-to-git"
}
```

or run with `npx`:

```
# npx publish-to-git
```

See also a few options which may assist in your particular use case:

```
Options:
  --help     Show help [boolean]
  --version  Show version number [boolean]
  --remote   Git remote, may be remote name or full URL to the repo [default: "origin"]
  --tag      Tag name to which src will be published, for example: v1.2.3 - by default uses version from package.json
  --push     Push update to the git remote (pass --no-push to disable) [boolean] [default: "true"]
  --force    Override any existing tag on the remote as well as locally (git tag -f, git push -f) [boolean]

Examples:
  publish-to-git --tag v2.1.3 --no-push     # by default version from package.json is used
  publish-to-git --remote https://USER:GITHUB_TOKEN@github.com/USER/REPO
  publish-to-git --force    # useful in CI and when we want to override the same tag which triggered the build
```

## Programmatic usage

```js
const { publish } = require('publish-to-git');

const options = {
  tag: 'v1.0.0', // you can also provide version: '1.0.0' instead of tag
  push: {
    // set to false to not push
    remote: 'origin', // set to URL or remote name
    force: false, // set to true to force push
  },
};

publish(options).then(() => {
  console.log('Done');
});
```

Please see https://github.com/Rush/publish-to-git/blob/master/main.js for reference

## Usage in Drone CI

This example assumes that the developer pushes a tag that's identical to the version in package json. CI will complete the build and override tag contents. If you find this approach ugly, you could push tags in form of `build-v1.0.0` and then have `publish-to-git` publish using default options.

```yaml
pipeline:
  # other pipelines here, like build etc.
  publish-to-git:
    commands:
      - git config --global user.email "admin@drone" # git will complain if these are not set
      - git config --global user.name "Drone CI"
      - npx publish-to-git --force # this will override existing tag with npm package contents
    when:
      event: tag
```

## Quick note on semver with https

Older versions of `npm` prior to `6.0` had a bug with supporting semver git packages. It's no longer a problem since npm `6.0`.

For automated publishing to Github `~/.netc` and `npm`/`git` will automatically pick it up:

```
machine github.com
login <GITHUB_TOKEN>
password=x-oauth-basic
```

## License

MIT
