import React, { useEffect, useState, useRef, useContext } from 'react';
import { findDOMNode } from 'react-dom';
import { IArrowRight } from 'infra-design-icons';
import moment, { Moment } from 'moment';
import { getRelativeList, getQuickList, IQuickItem, SelectItemType } from './const';
import DatePicker, { DatePickerProps } from '../index';
import { ConfigContext } from '../../config-provider';

function SelectItem(props: {
  itemData: IQuickItem;
  active: boolean;
  showArrow?: boolean;
  prefixCls: string;
  onSelect: (item: IQuickItem) => void;
}) {
  const { itemData, active, showArrow, prefixCls, onSelect } = props;
  return (
    <div
      className={`${prefixCls}-quick-item ${active ? `${prefixCls}-quick-item-active` : ''}`}
      onClick={() => onSelect(itemData)}
    >
      {!showArrow ? (
        itemData.text
      ) : (
        <>
          <span>{itemData.text}</span>
          <IArrowRight />
        </>
      )}
    </div>
  );
}

function RelativeRightPanel(props: {
  list: IQuickItem[];
  curSelect?: IQuickItem;
  prefixCls: string;
}) {
  const { list, curSelect, prefixCls } = props;
  return (
    <div className={`${prefixCls}-quick-right-relative`}>
      {list.map(v => {
        const active = v.id === curSelect?.id;
        return (
          <div
            key={v.id}
            className={`${prefixCls}-quick-item ${active ? `${prefixCls}-quick-item-active` : ''}`}
            style={{ opacity: active ? 1 : 0 }}
          >
            {curSelect?.getRange().inputText}
          </div>
        );
      })}
    </div>
  );
}

function usePickerOpen(setOpen: (flag: boolean) => void) {
  const pickerEl = useRef(null);
  const panelEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      const isOut =
        !findDOMNode(pickerEl.current)?.contains(e.target as Node) &&
        !panelEl?.current?.contains(e.target as Node);
      if (isOut) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, []);
  return {
    pickerEl,
    panelEl,
  };
}

export interface IQuickDatePicker {
  hookRelativeList?: (list: IQuickItem[]) => IQuickItem[];
  hookQuickList?: (list: IQuickItem[]) => IQuickItem[];
  onChange?: (value: Moment | [Moment, Moment], dataString: string) => void;
}
export type IQuickPickerProps = IQuickDatePicker & DatePickerProps;
export function QuickPicker(props: IQuickPickerProps) {
  const [open, setOpenChange] = useState(false);
  const [value, setValue] = useState<Moment | null>(moment());
  const [relativeList, setRelativeList] = useState<IQuickItem[]>(getRelativeList());
  const [quickList, setQuickList] = useState<IQuickItem[]>(getQuickList());
  const [curSelect, setCurSelect] = useState<IQuickItem | undefined>(undefined);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('picker', props.prefixCls);
  function setOpen(isOpen: boolean) {
    setOpenChange(isOpen);
    props.onOpenChange?.(isOpen);
  }
  const { panelEl, pickerEl } = usePickerOpen(setOpen);

  useEffect(() => {
    if (props.hookQuickList) {
      setRelativeList(props.hookQuickList(relativeList));
    }
    if (props.hookQuickList) {
      setQuickList(props.hookQuickList(quickList));
    }
  }, []);
  function handleOnSelect(item: IQuickItem) {
    const curRange = item.getRange();
    setCurSelect(item);
    setValue(value);
    props.onChange?.(curRange.value, curRange.inputText || '');
    if (item.type === SelectItemType.quick) {
      setOpen(false);
    }
  }
  function format(val: Moment) {
    const curRange = curSelect?.getRange(val);
    return curRange ? `${curSelect?.label || curSelect?.text}: ${curRange?.inputText}` : '';
  }
  function handleOnChange(val: Moment | null) {
    const curRange = curSelect?.getRange(val);
    props.onChange?.(curRange?.value as Moment, curRange?.inputText || '');
    setOpen(false);
    setValue(val);
  }
  const RenderPanel = React.useCallback(
    (defaultPanel: React.ReactNode) => (
      <div ref={panelEl} style={{ display: 'flex' }}>
        <div className={`${prefixCls}-quick-left-panel`}>
          {relativeList.map(v => (
            <SelectItem
              key={v.id}
              prefixCls={prefixCls}
              itemData={v}
              active={v.id === curSelect?.id}
              onSelect={handleOnSelect}
            />
          ))}
          {quickList.length > 0 ? (
            <div className={`${prefixCls}-quick-left-panel-divider`} />
          ) : null}
          {quickList.map(v => (
            <SelectItem
              key={v.id}
              prefixCls={prefixCls}
              showArrow
              itemData={v}
              active={v.id === curSelect?.id}
              onSelect={handleOnSelect}
            />
          ))}
        </div>
        <div className={`${prefixCls}-quick-right-panel`}>
          {curSelect?.type === SelectItemType.choose ? (
            defaultPanel
          ) : (
            <RelativeRightPanel prefixCls={prefixCls} list={relativeList} curSelect={curSelect} />
          )}
        </div>
      </div>
    ),
    [SelectItemType, curSelect, relativeList, quickList],
  );
  return (
    <DatePicker
      ref={pickerEl}
      value={value}
      picker={curSelect?.picker}
      format={format}
      open={open}
      onClick={() => setOpen(!open)}
      allowClear={false}
      {...props}
      onOpenChange={() => {}}
      panelRender={RenderPanel}
      onChange={handleOnChange}
    />
  );
}
