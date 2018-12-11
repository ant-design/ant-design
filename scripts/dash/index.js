const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const { execSync } = require('child_process');
const glob = require('glob');
const debug = require('debug')('antd-dash');

const sitePath = path.join(process.cwd(), '_site');
const docsetPath = path.join(process.cwd(), 'Ant_Design.docset');
const contentsPath = path.join(docsetPath, 'Contents');
const resoucesPath = path.join(contentsPath, 'Resources');
const documentsPath = path.join(resoucesPath, 'Documents');
const dbPath = path.join(resoucesPath, 'docSet.dsidx');
const plistPath = path.join(contentsPath, 'Info.plist');

/****************************** help methods **********************************/
function query(sql) {
  execSync(`echo "${sql}" | sqlite3 ${dbPath}`);
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function classify(string) {
  return string
    .split('-')
    .map(capitalize)
    .join('');
}

/******************************************************************************/

function clean() {
  debug(`Clean ${docsetPath}.`);
  execSync(`rm -rf ${docsetPath}`);
}

function createFolder() {
  debug(`Create ${docsetPath}.`);
  execSync(`mkdir -p ${resoucesPath}`);
  execSync(`cp ./icon.png ${docsetPath}`);
  execSync(`cp ./icon@2x.png ${docsetPath}`);
}

function buildSite() {
  debug('Build site.');
  // execSync('wget -m https://ant.design');
}

function copyHTML() {
  debug('Copy html files.');
  execSync(`cp -r ${sitePath} ${documentsPath}`);
}

function fixStaticPath() {
  debug('Fix static path.');
  execSync(
    `perl -pi -e 's#components/:children/#components/:children/index.html#' ${documentsPath}/index.js`,
  );
  execSync(`perl -pi -e 's#"path":"changelog"#"path":"changelog.html"#' ${documentsPath}/index.js`);
  glob.sync(`${documentsPath}/**/*.html`).forEach(file => {
    const relativePath = file.replace(documentsPath, '');
    const deep = (relativePath.match(/\//g) || []).length;
    const path =
      deep === 1
        ? './'
        : `./${Array(deep - 1)
            .fill('..')
            .join('/')}`;
    debug('path', path);
    const content = fs
      .readFileSync(file)
      .toString()
      .replace(/href="\/(.+).css"/g, `href="${path}/$1.css"`)
      .replace(/src="\/(.+).js"/g, `src="${path}/$1.js"`)
      .replace(/src="\/(.+)es6-shim.min.js"/g, `src="${path}/$1.js"`)
      .replace(
        'https://gw.alipayobjects.com/os/lib/??es6-shim/0.35.3/es6-sham.min.js,es6-shim/0.35.3/es6-shim.min.js',
        `${path}/es6.js`,
      )
      .replace(
        /<html>/,
        `<html><!-- Online page at https://ant.design${relativePath
          .replace('index.html', '')
          .replace('.html', '')} -->`,
      );
    fs.writeFileSync(file, content);
  });
}

function createDb() {
  debug('Create db.');
  query('CREATE TABLE searchIndex(id INTEGER PRIMARY KEY, name TEXT, type TEXT, path TEXT);');
  query('CREATE UNIQUE INDEX anchor ON searchIndex (name, type, path);');
}

function createPlist() {
  debug('Create plist.');
  execSync(`
    cat << EOF > ${plistPath}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>antd</string>
  <key>CFBundleName</key>
  <string>Ant Design</string>
  <key>DocSetPlatformFamily</key>
  <string>antd</string>
  <key>DashDocSetFamily</key>
  <string>dashtoc</string>
  <key>isDashDocset</key>
  <true/>
  <key>isJavaScriptEnabled</key>
  <true/>
</dict>
</plist>
EOF
  `);
}

function generateRecords() {
  debug(`Generate records.`);
  let $query;
  // Components
  const component = fs
    .readFileSync(path.join(documentsPath, 'docs', 'react', 'introduce.html'))
    .toString();
  $query = cheerio.load(component);
  $query('.aside-container .ant-menu-submenu .ant-menu-item').each((i, item) => {
    const name = $query(item).text();
    const path =
      $query(item)
        .find('a')
        .attr('href')
        .replace(/^\//, '') + 'index.html';
    query(
      `INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES ('${name}', 'Component', '${path}');`,
    );
  });

  $query('.aside-container > .ant-menu-item').each((i, item) => {
    const name = $query(item).text();
    const path =
      $query(item)
        .find('a')
        .attr('href')
        .replace(/^\//, '') + '.html';
    query(
      `INSERT OR IGNORE INTO searchIndex(name, type, path) VALUES ('${name}', 'Guide', '${path}');`,
    );
  });
}

function main() {
  buildSite();
  clean();
  createFolder();
  copyHTML();
  createPlist();
  createDb();
  generateRecords();
  fixStaticPath();
}

main();
