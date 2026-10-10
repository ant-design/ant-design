#!/usr/bin/env bash
# Publish visual-regression comment images to a dedicated orphan branch.
#
# GitHub proxies external images in PR comments through camo, and camo can no
# longer fetch images hosted on Aliyun domains (it responds with `404 Cannot
# proxy the given URL`). Images referenced with a raw.githubusercontent.com URL
# are rendered directly by GitHub without the camo proxy, so the diff images
# used by the PR comment are pushed to the branch `visual-diff/pr-<id>` and the
# comment references them through their raw URL.
#
# The full report (report.html / index.html with all images) is still hosted on
# OSS, only the images embedded in the PR comment need this GitHub mirror.
#
# Usage: publish-comment-images.sh <reportDir> <refPrefix>
#   reportDir  path of the unpacked `visualRegressionReport` directory
#   refPrefix  e.g. `pr-1234`; images are pushed to `visual-diff/pr-1234`
#
# Environment:
#   GITHUB_REPOSITORY  e.g. `ant-design/ant-design`
#   GITHUB_TOKEN       token with `contents: write` permission
set -euo pipefail

REPORT_DIR=${1:?Missing report dir}
REF=${2:?Missing ref}
BRANCH="visual-diff/${REF}"
REPO=${GITHUB_REPOSITORY:?Missing GITHUB_REPOSITORY}
TOKEN=${GITHUB_TOKEN:?Missing GITHUB_TOKEN}

WORK_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR"' EXIT

# Only the images rendered in the PR comment are needed here
cp -r "${REPORT_DIR}/images" "${WORK_DIR}/images"

# Skip when there is nothing to publish (e.g. report passed without diff)
if [ -z "$(find "${WORK_DIR}/images" -type f -print -quit)" ]; then
  echo "No image to publish, skip."
  exit 0
fi

git -C "${WORK_DIR}" init -q -b "${BRANCH}"
git -C "${WORK_DIR}" config user.name "github-actions[bot]"
git -C "${WORK_DIR}" config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git -C "${WORK_DIR}" add -A
git -C "${WORK_DIR}" commit -qm "visual diff images for ${REF} [skip ci]"
git -C "${WORK_DIR}" remote add origin "https://x-access-token:${TOKEN}@github.com/${REPO}.git"

# Force push to keep only one commit per PR
git -C "${WORK_DIR}" push -qf origin "HEAD:refs/heads/${BRANCH}"

echo "✅ Comment images published to branch ${BRANCH}"
