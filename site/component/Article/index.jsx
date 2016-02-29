import React from 'react';
import * as utils from '../utils';

export default class Article extends React.Component {
  render() {
    const content = this.props.content;
    const jumper = content.description.filter((node) => {
      return node.type === 'h2';
    }).map((node) => {
      return <li key={node.children}><a href={`#${node.children}`}>{ node.children }</a></li>;
    });

    return (
      <article className="markdown">
        <h1>{ content.meta.title }</h1>
        {
          jumper.length > 0 ?
            <section className="toc"><ul>{ jumper }</ul></section> :
            null
        }
        { content.description.map(utils.objectToComponent) }
      </article>
    );
  }
}
