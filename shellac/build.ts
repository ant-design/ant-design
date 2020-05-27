/**
 * This helper function packages up the things required for shellac and
 * sticks them in the provided directory.
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateCSS } from './generateCSS';
import { generateLESS } from './generateLESS';

const distPath = path.join(__dirname, '..', 'dist_varnish');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const lessPath = path.join(distPath, 'varnish.less');
fs.writeFileSync(lessPath, generateLESS(), 'utf-8');
console.log(`✨ wrote ${path.relative(process.cwd(), lessPath)}`); // eslint-disable-line no-console

const cssPath = path.join(distPath, 'shellac.css');
fs.writeFileSync(cssPath, generateCSS(), 'utf-8');
console.log(`✨ wrote ${path.relative(process.cwd(), cssPath)}`); // eslint-disable-line no-console

// The template is wrapped in a single markdown code block to that `bisheng` will provide it
// for the Shellac demo page. Here we read that out, remove the Markdown bits and write it
// out as an HTML file that user's can use as a template to get started from.
const markdownPath = path.join(__dirname, 'template.md');
const markdownContents = fs.readFileSync(markdownPath, 'utf-8');

// Ditch the markdown bits.
let html = markdownContents.replace(/^```\n/, '').replace(/```\n$/, '');

// Inject a link to the CSS. The lack of a version specifier here means it always serves the
// latest.For more on the CDN we use, see https://www.jsdelivr.com/.
const cdnBaseUrl = 'https://cdn.jsdelivr.net/npm/@allenai/varnish';
html = html.replace('{css}', `<link rel="stylesheet" href="${cdnBaseUrl}/dist/shellac.min.css">`);

// Put the AI2 logo that the template uses into the archives we output.
const logoPath = path.join(
  __dirname,
  '..',
  'components',
  'logos',
  'logo-ai2-white-withText-micro.svg',
);
const logoFileName = path.basename(logoPath);
const logoOutputPath = path.join(distPath, logoFileName);
fs.writeFileSync(logoOutputPath, fs.readFileSync(logoPath, 'utf-8'), 'utf-8');
console.log(`🌅 wrote ${path.relative(process.cwd(), logoOutputPath)}`); // eslint-disable-line no-console

// Now inject the right URL to that logo into the template.
html = html.replace('{logo}', `${cdnBaseUrl}/dist/${logoFileName}`);

const htmlOutputPath = path.join(distPath, 'shellac.html');
fs.writeFileSync(htmlOutputPath, html, 'utf-8');
console.log(`🕸  wrote ${path.relative(process.cwd(), htmlOutputPath)}`); // eslint-disable-line no-console
