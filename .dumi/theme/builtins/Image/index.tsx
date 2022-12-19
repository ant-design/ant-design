import type { ImageProps } from 'antd';
import { Image } from 'antd';
import type { FC } from 'react';
import React from 'react';

const MyImage: FC<ImageProps> = ({ style, ...props }) => <Image {...props} />;

export default MyImage;
