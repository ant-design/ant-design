import * as React from 'react';
import { App } from 'antd';
import { createStyles } from 'antd-style';
import { useIntl } from 'dumi';

import CopyableIcon from './CopyableIcon';
import type { CategoriesKeys } from './fields';
import type { ThemeType } from './IconSearch';

const useStyle = createStyles(({ css, cssVar }) => ({
  anticonsList: css`
    margin: ${cssVar.margin} 0;
    overflow: hidden;
    direction: ltr;
    list-style: none;
    display: grid;
    grid-gap: ${cssVar.margin};
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 0;
  `,
  copiedCode: css`
    padding: 0 ${cssVar.paddingXXS};
    font-size: ${cssVar.fontSizeSM};
    background-color: ${cssVar.colorBgLayout};
    border-radius: ${cssVar.borderRadiusXS};
  `,
}));

interface CategoryProps {
  title: CategoriesKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: string[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const { message } = App.useApp();
  const { icons, title, newIcons, theme } = props;
  const { styles } = useStyle();
  const intl = useIntl();
  const [justCopied, setJustCopied] = React.useState<string | null>(null);
  const copyId = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCopied = React.useCallback((type: string, text: string) => {
    message.success(
      <span>
        <code className={styles.copiedCode}>{text}</code> copied 🎉
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
      <ul className={styles.anticonsList}>
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
