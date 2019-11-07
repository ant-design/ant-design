import * as React from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import { Radio, Input } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { injectIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import Category from './Category';
import IconPicSearcher from './IconPicSearcher';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import { categories, Categories, CategoriesKeys } from './fields';

type ThemeType = 'filled' | 'outlined' | 'twoTone';

const allIcons: {
  [key: string]: any;
} = AntdIcons;

interface IconDisplayProps {
  intl: any;
}

interface IconDisplayState {
  theme: ThemeType;
  searchKey: string;
}

class IconDisplay extends React.Component<IconDisplayProps, IconDisplayState> {
  static categories: Categories = categories;

  static newIconNames: string[] = [];

  state: IconDisplayState = {
    theme: 'outlined',
    searchKey: '',
  };

  constructor(props: IconDisplayProps) {
    super(props);
    this.handleSearchIcon = debounce(this.handleSearchIcon, 300);
  }

  getComputedDisplayList = () => {
    return Object.keys(categories)
      .map((category: CategoriesKeys) => ({
        category,
        icons: (IconDisplay.categories[category] || []).filter(name => !!allIcons[name]),
      }))
      .filter(({ icons }) => Boolean(icons.length));
  };

  handleChangeTheme = (e: RadioChangeEvent) => {
    this.setState({
      theme: e.target.value as ThemeType,
    });
  };

  handleSearchIcon = (searchKey: string) => {
    this.setState(prevState => ({
      ...prevState,
      searchKey,
    }));
  };

  renderCategories(list: Array<{ category: CategoriesKeys; icons: string[] }>) {
    const { searchKey, theme } = this.state;

    return list
      .filter(({ category }) => category !== 'all')
      .map(({ category, icons }) => ({
        category,
        icons: icons
          .filter(name => {
            if (theme === 'outlined') {
              return ['filled', 'twotone'].every(
                themeName => !name.toLowerCase().includes(themeName),
              );
            }
            return name.toLowerCase().includes(theme);
          })
          .filter(name => name.toLowerCase().includes(searchKey)),
      }))
      .filter(({ icons }) => !!icons.length)
      .map(({ category, icons }) => (
        <Category
          key={category}
          title={category}
          icons={icons}
          newIcons={IconDisplay.newIconNames}
        />
      ));
  }

  render() {
    const {
      intl: { messages },
    } = this.props;
    const list = this.getComputedDisplayList();
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Radio.Group
            value={this.state.theme}
            onChange={this.handleChangeTheme}
            size="large"
            buttonStyle="solid"
          >
            <Radio.Button value="outlined">
              <Icon component={OutlinedIcon} /> {messages['app.docs.components.icon.outlined']}
            </Radio.Button>
            <Radio.Button value="filled">
              <Icon component={FilledIcon} /> {messages['app.docs.components.icon.filled']}
            </Radio.Button>
            <Radio.Button value="twotone">
              <Icon component={TwoToneIcon} /> {messages['app.docs.components.icon.two-tone']}
            </Radio.Button>
          </Radio.Group>
          <Input.Search
            placeholder={messages['app.docs.components.icon.search.placeholder']}
            style={{ marginLeft: 10, flex: 1 }}
            allowClear
            onChange={e => this.handleSearchIcon(e.currentTarget.value)}
            size="large"
            autoFocus
            suffix={<IconPicSearcher />}
          />
        </div>
        {this.renderCategories(list)}
      </>
    );
  }
}

export default injectIntl(IconDisplay);
