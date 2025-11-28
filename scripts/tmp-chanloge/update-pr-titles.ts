import { Octokit } from '@octokit/rest';
import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';
import { confirm } from '@inquirer/prompts';

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
  const titlesPath = path.join(__dirname, 'refactored-pr-titles_v1_002.json');

  if (!fs.existsSync(titlesPath)) {
    console.error(`Error: ${titlesPath} not found.`);
    process.exit(1);
  }

  const titles: Record<string, string> = await fs.readJSON(titlesPath);
  const prIds = Object.keys(titles);
  console.log(`Loaded ${prIds.length} PR titles to update.`);

  for (const prId of prIds) {
    const newTitle = titles[prId];
    const prNumber = Number.parseInt(prId, 10);
    const prUrl = `https://github.com/${OWNER}/${REPO}/pull/${prId}`;

    console.log(`\n--------------------------------------------------`);
    console.log(`PR URL: ${prUrl}`);

    try {
      const { data } = await octokit.rest.pulls.get({
        owner: OWNER,
        repo: REPO,
        pull_number: prNumber,
      });
      console.log(`Current Title: ${data.title}`);
    } catch {
      console.log(`Current Title: (Failed to fetch)`);
    }

    console.log(`New Title    : ${newTitle}`);

    const shouldUpdate = await confirm({
      message: `Update PR #${prId} title?`,
      default: true,
    });

    if (shouldUpdate) {
      try {
        await octokit.rest.pulls.update({
          owner: OWNER,
          repo: REPO,
          pull_number: prNumber,
          title: newTitle,
        });
        console.log(`✅ Successfully updated PR #${prId}`);
      } catch (error: any) {
        console.error(`❌ Error updating PR #${prId}:`, error.message);
      }
    } else {
      console.log(`⏭️ Skipped PR #${prId}`);
    }
  }

  console.log('Done!');
};

run();
