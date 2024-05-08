/* eslint-disable compat/compat */
/* eslint-disable no-console, no-await-in-loop, import/no-extraneous-dependencies, no-restricted-syntax */
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeFigure from '@microflash/rehype-figure';

export default function markdown2Html(content: string) {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
}
