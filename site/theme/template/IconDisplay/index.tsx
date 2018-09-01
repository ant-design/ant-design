import * as React from 'react';
import { ThemeType, IconType } from '../../../../components/icon';
import manifest from '@ant-design/icons/lib/manifest';
import { ThemeType as ThemeFolderType } from '@ant-design/icons/lib/types';
import Category from './Category';
import { Radio, Icon as AntdIcon } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import { categories, Categories, CategoriesKeys } from './fields';
import { injectIntl, InjectedIntlProps } from 'react-intl';

const Icon: IconType = AntdIcon as any;

interface IconDisplayProps extends InjectedIntlProps {
}

interface IconDisplayState {
  theme: ThemeType;
}

class IconDisplay extends React.Component<IconDisplayProps, IconDisplayState> {

  static cagetories: Categories = categories;

  static newIconNames: string[] = [];

  static themeTypeMapper: { [key: string]: ThemeFolderType } = {
    filled: 'fill',
    outlined: 'outline',
    twoTone: 'twotone',
  };

  state: IconDisplayState = {
    theme: 'outlined',
  };

  getComputedDisplayList() {
    return Object.keys(IconDisplay.cagetories)
      .map(
        (category: CategoriesKeys) => ({
          category,
          icons: IconDisplay.cagetories[category]
            .filter((name) => manifest[IconDisplay.themeTypeMapper[this.state.theme]].indexOf(name) !== -1),
        }),
      )
      .filter(({ icons }) => Boolean(icons.length));
  }

  handleChangeTheme = (e: RadioChangeEvent) => {
    this.setState({
      theme: e.target.value as ThemeType,
    });
  }

  renderCategories(list: Array<{ category: CategoriesKeys, icons: string[] }>) {
    return list.map(({ category, icons }) => {
      return (
        <Category
          key={category}
          title={category}
          icons={icons}
          theme={this.state.theme}
          newIcons={IconDisplay.newIconNames}
        />
      );
    });
  }

  render() {
    const { intl: { messages } } = this.props;
    const list = this.getComputedDisplayList();
    return (
      <div>
        <h3>{messages['app.docs.components.icon.pick-theme']}</h3>
        <Radio.Group value={this.state.theme} onChange={this.handleChangeTheme}>
          <Radio.Button value="outlined">
            <Icon component={OutlinedIcon} /> Outlined
          </Radio.Button>
          <Radio.Button value="filled">
            <Icon component={FilledIcon} /> Filled
          </Radio.Button>
          <Radio.Button value="twoTone">
            <Icon component={TwoToneIcon} /> Two Tone
          </Radio.Button>
        </Radio.Group>
        {this.renderCategories(list)}
      </div>
    );
  }
}

export default injectIntl(IconDisplay);
