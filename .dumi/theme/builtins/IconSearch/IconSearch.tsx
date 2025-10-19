import type { CSSProperties } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import { Affix, Empty, Input, Segmented } from 'antd';
import { createStyles, useTheme } from 'antd-style';
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
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

const allIcons: { [key: string]: any } = AntdIcons;

const useStyle = createStyles(({ css, cssVar }) => ({
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

const NEW_ICON_NAMES: ReadonlyArray<string> = [];

const IconSearch: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyle();
  const [displayState, setDisplayState] = useState<IconSearchState>({
    searchKey: '',
    theme: ThemeType.Outlined,
  });
  const token = useTheme();

  const handleSearchIcon = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayState((prevState) => ({ ...prevState, searchKey: e.target.value }));
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
    const matchedCategories = Object.values(merged)
      .map((item) => {
        item.icons = item.icons
          .map((iconName) => iconName + theme)
          .filter((iconName) => allIcons[iconName]);

        return item;
      })
      .filter(({ icons }) => !!icons.length);

    const categoriesResult = matchedCategories.map(({ category, icons }) => (
      <Category
        key={category}
        title={category as CategoriesKeys}
        theme={theme}
        icons={icons}
        newIcons={NEW_ICON_NAMES}
      />
    ));
    return categoriesResult.length ? categoriesResult : <Empty style={{ margin: '2em 0' }} />;
  }, [displayState]);

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
