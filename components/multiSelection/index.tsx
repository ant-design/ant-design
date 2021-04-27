import React, { useMemo } from 'react';
import Animate from 'rc-animate';
import { Checkbox } from 'antd';

import styles from './index.less';

interface IProps {
  data: any;
  name: string;
  onSelectAll: (data: any) => void;
  onItemSelect: (item: any) => void;
}

const List = ({ data, name, onSelectAll, onItemSelect }: IProps) => {
  const getSelectedItemsNumber = (items: Array<any>) => {
    let checkedNum = 0;
    items.forEach((item) => {
      if (item.checked) {
        checkedNum += 1;
      }
    });
    return checkedNum;
  };

  const itemSelect = (selectedItem: any) => {
    let checkedNum = 0;
    data.items.forEach((item: any) => {
      if (item.key === selectedItem.key) {
        item.checked = !item.checked;
      }
      if (item.checked) {
        checkedNum += 1;
      }
    });
    if (checkedNum === 0) {
      data.checkedAll = false;
      data.indeterminate = false;
    } else if (checkedNum === data.items.length) {
      data.checkedAll = true;
      data.indeterminate = false;
    } else {
      data.checkedAll = false;
      data.indeterminate = true;
    }
    onItemSelect(data)
  }

  const selectAll = () => {
    const checked = !data.checkedAll;
    data.checkedAll = checked;
    data.indeterminate = false;

    data.items = data.items.map((item: any) => {
      item.checked = checked;
      return item;
    });
    onSelectAll(data);
  }

  const checkedNumber = useMemo(() => {
    let number = 0;
    if (data && data.items) {
      number = getSelectedItemsNumber(data.items);
    }
    return number;
  }, [JSON.stringify(data)]);

  const totalNumber = useMemo(() => {
    let number = 0;
    if (data && data.items) {
      number = data.items.length;
    }
    return number;
  }, [JSON.stringify(data)]);

  return (
    <div className={styles.listWrapper}>
      <div className={styles.header}>
        <Checkbox
          checked={data.checkedAll}
          indeterminate={data.indeterminate}
          onChange={selectAll}
        />
        <span className={styles.checkedNumber}>
          {checkedNumber}/{totalNumber}项
        </span>
        <span className={styles.checkName}>{name}</span>
      </div>
      <div>
        <Animate className={styles.content} component="ul" transitionLeave={false}>
          {data &&
            data.items &&
            data.items.map((item: any) => (
              <li
                className={styles.li}
                key={item.key}
                item={item}
                checked={item.Checkboxchecked}
                onClick={() => itemSelect(item)}
              >
                <Checkbox checked={item.checked} />
                <span className={styles.item}>{item.title}</span>
              </li>
            ))}
        </Animate>
      </div>
    </div>
  );
};
export default List;
