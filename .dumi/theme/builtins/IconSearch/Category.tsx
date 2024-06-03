import * as React from 'react';
import { App } from 'antd';
import { createStyles } from 'antd-style';
import { useIntl } from 'dumi';

import CopyableIcon from './CopyableIcon';
import type { CategoriesKeys } from './fields';
import type { ThemeType } from './IconSearch';

const useStyle = createStyles(({ token, css }) => ({
  anticonsList: css`
    margin: ${token.marginSM}px 0;
    overflow: hidden;
    direction: ltr;
    list-style: none;
    li {
      position: relative;
      float: left;
      width: 16.66%;
      height: 100px;
      margin: ${token.marginXXS}px 0;
      padding: ${token.paddingSM}px 0 0;
      overflow: hidden;
      color: #555;
      text-align: center;
      list-style: none;
      background-color: inherit;
      border-radius: ${token.borderRadiusSM}px;
      cursor: pointer;
      transition: all ${token.motionDurationSlow} ease-in-out;
      .rtl & {
        margin: ${token.marginXXS}px 0;
        padding: ${token.paddingSM}px 0 0;
      }
      ${token.iconCls} {
        margin: ${token.marginSM}px 0 ${token.marginXS}px;
        font-size: 36px;
        transition: transform ${token.motionDurationSlow} ease-in-out;
        will-change: transform;
      }
    }
  `,
  copiedCode: css`
    padding: 2px 4px;
    font-size: ${token.fontSizeSM}px;
    background-color: ${token.colorBgLayout};
    border-radius: ${token.borderRadiusXS}px;
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
