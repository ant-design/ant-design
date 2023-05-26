import fs from 'fs-extra';
import type { DeclarationReflection } from 'typedoc';
import { Application, TSConfigReader, TypeDocReader } from 'typedoc';

function getTokenList(list?: DeclarationReflection[], source?: string) {
  return (list || [])
    .filter(
      (item) =>
        !item.comment?.blockTags.some((tag) => tag.tag === '@internal' || tag.tag === '@private'),
    )
    .map((item) => ({
      source,
      token: item.name,
      type: item?.type?.toString(),
      desc:
        item.comment?.blockTags
          ?.find((tag) => tag.tag === '@desc')
          ?.content.reduce((result, str) => result.concat(str.text), '') || '',
      descEn:
        item.comment?.blockTags
          ?.find((tag) => tag.tag === '@descEN')
          ?.content.reduce((result, str) => result.concat(str.text), '') || '',
      name:
        item.comment?.blockTags
          ?.find((tag) => tag.tag === '@nameZH')
          ?.content.reduce((result, str) => result.concat(str.text), '') || '',
      nameEn:
        item.comment?.blockTags
          ?.find((tag) => tag.tag === '@nameEN')
          ?.content.reduce((result, str) => result.concat(str.text), '') || '',
    }));
}

const main = () => {
  const app = new Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TSConfigReader());
  app.options.addReader(new TypeDocReader());

  app.bootstrap({
    // typedoc options here
    entryPoints: ['components/theme/interface/index.ts'],
  });

  const project = app.convert();

  if (project) {
    // Project may not have converted correctly
    const output = 'components/version/token-meta.json';
    const tokenMeta: Record<PropertyKey, ReturnType<typeof getTokenList>> = {};
    let presetColors: string[] = [];
    project.children?.forEach((type) => {
      if (type.name === 'SeedToken') {
        tokenMeta.seed = getTokenList(type.children, 'seed');
      } else if (type.name === 'MapToken') {
        tokenMeta.map = getTokenList(type.children, 'map');
      } else if (type.name === 'AliasToken') {
        tokenMeta.alias = getTokenList(type.children, 'alias');
      } else if (type.name === 'PresetColors') {
        presetColors = (type?.type as any)?.target?.elements?.map((item: any) => item.value);
      }
    });

    // Exclude preset colors
    tokenMeta.seed = tokenMeta.seed.filter(
      (item) => !presetColors.some((color) => item.token.startsWith(color)),
    );
    tokenMeta.map = tokenMeta.map.filter(
      (item) => !presetColors.some((color) => item.token.startsWith(color)),
    );
    tokenMeta.alias = tokenMeta.alias.filter(
      (item) => !presetColors.some((color) => item.token.startsWith(color)),
    );

    tokenMeta.alias = tokenMeta.alias.filter(
      (item) => !tokenMeta.map.some((mapItem) => mapItem.token === item.token),
    );
    tokenMeta.map = tokenMeta.map.filter(
      (item) => !tokenMeta.seed.some((seedItem) => seedItem.token === item.token),
    );

    const finalMeta = Object.entries(tokenMeta).reduce((acc, [key, value]) => {
      value.forEach((item) => {
        acc[item.token] = {
          name: item.name,
          nameEn: item.nameEn,
          desc: item.desc,
          descEn: item.descEn,
          type: item.type,
          source: key,
        };
      });
      return acc;
    }, {} as any);

    fs.writeJsonSync(output, finalMeta, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`✅  Token Meta has been written to ${output}`);
  }
};

main();
