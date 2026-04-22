import React from 'react';
import {
  Button,
  InputNumber,
  Segmented,
  Space,
  Switch,
  TextTooltip,
  Tooltip,
  Typography,
} from 'antd';

type TooltipType = 'TextTooltip' | 'Tooltip';
type ProfilerPhase = 'mount' | 'update';
const DEFAULT_COUNT = 20;

interface MetricSummary {
  count: number;
  totalActualDuration: number;
  totalBaseDuration: number;
  maxActualDuration: number;
}

interface Metrics {
  mount: MetricSummary;
  update: MetricSummary;
}

const itemStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 88,
  height: 32,
  border: '1px solid #d9d9d9',
  borderRadius: 6,
  background: '#fff',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
};

const listWrapperStyle: React.CSSProperties = {
  padding: 12,
  border: '1px solid #f0f0f0',
  borderRadius: 8,
  background: '#fafafa',
};

const createMetrics = (): Metrics => ({
  mount: {
    count: 0,
    totalActualDuration: 0,
    totalBaseDuration: 0,
    maxActualDuration: 0,
  },
  update: {
    count: 0,
    totalActualDuration: 0,
    totalBaseDuration: 0,
    maxActualDuration: 0,
  },
});

const formatDuration = (value: number) => `${value.toFixed(2)} ms`;

interface PerfTooltipGridProps {
  count: number;
  type: TooltipType;
  openAll: boolean;
  onRender: React.ProfilerOnRenderCallback;
}

const PerfTooltipGrid = React.memo<PerfTooltipGridProps>(({ count, type, openAll, onRender }) => {
  const items = React.useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        key: index,
        label: `Item ${index + 1}`,
        title: `Tooltip content ${index + 1}`,
      })),
    [count],
  );

  return (
    <div style={listWrapperStyle}>
      <div style={gridStyle}>
        {items.map((item) => {
          const node = <span style={itemStyle}>{item.label}</span>;
          const content =
            type === 'Tooltip' ? (
              <Tooltip title={item.title} {...(openAll ? { open: true } : {})}>
                {node}
              </Tooltip>
            ) : (
              <TextTooltip title={item.title} {...(openAll ? { open: true } : {})}>
                {node}
              </TextTooltip>
            );

          return (
            <React.Profiler id={`${type}-${item.key}`} key={item.key} onRender={onRender}>
              {content}
            </React.Profiler>
          );
        })}
      </div>
    </div>
  );
});

const App: React.FC = () => {
  const [count, setCount] = React.useState(DEFAULT_COUNT);
  const [type, setType] = React.useState<TooltipType>('TextTooltip');
  const [openAll, setOpenAll] = React.useState(false);
  const metricsRef = React.useRef<Metrics>(createMetrics());
  const [metrics, setMetrics] = React.useState<Metrics>(createMetrics());

  const flushMetrics = React.useCallback(() => {
    setMetrics({
      mount: { ...metricsRef.current.mount },
      update: { ...metricsRef.current.update },
    });
  }, []);

  const resetMetrics = React.useCallback(() => {
    metricsRef.current = createMetrics();
    flushMetrics();
  }, [flushMetrics]);

  const handleRender = React.useCallback<React.ProfilerOnRenderCallback>(
    (_, phase, actualDuration, baseDuration) => {
      const targetPhase: ProfilerPhase = phase === 'mount' ? 'mount' : 'update';
      const target = metricsRef.current[targetPhase];

      target.count += 1;
      target.totalActualDuration += actualDuration;
      target.totalBaseDuration += baseDuration;
      target.maxActualDuration = Math.max(target.maxActualDuration, actualDuration);

      flushMetrics();
    },
    [flushMetrics],
  );

  const renderMetric = (label: string, value: string) => (
    <Space size={4}>
      <Typography.Text strong>{label}:</Typography.Text>
      <Typography.Text code>{value}</Typography.Text>
    </Space>
  );

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space wrap>
        <InputNumber
          min={1}
          max={2000}
          value={count}
          onChange={(value) => {
            resetMetrics();
            setCount(typeof value === 'number' ? value : DEFAULT_COUNT);
          }}
        />
        <Segmented<TooltipType>
          options={['TextTooltip', 'Tooltip']}
          value={type}
          onChange={(value) => {
            resetMetrics();
            setType(value);
          }}
        />
        <Switch
          checked={openAll}
          onChange={(checked) => {
            resetMetrics();
            setOpenAll(checked);
          }}
        />
        <Typography.Text>
          {openAll ? `Open all ${count} items` : `Hover to trigger (${count} items)`}
        </Typography.Text>
        <Button onClick={resetMetrics} size="small">
          Reset metrics
        </Button>
      </Space>

      <Typography.Text type="secondary">
        Render {count} items with the same content and placement.
      </Typography.Text>

      <Space align="start" size="large" wrap>
        <Space direction="vertical" size={4}>
          <Typography.Text strong>Mount</Typography.Text>
          {renderMetric('Count', String(metrics.mount.count))}
          {renderMetric('Total actual', formatDuration(metrics.mount.totalActualDuration))}
          {renderMetric(
            'Average actual',
            formatDuration(
              metrics.mount.count === 0
                ? 0
                : metrics.mount.totalActualDuration / metrics.mount.count,
            ),
          )}
          {renderMetric('Max actual', formatDuration(metrics.mount.maxActualDuration))}
        </Space>

        <Space direction="vertical" size={4}>
          <Typography.Text strong>Update</Typography.Text>
          {renderMetric('Count', String(metrics.update.count))}
          {renderMetric('Total actual', formatDuration(metrics.update.totalActualDuration))}
          {renderMetric(
            'Average actual',
            formatDuration(
              metrics.update.count === 0
                ? 0
                : metrics.update.totalActualDuration / metrics.update.count,
            ),
          )}
          {renderMetric('Max actual', formatDuration(metrics.update.maxActualDuration))}
        </Space>
      </Space>

      <PerfTooltipGrid
        key={`${count}-${type}-${openAll}`}
        count={count}
        openAll={openAll}
        onRender={handleRender}
        type={type}
      />
    </Space>
  );
};

export default App;
