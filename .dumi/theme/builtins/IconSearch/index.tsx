import * as React from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import { Segmented, Input, Empty, Affix } from 'antd';
import { useIntl } from 'dumi';
import debounce from 'lodash/debounce';
import Category from './Category';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import type { CategoriesKeys } from './fields';
import { categories } from './fields';
import useSiteToken from '../../../hooks/useSiteToken';

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

const allIcons: { [key: string]: any } = AntdIcons;

interface IconSearchState {
  theme: ThemeType;
  searchKey: string;
}

const IconSearch: React.FC = () => {
  const intl = useIntl();
  const [displayState, setDisplayState] = React.useState<IconSearchState>({
    theme: ThemeType.Outlined,
    searchKey: '',
  });

  const newIconNames: string[] = [];

  const handleSearchIcon = React.useCallback(
    debounce((searchKey: string) => {
      setDisplayState((prevState) => ({ ...prevState, searchKey }));
    }),
    [],
  );

  const handleChangeTheme = React.useCallback((value) => {
    setDisplayState((prevState) => ({ ...prevState, theme: value as ThemeType }));
  }, []);

  const renderCategories = React.useMemo<React.ReactNode | React.ReactNode[]>(() => {
    const { searchKey = '', theme } = displayState;

    const categoriesResult = Object.keys(categories)
      .map((key) => {
        let iconList = categories[key as CategoriesKeys];
        if (searchKey) {
          const matchKey = searchKey
            // eslint-disable-next-line prefer-regex-literals
            .replace(new RegExp(`^<([a-zA-Z]*)\\s/>$`, 'gi'), (_, name) => name)
            .replace(/(Filled|Outlined|TwoTone)$/, '')
            .toLowerCase();
          iconList = iconList.filter((iconName) => iconName.toLowerCase().includes(matchKey));
        }

        // CopyrightCircle is same as Copyright, don't show it
        iconList = iconList.filter((icon) => icon !== 'CopyrightCircle');

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
    return categoriesResult.length === 0 ? <Empty style={{ margin: '2em 0' }} /> : categoriesResult;
  }, [displayState.searchKey, displayState.theme]);

  const [searchBarAffixed, setSearchBarAffixed] = React.useState(false);
  const { token } = useSiteToken();
  const { borderRadius, colorBgContainer } = token;
  const affixedStyle = searchBarAffixed
    ? {
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        padding: 8,
        margin: -8,
        borderRadius,
        background: colorBgContainer,
      }
    : {};

  return (
    <div className="markdown">
      <Affix offsetTop={24} onChange={(affixed) => setSearchBarAffixed(affixed)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            transition: 'all .3s',
            ...affixedStyle,
          }}
        >
          <Segmented
            value={displayState.theme}
            onChange={handleChangeTheme}
            size="large"
            options={[
              {
                icon: <Icon component={OutlinedIcon} />,
                label: intl.formatMessage({ id: 'app.docs.components.icon.outlined' }),
                value: ThemeType.Outlined,
              },
              {
                icon: <Icon component={FilledIcon} />,
                label: intl.formatMessage({ id: 'app.docs.components.icon.filled' }),
                value: ThemeType.Filled,
              },
              {
                icon: <Icon component={TwoToneIcon} />,
                label: intl.formatMessage({ id: 'app.docs.components.icon.two-tone' }),
                value: ThemeType.TwoTone,
              },
            ]}
          />
          <Input.Search
            placeholder={intl.formatMessage({ id: 'app.docs.components.icon.search.placeholder' })}
            style={{ flex: 1, marginInlineStart: 16 }}
            allowClear
            onChange={(e) => handleSearchIcon(e.currentTarget.value)}
            size="large"
            autoFocus
          />
        </div>
      </Affix>
      {renderCategories}
    </div>
  );
};

export default IconSearch;
