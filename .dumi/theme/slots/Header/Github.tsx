import * as React from 'react';
import classNames from 'classnames';
// @ts-ignore
import GitHubButton from 'react-github-button';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';

const useStyle = () => {
  const { token } = useSiteToken();

  const { antCls, colorPrimary } = token;

  return {
    githubBtn: css`
      display: flex;
      flex-flow: nowrap;
      height: auto;

      .gh-btn {
        height: auto;
        padding: 1px 4px;
        background: transparent;
        border: 0;

        .gh-ico {
          width: 20px;
          height: 20px;
          margin: 0;
        }

        .gh-text {
          display: none;
        }
      }

      .gh-count {
        height: auto;
        padding: 4px 8px;
        color: #000;
        font-weight: normal;
        background: #fff;

        &:hover {
          color: ${colorPrimary};
        }
      }

      ${antCls}-row-rtl & {
        .gh-count {
          display: none !important;
        }
      }
    `,
    responsiveMode: css`
      .gh-count {
        display: none !important;
      }
    `,
  };
};

export interface GithubProps {
  responsive: null | 'narrow' | 'crowded';
}

export default ({ responsive }: GithubProps) => {
  const style = useStyle();

  return (
    <GitHubButton
      css={[style.githubBtn, responsive && style.responsiveMode]}
      type="stargazers"
      namespace="ant-design"
      repo="ant-design"
    />
  );
};
