import rehypeFigure from '@microflash/rehype-figure';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';

export default function markdown2Html(content: string) {
  return remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
}
