/*jshint ignore:start */
var CodeBox = React.createClass({
  getInitialState: function() {
    return {
      html: ''
    };
  },
  componentDidMount: function() {
    this.props.src = this.props.src.replace(/\.md$/, '.html');
    $.get('/' + this.props.src).then(function(data) {
      var item = $(data);
      item.find('.highlight').appendTo(item);
      this.setState({
        html: item.html()
      });
    }.bind(this));
  },
  handleClick: function(e) {
    if (!$(e.target).hasClass('collapse')) {
      return;
    }
    $(e.target).parent().parent().find('.highlight').slideToggle(150);
  },
  render: function() {
    var html = this.state.html;
    return (
      <div className="code-box"
        onClick={this.handleClick}
        dangerouslySetInnerHTML={{__html: html}}>
      </div>
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
