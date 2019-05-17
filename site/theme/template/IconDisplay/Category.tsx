import * as React from 'react';
import { message } from 'antd';
import { ThemeType } from '../../../../components/icon';
import CopyableIcon from './CopyableIcon';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { CategoriesKeys } from './fields';

interface CategoryProps extends InjectedIntlProps {
  title: CategoriesKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: string[];
}

interface CategoryState {
  justCopied: string | null;
}

class Category extends React.Component<CategoryProps, CategoryState> {
  copyId?: number;

  state = {
    justCopied: null,
  };

  onCopied = (type: string, text: string) => {
    message.success(
      <span>
        <code className="copied-code">{text}</code> copied 🎉
      </span>,
    );
    this.setState({ justCopied: type }, () => {
      this.copyId = window.setTimeout(() => {
        this.setState({ justCopied: null });
      }, 2000);
    });
  };

  componentWillUnmount() {
    window.clearTimeout(this.copyId);
  }

  render() {
    const {
      icons,
      title,
      theme,
      newIcons,
      intl: { messages },
    } = this.props;
    const items = icons.map(name => {
      return (
        <CopyableIcon
          key={name}
          type={name}
          theme={theme}
          isNew={newIcons.indexOf(name) >= 0}
          justCopied={this.state.justCopied}
          onCopied={this.onCopied}
        />
      );
    });
    return (
      <div>
        <h3>{messages[`app.docs.components.icon.category.${title}`]}</h3>
        <ul className={'anticons-list'}>{items}</ul>
      </div>
    );
  }
}

export default injectIntl(Category);
