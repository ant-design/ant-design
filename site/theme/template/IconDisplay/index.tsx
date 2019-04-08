import * as React from 'react';
import manifest from '@ant-design/icons/lib/manifest';
import { ThemeType as ThemeFolderType } from '@ant-design/icons/lib/types';
import { Radio, Icon, Input } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import debounce from 'lodash/debounce';
import Category from './Category';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import { categories, Categories, CategoriesKeys } from './fields';
import { ThemeType } from '../../../../components/icon';

interface IconDisplayProps extends InjectedIntlProps {}

interface IconDisplayState {
  theme: ThemeType;
  searchKey: string;
}

class IconDisplay extends React.Component<IconDisplayProps, IconDisplayState> {
  static categories: Categories = categories;

  static newIconNames: string[] = [];

  static themeTypeMapper: { [key: string]: ThemeFolderType } = {
    filled: 'fill',
    outlined: 'outline',
    twoTone: 'twotone',
  };

  state: IconDisplayState = {
    theme: 'outlined',
    searchKey: '',
  };

  constructor(props: IconDisplayProps) {
    super(props);
    this.handleSearchIcon = debounce(this.handleSearchIcon, 300);
  }

  getComputedDisplayList() {
    return Object.keys(IconDisplay.categories)
      .map((category: CategoriesKeys) => ({
        category,
        icons: IconDisplay.categories[category].filter(
          name => manifest[IconDisplay.themeTypeMapper[this.state.theme]].indexOf(name) !== -1,
        ),
      }))
      .filter(({ icons }) => Boolean(icons.length));
  }

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
    const { searchKey } = this.state;
    return list
      .map(({ category, icons }) => {
        const iconResult = icons.filter(name => name.includes(searchKey));
        if (iconResult.length === 0) {
          return null;
        }
        return (
          <Category
            key={category}
            title={category}
            icons={iconResult}
            theme={this.state.theme}
            newIcons={IconDisplay.newIconNames}
          />
        );
      })
      .filter(category => !!category);
  }

  render() {
    const {
      intl: { messages },
    } = this.props;
    const list = this.getComputedDisplayList();
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Radio.Group value={this.state.theme} onChange={this.handleChangeTheme} size="large">
            <Radio.Button value="outlined">
              <Icon component={OutlinedIcon} /> {messages['app.docs.components.icon.outlined']}
            </Radio.Button>
            <Radio.Button value="filled">
              <Icon component={FilledIcon} /> {messages['app.docs.components.icon.filled']}
            </Radio.Button>
            <Radio.Button value="twoTone">
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
          />
        </div>
        {this.renderCategories(list)}
      </>
    );
  }
}

export default injectIntl(IconDisplay);
