import React, { useContext } from 'react';
import classNames from 'classnames';
import { useIntl } from 'dumi';
import { createStyles } from 'antd-style';
import ContributorsList from '@qixian.cs/github-contributors-list';
import ContributorAvatar from './ContributorAvatar';
import SiteContext from '../SiteContext';

const useStyle = createStyles(({ token, css }) => {
  const { antCls } = token;

  return {
    contributorsList: css`
    margin-top: 120px !important;
    `,
    listMobile: css`
      margin: 1em 0 !important;
    `,
    title: css`
    font-size: 12px;
    opacity: 0.45;
  `,
    list: css`
  display: flex;
  flex-wrap: wrap;
  clear: both;

  li {
    height: 24px;
  }

  li,
  ${antCls}-avatar + ${antCls}-avatar {
    transition: all ${token.motionDurationSlow};
    margin-inline-end: -8px;
  }
  &:hover {
    li,
    ${antCls}-avatar {
      margin-inline-end: 0;
    }
  }
  `,
  };
});

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
          <ContributorAvatar
            key={item?.username}
            username={item?.username}
            url={item?.url}
            loading={loading}
          />
        )}
      />
    </div>
  );
};

export default Contributors;
