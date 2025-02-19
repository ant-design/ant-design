import React, { useMemo } from 'react';

import type { MasonryProps } from './Masonry';

export interface MasonryItemType {
  key?: React.Key;
  height?: number;
  children?: React.ReactNode;
}
interface MasonryItemProps extends Pick<MasonryProps, 'itemRender'> {
  prefixCls: string;
  item: MasonryItemType;
  style: React.CSSProperties;
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>((props, ref) => {
  const { item, style, prefixCls, itemRender } = props;

  // ====================== Render ======================
  const renderNode = useMemo(() => item.children ?? itemRender?.(item), [item, itemRender]);

  // const itemRef = useRef<HTMLDivElement>(null);

  // const setDimensions = () => {
  //   if (itemRef.current) {
  //     itemRef.current.setAttribute('data-width', String(itemRef.current.clientWidth));
  //     itemRef.current.setAttribute(
  //       'data-height',
  //       String(item.height ?? itemRef.current.clientHeight),
  //     );
  //   }
  // };

  // useLayoutEffect(() => {
  //   if (itemRef.current) {
  //     setDimensions();

  //     const images = itemRef.current.getElementsByTagName('img');

  //     const imageLoadPromises = Array.from(images).map(
  //       (img) =>
  //         new Promise((resolve) => {
  //           img.addEventListener('load', resolve, { once: true });
  //           img.addEventListener('error', resolve, { once: true });
  //         }),
  //     );

  //     // Update height after all images are loaded
  //     Promise.all(imageLoadPromises).then(setDimensions);

  //     // Cleanup
  //     return () => {
  //       Array.from(images).forEach((img) => {
  //         img.removeEventListener('load', setDimensions);
  //         img.removeEventListener('error', setDimensions);
  //       });
  //     };
  //   }
  // }, [item.key]);

  return (
    <div ref={ref} style={style} className={`${prefixCls}-item`}>
      {renderNode}
    </div>
  );
});

export default MasonryItem;
