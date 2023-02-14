import React from 'react';
import App from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

describe('App', () => {
  mountTest(App);
  rtlTest(App);

  it('single', () => {
    // Sub page
    const MyPage: React.FC = () => {
      const { message } = App.useApp();
      React.useEffect(() => {
        message.success('Good!');
      }, [message]);

      return <div>Hello World</div>;
    };

    // Entry component
    const MyApp: React.FC = () => (
      <App>
        <MyPage />
      </App>
    );

    const { getByText, container } = render(<MyApp />);
    expect(getByText('Hello World')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('support className', () => {
    const { container } = render(
      <App className="test-class">
        <div>test</div>
      </App>,
    );
    expect(container.querySelector<HTMLDivElement>('.ant-app')).toHaveClass('test-class');
  });

  it('support style', () => {
    const { container } = render(
      <App style={{ color: 'blue' }}>
        <div>test</div>
      </App>,
    );
    expect(container.querySelector<HTMLDivElement>('.ant-app')).toHaveStyle('color: blue;');
  });
});
