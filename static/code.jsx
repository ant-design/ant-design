/*jshint ignore:start */
var CodeBox = React.createClass({
  getInitialState: function() {
    return {
      html: ''
    };
  },
  componentDidMount: function() {
    var that = this;
    $.get('/' + this.props.src).then(function(data) {
      that.setState({
        html: data
      });
    });
  },
  render: function() {
    var html = this.state.html;
    return (
      <div className="code-box" dangerouslySetInnerHTML={{__html: html}}></div>
    );
  }
});

var CodeBoxes = React.createClass({
  render: function() {
    return (
      <div className="code-boxes">
        {this.props.children}
      </div>
    );
  }
});
