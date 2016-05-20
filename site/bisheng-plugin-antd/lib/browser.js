const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const toReactComponent = require('jsonml-to-react-component');
const JsonML = require('jsonml.js/lib/utils');
const VideoPlayer = require('./VideoPlayer');
const ImagePreview = require('./ImagePreview');

function isHeading(node) {
  return /h[1-6]/i.test(JsonML.getTagName(node));
}

module.exports = () => {
  return {
    converters: [
      [(node) => React.isValidElement(node), (node, index) => {
        return React.cloneElement(node, { key: index });
      }],
      [(node) => typeof node === 'function', (node, index) => {
        return React.cloneElement(node(React, ReactDOM), { key: index });
      }],
      [(node) => isHeading(node), (node, index) => {
        const children = JsonML.getChildren(node);
        return React.createElement(JsonML.getTagName(node), {
          key: index,
          id: children,
          ...JsonML.getAttributes(node),
        }, [
          <span key="title">{children.map((child) => toReactComponent(child))}</span>,
          <a href={`#${children}`} className="anchor" key="anchor">#</a>,
        ]);
      }],
      [(node) => JsonML.getTagName(node) === 'video', (node, index) =>
        <VideoPlayer video={JsonML.getAttributes(node)} key={index} />,
      ],
      [(node) => JsonML.isElement(node) && JsonML.getTagName(node) === 'a' && !(
        JsonML.getAttributes(node).class ||
          (JsonML.getAttributes(node).href &&
           JsonML.getAttributes(node).href.indexOf('http') === 0)
      ), (node, index) => {
        return <Link to={JsonML.getAttributes(node).href} key={index}>{toReactComponent(JsonML.getChildren(node)[0])}</Link>;
      }],
      [(node) => {
        return JsonML.isElement(node) &&
          JsonML.getTagName(node) === 'p' &&
          JsonML.getTagName(JsonML.getChildren(node)[0]) === 'img' &&
          /preview-img/gi.test(JsonML.getAttributes(JsonML.getChildren(node)[0]).class);
      }, (node, index) => {
        const imgs = JsonML.getChildren(node)
                .filter((img) => JsonML.isElement(img) && Object.keys(JsonML.getAttributes(img)).length > 0)
                .map((img) => JsonML.getAttributes(img));
        return <ImagePreview imgs={imgs} key={index} />;
      }],
    ],
  };
};
