const TypeDoc = require('typedoc');
const fs = require('fs-extra');

const getTokenList = (list, source) =>
  list
    .filter((item) => !item.comment?.blockTags.some((tag) => tag.tag === '@internal'))
    .map((item) => ({
      source,
      name: item.name,
      type: item.type.toString(),
      desc: item.comment?.blockTags?.find((tag) => tag.tag === '@desc')?.content[0]?.text || '-',
      descEn:
        item.comment?.blockTags?.find((tag) => tag.tag === '@descEn')?.content[0]?.text || '-',
    }));

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
    const output = 'components/version/token-meta.json';
    const tokenMeta = {};
    let presetColors = [];
    project.children.forEach((type) => {
      if (type.name === 'SeedToken') {
        tokenMeta.seed = getTokenList(type.children, 'seed');
      } else if (type.name === 'MapToken') {
        tokenMeta.map = getTokenList(type.children, 'map');
      } else if (type.name === 'AliasToken') {
        tokenMeta.alias = getTokenList(type.children, 'alias');
      } else if (type.name === 'PresetColors') {
        presetColors = type.type.target.elements.map((item) => item.value);
      }
    });

    // Exclude preset colors
    tokenMeta.seed = tokenMeta.seed.filter(
      (item) => !presetColors.some((color) => item.name.startsWith(color)),
    );
    tokenMeta.map = tokenMeta.map.filter(
      (item) => !presetColors.some((color) => item.name.startsWith(color)),
    );
    tokenMeta.alias = tokenMeta.alias.filter(
      (item) => !presetColors.some((color) => item.name.startsWith(color)),
    );

    tokenMeta.alias = tokenMeta.alias.filter(
      (item) => !tokenMeta.map.some((mapItem) => mapItem.name === item.name),
    );
    tokenMeta.map = tokenMeta.map.filter(
      (item) => !tokenMeta.seed.some((seedItem) => seedItem.name === item.name),
    );

    fs.writeJsonSync(output, tokenMeta, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`✅  Token Meta has been written to ${output}`);
  }
}

main();
