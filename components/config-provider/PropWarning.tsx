import * as React from 'react';

import { devUseWarning } from '../_util/warning';

export interface PropWarningProps {
  dropdownMatchSelectWidth?: boolean;
}

/**
 * Warning for ConfigProviderProps.
 * This will be empty function in production.
 */
const PropWarning = React.memo(({ dropdownMatchSelectWidth }: PropWarningProps) => {
  const { deprecated } = devUseWarning('ConfigProvider');

  deprecated(
    dropdownMatchSelectWidth === undefined,
    'dropdownMatchSelectWidth',
    'popupMatchSelectWidth',
  );

  return null;
});

if (process.env.NODE_ENV !== 'production') {
  PropWarning.displayName = 'PropWarning';
}

export default process.env.NODE_ENV !== 'production' ? PropWarning : () => null;
