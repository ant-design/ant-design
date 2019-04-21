import createReactContext from '@ant-design/create-react-context/lib/implementation';

const React = require.requireActual('react');

if (!React.createContext) {
  React.createContext = createReactContext;
}

if (!React.createRef) {
  React.createRef = () => {
    const ref = function setRef(node) {
      ref.current = node;
    };
    return ref;
  };
}

Object.assign(module.exports, React);
