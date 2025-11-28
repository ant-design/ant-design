import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN is not set in environment variables.');
  process.exit(1);
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

const OWNER = 'ant-design';
const REPO = 'ant-design';

const run = async () => {
  const prIdsPath = path.join(__dirname, 'pr-ids_v1.json');

  if (!fs.existsSync(prIdsPath)) {
    console.error(`Error: ${prIdsPath} not found. Please run extract-pr.ts first.`);
    process.exit(1);
  }

  const prIds: string[] = await fs.readJSON(prIdsPath);
  console.log(`Loaded ${prIds.length} PR IDs.`);

  const outputDir = path.join(__dirname, 'pr-details');
  await fs.ensureDir(outputDir);

  for (const prId of prIds) {
    const prNumber = Number.parseInt(prId, 10);
    const outputPath = path.join(outputDir, `${prId}.json`);

    if (fs.existsSync(outputPath)) {
      // fs.unlinkSync(outputPath);
      console.log(`Skipping #${prId} (already exists)`);
      continue;
    }

    try {
      console.log(`Fetching details for PR #${prId}...`);
      const { data } = await octokit.rest.pulls.get({
        owner: OWNER,
        repo: REPO,
        pull_number: prNumber,
      });

      const importantInfo = {
        id: data.id,
        number: data.number,
        title: data.title,
        user: {
          login: data.user?.login,
          id: data.user?.id,
          avatar_url: data.user?.avatar_url,
          html_url: data.user?.html_url,
        },
        body: data.body,
        state: data.state,
        merged: data.merged,
        merged_at: data.merged_at,
        created_at: data.created_at,
        updated_at: data.updated_at,
        closed_at: data.closed_at,
        html_url: data.html_url,
        labels: data.labels.map((label) => ({
          name: label.name,
          color: label.color,
          description: label.description,
        })),
        base: {
          ref: data.base.ref,
          sha: data.base.sha,
        },
        head: {
          ref: data.head.ref,
          sha: data.head.sha,
          label: data.head.label,
        },
        requested_reviewers: data.requested_reviewers?.map((reviewer) => reviewer.login),
        assignees: data.assignees?.map((assignee) => assignee.login),
      };

      await fs.writeJSON(outputPath, importantInfo, { spaces: 2 });
      console.log(`Saved details for #${prId}`);

      // Avoid hitting rate limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error: any) {
      console.error(`Error fetching PR #${prId}:`, error.message);
    }
  }

  console.log('Done!');
};

run();
