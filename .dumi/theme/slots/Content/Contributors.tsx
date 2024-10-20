import React, { useContext } from 'react';
import ContributorsList from '@qixian.cs/github-contributors-list';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useIntl } from 'dumi';

import SiteContext from '../SiteContext';
import ContributorAvatar from './ContributorAvatar';

const useStyle = createStyles(({ token, css }) => ({
  contributorsList: css`
    margin-top: 120px !important;
  `,
  listMobile: css`
    margin: 1em 0 !important;
  `,
  title: css`
    font-size: ${token.fontSizeSM}px;
    opacity: 0.5;
    margin-bottom: ${token.marginXS}px;
  `,
  list: css`
    display: flex;
    flex-wrap: wrap;
    clear: both;
    li {
      height: 24px;
      transition: all ${token.motionDurationSlow};
      margin-inline-end: -${token.marginXS}px;
    }
    &:hover {
      li {
        margin-inline-end: 0;
      }
    }
  `,
}));

interface ContributorsProps {
  filename?: string;
}

const Contributors: React.FC<ContributorsProps> = ({ filename }) => {
  const { formatMessage } = useIntl();
  const { styles } = useStyle();
  const { isMobile } = useContext(SiteContext);

  if (!filename) {
    return null;
  }

  return (
    <div className={classNames(styles.contributorsList, { [styles.listMobile]: isMobile })}>
      <div className={styles.title}>{formatMessage({ id: 'app.content.contributors' })}</div>
      <ContributorsList
        cache
        repo="ant-design"
        owner="ant-design"
        fileName={filename}
        className={styles.list}
        renderItem={(item, loading) => (
          <ContributorAvatar item={item} loading={loading} key={item?.url} />
        )}
      />
    </div>
  );
};

export default Contributors;
