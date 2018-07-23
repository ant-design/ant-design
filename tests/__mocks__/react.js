const React = require.requireActual('react');

if (!React.createContext) {
  React.createContext = () => {
    const Provider = ({ children }) => children;
    const Consumer = ({ children }) => children();
    return { Provider, Consumer };
  };
}

if (!React.createRef) {
  React.createRef = () => {
    const ref = function setRef(node) {
      ref.current = node;
    };
    return ref;
  };
}

module.exports = React;
