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

// Part 2: Generate Title Map
const generateTitleMap = async (inputFiles: string[]) => {
  const result: Record<string, string> = {};
  const allIds: Set<string> = new Set();

  // 1. Collect all IDs from input files
  for (const filename of inputFiles) {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
      const ids: string[] = await fs.readJSON(filePath);
      ids.forEach((id) => allIds.add(id));
      console.log(`Loaded ${ids.length} IDs from ${filename}`);
    } else {
      console.warn(`Warning: ${filename} not found.`);
    }
  }

  // 2. Map IDs to Titles
  for (const idStr of allIds) {
    const id = Number.parseInt(idStr, 10);
    const pr = prDetailsMap.get(id);
    if (pr) {
      result[idStr] = pr.title.trim();
    } else {
      console.warn(`Warning: Details for PR #${id} not found.`);
    }
  }

  // 3. Write to file
  const outputPath = path.join(__dirname, 'pr-titles_v1.json');
  await fs.writeJSON(outputPath, result, { spaces: 2 });
  console.log(
    `Generated PR titles map at ${outputPath} with ${Object.keys(result).length} entries.`,
  );
};

const run = async () => {
  await loadPrDetails();
  await generateTitleMap(['pr-ids_v1.json']);
};

run();
