import fs from 'fs-extra';
import path from 'path';
import fg from 'fast-glob';

// Global store for PR details
const prDetailsMap = new Map<number, any>();

// Part 1: Load all PR details
const loadPrDetails = async () => {
  const prDetailsDir = path.join(__dirname, 'pr-details');

  if (!fs.existsSync(prDetailsDir)) {
    console.error(`Error: ${prDetailsDir} not found.`);
    process.exit(1);
  }

  // Use fast-glob to find all json files
  const files = await fg(['*.json'], { cwd: prDetailsDir, absolute: true });
  console.log(`Found ${files.length} PR detail files.`);

  for (const file of files) {
    const data = await fs.readJSON(file);
    if (data && data.number) {
        prDetailsMap.set(data.number, data);
    }
  }
};

// Part 2: Generate Markdown
const generateMarkdown = async (prIdsFilename: string) => {
  const prIdsPath = path.join(__dirname, prIdsFilename);
  if (!fs.existsSync(prIdsPath)) {
      console.error(`Error: ${prIdsPath} not found.`);
      return;
  }

  const prIds: string[] = await fs.readJSON(prIdsPath);
  const prs = [];

  for (const idStr of prIds) {
      const id = Number.parseInt(idStr, 10);
      const pr = prDetailsMap.get(id);
      if (pr) {
          prs.push(pr);
      } else {
          console.warn(`Warning: Details for PR #${id} not found.`);
      }
  }

  // Sort by merged_at (earliest to latest)
  prs.sort((a, b) => {
      const dateA = new Date(a.merged_at).getTime();
      const dateB = new Date(b.merged_at).getTime();
      return dateA - dateB;
  });

  const MAX_TITLE_LENGTH = 800;

  // 作者白名单，如果作者在此列表中，生成的日志中将不会包含 @作者 信息
  const authorWhitelist: string[] = [
    'meet-student',
    'thinkasany',
  ];

  const formatLine = (pr: any) => {
    let title = pr.title.trim();
    if (title.length > MAX_TITLE_LENGTH) {
      title = `${title.substring(0, MAX_TITLE_LENGTH)  }...`;
    }

    const prLink = `[#${pr.number}](${pr.html_url})`;
    const userLink = pr.user && !authorWhitelist.includes(pr.user.login) ? `[@${pr.user.login}](${pr.user.html_url})` : '';

    return `- ${title} ${prLink} ${userLink}`;
  };

  const lines = prs.map(formatLine);

  const content = `
<details>
<summary>Semantic Structure Changes</summary>

${lines.join('\n')}

</details>
`;

  const outputPath = path.join(__dirname, 'generated-changelog_v1.md');
  await fs.writeFile(outputPath, content, 'utf8');
  console.log(`Generated changelog at ${outputPath}`);
};

const run = async () => {
    await loadPrDetails();
    await generateMarkdown('pr-ids_v1.json');
};

run();
