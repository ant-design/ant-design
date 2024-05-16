import * as React from 'react';

const AUTO_INTERVAL = 200;

export default function usePercent(
  spinning: boolean,
  percent?: number | 'auto',
): number | undefined {
  const [mockPercent, setMockPercent] = React.useState(0);
  const mockIntervalRef = React.useRef<NodeJS.Timeout>();

  const isAuto = percent === 'auto';

  React.useEffect(() => {
    if (isAuto && spinning) {
      setMockPercent(0);

      mockIntervalRef.current = setInterval(() => {
        setMockPercent((prev) => {
          const restPTG = 100 - prev;

          if (prev < 40) {
            return prev + restPTG * 0.05;
          }

          if (prev < 70) {
            return prev + restPTG * 0.03;
          }

          return prev + restPTG * 0.01;
        });
      }, AUTO_INTERVAL);
    }

    return () => {
      clearInterval(mockIntervalRef.current);
    };
  }, [isAuto, spinning]);

  return isAuto ? mockPercent : percent;
}
