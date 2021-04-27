import React from 'react';
import Animate from 'rc-animate';

import styles from './index.less';

interface IProps {
  data: any;
  name: string;
  selectedItem: string;
  onItemSelect: (item: string) => void;
}

const List = ({ data, name, selectedItem, onItemSelect }: IProps) => {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.header}>
        <span className={styles.checkedNumber}>{name}</span>
      </div>
      <div>
        <Animate className={styles.content} component="ul" transitionLeave={false}>
          {data &&
            data.length &&
            data.map((item: string) => {
              return (
                <li
                  className={styles.li}
                  key={item}
                  onClick={() => onItemSelect(item)}
                  style={{ backgroundColor: item === selectedItem ? '#e6f7ff' : '#fff' }}
                >
                  <span className={styles.item}>{item}</span>
                </li>
              );
            })}
        </Animate>
      </div>
    </div>
  );
};

export default List;
