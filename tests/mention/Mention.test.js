import React from 'react';
import { mount } from 'enzyme';
import Mention, { toEditorState, getMentions } from '../../components/mention';

const MentionWrapper = React.createClass({
  getInitialState() {
    return {
      suggestions: ['afc163', 'benjycui', 'yiminghe', 'RaoHai'],
    };
  },
  onChange(editorState) {
    this.setState({
      suggestions: ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'],
    });
    this.props.onChange(editorState);
  },
  render() {
    return (<Mention
      style={{ width: '100%', height: 100 }}
      onChange={this.onChange}
      defaultValue={toEditorState('@afc163')}
      suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
      onSelect={this.props.onSelect}
    />);
  },
});

describe('Mention Render', () => {
  it('Mention render perfectly', () => {
    function onChange(editorState) {
      expect(getMentions(editorState)[0]).toBe('@afc163');
    }
    function onSelect() {}
    mount(<MentionWrapper onChange={onChange} onSelect={onSelect} />);
  });
});
