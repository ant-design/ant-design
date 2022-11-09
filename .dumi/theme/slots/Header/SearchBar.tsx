import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link, useNavigate } from 'dumi';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { Input, Tooltip, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { DocSearchModalProps, DocSearchProps } from 'docsearch-react-fork';
import { useDocSearchKeyboardEvents } from 'docsearch-react-fork';
import '@docsearch/css';
import type { SharedProps } from './interface';
import type { IAlgoliaConfig } from './algolia-config';
import { transformHitUrl } from './algolia-config';
import WrapHelmet from '../../common/Helmet';
import useSiteToken from '../../../hooks/useSiteToken';
import { css } from '@emotion/react';

const { Text } = Typography;

const useStyle = () => {
  const { token } = useSiteToken();
  const searchIconColor = '#ced4d9';

  const { antCls, iconCls } = token;

  return {
    searchBox: css`
      position: relative;
      display: flex;
      flex: auto !important;
      align-items: center;
      height: 22px;
      margin: 0 auto 0 0 !important;
      padding-left: 16px;
      line-height: 22px;
      white-space: nowrap;
      border-left: 1px solid ${searchIconColor};
      transition: width 0.5s;

      ${antCls}-row-rtl & {
        margin: 0 0 0 auto !important;
        padding-right: 16px;
        padding-left: 0;
        border-right: 1px solid ${token.colorSplit};
        border-left: none;
      }

      > * {
        flex: auto;
      }

      ${iconCls} {
        position: absolute;
        top: 50%;
        z-index: 1;
        flex: none;
        color: ${searchIconColor};
        transform: translateY(-50%);
        pointer-events: none;
      }

      ${antCls}-input-affix-wrapper {
        background: transparent;
        border: 0;
        box-shadow: none;
      }

      input {
        width: 100%;
        max-width: 200px;
        padding-left: 20px;
        font-size: 14px;
        background: transparent;
        border: 0;
        box-shadow: none !important;

        ${antCls}-row-rtl & {
          padding-right: 20px;
          padding-left: 11px;
        }

        &::placeholder {
          color: #a3b1bf;
        }
      }
    `,
    keybindings: css`
      cursor: pointer;
    `,
    keybinding: css`
      color: ${searchIconColor};

      kbd {
        display: inline-block;
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        padding: 0;
        // better keybinding font display using \`Arial\`
        font-family: Arial; /* stylelint-disable-line font-family-no-missing-generic-family-keyword */
        text-align: center;
      }
    `,
    narrowMode: css`
      flex: none !important;
      width: 30px;

      &:hover {
        ${iconCls} {
          color: #a3b1bf;
        }
      }

      ${iconCls} {
        right: 0;
        left: auto;

        ${antCls}-row-rtl & {
          right: auto;
          left: 0;
        }
      }

      input {
        max-width: none;
        padding-right: 20px;
        padding-left: 11px;
        cursor: pointer;

        ${antCls}-row-rtl & {
          padding-right: 11px;
          padding-left: 20px;
        }
      }
    `,
    focused: css`
      width: 500px;

      ${iconCls} {
        color: @search-icon-color;
      }

      input {
        cursor: text;
      }
    `,
  };
};

export interface SearchBarProps extends SharedProps {
  onTriggerFocus?: (focus: boolean) => void;
  responsive: null | 'narrow' | 'crowded';
  algoliaConfig: IAlgoliaConfig;
}

let SearchModal: React.FC<DocSearchModalProps> | null = null;

const Hit: DocSearchProps['hitComponent'] = ({ hit, children }) => {
  const toUrl = React.useMemo(() => transformHitUrl(hit.url), [hit.url]);
  return <Link to={toUrl}>{children}</Link>;
};

const CTRL_KEY = 'Ctrl';
const CMD_KEY = '⌘';

function isAppleDevice() {
  return /(mac|iphone|ipod|ipad)/i.test(navigator.platform);
}

/**
 * Recompose for algolia DocSearch Component Inspiring by
 *
 * - [@docusaurus-theme-search-algolia](https://docusaurus.io/docs/api/themes/@docusaurus/theme-search-algolia)
 * - [DocSearchModal Docs](https://autocomplete-experimental.netlify.app/docs/DocSearchModal)
 */
const SearchBar = ({
  isZhCN,
  isClient,
  responsive,
  onTriggerFocus,
  algoliaConfig,
}: SearchBarProps) => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState('');

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [searchModalQuery, setSearchModalQuery] = React.useState('');
  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';
  const searchInputPlaceholder = isZhCN ? '搜索' : 'Search';
  const navigate = useNavigate();

  const style = useStyle();

  const triggerSearchModalImport = React.useCallback(() => {
    if (SearchModal) {
      return Promise.resolve();
    }

    // @ts-ignore
    return import('docsearch-react-fork/modal').then(({ DocSearchModal }) => {
      SearchModal = DocSearchModal;
    });
  }, []);

  const handleInputFocus = React.useCallback((focus: boolean) => {
    setInputFocus(focus);
    onTriggerFocus?.(focus);
  }, []);

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    triggerSearchModalImport();
    setInputSearch(event.target.value);
  }, []);

  const searchModalContainer = React.useMemo(() => {
    if (!canUseDom()) {
      return;
    }
    const id = 'antd_algolia_search_modal';
    let searchModalContainer$ = document.querySelector(`#${id}`);
    if (!searchModalContainer$) {
      const containerDiv = document.createElement('div');
      containerDiv.id = id;
      document.body.appendChild(containerDiv);
      searchModalContainer$ = containerDiv;
    }
    return searchModalContainer$;
  }, []);

  const handleModalOpen = React.useCallback(() => {
    triggerSearchModalImport().then(() => {
      handleInputFocus(true);
      setModalOpen(true);
    });
  }, []);

  const handleModalClose = React.useCallback(() => {
    // clear search value in SearchModal
    setSearchModalQuery('');
    setModalOpen(false);
  }, []);

  useDocSearchKeyboardEvents({
    isOpen: isModalOpen,
    onOpen: handleModalOpen,
    onClose: handleModalClose,
  });

  const searchParameters = React.useMemo(() => algoliaConfig.getSearchParams(isZhCN), [isZhCN]);

  const navigator = React.useRef({
    navigate({ itemUrl }: { itemUrl: string }) {
      navigate(itemUrl);
    },
  }).current;

  return (
    <div
      css={[style.searchBox, responsive && style.narrowMode, isInputFocus && style.focused]}
      id="search-box"
    >
      <WrapHelmet>
        {/* pre-connect to algolia server */}
        <link
          rel="preconnect"
          href={`https://${algoliaConfig.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </WrapHelmet>

      <Input
        placeholder={searchInputPlaceholder}
        onTouchStart={triggerSearchModalImport}
        onMouseOver={triggerSearchModalImport}
        value={inputSearch}
        onChange={handleInputChange}
        onFocus={() => {
          triggerSearchModalImport();
          handleInputFocus(true);
        }}
        onBlur={() => {
          handleInputFocus(false);
        }}
        prefix={<SearchOutlined />}
        suffix={
          isClient && (
            <Tooltip placement="right" title={isZhCN ? '唤起搜索窗' : 'Search in doc modal'}>
              <span
                css={style.keybindings}
                onClick={() => {
                  // move userSearch to SearchModal
                  setSearchModalQuery(inputSearch);
                  setInputSearch('');
                  handleModalOpen();
                }}
              >
                <Text keyboard css={style.keybinding}>
                  {isAppleDevice() ? CMD_KEY : CTRL_KEY}
                </Text>
                <Text keyboard css={style.keybinding}>
                  K
                </Text>
              </span>
            </Tooltip>
          )
        }
      />

      {SearchModal &&
        searchModalContainer &&
        isModalOpen &&
        ReactDOM.createPortal(
          <SearchModal
            navigator={navigator}
            onClose={handleModalClose}
            initialScrollY={window.scrollY}
            initialQuery={searchModalQuery}
            placeholder={searchPlaceholder}
            hitComponent={Hit}
            appId={algoliaConfig.appId}
            apiKey={algoliaConfig.apiKey}
            indexName={algoliaConfig.indexName}
            transformItems={algoliaConfig.transformData}
            searchParameters={searchParameters}
          />,
          searchModalContainer,
        )}
    </div>
  );
};

export default SearchBar;
