import fs from 'fs-extra';
import path from 'path';

const input = `
在这里粘贴包含 PR 链接或编号的文本。例如：
[#12345](http://github.com/ant-design/ant-design/pull/12345)
`;

const regex = /https:\/\/github\.com\/ant-design\/ant-design\/pull\/(\d+)/g;
// 或者如果只是 #12345 这种格式
// const regex = /#(\d+)/g;

const run = async () => {
  const matches = [...input.matchAll(regex)];
  const prIds = matches.map(match => match[1]);

  // 去重
  const uniquePrIds = [...new Set(prIds)];

  // 排序 (可选)
  uniquePrIds.sort((a, b) => Number(b) - Number(a));

  console.log(`Found ${uniquePrIds.length} unique PR IDs.`);

  const outputPath = path.join(__dirname, 'pr-ids.json');
  await fs.writeJSON(outputPath, uniquePrIds, { spaces: 2 });
  console.log(`Wrote to ${outputPath}`);
};

run();
