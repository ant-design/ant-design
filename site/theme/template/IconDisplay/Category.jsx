import * as React from 'react';
import CopyableIcon from './CopyableIcon';
import { injectIntl } from 'react-intl';
class Category extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            justCopied: null,
        };
        this.onCopied = (type) => {
            this.setState({ justCopied: type }, () => {
                setTimeout(() => {
                    this.setState({ justCopied: null });
                }, 2000);
            });
        };
    }
    render() {
        const { icons, title, theme, newIcons, intl: { messages }, } = this.props;
        const items = icons.map((name) => {
            return (<CopyableIcon key={name} type={name} theme={theme} isNew={newIcons.indexOf(name) >= 0} justCopied={this.state.justCopied} onCopied={this.onCopied}/>);
        });
        return (<div>
        <h3>{messages[`app.docs.components.icon.category.${title}`]}</h3>
        <ul className={'anticons-list'}>
          {items}
        </ul>
      </div>);
    }
}
export default injectIntl(Category);
