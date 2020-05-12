import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { generateCSS } from './generateCSS';

// TODO (codeviking): Determine a better mechanism for loading and publishing
// images.
// eslint-disable-next-line import/prefer-default-export
export const svgs = [
  path.join(__dirname, '..', 'components', 'logos', 'logo-ai2-white-withText-micro.svg'),
];

/**
 * This is a bare-bones HTTP server for locally testing shellac.
 *
 * TODO (codeviking): Once shellac lands and is ready for use beyond the REVIZ
 * team we should have some sort of demo page with example HTML for the
 * components that are more complex.
 */
const server = http.createServer((_, res) => {
  const css = generateCSS();

  const htmlPath = path.join(__dirname, 'template.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // Inject the local styles over the externally referenced ones
  html = html.replace(
    `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@allenai/varnish/dist/shellac.min.css">`,
    `<style>\n${css}\n</style>`,
  );

  // Overwrite SVGs with local ones
  for (let i = 0; i < svgs.length; i++) {
    const svgPath = svgs[i];
    const svg = fs.readFileSync(svgPath, 'utf-8');
    const basename = path.basename(svgPath);
    html = html.replace(
      new RegExp(`<img src="https://cdn.jsdelivr.net/npm/@allenai/varnish/dist/${basename}"[^>]+>`),
      svg,
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

// Start the server if the script is passed the "start" command.
if (process.argv[process.argv.length - 1] === 'start') {
  server.listen(3001, () => {
    console.log('💅 listening at http://localhost:3001'); // eslint-disable-line no-console
  });
}
