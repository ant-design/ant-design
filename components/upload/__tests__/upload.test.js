/* eslint-disable react/no-string-refs, react/prefer-es6-class */
import React from 'react';
import { mount } from 'enzyme';
import Upload from '..';

describe('Upload', () => {
  // https://github.com/react-component/upload/issues/36
  it('should get refs inside Upload in componentDidMount', () => {
    let ref;
    class App extends React.Component {
      componentDidMount() {
        ref = this.refs.input;
      }
      render() {
        return (
          <Upload supportServerRender={false}>
            <input ref="input" />
          </Upload>
        );
      }
    }
    mount(<App />);
    expect(ref).toBeDefined();
  });
});
