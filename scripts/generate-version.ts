import fs from 'fs-extra';
import path from 'path';

(async () => {
  const { default: localPackage } = await import('../package.json');
  const { version } = localPackage;
  fs.writeFileSync(
    path.join(__dirname, '..', 'components', 'version', 'version.ts'),
    `export default '${version}';`,
    'utf8',
  );
})();
