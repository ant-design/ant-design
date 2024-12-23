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
import { categories } from './fields';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

const allIcons: { [key: string]: any } = AntdIcons;

const useStyle = createStyles(({ token, css }) => ({
  iconSearchAffix: css`
    display: flex;
    transition: all ${token.motionDurationSlow};
    justify-content: space-between;
  `,
}));

interface IconSearchState {
  theme: ThemeType;
  searchKey: string;
}

const IconSearch: React.FC = () => {
  const intl = useIntl();
  const { styles } = useStyle();
  const [displayState, setDisplayState] = useState<IconSearchState>({
    searchKey: '',
    theme: ThemeType.Outlined,
  });
  const token = useTheme();

  const newIconNames: string[] = [];

  const handleSearchIcon = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayState((prevState) => ({ ...prevState, searchKey: e.target.value }));
  }, 300);

  const handleChangeTheme = useCallback((value: ThemeType) => {
    setDisplayState((prevState) => ({ ...prevState, theme: value as ThemeType }));
  }, []);

  const renderCategories = useMemo<React.ReactNode | React.ReactNode[]>(() => {
    const { searchKey = '', theme } = displayState;

    const categoriesResult = Object.keys(categories)
      .map((key) => {
        let iconList = categories[key as CategoriesKeys];
        if (searchKey) {
          const matchKey = searchKey

            .replace(/^<([a-z]*)\s\/>$/gi, (_, name) => name)
            .replace(/(Filled|Outlined|TwoTone)$/, '')
            .toLowerCase();
          iconList = iconList.filter((iconName) => iconName.toLowerCase().includes(matchKey));
        }

        const ignore = [
          'CopyrightCircle', // same as Copyright
          'DollarCircle', // same as Dollar
        ];
        iconList = iconList.filter((icon) => !ignore.includes(icon));

        return {
          category: key,
          icons: iconList
            .map((iconName) => iconName + theme)
            .filter((iconName) => allIcons[iconName]),
        };
      })
      .filter(({ icons }) => !!icons.length)
      .map(({ category, icons }) => (
        <Category
          key={category}
          title={category as CategoriesKeys}
          theme={theme}
          icons={icons}
          newIcons={newIconNames}
        />
      ));
    return categoriesResult.length ? categoriesResult : <Empty style={{ margin: '2em 0' }} />;
  }, [displayState.searchKey, displayState.theme]);

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
            placeholder={intl.formatMessage({ id: 'app.docs.components.icon.search.placeholder' })}
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
