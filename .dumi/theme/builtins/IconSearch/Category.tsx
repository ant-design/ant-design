import * as React from 'react';
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
}));

interface CategoryProps {
  title: CategoriesKeys;
  icons: string[];
  theme: ThemeType;
  newIcons: ReadonlyArray<string> | string[];
}

const Category: React.FC<CategoryProps> = (props) => {
  const { icons, title, newIcons, theme } = props;
  const { styles } = useStyle();
  const intl = useIntl();
  return (
    <div>
      <h3>{intl.formatMessage({ id: `app.docs.components.icon.category.${title}` })}</h3>
      <ul className={styles.anticonsList}>
        {icons.map((name) => (
          <CopyableIcon key={name} name={name} theme={theme} isNew={newIcons.includes(name)} />
        ))}
      </ul>
    </div>
  );
};

export default Category;
