import type { CSSProperties } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import { Affix, Empty, Input, Segmented } from 'antd';
import { createStaticStyles, useTheme } from 'antd-style';
import type { SegmentedOptions } from 'antd/es/segmented';
import { useIntl } from 'dumi';
import debounce from 'lodash/debounce';

import Category from './Category';
import type { CategoriesKeys } from './fields';
import { all, categories } from './fields';
import metaInfo from './meta';
import type { IconName, IconsMeta } from './meta';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';

export enum ThemeType {
  All = 'All',
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

type ConcreteThemeType = Exclude<ThemeType, ThemeType.All>;

// Theme order used by the "All" view to group icons by the same variant.
const THEME_ORDER: ReadonlyArray<ConcreteThemeType> = [
  ThemeType.Outlined,
  ThemeType.Filled,
  ThemeType.TwoTone,
];

const THEME_LABEL_IDS: Record<ConcreteThemeType, string> = {
  [ThemeType.Outlined]: 'app.docs.components.icon.outlined',
  [ThemeType.Filled]: 'app.docs.components.icon.filled',
  [ThemeType.TwoTone]: 'app.docs.components.icon.two-tone',
};

const allIcons: { [key: string]: any } = AntdIcons;

const styles = createStaticStyles(({ css, cssVar }) => ({
  iconSearchAffix: css`
    display: flex;
    transition: all ${cssVar.motionDurationSlow};
    justify-content: space-between;
  `,
}));

interface IconSearchState {
  theme: ThemeType;
  searchKey: string;
}

const NEW_ICON_VERSION = '6.5.0';

const NEW_ICON_NAMES: ReadonlyArray<string> = [
  'AnthropicFilled',
  'ClaudeFilled',
  'GeminiFilled',
  'MistralFilled',
  'DeepSeekFilled',
  'QwenFilled',
  'PerplexityFilled',
  'HuggingFaceFilled',
  'OllamaFilled',
  'ReplicateFilled',
  'ElevenLabsFilled',
  'TelegramFilled',
  'MastodonFilled',
  'ThreadsFilled',
  'SnapchatFilled',
];

const NEW_ICON_ORDER = new Map(NEW_ICON_NAMES.map((name, index) => [name, index]));

const IconSearch: React.FC = () => {
  const intl = useIntl();
  const [displayState, setDisplayState] = useState<IconSearchState>({
    searchKey: '',
    theme: ThemeType.All,
  });
  const token = useTheme();

  const handleSearchIcon = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayState((prevState) => ({ ...prevState, searchKey: e.target.value }));

    document.getElementById('list-of-icons')?.scrollIntoView({ behavior: 'smooth' });
  }, 300);

  const handleChangeTheme = useCallback((value: ThemeType) => {
    setDisplayState((prevState) => ({ ...prevState, theme: value as ThemeType }));
  }, []);

  const renderCategories = useMemo<React.ReactNode | React.ReactNode[]>(() => {
    const { searchKey = '', theme } = displayState;
    // loop over metaInfo to find all the icons which has searchKey in their tags
    let normalizedSearchKey = searchKey?.trim();

    if (normalizedSearchKey) {
      normalizedSearchKey = normalizedSearchKey
        .replace(/^<([a-z]*)\s\/>$/gi, (_, name) => name)
        .replace(/(Filled|Outlined|TwoTone)$/, '')
        .toLowerCase();
    }

    const tagMatchedCategoryObj = matchCategoriesFromTag(normalizedSearchKey, metaInfo);

    const namedMatchedCategoryObj = Object.keys(categories).reduce<Record<string, MatchedCategory>>(
      (acc, key) => {
        let iconList = categories[key as CategoriesKeys];
        if (normalizedSearchKey) {
          const matchKey = normalizedSearchKey;
          iconList = iconList.filter((iconName) => iconName.toLowerCase().includes(matchKey));
        }

        const ignore = [
          'CopyrightCircle', // same as Copyright
          'DollarCircle', // same as Dollar
        ];
        iconList = iconList.filter((icon) => !ignore.includes(icon));

        acc[key] = {
          category: key,
          icons: iconList,
        };

        return acc;
      },
      {},
    );

    // merge matched categories from tag search
    const merged = mergeCategory(namedMatchedCategoryObj, tagMatchedCategoryObj);
    const resolveMatchedCategories = (targetTheme: ThemeType) =>
      Object.values(merged)
        .map(({ category, icons: baseIconNames }) => {
          const icons = resolveIconNames(baseIconNames, targetTheme);

          return {
            category,
            icons: category === 'logo' ? groupNewIcons(icons) : icons,
          };
        })
        .filter(({ icons }) => !!icons.length);

    const renderCategoryList = (
      matchedCategories: MatchedCategory[],
      targetTheme: ThemeType,
      keyPrefix?: string,
    ) =>
      matchedCategories.map(({ category, icons }) => (
        <Category
          key={keyPrefix ? `${keyPrefix}-${category}` : category}
          title={category as CategoriesKeys}
          theme={targetTheme}
          icons={icons}
          newIcons={NEW_ICON_NAMES}
          newIconVersion={NEW_ICON_VERSION}
        />
      ));

    if (theme === ThemeType.All) {
      const themeGroups = THEME_ORDER.map((targetTheme) => {
        const matchedCategories = resolveMatchedCategories(targetTheme);

        if (!matchedCategories.length) {
          return null;
        }

        return (
          <React.Fragment key={targetTheme}>
            <h2>{intl.formatMessage({ id: THEME_LABEL_IDS[targetTheme] })}</h2>
            {renderCategoryList(matchedCategories, targetTheme, targetTheme)}
          </React.Fragment>
        );
      });

      return themeGroups.some(Boolean) ? themeGroups : <Empty style={{ margin: '2em 0' }} />;
    }

    const matchedCategories = resolveMatchedCategories(theme);
    const categoriesResult = renderCategoryList(matchedCategories, theme);
    return categoriesResult.length ? categoriesResult : <Empty style={{ margin: '2em 0' }} />;
  }, [displayState, intl]);

  const [searchBarAffixed, setSearchBarAffixed] = useState<boolean | undefined>(false);

  const { borderRadius, colorBgContainer, anchorTop } = token;

  const affixedStyle: CSSProperties = {
    boxShadow: 'rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0 3px 7px -3px',
    padding: 8,
    margin: -8,
    borderRadius,
    backgroundColor: colorBgContainer,
  };

  const memoizedOptions = React.useMemo<SegmentedOptions<ThemeType>>(
    () => [
      {
        value: ThemeType.All,
        icon: <AntdIcons.AppstoreOutlined />,
        label: intl.formatMessage({ id: 'app.docs.components.icon.all' }),
      },
      {
        value: ThemeType.Outlined,
        icon: <Icon component={OutlinedIcon} />,
        label: intl.formatMessage({ id: 'app.docs.components.icon.outlined' }),
      },
      {
        value: ThemeType.Filled,
        icon: <Icon component={FilledIcon} />,
        label: intl.formatMessage({ id: 'app.docs.components.icon.filled' }),
      },
      {
        value: ThemeType.TwoTone,
        icon: <Icon component={TwoToneIcon} />,
        label: intl.formatMessage({ id: 'app.docs.components.icon.two-tone' }),
      },
    ],
    [intl],
  );

  return (
    <div className="markdown">
      <Affix offsetTop={anchorTop} onChange={setSearchBarAffixed}>
        <div className={styles.iconSearchAffix} style={searchBarAffixed ? affixedStyle : {}}>
          <Segmented<ThemeType>
            size="large"
            value={displayState.theme}
            options={memoizedOptions}
            onChange={handleChangeTheme}
          />
          <Input.Search
            placeholder={intl.formatMessage(
              { id: 'app.docs.components.icon.search.placeholder' },
              { total: all.length },
            )}
            style={{ flex: 1, marginInlineStart: 16 }}
            allowClear
            autoFocus
            size="large"
            variant="filled"
            onChange={handleSearchIcon}
          />
        </div>
      </Affix>
      {renderCategories}
    </div>
  );
};

