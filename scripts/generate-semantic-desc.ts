// import path from 'path';
// import fs from 'fs-extra';
import { glob } from 'glob';

async function generateSemanticDesc() {
  // const cwd = process.cwd();
  const docsDir = ['components', 'docs'];

  const docs = await glob(`{${docsDir.join(',')}}/**/demo/_semantic*.tsx`);

  // Read `docs` file and generate semantic description.e.g.
  // components/float-button/demo/_semantic_group.tsx is to:
  // - root: 根元素
  // - list: 列表元素
  // - item: 列表项元素
  //   - root: 列表项根元素
  //   - icon: 列表项图标元素
  //   - content: 列表项内容元素
  // - trigger:
  //   - root: 触发元素
  //   - icon: 触发图标元素
  //   - content: 触发内容元素

  // TODO: realize this and remove console
  console.log(docs);
}
(async () => {
  if (require.main === module) {
    await generateSemanticDesc();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
