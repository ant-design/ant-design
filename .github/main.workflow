workflow "Deploy website" {
  on = "release"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "JamesIves/github-pages-deploy-action@master"
  runs = [
    "sh",
    "-c",
    "git config user.name antd-actions-bot && git config --local user.email support+actions@github.com && git remote set-url origin https://${DEPLOY_TOKEN}@github.com/ant-design/ant-design.git && npm install && npm run deploy",
  ]
  secrets = [
    "ACCESS_TOKEN",
  ]
  env = {
    BUILD_SCRIPT = "npm install && npm run predeploy"
    BRANCH = "gh-pages"
    FOLDER = "_site"
  }
}
