import { render } from 'enzyme';

export default function toMatchRenderedSnapshot(jsx) {
  try {
    expect(render(jsx)).toMatchSnapshot();
    return {
      message: () => 'expected JSX not to match snapshot',
      pass: true,
    };
  } catch (e) {
    return {
      message: () => `expected JSX to match snapshot: ${e.message}`,
      pass: false,
    };
  }
}
