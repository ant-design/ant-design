import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'bisheng/router';
import classNames from 'classnames';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { Input, Tooltip, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { DocSearchProps, DocSearchModalProps } from 'docsearch-react-fork';
import { useDocSearchKeyboardEvents } from 'docsearch-react-fork';
import '@docsearch/css';
import type { SharedProps } from './interface';
import type { IAlgoliaConfig } from './algolia-config';
import { transformHitUrl } from './algolia-config';
import WrapHelmet from '../../Components/Helmet';

import './SearchBar.less';

const { Text } = Typography;

export interface SearchBarProps extends SharedProps {
  onTriggerFocus?: (focus: boolean) => void;
  responsive: null | 'narrow' | 'crowded';
  algoliaConfig: IAlgoliaConfig;
  router: any;
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
  responsive,
  onTriggerFocus,
  algoliaConfig,
  router,
}: SearchBarProps) => {
  const [isInputFocus, setInputFocus] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState('');

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [searchModalQuery, setSearchModalQuery] = React.useState('');
  const searchPlaceholder = isZhCN ? '在 ant.design 中搜索' : 'Search in ant.design';
  const searchInputPlaceholder = isZhCN ? '搜索' : 'Search';

  const triggerSearchModalImport = React.useCallback(() => {
    if (SearchModal) {
      return Promise.resolve();
    }

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
      router.push(itemUrl);
    },
  }).current;

  return (
    <div
      id="search-box"
      className={classNames({
        'narrow-mode': responsive,
        focused: isInputFocus,
      })}
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
          typeof window !== 'undefined' && (
            <Tooltip placement="right" title={isZhCN ? '唤起搜索窗' : 'Search in doc modal'}>
              <span
                className="keybindings"
                onClick={() => {
                  // move userSearch to SearchModal
                  setSearchModalQuery(inputSearch);
                  setInputSearch('');
                  handleModalOpen();
                }}
              >
                <Text keyboard className="keybinding">
                  {isAppleDevice() ? CMD_KEY : CTRL_KEY}
                </Text>
                <Text keyboard className="keybinding">
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
