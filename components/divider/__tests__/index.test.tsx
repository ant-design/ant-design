import * as React from 'react';
import { ConfigProvider } from 'antd';

import Divider from '..';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('Divider', () => {
  mountTest(Divider);

  it('not show children when vertical', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Divider type="vertical">Bamboo</Divider>);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toBeFalsy();

    errSpy.mockRestore();
  });

  it('support string orientationMargin', () => {
    const { container } = render(
      <Divider orientation="right" orientationMargin="10">
        test test test
      </Divider>,
    );
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toHaveStyle({
      marginRight: 10,
    });
  });

  it('support bool dashed', () => {
    const { container } = render(<Divider dashed>test test test</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-dashed')).toHaveStyle({
      borderStyle: 'dashed',
    });
  });

  it('support string variant', () => {
    const { container } = render(<Divider variant="dotted">test dotted</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-dotted')).toHaveStyle({
      borderStyle: 'dotted',
    });
  });

  it('should apply the componentSize of ConfigProvider', () => {
    const { container: container1 } = render(
      <ConfigProvider componentSize="large">
        <Divider />
      </ConfigProvider>,
    );
    expect(container1?.querySelector<HTMLSpanElement>('.ant-divider-lg')).toBeTruthy();

    const { container: container2 } = render(
      <ConfigProvider componentSize="middle">
        <Divider />
      </ConfigProvider>,
    );
    expect(container2?.querySelector<HTMLSpanElement>('.ant-divider-md')).toBeTruthy();

    const { container: container3 } = render(
      <ConfigProvider componentSize="small">
        <Divider />
      </ConfigProvider>,
    );
    expect(container3?.querySelector<HTMLSpanElement>('.ant-divider-sm')).toBeTruthy();
  });

  it('support horizontal size', () => {
    const { container: container1 } = render(<Divider size="large" />);
    expect(container1?.querySelector<HTMLSpanElement>('.ant-divider-lg')).toBeTruthy();

    const { container: container2 } = render(<Divider size="middle" />);
    expect(container2?.querySelector<HTMLSpanElement>('.ant-divider-md')).toBeTruthy();

    const { container: container3 } = render(<Divider size="small" />);
    expect(container3?.querySelector<HTMLSpanElement>('.ant-divider-sm')).toBeTruthy();
  });

  it('support vertical size', () => {
    const { container } = render(<Divider type="vertical" size="large" />);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-lg')).toBeTruthy();

    const { container: container2 } = render(<Divider type="vertical" size="middle" />);
    expect(container2?.querySelector<HTMLSpanElement>('.ant-divider-md')).toBeTruthy();

    const { container: container3 } = render(<Divider type="vertical" size="small" />);
    expect(container3?.querySelector<HTMLSpanElement>('.ant-divider-sm')).toBeTruthy();
  });
});
