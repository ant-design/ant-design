import { imageDemoTest } from '../../../tests/shared/imageTest';

describe('DatePicker image', () => {
  imageDemoTest('date-picker', {
    openTriggerClassName: 'ant-picker-dropdown',
  });
});
