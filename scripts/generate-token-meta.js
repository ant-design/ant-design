const TypeDoc = require('typedoc');
const fs = require('fs-extra');

function main() {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    // typedoc options here
    entryPoints: ['components/theme/interface.ts'],
  });

  const project = app.convert();

  if (project) {
    // Project may not have converted correctly
    const output = 'components/version/token-meta-test.json';
    const tokenMeta = {};
    project.children.forEach((type) => {
      if (type.name === 'SeedToken') {
        tokenMeta.seedToken = type.children.map((item) => ({
          source: 'seed',
          desc: item.comment?.blockTags?.find((tag) => tag.tag === '@desc')?.text || '',
          descEn: item.comment?.blockTags?.find((tag) => tag.tag === '@descEn')?.text || '',
        }));
      }
    });

    fs.writeJsonSync(output, tokenMeta, 'utf8');
    consoloe.log(`✅ Token Meta has been written to ${output}`);
  }
}

// eslint-disable-next-line no-console
main();
