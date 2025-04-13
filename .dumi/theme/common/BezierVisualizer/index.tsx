import React, { useMemo } from 'react';
import { Button, Flex, Tooltip, Typography } from 'antd';

import useLocale from '../../../hooks/useLocale';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import Visualizer from './Visualizer';

export interface BezierVisualizerProps {
  value: string;
}

const RE = /^cubic-bezier\((.*)\)$/;

const locales = {
  cn: {
    open: '在 cubic-bezier.com 中打开',
  },
  en: {
    open: 'Open in cubic-bezier.com',
  },
};

const BezierVisualizer = (props: BezierVisualizerProps) => {
  const { value } = props;
  const [locale] = useLocale(locales);

  const controls = useMemo(() => {
    const m = RE.exec(value.toLowerCase().trim());
    if (m) {
      return m[1].split(',').map((v) => parseFloat(v.trim())) as [number, number, number, number];
    }
    return null;
  }, [value]);

  if (!controls) return null;

  return (
    <Flex vertical gap="small">
      <Visualizer controls={controls} />
      <Flex align="center">
        <Typography.Text>{value}</Typography.Text>
        <Tooltip title={locale.open}>
          <Button
            type="link"
            href={`https://cubic-bezier.com/#${controls.join(',')}`}
            target="_blank"
            icon={<ExternalLinkIcon />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default BezierVisualizer;
