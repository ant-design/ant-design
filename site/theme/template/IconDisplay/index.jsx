import * as React from 'react';
import manifest from '@ant-design/icons/lib/manifest';
import Category from './Category';
import { Radio, Icon as AntdIcon } from 'antd';
import { FilledIcon, OutlinedIcon, TwoToneIcon } from './themeIcons';
import { categories } from './fields';
import { injectIntl } from 'react-intl';
const Icon = AntdIcon;
class IconDisplay extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            theme: 'outlined',
        };
        this.handleChangeTheme = (e) => {
            this.setState({
                theme: e.target.value,
            });
        };
    }
    getComputedDisplayList() {
        return Object.keys(IconDisplay.cagetories)
            .map((category) => ({
            category,
            icons: IconDisplay.cagetories[category]
                .filter((name) => manifest[IconDisplay.themeTypeMapper[this.state.theme]].indexOf(name) !== -1),
        }))
            .filter(({ icons }) => Boolean(icons.length));
    }
    renderCategories(list) {
        return list.map(({ category, icons }) => {
            return (<Category key={category} title={category} icons={icons} theme={this.state.theme} newIcons={IconDisplay.newIconNames}/>);
        });
    }
    render() {
        const { intl: { messages } } = this.props;
        const list = this.getComputedDisplayList();
        return (<div>
        <h3>{messages['app.docs.components.icon.pick-theme']}</h3>
        <Radio.Group value={this.state.theme} onChange={this.handleChangeTheme}>
          <Radio.Button value="outlined">
            <Icon component={OutlinedIcon}/> Outlined
          </Radio.Button>
          <Radio.Button value="filled">
            <Icon component={FilledIcon}/> Filled
          </Radio.Button>
          <Radio.Button value="twoTone">
            <Icon component={TwoToneIcon}/> Two Tone
          </Radio.Button>
        </Radio.Group>
        {this.renderCategories(list)}
      </div>);
    }
}
IconDisplay.cagetories = categories;
IconDisplay.newIconNames = [
    // direction
    'border-bottom', 'border-horizontal', 'border-inner',
    'border-outter', 'border-left', 'border-right', 'border-top',
    'border-verticle', 'pic-center', 'pic-left', 'pic-right',
    'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'radius-upleft',
    'fullscreen', 'fullscreen-exit',
    // suggestion
    'issues-close', 'stop',
    // edit
    'scissor', 'snippets', 'diff', 'highlight',
    'align-center', 'align-left', 'align-right', 'bg-colors',
    'bold', 'italic', 'underline', 'redo', 'undo', 'zoom-in', 'zoom-out',
    'font-colors', 'font-size', 'line-height', 'colum-height', 'colum-width',
    'dash', 'small-dash', 'sort-ascending', 'sort-descending',
    'drag', 'ordered-list', 'radius-setting',
    // data
    'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund',
    'sliders',
    // other
    'alert', 'audit', 'batch-folding', 'branches',
    'build', 'border', 'crown',
    'experiment', 'fire',
    'money-collect', 'property-safety', 'read', 'reconciliation',
    'rest', 'security-scan', 'insurance', 'interation', 'safety-certificate',
    'project', 'thunderbolt', 'block', 'cluster', 'deployment-unit',
    'dollar', 'euro', 'pound', 'file-done', 'file-exclamation', 'file-protect',
    'file-search', 'file-sync', 'gateway', 'gold', 'robot',
    'strikethrough', 'shopping',
    // logo
    'alibaba', 'yahoo',
];
IconDisplay.themeTypeMapper = {
    filled: 'fill',
    outlined: 'outline',
    twoTone: 'twotone',
};
export default injectIntl(IconDisplay);
