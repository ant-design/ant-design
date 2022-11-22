import * as React from 'react';
import { message } from 'antd';
import { useIntl } from 'dumi';
import CopyableIcon from './CopyableIcon';
import type { ThemeType } from './index';
import type { CategoriesKeys } from './fields';

interface CategoryProps {
  title: CategoriesKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: string[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const { icons, title, newIcons, theme } = props;
  const intl = useIntl();
  const [justCopied, setJustCopied] = React.useState<string | null>(null);
  const copyId = React.useRef<NodeJS.Timeout | null>(null);
  const onCopied = React.useCallback((type: string, text: string) => {
    message.success(
      <span>
        <code className="copied-code">{text}</code> copied 🎉
      </span>,
    );
    setJustCopied(type);
    copyId.current = setTimeout(() => {
      setJustCopied(null);
    }, 2000);
  }, []);
  React.useEffect(
    () => () => {
      if (copyId.current) {
        clearTimeout(copyId.current);
      }
    },
    [],
  );
  return (
    <div>
      <h3>{intl.formatMessage({ id: `app.docs.components.icon.category.${title}` })}</h3>
      <ul className="anticons-list">
        {icons.map((name) => (
          <CopyableIcon
            key={name}
            name={name}
            theme={theme}
            isNew={newIcons.includes(name)}
            justCopied={justCopied}
            onCopied={onCopied}
          />
        ))}
      </ul>
    </div>
  );
};

export default Category;
