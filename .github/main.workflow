workflow "Deploy website" {
  on = "release"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "JamesIves/github-pages-deploy-action@master"
  secrets = [
    "ACCESS_TOKEN",
  ]
  env = {
    BUILD_SCRIPT = "npm install && npm run predeploy"
    BRANCH = "gh-pages"
    FOLDER = "_site"
  }
}