export default IconSearch;

type MatchedCategory = {
  category: string;
  icons: string[];
};

// Map base icon names to the concrete component names to render for a theme.
// "All" groups every existing variant by theme; a specific theme resolves to
// that variant only when it exists.
function resolveIconNames(baseNames: string[], theme: ThemeType): string[] {
  if (theme === ThemeType.All) {
    return THEME_ORDER.flatMap((item) =>
      baseNames.map((baseName) => baseName + item).filter((iconName) => allIcons[iconName]),
    );
  }
  return baseNames.map((baseName) => baseName + theme).filter((iconName) => allIcons[iconName]);
}

function groupNewIcons(icons: string[]) {
  const firstNewIconIndex = icons.findIndex((iconName) => NEW_ICON_ORDER.has(iconName));

  if (firstNewIconIndex === -1) {
    return icons;
  }

  const newIcons = icons
    .filter((iconName) => NEW_ICON_ORDER.has(iconName))
    .sort((a, b) => NEW_ICON_ORDER.get(a)! - NEW_ICON_ORDER.get(b)!);
  const restIcons = icons.filter((iconName) => !NEW_ICON_ORDER.has(iconName));

  return [
    ...restIcons.slice(0, firstNewIconIndex),
    ...newIcons,
    ...restIcons.slice(firstNewIconIndex),
  ];
}

function matchCategoriesFromTag(searchKey: string, metaInfo: IconsMeta) {
  if (!searchKey) {
    return {};
  }

  return Object.keys(metaInfo).reduce<Record<string, MatchedCategory>>((acc, key) => {
    const icon = metaInfo[key as IconName];
    const category = icon.category;

    if (icon.tags.some((tag) => tag.toLowerCase().includes(searchKey))) {
      if (acc[category]) {
        // if category exists, push icon to icons array
        acc[category].icons.push(key);
      } else {
        // if category does not exist, create a new entry
        acc[category] = { category, icons: [key] };
      }
    }

    return acc;
  }, {});
}

function mergeCategory(
  categoryA: Record<string, MatchedCategory>,
  categoryB: Record<string, MatchedCategory>,
) {
  const merged: Record<string, MatchedCategory> = { ...categoryA };

  Object.keys(categoryB).forEach((key) => {
    if (merged[key]) {
      // merge icons array and remove duplicates
      merged[key].icons = Array.from(new Set([...merged[key].icons, ...categoryB[key].icons]));
    } else {
      merged[key] = categoryB[key];
    }
  });

  return merged;
}
