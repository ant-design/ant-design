const React = require.requireActual('react');

if (!React.createContext) {
  React.createContext = () => {
    const Provider = ({ children }) => children;
    const Consumer = ({ children }) => children();
    return { Provider, Consumer };
  };
}

module.exports = React;
