import React from 'react';
import { Link } from 'react-router';
import * as utils from '../utils';
import { getTagName, getChildren } from 'jsonml.js/lib/utils';

export default class Article extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const { chinese, english } = this.props.content.meta;
    utils.setTitle(`${chinese || english} - Ant Design`);
  }

  render() {
    const { content, location } = this.props;
    const jumper = content.description.filter((node) => {
      return getTagName(node) === 'h2';
    }).map((node) => {
      return (
        <li key={getChildren(node)[0]}>
          <Link to={{ pathname: location.pathname, query: { scrollTo: getChildren(node)[0] } }}>
          { utils.jsonmlToComponent(location.pathname, getChildren(node)[0]) }
          </Link>
        </li>
      );
    });

    const { meta, intro, description } = content;

    return (
      <article className="markdown">
        <h1>
          { meta.chinese || meta.english }
          {
            !meta.subtitle ? null :
              <span className="subtitle">{ meta.subtitle }</span>
          }
        </h1>
        {
          !intro ? null :
            utils.jsonmlToComponent(
              location.pathname,
              ['section', { className: 'markdown' }].concat(intro)
            )
        }
        {
          jumper.length > 0 ?
            <section className="toc"><ul>{ jumper }</ul></section> :
            null
        }
        {
          utils.jsonmlToComponent(
            location.pathname,
            ['section', { className: 'markdown' }].concat(description)
          )
        }
      </article>
    );
  }
}
