workflow "Deploy website" {
  on = "release"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "docker://node:10"
  runs = [
    "sh",
    "-c",
    "git remote set-url origin https://${DEPLOY_TOKEN}@github.com/ant-design/ant-design.git && npm install && npm run deploy"
  ],
  secrets = ["DEPLOY_TOKEN"]
}
