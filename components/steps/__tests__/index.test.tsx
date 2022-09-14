import React from 'react';
import Steps from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

const { Step } = Steps;
describe('Steps', () => {
  mountTest(Steps);
  rtlTest(Steps);

  const description = 'This is a description.';
  it('should render correct', () => {
    const { container } = render(
      <Steps
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description,
            subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render correct when use Step', () => {
    const { container } = render(
      <Steps>
        <Step title="Finished" description={description} />
        <Step title="In Progress" description={description} subTitle="Left 00:00:08" />
        <Step title="Waiting" description={description} />
      </Steps>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
