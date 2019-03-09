workflow "New workflow" {
  on = "push"
  resolves = ["Auto Assign"]
}

action "Auto Assign" {
  uses = "kentaro-m/auto-assign@v1.0.0"
}
