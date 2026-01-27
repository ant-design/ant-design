# GitHub Actions Workflows Security

This document describes the security measures implemented in ant-design's GitHub Actions workflows to protect against common attack vectors, particularly the "PWN Request" vulnerability.

## Background: PWN Request Vulnerability

The "PWN Request" (or "Pull Request Target") vulnerability occurs when workflows:

1. Use `pull_request_target`, `workflow_run`, or `issue_comment` triggers
2. Check out code from untrusted sources (fork PRs)
3. Execute that code with elevated privileges or access to secrets

This can allow attackers to:

- Steal repository secrets
- Execute remote code in the CI/CD environment
- Modify repository contents
- Compromise the supply chain

**Reference**: See [GitHub Security Lab - Preventing PWN Requests](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)

## Security Principles Applied

### 1. Safe Use of `pull_request_target`

All workflows using `pull_request_target` follow these rules:

- ✅ **NEVER** check out PR code (`actions/checkout` with PR ref)
- ✅ **NEVER** run `npm install` or similar with PR code
- ✅ Only interact with PR metadata (comments, labels, status)
- ✅ Use minimal permissions (explicitly defined per job)

**Safe workflows:**

- `preview-start.yml` - Only comments on PRs
- `pr-open-notify.yml` - Only sends notifications
- `pr-open-check.yml` - Only validates PR content
- `verify-files-modify.yml` - Only checks file modifications via API
- `pr-check-merge.yml` - Only comments on branch merge PRs
- `pr-contributor-welcome.yml` - Only comments on merged PRs
- `visual-regression-diff-start.yml` - Only comments on PRs

### 2. Separation of Build and Deploy

We use the "build in PR, deploy in workflow_run" pattern:

**Build Phase** (uses `pull_request` trigger):

- `preview-build.yml` - Builds site from PR code with restricted permissions
- `visual-regression-diff-build.yml` - Generates screenshots from PR code
- Uses `pull_request` trigger (no secrets, read-only repository access)
- Uploads build artifacts (no secrets included)

**Deploy Phase** (uses `workflow_run` trigger):

- `preview-deploy.yml` - Downloads artifacts and deploys
- `visual-regression-diff-finish.yml` - Downloads artifacts and posts results
- Only downloads artifacts, never checks out untrusted code
- Has access to secrets for deployment
- Validates PR numbers before use

### 3. Authorization Checks

Workflows that can modify repository state require authorization:

- ✅ `rebase.yml` - Restricts `/rebase` command to MEMBER, COLLABORATOR, or OWNER
- ✅ `verify-files-modify.yml` - Checks contributor authority for protected paths
- ✅ `pr-check-merge.yml` - Only runs for ant-design organization PRs

### 4. Minimal Permissions

All workflows follow the principle of least privilege:

```yaml
permissions:
  contents: read # Default read-only access

jobs:
  specific-job:
    permissions:
      # Only grant what's needed
      issues: write
      pull-requests: write
```

### 5. Pinned Action Versions

Critical actions are pinned to specific commit SHAs:

- `actions-cool/verify-files-modify@9f38a3b3d324d4d92c88c8a946001522e17ad554`

This prevents supply chain attacks via compromised action updates.

### 6. Input Validation

All external inputs are validated:

- PR numbers are validated as numeric before use
- File paths are checked before operations
- User associations are verified before privileged operations

## Workflow Security Checklist

When adding or modifying workflows, ensure:

- [ ] If using `pull_request_target`, NEVER check out PR code
- [ ] If using `pull_request_target`, NEVER run untrusted code
- [ ] If using `issue_comment` with code execution, check `author_association`
- [ ] If using `workflow_run`, only download artifacts or check out base branch
- [ ] Permissions are explicitly set to minimum required
- [ ] Secrets are only used in trusted contexts
- [ ] All user inputs are validated
- [ ] Third-party actions are from trusted sources
- [ ] Critical actions are pinned to commit SHAs

## Incident Response

If a security vulnerability is discovered:

1. Immediately disable the affected workflow
2. Report to security team via [SECURITY.md](../SECURITY.md)
3. Do not disclose publicly until patched
4. Review all recent workflow runs for signs of exploitation

## References

- [GitHub Security Lab - Preventing PWN Requests](https://securitylab.github.com/resources/github-actions-preventing-pwn-requests/)
- [GitHub Actions Security Best Practices](https://blog.gitguardian.com/github-actions-security-cheat-sheet/)
- [OpenSSF - Mitigating Attack Vectors in GitHub Workflows](https://openssf.org/blog/2024/08/12/mitigating-attack-vectors-in-github-workflows/)
- [PostHog - Shai Hulud Attack Post-Mortem](https://posthog.com/blog/nov-24-shai-hulud-attack-post-mortem)
