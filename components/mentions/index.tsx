import classNames from 'classnames';
import RcMentions from 'rc-mentions';
import type {
  DataDrivenOptionProps as MentionsOptionProps,
  MentionsProps as RcMentionsProps,
  MentionsRef as RcMentionsRef,
} from 'rc-mentions/lib/Mentions';
import { composeRef } from 'rc-util/lib/ref';
// eslint-disable-next-line import/no-named-as-default
import * as React from 'react';
import genPurePanel from '../_util/PurePanel';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import { FormItemInputContext } from '../form/context';
import Spin from '../spin';

import useStyle from './style';

export const { Option } = RcMentions;

function loadingFilterOption() {
  return true;
}

export type MentionPlacement = 'top' | 'bottom';

export type { DataDrivenOptionProps as MentionsOptionProps } from 'rc-mentions/lib/Mentions';

export interface OptionProps {
  value: string;
  children: React.ReactNode;
  [key: string]: any;
}

export interface MentionProps extends Omit<RcMentionsProps, 'suffix'> {
  rootClassName?: string;
  loading?: boolean;
  status?: InputStatus;
  options?: MentionsOptionProps[];
  popupClassName?: string;
}

export interface MentionsRef extends RcMentionsRef {}

interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}

interface MentionsEntity {
  prefix: string;
  value: string;
}

type CompoundedComponent = React.ForwardRefExoticComponent<
  MentionProps & React.RefAttributes<MentionsRef>
> & {
  Option: typeof Option;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
  getMentions: (value: string, config?: MentionsConfig) => MentionsEntity[];
};

const InternalMentions: React.ForwardRefRenderFunction<MentionsRef, MentionProps> = (
  {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    disabled,
    loading,
    filterOption,
    children,
    notFoundContent,
    options,
    status: customStatus,
    popupClassName,
    ...restProps
  },
  ref,
) => {
  const [focused, setFocused] = React.useState(false);
  const innerRef = React.useRef<MentionsRef>(null);
  const mergedRef = composeRef(ref, innerRef);

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    warning(
      !children,
      'Mentions',
      '`Mentions.Option` is deprecated. Please use `options` instead.',
    );
  }

  const { getPrefixCls, renderEmpty, direction } = React.useContext(ConfigContext);
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  const onFocus: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    if (restProps.onFocus) {
      restProps.onFocus(...args);
    }
    setFocused(true);
  };

  const onBlur: React.FocusEventHandler<HTMLTextAreaElement> = (...args) => {
    if (restProps.onBlur) {
      restProps.onBlur(...args);
    }

    setFocused(false);
  };

  const notFoundContentEle = React.useMemo<React.ReactNode>(() => {
    if (notFoundContent !== undefined) {
      return notFoundContent;
    }
    return renderEmpty?.('Select') || <DefaultRenderEmpty componentName="Select" />;
  }, [notFoundContent, renderEmpty]);

  const mentionOptions = React.useMemo<React.ReactNode>(() => {
    if (loading) {
      return (
        <Option value="ANTD_SEARCHING" disabled>
          <Spin size="small" />
        </Option>
      );
    }
    return children;
  }, [loading, children]);

  const mergedOptions = loading
    ? [
        {
          value: 'ANTD_SEARCHING',
          disabled: true,
          label: <Spin size="small" />,
        },
      ]
    : options;

  const mentionsfilterOption = loading ? loadingFilterOption : filterOption;

  const prefixCls = getPrefixCls('mentions', customizePrefixCls);

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergedClassName = classNames(
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    getStatusClassNames(prefixCls, mergedStatus),
    !hasFeedback && className,
    rootClassName,
    hashId,
  );

  const mentions = (
    <RcMentions
      prefixCls={prefixCls}
      notFoundContent={notFoundContentEle}
      className={mergedClassName}
      disabled={disabled}
      direction={direction}
      {...restProps}
      filterOption={mentionsfilterOption}
      onFocus={onFocus}
      onBlur={onBlur}
      dropdownClassName={classNames(popupClassName, rootClassName, hashId)}
      ref={mergedRef}
      options={mergedOptions}
      suffix={hasFeedback && feedbackIcon}
      classes={{ affixWrapper: classNames(hashId, className) }}
    >
      {mentionOptions}
    </RcMentions>
  );

  return wrapSSR(mentions);
};

const Mentions = React.forwardRef<MentionsRef, MentionProps>(
  InternalMentions,
) as CompoundedComponent;
if (process.env.NODE_ENV !== 'production') {
  Mentions.displayName = 'Mentions';
}
Mentions.Option = Option;

// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(Mentions, 'mentions');
Mentions._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

Mentions.getMentions = (value: string = '', config: MentionsConfig = {}): MentionsEntity[] => {
  const { prefix = '@', split = ' ' } = config;
  const prefixList: string[] = Array.isArray(prefix) ? prefix : [prefix];

  return value
    .split(split)
    .map((str = ''): MentionsEntity | null => {
      let hitPrefix: string | null = null;

      prefixList.some((prefixStr) => {
        const startStr = str.slice(0, prefixStr.length);
        if (startStr === prefixStr) {
          hitPrefix = prefixStr;
          return true;
        }
        return false;
      });

      if (hitPrefix !== null) {
        return {
          prefix: hitPrefix,
          value: str.slice((hitPrefix as string).length),
        };
      }
      return null;
    })
    .filter((entity): entity is MentionsEntity => !!entity && !!entity.value);
};

export default Mentions;
