import fs from 'fs-extra';
import type { DeclarationReflection } from 'typedoc';
import { Application, TSConfigReader, TypeDocReader } from 'typedoc';

interface TokenMeta {
  seed: ReturnType<typeof getTokenList>;
  map: ReturnType<typeof getTokenList>;
  alias: ReturnType<typeof getTokenList>;
  components: Record<string, ReturnType<typeof getTokenList>>;
}

function getTokenList(list?: DeclarationReflection[], source?: string) {
  return (list || [])
    .filter(
      (item) =>
        !item.comment?.blockTags.some(
          (tag) => tag.tag === '@internal' || tag.tag === '@private' || tag.tag === '@deprecated',
        ),
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

const main = async () => {
  const app = await (Application as any).bootstrap(
    {
      // typedoc options here
      entryPoints: ['components/theme/interface/index.ts', 'components/*/style/index.{ts,tsx}'],
      skipErrorChecking: true,
    },
    [new TSConfigReader(), new TypeDocReader()],
  );

  const project = await app.convert();

  if (project) {
    // Project may not have converted correctly
    const output = 'components/version/token-meta.json';
    const tokenMeta: TokenMeta = {
      seed: [],
      map: [],
      alias: [],
      components: {},
    };

    // eslint-disable-next-line no-restricted-syntax
    project?.children?.forEach((file: any) => {
      // Global Token
      if (file.name === 'theme/interface') {
        let presetColors: string[] = [];
        file.children?.forEach((type: any) => {
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
      } else {
        const component = file.name
          .slice(0, file.name.indexOf('/'))
          .replace(/(^(.)|-(.))/g, (match: string) => match.replace('-', '').toUpperCase());
        const componentToken = file.children?.find((item: any) => item?.name === 'ComponentToken');
        if (componentToken) {
          tokenMeta.components[component] = getTokenList(componentToken.children, component);
        }
      }
    });

    const finalMeta = Object.entries(tokenMeta).reduce((acc, [key, value]) => {
      if (key !== 'components') {
        (value as any[]).forEach((item) => {
          acc.global = acc.global || {};
          acc.global[item.token] = {
            name: item.name,
            nameEn: item.nameEn,
            desc: item.desc,
            descEn: item.descEn,
            type: item.type,
            source: key,
          };
        });
      } else {
        acc.components = value;
      }
      return acc;
    }, {} as any);

    fs.writeJsonSync(output, finalMeta, 'utf8');
    // eslint-disable-next-line no-console
    console.log(`✅  Token Meta has been written to ${output}`);
  }
};

main();
