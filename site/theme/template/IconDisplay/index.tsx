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

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
}

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

class IconDisplay extends React.PureComponent<IconDisplayProps, IconDisplayState> {
  static categories: Categories = categories;

  static newIconNames: string[] = [];

  state: IconDisplayState = {
    theme: ThemeType.Outlined,
    searchKey: '',
  };

  constructor(props: IconDisplayProps) {
    super(props);
    this.handleSearchIcon = debounce(this.handleSearchIcon, 300);
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

  renderCategories() {
    const { searchKey = '', theme } = this.state;

    return Object.keys(categories)
      .map((key: CategoriesKeys) => {
        let iconList = categories[key];
        if (searchKey) {
          iconList = iconList.filter(iconName =>
            iconName.toLowerCase().includes(searchKey.toLowerCase()),
          );
        }

        // CopyrightCircle is same as Copyright, don't show it
        iconList = iconList.filter(icon => icon !== 'CopyrightCircle');

        return {
          category: key,
          icons: iconList.map(iconName => iconName + theme).filter(iconName => allIcons[iconName]),
        };
      })
      .filter(({ icons }) => !!icons.length)
      .map(({ category, icons }) => (
        <Category
          key={category}
          title={category as CategoriesKeys}
          theme={theme}
          icons={icons}
          newIcons={IconDisplay.newIconNames}
        />
      ));
  }

  render() {
    const {
      intl: { messages },
    } = this.props;
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Radio.Group
            value={this.state.theme}
            onChange={this.handleChangeTheme}
            size="large"
            buttonStyle="solid"
          >
            <Radio.Button value={ThemeType.Outlined}>
              <Icon component={OutlinedIcon} /> {messages['app.docs.components.icon.outlined']}
            </Radio.Button>
            <Radio.Button value={ThemeType.Filled}>
              <Icon component={FilledIcon} /> {messages['app.docs.components.icon.filled']}
            </Radio.Button>
            <Radio.Button value={ThemeType.TwoTone}>
              <Icon component={TwoToneIcon} /> {messages['app.docs.components.icon.two-tone']}
            </Radio.Button>
          </Radio.Group>
          <Input.Search
            placeholder={messages['app.docs.components.icon.search.placeholder']}
            style={{ margin: '0 10px', flex: 1 }}
            allowClear
            onChange={e => this.handleSearchIcon(e.currentTarget.value)}
            size="large"
            autoFocus
            suffix={<IconPicSearcher />}
          />
        </div>
        {this.renderCategories()}
      </>
    );
  }
}

export default injectIntl(IconDisplay);
