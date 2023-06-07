import classNames from 'classnames';
import RcOverflow from 'rc-overflow';
import React, { ReactNode, useMemo } from 'react';

import { ConfigContext } from '../config-provider';
import type { TooltipProps } from '../tooltip';
import Tooltip from '../tooltip';
import type { TagProps } from './';
import Tag from './index';
import useStyle from './style';

export type TagsGroupDataItem = TagProps & {
  label?: ((args: TagsGroupDataItem | TagsGroupData) => ReactNode) | string;
  key?: any;
  onClose: (newData: TagsGroupData) => void;
};

export type TagsGroupData = TagsGroupDataItem[];

export interface GroupProps {
  data: TagsGroupData;
  restTagProps?: TagProps;
  closeTooltip?: boolean;
  resetTagToolTipConfig?: TooltipProps;
  renderRestPlacement?: (args: TagsGroupData) => ReactNode;
  renderRawItem?: (omittedItems: TagsGroupDataItem) => React.ReactElement;
  renderRawRest?: (omittedItems: TagsGroupData) => React.ReactElement;
  prefixCls?: string;
}

const Group: React.FC<GroupProps> = ({
  data,
  restTagProps,
  closeTooltip,
  resetTagToolTipConfig,
  renderRestPlacement,
  renderRawItem,
  renderRawRest,
  prefixCls: customizePrefixCls,
}) => {
  const renderRest = (restTags: TagsGroupData) => {
    const mergedCloseTooltip = useMemo(() => {
      return !closeTooltip && restTags.length > 0;
    }, [closeTooltip, restTags.length]);

    const renderToolTip = () =>
      restTags.map((tag) => {
        const { onClose, label, ...restTags } = tag;
        return (
          <Tag {...restTags} onClose={() => onClose?.(data)}>
            {typeof label === 'function' ? label(tag) : label}
          </Tag>
        );
      });

    const renderMergedRestPlacement = () => {
      return renderRestPlacement ? (
        renderRestPlacement(restTags)
      ) : (
        <Tag style={{ cursor: 'pointer' }} {...restTagProps}>
          +{restTags.length}...
        </Tag>
      );
    };
    return (
      <>
        {mergedCloseTooltip ? (
          <Tooltip
            title={renderToolTip}
            color="white"
            overlayStyle={{ width: '200px' }}
            {...resetTagToolTipConfig}
          >
            {renderMergedRestPlacement()}
          </Tooltip>
        ) : (
          renderMergedRestPlacement()
        )}
      </>
    );
  };

  const renderTag = (tag: TagsGroupDataItem) => {
    const { onClose, label, ...restProps } = tag;
    return (
      <Tag {...restProps} onClose={() => onClose?.(data)}>
        {typeof label === 'function' ? label(tag) : label}
      </Tag>
    );
  };

  // Style
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tags-group', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(`${prefixCls}`);

  const cls = classNames(hashId);

  return wrapSSR(
    <RcOverflow
      data={[...data!]}
      renderItem={renderTag}
      renderRest={renderRest}
      renderRawRest={renderRawRest}
      renderRawItem={renderRawItem}
      maxCount={'responsive'}
      className={cls}
      prefixCls={`${prefixCls}-overflow`}
    ></RcOverflow>,
  );
};

export default Group;
