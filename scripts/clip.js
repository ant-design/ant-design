import React from 'react';
import Clipboard from 'clipboard';

let counter = 0;

class Clip extends React.Component {
  static propTypes: {
     options: React.PropTypes.object,
  }

  /* Returns a object with all props that fulfill a certain naming pattern
   *
   * @param {RegExp} regexp - Regular expression representing which pattern
   *                          you'll be searching for.
   * @param {Boolean} remove - Determines if the regular expression should be
   *                           removed when transmitting the key from the props
   *                           to the new object.
   *
   * e.g:
   *
   * // Considering:
   * // this.props = {option-foo: 1, onBar: 2, data-foobar: 3 data-baz: 4};
   *
   * // *RegExps not using // so that this comment doesn't break up
   * this.propsWith(option-*, true); // returns {foo: 1}
   * this.propsWith(on*, true); // returns {Bar: 2}
   * this.propsWith(data-*); // returns {data-foobar: 1, data-baz: 4}
   */
  propsWith(regexp, remove=false) {
    let object = {};

    Object.keys(this.props).forEach(function(key) {
      if (key.search(regexp) !== -1) {
        let objectKey = remove ? key.replace(regexp, '') : key;
        object[objectKey] = this.props[key];
      }
    }, this);

    return object;
  }

  constructor(props) {
    super(props);
    this.id = `__react_clipboard_${counter++}__`;
  }

  componentDidMount() {
    // Support old API by trying to assign this.props.options first;
    let options = this.props.options || this.propsWith(/^option-/, true);
    this.clipboard = new Clipboard(`#${this.id}`, options);

    let callbacks = this.propsWith(/^on/, true);
    Object.keys(callbacks).forEach(function(callback) {
      this.clipboard.on(callback.toLowerCase(), this.props['on' + callback]);
    }, this);
  }

  render() {
    let dataAttributes = this.propsWith(/^data-/);
    let component = this.props.component || 'span';
    return React.createElement(component, {
      id: this.id,
      className: this.props.className || '',
      style: this.props.style || {},
      ...dataAttributes
    }, this.props.children);
  }
}

export default Clip;
