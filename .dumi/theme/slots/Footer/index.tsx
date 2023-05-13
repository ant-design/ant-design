import {
  AntDesignOutlined,
  BgColorsOutlined,
  BugOutlined,
  GithubOutlined,
  HistoryOutlined,
  IssuesCloseOutlined,
  MediumOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  TwitterOutlined,
  UsergroupAddOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { css } from '@emotion/react';
import getAlphaColor from 'antd/es/theme/util/getAlphaColor';
import { FormattedMessage, Link } from 'dumi';
import RcFooter from 'rc-footer';
import type { FooterColumn } from 'rc-footer/lib/column';
import React, { useContext } from 'react';
import useLocale from '../../../hooks/useLocale';
import useLocation from '../../../hooks/useLocation';
import useSiteToken from '../../../hooks/useSiteToken';
import SiteContext from '../SiteContext';
import AdditionalInfo from './AdditionalInfo';

const locales = {
  cn: {
    owner: '蚂蚁集团和 Ant Design 开源社区',
  },
  en: {
    owner: 'Ant Group and Ant Design Community',
  },
};

const useStyle = () => {
  const { token } = useSiteToken();
  const { isMobile } = useContext(SiteContext);
  const background = new TinyColor(getAlphaColor('#f0f3fa', '#fff'))
    .onBackground(token.colorBgContainer)
    .toHexString();

  return {
    holder: css`
      background: ${background};
    `,

    footer: css`
      background: ${background};
      color: ${token.colorTextSecondary};
      box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);

      * {
        box-sizing: border-box;
      }

      h2,
      a {
        color: ${token.colorText};
      }

      .rc-footer-column {
        margin-bottom: ${isMobile ? 60 : 0}px;
        :last-child {
          margin-bottom: ${isMobile ? 20 : 0}px;
        }
      }

      .rc-footer-item-icon {
        top: -1.5px;
      }

      .rc-footer-container {
        max-width: 1208px;
        margin-inline: auto;
        padding-inline: ${token.marginXXL}px;
      }

      .rc-footer-bottom {
        box-shadow: inset 0 106px 36px -116px rgba(0, 0, 0, 0.14);
        .rc-footer-bottom-container {
          font-size: ${token.fontSize}px;
        }
      }
    `,
  };
};

const Footer: React.FC = () => {
  const location = useLocation();
  const [locale, lang] = useLocale(locales);
  const style = useStyle();

  const { getLink } = location;

  const getColumns = React.useMemo<FooterColumn[]>(() => {
    const isZhCN = lang === 'cn';

    const col1 = {
      title: <FormattedMessage id="app.footer.resources" />,
      items: [
        {
          title: 'Ant Design Charts',
          url: 'https://charts.ant.design',
          openExternal: true,
        },
        {
          title: 'Ant Design Pro',
          url: 'https://pro.ant.design',
          openExternal: true,
        },
        {
          title: 'Ant Design Pro Components',
          url: 'https://procomponents.ant.design',
          openExternal: true,
        },
        {
          title: 'Ant Design Mobile',
          url: 'https://mobile.ant.design',
          openExternal: true,
        },
        {
          title: 'Ant Design Mini',
          url: 'https://mini.ant.design',
          openExternal: true,
        },
        {
          title: 'Ant Design Landing',
          description: <FormattedMessage id="app.footer.landing" />,
          url: 'https://landing.ant.design',
          openExternal: true,
        },
        {
          title: 'Scaffolds',
          description: <FormattedMessage id="app.footer.scaffolds" />,
          url: 'https://scaffold.ant.design',
          openExternal: true,
        },
        {
          title: 'Umi',
          description: <FormattedMessage id="app.footer.umi" />,
          url: 'https://umijs.org',
          openExternal: true,
        },
        {
          title: 'dumi',
          description: <FormattedMessage id="app.footer.dumi" />,
          url: 'https://d.umijs.org',
          openExternal: true,
        },
        {
          title: 'qiankun',
          description: <FormattedMessage id="app.footer.qiankun" />,
          url: 'https://qiankun.umijs.org',
          openExternal: true,
        },
        {
          title: 'ahooks',
          description: <FormattedMessage id="app.footer.hooks" />,
          url: 'https://github.com/alibaba/hooks',
          openExternal: true,
        },
        {
          title: 'Ant Motion',
          description: <FormattedMessage id="app.footer.motion" />,
          url: 'https://motion.ant.design',
          openExternal: true,
        },
        {
          title: <FormattedMessage id="app.footer.chinamirror" />,
          url: 'https://ant-design.antgroup.com',
        },
      ],
    };

    const col2 = {
      title: <FormattedMessage id="app.footer.community" />,
      items: [
        {
          icon: <AntDesignOutlined />,
          title: <FormattedMessage id="app.footer.awesome" />,
          url: 'https://github.com/websemantics/awesome-ant-design',
          openExternal: true,
        },
        {
          icon: <MediumOutlined />,
          title: 'Medium',
          url: 'http://medium.com/ant-design/',
          openExternal: true,
        },
        {
          icon: <TwitterOutlined style={{ color: '#1DA1F2' }} />,
          title: 'Twitter',
          url: 'http://twitter.com/antdesignui',
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
              alt="yuque"
            />
          ),
          title: <FormattedMessage id="app.footer.yuque.repo" />,
          url: 'https://yuque.com/ant-design/ant-design',
          openExternal: true,
        },
        {
          icon: <ZhihuOutlined style={{ color: '#056de8' }} />,
          title: <FormattedMessage id="app.footer.zhihu" />,
          url: 'https://www.zhihu.com/column/c_1564262000561106944',
          openExternal: true,
        },
        {
          icon: <ZhihuOutlined style={{ color: '#056de8' }} />,
          title: <FormattedMessage id="app.footer.zhihu.xtech" />,
          url: 'https://www.zhihu.com/column/c_1543658574504751104',
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png"
              alt="seeconf"
            />
          ),
          title: 'SEE Conf',
          description: <FormattedMessage id="app.footer.seeconf" />,
          url: 'https://seeconf.antfin.com/',
          openExternal: true,
        },
      ],
    };

    if (isZhCN) {
      col2.items.push({
        icon: <UsergroupAddOutlined />,
        title: <FormattedMessage id="app.footer.work_with_us" />,
        url: getLink('/docs/resources', {
          cn: '加入我们',
          en: 'JoinUs',
        }),
        LinkComponent: Link,
      } as unknown as typeof col2['items'][number]);
    }

    const col3 = {
      title: <FormattedMessage id="app.footer.help" />,
      items: [
        {
          icon: <GithubOutlined />,
          title: 'GitHub',
          url: 'https://github.com/ant-design/ant-design',
          openExternal: true,
        },
        {
          icon: <HistoryOutlined />,
          title: <FormattedMessage id="app.footer.change-log" />,
          url: getLink('/changelog'),
          LinkComponent: Link,
        },
        {
          icon: <QuestionCircleOutlined />,
          title: <FormattedMessage id="app.footer.faq" />,
          url: getLink('/docs/react/faq'),
          LinkComponent: Link,
        },
        {
          icon: <BugOutlined />,
          title: <FormattedMessage id="app.footer.bug-report" />,
          url: 'https://new-issue.ant.design/',
          openExternal: true,
        },
        {
          icon: <IssuesCloseOutlined />,
          title: <FormattedMessage id="app.footer.issues" />,
          url: 'https://github.com/ant-design/ant-design/issues',
          openExternal: true,
        },
        {
          icon: <MessageOutlined />,
          title: <FormattedMessage id="app.footer.discussions" />,
          url: 'https://github.com/ant-design/ant-design/discussions',
          openExternal: true,
        },
        {
          icon: <QuestionCircleOutlined />,
          title: <FormattedMessage id="app.footer.stackoverflow" />,
          url: 'http://stackoverflow.com/questions/tagged/antd',
          openExternal: true,
        },
        {
          icon: <QuestionCircleOutlined />,
          title: <FormattedMessage id="app.footer.segmentfault" />,
          url: 'https://segmentfault.com/t/antd',
          openExternal: true,
        },
      ],
    };

    const col4 = {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
          alt="Ant XTech"
        />
      ),
      title: <FormattedMessage id="app.footer.more-product" />,
      items: [
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
              alt="yuque"
            />
          ),
          title: <FormattedMessage id="app.footer.yuque" />,
          url: 'https://yuque.com',
          description: <FormattedMessage id="app.footer.yuque.slogan" />,
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/nc7Fc0XBg5/8a6844f5-a6ed-4630-9177-4fa5d0b7dd47.png"
              alt="AntV"
            />
          ),
          title: 'AntV',
          url: 'https://antv.vision',
          description: <FormattedMessage id="app.footer.antv.slogan" />,
          openExternal: true,
        },
        {
          icon: <img src="https://www.eggjs.org/logo.svg" alt="Egg" />,
          title: 'Egg',
          url: 'https://eggjs.org',
          description: <FormattedMessage id="app.footer.egg.slogan" />,
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/DMDOlAUhmktLyEODCMBR.ico"
              alt="kitchen"
            />
          ),
          title: 'Kitchen',
          description: <FormattedMessage id="app.footer.kitchen" />,
          url: 'https://kitchen.alipay.com',
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
              alt="xtech"
            />
          ),
          title: <FormattedMessage id="app.footer.xtech" />,
          url: 'https://xtech.antfin.com/',
          openExternal: true,
        },
        {
          icon: <BgColorsOutlined />,
          title: <FormattedMessage id="app.footer.theme" />,
          url: getLink('/theme-editor'),
          LinkComponent: Link,
        },
      ],
    };
    return [col1, col2, col3, col4];
  }, [lang, location.search]);

  return (
    <>
      <RcFooter
        columns={getColumns}
        css={style.footer}
        bottom={
          <>
            <div style={{ opacity: '0.4' }}>
              Made with <span style={{ color: '#fff' }}>❤</span> by
            </div>
            <div>{locale.owner}</div>
          </>
        }
      />
      <AdditionalInfo />
    </>
  );
};

export default Footer;
